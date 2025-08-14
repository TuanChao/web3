import React from 'react';
import './featuresSection.css';

interface Feature {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor?: string;
}

const FastSecureIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 8L56 20V44L32 56L8 44V20L32 8Z" stroke="#E84142" strokeWidth="2" fill="none"/>
    <path d="M32 16L48 26V38L32 48L16 38V26L32 16Z" fill="#E84142" fillOpacity="0.1"/>
    <circle cx="32" cy="32" r="6" fill="#E84142"/>
  </svg>
);

const ScalableIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="24" width="48" height="16" rx="8" stroke="#E84142" strokeWidth="2" fill="none"/>
    <rect x="16" y="16" width="32" height="32" rx="4" fill="#E84142" fillOpacity="0.1"/>
    <path d="M20 32H44M20 28H44M20 36H44" stroke="#E84142" strokeWidth="1.5"/>
  </svg>
);

const CustomizableIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="12" y="12" width="40" height="40" rx="8" stroke="#E84142" strokeWidth="2" fill="none"/>
    <rect x="20" y="20" width="24" height="24" rx="4" fill="#E84142" fillOpacity="0.1"/>
    <path d="M24 28H40M24 32H36M24 36H40" stroke="#E84142" strokeWidth="1.5"/>
  </svg>
);

const CommunityIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="24" r="8" stroke="#E84142" strokeWidth="2" fill="none"/>
    <circle cx="20" cy="40" r="6" stroke="#E84142" strokeWidth="2" fill="none"/>
    <circle cx="44" cy="40" r="6" stroke="#E84142" strokeWidth="2" fill="none"/>
    <path d="M26 31C26 31 28 36 32 36C36 36 38 31 38 31" stroke="#E84142" strokeWidth="2" fill="none"/>
    <circle cx="32" cy="24" r="4" fill="#E84142" fillOpacity="0.2"/>
  </svg>
);

