import React, { useState, useEffect } from 'react';

const Borrow = () => {
  const [collateralType, setCollateralType] = useState('ETH');
  const [collateralAmount, setCollateralAmount] = useState('');
  const [cashToBorrow, setCashToBorrow] = useState(100);
  const [ethPrice, setEthPrice] = useState('Loading...');

  const [interestRate, setInterestRate] = useState('');
  const [ltv, setLtv] = useState('');
  const [maxCash, setMaxCash] = useState('');
  const [originationFee, setOriginationFee] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [totalLoanAmount, setTotalLoanAmount] = useState('');
  const [minCollateral, setMinCollateral] = useState('');

  // Function to fetch ETH price from CoinGecko
  const fetchEthPrice = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
      const data = await response.json();
      setEthPrice(data.ethereum.usd);
    } catch (error) {
      console.error("Error fetching ETH price:", error);
      setEthPrice('Error');
    }
  };

  useEffect(() => {
    // Fetch ETH price on component mount
    fetchEthPrice();

    // Set up an interval to refresh the ETH price every minute
    const interval = setInterval(fetchEthPrice, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (collateralAmount && collateralType === 'ETH' && ethPrice !== 'Loading...' && ethPrice !== 'Error') {
      const collateralValue = parseFloat(collateralAmount) * ethPrice;
      const maxBorrow = collateralValue * 0.75; // 75% max LTV
      setMaxCash(maxBorrow.toFixed(2));

      const currentLtv = (cashToBorrow / collateralValue) * 100;
      setLtv(currentLtv.toFixed(2));

      if (currentLtv < 55) {
        setInterestRate('12.50');
      } else if (currentLtv < 65) {
        setInterestRate('13.75');
      } else {
        setInterestRate('15.00');
      }

      const fee = cashToBorrow * 0.01;
      setOriginationFee(fee.toFixed(2));

      const monthlyInterest = (cashToBorrow * (parseFloat(interestRate) / 100)) / 12;
      setMonthlyPayment(monthlyInterest.toFixed(2));

      setTotalLoanAmount((parseFloat(cashToBorrow) + fee).toFixed(2));

      const requiredCollateral = (cashToBorrow / (ethPrice * 0.75)).toFixed(2);
      setMinCollateral(requiredCollateral);
    }
  }, [collateralAmount, cashToBorrow, collateralType, ethPrice]);

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6">
      {/* Left Column */}
      <div className="md:w-1/2 p-4 rounded-lg bg-white bg-opacity-80">
        <h2 className="text-2xl font-semibold mb-6">Borrow</h2>
        
        <div className="mb-4">
          <label className="block mb-2">Collateral Type</label>
          <select 
            className="w-full p-2 border rounded"
            value={collateralType}
            onChange={(e) => setCollateralType(e.target.value)}
          >
            <option value="ETH">Ethereum (ETH)</option>
          </select>
          <p className="mt-1 text-sm text-gray-600">Current ETH Price: ${ethPrice}</p>
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

        <div className="flex justify-between mb-4">
          <div className="text-center">
            <p>Cash to Borrow:</p>
            <p>${cashToBorrow}</p>
          </div>
          <div className="text-center">
            <p>Interest Rate:</p>
            <p>{interestRate}%</p>
          </div>
          <div className="text-center">
            <p>Initial Loan To Value:</p>
            <p>{ltv}%</p>
          </div>
        </div>

        <div className="mb-4">
          <input 
            type="range" 
            min="100" 
            max={maxCash}
            step="100"
            className="w-full"
            value={cashToBorrow}
            onChange={(e) => setCashToBorrow(e.target.value)}
          />
          <div className="flex justify-between">
            <span>$100</span>
            <span>${maxCash}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600">
          Increasing your cash amount increases your LTV. Interest rates shown are based on current cash and collateral selection.
        </p>

        <table className="w-full mt-4 border-collapse">
          <thead>
            <tr>
              <th className="text-left border-b">Interest Rate</th>
              <th className="text-left border-b">Initial LTV</th>
              <th className="text-left border-b">Max. Cash</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-b">12.50%</td>
              <td className="border-b">0-&lt;55%</td>
              <td className="border-b">${(parseFloat(maxCash) * 0.55).toFixed(2)}</td>
            </tr>
            <tr>
              <td className="border-b">13.75%</td>
              <td className="border-b">55-&lt;65%</td>
              <td className="border-b">${(parseFloat(maxCash) * 0.65).toFixed(2)}</td>
            </tr>
            <tr>
              <td className="border-b">15.00%</td>
              <td className="border-b">65-75%</td>
              <td className="border-b">${maxCash}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Right Column */}
      <div className="md:w-1/2 bg-[#48BF84]/10 p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Terms of your offer</h3>

        <div className="mb-4 flex items-center justify-between">
          <label className="block mb-2 mr-4 font-bold">State of Residence</label>
          <select className="w-auto p-2 border rounded">
            <option>California</option>
          </select>
        </div>

        {[
          { label: 'Term', value: '12 months' },
          { label: 'Cash Draw Amount | USD', value: `$${cashToBorrow}` },
          { label: 'LTV', value: `${ltv}%` },
          { label: 'Origination Fee', value: `$${originationFee}/1.00%` },
          { label: 'Rate / APR', value: `${interestRate}%/ ${(parseFloat(interestRate) + 1.15).toFixed(2)}%` },
          { label: 'Est. Monthly Interest-Only Payment', value: `$${monthlyPayment}` },
        ].map((item, index) => (
          <div key={index} className="flex justify-between mt-2">
            <p className="font-bold">{item.label}</p>
            <p>{item.value}</p>
          </div>
        ))}

        <p className="mt-4 text-sm">
          Interest deferral is available for this interest-only loan.
          You can elect to defer interest from your servicing dashboard following the disbursement ...read more
        </p>

        <hr className="my-4 border-t border-gray-300" />

        <div className="mt-4 flex justify-between font-bold">
          Total Loan Amount
          <span>${totalLoanAmount}</span>
        </div>

        <div className="mt-4 flex justify-between font-bold">
          Est. Min. Collateral
          <span>{minCollateral} ETH</span>
        </div>

        <p>Required collateral amount will be finalized later in the process based on the current price of ETH.</p>

        <button className="mt-6 bg-[#48BF84] text-white px-4 py-2 rounded w-full font-bold">
          Continue
        </button>
      </div>
    </div>
  );
};

export default Borrow;