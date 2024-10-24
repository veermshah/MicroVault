import React, { useState } from 'react';

const Borrow = () => {
  const [collateralType, setCollateralType] = useState('');
  const [collateralAmount, setCollateralAmount] = useState('');
  const [cashToBorrow, setCashToBorrow] = useState(100); // Start with $100

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6">
      {/* Left Column */}
      <div className="md:w-1/2 p-4 rounded-lg">
        <h2 className="text-2xl font-semibold mb-6">Borrow</h2>
        
        <div className="mb-4">
          <label className="block mb-2">Collateral Type</label>
          <select 
            className="w-full p-2 border rounded"
            value={collateralType}
            onChange={(e) => setCollateralType(e.target.value)}
          >
            <option value="">Select Collateral Type</option>
            <option value="BTC">Bitcoin (BTC)</option>
            <option value="ETH">Ethereum (ETH)</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Collateral Amount</label>
          <input 
            type="number" 
            className="w-full p-2 border rounded"
            value={collateralAmount}
            onChange={(e) => setCollateralAmount(e.target.value)}
            placeholder="Enter Amount"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Cash to Borrow</label>
          <input 
            type="number" 
            className="w-full p-2 border rounded"
            value={cashToBorrow}
            onChange={(e) => setCashToBorrow(e.target.value)}
            placeholder="Enter Amount"
          />
        </div>

        <div className="mb-4">
          <p>Cash to Borrow: {cashToBorrow ? `$${cashToBorrow}` : '--'}</p>
          <p>Interest Rate: --</p>
          <p>Initial Loan To Value: --</p>
        </div>

        <div className="mb-4">
          {/* Adjusted range input */}
          <input 
            type="range" 
            min="100" 
            max="10000" 
            step="100"
            className="w-full"
            value={cashToBorrow}
            onChange={(e) => setCashToBorrow(e.target.value)}
          />
          <div className="flex justify-between">
            <span>$100</span>
            <span>$10,000</span>
          </div>
        </div>

        <p className="text-sm text-gray-600">
          Increasing your cash amount increases your LTV. Interest rates shown are based on current cash and collateral selection.
        </p>

        <table className="w-full mt-4">
          <thead>
            <tr>
              <th>Interest Rate</th>
              <th>Initial LTV</th>
              <th>Max. Cash</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>12.50%</td>
              <td>0-&lt;55%</td>
              <td>$ --</td>
            </tr>
            <tr>
              <td>13.75%</td>
              <td>55-&lt;65%</td>
              <td>$ --</td>
            </tr>
            <tr>
              <td>15.00%</td>
              <td>65-75%</td>
              <td>$ --</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Right Column */}
      {/* Changed background color to faded green */}
      <div className="md:w-1/2 bg-[#48BF84]/10 p-4 rounded-lg shadow-md">
        {/* Bolded heading */}
        <h3 className="text-xl font-semibold mb-4">Terms of your offer</h3>

        {/* State of Residence */}
        {/* Aligned with flexbox */}
        <div className="mb-4 flex justify-between">
          <label className="block mb-2">State of Residence</label>
          <select className="w-full p-2 border rounded ml-4">
            <option>Texas</option>
            <option>California</option>
            {/* Add other states */}
          </select>
        </div>

        {/* Offer Terms */}
        {[
          { label: 'Term', value: '--' },
          { label: 'Cash Draw Amount | USD', value: '--' },
          { label: 'LTV', value: '--' },
          { label: 'Origination Fee', value: '--' },
          { label: 'Rate / APR', value: '--' },
          { label: 'Est. Monthly Interest-Only Payment', value: '--' },
        ].map((item, index) => (
          // Using flexbox for alignment
          <div key={index} className="flex justify-between mt-2">
            <p>{item.label}</p>
            <p>{item.value}</p> {/* Not bolded */}
          </div>
        ))}

        {/* Additional Info */}
        <p className="mt-4 text-sm">
          Interest deferral is available for this interest-only loan.
          You can elect to defer interest from your servicing dashboard following the disbursement ...read more
        </p>

        {/* Line Separator Above Total Loan Amount */}
        <hr className="my-4 border-t border-gray-300" />

        {/* Total Loan Amount - Not bolded */}
        {/* Flexbox for alignment */}
        <div className="mt-4 flex justify-between font-bold">
          Total Loan Amount
          {/* Not bolded value aligned to the right */}
          <span>--</span> 
        </div>

        {/* Minimum Collateral - Not bolded */}
        {/* Flexbox for alignment */}
        <div className="mt-4 flex justify-between">
          Est. Min. Collateral
        </div>

        {/* Explanatory Text Below Minimum Collateral */}
        {/* Not bolded explanatory text aligned to the right */}
        <p>Required collateral amount will be finalized later in the process based on the current price of BTC.</p>

        {/* Continue Button - Changed to green and stretched across */}
        {/* Adjusted button color and width */}
        <button className="mt-6 bg-[#48BF84] text-white px-4 py-2 rounded w-full font-bold">
          Continue
        </button> {/* Made the button text bold */}
      </div>
    </div>
  );
};

export default Borrow;