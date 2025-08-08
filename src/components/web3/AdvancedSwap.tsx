import React, { useState } from 'react'
import { useAccount, useBalance, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther, formatEther, type Address } from 'viem'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card'
import { Button } from '../ui/Button'
import { ArrowDownUp, Loader2 } from 'lucide-react'
import './Web3.css'

// Simple ERC20 ABI for token operations
const ERC20_ABI = [
  {
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function'
  }
] as const

export function AdvancedSwap() {
  const { address, isConnected } = useAccount()
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { data: ethBalance } = useBalance({
    address,
  })

  const { writeContract, data: hash, isPending } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  const handleSwap = async () => {
    if (!fromAmount || !address) return

    try {
      setIsLoading(true)
      
      // For demo purposes, we'll simulate a simple ETH transfer
      // In a real app, you'd integrate with a DEX aggregator like 1inch or Uniswap
      const amountInWei = parseEther(fromAmount)
      
      // This is a simple transfer, not a real swap
      // Replace with actual DEX router contract calls
      await writeContract({
        address: '0x' + '0'.repeat(40) as Address, // Placeholder address
        abi: ERC20_ABI,
        functionName: 'transfer',
        args: [address, amountInWei]
      })
      
    } catch (error) {
      console.error('Swap failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const calculateToAmount = (fromValue: string) => {
    if (!fromValue) return ''
    // Mock calculation - 1 ETH = 2500 USDC
    const rate = 2500
    return (parseFloat(fromValue) * rate).toFixed(2)
  }

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value)
    setToAmount(calculateToAmount(value))
  }

  const swapTokens = () => {
    const tempFrom = fromAmount
    const tempTo = toAmount
    setFromAmount(tempTo)
    setToAmount(tempFrom)
  }

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Advanced Swap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="swap-empty">
            <p>Connect your wallet to start trading</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Advanced Swap</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="swap-container">
          {/* From Token */}
          <div className="swap-token-section">
            <div className="swap-token-header">
              <span>From</span>
              <span className="swap-balance">
                Balance: {ethBalance ? formatEther(ethBalance.value) : '0'} ETH
              </span>
            </div>
            <div className="swap-token-input">
              <input
                type="number"
                placeholder="0.0"
                value={fromAmount}
                onChange={(e) => handleFromAmountChange(e.target.value)}
                className="swap-input"
              />
              <div className="swap-token-info">
                <div className="swap-token-symbol">ETH</div>
                <div className="swap-token-name">Ethereum</div>
              </div>
            </div>
          </div>

          {/* Swap Button */}
          <div className="swap-divider">
            <Button
              variant="outline"
              size="sm"
              onClick={swapTokens}
              className="swap-flip-btn"
            >
              <ArrowDownUp className="w-4 h-4" />
            </Button>
          </div>

          {/* To Token */}
          <div className="swap-token-section">
            <div className="swap-token-header">
              <span>To</span>
              <span className="swap-balance">Balance: 0 USDC</span>
            </div>
            <div className="swap-token-input">
              <input
                type="number"
                placeholder="0.0"
                value={toAmount}
                readOnly
                className="swap-input"
              />
              <div className="swap-token-info">
                <div className="swap-token-symbol">USDC</div>
                <div className="swap-token-name">USD Coin</div>
              </div>
            </div>
          </div>

          {/* Swap Details */}
          {fromAmount && (
            <div className="swap-details">
              <div className="swap-detail-row">
                <span>Rate</span>
                <span>1 ETH = 2500 USDC</span>
              </div>
              <div className="swap-detail-row">
                <span>Slippage</span>
                <span>0.5%</span>
              </div>
              <div className="swap-detail-row">
                <span>Network Fee</span>
                <span>~$5</span>
              </div>
            </div>
          )}

          {/* Swap Button */}
          <Button
            onClick={handleSwap}
            disabled={!fromAmount || isPending || isConfirming}
            className="swap-btn"
          >
            {isPending || isConfirming ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                {isPending ? 'Confirming...' : 'Processing...'}
              </>
            ) : (
              'Swap'
            )}
          </Button>

          {/* Transaction Status */}
          {hash && (
            <div className="swap-status">
              <div>Transaction Hash: {hash}</div>
              {isConfirming && <div>Waiting for confirmation...</div>}
              {isConfirmed && <div>Transaction confirmed!</div>}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
