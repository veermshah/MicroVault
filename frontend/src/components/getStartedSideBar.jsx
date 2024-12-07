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
        { name: 'Smart Contracts', id: 'smartContracts' } // Added Smart Contracts
      ]
    },
    {
      title: 'Resources',
      size: 'text-xl',
      items: [
        { name: 'Source Code', id: 'sourceCode', link: "https://github.com/veermshah/MicroVault" }, // Added source code link
        { name: 'FAQ', id: 'faq' } // Added FAQ back to resources
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
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-base ${
                      activeSection === item.id ? 'text-gray-900 font-semibold' : 'text-gray-600'
                    } hover:text-gray-900`}
                  >
                    {item.name}
                  </a>
                ) : (
                  <button
                    onClick={() => {
                      if (item.hasSubItems) {
                        setIsConceptsOpen(!isConceptsOpen); // Toggle dropdown
                        if (activeSection !== item.id) {
                          setActiveSection(item.id); // Set active section for Concepts
                        }
                      } else {
                        setActiveSection(item.id); // Set active section for non-dropdown items
                      }
                    }}
                    className={`text-base ${
                      activeSection === item.id ? 'text-gray-900 font-semibold' : 'text-gray-600'
                    } hover:text-gray-900`}
                  >
                    {item.name}
                  </button>
                )}
                {/* Render sub-items if this is the Concepts section and it's open */}
                {item.hasSubItems && isConceptsOpen && (
                  <ul className="ml-4 mt-2">
                    <li className="mb-1">
                      <button
                        onClick={() => setActiveSection('lend')} // Set active section to lend
                        className={`text-sm ${
                          activeSection === 'lend' ? 'text-gray-900 font-semibold' : 'text-gray-600'
                        } hover:text-gray-900`}
                      >
                        Lend
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveSection('borrow')} // Set active section to borrow
                        className={`text-sm ${
                          activeSection === 'borrow' ? 'text-gray-900 font-semibold' : 'text-gray-600'
                        } hover:text-gray-900`}
                      >
                        Borrow
                      </button>
                    </li>
                    {/* Add Crypto Meter as another sub-item */}
                    <li>
                      <button
                        onClick={() => setActiveSection('cryptoMeter')} // Set active section to cryptoMeter
                        className={`text-sm ${
                          activeSection === 'cryptoMeter' ? 'text-gray-900 font-semibold' : 'text-gray-600'
                        } hover:text-gray-900`}
                      >
                        Crypto Meter
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