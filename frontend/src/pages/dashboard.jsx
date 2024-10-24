import React, { useState } from 'react';
import Trading from '../components/trading';
import Lend from '../components/lend';
import Borrow from '../components/borrow';
import MyWallet from '../components/myWallet';

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState('trading');

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left-side menu */}
      <div className="w-1/4 bg-white shadow-md flex flex-col">
        <nav className="flex-grow">
          <ul className="py-4">
            {['trading', 'lend', 'borrow', 'myWallet'].map((item) => (
              <li
                key={item}
                className={`px-6 py-3 hover:bg-gray-100 cursor-pointer ${
                  activeComponent === item ? 'bg-gray-200' : ''
                }`}
                onClick={() => setActiveComponent(item)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto">
          <div className="px-6 py-3 hover:bg-gray-100 cursor-pointer">Settings</div>
        </div>
      </div>

      {/* Right-side content */}
      <div className="w-3/4 p-8 overflow-auto">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {/* Dynamic Content */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div style={{ display: activeComponent === 'trading' ? 'block' : 'none' }}>
            <Trading />
          </div>
          <div style={{ display: activeComponent === 'lend' ? 'block' : 'none' }}>
            <Lend />
          </div>
          <div style={{ display: activeComponent === 'borrow' ? 'block' : 'none' }}>
            <Borrow />
          </div>
          <div style={{ display: activeComponent === 'myWallet' ? 'block' : 'none' }}>
            <MyWallet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;