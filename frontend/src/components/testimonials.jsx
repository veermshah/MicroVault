import React from 'react';

const Testimonials = () => {
  return (
    <section className="bg-[#ffffff] min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-black">What Others Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "John Doe", text: "This platform has revolutionized the way I manage my finances. Highly recommended!" },
            { name: "Jane Smith", text: "I've never had such a smooth experience borrowing money. The process was quick and easy." },
            { name: "Mike Johnson", text: "As a lender, I appreciate the security and transparency this platform provides." }
          ].map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
              <p className="font-semibold text-[#48BF84]">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;