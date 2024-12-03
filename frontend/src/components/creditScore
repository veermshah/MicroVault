export const calculateCreditScore = (transactions) => {
  let score = 0;

  // Constants for weightings 
  const TRANSACTION_WEIGHT = 0.5; // Weight for number of transactions
  const VALUE_WEIGHT = 0.05; // Weight for total value (log scale)
  const DIVERSITY_WEIGHT = 2; // Weight for unique recipients

  // Defining the extreme values (assumed maximums and minimums)
  const MAX_TRANSACTIONS = 500; // Max number of transactions
  const MIN_TRANSACTIONS = 1; // Min number of transactions

  const MAX_VALUE = 500; // Max transaction value (ETH)
  const MIN_VALUE = 0.01; // Min transaction value (ETH)

  const MAX_RECIPIENTS = 500; // Max unique recipients
  const MIN_RECIPIENTS = 1; // Min unique recipients

  // 1. Transaction Frequency (scaled)
  const transactionCount = transactions.length;
  const transactionScore = Math.min(transactionCount * TRANSACTION_WEIGHT, MAX_TRANSACTIONS * TRANSACTION_WEIGHT);

  // 2. Transaction Value (logarithmic scale to prevent inflation)
  const totalValue = transactions.reduce((acc, tx) => acc + parseFloat(tx.value), 0);
  const valueScore = Math.min(Math.log(totalValue + 1) * VALUE_WEIGHT, Math.log(MAX_VALUE + 1) * VALUE_WEIGHT);

  // 3. Diversity Calculation (based on unique recipients)
  const uniqueRecipients = new Set(transactions.map((tx) => tx.to)).size;
  const diversityScore = Math.min(uniqueRecipients * DIVERSITY_WEIGHT, MAX_RECIPIENTS * DIVERSITY_WEIGHT);

  
  // Calculate total score before normalization
  score = transactionScore + valueScore + diversityScore;

  // Calculate min and max possible score based on extremes
  const MIN_SCORE = MIN_TRANSACTIONS * TRANSACTION_WEIGHT + Math.log(MIN_VALUE + 1) * VALUE_WEIGHT + MIN_RECIPIENTS * DIVERSITY_WEIGHT;
  const MAX_SCORE = MAX_TRANSACTIONS * TRANSACTION_WEIGHT + Math.log(MAX_VALUE + 1) * VALUE_WEIGHT + MAX_RECIPIENTS * DIVERSITY_WEIGHT;

  // Normalize the score to the range
  const normalizedScore = Math.max(0, Math.min(((score - MIN_SCORE) / (MAX_SCORE - MIN_SCORE)) * 1000, 10));

  return normalizedScore;
};
