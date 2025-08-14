import React, { useState, useEffect } from 'react';
import { useAccount, useBalance, useChainId, useConnect } from 'wagmi';
import { formatEther } from 'viem';

interface Token {
  symbol: string;
  name: string;
  balance: string;
  address?: string;
}

const SwapPageFixed: React.FC = () => {
  // Wagmi hooks
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const chainId = useChainId();
  
  const { data: ethBalance } = useBalance({ address });

  const [fromToken, setFromToken] = useState<Token>({ 
    symbol: 'BNB', 
    name: 'BNB', 
    balance: '0.0',
  });
  const [toToken, setToToken] = useState<Token>({ 
    symbol: 'CAKE', 
    name: 'PancakeSwap', 
    balance: '0.0',
  });
  const [fromAmount, setFromAmount] = useState<string>('');
  const [toAmount, setToAmount] = useState<string>('');
  const [isTokenModalOpen, setIsTokenModalOpen] = useState<boolean>(false);
  const [tokenSelectType, setTokenSelectType] = useState<'from' | 'to'>('from');

  const tokens: Token[] = [
    { symbol: 'ETH', name: 'Ethereum', balance: '1.234' },
    { symbol: 'BTC', name: 'Bitcoin', balance: '0.056' },
    { symbol: 'USDC', name: 'USD Coin', balance: '1000.50' },
    { symbol: 'USDT', name: 'Tether', balance: '500.00' },
    { symbol: 'BNB', name: 'BNB', balance: '2.15' },
    { symbol: 'CAKE', name: 'PancakeSwap', balance: '45.78' },
  ];

  // Update ETH balance
  useEffect(() => {
    if (isConnected && ethBalance && fromToken.symbol === 'ETH') {
      setFromToken(prev => ({
        ...prev,
        balance: parseFloat(formatEther(ethBalance.value)).toFixed(4)
      }));
    }
  }, [ethBalance, isConnected, fromToken.symbol]);

  // Price calculation
  useEffect(() => {
    if (fromAmount && !isNaN(parseFloat(fromAmount))) {
      const rate = fromToken.symbol === 'ETH' ? 2500 : 0.0004;
      const calculated = (parseFloat(fromAmount) * rate).toFixed(6);
      setToAmount(calculated);
    } else {
      setToAmount('');
    }
  }, [fromAmount, fromToken.symbol]);

  const openTokenModal = (type: 'from' | 'to') => {
    setTokenSelectType(type);
    setIsTokenModalOpen(true);
  };

  const selectToken = (token: Token) => {
    if (tokenSelectType === 'from') {
      setFromToken(token);
    } else {
      setToToken(token);
    }
    setIsTokenModalOpen(false);
  };

  const swapTokens = () => {
    const tempToken = fromToken;
    setFromToken(toToken);
    setToToken(tempToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #08060B 0%, #1a1625 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{ 
        background: '#27262c',
        borderRadius: '32px',
        padding: '32px',
        maxWidth: '420px',
        width: '100%',
        boxShadow: '0 20px 60px -8px rgba(14, 14, 44, 0.4)',
        border: '1px solid #383241'
      }}>
        {/* Header */}
        <div style={{ 
          marginBottom: '24px'
        }}>
          <h1 style={{ 
            fontSize: '20px',
            fontWeight: '600',
            color: '#F4EEFF',
            margin: '0',
            textAlign: 'center'
          }}>
            Swap
          </h1>
        </div>

        {/* Connection Info */}
        {isConnected && (
          <div style={{ 
            background: 'rgba(31, 199, 212, 0.1)',
            borderRadius: '12px',
            padding: '8px 16px',
            marginBottom: '16px',
            fontSize: '12px',
            color: '#B8ADD2',
            fontFamily: 'monospace'
          }}>
            Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
          </div>
        )}

        {/* Swap Container */}
        <div style={{ 
          background: '#353547',
          borderRadius: '24px',
          padding: '24px',
          marginBottom: '20px',
          border: '1px solid #524B63',
          position: 'relative'
        }}>
          
          {/* From Token */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '12px'
            }}>
              <span style={{ fontSize: '14px', color: '#B8ADD2', fontWeight: '500' }}>From</span>
              <span style={{ fontSize: '12px', color: '#B8ADD2' }}>Balance: {fromToken.balance}</span>
            </div>
            <div style={{ 
              background: '#483F5A',
              borderRadius: '16px',
              padding: '20px 16px',
              border: '1px solid #524B63',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <button 
                onClick={() => openTokenModal('from')}
                style={{ 
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '0'
                }}
              >
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: fromToken.symbol === 'ETH' ? '#627EEA' : 
                             fromToken.symbol === 'USDC' ? '#2775CA' : 
                             fromToken.symbol === 'BNB' ? '#F3BA2F' : '#1FC7D4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                  {fromToken.symbol.slice(0, 3)}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: '600', color: '#F4EEFF', fontSize: '16px' }}>
                    {fromToken.symbol}
                  </div>
                  <div style={{ fontSize: '11px', color: '#B8ADD2' }}>
                    BNB Chain
                  </div>
                </div>
                <span style={{ color: '#B8ADD2', marginLeft: '8px', fontSize: '10px' }}>▼</span>
              </button>
              
              <input
                type="text"
                placeholder="0.00"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                style={{ 
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: '24px',
                  fontWeight: '600',
                  color: '#F4EEFF',
                  textAlign: 'right',
                  minWidth: '100px'
                }}
              />
            </div>
          </div>

          {/* Divider Line */}
          <div style={{ 
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, #524B63 50%, transparent 100%)',
            margin: '20px 0',
            position: 'relative'
          }}>
            {/* Swap Arrow */}
            <button 
              onClick={swapTokens}
              style={{ 
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #1FC7D4 0%, #FFB84D 100%)',
                border: 'none',
                color: '#08060B',
                fontSize: '16px',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(31, 199, 212, 0.3)'
              }}
            >
              ↓
            </button>
          </div>

          {/* To Token */}
          <div style={{ marginTop: '16px' }}>
            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '12px'
            }}>
              <span style={{ fontSize: '14px', color: '#B8ADD2', fontWeight: '500' }}>To (estimate)</span>
              <span style={{ fontSize: '12px', color: '#B8ADD2' }}>Balance: {toToken.balance}</span>
            </div>
            
            <div style={{ 
              background: '#483F5A',
              borderRadius: '16px',
              padding: '20px 16px',
              border: '1px solid #524B63',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <button 
                onClick={() => openTokenModal('to')}
                style={{ 
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '0'
                }}
              >
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: toToken.symbol === 'ETH' ? '#627EEA' : 
                             toToken.symbol === 'USDC' ? '#2775CA' : 
                             toToken.symbol === 'CAKE' ? '#D1884F' : '#1FC7D4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                  {toToken.symbol.slice(0, 3)}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: '600', color: '#F4EEFF', fontSize: '16px' }}>
                    {toToken.symbol}
                  </div>
                  <div style={{ fontSize: '11px', color: '#B8ADD2' }}>
                    BNB Chain
                  </div>
                </div>
                <span style={{ color: '#B8ADD2', marginLeft: '8px', fontSize: '10px' }}>▼</span>
              </button>
              
              <input
                type="text"
                placeholder="0.00"
                value={toAmount}
                readOnly
                style={{ 
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: '24px',
                  fontWeight: '600',
                  color: '#F4EEFF',
                  textAlign: 'right',
                  minWidth: '100px'
                }}
              />
            </div>
          </div>
        </div>

        {/* Swap Details */}
        {fromAmount && toAmount && (
          <div style={{ 
            background: 'rgba(116, 75, 162, 0.05)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '16px',
            border: '1px solid rgba(116, 75, 162, 0.1)'
          }}>
            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px'
            }}>
              <span style={{ fontSize: '14px', color: '#B8ADD2' }}>Price</span>
              <span style={{ fontSize: '14px', fontWeight: '500', color: '#F4EEFF' }}>
                1 {fromToken.symbol} = {(parseFloat(toAmount) / parseFloat(fromAmount)).toFixed(4)} {toToken.symbol}
              </span>
            </div>
            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ fontSize: '14px', color: '#B8ADD2' }}>Price Impact</span>
              <span style={{ fontSize: '14px', fontWeight: '500', color: '#10b981' }}>{'< 0.01%'}</span>
            </div>
          </div>
        )}

        {/* Swap Button */}
        <button 
          onClick={!isConnected ? () => connect({ connector: connectors[0] }) : () => alert('Swap demo!')}
          style={{ 
            width: '100%',
            background: 'linear-gradient(135deg, #1FC7D4 0%, #FFB84D 100%)',
            border: 'none',
            borderRadius: '16px',
            padding: '16px',
            fontSize: '16px',
            fontWeight: '600',
            color: '#08060B',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(31, 199, 212, 0.3)'
          }}
        >
          {!isConnected ? 'Connect Wallet' : 'Swap'}
        </button>
      </div>

      {/* Token Selection Modal */}
      {isTokenModalOpen && (
        <div 
          onClick={() => setIsTokenModalOpen(false)}
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(4px)'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{ 
              background: '#27262C',
              borderRadius: '24px',
              maxWidth: '420px',
              width: '90%',
              maxHeight: '80vh',
              overflow: 'hidden',
              border: '1px solid #383241'
            }}
          >
            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '24px',
              borderBottom: '1px solid #383241'
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#F4EEFF', margin: '0' }}>
                Select a Token
              </h3>
              <button 
                onClick={() => setIsTokenModalOpen(false)}
                style={{ 
                  width: '32px',
                  height: '32px',
                  background: '#372F47',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#B8ADD2',
                  cursor: 'pointer'
                }}
              >
                ✕
              </button>
            </div>
            
            <div style={{ padding: '8px 0' }}>
              {tokens.map((token) => (
                <button
                  key={token.symbol}
                  onClick={() => selectToken(token)}
                  style={{ 
                    width: '100%',
                    padding: '12px 24px',
                    border: 'none',
                    background: 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    color: '#F4EEFF'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#483F5A';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: token.symbol === 'ETH' ? '#627EEA' : 
                                 token.symbol === 'BTC' ? '#F7931A' :
                                 token.symbol === 'USDC' ? '#2775CA' :
                                 token.symbol === 'USDT' ? '#26A17B' :
                                 token.symbol === 'BNB' ? '#F3BA2F' :
                                 token.symbol === 'CAKE' ? '#D1884F' : '#1FC7D4',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      color: 'white',
                      fontWeight: 'bold'
                    }}>
                      {token.symbol.slice(0, 3)}
                    </div>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '2px' }}>
                        {token.symbol}
                      </div>
                      <div style={{ fontSize: '12px', color: '#B8ADD2' }}>
                        {token.name}
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: '#B8ADD2' }}>
                    {token.balance}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SwapPageFixed;
