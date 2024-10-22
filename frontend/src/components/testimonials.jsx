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
    <section className="bg-white py-16 my-8"> {/* Added vertical margin */}
      <div className="container mx-auto px-6"> {/* Increased horizontal padding */}
        <div className="flex flex-col md:flex-row">
          {/* Left side - Main testimonial */}
          <div className="md:w-1/2 md:pr-4 mb-8 md:mb-0">
            <div className="relative mb-6">
              <span className="absolute text-6xl text-[#48BF84] opacity-50 top-[-30px] left-[-20px]">"</span>
              <h2 className="text-3xl font-bold mb-4">{mainTestimonial.quote}</h2>
              <p className="text-lg text-gray-600 mb-4">{mainTestimonial.longText}</p>
              <p className="font-semibold">— {mainTestimonial.name}</p>
            </div>
            <p className="text-xl font-bold mb-2">2651 Excellent Reviews on Trustpilot</p>
            <a href="https://www.trustpilot.com/" target="_blank" rel="noopener noreferrer" className="text-[#48BF84] underline">
              Trustpilot reviews
            </a>
          </div>

          {/* Vertical divider */}
          <div className="hidden md:block w-px bg-gray-300 mx-4"></div>

          {/* Right side - Short testimonials */}
          <div className="md:w-1/2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {shortTestimonials.map((testimonial, index) => (
                <div key={index} className="text-center flex flex-col items-center h-full">
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