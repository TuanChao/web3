// Chain configurations
export const SUPPORTED_CHAINS = {
  ETHEREUM: 1,
  POLYGON: 137,
  ARBITRUM: 42161,
  OPTIMISM: 10,
  BASE: 8453,
  SEPOLIA: 11155111, // Testnet
} as const

// Contract addresses
export const CONTRACT_ADDRESSES = {
  [SUPPORTED_CHAINS.ETHEREUM]: {
    // Add your contract addresses here
  },
  [SUPPORTED_CHAINS.POLYGON]: {
    // Add your contract addresses here
  },
  // Add more chains as needed
} as const

// API endpoints
export const API_ENDPOINTS = {
  COINGECKO: 'https://api.coingecko.com/api/v3',
  ETHERSCAN: 'https://api.etherscan.io/api',
  POLYGONSCAN: 'https://api.polygonscan.com/api',
} as const

// App configuration
export const APP_CONFIG = {
  name: 'Web3 DApp',
  description: 'A modern Web3 application built with React and Wagmi',
  version: '1.0.0',
  defaultChain: SUPPORTED_CHAINS.ETHEREUM,
} as const
