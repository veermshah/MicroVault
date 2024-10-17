import React from 'react';

const Testimonials = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">What Others Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 mb-4">"This platform has revolutionized the way I manage my finances. Highly recommended!"</p>
            <p className="font-semibold">- John Doe</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 mb-4">"I've never had such a smooth experience borrowing money. The process was quick and easy."</p>
            <p className="font-semibold">- Jane Smith</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 mb-4">"As a lender, I appreciate the security and transparency this platform provides."</p>
            <p className="font-semibold">- Mike Johnson</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;