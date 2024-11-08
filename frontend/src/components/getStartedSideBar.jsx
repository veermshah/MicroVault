// src/components/getStartedSidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const getStartedSidebar = () => {
  const menuItems = [
    {
      title: 'Introduction',
      size: 'text-xl',
      items: ['Overview', 'Concepts']
    },
    {
      title: 'Primitives',
      size: 'text-xl',
      items: ['Liquidity Pool', 'Reserve']
    },
    {
      title: 'Resources',
      size: 'text-xl',
      items: ['FAQ']
    }
  ];

  return (
    <nav className="bg-transparent">
      {menuItems.map((section, index) => (
        <div key={index} className="mb-6">
          <h2 className={`${section.size} font-bold mb-2`}>{section.title}</h2>
          <ul>
            {section.items.map((item, itemIndex) => (
              <li key={itemIndex} className="mb-2">
                <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="text-base text-gray-600 hover:text-gray-900">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
};

export default getStartedSidebar;