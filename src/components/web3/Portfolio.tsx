import { useAccount, useChainId } from 'wagmi'
import { useMultiTokenBalances, useTokenPrices } from '../../hooks/useTokens'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card'
import { 
  Wallet, 
  TrendingUp, 
  DollarSign, 
  Brain,
  Network,
  Target,
  ArrowRight,
  Zap,
  Shield
} from 'lucide-react'
import './Web3.css'
import { useState } from 'react'

export function Portfolio() {
  const { isConnected } = useAccount()
  const [showIntentSuggestions, setShowIntentSuggestions] = useState(false)

  // Mock multi-chain portfolio data
  const mockPortfolio = {
    totalValue: 12847.32,
    chains: [
      {
        name: 'Ethereum',
        icon: <Network size={16} />,
        value: 8542.18,
        tokens: [
          { symbol: 'ETH', balance: '2.45', value: 6125.00, change: '+5.2%' },
          { symbol: 'USDC', balance: '1500.50', value: 1500.50, change: '+0.1%' },
          { symbol: 'UNI', balance: '125.30', value: 916.68, change: '-2.4%' }
        ]
      },
      {
        name: 'Polygon',
        icon: <Network size={16} />,
        value: 2845.67,
        tokens: [
          { symbol: 'MATIC', balance: '3420.15', value: 2146.89, change: '+8.7%' },
          { symbol: 'USDC', balance: '698.78', value: 698.78, change: '+0.1%' }
        ]
      },
      {
        name: 'Arbitrum',
        icon: <Network size={16} />,
        value: 1459.47,
        tokens: [
          { symbol: 'ARB', balance: '1250.80', value: 1098.22, change: '+12.3%' },
          { symbol: 'ETH', balance: '0.145', value: 361.25, change: '+5.2%' }
        ]
      }
    ]
  }

  const intentSuggestions = [
    {
      type: 'rebalance',
      title: 'Portfolio Rebalancing Needed',
      description: 'Your ETH exposure is 52%. Consider diversifying to stablecoins.',
      action: 'Rebalance to 40% ETH, 30% Stablecoins, 30% Alts',
      priority: 'high',
      icon: <Target size={16} />,
      savings: '$127 in gas optimization'
    },
    {
      type: 'yield',
      title: 'Yield Opportunity Detected',
      description: 'Your USDC on Ethereum is earning 0%. Better rates available.',
      action: 'Move 1000 USDC to Polygon for 8.5% APY',
      priority: 'medium',
      icon: <TrendingUp size={16} />,
      savings: '$85 monthly earnings'
    },
    {
      type: 'bridge',
      title: 'Cross-Chain Optimization',
      description: 'High gas costs detected. Bridge funds to Layer 2.',
      action: 'Bridge 50% assets to Arbitrum for lower fees',
      priority: 'medium',
      icon: <Network size={16} />,
      savings: '$45 in transaction fees'
    },
    {
      type: 'security',
      title: 'Security Check',
      description: 'Some tokens need approval refresh for optimal security.',
      action: 'Update token approvals on 3 contracts',
      priority: 'low',
      icon: <Shield size={16} />,
      savings: 'Enhanced security'
    }
  ]

  // Use mock data for demo (in real app, would use actual balances)
  const displayData = isConnected ? mockPortfolio : null

  return (
    <div className="intent-portfolio-container">
      {/* Portfolio Overview */}
      <Card className="portfolio-main-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              Multi-Chain Portfolio
            </div>
            <div className="flex items-center gap-2">
              <button 
                className="intent-suggestions-toggle"
                onClick={() => setShowIntentSuggestions(!showIntentSuggestions)}
              >
                <Brain size={16} />
                AI Insights
              </button>
              {displayData && (
                <div className="flex items-center gap-1 text-sm">
                  <DollarSign className="w-4 h-4" />
                  <span className="portfolio-total-value">
                    ${displayData.totalValue.toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!isConnected ? (
            <div className="portfolio-empty">
              <Wallet size={48} className="portfolio-empty-icon" />
              <h3>Connect Your Wallet</h3>
              <p>View your cross-chain portfolio and get AI-powered insights</p>
            </div>
          ) : (
            <div className="multi-chain-portfolio">
              {displayData?.chains.map((chain, index) => (
                <div key={index} className="chain-portfolio-section">
                  <div className="chain-header">
                    <div className="chain-info">
                      {chain.icon}
                      <span className="chain-name">{chain.name}</span>
                    </div>
                    <div className="chain-value">
                      ${chain.value.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="chain-tokens">
                    {chain.tokens.map((token, tokenIndex) => (
                      <div key={tokenIndex} className="chain-token-item">
                        <div className="token-info">
                          <span className="token-symbol">{token.symbol}</span>
                          <span className="token-balance">{token.balance}</span>
                        </div>
                        <div className="token-values">
                          <span className="token-value">${token.value.toLocaleString()}</span>
                          <span className={`token-change ${token.change.startsWith('+') ? 'positive' : 'negative'}`}>
                            {token.change}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Intent Suggestions */}
      {showIntentSuggestions && isConnected && (
        <Card className="intent-suggestions-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-500" />
              AI-Powered Intent Suggestions
            </CardTitle>
            <p className="text-sm text-gray-400">
              Based on your portfolio analysis, here are personalized recommendations
            </p>
          </CardHeader>
          <CardContent>
            <div className="intent-suggestions-grid">
              {intentSuggestions.map((suggestion, index) => (
                <div key={index} className={`intent-suggestion-card ${suggestion.priority}`}>
                  <div className="suggestion-header">
                    <div className="suggestion-icon-title">
                      <div className="suggestion-icon">
                        {suggestion.icon}
                      </div>
                      <div className="suggestion-title-section">
                        <h4>{suggestion.title}</h4>
                        <span className={`priority-badge ${suggestion.priority}`}>
                          {suggestion.priority.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="suggestion-content">
                    <p className="suggestion-description">{suggestion.description}</p>
                    <div className="suggestion-action">
                      <Zap size={14} />
                      <span>{suggestion.action}</span>
                    </div>
                    <div className="suggestion-savings">
                      <TrendingUp size={14} />
                      <span>{suggestion.savings}</span>
                    </div>
                  </div>
                  
                  <button className="suggestion-execute-btn">
                    Execute Intent
                    <ArrowRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
