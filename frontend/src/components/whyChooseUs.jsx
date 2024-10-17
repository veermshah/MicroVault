import React from 'react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';

const WhyChooseUs = () => {
  const comparisonData = [
    { feature: "Focused on helping you HODL", us: true, traditional: false },
    { feature: "No prepayment fees", us: true, traditional: false },
    { feature: "No impact on your credit score", us: true, traditional: false },
    { feature: "No borrowing against future income, only against collateral you already own", us: true, traditional: false },
    { feature: "Loan amount determined by your available crypto collateral", us: true, traditional: false },
    { feature: "Opportunity to grow crypto holdings", us: true, traditional: false },
  ];

  return (
    <section className="bg-[#9ed4b7] min-h-screen flex items-center py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-black">Why Choose Us</h2>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#48BF84] text-white">
                <th className="py-4 px-6 text-left">Feature</th>
                <th className="py-4 px-6 text-center">SALT Loan</th>
                <th className="py-4 px-6 text-center">Traditional Loan</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="py-4 px-6">{item.feature}</td>
                  <td className="py-4 px-6 text-center">
                    {item.us ? (
                      <CheckIcon className="h-6 w-6 text-green-500 mx-auto" />
                    ) : (
                      <XMarkIcon className="h-6 w-6 text-red-500 mx-auto" />
                    )}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {item.traditional ? (
                      <CheckIcon className="h-6 w-6 text-green-500 mx-auto" />
                    ) : (
                      <XMarkIcon className="h-6 w-6 text-red-500 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-center mt-8">
          <h3 className="text-2xl font-semibold text-black mb-4">
            See How We Stack Up Against Our Competitors
          </h3>
          <button className="bg-[#48BF84] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#3da46f] transition duration-300">
            Compare Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;