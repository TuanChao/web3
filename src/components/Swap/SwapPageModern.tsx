import React, { useState, useEffect } from 'react';
import { useAccount, useBalance, useConnect } from 'wagmi';
// import { formatEther } from 'viem';
import { 
  ArrowUpDown, 
  Settings, 
  ChevronDown, 
  Wallet, 
  Zap,
  // TrendingUp,
  Shield,
  X
} from 'lucide-react';

interface Token {
  symbol: string;
  name: string;
  balance: string;
  logo?: string;
  address?: string;
  price?: number;
}

const SwapPageModern: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  // const { data: ethBalance } = useBalance({ address });

  const [fromToken, setFromToken] = useState<Token>({ 
    symbol: 'ETH', 
    name: 'Ethereum', 
    balance: '0.0',
    price: 2500
  });
  
  const [toToken, setToToken] = useState<Token>({ 
    symbol: 'USDC', 
    name: 'USD Coin', 
    balance: '0.0',
    price: 1
  });

  const [fromAmount, setFromAmount] = useState<string>('');
  const [toAmount, setToAmount] = useState<string>('');
  const [slippage, setSlippage] = useState<number>(0.5);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<'from' | 'to'>('from');
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const popularTokens: Token[] = [
    { symbol: 'ETH', name: 'Ethereum', balance: '1.234', price: 2500 },
    { symbol: 'BTC', name: 'Bitcoin', balance: '0.056', price: 45000 },
    { symbol: 'USDC', name: 'USD Coin', balance: '1000.50', price: 1 },
    { symbol: 'USDT', name: 'Tether', balance: '500.00', price: 1 },
    { symbol: 'BNB', name: 'BNB', balance: '2.15', price: 320 },
    { symbol: 'CAKE', name: 'PancakeSwap', balance: '45.78', price: 2.45 },
    { symbol: 'UNI', name: 'Uniswap', balance: '15.30', price: 8.50 },
    { symbol: 'LINK', name: 'Chainlink', balance: '25.67', price: 14.20 }
  ];

  // Price calculation
  useEffect(() => {
    if (fromAmount && !isNaN(parseFloat(fromAmount))) {
      const rate = (fromToken.price || 1) / (toToken.price || 1);
      const calculated = (parseFloat(fromAmount) * rate).toFixed(6);
      setToAmount(calculated);
    } else {
      setToAmount('');
    }
  }, [fromAmount, fromToken.price, toToken.price]);

  const openModal = (type: 'from' | 'to') => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const selectToken = (token: Token) => {
    if (modalType === 'from') {
      setFromToken(token);
    } else {
      setToToken(token);
    }
    setIsModalOpen(false);
  };

  const swapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const getTokenIcon = (symbol: string) => {
    const tokenIcons = {
      ETH: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
      BTC: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
      USDC: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png',
      USDT: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
      BNB: 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
      CAKE: 'https://cryptologos.cc/logos/pancakeswap-cake-logo.png',
      UNI: 'https://cryptologos.cc/logos/uniswap-uni-logo.png',
      LINK: 'https://cryptologos.cc/logos/chainlink-link-logo.png'
    };
    return tokenIcons[symbol as keyof typeof tokenIcons];
  };

  const getTokenIconFallback = (symbol: string) => {
    const colors = {
      ETH: '#627EEA',
      BTC: '#F7931A',
      USDC: '#2775CA',
      USDT: '#26A17B',
      BNB: '#F3BA2F',
      CAKE: '#D1884F',
      UNI: '#FF007A',
      LINK: '#375BD2'
    };
    return colors[symbol as keyof typeof colors] || '#1FC7D4';
  };

  const formatPrice = (price: number) => {
    return price < 1 ? `$${price.toFixed(4)}` : `$${price.toLocaleString()}`;
  };

  return (
    <div className="modern-swap-container">
      {/* Background Effects */}
      <div className="swap-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <div className="swap-card-modern">
        {/* Header */}
        <div className="swap-header-modern">
          <div className="header-left">
            <Zap className="swap-icon" />
            <h1>Swap</h1>
          </div>
          <div className="header-actions">
            <button 
              className="settings-btn-modern"
              onClick={() => setIsSettingsOpen(true)}
            >
              <Settings size={18} />
            </button>
          </div>
        </div>

        {/* Connection Status */}
        {isConnected && (
          <div className="connection-badge">
            <Wallet size={14} />
            <span>{address?.slice(0, 6)}...{address?.slice(-4)}</span>
            <div className="status-dot"></div>
          </div>
        )}

        {/* Swap Interface */}
        <div className="swap-interface">
          {/* From Token */}
          <div className="token-input-container">
            <div className="token-input-header">
              <span className="input-label">From</span>
              <span className="token-balance">
                Balance: {fromToken.balance}
              </span>
            </div>
            
            <div className="token-input-box">
              <button 
                className="token-selector-modern"
                onClick={() => openModal('from')}
              >
                <div className="token-icon-modern">
                  {getTokenIcon(fromToken.symbol) ? (
                    <img 
                      src={getTokenIcon(fromToken.symbol)} 
                      alt={fromToken.symbol}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLDivElement | null;
                        if (fallback) (fallback as any).style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div 
                    className="token-icon-fallback"
                    style={{ 
                      backgroundColor: getTokenIconFallback(fromToken.symbol),
                      display: getTokenIcon(fromToken.symbol) ? 'none' : 'flex'
                    }}
                  >
                    {fromToken.symbol.slice(0, 2)}
                  </div>
                </div>
                <div className="token-info">
                  <span className="token-symbol">{fromToken.symbol}</span>
                  <span className="token-price">{formatPrice(fromToken.price || 0)}</span>
                </div>
                <ChevronDown size={16} className="dropdown-icon" />
              </button>
              
              <div className="input-section">
                <input
                  type="text"
                  placeholder="0.00"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  className="amount-input-modern"
                />
                {fromAmount && fromToken.price && (
                  <div className="usd-value-modern">
                    ≈ ${(parseFloat(fromAmount) * fromToken.price).toLocaleString()}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Swap Arrow */}
          <div className="swap-arrow-container-modern">
            <button 
              className="swap-arrow-btn-modern"
              onClick={swapTokens}
            >
              <ArrowUpDown size={20} />
            </button>
          </div>

          {/* To Token */}
          <div className="token-input-container">
            <div className="token-input-header">
              <span className="input-label">To (estimated)</span>
              <span className="token-balance">
                Balance: {toToken.balance}
              </span>
            </div>
            
            <div className="token-input-box">
              <button 
                className="token-selector-modern"
                onClick={() => openModal('to')}
              >
                <div className="token-icon-modern">
                  {getTokenIcon(toToken.symbol) ? (
                    <img 
                      src={getTokenIcon(toToken.symbol)} 
                      alt={toToken.symbol}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLDivElement | null;
                        if (fallback) (fallback as any).style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div 
                    className="token-icon-fallback"
                    style={{ 
                      backgroundColor: getTokenIconFallback(toToken.symbol),
                      display: getTokenIcon(toToken.symbol) ? 'none' : 'flex'
                    }}
                  >
                    {toToken.symbol.slice(0, 2)}
                  </div>
                </div>
                <div className="token-info">
                  <span className="token-symbol">{toToken.symbol}</span>
                  <span className="token-price">{formatPrice(toToken.price || 0)}</span>
                </div>
                <ChevronDown size={16} className="dropdown-icon" />
              </button>
              
              <div className="input-section">
                <input
                  type="text"
                  placeholder="0.00"
                  value={toAmount}
                  readOnly
                  className="amount-input-modern readonly"
                />
                {toAmount && toToken.price && (
                  <div className="usd-value-modern">
                    ≈ ${(parseFloat(toAmount) * toToken.price).toLocaleString()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Swap Details */}
        {fromAmount && toAmount && (
          <div className="swap-details-modern">
            <div className="detail-row-modern">
              <span>Rate</span>
              <span>1 {fromToken.symbol} = {(parseFloat(toAmount) / parseFloat(fromAmount)).toFixed(4)} {toToken.symbol}</span>
            </div>
            <div className="detail-row-modern">
              <span>Price Impact</span>
              <span className="price-impact-good">{'< 0.01%'}</span>
            </div>
            <div className="detail-row-modern">
              <span>Slippage Tolerance</span>
              <span>{slippage}%</span>
            </div>
            <div className="detail-row-modern">
              <span>Network Fee</span>
              <span>~$2.50</span>
            </div>
          </div>
        )}

        {/* Swap Button */}
        <button 
          className={`swap-button-modern ${!isConnected ? 'connect' : 'swap'}`}
          onClick={!isConnected ? () => connect({ connector: connectors[0] }) : () => alert('Swap executed!')}
        >
          {!isConnected ? (
            <>
              <Wallet size={20} />
              Connect Wallet
            </>
          ) : (
            <>
              <Zap size={20} />
              Swap Tokens
            </>
          )}
        </button>

        {/* Security Badge */}
        <div className="security-badge">
          <Shield size={16} />
          <span>Secured by ChaosSwap Protocol</span>
        </div>
      </div>

      {/* Token Selection Modal */}
      {isModalOpen && (
        <div className="modal-overlay-modern" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content-modern" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-modern">
              <h3>Select Token</h3>
              <button 
                className="close-btn-modern"
                onClick={() => setIsModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="token-search">
              <input 
                type="text" 
                placeholder="Search tokens..."
                className="search-input-modern"
              />
            </div>

            <div className="popular-tokens">
              <h4>Popular Tokens</h4>
              <div className="token-grid">
                {popularTokens.slice(0, 4).map(token => (
                  <button 
                    key={token.symbol}
                    className="popular-token-btn"
                    onClick={() => selectToken(token)}
                  >
                    <div className="token-icon-small">
                      {getTokenIcon(token.symbol) ? (
                        <img 
                          src={getTokenIcon(token.symbol)} 
                          alt={token.symbol}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                        />
                      ) : (
                        <div 
                          style={{ 
                            backgroundColor: getTokenIconFallback(token.symbol),
                            width: '100%', 
                            height: '100%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            borderRadius: '50%',
                            fontSize: '10px',
                            fontWeight: 'bold',
                            color: 'white'
                          }}
                        >
                          {token.symbol.slice(0, 2)}
                        </div>
                      )}
                    </div>
                    <span>{token.symbol}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="token-list-modern">
              {popularTokens.map(token => (
                <button
                  key={token.symbol}
                  className="token-item-modern"
                  onClick={() => selectToken(token)}
                >
                  <div className="token-item-left">
                    <div className="token-icon-modern">
                      {getTokenIcon(token.symbol) ? (
                        <img 
                          src={getTokenIcon(token.symbol)} 
                          alt={token.symbol}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = target.nextElementSibling as HTMLDivElement | null;
                            if (fallback) (fallback as any).style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div 
                        className="token-icon-fallback"
                        style={{ 
                          backgroundColor: getTokenIconFallback(token.symbol),
                          display: getTokenIcon(token.symbol) ? 'none' : 'flex'
                        }}
                      >
                        {token.symbol.slice(0, 2)}
                      </div>
                    </div>
                    <div className="token-item-info">
                      <div className="token-name-modern">{token.symbol}</div>
                      <div className="token-fullname">{token.name}</div>
                    </div>
                  </div>
                  <div className="token-item-right">
                    <div className="token-balance-modern">{token.balance}</div>
                    <div className="token-price-modern">{formatPrice(token.price || 0)}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="modal-overlay-modern" onClick={() => setIsSettingsOpen(false)}>
          <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-modern">
              <h3>Settings</h3>
              <button 
                className="close-btn-modern"
                onClick={() => setIsSettingsOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="settings-content">
              <div className="setting-group">
                <label>Slippage Tolerance</label>
                <div className="slippage-options">
                  {[0.1, 0.5, 1.0].map(value => (
                    <button
                      key={value}
                      className={`slippage-btn ${slippage === value ? 'active' : ''}`}
                      onClick={() => setSlippage(value)}
                    >
                      {value}%
                    </button>
                  ))}
                  <input
                    type="number"
                    value={slippage}
                    onChange={(e) => setSlippage(parseFloat(e.target.value))}
                    className="custom-slippage"
                    step="0.1"
                    min="0.1"
                    max="50"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .modern-swap-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          position: relative;
          overflow: hidden;
        }

        .swap-background {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .gradient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.3;
        }

        .orb-1 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, #1FC7D4 0%, transparent 70%);
          top: 10%;
          left: 10%;
          animation: float 20s ease-in-out infinite;
        }

        .orb-2 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, #FFB84D 0%, transparent 70%);
          bottom: 10%;
          right: 10%;
          animation: float 25s ease-in-out infinite reverse;
        }

        .orb-3 {
          width: 250px;
          height: 250px;
          background: radial-gradient(circle, #7645D9 0%, transparent 70%);
          top: 50%;
          right: 20%;
          animation: float 30s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -20px); }
        }

        .swap-card-modern {
          background: rgba(15, 15, 26, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 24px;
          max-width: 480px;
          width: 100%;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 
            0 25px 50px -12px rgba(0, 0, 0, 0.5),
            0 0 0 1px rgba(255, 255, 255, 0.05);
          position: relative;
          z-index: 1;
        }

        .swap-header-modern {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .swap-icon {
          color: #1FC7D4;
        }

        .swap-header-modern h1 {
          font-size: 24px;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
        }

        .settings-btn-modern {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 8px;
          color: #B8ADD2;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .settings-btn-modern:hover {
          background: rgba(255, 255, 255, 0.15);
          color: #ffffff;
        }

        .connection-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(31, 199, 212, 0.1);
          border: 1px solid rgba(31, 199, 212, 0.2);
          border-radius: 12px;
          padding: 8px 12px;
          margin-bottom: 20px;
          font-size: 12px;
          color: #1FC7D4;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          background: #10b981;
          border-radius: 50%;
        }

        .swap-interface {
          margin-bottom: 20px;
        }

        .token-input-container {
          margin-bottom: 8px;
        }

        .token-input-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .input-label {
          font-size: 14px;
          font-weight: 600;
          color: #B8ADD2;
        }

        .token-balance {
          font-size: 12px;
          color: #7A6EAA;
          cursor: pointer;
        }

        .token-balance:hover {
          color: #1FC7D4;
        }

        .token-input-box {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: all 0.2s ease;
        }

        .token-input-box:hover {
          border-color: rgba(31, 199, 212, 0.3);
        }

        .token-selector-modern {
          background: transparent;
          border: none;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          padding: 0;
          min-width: 140px;
        }

        .token-icon-modern {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: bold;
          color: white;
          overflow: hidden;
          position: relative;
        }

        .token-icon-fallback {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: bold;
          color: white;
          position: absolute;
          top: 0;
          left: 0;
        }

        .token-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .token-symbol {
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
        }

        .token-price {
          font-size: 11px;
          color: #7A6EAA;
        }

        .dropdown-icon {
          color: #B8ADD2;
          margin-left: auto;
        }

        .input-section {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .amount-input-modern {
          background: transparent;
          border: none;
          outline: none;
          font-size: 24px;
          font-weight: 600;
          color: #ffffff;
          text-align: right;
          width: 100%;
        }

        .amount-input-modern.readonly {
          color: #B8ADD2;
        }

        .amount-input-modern::placeholder {
          color: #7A6EAA;
        }

        .usd-value-modern {
          font-size: 12px;
          color: #7A6EAA;
          margin-top: 4px;
        }

        .swap-arrow-container-modern {
          display: flex;
          justify-content: center;
          margin: -4px 0;
          position: relative;
          z-index: 2;
        }

        .swap-arrow-btn-modern {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #1FC7D4 0%, #FFB84D 100%);
          border: 4px solid rgba(15, 15, 26, 0.95);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #ffffff;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(31, 199, 212, 0.3);
        }

        .swap-arrow-btn-modern:hover {
          transform: rotate(180deg) scale(1.1);
          box-shadow: 0 8px 20px rgba(31, 199, 212, 0.5);
        }

        .swap-details-modern {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 20px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .detail-row-modern {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
          font-size: 14px;
        }

        .detail-row-modern:last-child {
          margin-bottom: 0;
        }

        .detail-row-modern span:first-child {
          color: #B8ADD2;
        }

        .detail-row-modern span:last-child {
          color: #ffffff;
          font-weight: 500;
        }

        .price-impact-good {
          color: #10b981 !important;
        }

        .swap-button-modern {
          width: 100%;
          background: linear-gradient(135deg, #1FC7D4 0%, #FFB84D 100%);
          border: none;
          border-radius: 16px;
          padding: 18px 24px;
          font-size: 16px;
          font-weight: 600;
          color: #08060B;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 4px 12px rgba(31, 199, 212, 0.3);
          margin-bottom: 16px;
        }

        .swap-button-modern:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(31, 199, 212, 0.5);
        }

        .security-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 12px;
          color: #7A6EAA;
        }

        .modal-overlay-modern {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-content-modern {
          background: rgba(15, 15, 26, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          max-width: 420px;
          width: 100%;
          max-height: 80vh;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .modal-header-modern {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .modal-header-modern h3 {
          font-size: 18px;
          font-weight: 600;
          color: #ffffff;
          margin: 0;
        }

        .close-btn-modern {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 8px;
          padding: 8px;
          color: #B8ADD2;
          cursor: pointer;
        }

        .close-btn-modern:hover {
          background: rgba(255, 255, 255, 0.15);
          color: #ffffff;
        }

        .token-search {
          padding: 16px 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .search-input-modern {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 12px 16px;
          color: #ffffff;
          font-size: 14px;
          outline: none;
        }

        .search-input-modern::placeholder {
          color: #7A6EAA;
        }

        .popular-tokens {
          padding: 16px 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .popular-tokens h4 {
          font-size: 12px;
          font-weight: 600;
          color: #B8ADD2;
          text-transform: uppercase;
          margin: 0 0 12px 0;
        }

        .token-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
        }

        .popular-token-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 12px 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .popular-token-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .token-icon-small {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: bold;
          color: white;
        }

        .popular-token-btn span {
          font-size: 11px;
          color: #ffffff;
          font-weight: 500;
        }

        .token-list-modern {
          max-height: 300px;
          overflow-y: auto;
        }

        .token-item-modern {
          width: 100%;
          background: transparent;
          border: none;
          padding: 12px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .token-item-modern:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .token-item-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .token-item-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .token-name-modern {
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
        }

        .token-fullname {
          font-size: 12px;
          color: #7A6EAA;
        }

        .token-item-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .token-balance-modern {
          font-size: 14px;
          font-weight: 500;
          color: #ffffff;
        }

        .token-price-modern {
          font-size: 12px;
          color: #7A6EAA;
        }

        .settings-modal {
          background: rgba(15, 15, 26, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          max-width: 360px;
          width: 100%;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .settings-content {
          padding: 20px 24px;
        }

        .setting-group {
          margin-bottom: 20px;
        }

        .setting-group label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #B8ADD2;
          margin-bottom: 12px;
        }

        .slippage-options {
          display: flex;
          gap: 8px;
        }

        .slippage-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 8px 12px;
          color: #B8ADD2;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .slippage-btn.active,
        .slippage-btn:hover {
          background: rgba(31, 199, 212, 0.2);
          border-color: #1FC7D4;
          color: #1FC7D4;
        }

        .custom-slippage {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 8px 12px;
          color: #ffffff;
          width: 60px;
          outline: none;
        }
      `}</style>
    </div>
  );
};

export default SwapPageModern;