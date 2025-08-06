import { API_ENDPOINTS } from '../config/constants'

export interface TokenData {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  total_volume: number
}

export class CoinGeckoService {
  private baseUrl = API_ENDPOINTS.COINGECKO

  async getTokenPrice(tokenId: string): Promise<number | null> {
    try {
      const response = await fetch(
        `${this.baseUrl}/simple/price?ids=${tokenId}&vs_currencies=usd`
      )
      
      if (!response.ok) {
        throw new Error('Failed to fetch token price')
      }
      
      const data = await response.json()
      return data[tokenId]?.usd || null
    } catch (error) {
      console.error('Error fetching token price:', error)
      return null
    }
  }

  async getTokenData(tokenIds: string[]): Promise<TokenData[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/coins/markets?vs_currency=usd&ids=${tokenIds.join(',')}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      )
      
      if (!response.ok) {
        throw new Error('Failed to fetch token data')
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error fetching token data:', error)
      return []
    }
  }

  async getTrendingTokens(): Promise<TokenData[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`
      )
      
      if (!response.ok) {
        throw new Error('Failed to fetch trending tokens')
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error fetching trending tokens:', error)
      return []
    }
  }
}

export const coinGeckoService = new CoinGeckoService()