const features = [
  {
    id: 'fast-powerful-secure',
    number: '01',
    title: 'Fast. Powerful. Secure.',
    description: 'Lightning-Fast Swaps in Seconds Experience the fastest token swapping in DeFi with our optimized smart contracts and advanced routing algorithms. Complete your trades in under 3 seconds with minimal slippage, even during high network congestion.Military-Grade Security Your funds are protected by audited smart contracts from leading security firms including CertiK and ConsenSys Diligence. Multi-signature wallets, time-lock mechanisms, and emergency pause functions ensure maximum protection against exploits.Ultra-Low Gas FeesOur innovative batching system and Layer 2 integration reduce gas costs by up to 90% compared to traditional DEXs. Enjoy micro-transactions without worrying about prohibitive fees eating into your profits.Cross-Chain CompatibilitySeamlessly swap tokens across 15+ blockchains including Ethereum, BSC, Polygon, Avalanche, Arbitrum, and Optimism. Our unified interface eliminates the complexity of managing multiple wallets and bridges.',
    icon: <FastSecureIcon />,
    bgColor: 'var(--color-neutral-50)',
  },
  {
    id: 'infinitely-scalable',
    number: '02', 
    title: 'Infinitely Scalable by Design',
    description: 'Built to scale with your needs. Whether you\'re a small trader or managing enterprise-level volume, our infrastructure adapts seamlessly to provide consistent performance.',
    icon: <ScalableIcon />,
    bgColor: 'var(--color-neutral-100)',
  },
  {
    id: 'customizable-solutions',
    number: '03',
    title: 'Customizable Solutions',
    description: 'Tailor your trading experience with our flexible platform. Advanced traders get powerful tools while beginners enjoy simplified interfaces - all in one ecosystem.',
    icon: <CustomizableIcon />,
    bgColor: 'var(--color-neutral-300)',
  },
  {
    id: 'global-community',
    number: '04',
    title: 'Global Community',
    description: 'Join thousands of traders worldwide. Our platform is more than technology - it\'s a thriving ecosystem of DeFi enthusiasts, developers, and innovators.',
    icon: <CommunityIcon />,
    bgColor: 'var(--color-red)',
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
    '--bg-color': feature.bgColor || 'var(--color-neutral-50)',
    '--feature-delay': `${index * 0.1}s`,
    '--feature-scale': '1',
    '--feature-rotate': '0deg',
  } as React.CSSProperties;

  return (
    <div 
      className="
        feature-card sticky 
        top-[calc(var(--navbar-height)+var(--padding-md)+var(--offset))] 
        min-h-[80vh] lg:h-[calc(var(--insight-card-height)-var(--offset))]
        grid grid-cols-1 lg:grid-cols-[2fr_1fr] 
        gap-4 lg:gap-6
        will-change-transform transition-all duration-700 ease-out
        hover:scale-[1.01] hover:-rotate-1
        text-black group-[.colorful]/section:text-white
        z-[calc(100-var(--index))]
      "
      style={cardStyle}
    >
      {/* Main Content Section - Responsive Grid */}
      <div className="
        relative flex flex-col h-full
        p-4 lg:p-6 xl:p-8
        bg-[var(--bg-color)] 
        border border-neutral-200 dark:border-neutral-700
        rounded-2xl lg:rounded-l-2xl lg:rounded-r-none
        shadow-sm hover:shadow-lg transition-all duration-500
        backdrop-blur-sm
      ">
        
        {/* Feature Number Badge */}
        <div className="
          inline-flex items-center justify-center
          w-12 h-12 lg:w-16 lg:h-16
          bg-white dark:bg-gray-800
          border-2 border-[var(--color-red)]
          rounded-full mb-6
          font-mono text-lg lg:text-xl font-bold
          text-[var(--color-red)]
          shadow-md
        ">
          {feature.number}
        </div>
        
        {/* Content Container */}
        <div className="flex-1 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            
            {/* Title with Animation */}
            <h2 className="
              text-2xl sm:text-3xl lg:text-4xl xl:text-5xl
              font-black uppercase leading-tight
              text-gray-900 dark:text-white
              group-[.colorful]/section:text-white
              transform transition-all duration-700
              hover:scale-105 hover:text-[var(--color-red)]
            ">
              {feature.title}
            </h2>
            
            {/* Description */}
            <p className="
              text-base lg:text-lg xl:text-xl
              leading-relaxed
              text-gray-600 dark:text-gray-300
              group-[.colorful]/section:text-gray-100
              max-w-2xl
            ">
              {feature.description}
            </p>
          </div>
          
          {/* Progress Indicator */}
          <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="
                h-full bg-gradient-to-r from-[var(--color-red)] to-red-600
                transition-all duration-1000 ease-out
                w-0 hover:w-full
              " 
            />
          </div>
          
          {/* Avalanche Logo */}
          <div className="
            w-12 h-12 lg:w-16 lg:h-16
            flex items-center justify-center
            bg-gradient-to-br from-[var(--color-red)] to-red-600
            rounded-full
            text-white
            shadow-lg hover:shadow-xl
            transition-all duration-500
            hover:scale-110 hover:rotate-12
          ">
            <svg viewBox="0 0 722 628" className="w-6 h-6 lg:w-8 lg:h-8">
              <path d="M548.831 381.485C560.015 362.435 587.792 362.435 598.853 381.485L717.703 584.525C728.887 603.575 714.876 627.296 692.63 627.296H454.932C432.686 627.296 418.797 603.575 429.859 584.525L548.831 381.485Z" fill="currentcolor"/>
              <path d="M477.034 246.295C487.849 227.367 487.849 204.015 477.034 184.965L379.57 14.9872C368.631 -4.06311 341.346 -4.06311 330.408 14.9872L4.21765 584.407C-6.7209 603.457 6.92156 627.301 28.7987 627.301H223.603C245.358 627.301 265.391 615.625 276.207 596.697L476.911 246.295H477.034Z" fill="currentcolor"/>
            </svg>
          </div>
        </div>
      </div>
      
      {/* Icon Section - Responsive */}
      <div className="
        relative flex items-center justify-center
        p-6 lg:p-8
        bg-gradient-to-br from-[var(--bg-color)] to-white
        dark:to-gray-800
        border border-neutral-200 dark:border-neutral-700
        rounded-2xl lg:rounded-r-2xl lg:rounded-l-none
        shadow-sm hover:shadow-lg
        transition-all duration-500
        hover:scale-105
        lg:border-l-0
      ">
        
        {/* Decorative Background */}
        <div className="
          absolute inset-0 
          bg-gradient-to-br from-transparent via-[var(--color-red)]/5 to-[var(--color-red)]/10
          rounded-2xl lg:rounded-r-2xl lg:rounded-l-none
        " />
        
        {/* Icon Container */}
        <div className="
          relative z-10
          w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 xl:w-32 xl:h-32
          flex items-center justify-center
          bg-white dark:bg-gray-800
          rounded-2xl
          shadow-lg
          transition-all duration-700
          hover:rotate-6 hover:scale-110
          hover:shadow-2xl hover:shadow-[var(--color-red)]/20
        ">
          {feature.icon}
        </div>
        
        {/* Floating Decoration */}
        <div className="
          absolute -top-2 -right-2
          w-6 h-6
          bg-gradient-to-br from-[var(--color-red)] to-red-600
          rounded-full
          animate-bounce
          shadow-lg
        " />
      </div>
    </div>
  );
};

