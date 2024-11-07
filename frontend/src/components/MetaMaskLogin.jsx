import "./MetaMask.css";
import "./sidebar.css";
import React, { useState } from "react";
import { useSDK } from "@metamask/sdk-react";
import { db } from "../../../firebase"; // Adjust the path accordingly
import { collection, doc, setDoc } from "firebase/firestore";
import { ethers } from "ethers"; 
import { formatEther } from 'ethers';
import { useTransaction } from "./transactions";
import { useNavigate } from "react-router-dom";
import { useUser } from "./users";// v6.x.x version

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
    //console.log(ethers.utils); // Checking  if formatEther is present

    if (window.ethereum) {
      try {
        // getting the account address
        const account = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setUserAddresss(account[0]);
        setUserAddress(account[0]);
        setDefaultAccount(account[0]);
        setStatus(`Connected account: ${account[0]}`);
        localStorage.setItem("userAddress", account[0]); 

        // getting the account balance
        const balance = await window.ethereum.request({
          method: "eth_getBalance",
          params: [String(account[0]), "latest"],
        });
        const formattedBalance = formatEther(balance);
        setUserBalance(formattedBalance);

        //fetch transaction history after connecting 
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
    // work on firebase logic
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
      // go to the wallet page
      navigate(`/myWallet/${userAddress}`);
    } catch (error) {
      console.error("Error saving user details: ", error);
      setErrorMessage("Failed to save user details");
    }
  };

  const fetchTransactionHistory = async (address) => {
    try {
      //testing for real network
      //const response = await fetch(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${apikey}`);
      //testing for the sepolia network 
      const response = await fetch(
        `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${apikey}`
      );
      const data = await response.json();

      if (data.status === "1") {
        const transactions = data.result;
        setTransactions(transactions);
        console.log("Transactions:", transactions);
      } else {
        //setStatus("Error fetching transaction history");
        console.error("Etherscan API returned an error:", data.message);
        setStatus(`Error fetching transaction history: ${data.message}`);
      }

    } catch (error) {
      console.error("Error fetching transaction history", error);
    }
  }
  
  
    return (
      <div className="metamask-login-container">
        <h2>Login with MetaMask</h2>
        <button className="button connect-wallet" onClick={connectWallet}>
          Connect Wallet
        </button>
        <h3>Address: {defaultAccount}</h3>
        <h3>Balance: $ {userBalance}</h3>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <p>{status}</p>

        {userAddress && (
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
            {connected && (
              <div>
                {chainId && <p>Connected chain: {chainId}</p>}
                <p>Connected account: {userAddress}</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };
 

export default MetaMaskLogin;
