import { Link } from 'react-router-dom'
import { ConnectWallet } from '../web3'
import { NetworkSelector } from './NetworkSelector.tsx'
import { DarkModeToggle } from './DarkModeToggle.tsx'
import { LanguageSelector } from './LanguageSelector.tsx'
import routesName from '../../Routes/enum.routes'
import './Header.css'

export function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-left">
          <Link to={routesName.ROOT} className="logo-link">
            <img src="/vite.svg" alt="Logo" width={32} height={32} className="logo-img" />
            <span className="logo-text">ChaosSwap</span>
          </Link>
          <nav className="nav-menu">
            <Link to={routesName.TRADE} className="nav-item">Trade</Link>
            <Link to={routesName.EARN} className="nav-item">Earn</Link>
            <Link to={routesName.BRIDGE} className="nav-item">Bridge</Link>
            <Link to={routesName.PLAY} className="nav-item">Play</Link>
          </nav>
        </div>
        <div className="header-right">
          <button className="buy-cake-btn">Buy Chaos</button>
          <DarkModeToggle />
          <LanguageSelector />
          <NetworkSelector />
          <ConnectWallet />
        </div>
      </div>
    </header>
  )
}