const FeaturesSection: React.FC = () => {
  return (
    <section 
      className="
        relative overflow-hidden
        bg-gradient-to-b from-gray-50 via-white to-gray-100
        dark:from-gray-900 dark:via-black dark:to-gray-800
        py-16 lg:py-24 xl:py-32
        group/section
      "
      style={{
        '--navbar-height': '80px',
        '--padding-md': '2rem',
        '--insight-card-height': '85vh',
        '--color-neutral-50': '#f9fafb',
        '--color-neutral-100': '#f3f4f6', 
        '--color-neutral-300': '#d1d5db',
        '--color-red': '#E84142',
        '--base': '1rem',
        '--xl': '1.25rem',
        '--md': '0.75rem',
      } as React.CSSProperties}
    >
      
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-50/30 via-transparent to-transparent dark:from-red-950/10" />
        <div className="absolute inset-0 bg-grid-gray-100 dark:bg-grid-gray-800/20 [mask-image:linear-gradient(0deg,transparent,black)]" />
      </div>
      
      {/* Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        
        {/* Sticky Header */}
        <header className="
          sticky top-[var(--navbar-height)] z-50
          backdrop-blur-sm bg-white/90 dark:bg-black/90
          border border-gray-200/50 dark:border-gray-700/50
          rounded-2xl p-8 mb-16
          shadow-lg hover:shadow-xl transition-all duration-500
        ">
          <div className="text-center space-y-6">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950/50 dark:to-red-900/50 rounded-full border border-red-200 dark:border-red-800">
              <div className="w-3 h-3 bg-[var(--color-red)] rounded-full animate-pulse" />
              <span className="text-sm font-bold text-[var(--color-red)] uppercase tracking-widest">
                Key Features
              </span>
            </div>
            
            {/* Main Title */}
            <h1 className="
              text-4xl sm:text-5xl lg:text-6xl xl:text-8xl
              font-black leading-[0.85] uppercase
              bg-gradient-to-r from-gray-900 via-[var(--color-red)] to-red-600
              dark:from-white dark:via-red-400 dark:to-red-500
              bg-clip-text text-transparent
              animate-pulse
            ">
              <span className="block transform hover:scale-105 transition-transform duration-500">
                Why Choose
              </span>
              <span className="block transform hover:scale-105 transition-transform duration-500 delay-100">
                Our DEX
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="
              text-lg lg:text-xl xl:text-2xl
              text-gray-600 dark:text-gray-300
              max-w-4xl mx-auto leading-relaxed
              opacity-0 animate-fadeIn animation-delay-500
            ">
              Experience the future of decentralized finance with our cutting-edge trading platform
            </p>
          </div>
        </header>
        
        {/* Features Grid Container */}
        <div className="relative space-y-8 lg:space-y-12">
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
          
          {/* Bottom Spacer for Scroll Effect */}
          <div className="h-screen" aria-hidden="true" />
        </div>
      </div>
      
      {/* Bottom Fade Effect */}
      <div className="
        absolute bottom-0 left-0 right-0 h-32
        bg-gradient-to-t from-gray-100 to-transparent
        dark:from-gray-800 dark:to-transparent
        pointer-events-none
      " />
    </section>
  );
};

export default FeaturesSection;