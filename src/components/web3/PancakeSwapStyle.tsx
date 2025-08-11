import React, { useState, useEffect } from 'react';
import { useAccount, useBalance, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits, formatUnits, erc20Abi, type Address } from 'viem';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownUp, Settings, ChevronDown, X, Loader2, AlertCircle, Zap } from 'lucide-react';
import { POPULAR_TOKENS, useTokenBalance, useTokenPrices } from '../../hooks/useTokens';
import './PancakeSwapStyle.css';

interface TokenData {
  address: Address;
  symbol: string;
  name: string;
  decimals: number;
  logoURI?: string;
}

interface SwapSettings {
  slippage: number;
  deadline: number;
}

export function PancakeSwapStyle() {
  const { address, isConnected, chain } = useAccount();
  const [fromToken, setFromToken] = useState<TokenData | null>(null);
  const [toToken, setToToken] = useState<TokenData | null>(null);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);
  const [tokenSelectType, setTokenSelectType] = useState<'from' | 'to'>('from');
  const [settings, setSettings] = useState<SwapSettings>({
    slippage: 0.5,
    deadline: 20
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Get available tokens for current chain
  const availableTokens = chain?.id ? POPULAR_TOKENS[chain.id] || [] : [];

  // Token balances
  const fromTokenBalance = useTokenBalance(fromToken?.address as Address);
  const toTokenBalance = useTokenBalance(toToken?.address as Address);

  // ETH balance
  const { data: ethBalance } = useBalance({ address });

  // Token prices
  const { prices } = useTokenPrices(
    [fromToken?.symbol, toToken?.symbol].filter(Boolean) as string[]
  );

  // Contract interactions
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Calculate exchange rate and output amount
  useEffect(() => {
    if (!fromAmount || !fromToken || !toToken || !prices) {
      setToAmount('');
      return;
    }

    const fromPrice = prices[fromToken.symbol.toLowerCase()]?.usd || 0;
    const toPrice = prices[toToken.symbol.toLowerCase()]?.usd || 0;

    if (fromPrice && toPrice) {
      const rate = fromPrice / toPrice;
      const calculatedAmount = (parseFloat(fromAmount) * rate).toFixed(6);
      setToAmount(calculatedAmount);
    }
  }, [fromAmount, fromToken, toToken, prices]);

  // Swap tokens
  const swapTokenPositions = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  // Open token selector
  const openTokenSelector = (type: 'from' | 'to') => {
    setTokenSelectType(type);
    setIsTokenModalOpen(true);
  };

  // Select token
  const selectToken = (token: TokenData) => {
    if (tokenSelectType === 'from') {
      setFromToken(token);
    } else {
      setToToken(token);
    }
    setIsTokenModalOpen(false);
  };

  // Format balance
  const formatBalance = (balance: bigint, decimals: number) => {
    return parseFloat(formatUnits(balance, decimals)).toFixed(4);
  };

  // Handle swap
  const handleSwap = async () => {
    if (!fromToken || !toToken || !fromAmount || !address) return;

    try {
      writeContract({
        address: fromToken.address,
        abi: erc20Abi,
        functionName: 'transfer',
        args: [address, parseUnits(fromAmount, fromToken.decimals)]
      });
    } catch (err) {
      console.error('Swap failed:', err);
    }
  };

  if (!isConnected) {
    return (
      <div className="pancake-swap-container">
        <div className="pancake-swap-card">
          <div className="connect-wallet-prompt">
            <div className="pancake-logo">🥞</div>
            <h3>Connect Wallet</h3>
            <p>You need to connect your wallet to start trading</p>
            <button className="connect-wallet-btn">Connect Wallet</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pancake-swap-container">
      <motion.div 
        className="pancake-swap-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="pancake-header">
          <div className="header-left">
            <div className="pancake-title">
              <Zap className="w-5 h-5 text-yellow-500" />
              <h2>Swap</h2>
            </div>
            <p className="header-subtitle">Trade tokens in an instant</p>
          </div>
          <button 
            className="pancake-settings-btn"
            onClick={() => setIsSettingsOpen(true)}
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* From Token */}
        <div className="pancake-token-section from-section">
          <div className="token-header">
            <span className="token-label">From</span>
            <span className="token-balance">
              Balance: {fromToken && fromTokenBalance 
                ? formatBalance(fromTokenBalance, fromToken.decimals)
                : '0.0000'
              }
            </span>
          </div>
          
          <div className="token-input-row">
            <input
              type="number"
              placeholder="0.0"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              className="pancake-amount-input"
            />
            
            <button
              className="pancake-token-selector"
              onClick={() => openTokenSelector('from')}
            >
              {fromToken ? (
                <div className="selected-token">
                  <img 
                    src={fromToken.logoURI} 
                    alt={fromToken.symbol}
                    className="token-logo"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <span className="token-symbol">{fromToken.symbol}</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
              ) : (
                <div className="select-token">
                  <span>Select a token</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
              )}
            </button>
          </div>

          {fromAmount && fromToken && prices[fromToken.symbol.toLowerCase()] && (
            <div className="usd-estimate">
              ~${(parseFloat(fromAmount) * prices[fromToken.symbol.toLowerCase()].usd).toFixed(2)}
            </div>
          )}
        </div>

        {/* Swap Arrow */}
        <div className="swap-arrow-section">
          <motion.button
            className="pancake-swap-arrow"
            onClick={swapTokenPositions}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowDownUp className="w-5 h-5" />
          </motion.button>
        </div>

        {/* To Token */}
        <div className="pancake-token-section to-section">
          <div className="token-header">
            <span className="token-label">To</span>
            <span className="token-balance">
              Balance: {toToken && toTokenBalance 
                ? formatBalance(toTokenBalance, toToken.decimals)
                : '0.0000'
              }
            </span>
          </div>
          
          <div className="token-input-row">
            <input
              type="number"
              placeholder="0.0"
              value={toAmount}
              onChange={(e) => setToAmount(e.target.value)}
              className="pancake-amount-input"
              readOnly
            />
            
            <button
              className="pancake-token-selector"
              onClick={() => openTokenSelector('to')}
            >
              {toToken ? (
                <div className="selected-token">
                  <img 
                    src={toToken.logoURI} 
                    alt={toToken.symbol}
                    className="token-logo"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <span className="token-symbol">{toToken.symbol}</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
              ) : (
                <div className="select-token">
                  <span>Select a token</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
              )}
            </button>
          </div>

          {toAmount && toToken && prices[toToken.symbol.toLowerCase()] && (
            <div className="usd-estimate">
              ~${(parseFloat(toAmount) * prices[toToken.symbol.toLowerCase()].usd).toFixed(2)}
            </div>
          )}
        </div>

        {/* Trade Info */}
        {fromToken && toToken && fromAmount && toAmount && (
          <div className="trade-info">
            <div className="info-row">
              <span className="info-label">Price</span>
              <span className="info-value">
                1 {fromToken.symbol} = {(parseFloat(toAmount) / parseFloat(fromAmount)).toFixed(6)} {toToken.symbol}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Slippage Tolerance</span>
              <span className="info-value">{settings.slippage}%</span>
            </div>
          </div>
        )}

        {/* Swap Button */}
        <motion.button
          className="pancake-swap-btn"
          onClick={handleSwap}
          disabled={!fromToken || !toToken || !fromAmount || isPending || isConfirming}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isPending || isConfirming ? (
            <div className="btn-loading">
              <Loader2 className="w-5 h-5 animate-spin" />
              {isPending ? 'Confirm in Wallet' : 'Processing...'}
            </div>
          ) : !fromToken || !toToken ? (
            'Select a token'
          ) : !fromAmount ? (
            'Enter an amount'
          ) : (
            'Swap'
          )}
        </motion.button>

        {/* Error Message */}
        {error && (
          <div className="error-alert">
            <AlertCircle className="w-4 h-4" />
            <span>{error.message}</span>
          </div>
        )}

        {/* Success Message */}
        {isConfirmed && (
          <motion.div 
            className="success-alert"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            ✅ Transaction successful!
          </motion.div>
        )}
      </motion.div>

      {/* Token Selection Modal */}
      <Dialog.Root open={isTokenModalOpen} onOpenChange={setIsTokenModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="pancake-overlay" />
          <Dialog.Content className="pancake-modal">
            <div className="modal-header">
              <Dialog.Title className="modal-title">
                Select a Token
              </Dialog.Title>
              <Dialog.Close className="modal-close">
                <X className="w-5 h-5" />
              </Dialog.Close>
            </div>

            <div className="token-search">
              <input
                type="text"
                placeholder="Search name or paste address"
                className="search-input"
              />
            </div>

            <div className="common-tokens">
              <div className="common-label">Common tokens</div>
              <div className="common-chips">
                {availableTokens.slice(0, 4).map((token) => (
                  <button
                    key={token.address}
                    className="common-chip"
                    onClick={() => selectToken(token)}
                  >
                    <img 
                      src={token.logoURI} 
                      alt={token.symbol}
                      className="chip-icon"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                    {token.symbol}
                  </button>
                ))}
              </div>
            </div>

            <div className="token-list">
              <AnimatePresence>
                {availableTokens.map((token, index) => (
                  <motion.button
                    key={token.address}
                    className="token-list-item"
                    onClick={() => selectToken(token)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ backgroundColor: 'rgba(255, 184, 77, 0.1)' }}
                  >
                    <div className="token-info">
                      <img 
                        src={token.logoURI} 
                        alt={token.symbol}
                        className="token-list-icon"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                      <div className="token-details">
                        <div className="token-name">{token.symbol}</div>
                        <div className="token-full-name">{token.name}</div>
                      </div>
                    </div>
                    <div className="token-balance-info">
                      {formatBalance(useTokenBalance(token.address), token.decimals)}
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Settings Modal */}
      <Dialog.Root open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="pancake-overlay" />
          <Dialog.Content className="pancake-modal">
            <div className="modal-header">
              <Dialog.Title className="modal-title">
                Settings
              </Dialog.Title>
              <Dialog.Close className="modal-close">
                <X className="w-5 h-5" />
              </Dialog.Close>
            </div>

            <div className="settings-content">
              <div className="setting-section">
                <label className="setting-label">Slippage tolerance</label>
                <div className="slippage-options">
                  {[0.1, 0.5, 1.0].map(value => (
                    <button
                      key={value}
                      className={`slippage-option ${settings.slippage === value ? 'active' : ''}`}
                      onClick={() => setSettings(prev => ({ ...prev, slippage: value }))}
                    >
                      {value}%
                    </button>
                  ))}
                  <input
                    type="number"
                    placeholder="Custom"
                    className="custom-slippage"
                    onChange={(e) => setSettings(prev => ({ 
                      ...prev, 
                      slippage: parseFloat(e.target.value) || 0.5 
                    }))}
                  />
                </div>
              </div>

              <div className="setting-section">
                <label className="setting-label">Transaction deadline</label>
                <div className="deadline-setting">
                  <input
                    type="number"
                    value={settings.deadline}
                    onChange={(e) => setSettings(prev => ({ 
                      ...prev, 
                      deadline: parseInt(e.target.value) || 20 
                    }))}
                    className="deadline-input"
                  />
                  <span className="deadline-unit">minutes</span>
                </div>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

export default PancakeSwapStyle;