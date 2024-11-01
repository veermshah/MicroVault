// src/pages/home.jsx

import React from 'react';
import Hero from '../components/hero'; 
import HowItWorks from '../components/howItWorks'; 
import EaseOfUse from '../components/easeOfUse'; 
import WhyChooseUs from '../components/whyChooseUs'; 
import Testimonials from '../components/testimonials'; 
import Spacer from '../components/spacer'; 

const Home = () => {
  return (
    <div>
      <Hero /> {/* Render Hero component */}
      <HowItWorks /> {/* Render HowItWorks component */}
      <Spacer /> {/* Spacer between How It Works and Ease of Use */}
      {/* <EaseOfUse />  Render EaseOfUse component */}
      {/* <Spacer />  Spacer between Ease of Use and Why Choose Us */}
      <WhyChooseUs /> {/* Render WhyChooseUs component */}
      <Spacer /> {/* Spacer between Why Choose Us and Testimonials */}
      <Testimonials /> {/* Render Testimonials component */}
    </div>
  );
};

export default Home;