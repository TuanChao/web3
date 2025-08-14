import React from 'react';

const TestSwap: React.FC = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#08060B', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      color: 'white'
    }}>
      <div style={{ 
        background: '#27262C', 
        borderRadius: '32px', 
        padding: '24px',
        maxWidth: '420px',
        width: '100%'
      }}>
        <h1 style={{ color: '#F4EEFF', textAlign: 'center', marginBottom: '20px' }}>
          Test Swap
        </h1>
        
        {/* FROM SECTION */}
        <div style={{ 
          background: '#353547', 
          borderRadius: '24px', 
          padding: '20px', 
          marginBottom: '12px'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            marginBottom: '12px' 
          }}>
            <span style={{ color: '#B8ADD2', fontSize: '14px' }}>From</span>
            <span style={{ color: '#B8ADD2', fontSize: '12px' }}>Balance: 1.234</span>
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px' 
          }}>
            <input 
              type="text" 
              placeholder="0.0" 
              style={{ 
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontSize: '24px',
                color: '#F4EEFF',
                fontWeight: '600'
              }}
            />
            
            <button 
              onClick={() => alert('ETH token selector clicked!')}
              style={{ 
                background: '#483F5A',
                border: '1px solid #524B63',
                borderRadius: '16px',
                padding: '12px 16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#F4EEFF',
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: '#627EEA',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                color: 'white'
              }}>
                ETH
              </div>
              ETH
              <span style={{ color: '#B8ADD2' }}>▼</span>
            </button>
          </div>
        </div>

        {/* SWAP ARROW */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          margin: '8px 0' 
        }}>
          <button style={{ 
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #1FC7D4 0%, #FFB84D 100%)',
            border: 'none',
            color: '#08060B',
            fontSize: '20px',
            cursor: 'pointer'
          }}>
            ↓
          </button>
        </div>

        {/* TO SECTION */}
        <div style={{ 
          background: '#353547', 
          borderRadius: '24px', 
          padding: '20px', 
          marginBottom: '20px'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            marginBottom: '12px' 
          }}>
            <span style={{ color: '#B8ADD2', fontSize: '14px' }}>To</span>
            <span style={{ color: '#B8ADD2', fontSize: '12px' }}>Balance: 1000.50</span>
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px' 
          }}>
            <input 
              type="text" 
              placeholder="0.0" 
              readOnly
              style={{ 
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontSize: '24px',
                color: '#F4EEFF',
                fontWeight: '600'
              }}
            />
            
            <button 
              onClick={() => alert('USDC token selector clicked!')}
              style={{ 
                background: '#483F5A',
                border: '1px solid #524B63',
                borderRadius: '16px',
                padding: '12px 16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#F4EEFF',
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: '#2775CA',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                color: 'white'
              }}>
                UDC
              </div>
              USDC
              <span style={{ color: '#B8ADD2' }}>▼</span>
            </button>
          </div>
        </div>

        <button style={{ 
          width: '100%',
          background: 'linear-gradient(135deg, #1FC7D4 0%, #FFB84D 100%)',
          border: 'none',
          borderRadius: '16px',
          padding: '18px',
          fontSize: '18px',
          fontWeight: '600',
          color: '#08060B',
          cursor: 'pointer'
        }}>
          Connect Wallet
        </button>
      </div>
    </div>
  );
};

export default TestSwap;
