import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useSDK } from "@metamask/sdk-react";
import { formatEther } from 'ethers'; 
import { IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const MetaMaskLogin = () => {
  const { sdk, connected, chainId } = useSDK();
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [userAddress, setUserAddresss] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const connectWallet = async () => {
    console.log("Connect Wallet button clicked");
    if (window.ethereum) {
      try {
        // Getting the account address
        const account = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setUserAddresss(account[0]);
        setDefaultAccount(account[0]);
        setStatus(`Connected account: ${account[0]}`);
        localStorage.setItem("userAddress", account[0]); 

        // Getting the account balance
        const balance = await window.ethereum.request({
          method: "eth_getBalance",
          params: [String(account[0]), "latest"],
        });
        const formattedBalance = formatEther(balance);
        setUserBalance(formattedBalance);

      } catch (error) {
        console.error("Error connecting to MetaMask: ", error);
        setStatus("Failed to connect MetaMask");
      }
    } else {
      setStatus("MetaMask not detected. Please install it.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      
      {/* Left Side with animated gradient */}
      <div className="md:w-1/2 flex flex-col p-8 animated-gradient relative">
        <div className="flex items-center justify-center h-full">
          <h1 className="text-4xl font-bold text-white text-center">
            Login with MetaMask
          </h1>
        </div>
        <Link 
          to="/" 
          className="absolute top-8 left-8 flex items-center text-white hover:text-black transition duration-300"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Return Home
        </Link>
      </div>

      {/* Right Side */}
      <div className="md:w-1/2 flex flex-col items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <button 
            className="w-full text-black font-bold py-2 px-4 rounded-2xl mb-4 transition duration-300 animated-gradient"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
          
          {defaultAccount && (
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <h3 className="mb-2">Address: {defaultAccount}</h3>
              <h3 className="mb-4">Balance: $ {userBalance}</h3>
              {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
              <p className="mb-4">{status}</p>
              
              {userAddress && (
                <div>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                  />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                  />
                  <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={saveUserDetails}
                  >
                    Submit
                  </button>
                  {connected && (
                    <div className="mt-4">
                      {chainId && <p>Connected chain: {chainId}</p>}
                      <p>Connected account: {userAddress}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MetaMaskLogin;