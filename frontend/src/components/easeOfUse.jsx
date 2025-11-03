import React from 'react';
import laptopMockup from '../assets/laptopmockup.png'; // Updated image source
import { CheckIcon } from '@heroicons/react/24/solid'; // Import CheckIcon for checkmarks

const EaseOfUse = () => {
  return (
    <section className="bg-transparent mt-24 mx-4 md:mx-12 lg:mx-20 relative overflow-visible">
  {/* Blur elements inside the section (reduced/hidden on small screens) */}
  <div className="hidden sm:block absolute -top-24 -left-24 w-40 h-40 md:w-[400px] md:h-[400px] bg-[#48bf84]/60 rounded-full blur-[120px] z-0" />
  <div className="hidden md:block absolute -bottom-20 -right-10 w-32 h-40 md:w-[300px] md:h-[500px] bg-[#48bf84]/60 rounded-full blur-[100px] z-0" />

      <div className="bg-transparent rounded-lg overflow-hidden relative z-10"> {/* Set background to transparent */}
        <div className="container mx-auto px-6 py-8 relative z-10">
          <div className="max-w-[1248px] w-full mx-auto flex flex-col md:flex-row items-center justify-center">
            {/* Left side image (responsive sizing) */}
            <div className="w-full md:w-1/2 flex justify-center items-center mb-8 md:mb-0 pr-0 md:pr-16">
              <img 
                src={laptopMockup}
                alt="Laptop Mockup" 
                className="w-64 sm:w-80 md:w-[500px] md:h-[500px] object-contain"
              />
            </div>

            {/* Right side content */}
            <div className="w-full md:w-1/2 flex flex-col items-start justify-center text-left pl-0 md:pl-16">
              <h2 className="text-3xl font-bold mb-4 leading-tight text-black">Crypto-Backed Loan</h2> {/* Updated title */}

              {/* Features List with Checkmarks */}
              <ul className="list-none mb-6">
                <li className="flex items-center mb-2">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                  Starting from $5,000*
                </li>
                <li className="flex items-center mb-2">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                  Fixed Rates from 8.95% to 14.45% APR
                </li>
                <li className="flex items-center mb-2">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                  12-month terms
                </li>
                <li className="flex items-center mb-2">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                  Borrow up to 70% LTV
                </li>
                <li className="flex items-center mb-2">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                  $0 prepayment fees
                </li>
              </ul>

              {/* Sign Up Button */}
              <button className="bg-[#48BF84] text-white px-8 py-3 rounded-[50px] hover:bg-[#3da46f] transition duration-300 text-lg">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EaseOfUse;