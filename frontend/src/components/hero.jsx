import React from 'react';
import bankIcon from '../assets/bankicon.png'; // Adjust the path as needed

const Hero = () => {
  return (
    <section className="white min-h-screen flex items-center relative overflow-hidden">
      {/* Blur element for the left upper area */}
      <div className="absolute top-[-250px] left-[-250px] w-[500px] h-[500px] bg-[#48bf84]/60 rounded-full blur-[120px] z-0" />
      
      {/* Blur element for the top right of the bank icon */}
      <div className="absolute top-[10%] right-[-100px] w-[400px] h-[400px] bg-[#48bf84]/60 rounded-full blur-[120px] z-0" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left side content */}
          <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pl-12 mt-10">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">Loans Backed By Crypto</h1>
            <p className="text-2xl md:text-3xl mb-8">Don't sell your crypto, borrow against it.</p>
            <button className="bg-[#48BF84] text-white px-8 py-3 rounded hover:bg-[#3da46f] transition duration-300">
              Get Started
            </button>
          </div>
          
          {/* Right side icon */}
          <div className="w-full md:w-1/2 flex justify-center items-center -mt-10">
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