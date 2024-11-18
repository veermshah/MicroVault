// Import ethers from Hardhat
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const minimumPoolBalance = 1000; // Example value
  const platformFee = 5; // Example value
  const baseInterestRate = 10; // Example value
  const utilizationRateMultiplier = 2; // Example value
  const maxUtilizationRate = 90; // Example value
  const priceOracleAddress = "0x..."; // Replace with the actual price oracle address

  const DynamicP2PLending = await ethers.getContractFactory("p2pSmartContract");
  const dynamicP2PLending = await DynamicP2PLending.deploy(
      minimumPoolBalance,
      platformFee,
      baseInterestRate,
      utilizationRateMultiplier,
      maxUtilizationRate,
      priceOracleAddress
  );

  await dynamicP2PLending.deployed();
  console.log("p2pSmartContract deployed to:", dynamicP2PLending.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error);
      process.exit(1);
  });
