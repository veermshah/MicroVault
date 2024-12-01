require('dotenv').config();
const { ethers } = require("hardhat");
const { Network, Alchemy } = require("alchemy-sdk");

// Alchemy API key and settings
const settings = {
  apiKey: process.env.ALCHEMY_API_KEY, // Use environment variable
  network: Network.ETH_SEPOLIA,
};
const alchemy = new Alchemy(settings);

// Fetch and log block information
async function logBlockInfo() {
  const block = await alchemy.core.getBlock('latest'); // Fetch the latest block
  console.log("Block Information:", block);
}

// Main deployment function
async function main() {
  // Log some blockchain information
  await logBlockInfo();

  // Get the deployer's account from Hardhat
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Define contract parameters (replace with actual values)
  const minimumPoolBalance = 1000; // Example value
  const platformFee = 5; // Example value
  const baseInterestRate = 10; // Example value
  const utilizationRateMultiplier = 2; // Example value
  const maxUtilizationRate = 90; // Example value
  const priceOracleAddress = "0xbEab5c76EBF8C2597D03575F636C2E4218328cEF"; // Replace with the actual address

  // Deploy the contract with constructor arguments
  const P2PSmartContractFactory = await ethers.getContractFactory("p2pSmartContract");
  const p2pSmartContract = await P2PSmartContractFactory.deploy(
    minimumPoolBalance,
    platformFee,
    baseInterestRate,
    utilizationRateMultiplier,
    maxUtilizationRate,
    priceOracleAddress
  );

  await p2pSmartContract.deployed();
  console.log("p2pSmartContract deployed to:", p2pSmartContract.address);
}

// Run the deployment script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });