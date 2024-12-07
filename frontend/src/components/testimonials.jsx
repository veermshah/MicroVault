import React, { useEffect, useRef, useState } from 'react';
import testimonial1 from "../assets/testimonial1.png";
import testimonial2 from "../assets/testimonial2.png";
import testimonial3 from "../assets/testimonial3.png";

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

const Testimonials = () => {
  const [sectionRef, isVisible] = useIntersectionObserver({
    threshold: 0.1,
  });

  const mainTestimonial = {
    quote: "Convenient loan, no hassle.",
    longText: "MicroVault made it easy for me to get the funds I needed for tuition and bills. In just five days, I had the money in my account. Thank you for being such a reliable financial solution!",
    name: "Veer S."
  };

  const shortTestimonials = [
    { quote: "Painless way to borrow money", name: "Aarya R.", image: testimonial1 },
    { quote: "MicroVault was a breath of fresh air...", name: "Jordan J.", image: testimonial2 },
    { quote: "Quick and painless process", name: "Aastha S.", image: testimonial3 }
  ];

  return (
    <section 
      ref={sectionRef}
      className={`bg-transparent mt-28 mx-4 md:mx-12 lg:mx-20 relative overflow-visible transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Adjusted Blur effect */}
      <div className="absolute bottom-[50px] right-[50px] w-[500px] h-[500px] bg-[#48bf84]/20 rounded-full blur-[150px] z-0" />

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="max-w-[1248px] w-full mx-auto">
          <div className="flex flex-col md:flex-row h-full relative z-10">
            {/* Left side - Main testimonial */}
            <div className="md:w-1/2 md:pr-4 mb-8 md:mb-0 flex flex-col justify-center">
              <div className="relative mb-6 bg-white p-6 rounded-2xl border border-gray-300">
                <span className="absolute text-6xl text-[#48BF84] opacity-80 top-[-30px] left-[-20px]">"</span>
                <h2 className="text-3xl font-bold mb-4">{mainTestimonial.quote}</h2>
                <p className="text-lg text-gray-600 mb-4">{mainTestimonial.longText}</p>
                <p className="font-semibold">— {mainTestimonial.name}</p>
              </div>
              {/* Gradient Text for Trustpilot Reviews */}
              {/*<p 
                className="text-xl font-bold mb-2"
                style={{
                  backgroundImage: 'linear-gradient(to right, #38ef7d, #11998e)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent'
                }}
              >
                Excellent Reviews on Trustpilot
              </p> */}
            </div>

            {/* Vertical divider */}
            <div className="hidden md:block w-px bg-[#F0F0F0] mx-4 self-stretch"></div> 

            {/* Right side - Short testimonials */}
            <div className="md:w-1/2 flex items-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                {shortTestimonials.map((testimonial, index) => (
                  <div 
                    key={index} 
                    className="text-center flex flex-col items-center justify-center h-full bg-white p-4 rounded-2xl border border-gray-300 transition-all duration-300 ease-in-out hover:-translate-y-2"
                  >
                    <div className="w-20 h-20 mb-4 overflow-hidden rounded-full">
                      <img 
                        src={testimonial.image} 
                        alt={`${testimonial.name}'s testimonial`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-lg font-semibold mb-2">"{testimonial.quote}"</p>
                    <p className="text-sm text-gray-600">— {testimonial.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;