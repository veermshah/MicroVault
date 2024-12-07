// src/components/smartContracts.jsx
import React from 'react';

const SmartContracts = () => {
  return (
    <div className="max-w mx-auto w-full px-0">
      <h2 className="text-2xl font-semibold mb-4">Smart Contracts Concept</h2>
      <p className="text-base text-gray-700 mb-6">
        Smart contracts are self-executing contracts with the terms of the agreement directly written into code.
      </p>

      <h3 className="text-xl font-semibold mb-2">Key Features:</h3>
      <div className="bg-[#48BF84]/10 p-4 rounded-2xl border border-[#48BF84] mb-6">
        <ul className="list-disc ml-6">
          <li>Automation of processes without intermediaries.</li>
          <li>Trust and transparency through decentralized execution.</li>
          <li>Cost-effective due to reduced transaction fees.</li>
          <li>Immutable once deployed on the blockchain.</li>
        </ul>
      </div>

      <h3 className="text-xl font-semibold mb-2">Example of a Simple Smart Contract:</h3>
      <div className="bg-gray-100 p-4 rounded-md w-full mb-6">
        <pre className="overflow-x-auto text-sm">
          {`pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 storedData;

    function set(uint256 x) public {
        storedData = x;
    }

    function get() public view returns (uint256) {
        return storedData;
    }
}`}
        </pre>
      </div>
    </div>
  );
};

export default SmartContracts;