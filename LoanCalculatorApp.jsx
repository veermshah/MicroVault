// LoanCalculatorApp.jsx
import React, { useState } from 'react';

const LoanCalculatorApp = () => {
  const [loanType, setLoanType] = useState('microloan'); // 'microloan' or 'flashloan'
  const [loanAmount, setLoanAmount] = useState('');
  const [loanDuration, setLoanDuration] = useState(''); // in months (only for microloans)
  const [collateralValue, setCollateralValue] = useState(''); // in ETH or other currency
  const [collateralType, setCollateralType] = useState('ETH'); // default collateral
  const [creditworthiness, setCreditworthiness] = useState('average'); // user credit score
  const [willingToPayGas, setWillingToPayGas] = useState(true); // boolean

  const [borrowerRate, setBorrowerRate] = useState(null);
  const [lenderAPY, setLenderAPY] = useState(null);
  const [futureValue, setFutureValue] = useState(null);
  const [serviceFee, setServiceFee] = useState(null); // New state for service fee

  // Constants for interest rate calculation
  const baseRate = 0.002; // Reduced base rate to 0.2%
  const multiplier = 0.5; // Reduced rate multiplier
  const maxRate = 0.05; // Maximum rate capped at 5%
  const reserveFactor = 0.10; // 10% reserve factor
  const platformRake = 0.05; // 5% platform fee

  // Mock utilization rate (typically fetched from the smart contract or backend)
  const utilizationRate = 0.7; // 70% utilization rate

  // Gas fees (this would be dynamic in a real-world app, based on ETH network congestion)
  const estimatedGasFee = 0.005; // Example value in ETH

  const calculateRates = () => {
    // Collateral volatility adjustment (assuming ETH for this example)
    const collateralVolatilityAdjustment = collateralType === 'ETH' ? 0.001 : 0.002; // 0.1% for ETH, 0.2% for others

    // Adjust base rate depending on loan type
    const adjustedBaseRate = loanType === 'flashloan' ? baseRate * 1.2 : baseRate; // Flash loans have slightly higher base rates

    // Calculate borrower rate based on utilization rate
    let rate = adjustedBaseRate + (multiplier * utilizationRate);
    
    // Cap the maximum rate
    rate = Math.min(rate, maxRate);

    // Adjust for collateral volatility
    rate += collateralVolatilityAdjustment;

    // Reserve interest
    const reserveInterest = rate * reserveFactor;

    // Final lender APY (net of reserve factor)
    let lenderYield = rate - reserveInterest;

    // Apply platform rake
    const platformCut = lenderYield * platformRake;
    lenderYield -= platformCut;

    // Calculate future value of the loan amount
    const futureLoanValue = loanAmount * Math.pow((1 + rate), loanDuration / 12); // loanDuration is in months, so divide by 12 for years

    // Calculate service fee (50% of gas fee)
    const calculatedServiceFee = estimatedGasFee * 0.5;

    // Final Borrower Rate and Lender APY in percentages
    setBorrowerRate((rate * 100).toFixed(2));
    setLenderAPY((lenderYield * 100).toFixed(2));
    setFutureValue(futureLoanValue.toFixed(2)); // Future value of the loan
    setServiceFee(calculatedServiceFee.toFixed(5)); // Service fee
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateRates();
  };

  return (
    <div className="container">
      <h1>Loan Interest Rate Calculator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="loanType">Loan Type:</label>
          <select id="loanType" value={loanType} onChange={(e) => setLoanType(e.target.value)}>
            <option value="microloan">Microloan</option>
            <option value="flashloan">Flash Loan</option>
          </select>
        </div>

        <div>
          <label htmlFor="loanAmount">Loan Amount (ETH):</label>
          <input
            type="number"
            id="loanAmount"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            required
          />
        </div>

        {loanType === 'microloan' && (
          <>
            <div>
              <label htmlFor="loanDuration">Loan Duration (months):</label>
              <input
                type="number"
                id="loanDuration"
                value={loanDuration}
                onChange={(e) => setLoanDuration(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="collateralValue">Collateral Value (ETH):</label>
              <input
                type="number"
                id="collateralValue"
                value={collateralValue}
                onChange={(e) => setCollateralValue(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="collateralType">Collateral Type:</label>
              <select id="collateralType" value={collateralType} onChange={(e) => setCollateralType(e.target.value)}>
                <option value="ETH">ETH</option>
                <option value="DAI">DAI</option>
                <option value="USDC">USDC</option>
              </select>
            </div>
          </>
        )}

        <div>
          <label htmlFor="creditworthiness">Creditworthiness:</label>
          <select
            id="creditworthiness"
            value={creditworthiness}
            onChange={(e) => setCreditworthiness(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="average">Average</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label htmlFor="willingToPayGas">
            Willing to Pay Gas Fees:
            <input
              type="checkbox"
              id="willingToPayGas"
              checked={willingToPayGas}
              onChange={() => setWillingToPayGas(!willingToPayGas)}
            />
          </label>
        </div>

        <button type="submit">Calculate Rates</button>
      </form>

      {borrowerRate && lenderAPY && (
        <div className="results">
          <h2>Calculated Rates</h2>
          <p>Borrower Interest Rate: {borrowerRate}%</p>
          <p>Lender APY: {lenderAPY}%</p>
          {willingToPayGas && (
            <>
              <p>Estimated Gas Fee: {estimatedGasFee} ETH</p>
              <p>Service Fee: {serviceFee} ETH</p>
            </>
          )}
          {futureValue && <p>Future Value of Loan: {futureValue} ETH</p>}
        </div>
      )}
    </div>
  );
};

export default LoanCalculatorApp;
