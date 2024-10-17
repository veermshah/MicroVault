import React from 'react';

const HowItWorks = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-500">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
            <p className="text-gray-600">Create your account in minutes</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-500">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Choose Your Option</h3>
            <p className="text-gray-600">Select to lend or borrow</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-500">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Get Started</h3>
            <p className="text-gray-600">Begin your financial journey</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;