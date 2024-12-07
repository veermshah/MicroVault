import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// Custom hook for Intersection Observer
const useIntersectionObserver = (options) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return [ref, isVisible];
};

const HowItWorks = () => {
  const [sectionRef, isVisible] = useIntersectionObserver({
    threshold: 0.1,
  });

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
      title: 'Deposit Assets',
      description: 'During the loan application, deposit cryptocurrency into MicroVault to secure your loan.'
    },
    {
      number: '04',
      title: 'Get Funding',
      description: 'Once approved, receive stablecoin directly to your account'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className={`bg-transparent mt-28 mx-4 md:mx-12 lg:mx-20 relative overflow-visible transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Blur effect */}
      <div className="absolute top-[50px] left-[550px] w-[600px] h-[600px] bg-[#48bf84]/30 rounded-full blur-[150px] z-0" />

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="max-w-[1248px] w-full mx-auto">
          <h2 className="text-[40px] font-bold text-center mb-12 text-black">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`bg-white border border-gray-300 rounded-2xl p-6 flex flex-col items-center justify-between transform transition-all duration-700 ${
                  isVisible ? `translate-x-0 opacity-100` : `translate-x-[-100%] opacity-0`
                }`}
                style={{ transitionDelay: `${isVisible ? index * 200 : 0}ms` }}
              >
                <span
                  className={`font-bold text-white text-4xl w-20 h-20 rounded-full flex items-center justify-center mb-6`}
                  style={{
                    background: index % 2 === 0 
                      ? 'linear-gradient(to right, #11998e 50%, #48BF84 50%)' 
                      : 'linear-gradient(to right, #48BF84 50%, #11998e 50%)'
                  }}
                >
                  {step.number}
                </span>
                <h5 className="text-xl font-semibold text-black mb-4">{step.title}</h5>
                <p className="text-gray-600 text-center">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/login">
              <button className="animated-gradient text-white px-8 py-3 rounded-[50px] text-lg transition duration-300">
                Start Here
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;