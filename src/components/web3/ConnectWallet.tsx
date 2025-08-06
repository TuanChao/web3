import './Web3.css'
import { useState } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Button } from '../ui/Button'
import { formatAddress } from '../../utils'

export function ConnectWallet() {
  const { address, isConnected } = useAccount()
  const { connect, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleConnect = (connector: any) => {
    connect({ connector })
    setIsModalOpen(false)
  }

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  if (isConnected && address) {
    return (
      <div className="wallet-connected">
        <div className="wallet-connected-info">
          <div className="wallet-status-indicator"></div>
          <div className="wallet-address-section">
            <span className="wallet-status-text">Connected</span>
            <span className="wallet-address">{formatAddress(address)}</span>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={() => disconnect()}>
          Disconnect
        </Button>
      </div>
    )
  }

  return (
    <>
      <Button variant="primary" onClick={openModal}>
        Connect Wallet
      </Button>

      {isModalOpen && (
        <div className="wallet-modal-overlay" onClick={closeModal}>
          <div className="wallet-modal" onClick={(e) => e.stopPropagation()}>
            <div className="wallet-modal-header">
              <h3>Connect Wallet</h3>
              <button className="modal-close-btn" onClick={closeModal}>
                ✕
              </button>
            </div>
            
            <div className="wallet-modal-content">
              <p className="wallet-modal-description">
                Choose your preferred wallet to connect
              </p>
              
              <div className="wallet-options-grid">
                {connectors.map((connector) => (
                  <button
                    key={connector.uid}
                    className="wallet-option-modal"
                    onClick={() => handleConnect(connector)}
                    disabled={isPending}
                  >
                    <div className="wallet-option-content">
                      {connector.icon && (
                        <img 
                          src={connector.icon} 
                          alt={connector.name} 
                          className="wallet-icon"
                        />
                      )}
                      <span className="wallet-name">{connector.name}</span>
                      {isPending && (
                        <div className="wallet-loading">
                          <div className="loading-spinner"></div>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="wallet-modal-footer">
                <span>New to Web3? Learn more about wallets</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
