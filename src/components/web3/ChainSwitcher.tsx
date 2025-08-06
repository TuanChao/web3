import './Web3.css'
import { useSwitchChain, useChainId } from 'wagmi'
import { mainnet, polygon, arbitrum, optimism, base } from 'wagmi/chains'
import { Button } from '../ui/Button'

const supportedChains = [mainnet, polygon, arbitrum, optimism, base]

export function ChainSwitcher() {
  const chainId = useChainId()
  const { switchChain, isPending } = useSwitchChain()

  const currentChain = supportedChains.find(chain => chain.id === chainId)

  return (
    <div className="chain-switcher">
      <h3 className="chain-switcher-header">Current Network</h3>
      {currentChain && (
        <div className="chain-switcher-current">
          <div className="chain-switcher-dot"></div>
          <span>{currentChain.name}</span>
        </div>
      )}
      <div>
        <h4 className="wallet-info-label">Switch Network</h4>
        <div className="chain-switcher-list">
          {supportedChains.map((chain) => (
            <Button
              key={chain.id}
              variant={chainId === chain.id ? 'primary' : 'outline'}
              size="sm"
              onClick={() => switchChain({ chainId: chain.id })}
              disabled={isPending || chainId === chain.id}
            >
              {chain.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
