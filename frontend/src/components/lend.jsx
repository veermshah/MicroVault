import React, { useState } from 'react';

const Lend = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [loanDuration, setLoanDuration] = useState('');
  const [collateralType, setCollateralType] = useState('ETH');
  const [serviceFee, setServiceFee] = useState(null);

  const serviceFeePercentage = 0.02;

  const calculateServiceFee = () => {
    const calculatedServiceFee = loanAmount * serviceFeePercentage;
    setServiceFee(calculatedServiceFee.toFixed(5));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateServiceFee();
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 py-6"> {/* Changed p-6 to py-6 */}
      {/* Left Column */}
      <div className="md:w-1/2 p-4 rounded-lg bg-white bg-opacity-80">
        <h2 className="text-2xl font-semibold mb-6">Lend</h2>
        
        <form onSubmit={handleSubmit}>
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
              <option value="DAI">DAI</option>
              <option value="USDC">USDC</option>
            </select>
          </div>

          <button type="submit" className="mt-6 bg-[#48BF84] text-white px-4 py-2 rounded w-full font-bold">
            Calculate Service Fee
          </button>
        </form>
      </div>

      {/* Right Column */}
      <div className="md:w-1/2 bg-[#48BF84]/10 p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Lending Terms</h3>

        {serviceFee !== null && (
          <>
            <div className="flex justify-between mt-2">
              <p className="font-bold">Service Fee:</p>
              <p>{serviceFee} ETH</p>
            </div>
          </>
        )}

        {serviceFee === null && (
          <>
            <div className="flex justify-between mt-2">
              <p className="font-bold">Service Fee:</p>
              <p>-- ETH</p>
            </div>
          </>
        )}

        {serviceFee !== null && (
          <button className="mt-6 bg-[#48BF84] text-white px-4 py-2 rounded w-full font-bold">
            Confirm Lending
          </button>
        )}
      </div>
    </div>
  );
};

export default Lend;