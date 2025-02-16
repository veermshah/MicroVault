// src/components/liquidityPool.jsx
import React from 'react';

const LiquidityPool = () => {
  return (
    <div className="max-w mx-auto w-full px-0">
      <h2 className="text-2xl font-semibold mb-4">MicroVault Liquidity Pool</h2>
      <p className="text-base text-gray-700 mb-6">
        MicroVault features a custom liquidity pool that allows users to participate as suppliers or borrowers, supporting stablecoins, ETH, and a variety of crypto assets. Our liquidity pool operates as a decentralized market, governed by smart contract parameters that define collateralization thresholds, reserve configurations, and risk management measures[1].
      </p>
      <p className="text-base text-gray-700 mb-6">
        Suppliers provide liquidity into the pool, earning passive income through interest generated by loans. Borrowers can access liquidity from the pool by taking over-collateralized positions, allowing them to leverage assets for both flash loans and regular microloans[2].
      </p>
      <p className="text-base text-gray-700 mb-6">
        The governance-approved parameters for our liquidity pool are designed to ensure a balance between liquidity demands and risk control. Smart contracts handle all interactions seamlessly, including borrowing, repaying, and liquidations, without intermediaries. This approach enhances the transparency, security, and efficiency of financial activities within MicroVault[3].
      </p>

      <h3 className="text-xl font-semibold mb-2">How Liquidity Pools Work</h3>
      <div className="bg-[#48BF84]/10 p-4 rounded-2xl border border-[#48BF84] mb-6">
        <p className="mb-4">
          Imagine you want to create a liquidity pool for ETH and USDC. You start by depositing 1 ETH and $1,800 USDC into the pool. This allows users to trade between ETH and USDC directly from the pool without needing an intermediary[1].
        </p>
        <p className="mb-4">
          When someone trades 0.5 ETH for USDC from your pool, they will receive $900 USDC in exchange. As a liquidity provider, you earn a small fee (e.g., 1%) on each transaction made through the pool[4].
        </p>
        <pre className="overflow-x-auto text-sm">
          {`Liquidity Pool Example:
1. You deposit: 
   - 1 ETH
   - $1,800 USDC

2. A user trades:
   - 0.5 ETH for $900 USDC

3. You earn:
   - Transaction fee (e.g., 1% of $900 = $9)`}
        </pre>
      </div>
    </div>
  );
};

export default LiquidityPool;