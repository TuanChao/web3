import { useState, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { WalletInfo } from '../web3';
import { 
  ArrowRightLeft, 
  Wallet, 
  Coins,
  TrendingUp,
  Users,
  Activity,
  Zap,
  Shield,
  BarChart3,
  Sparkles,
  ArrowRight,
  Clock,
  DollarSign
} from 'lucide-react';
import './QuickActions.css';

export default function QuickActions() {
  const [stats] = useState({
    tvl: 1250000000,
    volume24h: 450000000,
    activeUsers: 15000,
    apy: 12.5
  });

  // NEW: which action is active
  const [activeIndex, setActiveIndex] = useState(0);

  // animate center swap arrows on click (no state needed)
  const handleSwapToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    btn.classList.add('rotating');
    window.setTimeout(() => btn.classList.remove('rotating'), 300);
  };

  // GSAP refs
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const badgesRef = useRef<HTMLDivElement | null>(null);
  const singleCardRef = useRef<HTMLDivElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    // Respect reduced motion
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      const cards = sectionRef.current ? Array.from(sectionRef.current.querySelectorAll('.action-card')) : [];

      gsap.set([headerRef.current, badgesRef.current, cards], { autoAlpha: 0 });

      gsap.to(headerRef.current, { autoAlpha: 1, duration: 0.5, ease: 'power2.out' });
      gsap.to(badgesRef.current, { autoAlpha: 1, duration: 0.5, ease: 'power2.out', delay: 0.1 });
      gsap.fromTo(cards,
        { autoAlpha: 0, scale: 0.985 },
        { autoAlpha: 1, scale: 1, duration: 0.55, ease: 'power2.out', stagger: 0.07, delay: 0.15 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate when switching active card
  useLayoutEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    if (!singleCardRef.current || !introRef.current) return;
    
    // Enhanced GSAP animations for intro elements
    const tl = gsap.timeline();
    
    // Animate intro container first
    tl.fromTo(introRef.current, 
      { autoAlpha: 0, scale: 0.95, rotationY: 5 }, 
      { autoAlpha: 1, scale: 1, rotationY: 0, duration: 0.5, ease: 'power2.out' }, 0)
    
    // Animate title with dramatic entrance
    .fromTo('.intro-title', 
      { 
        autoAlpha: 0, 
        y: 30, 
        scale: 0.9,
        rotationX: 15
      }, 
      { 
        autoAlpha: 1, 
        y: 0, 
        scale: 1,
        rotationX: 0,
        duration: 0.7, 
        ease: 'back.out(1.7)',
        onComplete: () => {
          // Add floating animation to title
          gsap.to('.intro-title', {
            y: -2,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut'
          });
        }
      }, 0.1)
    
    // Animate description with slide and fade
    .fromTo('.intro-desc', 
      { 
        autoAlpha: 0, 
        x: -20, 
        y: 15,
        filter: 'blur(2px)'
      }, 
      { 
        autoAlpha: 1, 
        x: 0, 
        y: 0,
        filter: 'blur(0px)',
        duration: 0.6, 
        ease: 'power3.out' 
      }, 0.25)
    
    // Animate features with stagger effect
    .fromTo('.intro-feature', 
      { 
        autoAlpha: 0, 
        x: -15, 
        y: 10,
        scale: 0.8
      }, 
      { 
        autoAlpha: 1, 
        x: 0, 
        y: 0,
        scale: 1,
        duration: 0.5, 
        ease: 'back.out(1.2)',
        stagger: 0.1,
        onComplete: () => {
          // Add pulse animation to bullets
          gsap.to('.intro-bullet', {
            scale: 1.2,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut',
            stagger: 0.2
          });
        }
      }, 0.4)
    
    // Animate card with sophisticated entrance
    .fromTo(singleCardRef.current, 
      { 
        autoAlpha: 0, 
        scale: 0.9, 
        y: 20,
        rotationY: -5
      }, 
      { 
        autoAlpha: 1, 
        scale: 1, 
        y: 0,
        rotationY: 0,
        duration: 0.6, 
        ease: 'power2.out' 
      }, 0.2)
    
    // Animate card content elements
    .fromTo('.card-description, .stats-box, .features-list, .action-btn, .swap-preview, .wallet-preview, .stake-preview, .dashboard-preview', 
      { 
        autoAlpha: 0, 
        x: -15,
        y: 10
      }, 
      { 
        autoAlpha: 1, 
        x: 0,
        y: 0,
        duration: 0.5, 
        ease: 'power2.out',
        stagger: 0.08
      }, 0.4)
    
    // Animate feature items individually
    .fromTo('.feature-item', 
      { 
        autoAlpha: 0, 
        x: -10,
        scale: 0.9
      }, 
      { 
        autoAlpha: 1, 
        x: 0,
        scale: 1,
        duration: 0.4, 
        ease: 'back.out(1.1)',
        stagger: 0.05
      }, 0.6);

    return () => {
      tl.kill();
    };
  }, [activeIndex]);

  const actions = [
    {
      id: 'swap',
      title: 'Token Swap',
      icon: ArrowRightLeft,
      gradient: 'gradient-blue-purple',
      description: 'Exchange tokens instantly with the best rates across multiple DEXs',
      link: '/swap',
      btnText: 'Start Trading',
      stats: { 
        label: 'Volume 24h', 
        value: `$${(stats.volume24h / 1000000).toFixed(1)}M`,
        icon: TrendingUp
      },
      particles: true,
      features: ['Best rates', '0.1% fee', 'MEV protected'],
      // Per-action intro content
      intro: {
        title: 'Swap instantly',
        desc: 'Trade tokens with optimal routing and MEV protection across top DEXs.',
        bullets: ['Smart routing', 'Auto slippage', 'Fee rebates'],
        ctaText: 'Start Trading',
        ctaLink: '/swap'
      }
    },
    {
      id: 'wallet',
      title: 'Wallet Manager',
      icon: Wallet,
      gradient: 'gradient-green-teal',
      description: 'Manage your crypto portfolio with advanced analytics',
      component: <WalletInfo />,
      stats: { 
        label: 'Active Users', 
        value: stats.activeUsers.toLocaleString(),
        icon: Users
      },
      features: ['Multi-wallet', 'Portfolio tracking', 'Gas optimization'],
      // Per-action intro content
      intro: {
        title: 'Your wallets at a glance',
        desc: 'Track balances, NFTs, and PnL across chains in one place.',
        bullets: ['Multi-chain', 'Gas savings', 'Export CSV'],
        ctaText: 'Connect wallet',
        ctaLink: '/dashboard'
      }
    },
    
    {
      id: 'stake',
      title: 'Staking Pools',
      icon: Coins,
      gradient: 'gradient-purple-pink',
      description: 'Earn passive income by staking your tokens',
      link: '/stake',
      btnText: 'Explore Pools',
      stats: { 
        label: 'APY', 
        value: `${stats.apy.toFixed(1)}%`,
        icon: BarChart3
      },
      isNew: true,
      features: ['Auto-compound', 'No lockup', 'Daily rewards'],
      // Per-action intro content
      intro: {
        title: 'Earn with staking',
        desc: 'Deposit tokens and earn daily rewards with no lockups.',
        bullets: ['Auto-compound', 'Daily rewards', 'Boosted APY'],
        ctaText: 'Explore Pools',
        ctaLink: '/stake'
      }
    },
    {
      id: 'dashboard',
      title: 'Web3 Dashboard',
      icon: BarChart3,
      gradient: 'gradient-orange-red',
      description: 'View your portfolio and transaction history in one place',
      link: '/dashboard',
      btnText: 'Open Dashboard',
      stats: { 
        label: 'Features', 
        value: '5+',
        icon: Activity
      },
      features: ['Portfolio tracking', 'Transaction history', 'Multi-chain support'],
      // Per-action intro content
      intro: {
        title: 'All your Web3 in one view',
        desc: 'Portfolio, history, positions — all multi-chain and real-time.',
        bullets: ['Custom widgets', 'Exportable data', 'Alerts'],
        ctaText: 'Open Dashboard',
        ctaLink: '/dashboard'
      }
    }
  ];

  const activeAction = actions[activeIndex];
  // Derived intro values with fallbacks to maintain backward compatibility
  const introContent = (activeAction as any).intro;
  const introTitle = introContent?.title ?? activeAction.title;
  const introDesc = introContent?.desc ?? activeAction.description;
  const introBullets = introContent?.bullets ?? activeAction.features;

  return (
    <section className="quick-actions-section" ref={sectionRef}>
      {/* Background gradient effect */}
      <div className="background-gradient" />
      
      {/* Header with animated stats */}
      <div className="section-header" ref={headerRef}>
        <div className="title-wrapper">
          <Sparkles className="title-icon" />
          <h2 className="section-title">Quick Actions</h2>
        </div>
        <div className="stats-badges" ref={badgesRef}>
          <div className="stat-badge">
            <Activity className="badge-icon pulse-green" />
            <span>Live on 20+ Networks</span>
          </div>
          <div className="stat-badge">
            <Users className="badge-icon" />
            <span>{stats.activeUsers.toLocaleString()} Active Users</span>
          </div>
          <div className="stat-badge">
            <Shield className="badge-icon" />
            <span>Audited & Secure</span>
          </div>
          <div className="stat-badge">
            <Clock className="badge-icon" />
            <span>24/7 Trading</span>
          </div>
        </div>
      </div>

      {/* Tabs selector */}
      <div className="qa-selector" role="tablist" aria-label="Choose quick action">
        {actions.map((action, i) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              role="tab"
              aria-selected={i === activeIndex}
              className={`qa-tab ${action.gradient} ${i === activeIndex ? 'is-active' : ''}`}
              onClick={() => setActiveIndex(i)}
            >
              <Icon className="tab-icon" />
              <span className="tab-label">{action.title}</span>
            </button>
          );
        })}
      </div>

      {/* Intro + Single selected card (Pancake-like hero) */}
      <div className="single-card-layout split-card">
        <div className="qa-intro" ref={introRef}>
          {/* <div className={`intro-icon ${activeAction.gradient}`}>
            <activeAction.icon className="intro-icon-svg" />
          </div> */}
          <h3 className="intro-title">{introTitle}</h3>
          <p className="intro-desc">{introDesc}</p>
          {introBullets && introBullets.length > 0 && (
            <ul className="intro-features">
              {introBullets.slice(0, 3).map((f: string, i: number) => (
                <li key={i} className="intro-feature">
                  <span className="intro-bullet" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="single-card-container">
          <div className="action-card-wrapper" ref={singleCardRef}>
            <div className={`card-glow ${activeAction.gradient}`} />
            <Card className={`action-card ${activeAction.id === 'swap' ? 'swap-preview-card' : ''}`}>
              <div className="card-pattern" />
              {activeAction.isNew && (
                <div className="new-badge">
                  <Zap className="new-badge-icon" />
                  NEW
                </div>
              )}

              <CardHeader className="card-header">
                <CardTitle className="card-title">
                  <div className={`icon-box ${activeAction.gradient}`}>
                    <activeAction.icon className="card-icon" />
                  </div>
                  <span className="title-text">{activeAction.title}</span>
                </CardTitle>
              </CardHeader>

              <CardContent className="card-content">
                {activeAction.id === 'swap' ? (
                  <div className="swap-preview">
                    <div className="swap-section-label">From</div>
                    <div className="token-input">
                      <div className="token-row">
                        <button className="token-select">
                          <div className="token-icon bnb-icon">B</div>
                          <span>BNB</span>
                          <span className="chevron">▼</span>
                        </button>
                        <div className="amount-value">0.00</div>
                      </div>
                      <div className="chain-info">BNB Chain</div>
                    </div>

                    <div className="swap-button-container">
                      <button className="swap-button" onClick={handleSwapToggle}>⇅</button>
                    </div>

                    <div className="swap-section-label to">To</div>
                    <div className="token-input">
                      <div className="token-row">
                        <button className="token-select">
                          <div className="token-icon cake-icon">C</div>
                          <span>CAKE</span>
                          <span className="chevron">▼</span>
                        </button>
                        <div className="amount-value">0.00</div>
                      </div>
                      <div className="chain-info">BNB Chain</div>
                    </div>

                    <a href="/swap" className="primary-cta">Start Trading</a>
                  </div>
                ) : activeAction.id === 'wallet' ? (
                  <div className="wallet-preview">
                    <div className="wallet-status">
                      <span className="status-dot offline" />
                      Not Connected
                    </div>
                    <div className="wallet-meta">
                      <div className="meta-item">
                        <Users className="meta-icon" />
                        <span>Wallets: 0</span>
                      </div>
                      <div className="meta-item">
                        <Shield className="meta-icon" />
                        <span>Audited & Secure</span>
                      </div>
                      <div className="meta-item">
                        <Activity className="meta-icon" />
                        <span>Multi-chain Ready</span>
                      </div>
                      <div className="meta-item">
                        <BarChart3 className="meta-icon" />
                        <span>Portfolio Analytics</span>
                      </div>
                    </div>
                    <a href="/dashboard" className="primary-cta">Connect Wallet</a>
                  </div>
                ) : activeAction.id === 'stake' ? (
                  <div className="stake-preview">
                    <div className="swap-row pool-row">
                      <div className="swap-asset">
                        <div className="token-avatar cake">C</div>
                        <div className="asset-info">
                          <div className="asset-symbol">CAKE Pool (Auto)</div>
                          <div className="asset-chain">Auto-compound</div>
                        </div>
                      </div>
                      <div className="pool-apr">APY {stats.apy.toFixed(1)}%</div>
                    </div>
                    <div className="swap-row pool-row" style={{ marginTop: '0.75rem' }}>
                      <div className="swap-asset">
                        <div className="token-avatar bnb">B</div>
                        <div className="asset-info">
                          <div className="asset-symbol">BNB Pool</div>
                          <div className="asset-chain">Flexible</div>
                        </div>
                      </div>
                      <div className="pool-apr">APR 8.2%</div>
                    </div>
                    <a href="/stake" className="primary-cta">Explore Pools</a>
                  </div>
                ) : activeAction.id === 'dashboard' ? (
                  <div className="dashboard-preview">
                    <div className="preview-kpis">
                      <div className="kpi-box">
                        <div className="kpi-label">TVL</div>
                        <div className="kpi-value">${(stats.tvl / 1_000_000_000).toFixed(2)}B</div>
                      </div>
                      <div className="kpi-box">
                        <div className="kpi-label">24h Volume</div>
                        <div className="kpi-value">${(stats.volume24h / 1_000_000).toFixed(0)}M</div>
                      </div>
                      <div className="kpi-box">
                        <div className="kpi-label">Users</div>
                        <div className="kpi-value">{stats.activeUsers.toLocaleString()}</div>
                      </div>
                      <div className="kpi-box">
                        <div className="kpi-label">Best APY</div>
                        <div className="kpi-value">{stats.apy.toFixed(1)}%</div>
                      </div>
                    </div>
                    <a href="/dashboard" className="primary-cta">Open Dashboard</a>
                  </div>
                ) : (
                  <>
                    <p className="card-description">{activeAction.description}</p>

                    {activeAction.stats && (
                      <div className="stats-box">
                        <div className="stats-content">
                          <div>
                            <div className="stats-label">
                              <activeAction.stats.icon className="stats-icon" />
                              <span>{activeAction.stats.label}</span>
                            </div>
                            <div className="stats-value">
                              {activeAction.stats.value}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeAction.features && (
                      <div className="features-list">
                        {activeAction.features.map((feature: string, i: number) => (
                          <div key={i} className="feature-item">
                            <div className="feature-bullet" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeAction.link ? (
                      <a href={activeAction.link} className={`action-btn ${activeAction.gradient}`}>
                        {activeAction.btnText}
                        <ArrowRight className="btn-icon" />
                      </a>
                    ) : (
                      <div className="component-wrapper">
                        {activeAction.component}
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Quick stats bar */}
      <div className="stats-bar">
        <div className="stat-item">
          <DollarSign className="stat-icon green" />
          <div className="stat-info">
            <div className="stat-label">TVL</div>
            <div className="stat-value">${(stats.tvl / 1000000000).toFixed(2)}B</div>
          </div>
        </div>
        <div className="stat-item">
          <Activity className="stat-icon blue" />
          <div className="stat-info">
            <div className="stat-label">24h Volume</div>
            <div className="stat-value">${(stats.volume24h / 1000000).toFixed(0)}M</div>
          </div>
        </div>
        <div className="stat-item">
          <Users className="stat-icon purple" />
          <div className="stat-info">
            <div className="stat-label">Users</div>
            <div className="stat-value">{stats.activeUsers.toLocaleString()}</div>
          </div>
        </div>
        <div className="stat-item">
          <TrendingUp className="stat-icon orange" />
          <div className="stat-info">
            <div className="stat-label">Best APY</div>
            <div className="stat-value">{stats.apy.toFixed(1)}%</div>
          </div>
        </div>
      </div>
    </section>
  );
}