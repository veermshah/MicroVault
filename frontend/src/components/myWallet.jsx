import React from "react";
import { useTransaction } from "../components/transactions";
import { ethers } from "ethers";
import MetaMaskLogin from "./MetaMaskLogin";
import { useUser } from "./users"; // Import ethers if needed for formatting
import { calculateCreditScore } from "./creditScore";

const MyWallet = () => {
  const { transactions } = useTransaction();
  const { userAddress } = useUser();

  // Calculate the credit score based on the user's transactions
  const creditScore = calculateCreditScore(transactions);

  console.log("Transactions:", transactions);
  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", color: "#333" }}>
        Transaction History
      </h2>
      <h3 style={{ textAlign: "center", color: "#333" }}>
        Crypto Credit Score: {creditScore}
      </h3>
      {transactions && transactions.length > 0 ? (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {transactions.map((tx, index) => {
            const formattedValue = ethers.formatUnits(tx.value, 18); // Format the value to ETH
            const isRecieved = tx.to == userAddress;
            const isSent = tx.from == userAddress;

            return (
              <li
                key={index}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "15px",
                  marginBottom: "10px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <p>
                  <strong>Transaction Hash:</strong>{" "}
                  <a
                    //href={`https://sepolia.etherscan.io/tx/${tx.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    //style={{ color: "#007bff" }}
                  >
                    {tx.hash}
                  </a>
                </p>
                <p>
                  <strong>From:</strong>{" "}
                  <a
                    //href={`https://sepolia.etherscan.io/address/${tx.from}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    //style={{ color: "#007bff" }}
                  >
                    {tx.from}
                  </a>
                </p>
                <p>
                  <strong>To:</strong>{" "}
                  <a
                    //href={`https://sepolia.etherscan.io/address/${tx.to}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    //style={{ color: "#007bff" }}
                  >
                    {tx.to}
                  </a>
                </p>
                <p>
                  <strong>Value:</strong> {formattedValue} ETH
                </p>
                <p>
                  <strong>Block Number:</strong> {tx.blockNumber}
                </p>
                <p>
                  <strong>Timestamp:</strong>{" "}
                  {new Date(tx.timeStamp * 1000).toLocaleString()}
                </p>
                <p>
                  <strong>Status:</strong>
                  {isRecieved ? "Recieved" : isSent ? "Sent" : "Unknown"}
                </p>
                <a
                  href={`https://sepolia.etherscan.io/tx/${tx.hash}`} // Replace with your desired URL
                  target="_blank" // Opens link in a new tab
                  rel="noopener noreferrer" // Improves security when opening in a new tab
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
                    borderRadius: "4px",
                    transition: "background-color 0.3s",
                  }}
                >
                  View Transanction
                </a>
              </li>
            );
          })}
        </ul>
      ) : (
        <p style={{ textAlign: "center", color: "#888" }}>
          No transactions found.
        </p>
      )}
    </div>
  );
};

export default MyWallet;
