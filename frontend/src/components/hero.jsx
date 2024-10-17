import React from 'react';
import bankIcon from '../assets/bankicon.png'; // Adjust the path as needed

const Hero = () => {
  return (
    <section className="bg-blue-100 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center"> {/* Align items in a row on larger screens */}
          
          {/* Left side content */}
          <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pl-12 mt-10"> {/* Added margin-top */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">Loans Backed By Crypto</h1>
            <p className="text-2xl md:text-3xl mb-8">Don't sell your crypto, borrow against it.</p>
            <button className="bg-[#48BF84] text-white px-8 py-3 rounded hover:bg-[#3da46f] transition duration-300">
              Get Started
            </button>
          </div>
          
          {/* Right side icon */}
          <div className="w-full md:w-1/2 flex justify-center items-center -mt-10"> {/* Added negative margin-top */}
            <img 
              src={bankIcon}
              alt="Bank Icon" 
              className="w-[480px] h-[480px] object-contain transform rotate-6 transition-transform duration-300 hover:rotate-12"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;