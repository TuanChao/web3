import React from 'react';
import './SwapPage.css';

const SwapPageDebug: React.FC = () => {
  return (
    <div className="pancake-swap-container" style={{ minHeight: '50vh' }}>
      <div className="pancake-swap-card">
        <div className="pancake-header">
          <h1 className="pancake-title">Swap Debug</h1>
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
                value=""
              />
              <button className="pancake-token-selector">
                <div className="token-display">
                  <div 
                    className="token-logo"
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: '#627EEA',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '10px',
                      fontWeight: 'bold'
                    }}
                  >
                    ETH
                  </div>
                  <span className="token-symbol">ETH</span>
                  <span style={{ color: '#B8ADD2' }}>↓</span>
                </div>
              </button>
            </div>
          </div>

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
                value=""
                readOnly
              />
              <button className="pancake-token-selector">
                <div className="token-display">
                  <div 
                    className="token-logo"
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: '#2775CA',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '10px',
                      fontWeight: 'bold'
                    }}
                  >
                    UDC
                  </div>
                  <span className="token-symbol">USDC</span>
                  <span style={{ color: '#B8ADD2' }}>↓</span>
                </div>
              </button>
            </div>
          </div>

          <button className="pancake-swap-button">
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
};

export default SwapPageDebug;
