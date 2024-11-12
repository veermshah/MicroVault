// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

interface IPriceOracle {
    function getAssetPrice(address asset) external view returns (uint256);
}

contract DynamicP2PLending is Ownable {
    uint public poolBalance;
    uint public minimumPoolBalance;
    uint public platformFee;
    uint public baseInterestRate;
    uint public utilizationRateMultiplier;
    uint public maxUtilizationRate;
    IPriceOracle public priceOracle;

    struct Loan {
        uint id;
        address payable borrower;
        address payable lender;
        uint principal;
        uint interestRate;
        uint collateral;
        address collateralAsset;
        uint loanDuration;
        uint repaymentSchedule;
        uint dueTimestamp;
        uint midCheckpoint;
        uint midCheckpointThreshold;
        uint amountRepaid;
        uint status; // 0: Active, 1: Partially repaid, 2: Defaulted, 3: Completed
        bool collateralPosted;
        bool fundsDisbursed;
    }

    mapping(uint => Loan) public loans;
    uint public loanCount;

    event LoanCreated(uint loanId, address borrower, uint principal, uint interestRate, uint collateral);
    event LoanDisbursed(uint loanId, address lender, uint principal);
    event RepaymentMade(uint loanId, address borrower, uint amount);
    event LoanDefaulted(uint loanId);
    event LoanCompleted(uint loanId);

    constructor(
        uint _minimumPoolBalance,
        uint _platformFee,
        uint _baseInterestRate,
        uint _utilizationRateMultiplier,
        uint _maxUtilizationRate,
        address _priceOracle
    ) Ownable() {  // Constructor now inherits Ownable without arguments
        minimumPoolBalance = _minimumPoolBalance;
        platformFee = _platformFee;
        baseInterestRate = _baseInterestRate;
        utilizationRateMultiplier = _utilizationRateMultiplier;
        maxUtilizationRate = _maxUtilizationRate;
        priceOracle = IPriceOracle(_priceOracle);
    }

    modifier onlyActiveLoan(uint loanId) {
        require(loans[loanId].status == 0, "Loan is not active");
        _;
    }

    function depositLiquidity() external payable {
        poolBalance += msg.value;
    }

    function withdrawLiquidity(uint amount) external onlyOwner {
        require(amount <= poolBalance, "Insufficient pool balance.");
        poolBalance -= amount;
        payable(owner()).transfer(amount);
    }

    function calculateInterestRate() public view returns (uint) {
        uint utilizationRate = (poolBalance * 100) / minimumPoolBalance;
        if (utilizationRate > maxUtilizationRate) {
            utilizationRate = maxUtilizationRate;
        }
        return baseInterestRate + (utilizationRate * utilizationRateMultiplier) / 100;
    }

    function requestLoan(
        uint _principal,
        uint _loanDuration,
        uint _midCheckpointThreshold,
        address _collateralAsset
    ) external payable {
        uint interestRate = calculateInterestRate();
        uint collateralRequired = calculateCollateralRequired(_principal, _collateralAsset);
        require(msg.value >= collateralRequired, "Insufficient collateral.");

        loans[loanCount] = Loan({
            id: loanCount,
            borrower: payable(msg.sender),
            lender: payable(address(0)),
            principal: _principal,
            interestRate: interestRate,
            collateral: msg.value,
            collateralAsset: _collateralAsset,
            loanDuration: _loanDuration,
            repaymentSchedule: _loanDuration / 2,
            dueTimestamp: block.timestamp + _loanDuration,
            midCheckpoint: block.timestamp + (_loanDuration / 2),
            midCheckpointThreshold: _midCheckpointThreshold,
            amountRepaid: 0,
            status: 0,
            collateralPosted: true,
            fundsDisbursed: false
        });

        emit LoanCreated(loanCount, msg.sender, _principal, interestRate, msg.value);
        loanCount++;
    }

    function calculateCollateralRequired(uint _principal, address _collateralAsset) internal view returns (uint) {
        uint assetPrice = priceOracle.getAssetPrice(_collateralAsset);
        uint collateralAmount = (_principal * 100) / assetPrice;
        return collateralAmount;
    }

    function fulfillLoan(uint loanId) external payable onlyActiveLoan(loanId) {
        Loan storage loan = loans[loanId];
        require(poolBalance >= loan.principal, "Insufficient pool balance.");
        loan.lender = payable(msg.sender);
        loan.fundsDisbursed = true;
        poolBalance -= loan.principal;
        loan.borrower.transfer(loan.principal);
        
        emit LoanDisbursed(loanId, msg.sender, loan.principal);
    }

    function makeRepayment(uint loanId) external payable onlyActiveLoan(loanId) {
        Loan storage loan = loans[loanId];
        require(msg.sender == loan.borrower, "Only borrower can repay.");

        loan.amountRepaid += msg.value;

        if (block.timestamp >= loan.midCheckpoint && loan.amountRepaid < loan.midCheckpointThreshold) {
            loan.status = 2;
            loan.lender.transfer(loan.collateral);
            emit LoanDefaulted(loanId);
        } else if (loan.amountRepaid >= loan.principal + ((loan.principal * loan.interestRate) / 100)) {
            loan.status = 3;
            loan.borrower.transfer(loan.collateral);
            emit LoanCompleted(loanId);
        } else {
            emit RepaymentMade(loanId, msg.sender, msg.value);
        }
    }
}