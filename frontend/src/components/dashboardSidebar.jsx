import React from 'react';

const DashboardSidebar = ({ activeComponent, setActiveComponent, onClose }) => {
  const menuItems = [
    { name: 'Home', icon: '🏠', value: 'home' },
    { name: 'Lend', icon: '💰', value: 'lend' },
    { name: 'Borrow', icon: '🏦', value: 'borrow' },
    { name: 'MyWallet', icon: '👛', value: 'myWallet' }
  ];

  return (
    <nav className={`bg-transparent sidebar`}>
      {/* Close button for mobile drawers */}
      <div className="flex items-center justify-between md:hidden mb-4">
        <h3 className="text-lg font-semibold">Menu</h3>
        <button
          onClick={() => onClose && onClose()}
          aria-label="Close sidebar"
          className="p-2 rounded-md bg-gray-100"
        >
          ✕
        </button>
      </div>

      <ul className="py-4">
        {menuItems.map((item) => (
          <li key={item.value} className="mb-2">
            <button
              onClick={() => {
                console.log('Setting active component to:', item.value);
                setActiveComponent(item.value);
                // close on mobile after selecting
                if (onClose) onClose();
              }}
              className={`flex items-center w-full px-4 py-3 text-left hover:bg-gray-100 cursor-pointer ${
                activeComponent === item.value ? 'bg-gray-200 font-semibold' : 'text-gray-600'
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