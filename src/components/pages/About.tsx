import './About.css'

export default function AboutPage() {
  return (
    <div className="about-page">
      <div className="about-container">
        <h1 className="about-title">About ChaosSwap</h1>
        <p className="about-description">
          ChaosSwap is a modern decentralized exchange (DEX) built on multiple blockchain networks.
          Trade, earn, and participate in DeFi with our user-friendly interface.
        </p>
        
        <div className="about-features">
          <div className="feature-card">
            <h3>Multi-Chain Support</h3>
            <p>Trade across multiple blockchain networks including BSC, Ethereum, and more.</p>
          </div>
          
          <div className="feature-card">
            <h3>Low Fees</h3>
            <p>Enjoy competitive trading fees and maximize your trading profits.</p>
          </div>
          
          <div className="feature-card">
            <h3>Secure Trading</h3>
            <p>Your funds are always under your control with non-custodial trading.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
