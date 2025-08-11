import React, { useState } from 'react';
import { 
  ArrowRightLeft, 
  Wallet, 
  Coins,
  BarChart3,
  ArrowRight,
  TrendingUp,
  Users,
  DollarSign
} from 'lucide-react';
import './QuickActionsNew.css';

interface ActionCard {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  link: string;
  stats?: {
    label: string;
    value: string;
  };
}

export default function QuickActionsNew() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const stats = {
    tvl: 1250000000,
    volume24h: 450000000,
    activeUsers: 15000,
    apy: 12.5
  };

  const actions: ActionCard[] = [
    {
      id: 'swap',
      title: 'Token Swap',
      description: 'Trade tokens instantly with the best rates across multiple DEXs',
      icon: ArrowRightLeft,
      color: 'blue',
      link: '/swap',
      stats: {
        label: '24h Volume',
        value: `$${(stats.volume24h / 1000000).toFixed(1)}M`
      }
    },
    {
      id: 'wallet',
      title: 'Portfolio',
      description: 'Manage your crypto portfolio with advanced analytics',
      icon: Wallet,
      color: 'green',
      link: '/dashboard',
      stats: {
        label: 'Active Users',
        value: stats.activeUsers.toLocaleString()
      }
    },
    {
      id: 'stake',
      title: 'Staking',
      description: 'Earn passive income by staking your tokens',
      icon: Coins,
      color: 'purple',
      link: '/stake',
      stats: {
        label: 'Best APY',
        value: `${stats.apy.toFixed(1)}%`
      }
    },
    {
      id: 'analytics',
      title: 'Analytics',
      description: 'Track market trends and your trading performance',
      icon: BarChart3,
      color: 'orange',
      link: '/analytics',
      stats: {
        label: 'TVL',
        value: `$${(stats.tvl / 1000000000).toFixed(2)}B`
      }
    }
  ];

  return (
    <section className="quick-actions-new">
      <div className="container">
        {/* Header */}
        <header className="section-header">
          <h2 className="section-title">Quick Actions</h2>
          <p className="section-subtitle">
            Everything you need to manage your DeFi portfolio
          </p>
        </header>

        {/* Actions Grid */}
        <div className="actions-grid">
          {actions.map((action) => {
            const Icon = action.icon;
            const isHovered = hoveredCard === action.id;

            return (
              <div
                key={action.id}
                className={`action-card ${action.color} ${isHovered ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredCard(action.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => window.location.href = action.link}
              >
                {/* Card Background */}
                <div className="card-bg" />
                
                {/* Card Header */}
                <div className="card-header">
                  <div className="icon-wrapper">
                    <Icon className="card-icon" />
                  </div>
                  <h3 className="card-title">{action.title}</h3>
                </div>

                {/* Card Content */}
                <div className="card-content">
                  <p className="card-description">{action.description}</p>
                  
                  {action.stats && (
                    <div className="card-stats">
                      <div className="stat-label">{action.stats.label}</div>
                      <div className="stat-value">{action.stats.value}</div>
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className="card-footer">
                  <span className="cta-text">Get Started</span>
                  <ArrowRight className="cta-arrow" />
                </div>

                {/* Hover Effect */}
                <div className="hover-glow" />
              </div>
            );
          })}
        </div>

        {/* Global Stats */}
        <div className="global-stats">
          <div className="stat-item">
            <TrendingUp className="stat-icon" />
            <div className="stat-info">
              <div className="stat-number">${(stats.volume24h / 1000000).toFixed(0)}M</div>
              <div className="stat-text">24h Volume</div>
            </div>
          </div>
          
          <div className="stat-item">
            <DollarSign className="stat-icon" />
            <div className="stat-info">
              <div className="stat-number">${(stats.tvl / 1000000000).toFixed(2)}B</div>
              <div className="stat-text">Total Value Locked</div>
            </div>
          </div>
          
          <div className="stat-item">
            <Users className="stat-icon" />
            <div className="stat-info">
              <div className="stat-number">{stats.activeUsers.toLocaleString()}</div>
              <div className="stat-text">Active Users</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}