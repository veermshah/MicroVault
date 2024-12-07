import React from 'react';

const Concepts = ({ setActiveSection }) => {
  return (
    <div className="max-w mx-auto w-full px-0"> 
      <h2 className="text-2xl font-bold mb-4">MicroVault Protocol</h2>
      <p className="mb-4">Basics to know when building on the MicroVault Protocol.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Lend Box */}
        <div 
          className="block w-full p-6 border border-gray-300 rounded-2xl bg-white transition-colors cursor-pointer hover:bg-gray-100"
          onClick={() => setActiveSection('lend')}
        >
          <h3 className="text-xl font-semibold mb-2">Lend</h3>
          <p className="text-sm text-gray-600">Learn how to lend your assets on MicroVault.</p>
        </div>

        {/* Crypto Meter Box */}
        <div 
          className="block w-full p-6 border border-gray-300 rounded-2xl bg-white transition-colors cursor-pointer hover:bg-gray-100"
          onClick={() => setActiveSection('cryptoMeter')}
        >
          <h3 className="text-xl font-semibold mb-2">Crypto Meter</h3>
          <p className="text-sm text-gray-600">Understand your crypto score and its impact.</p>
        </div>

        {/* Borrow Box */}
        <div 
          className="block w-full p-6 border border-gray-300 rounded-2xl bg-white transition-colors cursor-pointer hover:bg-gray-100"
          onClick={() => setActiveSection('borrow')}
        >
          <h3 className="text-xl font-semibold mb-2">Borrow</h3>
          <p className="text-sm text-gray-600">Discover how to borrow against your crypto assets.</p>
        </div>
      </div>
    </div>
  );
};

export default Concepts;