// lock.js
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  
  // Replace with your contract address
  const contractAddress = "0xYourContractAddress";
  
  const Contract = await ethers.getContractAt("MyContract", contractAddress);
  
  // Interacting with a lock function in the contract
  const tx = await Contract.lock(ethers.utils.parseEther("1"));
  
  console.log("Transaction hash:", tx.hash);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });