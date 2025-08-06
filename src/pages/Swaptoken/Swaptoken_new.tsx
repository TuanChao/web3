import React, { useState, useEffect } from 'react';
import './Swaptoken.css';

interface Token {
  symbol: string;
  name: string;
  balance: string;
}

const TokenSwap: React.FC = () => {
  const [fromToken, setFromToken] = useState<Token>({ symbol: 'ETH', name: 'Ethereum', balance: '0.0' });
  const [toToken, setToToken] = useState<Token>({ symbol: 'USDC', name: 'USD Coin', balance: '0.0' });
  const [fromAmount, setFromAmount] = useState<string>('');
  const [toAmount, setToAmount] = useState<string>('');
  const [isTokenModalOpen, setIsTokenModalOpen] = useState<boolean>(false);
  const [tokenSelectType, setTokenSelectType] = useState<'from' | 'to'>('from');
  const [isSwapping, setIsSwapping] = useState<boolean>(false);
  const [focusedInput, setFocusedInput] = useState<string>('');

  const tokens: Token[] = [
    { symbol: 'ETH', name: 'Ethereum', balance: '1.234' },
    { symbol: 'BTC', name: 'Bitcoin', balance: '0.056' },
    { symbol: 'USDC', name: 'USD Coin', balance: '1000.50' },
    { symbol: 'USDT', name: 'Tether', balance: '500.00' },
    { symbol: 'BNB', name: 'BNB', balance: '2.15' },
    { symbol: 'CAKE', name: 'PancakeSwap Token', balance: '50.25' },
    { symbol: 'UNI', name: 'Uniswap', balance: '10.00' },
    { symbol: 'LINK', name: 'Chainlink', balance: '15.75' },
  ];

  // Auto calculate toAmount when fromAmount changes
  useEffect(() => {
    if (fromAmount && parseFloat(fromAmount) > 0) {
      // Simulate exchange rate calculation
      const rate = fromToken.symbol === 'ETH' ? 1800 : 0.0005;
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
    const tempAmount = fromAmount;
    setFromToken(toToken);
    setToToken(tempToken);
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  const handleSwap = async () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) return;
    
    setIsSwapping(true);
    // Simulate swap delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSwapping(false);
    
    // Reset form
    setFromAmount('');
    setToAmount('');
  };

  const exchangeRate = fromAmount && parseFloat(fromAmount) > 0 ? '1 ETH = 1,800 USDC' : '';
  const priceImpact = '< 0.01%';
  const minimumReceived = toAmount ? (parseFloat(toAmount) * 0.995).toFixed(6) : '0';

  return (
    <div className="swap-container">
      <div className="swap-card">
        <div className="swap-header">
          <h1 className="swap-title">Swap</h1>
          {/* <button className="settings-btn">
            ⚙️
          </button> */}
        </div>

        {/* From Token Input */}
        <div className="input-section">
          <div className={`input-container ${focusedInput === 'from' ? 'focused' : ''}`}>
            <div className="input-header">
              <span className="input-label">From</span>
              <span className="balance-text">Balance: {fromToken.balance}</span>
            </div>
            <div className="input-body">
              <input
                type="text"
                className="amount-input"
                placeholder="0.0"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                onFocus={() => setFocusedInput('from')}
                onBlur={() => setFocusedInput('')}
              />
              <div className="token-selector" onClick={() => openTokenModal('from')}>
                <div className="token-info">
                  <div className="token-icon">{fromToken.symbol.charAt(0)}</div>
                  <span className="token-symbol">{fromToken.symbol}</span>
                </div>
                <span>▼</span>
              </div>
            </div>
          </div>
        </div>

        {/* Swap Arrow */}
        <div className="swap-arrow-container">
          <button className="swap-arrow-btn" onClick={swapTokens}>
            ↓
          </button>
        </div>

        {/* To Token Input */}
        <div className="input-section">
          <div className={`input-container ${focusedInput === 'to' ? 'focused' : ''}`}>
            <div className="input-header">
              <span className="input-label">To (estimated)</span>
              <span className="balance-text">Balance: {toToken.balance}</span>
            </div>
            <div className="input-body">
              <input
                type="text"
                className="amount-input"
                placeholder="0.0"
                value={toAmount}
                readOnly
              />
              <div className="token-selector" onClick={() => openTokenModal('to')}>
                <div className="token-info">
                  <div className="token-icon">{toToken.symbol.charAt(0)}</div>
                  <span className="token-symbol">{toToken.symbol}</span>
                </div>
                <span>▼</span>
              </div>
            </div>
          </div>
        </div>

        {/* Swap Details */}
        {fromAmount && toAmount && (
          <div className="swap-details">
            <div className="swap-detail-row">
              <span className="detail-label">Exchange Rate</span>
              <span className="detail-value">{exchangeRate}</span>
            </div>
            <div className="swap-detail-row">
              <span className="detail-label">Price Impact</span>
              <span className="detail-value price-impact">{priceImpact}</span>
            </div>
            <div className="swap-detail-row">
              <span className="detail-label">Minimum Received</span>
              <span className="detail-value">{minimumReceived} {toToken.symbol}</span>
            </div>
          </div>
        )}

        {/* Swap Button */}
        <button 
          className="swap-button" 
          onClick={handleSwap}
          disabled={!fromAmount || !toAmount || isSwapping}
        >
          {isSwapping ? 'Swapping...' : 'Swap'}
        </button>
      </div>

      {/* Token Selection Modal */}
      {isTokenModalOpen && (
        <div className="modal-overlay" onClick={() => setIsTokenModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Select a Token</h2>
              <button className="close-btn" onClick={() => setIsTokenModalOpen(false)}>
                ×
              </button>
            </div>
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Search name or paste address"
              />
            </div>
            <div className="token-list">
              {tokens.map((token) => (
                <button
                  key={token.symbol}
                  className="token-item"
                  onClick={() => selectToken(token)}
                >
                  <div className="token-item-icon">{token.symbol.charAt(0)}</div>
                  <div className="token-item-info">
                    <div className="token-item-symbol">{token.symbol}</div>
                    <div className="token-item-name">{token.name}</div>
                  </div>
                  <div className="token-item-balance">{token.balance}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenSwap;
