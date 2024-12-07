// src/components/lendConcept.jsx
import React from 'react';

const LendConcept = () => {
  return (
    <div className="max-w mx-auto w-full px-0">
      <h2 className="text-2xl font-semibold mb-4">Lending on MicroVault</h2>
      <p className="text-base text-gray-700 mb-6">
        Lending on the MicroVault platform allows users to earn interest on their cryptocurrency holdings by providing liquidity to borrowers. When you lend your assets, you contribute to the liquidity pool, enabling borrowers to access funds without selling their crypto.
      </p>

      {/* How It Works Section */}
      <div className="bg-[#48BF84]/10 p-4 rounded-2xl border border-[#48BF84] mb-6">
        <h3 className="text-xl font-semibold mb-2">How It Works:</h3>
        <ul className="list-disc ml-6 mb-4">
          <li><strong>Deposit Assets:</strong> Users deposit their cryptocurrencies into the lending pool.</li>
          <li><strong>Interest Earnings:</strong> Lenders earn interest on the assets they provide, with rates varying based on market demand.</li>
          <li><strong>Smart Contracts:</strong> The process is managed by smart contracts, automating transactions and ensuring timely interest payments.</li>
        </ul>
      </div>

      <h3 className="text-xl font-semibold mb-2">Example:</h3>
      <p className="text-base text-gray-700">
        Imagine you lend 1 ETH at an annual interest rate of 5%. If a borrower takes a loan against your ETH, you will earn interest on your deposit. After one year, you would have earned 0.05 ETH in interest, which is added to your original deposit.
      </p>
    </div>
  );
};

export default LendConcept;