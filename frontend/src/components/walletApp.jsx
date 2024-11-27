import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import MetaMaskLogin from "../components/MetaMaskLogin";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAddress, setUserAddress] = useState("");

  // Check if the user is logged in on page load
  useEffect(() => {
    const savedAddress = localStorage.getItem("userAddress");
    if (savedAddress) {
      setIsLoggedIn(true);
      setUserAddress(savedAddress);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userAddress");
    setIsLoggedIn(false);
    setUserAddress("");
  };

  const handleLogin = (address) => {
    setIsLoggedIn(true);
    setUserAddress(address);
  };

  return (
    <div className="App">
      <Dashboard
        isLoggedIn={isLoggedIn}
        userAddress={userAddress}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
    </div>
  );
}

export default App;
