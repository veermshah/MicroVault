// src/pages/Dashboard.jsx

import React, { useState } from 'react';
import DashboardSidebar from '../components/DashboardSidebar';
import Trading from '../components/trading';
import Lend from '../components/lend';
import Borrow from '../components/borrow';
import MyWallet from '../components/myWallet';

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState('trading');

  const renderContent = () => {
    switch (activeComponent) {
      case 'trading':
        return <Trading />;
      case 'lend':
        return <Lend />;
      case 'borrow':
        return <Borrow />;
      case 'myWallet':
        return <MyWallet />;
      default:
        return <Trading />;
    }
  };

  return (
    <section className="bg-gray-100 min-h-screen mt-28 mx-4 md:mx-12 lg:mx-20">
      <div className="max-w-[1248px] w-full mx-auto px-6 py-16">
        <div className="flex">
          {/* Left-side menu */}
          <div className="w-1/6 pr-8">
            <DashboardSidebar
              activeComponent={activeComponent}
              setActiveComponent={setActiveComponent}
            />
          </div>

          {/* Right-side content */}
          <div className="w-5/6">
            <div className="bg-white shadow-md rounded-lg p-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;