import React, { useState } from 'react';
import './SwapPage.css';

const SwapSimple: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="pancake-swap-container">
      <div className="pancake-swap-card">
        <div className="pancake-header">
          <h1 className="pancake-title">Simple Swap Test</h1>
        </div>

        <div className="pancake-swap-body">
          {/* From Token Section */}
          <div className="pancake-token-section">
            <div className="token-section-header">
              <span className="token-label">From</span>
              <span className="token-balance">Balance: 1.234</span>
            </div>
            <div className="pancake-input-container">
              <input
                type="text"
                className="pancake-amount-input"
                placeholder="0.0"
              />
              <button 
                className="pancake-token-selector"
                onClick={() => setIsModalOpen(true)}
              >
                <span style={{ color: '#F4EEFF' }}>ETH ↓</span>
              </button>
            </div>
          </div>

          {/* Swap Arrow */}
          <div className="pancake-swap-arrow">
            <button className="swap-arrow-button">
              ↓
            </button>
          </div>

          {/* To Token Section */}
          <div className="pancake-token-section">
            <div className="token-section-header">
              <span className="token-label">To</span>
              <span className="token-balance">Balance: 1000.50</span>
            </div>
            <div className="pancake-input-container">
              <input
                type="text"
                className="pancake-amount-input"
                placeholder="0.0"
              />
              <button 
                className="pancake-token-selector"
                onClick={() => setIsModalOpen(true)}
              >
                <span style={{ color: '#F4EEFF' }}>USDC ↓</span>
              </button>
            </div>
          </div>

          <button className="pancake-swap-button">
            Connect Wallet
          </button>
        </div>
      </div>

      {/* Simple Modal */}
      {isModalOpen && (
        <div 
          className="pancake-modal-overlay" 
          onClick={() => setIsModalOpen(false)}
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            background: 'rgba(0,0,0,0.7)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            zIndex: 1000 
          }}
        >
          <div 
            className="pancake-token-modal"
            onClick={(e) => e.stopPropagation()}
            style={{ 
              background: '#27262C', 
              borderRadius: '24px', 
              padding: '24px', 
              maxWidth: '380px', 
              width: '90%' 
            }}
          >
            <h3 style={{ color: '#F4EEFF', marginBottom: '20px' }}>Select Token</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button 
                onClick={() => setIsModalOpen(false)}
                style={{ 
                  background: '#483F5A', 
                  border: 'none', 
                  borderRadius: '12px', 
                  padding: '12px', 
                  color: '#F4EEFF', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#627EEA', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>
                  ETH
                </div>
                <div>
                  <div>Ethereum</div>
                  <div style={{ fontSize: '12px', color: '#B8ADD2' }}>1.234</div>
                </div>
              </button>
              
              <button 
                onClick={() => setIsModalOpen(false)}
                style={{ 
                  background: '#483F5A', 
                  border: 'none', 
                  borderRadius: '12px', 
                  padding: '12px', 
                  color: '#F4EEFF', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#2775CA', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>
                  USDC
                </div>
                <div>
                  <div>USD Coin</div>
                  <div style={{ fontSize: '12px', color: '#B8ADD2' }}>1000.50</div>
                </div>
              </button>
            </div>
            
            <button 
              onClick={() => setIsModalOpen(false)}
              style={{ 
                background: '#1FC7D4', 
                border: 'none', 
                borderRadius: '12px', 
                padding: '12px 24px', 
                color: '#08060B', 
                cursor: 'pointer',
                marginTop: '20px',
                width: '100%'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SwapSimple;
