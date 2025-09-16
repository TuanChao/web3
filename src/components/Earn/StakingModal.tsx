import React, { useState, useEffect } from 'react';
import { useAccount, useBalance } from 'wagmi';
import './StakingModal.css';
import { 
  X, 
  Coins, 
  TrendingUp, 
  Shield, 
  Clock, 
  AlertTriangle,
  Calculator,
  ChevronDown,
  Info,
  CheckCircle
} from 'lucide-react';

interface StakingModalProps {
  isOpen: boolean;
  onClose: () => void;
  farm?: {
    id: string;
    pair: string;
    protocol: string;
    apy: number;
    tvl: string;
    userStaked: number;
    rewards: string[];
  };
  protocol?: {
    id: string;
    name: string;
    category: string;
    tvl: string;
    apy: string;
    icon: string;
  };
}

const StakingModal: React.FC<StakingModalProps> = ({ isOpen, onClose, farm, protocol }) => {
  const { address, isConnected } = useAccount();
  const { data: ethBalance } = useBalance({ address });
  
  const [amount, setAmount] = useState<string>('');
  const [duration, setDuration] = useState<'flexible' | '30d' | '90d' | '365d'>('flexible');
  const [isStaking, setIsStaking] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const stakingOptions = [
    { 
      id: 'flexible', 
      label: 'Flexible', 
      description: 'Unstake anytime',
      multiplier: 1,
      lockPeriod: 'No lock'
    },
    { 
      id: '30d', 
      label: '30 Days', 
      description: '30 day lock period',
      multiplier: 1.1,
      lockPeriod: '30 days'
    },
    { 
      id: '90d', 
      label: '90 Days', 
      description: '90 day lock period',
      multiplier: 1.25,
      lockPeriod: '90 days'
    },
    { 
      id: '365d', 
      label: '1 Year', 
      description: '365 day lock period',
      multiplier: 1.5,
      lockPeriod: '1 year'
    }
  ];

  const currentOption = stakingOptions.find(opt => opt.id === duration);
  const baseApy = farm?.apy || parseFloat(protocol?.apy?.replace('%', '') || '0');
  const boostedApy = baseApy * (currentOption?.multiplier || 1);
  const amountValue = parseFloat(amount) || 0;
  const estimatedRewards = (amountValue * boostedApy) / 100 / 365; // Daily rewards

  useEffect(() => {
    if (!isOpen) {
      setAmount('');
      setDuration('flexible');
      setIsStaking(false);
      setShowSuccess(false);
    }
  }, [isOpen]);

  const handleStake = async () => {
    if (!amount || !isConnected) return;
    
    setIsStaking(true);
    
    // Simulate staking transaction
    setTimeout(() => {
      setIsStaking(false);
      setShowSuccess(true);
      
      // Auto close after success
      setTimeout(() => {
        onClose();
      }, 2000);
    }, 3000);
  };

  const setMaxAmount = () => {
    if (ethBalance) {
      // Reserve 0.01 ETH for gas
      const maxAmount = Math.max(0, parseFloat(ethBalance.formatted) - 0.01);
      setAmount(maxAmount.toString());
    }
  };

  if (!isOpen) return null;

  const title = farm ? `Stake in ${farm.pair}` : `Stake ${protocol?.name}`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="staking-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="header-info">
            <div className="header-icon">
              {farm ? <TrendingUp className="w-6 h-6" /> : <Coins className="w-6 h-6" />}
            </div>
            <div>
              <h3>{title}</h3>
              <p>{farm?.protocol || protocol?.category}</p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {showSuccess ? (
          <div className="success-content">
            <div className="success-icon">
              <CheckCircle className="w-16 h-16" />
            </div>
            <h4>Staking Successful!</h4>
            <p>Your tokens have been staked successfully</p>
            <div className="success-details">
              <div className="detail">
                <span>Amount Staked:</span>
                <span>{amount} ETH</span>
              </div>
              <div className="detail">
                <span>APY:</span>
                <span>{boostedApy.toFixed(2)}%</span>
              </div>
              <div className="detail">
                <span>Lock Period:</span>
                <span>{currentOption?.lockPeriod}</span>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* APY Display */}
            <div className="apy-display">
              <div className="apy-card">
                <div className="apy-header">
                  <span>Current APY</span>
                  <div className="apy-boost">
                    {currentOption?.multiplier !== 1 && (
                      <span className="boost-badge">
                        {((currentOption?.multiplier || 1) - 1) * 100}% Boost
                      </span>
                    )}
                  </div>
                </div>
                <div className="apy-value">{boostedApy.toFixed(2)}%</div>
                {currentOption?.multiplier !== 1 && (
                  <div className="apy-breakdown">
                    Base: {baseApy}% × {currentOption?.multiplier}x multiplier
                  </div>
                )}
              </div>
            </div>

            {/* Staking Duration */}
            <div className="duration-section">
              <div className="section-header">
                <h4>Staking Duration</h4>
                <div className="info-tooltip">
                  <Info className="w-4 h-4" />
                  <span className="tooltip-text">Longer periods earn higher rewards</span>
                </div>
              </div>
              
              <div className="duration-options">
                {stakingOptions.map((option) => (
                  <button
                    key={option.id}
                    className={`duration-option ${duration === option.id ? 'active' : ''}`}
                    onClick={() => setDuration(option.id as any)}
                  >
                    <div className="option-header">
                      <span className="option-label">{option.label}</span>
                      {option.multiplier > 1 && (
                        <span className="multiplier-badge">{option.multiplier}x</span>
                      )}
                    </div>
                    <div className="option-description">{option.description}</div>
                    <div className="option-apy">{(baseApy * option.multiplier).toFixed(2)}% APY</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Amount Input */}
            <div className="amount-section">
              <div className="section-header">
                <h4>Amount to Stake</h4>
                <div className="balance-info">
                  Balance: {ethBalance?.formatted ? parseFloat(ethBalance.formatted).toFixed(4) : '0'} ETH
                </div>
              </div>
              
              <div className="amount-input-container">
                <div className="input-wrapper">
                  <input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="amount-input"
                  />
                  <div className="input-suffix">
                    <span className="token-symbol">ETH</span>
                    <button className="max-btn" onClick={setMaxAmount}>
                      MAX
                    </button>
                  </div>
                </div>
                
                <div className="quick-amounts">
                  {[25, 50, 75].map((percent) => (
                    <button
                      key={percent}
                      className="quick-amount-btn"
                      onClick={() => {
                        if (ethBalance) {
                          const balance = parseFloat(ethBalance.formatted);
                          const reserveGas = 0.01;
                          const maxUsable = Math.max(0, balance - reserveGas);
                          const amount = (maxUsable * percent) / 100;
                          setAmount(amount.toString());
                        }
                      }}
                    >
                      {percent}%
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Rewards Calculator */}
            {amountValue > 0 && (
              <div className="rewards-calculator">
                <div className="calculator-header">
                  <Calculator className="w-4 h-4" />
                  <h4>Expected Rewards</h4>
                </div>
                
                <div className="rewards-breakdown">
                  <div className="reward-item">
                    <span>Daily Rewards:</span>
                    <span>{estimatedRewards.toFixed(6)} ETH</span>
                  </div>
                  <div className="reward-item">
                    <span>Monthly Rewards:</span>
                    <span>{(estimatedRewards * 30).toFixed(4)} ETH</span>
                  </div>
                  <div className="reward-item">
                    <span>Yearly Rewards:</span>
                    <span>{(estimatedRewards * 365).toFixed(2)} ETH</span>
                  </div>
                </div>
                
                <div className="reward-note">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Rewards are estimates and may vary based on network conditions</span>
                </div>
              </div>
            )}

            {/* Risk Information */}
            <div className="risk-info">
              <div className="risk-header">
                <Shield className="w-4 h-4" />
                <span>Risk Information</span>
              </div>
              <div className="risk-items">
                <div className="risk-item">
                  <span>Smart Contract Risk:</span>
                  <span className="risk-level low">Low</span>
                </div>
                <div className="risk-item">
                  <span>Impermanent Loss:</span>
                  <span className="risk-level medium">
                    {farm ? 'Medium' : 'N/A'}
                  </span>
                </div>
                <div className="risk-item">
                  <span>Liquidity Risk:</span>
                  <span className="risk-level low">Low</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="modal-actions">
              <button className="action-btn secondary" onClick={onClose}>
                Cancel
              </button>
              <button 
                className={`action-btn primary ${!amount || !isConnected || isStaking ? 'disabled' : ''}`}
                onClick={handleStake}
                disabled={!amount || !isConnected || isStaking}
              >
                {isStaking ? (
                  <>
                    <div className="loading-spinner"></div>
                    Staking...
                  </>
                ) : (
                  <>
                    <Coins className="w-4 h-4" />
                    Stake {amount || '0'} ETH
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>

    </div>
  );
};

export default StakingModal;