// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract P2PLending {
    // Structures
    struct Loan {
        address borrower;
        address lender;
        uint256 principal;
        uint256 interest; // Interest in percentage (e.g., 5 means 5%)
        uint256 duration; // in seconds
        uint256 startTime;
        uint256 repaidAmount;
        uint256 collateral; // Optional collateral value (in Wei)
        bool isActive;
    }

    // State variables
    uint256 public loanCounter;
    address public owner;
    uint256 public liquidityBuffer;

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
        bool _entered = false;
        require(!_entered, "Reentrancy detected");
        _entered = true;
        _;
        _entered = false;
    }

    // Constructor
    constructor() {
        owner = msg.sender;
    }

    // Request a loan
    function requestLoan(uint256 principal, uint256 interest, uint256 duration, uint256 collateral) external payable {
        require(msg.value == collateral, "Collateral amount must be provided");
        
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

        liquidityBuffer += principal;

        emit LoanRequested(loanCounter, msg.sender, principal, duration);
    }

    // Fund a loan
    function fundLoan(uint256 loanId) external payable nonReentrant {
        Loan storage loan = loans[loanId];
        require(!loan.isActive, "Loan is already funded");
        require(msg.value == loan.principal, "Must provide the exact principal amount");

        loan.lender = msg.sender;
        loan.startTime = block.timestamp;
        loan.isActive = true;

        // Remove the principal from the liquidity buffer and transfer it to the borrower
        liquidityBuffer -= loan.principal;
        payable(loan.borrower).transfer(loan.principal);

        emit LoanFunded(loanId, msg.sender, loan.principal);
    }

    // Repay a loan
    function repayLoan(uint256 loanId) external payable onlyBorrower(loanId) nonReentrant {
        Loan storage loan = loans[loanId];
        require(loan.isActive, "Loan is not active");

        loan.repaidAmount += msg.value;

        // Calculate the total repayment (principal + interest)
        uint256 totalRepayment = calculateTotalRepayment(loanId);

        if (loan.repaidAmount >= totalRepayment) {
            loan.isActive = false;

            // Return collateral to borrower if repaid fully
            if (loan.collateral > 0) {
                payable(loan.borrower).transfer(loan.collateral);
                emit CollateralReturned(loanId, loan.borrower, loan.collateral);
            }

            // Transfer repayments to lender
            uint256 repayment = loan.repaidAmount;
            loan.repaidAmount = 0;
            payable(loan.lender).transfer(repayment);
        }

        emit LoanRepaid(loanId, loan.borrower, msg.value);
    }

    // Midpoint check
    function checkMidpoint(uint256 loanId) public {
        Loan storage loan = loans[loanId];
        require(loan.isActive, "Loan is not active");
        require(block.timestamp >= loan.startTime + (loan.duration / 2), "Not yet midpoint");

        uint256 expectedRepayment = (loan.principal + (loan.principal * loan.interest / 100)) / 2;

        if (loan.repaidAmount < expectedRepayment) {
            // Loan defaults
            loan.isActive = false;

            // Return collateral to lender
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
    event LoanOnTrack(uint256 loanId, address borrower, address lender);
    event LoanDefaulted(uint256 loanId, address borrower, address lender);
    event CollateralReturned(uint256 loanId, address borrower, uint256 amount);
}
