import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import bankIcon from '../assets/bankicon.png';

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

const Hero = () => {
  const [heroRef, isVisible] = useIntersectionObserver({
    threshold: 0.1,
  });

  return (
    <section 
      ref={heroRef}
      className={`bg-transparent mt-12 md:mt-20 mx-4 md:mx-12 lg:mx-20 relative overflow-visible transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Blur elements */}
      <div className="absolute top-[5%] left-[-25px] w-[500px] h-[500px] bg-[#48bf84]/60 rounded-full blur-[120px] z-0" />
      <div className="absolute top-[15%] right-[100px] w-[500px] h-[400px] bg-[#48bf84]/60 rounded-full blur-[120px] z-0" />
      
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 py-6 md:py-12 relative z-10">
          <div className="max-w-[1248px] w-full mx-auto flex flex-col md:flex-row items-center justify-center">
            {/* Left side content */}
            <div className="w-full md:w-1/2 mb-6 md:mb-0 flex flex-col items-start justify-center">
              <h1 className="text-2xl md:text-[48px] font-bold mb-4 md:mb-6 leading-tight text-black">Borrow with Crypto</h1>
              <p className="text-base md:text-[20px] mb-4 md:mb-8 text-gray-600">Keep your crypto, borrow against it.</p>
              
              {/* Learn More Button with Animated Gradient */}
              <Link to="/get-started">
                <button className="animated-gradient text-white rounded-[50px] px-8 py-3 transition duration-300">
                  Learn More
                </button>
              </Link>
            </div>
            
            {/* Right side icon */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-end items-center">
              <img 
                src={bankIcon}
                alt="Bank Icon" 
                className="w-52 h-52 sm:w-64 md:w-[500px] md:h-[500px] object-contain transform rotate-6 md:translate-y-0 -translate-y-2 transition-transform duration-300 hover:rotate-12"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;