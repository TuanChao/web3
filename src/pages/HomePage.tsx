import QuickActions from '../components/QuickAction/QuickActions'
import { Header } from '../components/ui/Header'
import './HomePage.css'
import TokenSwap from './Swaptoken'

export function HomePage() {
  return (
    <div className="homepage-bg">
      <main className="homepage-main">
        {/* Section 1: Hero Welcome */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to ChaosSwap</h1>
            <p className="hero-desc">
              Your gateway to the decentralized future. Connect, trade, and explore Web3 with confidence.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Active Users</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">$2M+</span>
                <span className="stat-label">Volume Traded</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Supported Tokens</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Quick Actions */}
        <section>
          <QuickActions />
        </section>
        

        {/* Section 3: Platform Features */}
        <section className="features-section">
          <h2 className="section-title">Why Choose CWSD?</h2>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">🔒</div>
              <h3 className="feature-title">Secure & Safe</h3>
              <p className="feature-desc">
                Non-custodial design means you always control your funds. Smart contract audited for maximum security.
              </p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">⚡</div>
              <h3 className="feature-title">Lightning Fast</h3>
              <p className="feature-desc">
                Optimized for speed with instant swaps and minimal slippage across multiple networks.
              </p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">🌍</div>
              <h3 className="feature-title">Multi-Chain</h3>
              <p className="feature-desc">
                Support for Ethereum, BSC, Polygon, Arbitrum, and more. One interface for all your DeFi needs.
              </p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">💎</div>
              <h3 className="feature-title">Best Rates</h3>
              <p className="feature-desc">
                Smart routing finds the best prices across DEXs to maximize your trading efficiency.
              </p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">📱</div>
              <h3 className="feature-title">Mobile Ready</h3>
              <p className="feature-desc">
                Responsive design works perfectly on desktop, tablet, and mobile devices.
              </p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">🚀</div>
              <h3 className="feature-title">Always Evolving</h3>
              <p className="feature-desc">
                Regular updates with new features, tokens, and integrations to stay ahead.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
