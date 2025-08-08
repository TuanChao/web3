import { useState, useEffect } from 'react'
import { useAccount, useReadContract, useReadContracts } from 'wagmi'
import { erc20Abi } from 'viem'
import type { Address } from 'viem'

interface TokenData {
  address: Address
  symbol: string
  name: string
  decimals: number
  logoURI?: string
}

interface TokenBalance extends TokenData {
  balance: bigint
  formattedBalance: string
  usdValue?: number
}

// Popular tokens on different chains
export const POPULAR_TOKENS: Record<number, TokenData[]> = {
  // Ethereum Mainnet
  1: [
    {
      address: '0xA0b86a33E6441c41b65CbA5aE0Be2b3E8A62c3D8' as Address,
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
      logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86a33E6441c41b65CbA5aE0Be2b3E8A62c3D8/logo.png'
    },
    {
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7' as Address,
      symbol: 'USDT',
      name: 'Tether USD',
      decimals: 6,
      logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png'
    },
    {
      address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984' as Address,
      symbol: 'UNI',
      name: 'Uniswap',
      decimals: 18,
      logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png'
    }
  ],
  // Polygon
  137: [
    {
      address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174' as Address,
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6
    },
    {
      address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F' as Address,
      symbol: 'USDT',
      name: 'Tether USD',
      decimals: 6
    }
  ]
}

export function useTokenBalance(tokenAddress: Address) {
  const { address: userAddress } = useAccount()
  
  const { data: balance } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: userAddress ? [userAddress] : undefined,
    query: {
      enabled: !!userAddress
    }
  })

  return balance || 0n
}

export function useTokenInfo(tokenAddress: Address) {
  const { data } = useReadContracts({
    contracts: [
      {
        address: tokenAddress,
        abi: erc20Abi,
        functionName: 'symbol'
      },
      {
        address: tokenAddress,
        abi: erc20Abi,
        functionName: 'name'
      },
      {
        address: tokenAddress,
        abi: erc20Abi,
        functionName: 'decimals'
      }
    ]
  })

  if (!data) return null

  return {
    symbol: data[0].result as string,
    name: data[1].result as string,
    decimals: data[2].result as number
  }
}

export function useMultiTokenBalances(chainId: number) {
  const { address: userAddress } = useAccount()
  const [balances, setBalances] = useState<TokenBalance[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const tokens = POPULAR_TOKENS[chainId] || []

  // Create contracts for all token balances
  const contracts = tokens.map(token => ({
    address: token.address,
    abi: erc20Abi,
    functionName: 'balanceOf' as const,
    args: userAddress ? [userAddress] : undefined
  }))

  const { data: balanceResults } = useReadContracts({
    contracts,
    query: {
      enabled: !!userAddress && tokens.length > 0
    }
  })

  useEffect(() => {
    if (!balanceResults || !tokens.length) return

    setIsLoading(true)
    
    const tokenBalances: TokenBalance[] = tokens.map((token, index) => {
      const balanceResult = balanceResults[index]
      const balance = balanceResult.status === 'success' ? balanceResult.result as bigint : 0n
      const formattedBalance = (Number(balance) / Math.pow(10, token.decimals)).toFixed(6)

      return {
        ...token,
        balance,
        formattedBalance
      }
    })

    setBalances(tokenBalances)
    setIsLoading(false)
  }, [balanceResults, tokens])

  return { balances, isLoading }
}

// Hook để lấy giá token từ CoinGecko
export function useTokenPrices(tokenSymbols: string[]) {
  const [prices, setPrices] = useState<Record<string, { usd: number }>>({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!tokenSymbols.length) return

    const fetchPrices = async () => {
      setIsLoading(true)
      try {
        // Map token symbols to CoinGecko IDs
        const symbolToId: Record<string, string> = {
          'eth': 'ethereum',
          'btc': 'bitcoin', 
          'usdc': 'usd-coin',
          'usdt': 'tether',
          'bnb': 'binancecoin',
          'matic': 'matic-network',
          'link': 'chainlink',
          'uni': 'uniswap',
          'dai': 'dai',
          'aave': 'aave'
        }
        
        const coinIds = tokenSymbols
          .map(symbol => symbolToId[symbol.toLowerCase()] || symbol.toLowerCase())
          .join(',')
          
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds}&vs_currencies=usd`
        )
        
        if (response.ok) {
          const data = await response.json()
          
          // Map back from coin IDs to symbols for easier access
          const pricesBySymbol: Record<string, { usd: number }> = {}
          tokenSymbols.forEach(symbol => {
            const coinId = symbolToId[symbol.toLowerCase()] || symbol.toLowerCase()
            if (data[coinId]?.usd) {
              pricesBySymbol[symbol.toLowerCase()] = { usd: data[coinId].usd }
            }
          })
          
          setPrices(pricesBySymbol)
        }
      } catch (error) {
        console.error('Failed to fetch token prices:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPrices()
  }, [tokenSymbols])

  return { prices, isLoading }
}
