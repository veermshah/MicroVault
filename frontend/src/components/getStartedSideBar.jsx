// src/components/getStartedSidebar.jsx
import React from 'react';

const GetStartedSidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    {
      title: 'Introduction',
      size: 'text-xl',
      items: [
        { name: 'Overview', id: 'overview' },
        { name: 'Concepts', id: 'concepts' }
      ]
    },
    {
      title: 'Primitives',
      size: 'text-xl',
      items: [
        { name: 'Liquidity Pool', id: 'liquidityPool' },
        { name: 'Reserve', id: 'reserve' }
      ]
    },
    {
      title: 'Resources',
      size: 'text-xl',
      items: [
        { name: 'FAQ', id: 'faq' }
      ]
    }
  ];

  return (
    <nav className="bg-transparent">
      {menuItems.map((section, index) => (
        <div key={index} className="mb-6">
          <h2 className={`${section.size} font-bold mb-2`}>{section.title}</h2>
          <ul>
            {section.items.map((item) => (
              <li key={item.id} className="mb-2">
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`text-base ${
                    activeSection === item.id ? 'text-gray-900 font-semibold' : 'text-gray-600'
                  } hover:text-gray-900`}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
};

export default GetStartedSidebar;