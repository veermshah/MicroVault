// src/pages/getStarted.jsx

import React from 'react';
import Overview from '../components/overview'; // Import with lowercase 'o'

const getStarted = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-8">Get Started</h1>
      <Overview />
    </div>
  );
};

export default getStarted;