import { useState, useEffect } from 'react'
import { useAccount, useBalance } from 'wagmi'

// DeFi protocols mock data
export const DEFI_PROTOCOLS = [
  {
    id: 'uniswap-v3',
    name: 'Uniswap V3',
    category: 'DEX',
    tvl: '$4.2B',
    apy: '12.5%',
    userLiquidity: 0,
    icon: '🦄'
  },
  {
    id: 'aave',
    name: 'Aave',
    category: 'Lending',
    tvl: '$8.1B',
    apy: '3.2%',
    userSupplied: 0,
    userBorrowed: 0,
    icon: '👻'
  },
  {
    id: 'compound',
    name: 'Compound',
    category: 'Lending',
    tvl: '$2.8B',
    apy: '2.8%',
    userSupplied: 0,
    userBorrowed: 0,
    icon: '🏛️'
  },
  {
    id: 'yearn',
    name: 'Yearn Finance',
    category: 'Yield Farming',
    tvl: '$1.2B',
    apy: '8.7%',
    userDeposits: 0,
    icon: '🔵'
  },
  {
    id: 'curve',
    name: 'Curve Finance',
    category: 'Stablecoins',
    tvl: '$3.9B',
    apy: '5.1%',
    userLiquidity: 0,
    icon: '🌊'
  }
]

export interface DeFiPosition {
  protocol: string
  category: string
  amount: string
  value: number
  apy: string
  earned: number
}

export interface YieldFarm {
  id: string
  pair: string
  protocol: string
  apy: number
  tvl: string
  userStaked: number
  rewards: string[]
}

export interface LendingPosition {
  asset: string
  amount: string
  apy: string
  earned?: string
  owed?: string
}

// Hook to get user's DeFi positions
export function useDeFiPositions() {
  const { address, isConnected } = useAccount()
  const [positions, setPositions] = useState<DeFiPosition[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!isConnected || !address) {
      setPositions([])
      return
    }

    setIsLoading(true)
    
    // Mock DeFi positions - in real app, fetch from DeFi protocols
    const mockPositions: DeFiPosition[] = [
      {
        protocol: 'Uniswap V3',
        category: 'DEX',
        amount: '1.5 ETH',
        value: 3750,
        apy: '12.5%',
        earned: 45.6
      },
      {
        protocol: 'Aave',
        category: 'Lending',
        amount: '2500 USDC',
        value: 2500,
        apy: '3.2%',
        earned: 8.9
      },
      {
        protocol: 'Yearn Finance',
        category: 'Yield Farming',
        amount: '0.8 ETH',
        value: 2000,
        apy: '8.7%',
        earned: 23.1
      }
    ]

    // Simulate API call
    setTimeout(() => {
      setPositions(mockPositions)
      setIsLoading(false)
    }, 1500)

  }, [address, isConnected])

  const totalValue = positions.reduce((sum, pos) => sum + pos.value, 0)
  const totalEarned = positions.reduce((sum, pos) => sum + pos.earned, 0)

  return {
    positions,
    totalValue,
    totalEarned,
    isLoading,
    protocols: DEFI_PROTOCOLS
  }
}

// Hook to get yield farming opportunities
export function useYieldFarms() {
  const [farms, setFarms] = useState<YieldFarm[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchYieldFarms = async () => {
    setIsLoading(true)
    
    // Mock yield farming opportunities
    const mockFarms = [
      {
        id: 'eth-usdc-uni',
        pair: 'ETH/USDC',
        protocol: 'Uniswap V3',
        apy: 15.2,
        tvl: '$45M',
        userStaked: 0,
        rewards: ['UNI']
      },
      {
        id: 'btc-eth-curve',
        pair: 'BTC/ETH',
        protocol: 'Curve',
        apy: 8.9,
        tvl: '$23M',
        userStaked: 0,
        rewards: ['CRV', 'CVX']
      },
      {
        id: 'dai-usdc-aave',
        pair: 'DAI/USDC',
        protocol: 'Aave',
        apy: 4.5,
        tvl: '$156M',
        userStaked: 0,
        rewards: ['AAVE']
      }
    ]

    setTimeout(() => {
      setFarms(mockFarms)
      setIsLoading(false)
    }, 1000)
  }

  useEffect(() => {
    fetchYieldFarms()
  }, [])

  return {
    farms,
    isLoading,
    refreshFarms: fetchYieldFarms
  }
}

// Hook to track lending positions
export function useLendingPositions() {
  const { address, isConnected } = useAccount()
  const [positions, setPositions] = useState<{
    supplied: LendingPosition[]
    borrowed: LendingPosition[]
  }>({
    supplied: [],
    borrowed: []
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!isConnected || !address) {
      setPositions({ supplied: [], borrowed: [] })
      return
    }

    setIsLoading(true)

    const mockLendingData = {
      supplied: [
        {
          asset: 'USDC',
          amount: '5000',
          apy: '3.2%',
          earned: '15.6'
        },
        {
          asset: 'ETH',
          amount: '1.2',
          apy: '2.8%',
          earned: '8.9'
        }
      ],
      borrowed: [
        {
          asset: 'DAI',
          amount: '2000',
          apy: '4.1%',
          owed: '12.3'
        }
      ]
    }

    setTimeout(() => {
      setPositions(mockLendingData)
      setIsLoading(false)
    }, 1200)

  }, [address, isConnected])

  const totalSupplied = positions.supplied.reduce((sum, pos) => 
    sum + parseFloat(pos.earned || '0'), 0)
  const totalBorrowed = positions.borrowed.reduce((sum, pos) => 
    sum + parseFloat(pos.owed || '0'), 0)

  return {
    positions,
    totalSupplied,
    totalBorrowed,
    isLoading
  }
}

// Hook for portfolio analytics
export function usePortfolioAnalytics() {
  const { address, isConnected } = useAccount()
  const { data: ethBalance } = useBalance({ address })

  const [analytics, setAnalytics] = useState({
    totalValue: 0,
    change24h: 0,
    change7d: 0,
    allocation: {},
    riskScore: 0
  })

  useEffect(() => {
    if (!isConnected || !address) return

    // Mock analytics calculation
    const mockAnalytics = {
      totalValue: 12500,
      change24h: 2.4,
      change7d: -1.8,
      allocation: {
        'DeFi': 35,
        'Tokens': 45,
        'NFTs': 10,
        'Cash': 10
      },
      riskScore: 6.5
    }

    setAnalytics(mockAnalytics)
  }, [address, isConnected, ethBalance])

  return analytics
}
