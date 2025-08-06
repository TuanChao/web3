import { useAccount, useBalance, useChainId } from 'wagmi'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card'
import { formatBalance, formatAddress } from '../../utils'
import './Web3.css'

export function WalletInfo() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const { data: balance } = useBalance({
    address,
  })

  if (!isConnected || !address) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Wallet Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="wallet-info-label">Please connect your wallet to view information.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Wallet Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="wallet-info-section">
          <label className="wallet-info-label">Address</label>
          <p className="wallet-info-value">{formatAddress(address)}</p>
        </div>
        <div className="wallet-info-section">
          <label className="wallet-info-label">Chain ID</label>
          <p className="wallet-info-value">{chainId}</p>
        </div>
        {balance && (
          <div className="wallet-info-section">
            <label className="wallet-info-label">Balance</label>
            <p className="wallet-info-value">
              {formatBalance(balance.formatted)} {balance.symbol}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
