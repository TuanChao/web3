import React from 'react'
import { useAccount } from 'wagmi'
import { useTransactionHistory } from '../../hooks/useTransactions'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card'
import { formatAddress } from '../../utils'
import { Activity, ArrowUpRight, ArrowDownLeft, Clock, CheckCircle, XCircle } from 'lucide-react'
import './Web3.css'

export function TransactionHistory() {
  const { address, isConnected } = useAccount()
  const { transactions, isLoading, error } = useTransactionHistory()

  if (!isConnected || !address) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Transaction History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="transaction-empty">
            <p>Connect your wallet to view transaction history</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Transaction History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="transaction-loading">
            <div className="loading-spinner"></div>
            <p>Loading transactions...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Transaction History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="transaction-error">
            <p>Error loading transactions: {error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp)
    const now = Date.now()
    const diff = now - timestamp
    
    if (diff < 60000) return 'Just now'
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
    return date.toLocaleDateString()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Transaction History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="transaction-empty">
            <p>No transactions found</p>
          </div>
        ) : (
          <div className="transaction-list">
            {transactions.map((tx) => {
              const isIncoming = tx.to.toLowerCase() === address.toLowerCase()
              const isOutgoing = tx.from.toLowerCase() === address.toLowerCase()

              return (
                <div key={tx.hash} className="transaction-item">
                  <div className="transaction-icon">
                    {tx.status === 'success' ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-500" />
                    )}
                  </div>

                  <div className="transaction-details">
                    <div className="transaction-header">
                      <div className="transaction-type">
                        {isIncoming && <ArrowDownLeft className="w-4 h-4 text-green-500" />}
                        {isOutgoing && <ArrowUpRight className="w-4 h-4 text-red-500" />}
                        <span>
                          {isIncoming ? 'Received' : 'Sent'} ETH
                        </span>
                      </div>
                      <div className="transaction-value">
                        {isIncoming ? '+' : '-'}{tx.value} ETH
                      </div>
                    </div>

                    <div className="transaction-info">
                      <div className="transaction-addresses">
                        <span className="transaction-label">From:</span>
                        <span className="transaction-address">{formatAddress(tx.from)}</span>
                        <span className="transaction-label">To:</span>
                        <span className="transaction-address">{formatAddress(tx.to)}</span>
                      </div>
                      
                      <div className="transaction-meta">
                        <div className="transaction-time">
                          <Clock className="w-3 h-3" />
                          <span>{formatTimestamp(tx.timestamp)}</span>
                        </div>
                        <div className="transaction-hash">
                          <span>Hash: {formatAddress(tx.hash)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Token transfers if any */}
                    {tx.tokenTransfers && tx.tokenTransfers.length > 0 && (
                      <div className="transaction-tokens">
                        <div className="transaction-tokens-title">Token Transfers:</div>
                        {tx.tokenTransfers.map((transfer, index) => (
                          <div key={index} className="transaction-token-transfer">
                            <span className="token-amount">
                              {transfer.value} {transfer.tokenSymbol}
                            </span>
                            <span className="token-direction">
                              {transfer.to.toLowerCase() === address.toLowerCase() ? 'received' : 'sent'}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="transaction-actions">
                    <button
                      className="transaction-view-btn"
                      onClick={() => {
                        const explorerUrl = getExplorerUrl(tx.hash)
                        if (explorerUrl) window.open(explorerUrl, '_blank')
                      }}
                    >
                      View
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function getExplorerUrl(txHash: string): string | null {
  // This would be dynamic based on current chain
  // For now, default to Etherscan
  return `https://etherscan.io/tx/${txHash}`
}
