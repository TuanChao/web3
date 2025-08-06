export interface User {
  address: string
  ensName?: string
  avatar?: string
}

export interface Token {
  address: string
  symbol: string
  name: string
  decimals: number
  logoURI?: string
}

export interface TokenBalance {
  token: Token
  balance: string
  formattedBalance: string
  usdValue?: number
}

export interface Transaction {
  hash: string
  from: string
  to: string
  value: string
  timestamp: number
  status: 'pending' | 'success' | 'failed'
  blockNumber?: number
}

export interface NFT {
  contractAddress: string
  tokenId: string
  name: string
  description?: string
  image?: string
  attributes?: NFTAttribute[]
}

export interface NFTAttribute {
  trait_type: string
  value: string | number
}

export interface ChainInfo {
  id: number
  name: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  rpcUrls: string[]
  blockExplorerUrls: string[]
}

export type SupportedChainId = 1 | 137 | 42161 | 10 | 8453 | 11155111
