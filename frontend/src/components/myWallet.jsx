import React, { useEffect, useState } from "react";
import { useTransaction } from "../components/transactions";
import { ethers } from "ethers";
import MetaMaskLogin from "./MetaMaskLogin";
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
    if (score >= 200 && score < 400) {
      color = "#ff9800"; // Orange
    } else if (score >= 400 && score < 600) {
      color = "#2196f3"; // Blue
    } else if (score >= 600) {
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
    <div
      style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
        fontFamily: "'Roboto', sans-serif",
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
                  backgroundColor: "#E5F2E5",
                  borderRadius: "12px",
                  padding: "20px",
                  marginBottom: "15px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <p style={{ fontSize: "1rem", margin: "5px 0" }}>
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
                <p style={{ fontSize: "1rem", margin: "5px 0" }}>
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
                <p style={{ fontSize: "1rem", margin: "5px 0" }}>
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
                <p style={{ fontSize: "1rem", margin: "5px 0" }}>
                  <strong>Value:</strong> {formattedValue} ETH
                </p>
                <p style={{ fontSize: "1rem", margin: "5px 0" }}>
                  <strong>Block Number:</strong> {tx.blockNumber}
                </p>
                <p style={{ fontSize: "1rem", margin: "5px 0" }}>
                  <strong>Timestamp:</strong>{" "}
                  {new Date(tx.timeStamp * 1000).toLocaleString()}
                </p>
                <p style={{ fontSize: "1rem", margin: "5px 0" }}>
                  <strong>Status:</strong>{" "}
                  {isRecieved ? "Received" : isSent ? "Sent" : "Unknown"}
                </p>

                <a
                  href={`https://sepolia.etherscan.io/tx/${tx.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: "#4caf50",
                    border: "none",
                    color: "white",
                    padding: "10px 20px",
                    textAlign: "center",
                    textDecoration: "none",
                    display: "inline-block",
                    fontSize: "16px",
                    margin: "10px 0",
                    cursor: "pointer",
                    borderRadius: "30px",
                    transition:
                      "background-color 0.3s, transform 0.3s, box-shadow 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#45a049"; // Darker green when hovered
                    e.target.style.transform = "scale(1.05)"; // Slightly enlarges the button
                    e.target.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)"; // Adds a subtle shadow
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#4caf50"; // Reset to the original color
                    e.target.style.transform = "scale(1)"; // Reset the size
                    e.target.style.boxShadow = "none"; // Remove the shadow
                  }}
                >
                  <strong>View Transaction</strong>
                </a>
              </li>
            );
          })}
        </ul>
      ) : (
        <p style={{ textAlign: "center", color: "#888", fontSize: "1rem" }}>
          No transactions found.
        </p>
      )}
    </div>
  );
};

export default MyWallet;
