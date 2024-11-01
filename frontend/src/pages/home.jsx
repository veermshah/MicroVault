import React from 'react';
import Hero from '../components/hero';
import HowItWorks from '../components/howItWorks';
import WhyChooseUs from '../components/whyChooseUs';
import Testimonials from '../components/testimonials';

const Home = () => {
  // Spacer component to keep the code DRY
  const Spacer = () => (
    <div className="my-16 mx-4 md:mx-12 lg:mx-20">
      <div className="h-[1px] bg-[#F0F0F0] w-full max-w-[1248px] mx-auto" />
    </div>
  );

  return (
    <div>
      <Hero />
      <HowItWorks />
      
      <Spacer />
      
      <WhyChooseUs />
      
      <Spacer />
      
      <Testimonials />
    </div>
  );
};

export default Home;