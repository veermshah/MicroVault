// Borrow.jsx
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { Link } from "react-router-dom";
import contractABI from "../abi/p2pSmartContract.json";

const Borrow = () => {
  // Web3 and Contract State
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [walletAddress, setWalletAddress] = useState(""); // Automatically set via MetaMask

  // Form Input States
  const [loanAmount, setLoanAmount] = useState("");
  const [loanDuration, setLoanDuration] = useState(""); // Loan Duration in Days
  const [collateralValue, setCollateralValue] = useState("");

  // Validation and Terms States
  const [isOvercollateralized, setIsOvercollateralized] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // Rates and Fees
  const [rates, setRates] = useState({
    borrowerRate: "--",
    lenderAPY: "--",
    serviceFee: "--",
    futureValue: "--",
  });

  // Loading State
  const [isLoading, setIsLoading] = useState(false); // Loading state for transactions

  // Transaction Hash State
  const [transactionHash, setTransactionHash] = useState(""); // New State Variable

  // Constants
  const collateralRatio = 1.5; // 150% collateral requirement (must align with smart contract)
  const minLoanAmount = 0.0001; // Minimum loan amount in ETH
  const maxLoanAmount = 100; // Maximum loan amount in ETH
  const contractAddress = "0x0ae6d7662CBE8609e829e620aB73d29AAaf6A463"; // Replace with your contract address

  // Initialize Web3 and Contract
  useEffect(() => {
    const initializeWeb3 = async () => {
      if (window.ethereum) {
        try {
          // Request account access if needed
          await window.ethereum.request({ method: "eth_requestAccounts" });

          // Initialize Web3 with the injected provider (MetaMask)
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          // Get the user's wallet address
          const accounts = await web3Instance.eth.getAccounts();
          setWalletAddress(accounts[0]);

          // Initialize the contract instance
          const contractInstance = new web3Instance.eth.Contract(contractABI.abi, contractAddress);
          setContract(contractInstance);

          // Ensure the user is on the Sepolia network
          await switchToSepolia();

          // Listen for account or network changes
          window.ethereum.on("accountsChanged", (accounts) => {
            setWalletAddress(accounts[0] || "");
            // Optionally, you can reset form fields or perform other actions here
          });

          window.ethereum.on("chainChanged", (chainId) => {
            window.location.reload();
          });
        } catch (error) {
          console.error("Error initializing Web3:", error);
          alert("Failed to initialize Web3. Please ensure you have MetaMask installed and connected.");
        }
      } else {
        alert("MetaMask is not detected. Please install MetaMask and try again.");
      }
    };

    initializeWeb3();
    // Cleanup event listeners on component unmount
    return () => {
      if (window.ethereum && window.ethereum.removeListener) {
        window.ethereum.removeListener("accountsChanged", () => {});
        window.ethereum.removeListener("chainChanged", () => {});
      }
    };
  }, []);

  // Function to switch the network to Sepolia
  const switchToSepolia = async () => {
    try {
      if (window.ethereum) {
        const chainId = await window.ethereum.request({ method: "eth_chainId" });
        if (chainId !== "0xaa36a7") { // Sepolia's chain ID in hexadecimal
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0xaa36a7" }],
          });
          console.log("Switched to Sepolia network.");
        }
      }
    } catch (error) {
      console.error("Error switching to Sepolia network:", error);
      alert("Failed to switch to Sepolia network. Please do so manually in MetaMask.");
    }
  };

  // Check Overcollateralization
  useEffect(() => {
    if (collateralValue && loanAmount && loanDuration) {
      setIsOvercollateralized(
        parseFloat(collateralValue) >= parseFloat(loanAmount) * collateralRatio
      );
    } else {
      setIsOvercollateralized(false);
    }
  }, [collateralValue, loanAmount, loanDuration]);

  // Calculate and set rates whenever loanAmount or collateralValue changes
  useEffect(() => {
    calculateRates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loanAmount, collateralValue]);

  // Refactored calculateRates to set rates directly
  const calculateRates = () => {
    console.log("Calculating Borrowing Rates...");
    if (
      !loanAmount ||
      !collateralValue ||
      parseFloat(loanAmount) <= 0 ||
      parseFloat(collateralValue) <= 0
    ) {
      console.error("Invalid loan amount or collateral value.");
      setRates({
        borrowerRate: "--",
        lenderAPY: "--",
        serviceFee: "--",
        futureValue: "--",
      });
      return null;
    }

    const baseRate = 5; // Base rate of 5%
    const futureLoanValue = parseFloat(loanAmount) * (1 + baseRate / 100); // Example calculation
    const serviceFee = 0.005; // Fixed service fee

    if (futureLoanValue > 0) {
      const lenderAPY = (baseRate * 0.9).toFixed(2); // Example APY for lenders
      console.log("Borrower Rate:", baseRate);
      console.log("Future Value:", futureLoanValue);

      setRates({
        borrowerRate: baseRate,
        futureValue: futureLoanValue.toFixed(2),
        serviceFee: serviceFee.toFixed(5),
        lenderAPY,
      });

      return {
        borrowerRate: baseRate,
        futureValue: futureLoanValue.toFixed(2),
        serviceFee: serviceFee.toFixed(5),
        lenderAPY,
      };
    } else {
      console.error("Failed to calculate rates. Check your inputs.");
      setRates({
        borrowerRate: "--",
        lenderAPY: "--",
        serviceFee: "--",
        futureValue: "--",
      });
      return null;
    }
  };

  // Handle Loan Request Submission
  const handleLoanRequest = async (e) => {
    e.preventDefault();

    console.log("Loan Request Initiated");
    console.log("Wallet Address:", walletAddress);
    console.log("Collateral Value (ETH):", collateralValue);
    console.log("Loan Amount (ETH):", loanAmount);
    console.log("Loan Duration (Days):", loanDuration); // Updated Loan Duration Label

    // Input Validations
    if (!loanAmount || parseFloat(loanAmount) <= 0) {
      alert("Please enter a valid loan amount.");
      return;
    }

    if (!collateralValue || parseFloat(collateralValue) <= 0) {
      alert("Please enter a valid collateral value.");
      return;
    }

    if (!loanDuration || parseInt(loanDuration) <= 0) {
      alert("Please enter a valid loan duration in days.");
      return;
    }

    if (!isOvercollateralized) {
      alert(
        "Loan must be overcollateralized by at least 150%. Please increase your collateral."
      );
      return;
    }

    if (!web3.utils.isAddress(walletAddress)) {
      alert("Invalid wallet address. Please check and try again.");
      return;
    }

    // Ensure rates are calculated
    if (rates.borrowerRate === "--") {
      alert("Borrower rate is not calculated. Please check your inputs.");
      return;
    }

    try {
      setIsLoading(true); // Start loading

      const { borrowerRate } = rates;
      const collateralInWei = web3.utils.toWei(collateralValue, "ether");
      const principalInWei = web3.utils.toWei(loanAmount, "ether");
      const durationInSeconds = parseInt(loanDuration) * 86400; // Convert days to seconds

      console.log("Collateral in Wei:", collateralInWei);
      console.log("Principal in Wei:", principalInWei);
      console.log("Loan Duration (seconds):", durationInSeconds);
      console.log("Borrower Rate:", borrowerRate);

      // Estimate gas
      const gasEstimate = await contract.methods
        .requestLoan(principalInWei, borrowerRate, durationInSeconds, collateralInWei)
        .estimateGas({ from: walletAddress, value: collateralInWei });

      console.log("Estimated Gas:", gasEstimate);

      // Send transaction
      const receipt = await contract.methods
        .requestLoan(principalInWei, borrowerRate, durationInSeconds, collateralInWei)
        .send({ from: walletAddress, value: collateralInWei, gas: gasEstimate });

      console.log("Transaction Receipt:", receipt);
      alert("Loan requested successfully!");

      // Set the transaction hash to display the "View on Mainnet" button
      setTransactionHash(receipt.transactionHash);
    } catch (error) {
      console.error("Error requesting loan:", error);
      // Detailed error logging
      if (error.response) {
        console.error("Response Error:", error.response.data);
      } else if (error.request) {
        console.error("Request Error:", error.request);
      } else {
        console.error("General Error:", error.message);
      }
      alert(`An error occurred while requesting the loan: ${error.message}`);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  // Handle Loan Amount Change with Validation
  const handleLoanAmountChange = (e) => {
    const value = e.target.value;
    setLoanAmount(value);

    if (value) {
      setCollateralValue(
        Math.max(
          parseFloat(value) * collateralRatio,
          parseFloat(collateralValue) || minLoanAmount
        ).toString()
      );
    } else {
      setCollateralValue("");
    }
  };

  // Helper function to construct Etherscan URL based on network
  const getEtherscanUrl = () => {
    const chainId = window.ethereum ? window.ethereum.chainId : "0xaa36a7"; // Default to Sepolia
    if (chainId === "0x1") {
      return "https://etherscan.io/tx/";
    } else if (chainId === "0xaa36a7") {
      return "https://sepolia.etherscan.io/tx/";
    } else {
      return "https://etherscan.io/tx/"; // Default to mainnet Etherscan
    }
  };

  return (
    <div className="flex flex-col gap-8 py-6">
      {/* Borrowing Overview Section */}
      <div className="w-full bg-white border border-gray-300 rounded-2xl p-6">
        <h2 className="text-2xl font-semibold mb-4">Borrowing Overview</h2>
        <p className="text-gray-700 mb-4">
          MicroVault offers overcollateralized loans, allowing you to borrow against your crypto
          assets. Here's how it works:
        </p>
        <div className="space-y-4">
          {[
            "Deposit your ETH as collateral.",
            "Borrow up to 83% of your collateral's value.",
            "Repay your loan with interest over the agreed duration.",
            "Maintain your collateral ratio to avoid liquidation.",
            "Reclaim your collateral upon full repayment of the loan.",
            "Flexible loan durations to suit your needs.",
            "Competitive interest rates based on market conditions.",
            "Transparent fee structure with no hidden costs.",
          ].map((step, index) => (
            <div key={index} className="flex items-start">
              <div
                className={`flex-shrink-0 w-8 h-8 ${
                  index % 2 === 0 ? 'bg-[#11998E]' : 'bg-[#48BF84]'
                } text-white rounded-full flex items-center justify-center mr-3`}
              >
                {index + 1}
              </div>
              <p className="text-gray-700">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Borrow Form and Terms Section */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Borrow Form */}
        <div className="md:w-1/2 p-4 rounded-2xl border border-gray-300 bg-gray-100">
          <h2 className="text-2xl font-semibold mb-6">Borrow</h2>
          <form onSubmit={handleLoanRequest}>
            {/* Wallet Address */}
            <div className="mb-4">
              <label className="block mb-2">Wallet Address</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder="Enter Your Wallet Address"
                required
              />
            </div>

            {/* Collateral Value */}
            <div className="mb-4">
              <label className="block mb-2">Collateral Value (USDC)</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={collateralValue}
                onChange={(e) => setCollateralValue(e.target.value)}
                placeholder="Enter Collateral Value in ETH"
                required
              />
            </div>

            {/* Loan Amount */}
            <div className="mb-4">
              <label className="block mb-2">Loan Amount (ETH)</label> {/* Retained 'ETH' */}
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={loanAmount}
                onChange={handleLoanAmountChange}
                placeholder="Enter Loan Amount in ETH"
                required
              />
              {!isOvercollateralized && loanAmount && (
                <p className="text-red-500 text-sm mt-1">
                  The loan must be overcollateralized by at least 150%. Please increase your
                  collateral or decrease your loan amount.
                </p>
              )}
            </div>

            {/* Loan Duration */}
            <div className="mb-4">
              <label className="block mb-2">Loan Duration (Days)</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={loanDuration}
                onChange={(e) => setLoanDuration(e.target.value)}
                placeholder="Enter Loan Duration in Days"
                required
              />
            </div>

            {/* Agree to Terms */}
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={() => setAgreeToTerms(!agreeToTerms)}
              />
              <span className="ml-2">I agree to the Terms and Conditions</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!agreeToTerms || isLoading}
              className={`mt-6 ${
                agreeToTerms && !isLoading ? "bg-[#48BF84]" : "bg-gray-300 text-gray-600 cursor-not-allowed"
              } text-white px-4 py-2 rounded w-full font-bold`}
            >
              {isLoading ? "Processing..." : "Request Loan"}
            </button>
          </form>

          {/* View on Mainnet Button */}
          {transactionHash && (
            <div className="mt-4 text-center">
              <a
                href={`https://sepolia.etherscan.io/tx/${transactionHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                View on Mainnet
              </a>
            </div>
          )}
        </div>

        {/* Borrowing Terms Display */}
        <div className="md:w-1/2 bg-[#48BF84]/10 p-4 rounded-2xl border border-[#48BF84]">
          <h3 className="text-xl font-semibold mb-4">Borrowing Terms</h3>
          {rates.borrowerRate !== "--" ? (
            <>
              <div className="flex justify-between mt-2">
                <p className="font-bold">Borrower Rate:</p>
                <p>{rates.borrowerRate}%</p>
              </div>
              <div className="flex justify-between mt-2">
                <p className="font-bold">Lender APY:</p>
                <p>{rates.lenderAPY}%</p>
              </div>
              <div className="flex justify-between mt-2">
                <p className="font-bold">Service Fee:</p>
                <p>{rates.serviceFee} ETH</p>
              </div>
              <div className="flex justify-between mt-2">
                <p className="font-bold">Total Repayment:</p>
                <p>{rates.futureValue} ETH</p>
              </div>
              <Link
                to="/faq"
                className="mt-4 block text-center bg-white border rounded px-4 py-2"
              >
                FAQ
              </Link>
            </>
          ) : (
            <>
              <div className="flex justify-between mt-2">
                <p className="font-bold">Borrower Rate:</p>
                <p>--%</p>
              </div>
              <div className="flex justify-between mt-2">
                <p className="font-bold">Lender APY:</p>
                <p>--%</p>
              </div>
              <div className="flex justify-between mt-2">
                <p className="font-bold">Service Fee:</p>
                <p>-- ETH</p>
              </div>
              <div className="flex justify-between mt-2">
                <p className="font-bold">Total Repayment:</p>
                <p>-- ETH</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Borrow;
