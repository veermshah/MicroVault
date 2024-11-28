import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { useSDK } from "@metamask/sdk-react";
import { db } from "../../../firebase"; // Adjust the path accordingly
import { collection, doc, setDoc } from "firebase/firestore";
import { ethers } from "ethers";
import { formatEther } from "ethers";
import { useTransaction } from "./transactions";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "./users"; // v6.x.x version

const apikey = "SIBXADTFTICF4I8UFA78NVSFIIAIJAM5V6";

const MetaMaskLogin = () => {
  const { sdk, connected, chainId } = useSDK();
  const navigate = useNavigate();
  const { setUserAddress } = useUser();

  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [userAddress, setUserAddresss] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [isUserSaved, setIsUserSaved] = useState(false);
  const { transactions, setTransactions } = useTransaction();

  const connectWallet = async () => {
    console.log("Connect Wallet button clicked");
    if (window.ethereum) {
      try {
        // Getting the account address
        const account = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setUserAddresss(account[0]);
        setUserAddress(account[0]);
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

        // Fetch transaction history after connecting
        fetchTransactionHistory(account[0]);
      } catch (error) {
        console.error("Error connecting to MetaMask: ", error);
        setStatus("Failed to connect MetaMask");
      }
    } else {
      setStatus("MetaMask not detected. Please install it.");
    }
  };

  const saveUserDetails = async () => {
    if (!name || !email) {
      setErrorMessage("Please enter your name and email");
      return;
    }

    try {
      const userRef = doc(collection(db, "users"), userAddress);
      await setDoc(userRef, {
        name: name,
        email: email,
        address: userAddress,
        balance: userBalance,
      });

      setStatus("User details saved successfully");
      setIsUserSaved(true);
      navigate(`/myWallet/${userAddress}`);
    } catch (error) {
      console.error("Error saving user details: ", error);
      setErrorMessage("Failed to save user details");
    }
  };

  const fetchTransactionHistory = async (address) => {
    try {
      const response = await fetch(
        `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${apikey}`
      );
      const data = await response.json();

      if (data.status === "1") {
        const transactions = data.result;
        setTransactions(transactions);
        console.log("Transactions:", transactions);
      } else {
        console.error("Etherscan API returned an error:", data.message);
        setStatus(`Error fetching transaction history: ${data.message}`);
      }
    } catch (error) {
      console.error("Error fetching transaction history", error);
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
        <h2 className="text-3xl font-bold text-center mb-6">LOG IN</h2>
        <div className="w-full max-w-md">
          {/* Name and Email Inputs */}
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
            className="w-full bg-[#38ef7d] text-black font-bold py-2 px-4 rounded-2xl mb-4 transition duration-300"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>

          {defaultAccount && (
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <h3 className="mb-2">Address: {defaultAccount}</h3>
              <h3 className="mb-4">Balance: $ {userBalance}</h3>
              {errorMessage && (
                <p className="text-red-500 mb-4">{errorMessage}</p>
              )}
              <p className="mb-4">{status}</p>

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
      </div>
    </div>
  );
};

export default MetaMaskLogin;
