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
    <section className="bg-transparent my-0 mx-4 md:mx-12 lg:mx-20 relative overflow-visible"> {/* Changed to bg-transparent */}
      {/* Removed the blur effect from this component */}

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="max-w-[1248px] w-full mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-black">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-between">
                <span className="bg-[#48bf84] text-white font-bold text-4xl w-20 h-20 rounded-full flex items-center justify-center mb-6">
                  {step.number}
                </span>
                <h5 className="text-xl font-semibold text-black mb-4">{step.title}</h5>
                <p className="text-gray-600 text-center">{step.description}</p>
              </div>
            ))}
          </div>
          {/* Added thin gray line below the cards */}
          <div className="max-w-full mx-auto mt-8">
            <hr className="border-t border-gray-200" />
          </div>
          <div className="text-center mt-12">
            <button className="bg-[#48BF84] text-white px-8 py-3 rounded-[50px] text-xl hover:bg-[#3da46f] transition duration-300">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;