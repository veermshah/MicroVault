// src/components/dashboardSidebar.jsx

import React from 'react';

const DashboardSidebar = ({ activeComponent, setActiveComponent }) => {
  const menuItems = [
    { name: 'Trading', icon: '📊' },
    { name: 'Lend', icon: '💰' },
    { name: 'Borrow', icon: '🏦' },
    { name: 'MyWallet', icon: '👛' }
  ];

  return (
    <nav className="bg-transparent">
      <ul className="m-0"> {/* No margin on the list */}
        {menuItems.map((item) => (
          <li key={item.name.toLowerCase()} className="mb-2">
            <button
              onClick={() => setActiveComponent(item.name.toLowerCase())}
              className={`flex items-center w-full px-4 py-3 text-left hover:bg-gray-100 cursor-pointer rounded-lg ${
                activeComponent === item.name.toLowerCase() ? 'bg-gray-200 font-semibold' : 'text-gray-600'
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DashboardSidebar;