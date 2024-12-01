require('@nomiclabs/hardhat-ethers'); // Ensure this is included for ethers support
require('dotenv').config();  // Make sure you have this to load the environment variables
module.exports = {
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {
    },
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/cCLGWxIEMcWH9P42R-Z4AZnseen1WEFX", // Use your Alchemy or Infura URL
      accounts: ["0xe9f1ea2421431e87b8de05ecb87462d645d9578eebcdffa01baae06c5313b9ea"],  // Use environment variable for private key
    }
  },
  solidity: {
    version: "0.8.27",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  }
}