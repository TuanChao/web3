import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import './CTASection.css';

export default function CTASection() {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-content">
          <div className="cta-badge">
            <Zap className="cta-badge-icon" />
            <span>Ready to get started?</span>
          </div>
          
          <h2 className="cta-title">
            Start Trading on <span className="highlight">AnomaSwap</span> Today
          </h2>
          
          <p className="cta-description">
            Join thousands of users who trust AnomaSwap for their DeFi trading needs. 
            Experience the future of decentralized finance.
          </p>
          
          <div className="cta-actions">
            <button className="cta-primary">
              <span>Launch App</span>
              <ArrowRight className="cta-icon" />
            </button>
            
            <button className="cta-secondary">
              <span>Learn More</span>
            </button>
          </div>
          
          <div className="cta-stats">
            <div className="cta-stat">
              <div className="stat-number">15K+</div>
              <div className="stat-label">Active Traders</div>
            </div>
            <div className="cta-stat">
              <div className="stat-number">$2.4B</div>
              <div className="stat-label">Volume Traded</div>
            </div>
            <div className="cta-stat">
              <div className="stat-number">50+</div>
              <div className="stat-label">Supported Tokens</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}