import "./MetaMask.css";
import "./sidebar.css";
import React, { useState, useEffect } from "react";
import { db } from "../../../firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { ethers } from "ethers";
import { formatEther } from "ethers";
import { useTransaction } from "./transactions";
import { useNavigate } from "react-router-dom";
import { useUser } from "./users";

const apikey = "SIBXADTFTICF4I8UFA78NVSFIIAIJAM5V6";

const MetaMaskLogin = () => {
  const navigate = useNavigate();
  const { setUserAddress } = useUser();
  const { transactions, setTransactions } = useTransaction();

  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [userAddress, setUserAddresss] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [isUserSaved, setIsUserSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // On component mount, restore session if available
  useEffect(() => {
    const savedAddress = localStorage.getItem("userAddress");
    if (savedAddress) {
      setUserAddresss(savedAddress);
      setDefaultAccount(savedAddress);
      fetchAccountBalance(savedAddress);
      fetchTransactionHistory(savedAddress);
      setStatus(`Welcome back! Connected account: ${savedAddress}`);
    }
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const address = accounts[0];
        setUserAddresss(address);
        setDefaultAccount(address);
        localStorage.setItem("userAddress", address);
        setStatus(`Connected account: ${address}`);
        fetchAccountBalance(address);
        fetchTransactionHistory(address);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
        setStatus("Failed to connect MetaMask");
      }
    } else {
      setStatus("MetaMask not detected. Please install it.");
    }
  };

  const fetchAccountBalance = async (address) => {
    try {
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [address, "latest"],
      });
      const formattedBalance = formatEther(balance);
      setUserBalance(formattedBalance);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const fetchTransactionHistory = async (address) => {
    try {
      const response = await fetch(
        `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${apikey}`
      );
      const data = await response.json();

      if (data.status === "1") {
        setTransactions(data.result);
        console.log("Transaction history:", data.result);
      } else {
        console.error("Error fetching transactions:", data.message);
        setStatus(`Error fetching transactions: ${data.message}`);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
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
        name,
        email,
        address: userAddress,
        balance: userBalance,
      });
      setStatus("User details saved successfully");
      setIsUserSaved(true);
      navigate(`/myWallet/${userAddress}`);
    } catch (error) {
      console.error("Error saving user details:", error);
      setErrorMessage("Failed to save user details");
    }
  };

  const disconnectWallet = () => {
    setDefaultAccount(null);
    setUserAddresss("");
    localStorage.removeItem("userAddress");
    setStatus("Disconnected");
  };

  return (
    <div className="metamask-login-container">
      <h2>Login with MetaMask</h2>
      <button
        className="button connect-wallet"
        onClick={defaultAccount ? disconnectWallet : connectWallet}
      >
        {defaultAccount ? "Sign Out" : "Connect Wallet"}
      </button>
      {defaultAccount && (
        <>
          <h3>Address: {defaultAccount}</h3>
          <h3>Balance: {userBalance ? `$ ${userBalance}` : "Loading..."}</h3>
        </>
      )}
      {errorMessage && <p className="error">{errorMessage}</p>}
      <p>{status}</p>

      {defaultAccount && !isUserSaved && (
        <div className="user-details">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
          <button className="button submit" onClick={saveUserDetails}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default MetaMaskLogin;