// Lend.jsx
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { Link } from 'react-router-dom';
import contractABI from '../abi/p2pSmartContract.json'; // Ensure this path is correct

const Lend = () => {
  // Web3 and Contract State
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [walletAddress, setWalletAddress] = useState('');

  // Loan Data State
  const [availableLoans, setAvailableLoans] = useState([]);
  const [fundedLoans, setFundedLoans] = useState([]);

  // Loading States
  const [isLoadingLoans, setIsLoadingLoans] = useState(false);
  const [isFunding, setIsFunding] = useState(false);

  // Constants
  const contractAddress = '0x0ae6d7662CBE8609e829e620aB73d29AAaf6A463'; // Replace with your contract address

  // Initialize Web3 and Contract
  useEffect(() => {
    const initializeWeb3 = async () => {
      if (window.ethereum) {
        try {
          // Request account access if needed
          await window.ethereum.request({ method: 'eth_requestAccounts' });

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
          window.ethereum.on('accountsChanged', (accounts) => {
            setWalletAddress(accounts[0] || '');
            fetchLoans(contractInstance, accounts[0]);
          });

          window.ethereum.on('chainChanged', (chainId) => {
            window.location.reload();
          });

          // Fetch loans initially
          fetchLoans(contractInstance, accounts[0]);
        } catch (error) {
          console.error('Error initializing Web3:', error);
          alert('Failed to initialize Web3. Please ensure you have MetaMask installed and connected.');
        }
      } else {
        alert('MetaMask is not detected. Please install MetaMask and try again.');
      }
    };

    initializeWeb3();
  }, []);

  // Function to switch the network to Sepolia
  const switchToSepolia = async () => {
    try {
      if (window.ethereum) {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        if (chainId !== '0xaa36a7') { // Sepolia's chain ID in hexadecimal
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0xaa36a7' }],
          });
          console.log('Switched to Sepolia network.');
        }
      }
    } catch (error) {
      console.error('Error switching to Sepolia network:', error);
      alert('Failed to switch to Sepolia network. Please do so manually in MetaMask.');
    }
  };

  // Function to fetch loans from the smart contract
  const fetchLoans = async (contractInstance, currentAddress) => {
    if (!contractInstance) return;

    try {
      setIsLoadingLoans(true);
      const loansCount = await contractInstance.methods.loanCounter().call();
      const tempAvailableLoans = [];
      const tempFundedLoans = [];

      for (let i = 1; i <= loansCount; i++) {
        const loan = await contractInstance.methods.loans(i).call();

        if (!loan.isActive && loan.lender === '0x0000000000000000000000000000000000000000') {
          // Available for funding
          tempAvailableLoans.push({ id: i, ...loan });
        }

        if (loan.lender.toLowerCase() === currentAddress.toLowerCase()) {
          // Funded by the current lender
          tempFundedLoans.push({ id: i, ...loan });
        }
      }

      setAvailableLoans(tempAvailableLoans);
      setFundedLoans(tempFundedLoans);
    } catch (error) {
      console.error('Error fetching loans:', error);
      alert('An error occurred while fetching loans. Please try again.');
    } finally {
      setIsLoadingLoans(false);
    }
  };

  // Function to fund a loan
  const handleFundLoan = async (loanId, principal) => {
    if (!contract || !walletAddress) {
      alert('Contract not loaded or wallet not connected.');
      return;
    }

    try {
      setIsFunding(true);
      const gasEstimate = await contract.methods
        .fundLoan(loanId)
        .estimateGas({ from: walletAddress, value: principal });

      await contract.methods
        .fundLoan(loanId)
        .send({ from: walletAddress, value: principal, gas: gasEstimate });

      alert('Loan funded successfully!');
      // Refresh loan data
      fetchLoans(contract, walletAddress);
    } catch (error) {
      console.error('Error funding loan:', error);
      alert(`Error funding loan: ${error.message}`);
    } finally {
      setIsFunding(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 py-6">
      {/* Lending Overview Section */}
      <div className="w-full bg-white border border-gray-300 rounded-2xl p-6">
        <h2 className="text-2xl font-semibold mb-4">Lending Overview</h2>
        <p className="text-gray-700 mb-4">
          MicroVault operates as a decentralized lending platform, allowing you to lend your crypto assets and earn interest. Here's how it works:
        </p>
        <div className="space-y-4">
          {[
            'Deposit your ETH into the lending pool.',
            'Borrowers take out overcollateralized loans using these funds.',
            'Smart contracts manage loans and collateral automatically.',
            'Earn interest on your deposited assets, with rates increasing for longer durations.',
            'Your funds are protected by overcollateralization (typically 150%+ of loan value).',
            'Automatic liquidation protects lenders if collateral value drops below required ratio.',
            'Withdraw your funds and earned interest anytime, subject to liquidity.',
            'Small service fee covers operational costs and enhances ecosystem security.',
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
        <p className="mt-4 text-gray-700 font-semibold">
          Earn passive income on your crypto assets while contributing to DeFi liquidity.
        </p>
      </div>

      {/* Loans Section */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Available Loans */}
        <div className="md:w-1/2 p-4 rounded-2xl border border-gray-300 bg-gray-100">
          <h2 className="text-2xl font-semibold mb-6">Available Loans</h2>
          {isLoadingLoans ? (
            <p className="text-gray-700">Loading available loans...</p>
          ) : availableLoans.length > 0 ? (
            availableLoans.map((loan) => (
              <div key={loan.id} className="p-4 border rounded mb-4 bg-white">
                <p className="font-bold">Loan ID: {loan.id}</p>
                <p>Borrower: {loan.borrower}</p>
                <p>Principal: {web3.utils.fromWei(loan.principal, 'ether')} ETH</p>
                <p>Interest Rate: {loan.interest}%</p>
                <p>Duration: {loan.duration} seconds</p>
                <p>Collateral: {web3.utils.fromWei(loan.collateral, 'ether')} ETH</p>
                <button
                  onClick={() => handleFundLoan(loan.id, loan.principal)}
                  disabled={isFunding}
                  className={`mt-2 ${
                    isFunding ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#48BF84]'
                  } text-white px-4 py-2 rounded`}
                >
                  {isFunding ? 'Funding...' : 'Fund Loan'}
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-700">No available loans at the moment.</p>
          )}
        </div>

        {/* Funded Loans */}
        <div className="md:w-1/2 p-4 rounded-2xl border border-gray-300 bg-gray-100">
          <h2 className="text-2xl font-semibold mb-6">My Funded Loans</h2>
          {isLoadingLoans ? (
            <p className="text-gray-700">Loading your funded loans...</p>
          ) : fundedLoans.length > 0 ? (
            fundedLoans.map((loan) => (
              <div key={loan.id} className="p-4 border rounded mb-4 bg-white">
                <p className="font-bold">Loan ID: {loan.id}</p>
                <p>Borrower: {loan.borrower}</p>
                <p>Principal: {web3.utils.fromWei(loan.principal, 'ether')} ETH</p>
                <p>Repaid Amount: {web3.utils.fromWei(loan.repaidAmount, 'ether')} ETH</p>
                <p>Collateral: {web3.utils.fromWei(loan.collateral, 'ether')} ETH</p>
                <p>Status: {loan.isActive ? 'Active' : 'Closed'}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-700">You have not funded any loans yet.</p>
          )}
        </div>
      </div>

      {/* Optional: Lending Terms or Additional Information */}
      {/* You can add more sections here if needed */}
    </div>
  );
};

export default Lend;
