// src/pages/getStarted.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GetStartedSidebar from '../components/getStartedSideBar';
import Overview from '../components/overview';
import Concepts from '../components/concepts';
import LiquidityPool from '../components/liquidityPool';
import Reserve from '../components/reserve';

const GetStarted = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <Overview />;
      case 'concepts':
        return <Concepts />;
      case 'liquidityPool':
        return <LiquidityPool />;
      case 'reserve':
        return <Reserve />;
      case 'faq':
        navigate('/faq');
        return null;
      default:
        return <Overview />;
    }
  };

  const handleSectionChange = (section) => {
    if (section === 'faq') {
      navigate('/faq');
    } else {
      setActiveSection(section);
    }
  };

  return (
    <section className="bg-transparent mt-28 mx-4 md:mx-12 lg:mx-20 relative overflow-visible">
      <div className="absolute bottom-[50px] right-[50px] w-[500px] h-[500px] bg-[#48bf84]/20 rounded-full blur-[150px] z-0" />

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="max-w-[1248px] w-full mx-auto">
          <div className="flex flex-row h-full relative z-10">
            <div className="w-1/6 mr-8">
              <GetStartedSidebar activeSection={activeSection} setActiveSection={handleSectionChange} />
            </div>
            <div className="w-5/6">
              {/* Removed background, border-radius, padding, and margin */}
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetStarted;