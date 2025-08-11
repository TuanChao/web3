import React from 'react';
import './WhyChooseUsSection.css';
import { 
  FaShieldAlt, 
  FaBolt, 
  FaNetworkWired, 
  FaGem, 
  FaMobileAlt, 
  FaRocket 
} from 'react-icons/fa';

interface Feature {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  bgColorLight: string;
  textColor: string;
  isColorful?: boolean;
}

const features: Feature[] = [
  {
    id: 'secure-safe',
    number: '01',
    title: 'Ultra Secure Trading',
    description: 'Military-grade encryption meets DeFi innovation. Your private keys remain yours with our non-custodial architecture. Smart contracts audited by top security firms ensure maximum protection for your digital assets.',
    icon: <div className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-teal-600 rounded-3xl flex items-center justify-center text-white text-3xl font-bold shadow-2xl transform rotate-12">🛡️</div>,
    bgColor: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    bgColorLight: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
    textColor: 'text-emerald-900 dark:text-emerald-100',
  },
  {
    id: 'lightning-fast',
    number: '02',
    title: 'Blazing Fast Swaps',
    description: 'Experience sub-second transaction speeds with our optimized DEX engine. Advanced algorithms ensure minimal slippage and maximum efficiency across all supported networks.',
    icon: <div className="w-20 h-20 bg-gradient-to-r from-amber-400 to-orange-600 rounded-3xl flex items-center justify-center text-white text-3xl font-bold shadow-2xl transform -rotate-12">⚡</div>,
    bgColor: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    bgColorLight: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    textColor: 'text-amber-900 dark:text-amber-100',
    isColorful: true,
  },
  {
    id: 'multi-chain',
    number: '03',
    title: 'Cross-Chain Magic',
    description: 'Seamlessly trade across Ethereum, Polygon, BSC, Arbitrum, and 15+ networks. One interface, unlimited possibilities. The future of DeFi is multi-chain.',
    icon: <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center text-white text-3xl font-bold shadow-2xl transform rotate-6">🔗</div>,
    bgColor: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    bgColorLight: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
    textColor: 'text-blue-900 dark:text-blue-100',
    isColorful: true,
  },
  {
    id: 'best-rates',
    number: '04',
    title: 'Premium Rates',
    description: 'Our AI-powered routing engine scans 50+ DEXs simultaneously to find you the absolute best rates. Save more on every trade with intelligent price optimization.',
    icon: <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-rose-600 rounded-3xl flex items-center justify-center text-white text-3xl font-bold shadow-2xl transform -rotate-6">💎</div>,
    bgColor: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
    bgColorLight: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
    textColor: 'text-pink-900 dark:text-pink-100',
  },
  {
    id: 'mobile-ready',
    number: '05',
    title: 'Mobile-First Design',
    description: 'Trade on-the-go with our responsive mobile interface. Full desktop functionality in your pocket. Never miss a trading opportunity again.',
    icon: <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl flex items-center justify-center text-white text-3xl font-bold shadow-2xl transform rotate-12">📱</div>,
    bgColor: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
    bgColorLight: 'linear-gradient(135deg, #cffafe 0%, #a5f3fc 100%)',
    textColor: 'text-cyan-900 dark:text-cyan-100',
    isColorful: true,
  },
  {
    id: 'always-evolving',
    number: '06',
    title: 'Innovation Engine',
    description: 'Weekly updates bring new features, tokens, and cutting-edge DeFi integrations. Join thousands of traders building the future of decentralized finance.',
    icon: <div className="w-20 h-20 bg-gradient-to-r from-violet-500 to-purple-700 rounded-3xl flex items-center justify-center text-white text-3xl font-bold shadow-2xl transform -rotate-12">🚀</div>,
    bgColor: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
    bgColorLight: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)',
    textColor: 'text-violet-900 dark:text-violet-100',
  },
];

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
  const cardStyle = {
    '--index': index,
    '--offset': `${index * 80}px`,
    '--bg-gradient': feature.bgColor,
    '--bg-gradient-light': feature.bgColorLight,
    '--z-index': 100 + index,
    '--card-rotation': `${(index % 2 === 0 ? 1 : -1) * 0.5}deg`,
  } as React.CSSProperties;

  return (
    <div 
      style={cardStyle}
      className={`insight sticky 
        top-[calc(var(--navbar-height)+var(--padding-md)+var(--offset))] 
        h-[calc(var(--insight-card-height)-var(--offset))]
        grid grid-cols-1 lg:grid-cols-[1fr_2fr] 
        will-change-transform ${feature.textColor} 
        ${feature.isColorful ? 'group-[.colorful]/section:text-white' : ''}
        z-[var(--z-index)] rounded-3xl overflow-hidden
        transform transition-all duration-700 ease-out
        hover:scale-[1.02] hover:rotate-[var(--card-rotation)]
        shadow-2xl hover:shadow-3xl
      `}
    >
      {/* Icon Section - Left Column */}
      <div className="relative flex items-center justify-center p-8 lg:p-12
        backdrop-blur-xl rounded-3xl lg:rounded-r-none lg:rounded-l-3xl
        border border-white/20 border-r-0 lg:border-r
        overflow-hidden"
        style={{
          background: `var(--bg-current), rgba(255,255,255,0.05)`,
          backgroundBlendMode: 'overlay'
        }}
      >
        
        {/* Floating Geometric Shapes */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 right-4 w-8 h-8 bg-white/30 rounded-lg rotate-45 animate-spin" style={{animationDuration: '8s'}} />
          <div className="absolute bottom-4 left-4 w-6 h-6 bg-white/40 rounded-full animate-bounce" />
          <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-white/20 rounded-full blur-xl animate-pulse" />
        </div>
        
        {/* Icon Container */}
        <div className="relative z-10 transform transition-all duration-700 ease-out
          hover:scale-110 hover:rotate-6 group"
        >
          {feature.icon}
          
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent
            rounded-3xl blur-xl opacity-0 group-hover:opacity-100
            transition-opacity duration-500"
          />
        </div>
      </div>
      
      {/* Main Content Section - Right Column */}
      <div className="relative h-full flex flex-col justify-between p-8 lg:p-12
        backdrop-blur-xl border border-white/20
        rounded-3xl lg:rounded-l-none lg:rounded-r-3xl
        overflow-hidden"
        style={{
          background: `var(--bg-current), rgba(255,255,255,0.1)`,
          backgroundBlendMode: 'overlay'
        }}
      >
        
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10 animate-pulse" />
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/20 rounded-full blur-3xl animate-bounce" style={{animationDelay: `${index * 0.5}s`}} />
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/30 rounded-full blur-2xl animate-pulse" style={{animationDelay: `${index * 0.3}s`}} />
        </div>
        
        {/* Content Container */}
        <div className="relative z-10 flex-1 flex flex-col justify-center space-y-6">
          {/* Title */}
          <h2 className={`text-3xl lg:text-4xl xl:text-5xl font-black uppercase leading-tight
            ${feature.textColor} drop-shadow-sm
            transform transition-all duration-500
            hover:scale-105`}
          >
            {feature.title}
          </h2>
          
          {/* Description */}
          <p className={`text-lg lg:text-xl leading-relaxed ${feature.textColor}/80
            max-w-2xl backdrop-blur-sm p-4 rounded-2xl
            bg-white/10 border border-white/20`}
          >
            {feature.description}
          </p>
        </div>
        
        {/* Decorative Elements */}
        <div className="relative z-10 flex justify-between items-end mt-8">
          {/* Progress Bar */}
          <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden mr-6">
            <div 
              className="h-full bg-gradient-to-r from-white/60 to-white/80 rounded-full
                transform scale-x-0 origin-left transition-transform duration-1000 ease-out
                hover:scale-x-100"
              style={{animationDelay: `${index * 0.2}s`}}
            />
          </div>
          
          {/* Avalanche Logo */}
          <div className={`w-12 h-12 flex items-center justify-center
            bg-white/20 backdrop-blur-sm rounded-full
            ${feature.textColor} hover:bg-white/30 transition-all duration-300
            hover:scale-110 hover:rotate-12`}
          >
            <svg viewBox="0 0 722 628" className="w-6 h-6 fill-current">
              <path d="M548.831 381.485C560.015 362.435 587.792 362.435 598.853 381.485L717.703 584.525C728.887 603.575 714.876 627.296 692.63 627.296H454.932C432.686 627.296 418.797 603.575 429.859 584.525L548.831 381.485Z"/>
              <path d="M477.034 246.295C487.849 227.367 487.849 204.015 477.034 184.965L379.57 14.9872C368.631 -4.06311 341.346 -4.06311 330.408 14.9872L4.21765 584.407C-6.7209 603.457 6.92156 627.301 28.7987 627.301H223.603C245.358 627.301 265.391 615.625 276.207 596.697L476.911 246.295H477.034Z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

const WhyChooseUsSection: React.FC = () => {
  return (
    <section 
      className="relative flex flex-col items-stretch justify-start group/section"
      style={{
        '--navbar-height': '80px',
        '--padding-md': '24px',
        '--insight-card-height': '600px',
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
      
      {/* Section Header */}
      <div className="container mx-auto px-6 lg:px-8 relative z-30 mb-16">
        <h2 className="section-title text-center mb-16">
          <div className="inline-block relative">
            {/* Main Title Container */}
            <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 lg:p-8 shadow-xl border border-gray-200 dark:border-gray-700">
              <div className="space-y-3">
                {/* First Line */}
                <div className="block w-fit mx-auto">
                  <span className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 
                    font-black uppercase leading-tight tracking-wide
                    text-gray-900 dark:text-white
                    drop-shadow-sm">
                    Why Choose
                  </span>
                </div>
                
                {/* Second Line */}
                <div className="block w-fit mx-auto">
                  <span className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl 
                    font-black uppercase leading-tight tracking-wider
                    bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
                    bg-clip-text text-transparent
                    drop-shadow-sm">
                    ChaosSwap
                  </span>
                </div>
                
                {/* Decorative Line */}
                <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
              </div>
            </div>
          </div>
        </h2>
      </div>
      
      {/* Features Container */}
      <div className="container mx-auto px-6 lg:px-8 relative z-10" style={{paddingBottom : 32}}>
        <div className="space-y-0">
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>
      </div>
      
      {/* Bottom Spacer */}
      {/* <div className="h-screen" aria-hidden="true" /> */}
    </section>
  );
};

export default WhyChooseUsSection;
