import React, { useState, useEffect } from 'react';
import { CheckIcon } from '@heroicons/react/24/solid';

const Borrow = () => {
  const [loanType, setLoanType] = useState('microloan');
  const [loanAmount, setLoanAmount] = useState('');
  const [loanDuration, setLoanDuration] = useState('');
  const [collateralValue, setCollateralValue] = useState('');
  const [collateralType, setCollateralType] = useState('ETH');
  const [creditworthiness, setCreditworthiness] = useState('average');
  const [willingToPayGas, setWillingToPayGas] = useState(true);

  const [borrowerRate, setBorrowerRate] = useState(null);
  const [lenderAPY, setLenderAPY] = useState(null);
  const [futureValue, setFutureValue] = useState(null);
  const [serviceFee, setServiceFee] = useState(null);
  const [isOvercollateralized, setIsOvercollateralized] = useState(false);

  // Constants for interest rate calculation
  const baseRate = 0.002;
  const multiplier = 0.5;
  const maxRate = 0.05;
  const reserveFactor = 0.10;
  const platformRake = 0.05;
  const utilizationRate = 0.7;
  const estimatedGasFee = 0.005;
  const collateralRatio = 1.5; // Require 150% collateralization

  useEffect(() => {
    // Check if loan is overcollateralized whenever collateral or loan amount changes
    if (collateralValue && loanAmount) {
      setIsOvercollateralized(parseFloat(collateralValue) >= parseFloat(loanAmount) * collateralRatio);
    } else {
      setIsOvercollateralized(false);
    }
  }, [collateralValue, loanAmount]);

  const calculateRates = () => {
    const collateralVolatilityAdjustment = collateralType === 'ETH' ? 0.001 : 0.002;
    const adjustedBaseRate = loanType === 'flashloan' ? baseRate * 1.2 : baseRate;

    let rate = adjustedBaseRate + (multiplier * utilizationRate);
    rate = Math.min(rate, maxRate);
    rate += collateralVolatilityAdjustment;

    const reserveInterest = rate * reserveFactor;
    let lenderYield = rate - reserveInterest;

    const platformCut = lenderYield * platformRake;
    lenderYield -= platformCut;

    const futureLoanValue = loanAmount * Math.pow((1 + rate), loanDuration / 12);
    const calculatedServiceFee = estimatedGasFee * 0.5;

    setBorrowerRate((rate * 100).toFixed(2));
    setLenderAPY((lenderYield * 100).toFixed(2));
    setFutureValue(futureLoanValue.toFixed(2));
    setServiceFee(calculatedServiceFee.toFixed(5));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isOvercollateralized) {
      calculateRates();
    } else {
      alert("The loan must be overcollateralized. Please increase your collateral or decrease your loan amount.");
    }
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

          <div className="mb-4">
            <label className="block mb-2">Loan Amount (ETH)</label>
            <input 
              type="number" 
              className="w-full p-2 border rounded"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="Enter Amount"
              required
              disabled={!collateralValue}
            />
            {!isOvercollateralized && loanAmount && (
              <p className="text-red-500 text-sm mt-1">
                The loan must be overcollateralized. Please increase your collateral or decrease your loan amount.
              </p>
            )}
          </div>

          {loanType === 'microloan' && (
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

          <button 
            type="submit" 
            className={`mt-6 px-4 py-2 rounded w-full font-bold ${
              isOvercollateralized ? 'bg-[#48BF84] text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            }`}
            disabled={!isOvercollateralized}
          >
            Calculate Rates
          </button>
        </form>
      </div>

      {/* Right Column */}
      <div className="md:w-1/2 bg-[#48BF84]/10 p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Terms of your offer</h3>

        {borrowerRate && lenderAPY ? (
          <>
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
                  <p>{estimatedGasFee} ETH</p>
                </div>

                <div className="flex justify-between mt-2">
                  <p className="font-bold">Service Fee:</p>
                  <p>{serviceFee} ETH</p>
                </div>
              </>
            )}

            {futureValue && (
              <div className="flex justify-between mt-2">
                <p className="font-bold">Future Value of Loan:</p>
                <p>{futureValue} ETH</p>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="flex justify-between mt-2">
              <p className="font-bold">Borrower Interest Rate:</p>
              <p>--%</p>
            </div>

            <div className="flex justify-between mt-2">
              <p className="font-bold">Lender APY:</p>
              <p>--%</p>
            </div>

            {willingToPayGas && (
              <>
                <div className="flex justify-between mt-2">
                  <p className="font-bold">Estimated Gas Fee:</p>
                  <p>-- ETH</p>
                </div>

                <div className="flex justify-between mt-2">
                  <p className="font-bold">Service Fee:</p>
                  <p>-- ETH</p>
                </div>
              </>
            )}

            <div className="flex justify-between mt-2">
              <p className="font-bold">Future Value of Loan:</p>
              <p>-- ETH</p>
            </div>
          </>
        )}

        {borrowerRate || lenderAPY ? (
          <button className="mt-6 bg-[#48BF84] text-white px-4 py-2 rounded w-full font-bold">
            Continue
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Borrow;