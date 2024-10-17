// deploy.js
const { ethers } = require("hardhat");

async function main() {
  // Compile contract
  const Contract = await ethers.getContractFactory("MyContract");

  // Deploy the contract
  console.log("Deploying contract...");
  const contract = await Contract.deploy();

  // Wait until the contract is deployed
  await contract.deployed();

  console.log("Contract deployed to:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
