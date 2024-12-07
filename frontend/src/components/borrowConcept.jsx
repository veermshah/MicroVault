// src/components/borrowConcept.jsx
import React from 'react';

const BorrowConcept = () => {
  return (
    <div className="max-w mx-auto w-full px-0">
      <h2 className="text-2xl font-semibold mb-4">Borrowing on MicroVault</h2>
      <p className="text-base text-gray-700 mb-6">
        Borrowing on the MicroVault platform enables users to access liquidity without selling their crypto assets. By using cryptocurrencies as collateral, borrowers can obtain loans in stablecoins or fiat currency.
      </p>

      {/* How It Works Section */}
      <div className="bg-[#48BF84]/10 p-4 rounded-2xl border border-[#48BF84] mb-6">
        <h3 className="text-xl font-semibold mb-2">How It Works:</h3>
        <ul className="list-disc ml-6 mb-4">
          <li><strong>Collateralization:</strong> To borrow, users must deposit crypto assets as collateral. The loan amount is typically a percentage of the collateral's value.</li>
          <li><strong>Repayment Terms:</strong> Borrowers agree to repay the loan with interest over a specified period.</li>
          <li><strong>Flexible Options:</strong> Borrowers can choose between different types of loans, including short-term loans and flash loans.</li>
        </ul>
      </div>

      <h3 className="text-xl font-semibold mb-2">Example:</h3>
      <p className="text-base text-gray-700">
        Suppose you want to borrow $1,000 and use 2 ETH as collateral (valued at $1,500 each). With a Loan-to-Value ratio of 66%, you can borrow up to $1,000. You will need to repay this amount plus interest within the agreed timeframe. If you fail to repay, your collateral (2 ETH) may be liquidated.
      </p>
    </div>
  );
};

export default BorrowConcept;