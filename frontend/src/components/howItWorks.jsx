import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Sign Up And Verify',
      description: 'Create a MicroVault account and complete identity verification'
    },
    {
      number: '02',
      title: 'Customize Loan',
      description: 'Select your borrowing preferences and submit your loan application'
    },
    {
      number: '03',
      title: 'Deposit Collateral',
      description: 'Send assets to your MicroVault collateral wallet'
    },
    {
      number: '04',
      title: 'Get Funding',
      description: 'Once approved, receive stablecoin directly to your account'
    }
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-6 text-black">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 h-[400px] flex flex-col items-center">
              <span className="bg-[#48bf84] text-white font-bold text-4xl w-20 h-20 rounded-full flex items-center justify-center mb-6">
                {step.number}
              </span>
              <h5 className="text-xl font-semibold text-black mb-4">{step.title}</h5>
              <div className="flex-grow flex items-center justify-center">
                <p className="text-gray-600 text-center">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button className="bg-[#48BF84] text-white px-8 py-3 rounded text-xl hover:bg-[#3da46f] transition duration-300">
            Apply Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;