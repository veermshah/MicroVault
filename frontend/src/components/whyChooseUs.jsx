import React from 'react';

const WhyChooseUs = () => {
  return (
    <section className="bg-[#9ed4b7] min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-black">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Secure Platform", description: "Your transactions are protected with state-of-the-art security measures." },
            { title: "Competitive Rates", description: "Enjoy some of the best rates in the industry for both lenders and borrowers." },
            { title: "Easy to Use", description: "Our intuitive platform makes lending and borrowing a breeze." }
          ].map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-black">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;