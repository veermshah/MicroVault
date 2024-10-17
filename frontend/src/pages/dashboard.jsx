import React from 'react';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left-side menu */}
      <div className="w-1/4 bg-white shadow-md flex flex-col">
        <nav className="flex-grow">
          <ul className="py-4">
            <li className="px-6 py-3 hover:bg-gray-100 cursor-pointer">Trading</li>
            <li className="px-6 py-3 hover:bg-gray-100 cursor-pointer">My Wallet</li>
            <li className="px-6 py-3 hover:bg-gray-100 cursor-pointer">Loans</li>
          </ul>
        </nav>
        <div className="mt-auto">
          <div className="px-6 py-3 hover:bg-gray-100 cursor-pointer">Settings</div>
        </div>
      </div>

      {/* Right-side content */}
      <div className="w-3/4 p-8 overflow-auto">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        
        {/* Bitcoin Box */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Bitcoin (BTC)</h2>
          <div className="aspect-w-16 aspect-h-9 bg-gray-200">
            {/* TradingView Chart will go here */}
            <p className="flex items-center justify-center h-full">TradingView BTC Chart</p>
          </div>
        </div>

        {/* Ethereum Box */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Ethereum (ETH)</h2>
          <div className="aspect-w-16 aspect-h-9 bg-gray-200">
            {/* TradingView Chart will go here */}
            <p className="flex items-center justify-center h-full">TradingView ETH Chart</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;