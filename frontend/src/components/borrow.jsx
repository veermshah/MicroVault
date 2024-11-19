import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // Constants for interest rate calculation
  const baseRate = 0.002; // Base interest rate
  const multiplier = 0.5; // Multiplier for utilization
  const maxRate = 0.05; // Maximum interest rate
  const reserveFactor = 0.10; // Reserve factor for lender yield calculation
  const platformRake = 0.05; // Platform rake from lender yield
  const estimatedGasFeePerTransaction = 0.005; // Estimated gas fee per transaction
  const collateralRatio = 1.2; // Require at least 120% collateralization (20% more than loan amount)
  const minLoanAmount = 0.000000000000000001;

  useEffect(() => {
    if (collateralValue && loanAmount) {
      setIsOvercollateralized(parseFloat(collateralValue) >= parseFloat(loanAmount) * collateralRatio);
    } else {
      setIsOvercollateralized(false);
    }
  }, [collateralValue, loanAmount]);

  const calculateRates = () => {
    // Calculate the adjusted base rate based on loan type
    const adjustedBaseRate = loanType === 'flashloan' ? baseRate * 1.2 : baseRate;
    
    // Calculate the borrower interest rate
    let rate = adjustedBaseRate + (multiplier * (parseFloat(loanAmount) / parseFloat(collateralValue)));
    rate = Math.min(rate, maxRate); // Cap the rate at maxRate

    // Calculate lender yield and APY
    const reserveInterest = rate * reserveFactor;
    let lenderYield = rate - reserveInterest;
    const platformCut = lenderYield * platformRake;
    lenderYield -= platformCut;

    // Calculate future value of loan using compound interest formula
    const futureLoanValue = loanAmount * Math.pow((1 + rate), loanDuration / 12);

    // Calculate service fee based on estimated gas fee and transaction count (assumed to be one for simplicity)
    const calculatedServiceFee = estimatedGasFeePerTransaction;

    // Set calculated values to state
    setBorrowerRate((rate * 100).toFixed(2));
    setLenderAPY((lenderYield * 100).toFixed(2));
    setFutureValue(futureLoanValue.toFixed(2));
    setServiceFee(calculatedServiceFee.toFixed(5));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isOvercollateralized && agreeToTerms) {
      calculateRates();
    } else {
      alert("Please ensure the loan is overcollateralized by at least 20% and you have agreed to the terms and conditions.");
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
            <select className="w-full p-2 border rounded" value={loanType} onChange={(e) => setLoanType(e.target.value)}>
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
            <select className="w-full p-2 border rounded" value={collateralType} onChange={(e) => setCollateralType(e.target.value)}>
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
              onChange={(e) => {
                const value = Math.max(minLoanAmount, parseFloat(e.target.value) || minLoanAmount);
                setLoanAmount(value.toString());
                setCollateralValue(Math.max(value * collateralRatio, parseFloat(collateralValue) || minLoanAmount).toString());
              }}
              placeholder="Enter Amount"
              required
            />
            {!isOvercollateralized && loanAmount && (
              <p className="text-red-500 text-sm mt-1">
                The loan must be overcollateralized by at least 20%. Please increase your collateral or decrease your loan amount.
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
            <select className="w-full p-2 border rounded" value={creditworthiness} onChange={(e) => setCreditworthiness(e.target.value)}>
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

          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={() => setAgreeToTerms(!agreeToTerms)}
                className="mr-2"
              />
              <span>I agree to the <Link to="/terms" className="text-blue-500">Terms and Conditions</Link></span>
            </label>
          </div>

          <button
            type="submit"
            className={`mt-6 px-4 py-2 rounded w-full font-bold ${isOvercollateralized && agreeToTerms ? 'bg-[#48BF84] text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
            disabled={!isOvercollateralized || !agreeToTerms}
          >
            Calculate Rates
          </button>
        </form>
      </div>

      {/* Right Column */}
      <div className="md:w-1/2 bg-[#48BF84]/10 p-4 rounded-lg shadow-md space-y-4 flex flex-col justify-between">
        {borrowerRate && lenderAPY ? (
          <>
            {/* Display calculated rates */}
            <h3 className="text-xl font-semibold mb-4">Calculated Rates</h3>
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
                  <p>{estimatedGasFeePerTransaction} ETH</p>
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
            {/* Default values when rates are not calculated */}
            {['Borrower Interest Rate', 'Lender APY', 'Estimated Gas Fee', 'Service Fee', 'Future Value of Loan'].map((item) => (
              <div key={item} className="flex justify-between mt-2">
                <p className="font-bold">{item}:</p>
                {item === 'Borrower Interest Rate' || item === 'Lender APY' ? (
                  <p>--%</p> // Default placeholder for percentage rates
                ) : (
                  <p>-- ETH</p> // Default placeholder for ETH values
                )}
              </div>
            ))}
          </>
        )}
        {borrowerRate || lenderAPY ? (
          <>
            {/* Continue button only appears if rates are calculated */}
            <button className={`mt-6 bg-[#48BF84] text-white px-4 py-2 rounded w-full font-bold`}>
              Continue
            </button>
          </>
        ) : null}
        
        {/* Terms of your offer moved under calculations */}
        {borrowerRate && lenderAPY && (
          <>
          	<h3 className='text-xl font-semibold mt-6'>Terms of your offer</h3> 
          	<div> 
          		<p>The terms are subject to change based on market conditions.</p> 
          		<p>Please review all details before proceeding.</p> 
          	</div> 
          	<Link to="/terms" className='text-blue-500'>View Full Terms and Conditions</Link> 
          </>
        )}
      </div>

    </div>
  );
};

export default Borrow;