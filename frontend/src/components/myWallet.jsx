import React, { useEffect, useState } from "react";
import { useTransaction } from "../components/transactions";
import { ethers } from "ethers";
import { useUser } from "./users";
import { calculateCreditScore } from "./creditScore";
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Firestore imports

const MyWallet = () => {
  const { transactions } = useTransaction();
  const { userAddress } = useUser();
  const [userName, setUserName] = useState(""); // State to store user name

  const db = getFirestore(); // Get Firestore instance

  // Fetch user's name from Firestore
  useEffect(() => {
    const fetchUserName = async () => {
      if (userAddress) {
        const userDocRef = doc(db, "users", userAddress); // Assuming the user is stored in a 'users' collection
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          setUserName(userDoc.data().name); // Set name from Firestore
        } else {
          console.log("No user found");
        }
      }
    };

    fetchUserName();
  }, [userAddress, db]);

  // Calculate the credit score based on the user's transactions
  const creditScore = calculateCreditScore(transactions);

  // Function to update the style of the score flag
  const getFlagStyle = (score) => {
    let color = "#f44336"; // Default to red
    if (score >= 2 && score < 4) {
      color = "#ff9800"; // Orange
    } else if (score >= 4 && score < 6) {
      color = "#2196f3"; // Blue
    } else if (score >= 6) {
      color = "#4caf50"; // Green
    }
    return {
      backgroundColor: color,
      color: "white",
      padding: "8px 16px",
      borderRadius: "20px",
      fontWeight: "bold",
      display: "inline-block",
      fontSize: "14px",
      textTransform: "uppercase",
      letterSpacing: "1px",
    };
  };

  return (
    <div className="flex flex-col gap-8 py-6">
      <div 
        className="w-full bg-white border border-gray-300 rounded-2xl p-6" 
        style={{ 
          fontFamily: "'Plus Jakarta Sans', sans-serif", 
          maxWidth: '1248px', 
          margin: '0 auto' // Center the card
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "black",
            fontSize: "2rem",
            fontWeight: "600",
            marginBottom: "20px",
          }}
        >
          {userName ? `${userName}'s Transaction History` : "Transaction History"}
        </h2>
        <h3
          style={{
            textAlign: "center",
            color: "#333",
            fontSize: "1.5rem",
            marginBottom: "20px",
          }}
        >
          <span style={getFlagStyle(creditScore)}>
            Crypto Credit Score: {creditScore.toFixed(2)}
          </span>
        </h3>

        {transactions && transactions.length > 0 ? (
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {transactions.map((tx, index) => {
              const formattedValue = ethers.formatUnits(tx.value, 18); // Format the value to ETH
              const isRecieved = tx.to === userAddress;
              const isSent = tx.from === userAddress;

              return (
                <li
                  key={index}
                  style={{
                    backgroundColor: "#F5F5F5", // Light gray background
                    borderRadius: "12px",
                    padding: "20px",
                    marginBottom: "15px",
                    border: "1px solid #D1D5DB", // Updated to gray-300 equivalent
                    transition: "transform 0.2s", // Adjusted transition duration for subtle effect
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.02)") // Subtle scale effect
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <p style={{ fontSize: "1rem", margin: "5px 0", color: "#333" }}>
                    <strong>Transaction Hash:</strong>{" "}
                    <a
                      href={`https://sepolia.etherscan.io/tx/${tx.hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#2196f3", textDecoration: "none" }}
                    >
                      {tx.hash}
                    </a>
                  </p>
                  <p style={{ fontSize: "1rem", margin: "5px 0", color: "#333" }}>
                    <strong>From:</strong>{" "}
                    <a
                      href={`https://sepolia.etherscan.io/address/${tx.from}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#2196f3", textDecoration: "none" }}
                    >
                      {tx.from}
                    </a>
                  </p>
                  <p style={{ fontSize: "1rem", margin: "5px 0", color: "#333" }}>
                    <strong>To:</strong>{" "}
                    <a
                      href={`https://sepolia.etherscan.io/address/${tx.to}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#2196f3", textDecoration: "none" }}
                    >
                      {tx.to}
                    </a>
                  </p>
                  <p style={{ fontSize: "1rem", margin: "5px 0", color: "#333" }}>
                    <strong>Value:</strong> {formattedValue} ETH
                  </p>
                  <p style={{ fontSize: "1rem", margin: "5px 0", color: "#333" }}>
                    <strong>Block Number:</strong> {tx.blockNumber}
                  </p>
                  <p style={{ fontSize: "1rem", margin: "5px 0", color: "#333" }}>
                    <strong>Timestamp:</strong>{" "}
                    {new Date(tx.timeStamp * 1000).toLocaleString()}
                  </p>
                  <p style={{ fontSize: "1rem", margin: "5px 0", color: "#333" }}>
                    <strong>Status:</strong>{" "}
                    {isRecieved ? "Received" : isSent ? "Sent" : "Unknown"}
                  </p>

                  <a
                    href={`https://sepolia.etherscan.io/tx/${tx.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      backgroundColor: "#48BF84", // Original green color for the button
                      border: "none",
                      color: "white",
                      padding: "10px 20px",
                      textAlign: "center",
                      textDecoration: "none",
                      display: "inline-block",
                      fontSize: "16px",
                      marginTop:"10px", 
                      cursor:"pointer", 
                      borderRadius:"30px", 
                      transition:"background-color .3s" // Keep transition for background change only
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#3DAF70"; // Slightly faded green when hovered
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#48BF84"; // Reset to the original green color
                    }}
                  >
                    <strong>View Transaction</strong>
                  </a>
                </li>
              );
            })}
          </ul>
        ) : (
          <p style={{ textAlign:'center', color:'#888', fontSize:'1rem' }}>No transactions found.</p>
        )}
      </div>
    </div>
  );
};

export default MyWallet;