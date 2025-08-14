import React from 'react'
import { ConnectWallet, Portfolio, TransactionHistory, ChainSwitcher } from '../components/web3'
import './Dashboard.css'

export function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Web3 Dashboard</h1>
        <p className="dashboard-subtitle">
          Manage your crypto portfolio and view transaction history
        </p>
        <div className="dashboard-connect">
          <ConnectWallet />
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-grid">
          {/* Left Column */}
          <div className="dashboard-column">
            <div className="dashboard-section">
              <Portfolio />
            </div>
            <div className="dashboard-section">
              <ChainSwitcher />
            </div>
          </div>

          {/* Right Column */}
          <div className="dashboard-column">
            {/* <div className="dashboard-section">
              <AdvancedSwap />
            </div> */}
            <div className="dashboard-section">
              <TransactionHistory />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
