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
    <section className="bg-transparent mt-28 mx-4 md:mx-12 lg:mx-20 relative overflow-visible">
      {/* Blur effects */}
      <div className="absolute top-[250px] left-[0px] w-[400px] h-[500px] bg-[#48bf84]/40 rounded-full blur-[120px] z-0" />
      <div className="absolute bottom-[200px] right-[100px] w-[300px] h-[500px] bg-[#48bf84]/30 rounded-full blur-[100px] z-0" />

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="max-w-[1248px] w-full mx-auto">
          <h2 className="text-[40px] font-bold text-center mb-12 text-black">Why Choose Us</h2> {/* Set title to 40px */}
          <div className="bg-white rounded-[1rem] shadow-lg overflow-hidden relative z-10">
            {/* Set gradient background for the table */}
            <div
              style={{
                background: '#11998e',  /* fallback for old browsers */
                background: '-webkit-linear-gradient(to right, #48BF84, #11998e)',  /* Chrome 10-25, Safari 5.1-6 */
                background: 'linear-gradient(to right, #48BF84, #11998e)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
              }}
              className="p-4 rounded-tl-[1rem] rounded-tr-[1rem]"
            >
              <table className="w-full">
                <thead>
                  <tr className="text-white">
                    <th className="py-4 px-6 text-left">Feature</th>
                    <th className="py-4 px-6 text-center">MicroVault Loan</th>
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
          </div>
          <div className="mt-8 flex items-center justify-center relative z=10">
            {/* Gradient Text with Arrow */}
            <h3
              className="text-[20px] font-semibold mr=2"
              style={{
                backgroundImage: 'linear-gradient(to right, #38ef7d, #11998e)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent'
              }}
            >
              See How We Stack Up Against Our Competitors
            </h3> {/* Set text to 20px */}
            {/* Arrow Icon with Fixed Size */}
            <ArrowRightIcon className="h-[20px] w-[20px] text-[#48BF84]" /> {/* Set fixed size for arrow */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;