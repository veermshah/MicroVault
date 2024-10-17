import React from 'react';
import Hero from '../components/hero';
import HowItWorks from '../components/howItWorks';
import WhyChooseUs from '../components/whyChooseUs';
import Testimonials from '../components/testimonials';

const Home = () => {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
    </div>
  );
};

export default Home;