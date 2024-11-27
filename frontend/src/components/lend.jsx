import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Lend = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [loanDuration, setLoanDuration] = useState('');
  const [collateralType, setCollateralType] = useState('ETH');
  const [lenderAPY, setLenderAPY] = useState(null);
  const [serviceFee, setServiceFee] = useState(null);
  const [expectedReturn, setExpectedReturn] = useState(null);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const baseRate = 0.05;
  const durationMultiplier = 0.001;
  const serviceFeePercentage = 0.01;
  const maxLoanAmount = 100;
  const minLoanAmount = 0.0001;

  useEffect(() => {
    if (loanAmount && loanDuration) {
      calculateRates();
    }
  }, [loanAmount, loanDuration]);

  const calculateRates = () => {
    const amount = parseFloat(loanAmount);
    const duration = parseFloat(loanDuration);
    
    const calculatedAPY = baseRate + (duration * durationMultiplier);
    const calculatedServiceFee = amount * serviceFeePercentage;
    const calculatedReturn = amount * (1 + calculatedAPY * (duration / 12)) - amount;

    setLenderAPY((calculatedAPY * 100).toFixed(2));
    setServiceFee(calculatedServiceFee.toFixed(5));
    setExpectedReturn(calculatedReturn.toFixed(5));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateRates();
  };

  const handleLoanAmountChange = (e) => {
    let value = e.target.value;
    if (value === '' || value === '.' || parseFloat(value) >= minLoanAmount) {
      value = value;
    } else if (parseFloat(value) < minLoanAmount) {
      value = '';
    }
    if (parseFloat(value) > maxLoanAmount) {
      alert(`Maximum loan amount is ${maxLoanAmount} ETH.`);
      value = maxLoanAmount.toString();
    }
    setLoanAmount(value);
  };

  return (
    <div className="flex flex-col gap-8 py-6">
      <div className="w-full bg-white border border-gray-300 rounded-2xl p-6">
        <h2 className="text-2xl font-semibold mb-4">Lending Overview</h2>
        <p className="text-gray-700 mb-4">
          MicroVault operates as a decentralized lending platform, allowing you to lend your crypto assets and earn interest. Here's how it works:
        </p>
        <div className="space-y-4">
          {[
            "Deposit your ETH into the lending pool.",
            "Borrowers take out overcollateralized loans using these funds.",
            "Smart contracts manage loans and collateral automatically.",
            "Earn interest on your deposited assets, with rates increasing for longer durations.",
            "Your funds are protected by overcollateralization (typically 150%+ of loan value).",
            "Automatic liquidation protects lenders if collateral value drops below required ratio.",
            "Withdraw your funds and earned interest anytime, subject to liquidity.",
            "Small service fee covers operational costs and enhances ecosystem security."
          ].map((step, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-[#48BF84] text-white rounded-full flex items-center justify-center mr-3">
                {index + 1}
              </div>
              <p className="text-gray-700">{step}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-gray-700 font-semibold">
          Earn passive income on your crypto assets while contributing to DeFi liquidity.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 p-4 rounded-2xl border border-gray-300 bg-gray-100">
          <h2 className="text-2xl font-semibold mb-6">Lend</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2">Loan Amount (ETH)</label>
              <input 
                type="number" 
                className="w-full p-2 border rounded"
                value={loanAmount}
                onChange={handleLoanAmountChange}
                placeholder="Enter Amount"
                required
              />
            </div>

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
              <label className="block mb-2">Collateral Type</label>
              <select 
                className="w-full p-2 border rounded"
                value={collateralType}
                onChange={(e) => setCollateralType(e.target.value)}
              >
                <option value="ETH">ETH</option>
              </select>
            </div>

            <button type="submit" className="mt-6 bg-[#48BF84] text-white px-4 py-2 rounded w-full font-bold">
              Calculate Lending Terms
            </button>
          </form>
        </div>

        <div className="md:w-1/2 bg-[#48BF84]/10 p-4 rounded-2xl border border-[#48BF84]">
          <h3 className="text-xl font-semibold mb-4">Lending Terms</h3>

          {lenderAPY !== null ? (
            <>
              <div className="flex justify-between mt-2">
                <p className="font-bold">Lender APY:</p>
                <p>{lenderAPY}%</p>
              </div>
              <div className="flex justify-between mt-2">
                <p className="font-bold">Service Fee:</p>
                <p>{serviceFee} ETH</p>
              </div>
              <div className="flex justify-between mt-2">
                <p className="font-bold">Expected Return:</p>
                <p>{expectedReturn} ETH</p>
              </div>
              <div className='flex items-center mt-4'>
                <input
                  type='checkbox'
                  checked={agreeToTerms}
                  onChange={() => setAgreeToTerms(!agreeToTerms)}
                />
                <span className="ml-2">I agree to the Terms and Conditions</span>
              </div>
              <button
                disabled={!agreeToTerms}
                className={`mt-4 ${
                  agreeToTerms ? 'bg-[#48BF84]' : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                } text-white px-4 py-2 rounded w-full font-bold`}
              >
                Confirm Lending
              </button>
              <Link to="/faq" className="mt-4 block text-center bg-white border rounded px-4 py-2">
                FAQ
              </Link>
            </>
          ) : (
            <>
              <div className="flex justify-between mt-2">
                <p className="font-bold">Lender APY:</p>
                <p>--%</p>
              </div>
              <div className="flex justify-between mt-2">
                <p className="font-bold">Service Fee:</p>
                <p>-- ETH</p>
              </div>
              <div className="flex justify-between mt-2">
                <p className="font-bold">Expected Return:</p>
                <p>-- ETH</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lend;