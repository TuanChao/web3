import { useState, useEffect } from 'react'
import { useAccount, useBalance } from 'wagmi'
import { formatUnits } from 'viem'

interface TokenPrice {
  usd: number
}

export function useTokenPrice(tokenSymbol: string) {
  const [price, setPrice] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!tokenSymbol) return

    const fetchPrice = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${tokenSymbol.toLowerCase()}&vs_currencies=usd`
        )
        
        if (!response.ok) {
          throw new Error('Failed to fetch price')
        }
        
        const data = await response.json()
        const tokenPrice: TokenPrice = data[tokenSymbol.toLowerCase()]
        
        if (tokenPrice) {
          setPrice(tokenPrice.usd)
        } else {
          setError('Price not found')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPrice()
  }, [tokenSymbol])

  return { price, isLoading, error }
}

export function useWalletBalance() {
  const { address } = useAccount()
  const { data: balance, isLoading, error } = useBalance({
    address,
  })

  const formattedBalance = balance ? 
    parseFloat(formatUnits(balance.value, balance.decimals)) : 0

  return {
    balance: formattedBalance,
    symbol: balance?.symbol,
    isLoading,
    error,
    rawBalance: balance
  }
}
