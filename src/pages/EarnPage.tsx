import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useDeFiPositions, useYieldFarms, useLendingPositions } from '../hooks/useDeFi';
import { tokenService } from '../services/tokenService';
import './EarnPage.css';
import {
  TrendingUp,
  DollarSign,
  PieChart,
  Target,
  Coins,
  Zap,
  Shield,
  ChevronRight,
  Plus,
  ArrowUpRight,
  Clock,
  Users,
  Award,
  Activity,
  Wallet,
  BarChart3,
  RefreshCw,
  Brain,
  MessageSquare,
  Sparkles,
  Filter
} from 'lucide-react';

const EarnPage: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { positions, totalValue, totalEarned, isLoading: positionsLoading, protocols } = useDeFiPositions();
  const { farms, isLoading: farmsLoading, refreshFarms } = useYieldFarms();
  const { positions: lendingPos, totalSupplied, totalBorrowed, isLoading: lendingLoading } = useLendingPositions();
  
  const [activeTab, setActiveTab] = useState<'overview' | 'farms' | 'pools' | 'lending'>('overview');
  const [tokenIcons, setTokenIcons] = useState<Record<string, string>>({});
  const [intentInput, setIntentInput] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState<any[]>([]);
  const [isProcessingIntent, setIsProcessingIntent] = useState(false);
  const [showIntentResults, setShowIntentResults] = useState(false);

  // Intent templates for AI suggestions
  const intentTemplates = [
    {
      id: 'best-staking',
      intent: "Find the best staking opportunities with highest APY",
      category: 'staking',
      icon: <Shield className="w-4 h-4" />,
      description: "AI will find top staking tokens with best rewards"
    },
    {
      id: 'low-risk-earn',
      intent: "Show me low risk earning options under 5% APY",
      category: 'lending',
      icon: <Target className="w-4 h-4" />,
      description: "Conservative earning with minimal risk"
    },
    {
      id: 'high-yield-farm',
      intent: "Find highest yield farming pools above 20% APY",
      category: 'farming',
      icon: <TrendingUp className="w-4 h-4" />,
      description: "Aggressive farming strategies for maximum returns"
    },
    {
      id: 'stable-lending',
      intent: "I want to lend stablecoins for steady income",
      category: 'lending',
      icon: <Coins className="w-4 h-4" />,
      description: "Stable returns through lending USDC, USDT, DAI"
    },
    {
      id: 'diversified-portfolio',
      intent: "Create a diversified earning portfolio with $10,000",
      category: 'mixed',
      icon: <PieChart className="w-4 h-4" />,
      description: "AI-optimized portfolio across multiple strategies"
    }
  ];

  // Process user intent
  const processIntent = async (intent: string) => {
    setIsProcessingIntent(true);
    setShowIntentResults(false);

    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock AI suggestions based on intent
      const suggestions = generateAISuggestions(intent);
      setAiSuggestions(suggestions);
      setShowIntentResults(true);
    } catch (error) {
      console.error('Failed to process intent:', error);
    } finally {
      setIsProcessingIntent(false);
    }
  };

  // Generate AI suggestions based on intent
  const generateAISuggestions = (intent: string) => {
    const lowerIntent = intent.toLowerCase();

    if (lowerIntent.includes('best staking') || lowerIntent.includes('highest apy') || lowerIntent.includes('stake')) {
      return [
        {
          type: 'staking',
          token: 'ETH',
          protocol: 'Lido',
          apy: '4.2%',
          risk: 'Low',
          tvl: '$32.4B',
          reason: 'Most trusted liquid staking with highest TVL'
        },
        {
          type: 'staking',
          token: 'MATIC',
          protocol: 'Polygon Staking',
          apy: '6.8%',
          risk: 'Low',
          tvl: '$2.1B',
          reason: 'High APY with network security backing'
        },
        {
          type: 'staking',
          token: 'ATOM',
          protocol: 'Cosmos Hub',
          apy: '12.3%',
          risk: 'Medium',
          tvl: '$1.8B',
          reason: 'Attractive rewards for longer-term staking'
        }
      ];
    }

    if (lowerIntent.includes('low risk') || lowerIntent.includes('safe') || lowerIntent.includes('conservative')) {
      return [
        {
          type: 'lending',
          token: 'USDC',
          protocol: 'Aave',
          apy: '3.2%',
          risk: 'Very Low',
          tvl: '$12.8B',
          reason: 'Blue-chip lending protocol with insurance'
        },
        {
          type: 'lending',
          token: 'DAI',
          protocol: 'Compound',
          apy: '2.8%',
          risk: 'Very Low',
          tvl: '$8.4B',
          reason: 'Battle-tested protocol with stable returns'
        }
      ];
    }

    if (lowerIntent.includes('high yield') || lowerIntent.includes('farming') || lowerIntent.includes('20%')) {
      return [
        {
          type: 'farming',
          token: 'ETH/USDC',
          protocol: 'Uniswap V3',
          apy: '24.6%',
          risk: 'High',
          tvl: '$890M',
          reason: 'High volume pair with concentrated liquidity'
        },
        {
          type: 'farming',
          token: 'WBTC/ETH',
          protocol: 'SushiSwap',
          apy: '32.1%',
          risk: 'High',
          tvl: '$245M',
          reason: 'Premium rewards for major crypto pairs'
        }
      ];
    }

    // Default suggestions
    return [
      {
        type: 'mixed',
        token: 'Portfolio',
        protocol: 'AI Optimized',
        apy: '8.4%',
        risk: 'Medium',
        tvl: 'Diversified',
        reason: 'Balanced approach across multiple protocols'
      }
    ];
  };

  const earnStrategies = [
    {
      id: 'staking',
      title: 'Staking',
      description: 'Stake your tokens to earn rewards while helping secure the network',
      apy: '5-15%',
      risk: 'Low',
      icon: <Shield className="w-6 h-6" />,
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: 'yield-farming',
      title: 'Yield Farming',
      description: 'Provide liquidity to earn trading fees plus token rewards',
      apy: '10-50%',
      risk: 'Medium',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-blue-400 to-cyan-500'
    },
    {
      id: 'lending',
      title: 'Lending',
      description: 'Lend your assets to earn interest with flexible withdrawal',
      apy: '2-8%',
      risk: 'Low',
      icon: <Coins className="w-6 h-6" />,
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 'pools',
      title: 'Liquidity Pools',
      description: 'Earn fees by providing liquidity to trading pairs',
      apy: '8-25%',
      risk: 'Medium',
      icon: <Activity className="w-6 h-6" />,
      color: 'from-orange-400 to-red-500'
    }
  ];

  const topFarms = farms.slice(0, 3);
  const topProtocols = protocols.slice(0, 4);

  // Load token icons
  useEffect(() => {
    const loadTokenIcons = async () => {
      // Get all unique token symbols from farms and lending positions
      const tokenSymbols = new Set<string>();
      
      // Add tokens from farms
      farms.forEach(farm => {
        const tokens = farm.pair.split('/');
        tokens.forEach(token => tokenSymbols.add(token.trim()));
        farm.rewards.forEach(reward => tokenSymbols.add(reward));
      });
      
      // Add tokens from lending positions
      lendingPos.supplied.forEach(pos => tokenSymbols.add(pos.asset));
      lendingPos.borrowed.forEach(pos => tokenSymbols.add(pos.asset));
      
      // Common tokens
      ['ETH', 'BTC', 'USDC', 'USDT', 'DAI', 'UNI', 'AAVE', 'COMP'].forEach(token => 
        tokenSymbols.add(token)
      );
      
      const iconPromises = Array.from(tokenSymbols).map(async (symbol) => {
        try {
          const iconUrl = await tokenService.getTokenIcon(symbol);
          return { symbol, iconUrl };
        } catch (error) {
          return { symbol, iconUrl: null };
        }
      });

      const results = await Promise.allSettled(iconPromises);
      const newIcons: Record<string, string> = {};
      
      results.forEach((result) => {
        if (result.status === 'fulfilled' && result.value.iconUrl) {
          newIcons[result.value.symbol] = result.value.iconUrl;
        }
      });

      setTokenIcons(newIcons);
    };

    if (farms.length > 0 || lendingPos.supplied.length > 0) {
      loadTokenIcons();
    }
  }, [farms, lendingPos]);

  const getTokenIcon = (symbol: string) => {
    return tokenIcons[symbol];
  };

  return (
    <div className="earn-page">
      {/* Background */}
      <div className="page-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <div className="container">
        {/* Header */}
        <div className="page-header">
          <div className="header-content">
            <h1>
              <Zap className="header-icon" />
              Earn
            </h1>
            <p>Maximize your crypto earnings with DeFi strategies</p>
          </div>
          
          {isConnected && (
            <div className="header-stats">
              <div className="stat-card">
                <div className="stat-value">${totalValue.toLocaleString()}</div>
                <div className="stat-label">Total Value</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">${totalEarned.toFixed(2)}</div>
                <div className="stat-label">Total Earned</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{positions.length}</div>
                <div className="stat-label">Active Positions</div>
              </div>
            </div>
          )}
        </div>

        {!isConnected ? (
          <div className="connect-prompt">
            <div className="connect-card">
              <Wallet className="connect-icon" />
              <h3>Connect Your Wallet</h3>
              <p>Connect your wallet to start earning with DeFi strategies</p>
              <button className="connect-btn">
                Connect Wallet
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* AI Intent Assistant */}
            <div className="intent-assistant-section">
              <div className="section-header">
                <div className="header-with-icon">
                  <Brain className="w-6 h-6 text-purple-500" />
                  <h2>AI Earning Assistant</h2>
                </div>
                <p>Tell us what you want to earn and our AI will find the best opportunities</p>
              </div>

              <div className="intent-input-container">
                <div className="intent-input-wrapper">
                  <MessageSquare className="intent-input-icon" />
                  <input
                    type="text"
                    value={intentInput}
                    onChange={(e) => setIntentInput(e.target.value)}
                    placeholder="e.g., I want to find the best staking token with high APY..."
                    className="intent-input"
                    onKeyPress={(e) => e.key === 'Enter' && intentInput.trim() && processIntent(intentInput)}
                  />
                  <button
                    className="intent-submit-btn"
                    onClick={() => processIntent(intentInput)}
                    disabled={!intentInput.trim() || isProcessingIntent}
                  >
                    {isProcessingIntent ? (
                      <div className="spinner"></div>
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Intent Templates */}
              <div className="intent-templates">
                <h4>Quick Intents</h4>
                <div className="templates-grid">
                  {intentTemplates.map((template) => (
                    <button
                      key={template.id}
                      className="template-card"
                      onClick={() => {
                        setIntentInput(template.intent);
                        processIntent(template.intent);
                      }}
                    >
                      <div className="template-icon">
                        {template.icon}
                      </div>
                      <div className="template-content">
                        <div className="template-title">{template.intent}</div>
                        <div className="template-description">{template.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Suggestions Results */}
              {showIntentResults && aiSuggestions.length > 0 && (
                <div className="ai-results-section">
                  <div className="results-header">
                    <div className="header-with-icon">
                      <Sparkles className="w-5 h-5 text-yellow-500" />
                      <h3>AI Recommendations</h3>
                    </div>
                    <span className="results-count">{aiSuggestions.length} opportunities found</span>
                  </div>

                  <div className="ai-suggestions-grid">
                    {aiSuggestions.map((suggestion, index) => (
                      <div key={index} className="ai-suggestion-card">
                        <div className="suggestion-header">
                          <div className="suggestion-token">
                            <div className="token-icon">
                              {getTokenIcon(suggestion.token) ? (
                                <img
                                  src={getTokenIcon(suggestion.token)}
                                  alt={suggestion.token}
                                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                                />
                              ) : (
                                suggestion.token.charAt(0)
                              )}
                            </div>
                            <div>
                              <div className="token-name">{suggestion.token}</div>
                              <div className="protocol-name">{suggestion.protocol}</div>
                            </div>
                          </div>
                          <div className="suggestion-apy">{suggestion.apy} APY</div>
                        </div>

                        <div className="suggestion-metrics">
                          <div className="metric">
                            <span className="metric-label">Risk Level</span>
                            <span className={`risk-badge risk-${suggestion.risk.toLowerCase().replace(' ', '-')}`}>
                              {suggestion.risk}
                            </span>
                          </div>
                          <div className="metric">
                            <span className="metric-label">TVL</span>
                            <span className="metric-value">{suggestion.tvl}</span>
                          </div>
                        </div>

                        <div className="suggestion-reason">
                          <Target className="w-4 h-4 text-blue-500" />
                          <span>{suggestion.reason}</span>
                        </div>

                        <div className="suggestion-actions">
                          <button className="action-btn secondary">Learn More</button>
                          <button className="action-btn primary">Start Earning</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Earning Strategies */}
            <div className="strategies-section">
              <div className="section-header">
                <h2>Earning Strategies</h2>
                <p>Choose the best strategy for your risk tolerance and goals</p>
              </div>
              
              <div className="strategies-grid">
                {earnStrategies.map((strategy) => (
                  <div key={strategy.id} className="strategy-card">
                    <div className={`strategy-icon bg-gradient-to-r ${strategy.color}`}>
                      {strategy.icon}
                    </div>
                    <div className="strategy-content">
                      <h3>{strategy.title}</h3>
                      <p>{strategy.description}</p>
                      <div className="strategy-metrics">
                        <div className="metric">
                          <span className="metric-label">APY</span>
                          <span className="metric-value">{strategy.apy}</span>
                        </div>
                        <div className="metric">
                          <span className="metric-label">Risk</span>
                          <span className={`risk-badge risk-${strategy.risk.toLowerCase()}`}>
                            {strategy.risk}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="strategy-btn">
                      Start Earning
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="tabs-nav">
              {[
                { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
                { id: 'farms', label: 'Yield Farms', icon: <TrendingUp className="w-4 h-4" /> },
                { id: 'pools', label: 'Liquidity Pools', icon: <Activity className="w-4 h-4" /> },
                { id: 'lending', label: 'Lending', icon: <Coins className="w-4 h-4" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id as any)}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              {activeTab === 'overview' && (
                <div className="overview-tab">
                  {/* My Positions */}
                  <div className="positions-section">
                    <div className="section-header">
                      <h3>My Positions</h3>
                      <button className="refresh-btn" onClick={() => window.location.reload()}>
                        <RefreshCw className="w-4 h-4" />
                        Refresh
                      </button>
                    </div>
                    
                    {positionsLoading ? (
                      <div className="loading-grid">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="position-card loading"></div>
                        ))}
                      </div>
                    ) : positions.length > 0 ? (
                      <div className="positions-grid">
                        {positions.map((position, index) => (
                          <div key={index} className="position-card">
                            <div className="position-header">
                              <div className="protocol-info">
                                <div className="protocol-icon">
                                  {getTokenIcon(position.protocol.split(' ')[0]) ? (
                                    <img 
                                      src={getTokenIcon(position.protocol.split(' ')[0])} 
                                      alt={position.protocol}
                                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }}
                                      onError={(e) => {
                                        const target = e.currentTarget as HTMLImageElement;
                                        target.style.display = 'none';
                                        const fallback = target.nextElementSibling as HTMLDivElement | null;
                                        if (fallback) (fallback as any).style.display = 'flex';
                                      }}
                                    />
                                  ) : null}
                                  <div 
                                    className="protocol-icon-fallback"
                                    style={{ 
                                      display: getTokenIcon(position.protocol.split(' ')[0]) ? 'none' : 'flex'
                                    }}
                                  >
                                    {position.protocol.charAt(0)}
                                  </div>
                                </div>
                                <div>
                                  <div className="protocol-name">{position.protocol}</div>
                                  <div className="protocol-category">{position.category}</div>
                                </div>
                              </div>
                              <div className="apy-badge">{position.apy} APY</div>
                            </div>
                            <div className="position-metrics">
                              <div className="metric">
                                <span className="metric-label">Amount</span>
                                <span className="metric-value">{position.amount}</span>
                              </div>
                              <div className="metric">
                                <span className="metric-label">Value</span>
                                <span className="metric-value">${position.value.toLocaleString()}</span>
                              </div>
                              <div className="metric">
                                <span className="metric-label">Earned</span>
                                <span className="metric-value earned">${position.earned.toFixed(2)}</span>
                              </div>
                            </div>
                            <div className="position-actions">
                              <button className="action-btn secondary">Manage</button>
                              <button className="action-btn primary">Claim</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="empty-state">
                        <Target className="empty-icon" />
                        <h4>No Active Positions</h4>
                        <p>Start earning by choosing a strategy above</p>
                      </div>
                    )}
                  </div>

                  {/* Top Protocols */}
                  <div className="protocols-section">
                    <div className="section-header">
                      <h3>Top Protocols</h3>
                      <a href="#" className="view-all-link">
                        View All <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                    
                    <div className="protocols-grid">
                      {topProtocols.map((protocol) => (
                        <div key={protocol.id} className="protocol-card">
                          <div className="protocol-header">
                            <div className="protocol-icon">
                              {getTokenIcon(protocol.name.split(' ')[0]) ? (
                                <img 
                                  src={getTokenIcon(protocol.name.split(' ')[0])} 
                                  alt={protocol.name}
                                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }}
                                  onError={(e) => {
                                    const target = e.currentTarget as HTMLImageElement;
                                    target.style.display = 'none';
                                    const fallback = target.nextElementSibling as HTMLDivElement | null;
                                    if (fallback) (fallback as any).style.display = 'flex';
                                  }}
                                />
                              ) : null}
                              <div 
                                className="protocol-icon-fallback"
                                style={{ 
                                  display: getTokenIcon(protocol.name.split(' ')[0]) ? 'none' : 'flex'
                                }}
                              >
                                {protocol.icon}
                              </div>
                            </div>
                            <div>
                              <div className="protocol-name">{protocol.name}</div>
                              <div className="protocol-category">{protocol.category}</div>
                            </div>
                          </div>
                          <div className="protocol-stats">
                            <div className="stat">
                              <span className="stat-label">TVL</span>
                              <span className="stat-value">{protocol.tvl}</span>
                            </div>
                            <div className="stat">
                              <span className="stat-label">APY</span>
                              <span className="stat-value">{protocol.apy}</span>
                            </div>
                          </div>
                          <button className="protocol-btn">
                            Start Earning
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'farms' && (
                <div className="farms-tab">
                  <div className="section-header">
                    <h3>Yield Farms</h3>
                    <p>Earn rewards by providing liquidity to farming pools</p>
                  </div>
                  
                  {farmsLoading ? (
                    <div className="loading-grid">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="farm-card loading"></div>
                      ))}
                    </div>
                  ) : (
                    <div className="farms-grid">
                      {farms.map((farm) => (
                        <div key={farm.id} className="farm-card">
                          <div className="farm-header">
                            <div className="farm-pair">
                              <div className="pair-icons">
                                <div className="token-icon">
                                  {getTokenIcon(farm.pair.split('/')[0]) ? (
                                    <img 
                                      src={getTokenIcon(farm.pair.split('/')[0])} 
                                      alt={farm.pair.split('/')[0]}
                                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                  ) : (
                                    farm.pair.split('/')[0].charAt(0)
                                  )}
                                </div>
                                <div className="token-icon">
                                  {getTokenIcon(farm.pair.split('/')[1]) ? (
                                    <img 
                                      src={getTokenIcon(farm.pair.split('/')[1])} 
                                      alt={farm.pair.split('/')[1]}
                                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                  ) : (
                                    farm.pair.split('/')[1].charAt(0)
                                  )}
                                </div>
                              </div>
                              <div>
                                <div className="pair-name">{farm.pair}</div>
                                <div className="farm-protocol">{farm.protocol}</div>
                              </div>
                            </div>
                            <div className="apy-badge large">{farm.apy}% APY</div>
                          </div>
                          
                          <div className="farm-stats">
                            <div className="stat">
                              <span className="stat-label">TVL</span>
                              <span className="stat-value">{farm.tvl}</span>
                            </div>
                            <div className="stat">
                              <span className="stat-label">Rewards</span>
                              <div className="rewards-list">
                                {farm.rewards.map((reward, i) => (
                                  <span key={i} className="reward-token">{reward}</span>
                                ))}
                              </div>
                            </div>
                            {farm.userStaked > 0 && (
                              <div className="stat">
                                <span className="stat-label">Your Stake</span>
                                <span className="stat-value">${farm.userStaked.toLocaleString()}</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="farm-actions">
                            <button className="action-btn secondary">Details</button>
                            <button className="action-btn primary">
                              {farm.userStaked > 0 ? 'Manage' : 'Stake'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'pools' && (
                <div className="pools-tab">
                  <div className="section-header">
                    <h3>Liquidity Pools</h3>
                    <p>Earn trading fees by providing liquidity</p>
                  </div>
                  
                  <div className="coming-soon">
                    <Activity className="coming-soon-icon" />
                    <h4>Liquidity Pools Coming Soon</h4>
                    <p>We're working on bringing you the best liquidity pool opportunities</p>
                  </div>
                </div>
              )}

              {activeTab === 'lending' && (
                <div className="lending-tab">
                  <div className="section-header">
                    <h3>Lending & Borrowing</h3>
                    <p>Earn interest on your assets or borrow against collateral</p>
                  </div>
                  
                  {lendingLoading ? (
                    <div className="loading-state">Loading lending positions...</div>
                  ) : (
                    <div className="lending-overview">
                      <div className="lending-stats">
                        <div className="lending-stat-card">
                          <div className="stat-header">
                            <h4>Supplied</h4>
                            <TrendingUp className="stat-icon supplied" />
                          </div>
                          <div className="stat-value">${totalSupplied.toFixed(2)}</div>
                        </div>
                        <div className="lending-stat-card">
                          <div className="stat-header">
                            <h4>Borrowed</h4>
                            <TrendingUp className="stat-icon borrowed" />
                          </div>
                          <div className="stat-value">${totalBorrowed.toFixed(2)}</div>
                        </div>
                      </div>
                      
                      {lendingPos.supplied.length > 0 && (
                        <div className="lending-positions">
                          <h4>Supplied Assets</h4>
                          <div className="positions-list">
                            {lendingPos.supplied.map((pos, index) => (
                              <div key={index} className="lending-position">
                                <div className="position-asset">
                                  <div className="asset-icon">
                                    {getTokenIcon(pos.asset) ? (
                                      <img 
                                        src={getTokenIcon(pos.asset)} 
                                        alt={pos.asset}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                                        onError={(e) => {
                                          const target = e.currentTarget as HTMLImageElement;
                                          target.style.display = 'none';
                                          const fallback = target.nextElementSibling as HTMLDivElement | null;
                                          if (fallback) (fallback as any).style.display = 'flex';
                                        }}
                                      />
                                    ) : null}
                                    <div 
                                      className="asset-icon-fallback"
                                      style={{ 
                                        display: getTokenIcon(pos.asset) ? 'none' : 'flex'
                                      }}
                                    >
                                      {pos.asset.charAt(0)}
                                    </div>
                                  </div>
                                  <div>
                                    <div className="asset-name">{pos.asset}</div>
                                    <div className="asset-amount">{pos.amount}</div>
                                  </div>
                                </div>
                                <div className="position-apy">{pos.apy} APY</div>
                                <div className="position-earned">${pos.earned}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>

    </div>
  );
};

export default EarnPage;