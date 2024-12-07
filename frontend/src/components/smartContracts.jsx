// src/components/smartContracts.jsx
import React from 'react';

const SmartContracts = () => {
  return (
    <div className="flex-1 p-[10px] flex flex-col items-start justify-start">
      <h1 className="text-2xl font-bold">Smart Contracts Concept</h1>
      <p>Smart contracts are self-executing contracts with the terms of the agreement directly written into code.</p>

      <h2 className="text-xl font-semibold mt-4">Key Features:</h2>
      <div className="bg-gray-100 p-4 rounded-md w-full mb-4"> {/* Extend to full width */}
        <ul className="list-disc ml-6">
          <li>Automation of processes without intermediaries.</li>
          <li>Trust and transparency through decentralized execution.</li>
          <li>Cost-effective due to reduced transaction fees.</li>
          <li>Immutable once deployed on the blockchain.</li>
        </ul>
      </div>

      <h2 className="text-xl font-semibold mt-4">Example of a Simple Smart Contract:</h2>
      <div className="bg-gray-100 p-4 rounded-md w-full mb-4"> {/* Extend to full width */}
        <pre className="overflow-x-auto">
          {`
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 storedData;

    function set(uint256 x) public {
        storedData = x;
    }

    function get() public view returns (uint256) {
        return storedData;
    }
}
`}
        </pre>
      </div>

    </div>
  );
};

export default SmartContracts;
