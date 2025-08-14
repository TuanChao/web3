import React, { useState, useEffect } from 'react';
import './SwapPage.css';
import { ChevronDownIcon, ArrowDownIcon, SettingsIcon, SearchIcon, CloseIcon } from '../ui/Icons';
import { useAccount, useBalance, useChainId, useConnect } from 'wagmi';
import { formatEther } from 'viem';

interface Token {
  symbol: string;
  name: string;
  balance: string;
  address?: string;
}

const TokenSwap: React.FC = () => {
  // Wagmi hooks
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const chainId = useChainId();
  
  // ETH balance
  const { data: ethBalance } = useBalance({
    address: address,
  });

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

  // Update balance when connected
  useEffect(() => {
    if (isConnected && ethBalance && fromToken.symbol === 'ETH') {
      setFromToken(prev => ({
        ...prev,
        balance: parseFloat(formatEther(ethBalance.value)).toFixed(4)
      }));
    }
  }, [ethBalance, isConnected, fromToken.symbol]);

  const tokens: Token[] = [
    { symbol: 'ETH', name: 'Ethereum', balance: isConnected && ethBalance ? parseFloat(formatEther(ethBalance.value)).toFixed(4) : '0.0', address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' },
    { symbol: 'BTC', name: 'Bitcoin', balance: '0.056', address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599' },
    { symbol: 'USDC', name: 'USD Coin', balance: '1000.50', address: '0xA0b86a33E6441c41b65CbA5aE0Be2b3E8A62c3D8' },
    { symbol: 'USDT', name: 'Tether', balance: '500.00', address: '0xdAC17F958D2ee523a2206206994597C13D831ec7' },
    { symbol: 'BNB', name: 'BNB', balance: '2.15', address: '0xB8c77482e45F1F44dE1745F52C74426C631bDD52' },
    { symbol: 'CAKE', name: 'PancakeSwap', balance: '45.78', address: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82' },
    { symbol: 'UNI', name: 'Uniswap', balance: '12.34', address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984' },
    { symbol: 'LINK', name: 'Chainlink', balance: '8.90', address: '0x514910771AF9Ca656af840dff83E8264EcF986CA' }
  ];

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
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    if (parseFloat(fromAmount) > parseFloat(fromToken.balance)) {
      alert('Insufficient balance');
      return;
    }

    setIsSwapping(true);
    
    // In real app, this would call smart contract
    setTimeout(() => {
      alert(`✅ Mock Swap Successful!\n${fromAmount} ${fromToken.symbol} → ${toAmount || 'calculated'} ${toToken.symbol}\n\nAddress: ${address}\nChain: ${chainId}\n\n(This is a demo - no real transaction)`);
      setIsSwapping(false);
      setFromAmount('');
      setToAmount('');
    }, 2000);
  };

  // Mock price calculation
  useEffect(() => {
    if (fromAmount && !isNaN(parseFloat(fromAmount))) {
      const mockRates: { [key: string]: number } = {
        'ETH-USDC': 2500,
        'ETH-BTC': 0.065,
        'BTC-ETH': 15.4,
        'BTC-USDC': 38500,
        'USDC-ETH': 0.0004,
        'USDC-BTC': 0.000026
      };
      
      const rateKey = `${fromToken.symbol}-${toToken.symbol}`;
      const rate = mockRates[rateKey] || Math.random() * 2000 + 100;
      const calculated = (parseFloat(fromAmount) * rate).toFixed(6);
      setToAmount(calculated);
    } else {
      setToAmount('');
    }
  }, [fromAmount, fromToken.symbol, toToken.symbol]);

  return (
    <div className="pancake-swap-container">
      <div className="pancake-swap-card">
        {/* Header */}
        <div className="pancake-header">
          <h1 className="pancake-title">Swap</h1>
          <div className="pancake-settings">
            <button className="settings-button" title="Settings">
              <SettingsIcon size={20} />
            </button>
          </div>
        </div>

        {/* Network Info */}
        {isConnected && (
          <div className="network-info" style={{ 
            padding: '8px 24px', 
            fontSize: '12px', 
            color: '#B8ADD2',
            borderBottom: '1px solid #383241',
            marginBottom: '16px'
          }}>
            Connected: {address?.slice(0, 6)}...{address?.slice(-4)} | Chain ID: {chainId}
          </div>
        )}

        {/* Main Swap Interface */}
        <div className="pancake-swap-body">
          {/* From Token Section */}
          <div className="pancake-token-section">
            <div className="token-section-header">
              <span className="token-label">From</span>
              <span className="token-balance">Balance: {fromToken.balance}</span>
            </div>
            <div className="pancake-input-container">
              <input
                type="text"
                className="pancake-amount-input"
                placeholder="0.0"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
              />
              <button 
                className="pancake-token-selector"
                onClick={() => openTokenModal('from')}
              >
                <div className="token-display">
                  <div 
                    className="token-logo"
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: fromToken.symbol === 'ETH' ? '#627EEA' : 
                                 fromToken.symbol === 'BTC' ? '#F7931A' :
                                 fromToken.symbol === 'USDC' ? '#2775CA' :
                                 fromToken.symbol === 'USDT' ? '#26A17B' :
                                 fromToken.symbol === 'BNB' ? '#F3BA2F' :
                                 fromToken.symbol === 'CAKE' ? '#D1884F' :
                                 fromToken.symbol === 'UNI' ? '#FF007A' :
                                 fromToken.symbol === 'LINK' ? '#375BD2' : '#1FC7D4',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '10px',
                      fontWeight: 'bold'
                    }}
                  >
                    {fromToken.symbol.slice(0, 3)}
                  </div>
                  <span className="token-symbol">{fromToken.symbol}</span>
                  <ChevronDownIcon className="dropdown-icon" size={16} />
                </div>
              </button>
            </div>
            <div className="token-usd-value">
              {fromAmount ? `~$${(parseFloat(fromAmount) * 2500).toFixed(2)}` : '~$0.00'}
            </div>
          </div>

          {/* Swap Arrow */}
          <div className="pancake-swap-arrow">
            <button className="swap-arrow-button" onClick={swapTokens}>
              <ArrowDownIcon size={20} />
            </button>
          </div>

          {/* To Token Section */}
          <div className="pancake-token-section">
            <div className="token-section-header">
              <span className="token-label">To (estimate)</span>
              <span className="token-balance">Balance: {toToken.balance}</span>
            </div>
            <div className="pancake-input-container">
              <input
                type="text"
                className="pancake-amount-input"
                placeholder="0.0"
                value={toAmount}
                onChange={(e) => setToAmount(e.target.value)}
              />
              <button 
                className="pancake-token-selector"
                onClick={() => openTokenModal('to')}
              >
                <div className="token-display">
                  <div 
                    className="token-logo"
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: toToken.symbol === 'ETH' ? '#627EEA' : 
                                 toToken.symbol === 'BTC' ? '#F7931A' :
                                 toToken.symbol === 'USDC' ? '#2775CA' :
                                 toToken.symbol === 'USDT' ? '#26A17B' :
                                 toToken.symbol === 'BNB' ? '#F3BA2F' :
                                 toToken.symbol === 'CAKE' ? '#D1884F' :
                                 toToken.symbol === 'UNI' ? '#FF007A' :
                                 toToken.symbol === 'LINK' ? '#375BD2' : '#1FC7D4',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '10px',
                      fontWeight: 'bold'
                    }}
                  >
                    {toToken.symbol.slice(0, 3)}
                  </div>
                  <span className="token-symbol">{toToken.symbol}</span>
                  <ChevronDownIcon className="dropdown-icon" size={16} />
                </div>
              </button>
            </div>
            <div className="token-usd-value">
              {toAmount ? `~$${(parseFloat(toAmount) * 1).toFixed(2)}` : '~$0.00'}
            </div>
          </div>

          {/* Swap Details */}
          {fromAmount && toAmount && (
            <div className="pancake-swap-details">
              <div className="swap-detail-row">
                <span className="detail-label">Price</span>
                <span className="detail-value">
                  1 {fromToken.symbol} = {(parseFloat(toAmount) / parseFloat(fromAmount)).toFixed(4)} {toToken.symbol}
                </span>
              </div>
              <div className="swap-detail-row">
                <span className="detail-label">Price Impact</span>
                <span className="detail-value price-impact-good">{'< 0.01%'}</span>
              </div>
            </div>
          )}

          {/* Swap Button */}
          <button 
            className={`pancake-swap-button ${!fromAmount || isSwapping ? 'disabled' : ''}`}
            onClick={!isConnected ? () => connect({ connector: connectors[0] }) : handleSwap}
            disabled={(!fromAmount && isConnected) || isSwapping}
          >
            {!isConnected ? (
              'Connect Wallet'
            ) : isSwapping ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
                <span>Swapping...</span>
              </div>
            ) : (
              'Swap'
            )}
          </button>
        </div>
      </div>

      {/* Token Selection Modal */}
      {isTokenModalOpen && (
        <div className="pancake-modal-overlay" onClick={() => setIsTokenModalOpen(false)}>
          <div className="pancake-token-modal" onClick={(e) => e.stopPropagation()}>
            <div className="pancake-modal-header">
              <h3>Select a Token</h3>
              <button 
                className="pancake-close-button" 
                onClick={() => setIsTokenModalOpen(false)}
              >
                <CloseIcon size={20} />
              </button>
            </div>
            
            <div className="pancake-search-container">
              <div className="search-input-wrapper">
                <SearchIcon className="search-icon" size={20} />
                <input 
                  type="text" 
                  placeholder="Search name or paste address" 
                  className="pancake-search-input" 
                />
              </div>
            </div>

            <div className="pancake-token-list">
              {tokens.map((token) => (
                <button
                  key={token.symbol}
                  className="pancake-token-item"
                  onClick={() => selectToken(token)}
                >
                  <div className="token-item-left">
                    <div 
                      className="token-item-logo"
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: token.symbol === 'ETH' ? '#627EEA' : 
                                   token.symbol === 'BTC' ? '#F7931A' :
                                   token.symbol === 'USDC' ? '#2775CA' :
                                   token.symbol === 'USDT' ? '#26A17B' :
                                   token.symbol === 'BNB' ? '#F3BA2F' :
                                   token.symbol === 'CAKE' ? '#D1884F' :
                                   token.symbol === 'UNI' ? '#FF007A' :
                                   token.symbol === 'LINK' ? '#375BD2' : '#1FC7D4',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}
                    >
                      {token.symbol.slice(0, 3)}
                    </div>
                    <div className="token-item-info">
                      <div className="token-item-symbol">{token.symbol}</div>
                      <div className="token-item-name">{token.name}</div>
                    </div>
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
