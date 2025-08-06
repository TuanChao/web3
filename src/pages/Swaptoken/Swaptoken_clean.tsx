import React, { useState, useEffect } from 'react';
import './Swaptoken.css';

interface Token {
  symbol: string;
  name: string;
  balance: string;
  address?: string;
}

const TokenSwap: React.FC = () => {
  const [fromToken, setFromToken] = useState<Token>({ 
    symbol: 'ETH', 
    name: 'Ethereum', 
    balance: '0.0',
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
  });
  const [toToken, setToToken] = useState<Token>({ 
    symbol: 'USDC', 
    name: 'USD Coin', 
    balance: '0.0',
    address: '0xA0b86a33E6441c41b65CbA5aE0Be2b3E8A62c3D8'
  });
  const [fromAmount, setFromAmount] = useState<string>('');
  const [toAmount, setToAmount] = useState<string>('');
  const [isTokenModalOpen, setIsTokenModalOpen] = useState<boolean>(false);
  const [tokenSelectType, setTokenSelectType] = useState<'from' | 'to'>('from');
  const [isSwapping, setIsSwapping] = useState<boolean>(false);
  const [focusedInput, setFocusedInput] = useState<string>('');

  const tokens: Token[] = [
    { symbol: 'ETH', name: 'Ethereum', balance: '1.234', address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' },
    { symbol: 'BTC', name: 'Bitcoin', balance: '0.056', address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599' },
    { symbol: 'USDC', name: 'USD Coin', balance: '1000.50', address: '0xA0b86a33E6441c41b65CbA5aE0Be2b3E8A62c3D8' },
    { symbol: 'USDT', name: 'Tether', balance: '500.00', address: '0xdAC17F958D2ee523a2206206994597C13D831ec7' },
    { symbol: 'BNB', name: 'BNB', balance: '2.15', address: '0xB8c77482e45F1F44dE1745F52C74426C631bDD52' },
    { symbol: 'CAKE', name: 'PancakeSwap', balance: '45.78', address: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82' },
    { symbol: 'UNI', name: 'Uniswap', balance: '12.34', address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984' },
    { symbol: 'LINK', name: 'Chainlink', balance: '8.90', address: '0x514910771AF9Ca656af840dff83E8264EcF986CA' }
  ];

  const getTokenIcon = (token: Token): string => {
    if (token.address) {
      return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${token.address}/logo.png`;
    }
    // Fallback to emoji for tokens without address
    return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${token.symbol.charAt(0)}</text></svg>`;
  };

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
    
    const tempAmount = fromAmount;
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  const handleSwap = async () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    setIsSwapping(true);
    
    // Simulate swap process
    setTimeout(() => {
      alert(`Swapped ${fromAmount} ${fromToken.symbol} for ${toAmount || 'calculated'} ${toToken.symbol}`);
      setIsSwapping(false);
      setFromAmount('');
      setToAmount('');
    }, 2000);
  };

  // Simulate price calculation
  useEffect(() => {
    if (fromAmount && !isNaN(parseFloat(fromAmount))) {
      const rate = Math.random() * 2000 + 1000; // Random rate for demo
      const calculated = (parseFloat(fromAmount) * rate).toFixed(6);
      setToAmount(calculated);
    } else {
      setToAmount('');
    }
  }, [fromAmount, fromToken, toToken]);

  return (
    <div className="token-swap-container">
      <div className="swap-card">
        <div className="swap-header">
          <h2>Swap</h2>
          <div className="swap-settings">
            <button className="settings-btn">⚙️</button>
          </div>
        </div>

        <div className="swap-body">
          {/* From Section */}
          <div className="swap-section">
            <div className="section-header">
              <span className="section-label">From</span>
              <span className="balance">Balance: {fromToken.balance}</span>
            </div>
            <div className={`swap-input-container ${focusedInput === 'from' ? 'focused' : ''}`}>
              <input
                type="number"
                placeholder="0"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                onFocus={() => setFocusedInput('from')}
                onBlur={() => setFocusedInput('')}
                className="swap-input"
              />
              <div className="token-selector" onClick={() => openTokenModal('from')}>
                <div className="token-info">
                  <img 
                    src={getTokenIcon(fromToken)} 
                    alt={fromToken.symbol}
                    className="token-icon"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${fromToken.symbol.charAt(0)}</text></svg>`;
                    }}
                  />
                  <span className="token-symbol">{fromToken.symbol}</span>
                </div>
                <span className="dropdown-arrow">▼</span>
              </div>
            </div>
            <div className="usd-value">~$0.00</div>
          </div>

          {/* Swap Button */}
          <div className="swap-arrow-container">
            <button className="swap-arrow-btn" onClick={swapTokens}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 7L3 12L8 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* To Section */}
          <div className="swap-section">
            <div className="section-header">
              <span className="section-label">To</span>
              <span className="balance">Balance: {toToken.balance}</span>
            </div>
            <div className={`swap-input-container ${focusedInput === 'to' ? 'focused' : ''}`}>
              <input
                type="number"
                placeholder="0"
                value={toAmount}
                onChange={(e) => setToAmount(e.target.value)}
                onFocus={() => setFocusedInput('to')}
                onBlur={() => setFocusedInput('')}
                className="swap-input"
                readOnly
              />
              <div className="token-selector" onClick={() => openTokenModal('to')}>
                <div className="token-info">
                  <img 
                    src={getTokenIcon(toToken)} 
                    alt={toToken.symbol}
                    className="token-icon"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${toToken.symbol.charAt(0)}</text></svg>`;
                    }}
                  />
                  <span className="token-symbol">{toToken.symbol}</span>
                </div>
                <span className="dropdown-arrow">▼</span>
              </div>
            </div>
            <div className="usd-value">~$0.00</div>
          </div>

          {/* Swap Details */}
          <div className="swap-details">
            <div className="detail-row">
              <span>Rate</span>
              <span>1 {fromToken.symbol} = {Math.random().toFixed(4)} {toToken.symbol}</span>
            </div>
            <div className="detail-row">
              <span>Network fee</span>
              <span>~$2.50</span>
            </div>
          </div>

          {/* Swap Button */}
          <button 
            className={`swap-btn ${!fromAmount || isSwapping ? 'disabled' : ''}`}
            onClick={handleSwap}
            disabled={!fromAmount || isSwapping}
          >
            {isSwapping ? 'Swapping...' : 'Swap'}
          </button>
        </div>
      </div>

      {/* Token Selection Modal */}
      {isTokenModalOpen && (
        <div className="modal-overlay" onClick={() => setIsTokenModalOpen(false)}>
          <div className="token-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Select a token</h3>
              <button className="close-btn" onClick={() => setIsTokenModalOpen(false)}>×</button>
            </div>
            <div className="search-container">
              <input type="text" placeholder="Search name or paste address" className="search-input" />
            </div>
            <div className="token-list">
              {tokens.map((token) => (
                <div
                  key={token.symbol}
                  className="token-item"
                  onClick={() => selectToken(token)}
                >
                  <div className="token-item-info">
                    <img 
                      src={getTokenIcon(token)} 
                      alt={token.symbol}
                      className="token-item-icon"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${token.symbol.charAt(0)}</text></svg>`;
                      }}
                    />
                    <div className="token-item-details">
                      <div className="token-item-symbol">{token.symbol}</div>
                      <div className="token-item-name">{token.name}</div>
                    </div>
                  </div>
                  <div className="token-item-balance">{token.balance}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenSwap;
