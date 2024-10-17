import React from 'react';

const WhyChooseUs = () => {
  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
            <p className="text-gray-600">Your transactions are protected with state-of-the-art security measures.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Competitive Rates</h3>
            <p className="text-gray-600">Enjoy some of the best rates in the industry for both lenders and borrowers.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
            <p className="text-gray-600">Our intuitive platform makes lending and borrowing a breeze.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;