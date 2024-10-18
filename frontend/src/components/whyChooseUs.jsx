import React from 'react';
import { CheckIcon, XMarkIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

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
    <section className="bg-[ffffff] min-h-screen flex items-center py-16">
      <div className="container mx-auto px-10"> 
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
                  <td className="py-4 px-6 border-b border-gray-200">{item.feature}</td>
                  <td className="py-4 px-6 text-center border-b border-gray-200">
                    {item.us ? (
                      <CheckIcon className="h-6 w-6 text-green-500 mx-auto" />
                    ) : (
                      <XMarkIcon className="h-6 w-6 text-red-500 mx-auto" />
                    )}
                  </td>
                  <td className="py-4 px-6 text-center border-b border-gray-200">
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
        <div className="mt-4 flex items-center">
          <h3 className="text-l font-semibold text-[#48BF84] mr-2"> 
            See How We Stack Up Against Our Competitors
          </h3>
          <ArrowRightIcon className="h-4 w-4 text-[#48BF84]" />
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;