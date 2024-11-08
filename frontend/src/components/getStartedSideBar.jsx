// src/components/getStartedSidebar.jsx
import React, { useState } from 'react';

const GetStartedSidebar = ({ activeSection, setActiveSection }) => {
  const [isConceptsOpen, setIsConceptsOpen] = useState(false); // State for dropdown

  const menuItems = [
    {
      title: 'Introduction',
      size: 'text-xl',
      items: [
        { name: 'Overview', id: 'overview' },
        { name: 'Concepts', id: 'concepts', hasSubItems: true } // Indicate that this item has sub-items
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
                  onClick={() => {
                    if (item.hasSubItems) {
                      setIsConceptsOpen(!isConceptsOpen); // Toggle dropdown
                    } else {
                      setActiveSection(item.id);
                    }
                  }}
                  className={`text-base ${
                    activeSection === item.id ? 'text-gray-900 font-semibold' : 'text-gray-600'
                  } hover:text-gray-900`}
                >
                  {item.name}
                </button>
                {/* Render sub-items if this is the Concepts section and it's open */}
                {item.hasSubItems && isConceptsOpen && (
                  <ul className="ml-4 mt-2">
                    <li className="mb-1">
                      <button
                        onClick={() => setActiveSection('flashLoans')}
                        className={`text-sm ${
                          activeSection === 'flashLoans' ? 'text-gray-900 font-semibold' : 'text-gray-600'
                        } hover:text-gray-900`}
                      >
                        Flash Loans
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveSection('standardMicroloans')}
                        className={`text-sm ${
                          activeSection === 'standardMicroloans' ? 'text-gray-900 font-semibold' : 'text-gray-600'
                        } hover:text-gray-900`}
                      >
                        Standard Microloans
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
};

export default GetStartedSidebar;