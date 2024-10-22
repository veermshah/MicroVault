import React, { useState } from "react";
import { db } from "../../../firebase";
import { collection, doc, setDoc } from "firebase/firestore";

const MetaMaskLogin = () => {
  const [userAddress, setUserAddress] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

    const connectWallet = async () => {
      console.log("Connect Wallet button clicked");
    if (window.ethereum) {
      try {
        const account = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setUserAddress(account[0]);
        setStatus("Connected account: ${account[0]}");
      } catch (error) {
        console.error("Error connecting to MetaMask: ", error);
        setStatus("Failed to connect MetaMask");
      }
    } else {
      setStatus("MetaMaks not detected. Please install it");
    }
  };

  const saveUserDetails = async () => {
    if (name && email && userAddress) {
      try {
        // save to the firestore
        await setDoc(doc(collection(db, "users"), userAddress), {
          name: name,
          email: email,
          ethAddress: userAddress,
        });
        setStatus("User details saved successfully");
      } catch (error) {
        console.error("Error saving user details: ", error);
        setStatus("Error saving user details");
      }
    } else {
      setStatus(" Please enter name and email");
    }
  };

  return (
    <div>
      <h2>Login with MetaMask</h2>
      <button onClick={connectWallet}> Connect Wallet</button>
      <p>{status}</p>
      {userAddress && (
        <div>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={saveUserDetails}> Submit </button>
        </div>
      )}
    </div>
  );
};

export default MetaMaskLogin;
