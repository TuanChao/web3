import React, { useState, useEffect } from 'react';
import { useAccount, useBalance, useConnect } from 'wagmi';
import { formatEther } from 'viem';

interface Token {
  symbol: string;
  name: string;
  balance: string;
  address?: string;
  logoURI: string;
}

const SwapPageNew: React.FC = () => {
  // Wagmi hooks
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  
  const { data: ethBalance } = useBalance({ address });

  const [fromToken, setFromToken] = useState<Token>({ 
    symbol: 'BNB', 
    name: 'BNB', 
    balance: '0.0',
    logoURI: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png'
  });
  const [toToken, setToToken] = useState<Token>({ 
    symbol: 'CAKE', 
    name: 'PancakeSwap', 
    balance: '0.0',
    logoURI: 'https://assets.coingecko.com/coins/images/12632/large/pancakeswap-cake-logo_%281%29.png'
  });
  const [fromAmount, setFromAmount] = useState<string>('');
  const [toAmount, setToAmount] = useState<string>('');
  const [isTokenModalOpen, setIsTokenModalOpen] = useState<boolean>(false);
  const [tokenSelectType, setTokenSelectType] = useState<'from' | 'to'>('from');

  const tokens: Token[] = [
    { 
      symbol: 'ETH', 
      name: 'Ethereum', 
      balance: '1.234',
      logoURI: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png'
    },
    { 
      symbol: 'BTC', 
      name: 'Bitcoin', 
      balance: '0.056',
      logoURI: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png'
    },
    { 
      symbol: 'USDC', 
      name: 'USD Coin', 
      balance: '1000.50',
      logoURI: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png'
    },
    { 
      symbol: 'USDT', 
      name: 'Tether', 
      balance: '500.00',
      logoURI: 'https://assets.coingecko.com/coins/images/325/large/Tether.png'
    },
    { 
      symbol: 'BNB', 
      name: 'BNB', 
      balance: '2.15',
      logoURI: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png'
    },
    { 
      symbol: 'CAKE', 
      name: 'PancakeSwap', 
      balance: '45.78',
      logoURI: 'https://assets.coingecko.com/coins/images/12632/large/pancakeswap-cake-logo_%281%29.png'
    },
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
      const rate = fromToken.symbol === 'ETH' ? 2500 : 
                   fromToken.symbol === 'BNB' ? 300 :
                   fromToken.symbol === 'BTC' ? 45000 : 0.0004;
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

  const styles = {
    container: {
      minHeight: '100vh',
      background: '#08060B',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif'
    },
    card: {
      background: 'rgba(39, 38, 44, 0.4)',
      backdropFilter: 'blur(20px)',
      borderRadius: '24px',
      padding: '28px',
      maxWidth: '420px',
      width: '100%',
      border: '1px solid rgba(56, 50, 65, 0.6)',
      boxShadow: '0 32px 64px rgba(0, 0, 0, 0.4)'
    },
    header: {
      textAlign: 'center' as const,
      marginBottom: '32px'
    },
    title: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#FFFFFF',
      margin: '0',
      letterSpacing: '-0.02em'
    },
    swapContainer: {
      background: 'rgba(53, 53, 71, 0.6)',
      borderRadius: '20px',
      padding: '20px',
      marginBottom: '24px',
      border: '1px solid rgba(82, 75, 99, 0.4)',
      position: 'relative' as const
    },
    tokenSection: {
      marginBottom: '16px'
    },
    tokenLabel: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '12px'
    },
    label: {
      fontSize: '14px',
      color: '#B8ADD2',
      fontWeight: '600'
    },
    balance: {
      fontSize: '12px',
      color: '#7A6EAA',
      fontWeight: '500'
    },
    tokenInput: {
      background: 'rgba(72, 63, 90, 0.6)',
      borderRadius: '16px',
      padding: '16px',
      border: '1px solid rgba(82, 75, 99, 0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      transition: 'all 0.2s ease'
    },
    tokenButton: {
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '4px 6px',
      borderRadius: '8px',
      transition: 'all 0.2s ease'
    },
    tokenIcon: {
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      objectFit: 'cover' as const
    },
    tokenInfo: {
      textAlign: 'left' as const
    },
    tokenSymbol: {
      fontWeight: '700',
      color: '#FFFFFF',
      fontSize: '14px',
      marginBottom: '1px'
    },
    tokenChain: {
      fontSize: '10px',
      color: '#7A6EAA',
      fontWeight: '500'
    },
    dropdown: {
      color: '#7A6EAA',
      marginLeft: '4px',
      fontSize: '10px',
      transition: 'transform 0.2s ease'
    },
    input: {
      background: 'transparent',
      border: 'none',
      outline: 'none',
      fontSize: '24px',
      fontWeight: '700',
      color: '#FFFFFF',
      textAlign: 'right' as const,
      minWidth: '140px',
      fontFamily: 'inherit'
    },
    divider: {
      height: '1px',
      background: 'linear-gradient(90deg, transparent 0%, rgba(82, 75, 99, 0.6) 50%, transparent 100%)',
      margin: '20px 0',
      position: 'relative' as const
    },
    swapButton: {
      position: 'absolute' as const,
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #1FC7D4 0%, #FFB84D 100%)',
      border: '2px solid rgba(39, 38, 44, 0.8)',
      color: '#FFFFFF',
      fontSize: '16px',
      cursor: 'pointer',
      boxShadow: '0 4px 12px rgba(31, 199, 212, 0.4)',
      transition: 'all 0.2s ease'
    },
    connectButton: {
      width: '100%',
      background: 'linear-gradient(135deg, #1FC7D4 0%, #9A6AFF 100%)',
      border: 'none',
      borderRadius: '16px',
      padding: '18px',
      fontSize: '16px',
      fontWeight: '700',
      color: '#FFFFFF',
      cursor: 'pointer',
      boxShadow: '0 8px 24px rgba(31, 199, 212, 0.3)',
      transition: 'all 0.2s ease',
      letterSpacing: '-0.01em'
    },
    modal: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(8px)'
    },
    modalContent: {
      background: 'rgba(39, 38, 44, 0.95)',
      backdropFilter: 'blur(20px)',
      borderRadius: '24px',
      maxWidth: '420px',
      width: '90%',
      maxHeight: '80vh',
      overflow: 'hidden',
      border: '1px solid rgba(56, 50, 65, 0.8)'
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '24px',
      borderBottom: '1px solid rgba(56, 50, 65, 0.6)'
    },
    modalTitle: {
      fontSize: '20px',
      fontWeight: '700',
      color: '#FFFFFF',
      margin: '0'
    },
    closeButton: {
      width: '32px',
      height: '32px',
      background: 'rgba(55, 47, 71, 0.8)',
      border: 'none',
      borderRadius: '8px',
      color: '#B8ADD2',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    tokenList: {
      padding: '8px 0'
    },
    tokenItem: {
      width: '100%',
      padding: '16px 24px',
      border: 'none',
      background: 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      cursor: 'pointer',
      color: '#FFFFFF',
      transition: 'all 0.2s ease'
    },
    tokenItemContent: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    tokenItemInfo: {
      textAlign: 'left' as const
    },
    tokenItemSymbol: {
      fontSize: '14px',
      fontWeight: '700',
      marginBottom: '2px'
    },
    tokenItemName: {
      fontSize: '11px',
      color: '#B8ADD2',
      fontWeight: '500'
    },
    tokenItemBalance: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#B8ADD2'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Swap</h1>
        </div>

        {/* Connection Info */}
        {isConnected && (
          <div style={{ 
            background: 'rgba(31, 199, 212, 0.1)',
            borderRadius: '12px',
            padding: '12px 16px',
            marginBottom: '20px',
            fontSize: '13px',
            color: '#1FC7D4',
            fontWeight: '600',
            border: '1px solid rgba(31, 199, 212, 0.2)'
          }}>
            🟢 {address?.slice(0, 6)}...{address?.slice(-4)}
          </div>
        )}

        {/* Swap Container */}
        <div style={styles.swapContainer}>
          
          {/* From Token */}
          <div style={styles.tokenSection}>
            <div style={styles.tokenLabel}>
              <span style={styles.label}>From</span>
              <span style={styles.balance}>Balance: {fromToken.balance}</span>
            </div>
            <div 
              style={styles.tokenInput}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(31, 199, 212, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(82, 75, 99, 0.6)';
              }}
            >
              <button 
                onClick={() => openTokenModal('from')}
                style={styles.tokenButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  const dropdown = e.currentTarget.querySelector('.dropdown');
                  if (dropdown) (dropdown as HTMLElement).style.transform = 'rotate(180deg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  const dropdown = e.currentTarget.querySelector('.dropdown');
                  if (dropdown) (dropdown as HTMLElement).style.transform = 'rotate(0deg)';
                }}
              >
                <img
                  src={fromToken.logoURI}
                  alt={fromToken.symbol}
                  style={styles.tokenIcon}
                  onError={(e) => {
                    e.currentTarget.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="%23627EEA"/><text x="12" y="15" text-anchor="middle" fill="white" font-size="8" font-weight="bold">${fromToken.symbol.slice(0,3)}</text></svg>`;
                  }}
                />
                <div style={styles.tokenInfo}>
                  <div style={styles.tokenSymbol}>
                    {fromToken.symbol}
                  </div>
                  <div style={styles.tokenChain}>
                    BNB Chain
                  </div>
                </div>
                <span className="dropdown" style={styles.dropdown}>▼</span>
              </button>
              
              <input
                type="text"
                placeholder="0.00"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                style={styles.input}
              />
            </div>
          </div>

          {/* Divider Line */}
          <div style={styles.divider}>
            <button 
              onClick={swapTokens}
              style={styles.swapButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.1) rotate(180deg)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(31, 199, 212, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1) rotate(0deg)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(31, 199, 212, 0.4)';
              }}
            >
              ↓
            </button>
          </div>

          {/* To Token */}
          <div style={styles.tokenSection}>
            <div style={styles.tokenLabel}>
              <span style={styles.label}>To (estimate)</span>
              <span style={styles.balance}>Balance: {toToken.balance}</span>
            </div>
            
            <div 
              style={styles.tokenInput}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(31, 199, 212, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(82, 75, 99, 0.6)';
              }}
            >
              <button 
                onClick={() => openTokenModal('to')}
                style={styles.tokenButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  const dropdown = e.currentTarget.querySelector('.dropdown');
                  if (dropdown) (dropdown as HTMLElement).style.transform = 'rotate(180deg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  const dropdown = e.currentTarget.querySelector('.dropdown');
                  if (dropdown) (dropdown as HTMLElement).style.transform = 'rotate(0deg)';
                }}
              >
                <img
                  src={toToken.logoURI}
                  alt={toToken.symbol}
                  style={styles.tokenIcon}
                  onError={(e) => {
                    e.currentTarget.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="%23D1884F"/><text x="12" y="15" text-anchor="middle" fill="white" font-size="8" font-weight="bold">${toToken.symbol.slice(0,3)}</text></svg>`;
                  }}
                />
                <div style={styles.tokenInfo}>
                  <div style={styles.tokenSymbol}>
                    {toToken.symbol}
                  </div>
                  <div style={styles.tokenChain}>
                    BNB Chain
                  </div>
                </div>
                <span className="dropdown" style={styles.dropdown}>▼</span>
              </button>
              
              <input
                type="text"
                placeholder="0.00"
                value={toAmount}
                readOnly
                style={styles.input}
              />
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <button 
          onClick={!isConnected ? () => connect({ connector: connectors[0] }) : () => alert('Swap demo!')}
          style={styles.connectButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(31, 199, 212, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0px)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(31, 199, 212, 0.3)';
          }}
        >
          {!isConnected ? 'Connect Wallet' : 'Swap'}
        </button>
      </div>

      {/* Token Selection Modal */}
      {isTokenModalOpen && (
        <div 
          onClick={() => setIsTokenModalOpen(false)}
          style={styles.modal}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={styles.modalContent}
          >
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>
                Select a Token
              </h3>
              <button 
                onClick={() => setIsTokenModalOpen(false)}
                style={styles.closeButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(55, 47, 71, 0.8)';
                }}
              >
                ✕
              </button>
            </div>
            
            <div style={styles.tokenList}>
              {tokens.map((token) => (
                <button
                  key={token.symbol}
                  onClick={() => selectToken(token)}
                  style={styles.tokenItem}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <div style={styles.tokenItemContent}>
                    <img
                      src={token.logoURI}
                      alt={token.symbol}
                      style={styles.tokenIcon}
                      onError={(e) => {
                        const colors = {
                          'ETH': '#627EEA',
                          'BTC': '#F7931A',
                          'USDC': '#2775CA',
                          'USDT': '#26A17B',
                          'BNB': '#F3BA2F',
                          'CAKE': '#D1884F'
                        };
                        const color = colors[token.symbol as keyof typeof colors] || '#1FC7D4';
                        e.currentTarget.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="${color}"/><text x="12" y="15" text-anchor="middle" fill="white" font-size="8" font-weight="bold">${token.symbol.slice(0,3)}</text></svg>`;
                      }}
                    />
                    <div style={styles.tokenItemInfo}>
                      <div style={styles.tokenItemSymbol}>
                        {token.symbol}
                      </div>
                      <div style={styles.tokenItemName}>
                        {token.name}
                      </div>
                    </div>
                  </div>
                  <div style={styles.tokenItemBalance}>
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

export default SwapPageNew;
