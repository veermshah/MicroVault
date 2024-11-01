import React, { useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/solid'; // Import CheckIcon for checkmarks

const Borrow = () => {
  const [loanType, setLoanType] = useState('microloan'); // 'microloan' or 'flashloan'
  const [loanAmount, setLoanAmount] = useState(''); // Loan amount in ETH
  const [loanDuration, setLoanDuration] = useState(''); // Loan duration in months (only for microloans)
  const [collateralValue, setCollateralValue] = useState(''); // Collateral value in ETH
  const [collateralType, setCollateralType] = useState('ETH'); // Default collateral
  const [creditworthiness, setCreditworthiness] = useState('average'); // User credit score
  const [willingToPayGas, setWillingToPayGas] = useState(true); // Willingness to pay gas fees

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
    const collateralVolatilityAdjustment = collateralType === 'ETH' ? 0.001 : 0.002; // Adjust based on collateral type

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
    const futureLoanValue = loanAmount * Math.pow((1 + rate), loanDuration / 12); // loanDuration is in months

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
    <div className="flex flex-col md:flex-row gap-8 p-6">
      {/* Left Column */}
      <div className="md:w-1/2 p-4 rounded-lg bg-white bg-opacity-80">
        <h2 className="text-2xl font-semibold mb-6">Borrow</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Loan Type</label>
            <select 
              className="w-full p-2 border rounded"
              value={loanType}
              onChange={(e) => setLoanType(e.target.value)}
            >
              <option value="microloan">Microloan</option>
              <option value="flashloan">Flash Loan</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Loan Amount (ETH)</label>
            <input 
              type="number" 
              className="w-full p-2 border rounded"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="Enter Amount"
              required
            />
          </div>

          {loanType === 'microloan' && (
            <>
              <div className="mb-4">
                <label className="block mb-2">Loan Duration (months)</label>
                <input 
                  type="number" 
                  className="w-full p-2 border rounded"
                  value={loanDuration}
                  onChange={(e) => setLoanDuration(e.target.value)}
                  placeholder="Enter Duration"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Collateral Value (ETH)</label>
                <input 
                  type="number" 
                  className="w-full p-2 border rounded"
                  value={collateralValue}
                  onChange={(e) => setCollateralValue(e.target.value)}
                  placeholder="Enter Collateral Value"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Collateral Type</label>
                <select 
                  className="w-full p-2 border rounded"
                  value={collateralType}
                  onChange={(e) => setCollateralType(e.target.value)}
                >
                  <option value="ETH">ETH</option>
                  <option value="DAI">DAI</option>
                  <option value="USDC">USDC</option>
                </select>
              </div>
            </>
          )}

          <div className="mb-4">
            <label className="block mb-2">Creditworthiness</label>
            <select 
              className="w-full p-2 border rounded"
              value={creditworthiness}
              onChange={(e) => setCreditworthiness(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="average">Average</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2">
              Willing to Pay Gas Fees:
              <input
                type="checkbox"
                checked={willingToPayGas}
                onChange={() => setWillingToPayGas(!willingToPayGas)}
                className="ml-2"
              />
            </label>
          </div>

          <button type="submit" className="mt-6 bg-[#48BF84] text-white px-4 py-2 rounded w-full font-bold">
            Calculate Rates
          </button>
        </form>
      </div>

      {/* Right Column */}
      <div className="md:w-1/2 bg-[#48BF84]/10 p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Terms of your offer</h3>

        {/* Display placeholders before calculation */}
        {borrowerRate && lenderAPY ? (
          <>
            {/* Display calculated rates */}
            <div className="flex justify-between mt-2">
              <p className="font-bold">Borrower Interest Rate:</p>
              <p>{borrowerRate}%</p>
            </div>

            <div className="flex justify-between mt-2">
              <p className="font-bold">Lender APY:</p>
              <p>{lenderAPY}%</p>
            </div>

            {willingToPayGas && (
              <>
                <div className="flex justify-between mt-2">
                  <p className="font-bold">Estimated Gas Fee:</p>
                  <p>{estimatedGasFee} ETH</p> {/* Display calculated gas fee */}
                </div>

                <div className="flex justify-between mt-2">
                  <p className="font-bold">Service Fee:</p>
                  <p>{serviceFee} ETH</p> {/* Display calculated service fee */}
                </div>
              </>
            )}

            {futureValue && (
              <div className="flex justify-between mt-2">
                <p className="font-bold">Future Value of Loan:</p>
                <p>{futureValue} ETH</p> {/* Display calculated future loan value */}
              </div>
            )}
          </>
        ) : (
          <>
            {/* Placeholder text with two dashes */}
            <div className="flex justify-between mt-2">
              <p className="font-bold">Borrower Interest Rate:</p>
              <p>--%</p> {/* Placeholder for borrower interest rate */}
            </div>

            <div className="flex justify-between mt-2">
              <p className="font-bold">Lender APY:</p>
              <p>--%</p> {/* Placeholder for lender APY */}
            </div>

            {willingToPayGas && (
              <>
                <div className="flex justify-between mt-2">
                  <p className="font-bold">Estimated Gas Fee:</p>
                  <p>-- ETH</p> {/* Placeholder for estimated gas fee */}
                </div>

                <div className="flex justify-between mt-2">
                  <p className="font-bold">Service Fee:</p>
                  <p>-- ETH</p> {/* Placeholder for service fee */}
                </div>
              </>
            )}

            {futureValue && (
              <div className="flex justify-between mt-2">
                <p className="font-bold">Future Value of Loan:</p>
                <p>-- ETH</p> {/* Placeholder for future loan value */}
              </div>
            )}
          </>
        )}

        {/* Continue button */}
        {borrowerRate || lenderAPY ? (
          /* Show continue button if rates are calculated */
          <>
            {/* Only show continue button if rates are calculated */}
            {/* You can customize this section further based on your requirements */}
            {/* For instance, you could include a summary of the calculated rates here */}

            {/* Continue button */}
            <button className="mt-6 bg-[#48BF84] text-white px-4 py-2 rounded w-full font-bold">
              Continue
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Borrow;