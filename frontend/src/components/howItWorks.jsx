import React from 'react';

const HowItWorks = () => {
  return (
    <section className="bg-[#e6f7ef] min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-black">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['Sign Up', 'Choose Your Option', 'Get Started'].map((step, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="bg-[#48BF84] rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">{index + 1}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-black">{step}</h3>
              <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;