import React, { useEffect, useRef, useState } from 'react';
import { CheckIcon, XMarkIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

// Custom hook for Intersection Observer
const useIntersectionObserver = (options) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return [ref, isVisible];
};

const WhyChooseUs = () => {
  const [sectionRef, isVisible] = useIntersectionObserver({
    threshold: 0.1,
  });

  const comparisonData = [
    { feature: "Focused on helping you HODL", us: true, traditional: false },
    { feature: "No prepayment fees", us: true, traditional: false },
    { feature: "No impact on your credit score", us: true, traditional: false },
    { feature: "No borrowing against future income, only against collateral you already own", us: true, traditional: false },
    { feature: "Loan amount determined by your available crypto collateral", us: true, traditional: false },
    { feature: "Opportunity to grow crypto holdings", us: true, traditional: false },
  ];

  return (
    <section 
      ref={sectionRef}
      className={`bg-transparent mt-28 mx-4 md:mx-12 lg:mx-20 relative overflow-visible transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Blur effects */}
      <div className="absolute top-[250px] left-[0px] w-[400px] h-[500px] bg-[#48bf84]/40 rounded-full blur-[120px] z-0" />
      <div className="absolute bottom-[200px] right-[100px] w-[300px] h-[500px] bg-[#48bf84]/30 rounded-full blur-[100px] z-0" />

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="max-w-[1248px] w-full mx-auto">
          <h2 className="text-2xl lg:text-[40px] font-bold text-center mb-8 lg:mb-12 text-black">Why Choose Us</h2>

          {/* Desktop / Laptop: table (visible on lg and up) */}
          <div className="hidden lg:block bg-white rounded-2xl border border-gray-300 overflow-hidden relative z-10">
            {/* Gradient header for table */}
            <div
              style={{
                background: '#11998e',
                background: '-webkit-linear-gradient(to right, #48BF84, #11998e)',
                background: 'linear-gradient(to right, #48BF84, #11998e)',
              }}
              className="p-4 rounded-tl-2xl rounded-tr-2xl"
            >
              <div className="overflow-x-auto">
                <table className="w-full min-w-[680px]">
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
          </div>

          {/* Tablet & Mobile: stacked cards (visible below lg) */}
          <div className="lg:hidden space-y-4">
            {comparisonData.map((item, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-start justify-between">
                  <div className="pr-4 flex-1">
                    <div className="text-sm text-gray-700">{item.feature}</div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col items-center">
                      <div className="text-xs text-gray-500">MicroVault</div>
                      {item.us ? (
                        <CheckIcon className="h-5 w-5 text-green-500 mt-1" />
                      ) : (
                        <XMarkIcon className="h-5 w-5 text-red-500 mt-1" />
                      )}
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-xs text-gray-500">Traditional</div>
                      {item.traditional ? (
                        <CheckIcon className="h-5 w-5 text-green-500 mt-1" />
                      ) : (
                        <XMarkIcon className="h-5 w-5 text-red-500 mt-1" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex items-center justify-center relative z-10">
            {/* Gradient Text with Arrow as a Link */}
            <Link 
              to="/get-started" 
              className="flex items-center hover:opacity-80 transition-opacity duration-300"
            >
              <h3
                className="text-[20px] font-semibold mr-2"
                style={{
                  backgroundImage: 'linear-gradient(to right, #38ef7d, #11998e)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent'
                }}
              >
                See How Our Core Features Work
              </h3>
              <ArrowRightIcon className="h-[20px] w-[20px] text-[#48BF84]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;