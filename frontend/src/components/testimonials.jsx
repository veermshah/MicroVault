import React from 'react';

const Testimonials = () => {
  const mainTestimonial = {
    quote: "Convenient loan, no hassle.",
    longText: "Needed money for tuition, bills, etc and in 5 days I got the money. Thank you so much. You are a big help financially to my problem.",
    name: "Flordeliza M."
  };

  const shortTestimonials = [
    { quote: "Painless way to borrow money", name: "Laurence J." },
    { quote: "Figure was a breath of fresh air...", name: "Steve M." },
    { quote: "Quick and painless HELOC", name: "Margaret H." }
  ];

  return (
    <section className="bg-white min-h-screen flex items-center my-8 mx-4 md:mx-12 lg:mx-20 relative overflow-visible">
      {/* Adjusted Blur effect */}
      <div className="absolute bottom-[50px] right-[50px] w-[500px] h-[500px] bg-[#48bf84]/20 rounded-full blur-[150px] z-0" />

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="flex flex-col md:flex-row h-full relative z-10">
          {/* Left side - Main testimonial */}
          <div className="md:w-1/2 md:pr-4 mb-8 md:mb-0 flex flex-col justify-center">
            <div className="relative mb-6 bg-white p-6 rounded-lg shadow-md">
              <span className="absolute text-6xl text-[#48BF84] opacity-50 top-[-30px] left-[-20px]">"</span>
              <h2 className="text-3xl font-bold mb-4">{mainTestimonial.quote}</h2>
              <p className="text-lg text-gray-600 mb-4">{mainTestimonial.longText}</p>
              <p className="font-semibold">— {mainTestimonial.name}</p>
            </div>
            <p className="text-xl font-bold mb-2">1000 Excellent Reviews on Trustpilot</p>
            <a href="https://www.trustpilot.com/" target="_blank" rel="noopener noreferrer" className="text-[#48BF84] underline">
              Check it out!
            </a>
          </div>

          {/* Vertical divider */}
          <div className="hidden md:block w-px bg-gray-300 mx-4 self-stretch"></div>

          {/* Right side - Short testimonials */}
          <div className="md:w-1/2 flex items-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {shortTestimonials.map((testimonial, index) => (
                <div key={index} className="text-center flex flex-col items-center justify-center h-full bg-white p-4 rounded-lg shadow-md">
                  <div className="w-20 h-20 bg-gray-300 rounded-full mb-4"></div>
                  <p className="text-lg font-semibold mb-2">"{testimonial.quote}"</p>
                  <p className="text-sm text-gray-600">— {testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;