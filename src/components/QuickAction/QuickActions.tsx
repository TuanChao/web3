import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { WalletInfo, ChainSwitcher } from '../web3';
import { 
  ArrowRightLeft, 
  Wallet, 
  Globe, 
  Coins,
  TrendingUp,
  Users,
  Activity,
  Zap,
  Shield,
  BarChart3,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Clock,
  DollarSign
} from 'lucide-react';
import './QuickActions.css';

export default function QuickActions() {
  const [stats] = useState({
    tvl: 1250000000,
    volume24h: 450000000,
    activeUsers: 15000,
    apy: 12.5
  });

  const actions = [
    {
      id: 'swap',
      title: 'Token Swap',
      icon: ArrowRightLeft,
      gradient: 'gradient-blue-purple',
      description: 'Exchange tokens instantly with the best rates across multiple DEXs',
      link: '/swap',
      btnText: 'Start Trading',
      stats: { 
        label: 'Volume 24h', 
        value: `$${(stats.volume24h / 1000000).toFixed(1)}M`,
        icon: TrendingUp
      },
      particles: true,
      features: ['Best rates', '0.1% fee', 'MEV protected']
    },
    {
      id: 'wallet',
      title: 'Wallet Manager',
      icon: Wallet,
      gradient: 'gradient-green-teal',
      description: 'Manage your crypto portfolio with advanced analytics',
      component: <WalletInfo />,
      stats: { 
        label: 'Active Users', 
        value: stats.activeUsers.toLocaleString(),
        icon: Users
      },
      features: ['Multi-wallet', 'Portfolio tracking', 'Gas optimization']
    },
    
    {
      id: 'stake',
      title: 'Staking Pools',
      icon: Coins,
      gradient: 'gradient-purple-pink',
      description: 'Earn passive income by staking your tokens',
      link: '/stake',
      btnText: 'Explore Pools',
      stats: { 
        label: 'APY', 
        value: `${stats.apy.toFixed(1)}%`,
        icon: BarChart3
      },
      isNew: true,
      features: ['Auto-compound', 'No lockup', 'Daily rewards']
    },
    {
      id: 'dashboard',
      title: 'Web3 Dashboard',
      icon: BarChart3,
      gradient: 'gradient-orange-red',
      description: 'View your portfolio and transaction history in one place',
      link: '/dashboard',
      btnText: 'Open Dashboard',
      stats: { 
        label: 'Features', 
        value: '5+',
        icon: Activity
      },
      features: ['Portfolio tracking', 'Transaction history', 'Multi-chain support']
    }
  ];

  return (
    <section className="quick-actions-section">
      {/* Background gradient effect */}
      <div className="background-gradient" />
      
      {/* Header with animated stats */}
      <div className="section-header">
        <div className="title-wrapper">
          <Sparkles className="title-icon" />
          <h2 className="section-title">Quick Actions</h2>
        </div>
        <div className="stats-badges">
          <div className="stat-badge">
            <Activity className="badge-icon pulse-green" />
            <span>Live on 20+ Networks</span>
          </div>
          <div className="stat-badge">
            <Users className="badge-icon" />
            <span>{stats.activeUsers.toLocaleString()} Active Users</span>
          </div>
          <div className="stat-badge">
            <Shield className="badge-icon" />
            <span>Audited & Secure</span>
          </div>
          <div className="stat-badge">
            <Clock className="badge-icon" />
            <span>24/7 Trading</span>
          </div>
        </div>
      </div>

      {/* Actions Grid */}
      <div className="actions-grid">
        {actions.map((action) => {
          const Icon = action.icon;
          const StatsIcon = action.stats.icon;
          
          return (
            <div
              key={action.id}
              className="action-card-wrapper"
            >
              {/* Glow effect */}
              <div className={`card-glow ${action.gradient}`} />
              
              <Card className="action-card">
                {/* Animated background pattern */}
                <div className="card-pattern" />

                {/* New badge */}
                {action.isNew && (
                  <div className="new-badge">
                    <Zap className="new-badge-icon" />
                    NEW
                  </div>
                )}

                <CardHeader className="card-header">
                  <CardTitle className="card-title">
                    <div className={`icon-box ${action.gradient}`}>
                      <Icon className="card-icon" />
                    </div>
                    <span className="title-text">{action.title}</span>
                  </CardTitle>
                </CardHeader>

                <CardContent className="card-content">
                  <p className="card-description">{action.description}</p>
                  
                  {/* Stats display */}
                  {action.stats && (
                    <div className="stats-box">
                      <div className="stats-content">
                        <div>
                          <div className="stats-label">
                            <StatsIcon className="stats-icon" />
                            <span>{action.stats.label}</span>
                          </div>
                          <div className="stats-value">
                            {action.stats.value}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Features list */}
                  {action.features && (
                    <div className="features-list">
                      {action.features.map((feature, i) => (
                        <div key={i} className="feature-item">
                          <div className="feature-bullet" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Action button or component */}
                  {action.link ? (
                    <a 
                      href={action.link} 
                      className={`action-btn ${action.gradient}`}
                    >
                      {action.btnText}
                      <ArrowRight className="btn-icon" />
                    </a>
                  ) : (
                    <div className="component-wrapper">
                      {action.component}
                    </div>
                  )}

                  {/* Floating particles effect - removed hover dependency */}
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="bottom-cta">
        <div className="cta-text">
          <Sparkles className="cta-icon" />
          <p>Discover more DeFi opportunities</p>
          <Sparkles className="cta-icon" />
        </div>
        <button className="explore-btn">
          <span>Explore All Features</span>
          <ExternalLink className="explore-icon" />
        </button>
      </div>

      {/* Quick stats bar */}
      <div className="stats-bar">
        <div className="stat-item">
          <DollarSign className="stat-icon green" />
          <div className="stat-info">
            <div className="stat-label">TVL</div>
            <div className="stat-value">${(stats.tvl / 1000000000).toFixed(2)}B</div>
          </div>
        </div>
        <div className="stat-item">
          <Activity className="stat-icon blue" />
          <div className="stat-info">
            <div className="stat-label">24h Volume</div>
            <div className="stat-value">${(stats.volume24h / 1000000).toFixed(0)}M</div>
          </div>
        </div>
        <div className="stat-item">
          <Users className="stat-icon purple" />
          <div className="stat-info">
            <div className="stat-label">Users</div>
            <div className="stat-value">{stats.activeUsers.toLocaleString()}</div>
          </div>
        </div>
        <div className="stat-item">
          <TrendingUp className="stat-icon orange" />
          <div className="stat-info">
            <div className="stat-label">Best APY</div>
            <div className="stat-value">{stats.apy.toFixed(1)}%</div>
          </div>
        </div>
      </div>
    </section>
  );
}