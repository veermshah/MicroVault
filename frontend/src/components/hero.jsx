import React from 'react';
import bankIcon from '../assets/bankicon.png'; // Adjust the path as needed

const Hero = () => {
  return (
    <section className="bg-white min-h-screen flex items-center relative overflow-visible">
      {/* Blur element for the left area */}
      <div className="absolute top-[5%] left-[-25px] w-[500px] h-[500px] bg-[#48bf84]/60 rounded-full blur-[120px] z-0" />
      
      {/* Blur element for the right area */}
      <div className="absolute top-[15%] right-[200px] w-[500px] h-[400px] bg-[#48bf84]/60 rounded-full blur-[120px] z-0" />
      
      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left side content */}
          <div className="w-full md:w-1/2 mb-8 md:mb-40">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-black">Loans Backed By Crypto</h1>
            <p className="text-2xl md:text-3xl mb-8 text-gray-600">Don't sell your crypto, borrow against it.</p>
            <button className="bg-[#48BF84] text-white px-8 py-3 rounded hover:bg-[#3da46f] transition duration-300 text-lg">
              Get Started
            </button>
          </div>
          
          {/* Right side icon */}
          <div className="w-full md:w-1/2 md:mb-40 flex justify-center items-center">
            <img 
              src={bankIcon}
              alt="Bank Icon" 
              className="w-[500px] h-[500px] object-contain transform rotate-6 transition-transform duration-300 hover:rotate-12"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;