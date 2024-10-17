import React from 'react';

const Hero = () => {
  return (
    <section className="bg-blue-100 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left side content */}
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome to Our Platform</h1>
            <p className="text-lg md:text-xl mb-8">Unlock financial opportunities with Micro Vault, the trusted platform for fast, secure crypto micro loans. Whether you’re borrowing or investing, we’ve got you covered.</p>
            <button className="bg-[#48BF84] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#3da46f] transition duration-300">
              Get Started
            </button>
          </div>
          
          {/* Right side image */}
          <div className="w-full md:w-1/2">
            <img 
              src="/path-to-your-image.jpg" 
              alt="Hero Image" 
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;