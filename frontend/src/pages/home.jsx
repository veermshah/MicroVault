// src/pages/Home.jsx
import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-5xl font-jakarta font-bold text-blue-600">
        Welcome to the Home Page
      </h1>
      <p className="mt-4 text-lg font-jakarta font-light text-gray-700">
        This is a simple home page styled with Tailwind CSS and the "Plus Jakarta Sans" font.
      </p>
      <button className="mt-6 px-4 py-2 bg-blue-500 text-white font-jakarta font-medium rounded-md hover:bg-blue-600">
        Get Started
      </button>
    </div>
  );
};

export default Home;
