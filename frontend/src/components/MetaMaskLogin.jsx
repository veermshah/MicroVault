import "./MetaMask.css";
import React, { useState } from "react";
import { useSDK } from "@metamask/sdk-react";
import { db } from "../../../firebase"; // Adjust the path accordingly
import { collection, doc, setDoc } from "firebase/firestore";
import { ethers } from "ethers"; 
import { formatEther } from 'ethers'; // v6.x.x version


const MetaMaskLogin = () => {
  const { sdk, connected, chainId } = useSDK();

  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null)
  const [userAddress, setUserAddress] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const connectWallet = async () => {
    console.log("Connect Wallet button clicked");
    //console.log(ethers.utils); // Checking  if formatEther is present

    if (window.ethereum) {
      try {
        // getting the account address
        const account = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setUserAddress(account[0]);
        setDefaultAccount(account[0]);
        setStatus(`Connected account: ${account[0]}`);

        // getting the account balance
        const balance = await window.ethereum.request({
          method: "eth_getBalance",
          params: [String(account[0]), "latest"],
        });
        const formattedBalance = formatEther(balance);
        setUserBalance(formattedBalance);
        //setUserBalance(ethers.utils.formatEther(balance));
      } catch (error) {
        console.error("Error connecting to MetaMask: ", error);
        setStatus("Failed to connect MetaMask");
      }
    } else {
      setStatus("MetaMask not detected. Please install it.");
    }

    // // getting the account balance
    // try {
    //   // getting the account balance
    //     const balance = await window.ethereum.request({
    //       method: "eth_getBalance",
    //       params: [String(account[0]), "latest"],
    //     });
    //     setUserBalance(ethers.utils.formatEther(balance));
    // } catch (error) {
    //   console.error("Error getting balance: ", error);
    //   setStatus("Cannot get account balance");
    // }
  };

  const saveUserDetails = async () => {
    // work on firebase logic 
  };

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
