// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract p2pSmartContract {
    // State variables
    address public owner;
    uint256 public minimumPoolBalance;
    uint256 public platformFee; // in percentage (e.g., 1 means 1%)
    uint256 public baseInterestRate;
    uint256 public utilizationRateMultiplier;
    uint256 public maxUtilizationRate;

    uint256 public loanCounter;
    uint256 public liquidityBuffer;
    bool private _entered;

    // Collateral adequacy threshold (manual instead of Oracle)
    uint256 public collateralAdequacyThreshold = 150; // Collateral must be 150% of principal

    // Midpoint repayment threshold (in percentage of total repayment)
    uint256 public midpointRepaymentThreshold = 50; // e.g., 50% of total repayment by midpoint

    // Structures
    struct Loan {
        address borrower;
        address lender;
        uint256 principal;
        uint256 interest;
        uint256 duration;
        uint256 startTime;
        uint256 repaidAmount;
        uint256 collateral;
        bool isActive;
    }

    mapping(uint256 => Loan) public loans;

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can execute this");
        _;
    }

    modifier onlyBorrower(uint256 loanId) {
        require(msg.sender == loans[loanId].borrower, "Only borrower can execute this");
        _;
    }

    modifier onlyLender(uint256 loanId) {
        require(msg.sender == loans[loanId].lender, "Only lender can execute this");
        _;
    }

    modifier nonReentrant() {
        require(!_entered, "Reentrancy detected");
        _entered = true;
        _;
        _entered = false;
    }

    // Constructor
    constructor(
        uint256 _minimumPoolBalance,
        uint256 _platformFee,
        uint256 _baseInterestRate,
        uint256 _utilizationRateMultiplier,
        uint256 _maxUtilizationRate
    ) {
        owner = msg.sender;
        minimumPoolBalance = _minimumPoolBalance;
        platformFee = _platformFee;
        baseInterestRate = _baseInterestRate;
        utilizationRateMultiplier = _utilizationRateMultiplier;
        maxUtilizationRate = _maxUtilizationRate;
    }

    // Request a loan
    function requestLoan(
        uint256 principal,
        uint256 interest,
        uint256 duration,
        uint256 collateral
    ) external payable {
        require(msg.value == collateral, "Collateral amount must match sent value");
        require(collateral >= (principal * collateralAdequacyThreshold) / 100, "Collateral insufficient");

        loanCounter++;

        loans[loanCounter] = Loan({
            borrower: msg.sender,
            lender: address(0),
            principal: principal,
            interest: interest,
            duration: duration,
            startTime: 0,
            repaidAmount: 0,
            collateral: collateral,
            isActive: false
        });

        liquidityBuffer += (principal + collateral);

        emit LoanRequested(loanCounter, msg.sender, principal, duration);
    }

    // Fund a loan
    function fundLoan(uint256 loanId) external payable nonReentrant {
        Loan storage loan = loans[loanId];
        require(!loan.isActive, "Loan is already funded");
        require(msg.value == loan.principal, "Must provide the exact principal amount");

        uint256 fee = (loan.principal * platformFee) / 100;
        uint256 amountAfterFee = loan.principal - fee;

        loan.lender = msg.sender;
        loan.startTime = block.timestamp;
        loan.isActive = true;

        liquidityBuffer -= loan.principal;
        payable(owner).transfer(fee); // Transfer platform fee to owner
        payable(loan.borrower).transfer(amountAfterFee);

        emit LoanFunded(loanId, msg.sender, loan.principal);
    }

    // Repay a loan
    function repayLoan(uint256 loanId) external payable onlyBorrower(loanId) nonReentrant {
        Loan storage loan = loans[loanId];
        require(loan.isActive, "Loan is not active");

        loan.repaidAmount += msg.value;

        uint256 totalRepayment = calculateTotalRepayment(loanId);

        if (loan.repaidAmount >= totalRepayment) {
            loan.isActive = false;

            liquidityBuffer += loan.principal;

            if (loan.collateral > 0) {
                payable(loan.borrower).transfer(loan.collateral);
                emit CollateralReturned(loanId, loan.borrower, loan.collateral);
            }

            uint256 repayment = loan.repaidAmount;
            loan.repaidAmount = 0;
            payable(loan.lender).transfer(repayment);
        }

        emit LoanRepaid(loanId, loan.borrower, msg.value);
    }

    // Midpoint check with custom threshold
    function checkMidpoint(uint256 loanId) public {
        Loan storage loan = loans[loanId];
        require(loan.isActive, "Loan is not active");
        require(block.timestamp >= loan.startTime + (loan.duration / 2), "Not yet midpoint");

        uint256 totalRepayment = calculateTotalRepayment(loanId);
        uint256 expectedRepayment = (totalRepayment * midpointRepaymentThreshold) / 100;

        if (loan.repaidAmount < expectedRepayment) {
            // Loan defaults
            loan.isActive = false;

            // Transfer collateral to lender as compensation
            if (loan.collateral > 0) {
                payable(loan.lender).transfer(loan.collateral);
            }

            emit LoanDefaulted(loanId, loan.borrower, loan.lender);
        } else {
            emit LoanOnTrack(loanId, loan.borrower, loan.lender);
        }
    }

    // Calculate total repayment (principal + interest)
    function calculateTotalRepayment(uint256 loanId) public view returns (uint256) {
        Loan storage loan = loans[loanId];
        uint256 interestAmount = (loan.principal * loan.interest) / 100;
        return loan.principal + interestAmount;
    }

    // Events
    event LoanRequested(uint256 loanId, address borrower, uint256 principal, uint256 duration);
    event LoanFunded(uint256 loanId, address lender, uint256 amount);
    event LoanRepaid(uint256 loanId, address borrower, uint256 amount);
    event CollateralReturned(uint256 loanId, address borrower, uint256 amount);
    event LoanDefaulted(uint256 loanId, address borrower, address lender);
    event LoanOnTrack(uint256 loanId, address borrower, address lender);
}
