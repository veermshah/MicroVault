import "./MetaMask.css";
import "./sidebar.css";
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
  const [userBalance, setUserBalance] = useState(null);
  const [userAddress, setUserAddress] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [isUserSaved, setIsUserSaved] = useState(false);

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

        // const message = `Please sign this message to authenticate. Wallet: ${account[0]}`;
        // const signer = new ethers.providers.Web3Provider(window.ethereum).getSigner();
        // const signature = await signer.signMessage(message);

        //await saveUserDetails(account, formattedBalance, signature);
        //setUserBalance(ethers.utils.formatEther(balance));
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
    } catch (error) {
      console.error("Error saving user details: ", error);
      setErrorMessage("Failed to save user details");
    }
  };

  // If user details are saved, show the welcome page with sidebar
  // if (isUserSaved) {
  //   return (
  //     <div className="welcome-container">
  //       <aside className="sidebar">
  //         <h2>Welcome, {name}!</h2>
  //         <p>Account Address: {userAddress}</p>
  //         <p>Account Balance: ${userBalance}</p>
  //         <p>Email: {email}</p>
  //       </aside>
  //       <main className="main-content">
  //         <h3>Trading Options</h3>
  //         <p>Explore various trading options and features here...</p>
  //         {/* Add your trading components and features here */}
  //       </main>
  //     </div>
  //   );
  // }

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
