require('dotenv').config();
const { ethers } = require("hardhat");
const { Network, Alchemy } = require("alchemy-sdk");

// Alchemy API key and settings
const settings = {
  apiKey: "6lOvj3XHC8OLSYy_utBcIqbE5deOv3_R", // Replace with your Alchemy API Key.
  network: Network.ETH_SEPOLIA, // Replace with your network.
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
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Define contract parameters (customize these values as needed)
  const minimumPoolBalance = ethers.utils.parseEther("10"); // Minimum pool balance in ETH
  const platformFee = 2; // Platform fee percentage (e.g., 2%)
  const baseInterestRate = 5; // Base interest rate percentage (e.g., 5%)
  const utilizationRateMultiplier = 1; // Multiplier for utilization rate
  const maxUtilizationRate = 80; // Maximum utilization rate percentage
  const priceOracleAddress = ethers.constants.AddressZero; // No oracle used, set to zero address

  // Deploy the contract with constructor arguments
  const P2PSmartContractFactory = await ethers.getContractFactory("p2pSmartContract");
  const p2pSmartContract = await P2PSmartContractFactory.deploy(
    minimumPoolBalance,
    platformFee,
    baseInterestRate,
    utilizationRateMultiplier,
    maxUtilizationRate
  );

  await p2pSmartContract.deployed();
  console.log("p2pSmartContract deployed to:", p2pSmartContract.address);

  // Optionally verify the deployment or interact with the contract
}

// Run the deployment script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error deploying contract:", error);
    process.exit(1);
  });
