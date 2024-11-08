// src/components/overview.jsx
import React from 'react';

const Overview = () => {
  const mainContent = {
    title: "Service Overview",
    description: "Get a quick snapshot of our comprehensive services designed to meet your needs efficiently and effectively.",
    ctaText: "Explore Services"
  };

  const keyPoints = [
    { title: "Fast Process", description: "Quick and easy application" },
    { title: "Competitive Rates", description: "Best-in-class interest rates" },
    { title: "Expert Support", description: "24/7 customer assistance" }
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">{mainContent.title}</h2>
      <p className="text-lg text-gray-600 mb-4">{mainContent.description}</p>
      <a href="/services" className="inline-block bg-[#48BF84] text-white font-bold py-2 px-4 rounded-full hover:bg-[#3da36f] transition duration-300">
        {mainContent.ctaText}
      </a>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {keyPoints.map((point, index) => (
          <div key={index} className="text-center flex flex-col items-center justify-center bg-white p-4 shadow-md">
            <div className="w-20 h-20 bg-[#48BF84] rounded-full mb-4 flex items-center justify-center text-white text-2xl font-bold">
              {index + 1}
            </div>
            <p className="text-lg font-semibold mb-2">{point.title}</p>
            <p className="text-sm text-gray-600">{point.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;