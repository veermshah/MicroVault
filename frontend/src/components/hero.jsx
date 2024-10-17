import React from 'react';

const Hero = () => {
  return (
    <section className="bg-blue-100 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to Our Platform</h1>
          <p className="text-xl mb-8">Discover a new way to lend and borrow with ease and security.</p>
          <button className="bg-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition duration-300">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;