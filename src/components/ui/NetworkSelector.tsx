import { useState } from 'react'
import './NetworkSelector.css'

interface Network {
  id: string
  name: string
  icon: string
  chainId: number
}

const networks: Network[] = [
  {
    id: 'bsc',
    name: 'BSC',
    icon: 'https://assets.pancakeswap.finance/web/chains/56.png',
    chainId: 56
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    icon: 'https://assets.pancakeswap.finance/web/chains/1.png',
    chainId: 1
  },
  {
    id: 'arbitrum',
    name: 'Arbitrum One',
    icon: 'https://assets.pancakeswap.finance/web/chains/42161.png',
    chainId: 42161
  },
  {
    id: 'base',
    name: 'Base',
    icon: 'https://assets.pancakeswap.finance/web/chains/8453.png',
    chainId: 8453
  },
  {
    id: 'linea',
    name: 'Linea',
    icon: 'https://assets.pancakeswap.finance/web/chains/59144.png',
    chainId: 59144
  }
]

export function NetworkSelector() {
  const [selectedNetwork, setSelectedNetwork] = useState<Network>(networks[0])
  const [isOpen, setIsOpen] = useState(false)

  const handleNetworkSelect = (network: Network) => {
    setSelectedNetwork(network)
    setIsOpen(false)
    // Here you would integrate with Wagmi to switch networks
    console.log('Switching to network:', network.name)
  }

  return (
    <div className="network-selector-container">
      <button 
        className="network-selector-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img 
          src={selectedNetwork.icon} 
          alt={selectedNetwork.name} 
          width={20} 
          height={20} 
        />
        <span>{selectedNetwork.name}</span>
        <svg 
          className={`network-dropdown-arrow ${isOpen ? 'open' : ''}`}
          width="12" 
          height="12" 
          viewBox="0 0 12 12"
        >
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="network-dropdown-overlay" onClick={() => setIsOpen(false)} />
          <div className="network-dropdown">
            <div className="network-dropdown-header">
              <h3>Select Network</h3>
            </div>
            <div className="network-list">
              {networks.map((network) => (
                <button
                  key={network.id}
                  className={`network-option ${selectedNetwork.id === network.id ? 'selected' : ''}`}
                  onClick={() => handleNetworkSelect(network)}
                >
                  <img 
                    src={network.icon} 
                    alt={network.name} 
                    width={24} 
                    height={24} 
                  />
                  <span>{network.name}</span>
                  {selectedNetwork.id === network.id && (
                    <div className="network-selected-indicator">
                      <svg width="16" height="16" viewBox="0 0 16 16">
                        <path 
                          d="M13.5 4.5L6 12L2.5 8.5" 
                          stroke="#1fc7d4" 
                          strokeWidth="2" 
                          fill="none"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
