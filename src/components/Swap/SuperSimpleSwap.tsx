import React from 'react';

const SuperSimpleSwap: React.FC = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#000', 
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    }}>
      <h1>SWAP PAGE TEST</h1>
      <p>Nếu bạn thấy text này, component đã load thành công!</p>
      
      <div style={{ 
        background: '#333', 
        padding: '20px', 
        borderRadius: '10px',
        marginTop: '20px'
      }}>
        <h2>Token Swap</h2>
        <div style={{ marginBottom: '20px' }}>
          <input 
            type="text" 
            placeholder="Amount" 
            style={{ 
              padding: '10px', 
              fontSize: '16px',
              marginRight: '10px'
            }} 
          />
          <button style={{ 
            padding: '10px 20px', 
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            ETH ↓
          </button>
        </div>
        
        <div style={{ textAlign: 'center', margin: '10px 0' }}>
          <button style={{ 
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            cursor: 'pointer'
          }}>
            ↓
          </button>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <input 
            type="text" 
            placeholder="Amount" 
            style={{ 
              padding: '10px', 
              fontSize: '16px',
              marginRight: '10px'
            }} 
          />
          <button style={{ 
            padding: '10px 20px', 
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            USDC ↓
          </button>
        </div>
        
        <button style={{ 
          width: '100%',
          padding: '15px', 
          fontSize: '18px',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          SWAP
        </button>
      </div>
    </div>
  );
};

export default SuperSimpleSwap;
