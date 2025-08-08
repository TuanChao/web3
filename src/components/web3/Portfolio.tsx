import { useAccount, useChainId } from 'wagmi'
import { useMultiTokenBalances, useTokenPrices } from '../../hooks/useTokens'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card'
import { formatCurrency } from '../../utils'
import { Wallet, TrendingUp, DollarSign } from 'lucide-react'
import './Web3.css'

export function Portfolio() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const { balances, isLoading } = useMultiTokenBalances(chainId)
  
  // Get prices for tokens we have
  const tokenSymbols = balances.map(token => token.symbol.toLowerCase())
  const { prices } = useTokenPrices(tokenSymbols)

  if (!isConnected || !address) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Portfolio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="portfolio-empty">
            <p>Connect your wallet to view your portfolio</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Portfolio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="portfolio-loading">
            <div className="loading-spinner"></div>
            <p>Loading portfolio...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Calculate total portfolio value
  const totalValue = balances.reduce((total, token) => {
    const price = prices[token.symbol.toLowerCase()]?.usd || 0
    const value = parseFloat(token.formattedBalance) * price
    return total + value
  }, 0)

  // Filter out zero balances for cleaner display
  const nonZeroBalances = balances.filter(token => parseFloat(token.formattedBalance) > 0.000001)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Portfolio
          </div>
          <div className="flex items-center gap-1 text-sm">
            <DollarSign className="w-4 h-4" />
            <span className="portfolio-total-value">
              {formatCurrency(totalValue)}
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {nonZeroBalances.length === 0 ? (
          <div className="portfolio-empty">
            <p>No tokens found in this wallet</p>
          </div>
        ) : (
          <div className="portfolio-tokens">
            {nonZeroBalances.map((token, index) => {
              const price = prices[token.symbol.toLowerCase()]?.usd || 0
              const usdValue = parseFloat(token.formattedBalance) * price

              return (
                <div key={`${token.address}-${index}`} className="portfolio-token-item">
                  <div className="portfolio-token-info">
                    <div className="portfolio-token-header">
                      {token.logoURI && (
                        <img 
                          src={token.logoURI} 
                          alt={token.symbol}
                          className="portfolio-token-logo"
                          onError={(e) => {
                            const img = e.target as HTMLImageElement
                            img.style.display = 'none'
                          }}
                        />
                      )}
                      <div className="portfolio-token-details">
                        <span className="portfolio-token-symbol">{token.symbol}</span>
                        <span className="portfolio-token-name">{token.name}</span>
                      </div>
                    </div>
                    <div className="portfolio-token-values">
                      <div className="portfolio-token-balance">
                        {token.formattedBalance} {token.symbol}
                      </div>
                      {price > 0 && (
                        <div className="portfolio-token-usd">
                          {formatCurrency(usdValue)}
                        </div>
                      )}
                    </div>
                  </div>
                  {price > 0 && (
                    <div className="portfolio-token-price">
                      <TrendingUp className="w-3 h-3" />
                      <span>{formatCurrency(price)}</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
        
        <div className="portfolio-footer">
          <div className="portfolio-stats">
            <div className="portfolio-stat">
              <span className="portfolio-stat-label">Total Tokens</span>
              <span className="portfolio-stat-value">{nonZeroBalances.length}</span>
            </div>
            <div className="portfolio-stat">
              <span className="portfolio-stat-label">Network</span>
              <span className="portfolio-stat-value">
                {chainId === 1 ? 'Ethereum' : 
                 chainId === 137 ? 'Polygon' : 
                 chainId === 42161 ? 'Arbitrum' : 
                 chainId === 10 ? 'Optimism' : 
                 chainId === 8453 ? 'Base' : `Chain ${chainId}`}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
