require("dotenv").config(); // This loads the variables from your .env file
require('@nomiclabs/hardhat-ethers');


module.exports = {
  solidity: "0.8.0", // Your Solidity version, or change it to match your contract version
  networks: {
    rinkeby: {
      url: process.env.ALCHEMY_URL, // Automatically get the Alchemy URL from .env
      accounts: [`0x${process.env.PRIVATE_KEY}`], // Automatically get the private key from .env
    },
  },
};
