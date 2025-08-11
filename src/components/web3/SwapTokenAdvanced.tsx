import React, { useState, useEffect } from 'react';
import { useAccount, useBalance, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits, formatUnits, erc20Abi, type Address } from 'viem';
import * as Dialog from '@radix-ui/react-dialog';
import * as Select from '@radix-ui/react-select';
import * as Tooltip from '@radix-ui/react-tooltip';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownUp, Settings, ChevronDown, X, Loader2, AlertCircle } from 'lucide-react';
import { POPULAR_TOKENS, useTokenBalance, useTokenPrices } from '../../hooks/useTokens';
import './SwapTokenAdvanced.css';

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
  gasPrice: string;
}

export function SwapTokenAdvanced() {
  const { address, isConnected, chain } = useAccount();
  const [fromToken, setFromToken] = useState<TokenData | null>(null);
  const [toToken, setToToken] = useState<TokenData | null>(null);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);
  const [tokenSelectType, setTokenSelectType] = useState<'from' | 'to'>('from');
  const [settings, setSettings] = useState<SwapSettings>({
    slippage: 0.5,
    deadline: 20,
    gasPrice: 'auto'
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

  // Token allowance check
  const { data: allowance } = useReadContract({
    address: fromToken?.address,
    abi: erc20Abi,
    functionName: 'allowance',
    args: address && fromToken ? [address, fromToken.address] : undefined,
    query: { enabled: !!address && !!fromToken }
  });

  const needsApproval = fromToken && fromAmount && allowance !== undefined &&
    parseUnits(fromAmount, fromToken.decimals) > (allowance as bigint);

  // Handle token approval
  const handleApprove = async () => {
    if (!fromToken || !fromAmount) return;

    writeContract({
      address: fromToken.address,
      abi: erc20Abi,
      functionName: 'approve',
      args: [fromToken.address, parseUnits(fromAmount, fromToken.decimals)]
    });
  };

  // Handle swap
  const handleSwap = async () => {
    if (!fromToken || !toToken || !fromAmount || !address) return;

    try {
      // This is a simplified swap - in real implementation you'd use Uniswap Router
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

  if (!isConnected) {
    return (
      <div className="swap-container">
        <div className="swap-card">
          <div className="connect-prompt">
            <AlertCircle className="w-12 h-12 text-yellow-500 mb-4" />
            <h3>Connect Your Wallet</h3>
            <p>Please connect your wallet to start swapping tokens</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="swap-container">
      <motion.div 
        className="swap-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="swap-header">
          <h2>Swap</h2>
          <div className="header-actions">
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button 
                    className="settings-btn"
                    onClick={() => setIsSettingsOpen(true)}
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content className="tooltip-content">
                    Swap Settings
                    <Tooltip.Arrow className="tooltip-arrow" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
          </div>
        </div>

        {/* From Token */}
        <div className="token-section">
          <div className="section-header">
            <span className="section-label">From</span>
            <span className="balance">
              Balance: {fromToken && fromTokenBalance 
                ? formatBalance(fromTokenBalance, fromToken.decimals)
                : '0.0000'
              }
            </span>
          </div>
          
          <div className="token-input-container">
            <input
              type="number"
              placeholder="0.0"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              className="token-amount-input"
            />
            
            <button
              className="token-selector"
              onClick={() => openTokenSelector('from')}
            >
              {fromToken ? (
                <>
                  <img 
                    src={fromToken.logoURI} 
                    alt={fromToken.symbol}
                    className="token-icon"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <span>{fromToken.symbol}</span>
                </>
              ) : (
                <span>Select token</span>
              )}
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {fromAmount && fromToken && prices[fromToken.symbol.toLowerCase()] && (
            <div className="usd-value">
              ~${(parseFloat(fromAmount) * prices[fromToken.symbol.toLowerCase()].usd).toFixed(2)}
            </div>
          )}
        </div>

        {/* Swap Arrow */}
        <div className="swap-arrow-container">
          <motion.button
            className="swap-arrow-btn"
            onClick={swapTokenPositions}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowDownUp className="w-5 h-5" />
          </motion.button>
        </div>

        {/* To Token */}
        <div className="token-section">
          <div className="section-header">
            <span className="section-label">To</span>
            <span className="balance">
              Balance: {toToken && toTokenBalance 
                ? formatBalance(toTokenBalance, toToken.decimals)
                : '0.0000'
              }
            </span>
          </div>
          
          <div className="token-input-container">
            <input
              type="number"
              placeholder="0.0"
              value={toAmount}
              onChange={(e) => setToAmount(e.target.value)}
              className="token-amount-input"
              readOnly
            />
            
            <button
              className="token-selector"
              onClick={() => openTokenSelector('to')}
            >
              {toToken ? (
                <>
                  <img 
                    src={toToken.logoURI} 
                    alt={toToken.symbol}
                    className="token-icon"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <span>{toToken.symbol}</span>
                </>
              ) : (
                <span>Select token</span>
              )}
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {toAmount && toToken && prices[toToken.symbol.toLowerCase()] && (
            <div className="usd-value">
              ~${(parseFloat(toAmount) * prices[toToken.symbol.toLowerCase()].usd).toFixed(2)}
            </div>
          )}
        </div>

        {/* Swap Rate Info */}
        {fromToken && toToken && fromAmount && toAmount && (
          <div className="swap-info">
            <div className="rate-info">
              1 {fromToken.symbol} = {(parseFloat(toAmount) / parseFloat(fromAmount)).toFixed(6)} {toToken.symbol}
            </div>
            <div className="fee-info">
              Network fee: ~${(Math.random() * 10 + 1).toFixed(2)}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="action-buttons">
          {needsApproval ? (
            <motion.button
              className="approve-btn"
              onClick={handleApprove}
              disabled={isPending}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Approving...
                </>
              ) : (
                `Approve ${fromToken?.symbol}`
              )}
            </motion.button>
          ) : (
            <motion.button
              className="swap-btn"
              onClick={handleSwap}
              disabled={!fromToken || !toToken || !fromAmount || isPending || isConfirming}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isPending || isConfirming ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {isPending ? 'Confirming...' : 'Processing...'}
                </>
              ) : (
                'Swap'
              )}
            </motion.button>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="error-message">
            <AlertCircle className="w-4 h-4" />
            {error.message}
          </div>
        )}

        {/* Success Message */}
        {isConfirmed && (
          <motion.div 
            className="success-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            ✅ Swap completed successfully!
          </motion.div>
        )}
      </motion.div>

      {/* Token Selection Modal */}
      <Dialog.Root open={isTokenModalOpen} onOpenChange={setIsTokenModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content className="dialog-content">
            <div className="dialog-header">
              <Dialog.Title className="dialog-title">
                Select a token
              </Dialog.Title>
              <Dialog.Close className="dialog-close">
                <X className="w-4 h-4" />
              </Dialog.Close>
            </div>

            <div className="token-search">
              <input
                type="text"
                placeholder="Search name or paste address"
                className="search-input"
              />
            </div>

            <div className="token-list">
              <AnimatePresence>
                {availableTokens.map((token, index) => (
                  <motion.button
                    key={token.address}
                    className="token-item"
                    onClick={() => selectToken(token)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ backgroundColor: 'var(--bg-hover)' }}
                  >
                    <div className="token-item-left">
                      <img 
                        src={token.logoURI} 
                        alt={token.symbol}
                        className="token-item-icon"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                      <div className="token-item-info">
                        <div className="token-symbol">{token.symbol}</div>
                        <div className="token-name">{token.name}</div>
                      </div>
                    </div>
                    <div className="token-balance">
                      0.0000
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
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content className="dialog-content">
            <div className="dialog-header">
              <Dialog.Title className="dialog-title">
                Transaction Settings
              </Dialog.Title>
              <Dialog.Close className="dialog-close">
                <X className="w-4 h-4" />
              </Dialog.Close>
            </div>

            <div className="settings-content">
              <div className="setting-group">
                <label>Slippage Tolerance</label>
                <div className="slippage-buttons">
                  {[0.1, 0.5, 1.0].map(value => (
                    <button
                      key={value}
                      className={`slippage-btn ${settings.slippage === value ? 'active' : ''}`}
                      onClick={() => setSettings(prev => ({ ...prev, slippage: value }))}
                    >
                      {value}%
                    </button>
                  ))}
                  <input
                    type="number"
                    placeholder="Custom"
                    className="slippage-input"
                    onChange={(e) => setSettings(prev => ({ 
                      ...prev, 
                      slippage: parseFloat(e.target.value) || 0.5 
                    }))}
                  />
                </div>
              </div>

              <div className="setting-group">
                <label>Transaction Deadline</label>
                <div className="deadline-input">
                  <input
                    type="number"
                    value={settings.deadline}
                    onChange={(e) => setSettings(prev => ({ 
                      ...prev, 
                      deadline: parseInt(e.target.value) || 20 
                    }))}
                  />
                  <span>minutes</span>
                </div>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

export default SwapTokenAdvanced;