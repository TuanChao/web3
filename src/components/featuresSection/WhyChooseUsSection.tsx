import React from 'react';
import './WhyChooseUsSection.css';
import { FaBolt, FaShieldAlt, FaChartLine, FaUsers } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import chaosArt1 from '../../assets/chaos-art.png';
import chaosArt2 from '../../assets/chaos-art2.png';
import chaosArt3 from '../../assets/chaos-art3.png';
import chaosArt4 from '../../assets/chaos-art4.png';

gsap.registerPlugin(ScrollTrigger);

interface Feature {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: string;
  iconComponent: React.ComponentType<any>;
  imageUrl?: string;
  backgroundImage: string;
  bgColor: string;
  bgColorLight: string;
  textColor: string;
  isColorful?: boolean;
}

const features: Feature[] = [
  {
    id: 'lightning-fast',
    number: '01',
    title: 'FAST, POWERFUL, SECURE',
    description: 'Lightning-Fast Swaps in Seconds\nExperience the fastest token swapping in DeFi with our optimized smart contracts and advanced routing algorithms. Complete your trades in under 3 seconds with minimal slippage, even during high network congestion.\n\nMilitary-Grade Security\nYour funds are protected by audited smart contracts from leading security firms including CertiK and ConsenSys Diligence. Multi-signature wallets, time-lock mechanisms, and emergency pause functions ensure maximum protection against exploits.\n\nUltra-Low Gas Fees\nOur innovative batching system and Layer 2 integration reduce gas costs by up to 90% compared to traditional DEXs. Enjoy micro-transactions without worrying about prohibitive fees eating into your profits.\n\nCross-Chain Compatibility\nSeamlessly swap tokens across 15+ blockchains including Ethereum, BSC, Polygon, Avalanche, Arbitrum, and Optimism. Our unified interface eliminates the complexity of managing multiple wallets and bridges.',
    icon: 'FAST, POWERFUL, SECURE',
    iconComponent: FaBolt,
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=400&fit=crop&crop=center',
    backgroundImage: chaosArt1,
    bgColor: '#686868', // Light gray
    bgColorLight: '#f8f9fa',
    textColor: '#ffffff',
  },
  {
    id: 'infinitely-scalable',
    number: '02',
    title: 'INFINITELY SCALABLE BY DESIGN',
    description: 'Revolutionary AMM 3.0 Architecture\nBuilt from the ground up with scalability in mind, our next-generation Automated Market Maker handles unlimited trading pairs and liquidity pools without performance degradation.\n\nDynamic Liquidity Aggregation\nOur protocol automatically sources liquidity from multiple DEXs, CEXs, and private market makers to ensure you always get the best possible price with minimal slippage, regardless of trade size.\n\nElastic Network Expansion\nAs new blockchains emerge, our modular architecture allows instant integration without downtime or smart contract upgrades. Future-proof your DeFi experience with technology that grows with the ecosystem.\n\nHorizontal Scaling Solutions\nAdvanced sharding and parallel processing capabilities mean our platform maintains sub-second transaction times even with millions of concurrent users and thousands of active trading pairs.',
    icon: 'INFINITELY SCALABLE BY DESIGN',
    iconComponent: FaShieldAlt,
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop&crop=center',
    backgroundImage: chaosArt2,
    bgColor: '#0061e2', // Blue
    bgColorLight: '#0061e2',
    textColor: '#ffffff',
    isColorful: true,
  },
  {
    id: 'advanced-defi',
    number: '03',
    title: 'ADVANCED DEFI PROTOCOLS',
    description: 'Sophisticated Yield Optimization\nMaximize your returns with our AI-powered yield farming strategies that automatically compound rewards and rebalance positions across multiple protocols to optimize APY while minimizing impermanent loss.\n\nInnovative Liquidity Mining\nEarn dual rewards through our unique liquidity mining program. Provide liquidity to earn trading fees plus native governance tokens, with boosted rewards for long-term stakers and early adopters.\n\nSmart Contract Automation\nSet-and-forget trading strategies with our advanced limit orders, dollar-cost averaging, and portfolio rebalancing tools. Our smart contracts execute your strategies 24/7 without manual intervention.\n\nRisk Management Suite\nAdvanced tools including impermanent loss protection, liquidation insurance, and dynamic slippage controls help protect your capital while maximizing opportunities in volatile markets.\n\nFlash Loan Integration\nAccess instant, uncollateralized loans for arbitrage opportunities, liquidation protection, and advanced trading strategies without tying up your capital.',
    icon: 'ADVANCED DEFI PROTOCOLS',
    iconComponent: FaChartLine,
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=400&fit=crop&crop=center',
    backgroundImage: chaosArt3,
    bgColor: '#000000', // Green
    bgColorLight: '#10b981',
    textColor: '#ffffff',
    isColorful: true,
  },
  {
    id: 'global-community',
    number: '04',
    title: 'GLOBAL COMMUNITY',
    description: 'Worldwide Accessibility\nAvailable 24/7 in 40+ languages with localized support teams across different time zones. No geographical restrictions, no KYC requirements - true financial freedom for everyone.\n\nThriving Developer Ecosystem\nComprehensive APIs, SDKs, and documentation empower developers to build innovative DeFi applications on top of our infrastructure. Join our hackathons and developer grants program.\n\nCommunity Governance\nShape the future through our decentralized governance system. Vote on protocol upgrades, fee structures, new chain integrations, and treasury allocations. Your voice matters in our DAO.\n\nEducational Hub & Resources\nFrom beginners to DeFi experts, access our extensive library of tutorials, webinars, and market analysis. Our DeFi Academy has trained over 100,000 users to navigate decentralized finance safely.\n\nStrategic Partnerships\nCollaborating with leading blockchain projects, institutional liquidity providers, and DeFi protocols to create the most comprehensive and liquid trading environment in the space.\n\nIncentivized Participation\nActive community members earn rewards through our ambassador program, bug bounty campaigns, and social media contests. Build the future of finance while earning token rewards.',
    icon: 'GLOBAL COMMUNITY',
    iconComponent: FaUsers,
    imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=400&fit=crop&crop=center',
    backgroundImage: chaosArt4,
    bgColor: '#dc3545', // Red
    bgColorLight: '#dc3545',
    textColor: '#ffffff',
  },
];

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
  const [isSticky, setIsSticky] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const iconRef = React.useRef<HTMLDivElement>(null);
  
  const IconComponent = feature.iconComponent;

  React.useEffect(() => {
    const stickyObserver = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting && entry.boundingClientRect.y <= 150);
      },
      {
        threshold: [0, 1],
        rootMargin: '-100px 0px 0px 0px'
      }
    );

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -20% 0px'
      }
    );

    if (cardRef.current) {
      stickyObserver.observe(cardRef.current);
      visibilityObserver.observe(cardRef.current);
    }

    return () => {
      stickyObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, []);

  // GSAP Animations - Only for icon
  React.useEffect(() => {
    if (!cardRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Animate icon only
    if (iconRef.current) {
      tl.fromTo(iconRef.current,
        { opacity: 0, scale: 0, rotation: -180 },
        { opacity: 1, scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)" }
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  const cardStyle = {
    '--index': index,
    '--offset': `${index * 80}px`,
    '--bg-gradient': feature.bgColor,
    '--bg-gradient-light': feature.bgColorLight,
    '--z-index': 100 + index,
  } as React.CSSProperties;

  return (
    <div 
      ref={cardRef}
      style={cardStyle}
      className={`insight sticky group 
        top-[calc(var(--navbar-height)+var(--padding-md)+var(--offset))] 
        h-[max(400px,calc(var(--insight-card-height)-var(--offset)*0.8))]
        grid grid-cols-[1.5fr_1fr]
        will-change-transform text-current
        ${feature.isColorful ? 'group-[.colorful]/section:text-white colorful' : 'secondary'}
        ${isSticky ? 'sticky-collapsed' : ''}
        z-[var(--z-index)] rounded-3xl overflow-hidden
      `}
    >
      {/* Sticky Tab - Only visible when stacked */}
      <div className={`absolute top-0 left-0 right-0 z-30 h-16 flex items-center justify-center
        transition-all duration-300 ${isSticky ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
        bg-gradient-to-r from-transparent via-black/20 to-transparent backdrop-blur-sm`}
        style={{
          background: `linear-gradient(90deg, transparent, ${feature.bgColor}CC, transparent)`
        }}
      >
        <span className="text-2xl font-bold tracking-wider"
          style={{ 
            color: feature.textColor,
            fontFamily: 'Georgia, serif'
          }}
        >
          {feature.number} • {feature.title.split('.')[0]}
        </span>
      </div>

      {/* Card Content - Left Side */}
      <div className="relative flex flex-col justify-start p-12 lg:p-16
        overflow-hidden h-full border border-red-500/30"
        style={{
          background: `var(--bg-gradient)`,
          borderRadius: '1.5rem',
        }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5" />
        </div>
        
        {/* Number and Title - Top Row */}
        <div className="relative z-20 pt-2" style={{ marginBottom: 'var(--gap-xl, 2rem)' }}>
          <div className="flex items-center" style={{ gap: 'var(--gap-xl, 2rem)', padding: '0 var(--p-lg, 2rem)' }}>
            {/* Card Number */}
            <div 
              className="font-bold leading-none opacity-80"
              style={{ 
                fontFamily: 'Georgia, serif',
                color: '#ffffff',
                textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
                fontSize: 'clamp(2rem, 1.5rem + 2vw, 4rem)'
              }}
            >
              {feature.number}
            </div>

            {/* Title - Large and Bold */}
            <h2 
              className="font-black leading-tight flex-1 uppercase"
              style={{
                color: '#ffffff',
                textShadow: '2px 2px 20px rgba(0,0,0,0.2)',
                letterSpacing: '-0.02em',
                fontSize: 'clamp(1.5rem, calc(1.179rem + 1.282vw), 2rem)',
                lineHeight: '1.1'
              }}
            >
              {feature.title}
            </h2>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center" style={{ gap: 'var(--gap-base, 1.5rem)', padding: '0 var(--p-lg, 2rem)' }}>
          
          {/* Description - Show for all cards but style differently */}
          <p 
            className="font-light max-w-lg"
            style={{ 
              color: '#ffffff',
              fontSize: 'clamp(1rem, 0.8rem + 0.5vw, 1.125rem)',
              lineHeight: '1.6',
              opacity: '0.9'
            }}
          >
            {feature.description}
          </p>
          
        </div>
      </div>

      {/* Card Visual - Right Side */}
      <div className="flex relative items-center justify-center
        overflow-hidden min-h-[400px]"
        style={{
          borderRadius: '1.5rem',
          backgroundImage: `url(${feature.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundClip: 'padding-box',
          background: `url(${feature.backgroundImage}) center/cover no-repeat`
        }}>
        
        {/* Overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[0.5px]" 
          style={{ borderRadius: '1.5rem' }} />
        
        {/* Icon Display */}
        <div className="relative z-10 w-full h-full flex items-center justify-center p-8">
          <div 
            ref={iconRef}
            className="w-32 h-32 flex items-center justify-center rounded-2xl
            bg-white/20 backdrop-blur-sm
            transition-all duration-300 hover:scale-110 hover:rotate-6">
            <IconComponent size={80} style={{ color: '#ffffff' }} />
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-8 right-8 w-3 h-3 bg-white/50 rounded-full animate-pulse" />
        <div className="absolute bottom-12 left-8 w-2 h-2 bg-white/40 rounded-full animate-pulse" 
          style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-12 w-1 h-1 bg-white/60 rounded-full animate-pulse" 
          style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
};

const WhyChooseUsSection: React.FC = () => {
  return (
    <section 
      className="relative flex flex-col items-stretch justify-start group/section
        min-h-screen p-8"
      style={{
        backgroundColor: '#1a1a1a',
        '--navbar-height': '80px',
        '--padding-md': '24px',
        '--insight-card-height': '800px',
        '--color-neutral-50': '#f9fafb',
        '--color-neutral-100': '#f3f4f6',
        '--color-neutral-300': '#d1d5db',
        '--color-red': '#E84142',
        '--base': '1rem',
        '--xl': '1.25rem',
        '--md': '0.75rem',
        '--mb-xl': '1.25rem',
        '--gap-base': '1rem',
        '--gap-xl': '1.25rem',
        '--p-md': '0.75rem',
        '--pr-lg': '1.5rem',
        '--py-xs': '0.5rem',
        '--pl-0-75': '0.1875rem',
        '--pt-0-75': '0.1875rem',
        '--transition-move': 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
      } as React.CSSProperties}
    >
      
      {/* Features Container */}
      <div className="relative z-10" style={{paddingBottom : 32}}>
        <div className="space-y-0">
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>
      </div>
      
    </section>
  );
};

export default WhyChooseUsSection;
