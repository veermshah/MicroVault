// src/components/cryptoMeterConcept.jsx
import React from 'react';

const CryptoMeterConcept = () => {
  return (
    <div className="max-w mx-auto w-full px-0">
      <h2 className="text-2xl font-semibold mb-4">Crypto Meter</h2>
      <p className="text-base text-gray-700 mb-6">
        The Crypto Meter is a feature that evaluates and displays your cryptocurrency score based on various factors such as transaction history, asset management, and overall portfolio performance. This score helps users understand their financial health within the crypto ecosystem.
      </p>

      {/* How It Works Section */}
      <div className="bg-[#48BF84]/10 p-4 rounded-2xl border border-[#48BF84] mb-6">
        <h3 className="text-xl font-semibold mb-2">How It Works:</h3>
        <ul className="list-disc ml-6 mb-4">
          <li><strong>Assessment Criteria:</strong> The Crypto Meter analyzes factors like your transaction volume and frequency of trades.</li>
          <li><strong>Real-Time Updates:</strong> Users receive real-time updates on their score as they engage with different features of the MicroVault platform.</li>
          <li><strong>Improvement Suggestions:</strong> Based on your score, the Crypto Meter may provide personalized recommendations to enhance your financial standing.</li>
        </ul>
      </div>

      <h3 className="text-xl font-semibold mb-2">Example:</h3>
      <p className="text-base text-gray-700">
        If you frequently trade cryptocurrencies without a clear strategy or hold a concentrated position in one asset, your Crypto Meter score may be low. Conversely, if you maintain a diversified portfolio and make informed trading decisions, your score will likely improve. For instance, if you increase your holdings in stablecoins and reduce risky trades, you could see an increase in your score over time.
      </p>
    </div>
  );
};

export default CryptoMeterConcept;