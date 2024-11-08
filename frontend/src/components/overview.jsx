// src/components/overview.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Overview = () => {
  const cards = [
    { title: 'Concepts', link: '/concepts' },
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Primitives', link: '/primitives' },
    { title: 'FAQ', link: '/faq' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Overview</h2>
      <h3 className="text-2xl font-semibold mb-4">MicroVault Overview</h3>
      <p className="text-base text-gray-700 mb-6">
        MicroVault is a decentralized platform that revolutionizes microloans by offering flexible options tailored for the crypto ecosystem. Our platform provides both flash loans and standard microloans, enabling users to access liquidity quickly and efficiently. To ensure the safety and security of our loan products, users are required to over-collateralize their assets, minimizing risk and safeguarding against market volatility.
      </p>
      <div className="space-y-4 mb-8">
        <div className="p-4 border-l-4 border-[#48BF84] bg-gray-100">
          <h4 className="text-lg font-semibold mb-2">Flash Loans</h4>
          <p className="text-sm text-gray-600">
            Instant, unsecured loans that must be repaid within the same blockchain transaction. Perfect for arbitrage opportunities, refinancing, or leveraging yield farming strategies.
          </p>
        </div>
        <div className="p-4 border-l-4 border-[#48BF84] bg-gray-100">
          <h4 className="text-lg font-semibold mb-2">Standard Microloans</h4>
          <p className="text-sm text-gray-600">
            Traditional microloans with flexible terms, secured through over-collateralization, providing users with a secure way to access funds without the need for credit checks.
          </p>
        </div>
      </div>
      <p className="text-base text-gray-700 mb-8">
        By leveraging the power of smart contracts, MicroVault ensures a trustless, transparent, and secure lending process, empowering users with control and autonomy over their crypto assets.
      </p>

      <h3 className="text-2xl font-semibold mb-4">Get Familiar with MicroVault</h3>
      <div className="grid grid-cols-2 gap-4">
        {cards.map((card, index) => (
          <Link key={index} to={card.link} className="block p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <h4 className="text-xl font-semibold mb-2">{card.title}</h4>
            <p className="text-sm text-gray-600">Learn more about {card.title.toLowerCase()}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Overview;