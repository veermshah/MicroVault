// src/pages/GetStarted.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GetStartedSidebar from '../components/getStartedSideBar'; // Ensure correct casing
import Overview from '../components/overview';
import Concepts from '../components/concepts'; // Import with lowercase 'c'
import LendConcept from '../components/lendConcept'; // Import lend concept
import BorrowConcept from '../components/borrowConcept'; // Import borrow concept
import LiquidityPool from '../components/liquidityPool';
import CryptoMeterConcept from '../components/cryptoMeterConcept'; // Import crypto meter concept
import SmartContracts from '../components/smartContracts'; // Import smart contracts concept

const GetStarted = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <Overview setActiveSection={setActiveSection} />; // Pass setActiveSection prop
      case 'concepts':
        return <Concepts setActiveSection={setActiveSection} />; // Pass setActiveSection prop here
      case 'lend':
        return <LendConcept />;
      case 'borrow':
        return <BorrowConcept />;
      case 'liquidityPool':
        return <LiquidityPool />;
      case 'cryptoMeter':
        return <CryptoMeterConcept />;
      case 'smartContracts':
        return <SmartContracts />;
      default:
        return <Overview setActiveSection={setActiveSection} />;
    }
  };

  const handleSectionChange = (section) => {
    if (section === 'faq') {
      navigate('/faq'); // Navigate to FAQ page
    } else if (section === 'dashboard') {
      navigate('/dashboard'); // Navigate to Dashboard page
    } else {
      setActiveSection(section); // Set active section for other cases
    }
  };

  return (
    <section className="bg-transparent mx-4 md:mx-12 lg:mx-20 relative overflow-visible">
      {/* Background Blurs with Lower Opacity */}
    
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="max-w-[1248px] w-full mx-auto">
          <div className="flex flex-row h-full relative z-10">
            <div className="w-1/6 mr-8">
              <GetStartedSidebar activeSection={activeSection} setActiveSection={handleSectionChange} />
            </div>
            <div className="w-5/6">
              {renderContent()} {/* Render content based on active section */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetStarted;