// src/components/overview.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GetStartedSidebar from './getStartedSidebar';

const Overview = () => {
  const [currentContent, setCurrentContent] = useState('overview');

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

  const renderContent = () => {
    switch (currentContent) {
      case 'overview':
        return (
          <>
            <div className="relative mb-6 bg-white p-6 rounded-[1rem] shadow-md">
              <h2 className="text-3xl font-bold mb-4">{mainContent.title}</h2>
              <p className="text-lg text-gray-600 mb-4">{mainContent.description}</p>
              <Link to="/services" className="inline-block bg-[#48BF84] text-white font-bold py-2 px-4 rounded-full hover:bg-[#3da36f] transition duration-300">
                {mainContent.ctaText}
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {keyPoints.map((point, index) => (
                <div key={index} className="text-center flex flex-col items-center justify-center h-full bg-white p-4 rounded-[1rem] shadow-md">
                  <div className="w-20 h-20 bg-[#48BF84] rounded-full mb-4 flex items-center justify-center text-white text-2xl font-bold">
                    {index + 1}
                  </div>
                  <p className="text-lg font-semibold mb-2">{point.title}</p>
                  <p className="text-sm text-gray-600">{point.description}</p>
                </div>
              ))}
            </div>
          </>
        );
      case 'concepts':
        return <h2>Concepts Content</h2>;
      case 'liquidityPool':
        return <h2>Liquidity Pool Content</h2>;
      case 'reserve':
        return <h2>Reserve Content</h2>;
      case 'faq':
        return <h2>FAQ Content</h2>;
      default:
        return <h2>Content not found</h2>;
    }
  };

  return (
    <section className="bg-transparent mt-28 mx-4 md:mx-12 lg:mx-20 relative overflow-visible">
      <div className="absolute bottom-[50px] right-[50px] w-[500px] h-[500px] bg-[#48bf84]/20 rounded-full blur-[150px] z-0" />

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="max-w-[1248px] w-full mx-auto">
          <div className="flex flex-row h-full relative z-10">
            <div className="w-64 mr-8">
              <GetStartedSidebar setCurrentContent={setCurrentContent} />
            </div>
            <div className="flex-1">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;