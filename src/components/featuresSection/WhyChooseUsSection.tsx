import React from 'react';
import './WhyChooseUsSection.css';
import { FaBolt, FaShieldAlt, FaChartLine, FaUsers } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SVGIcon01, SVGIcon02, SVGIcon03, SVGIcon04, SVGIcon05, SVGIcon06 } from '../../assets/svgs/SvgIcons';

gsap.registerPlugin(ScrollTrigger);

interface Feature {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: string;
  iconComponent: React.ComponentType<any>;
  imageUrl?: string;
  backgroundImage: React.ComponentType<any>;
  bgColor: string;
  bgColorLight: string;
  textColor: string;
  isColorful?: boolean;
}

const features: Feature[] = [
  {
    id: 'user-centric',
    number: '01',
    title: 'USER-CENTRIC & INFRA-ABSTRACTED',
    description: 'Access users, state, and settlement on any chain Anoma is connected to — with one deployment.',
    icon: 'USER-CENTRIC & INFRA-ABSTRACTED',
    iconComponent: FaBolt,
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=400&fit=crop&crop=center',
    backgroundImage: SVGIcon01,
    bgColor: '#1e40af',
    bgColorLight: '#3b82f6',
    textColor: '#ffffff',
  },
  {
    id: 'compatible-any-chain',
    number: '02',
    title: 'COMPATIBLE WITH ANY CHAIN',
    description: 'Access users, state, and settlement on any chain Anoma is connected to — with one deployment.',
    icon: 'COMPATIBLE WITH ANY CHAIN',
    iconComponent: FaShieldAlt,
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop&crop=center',
    backgroundImage: SVGIcon02,
    bgColor: '#686868',
    bgColorLight: '#ef4444',
    textColor: '#ffffff',
    isColorful: true,
  },
  {
    id: 'composable-everything',
    number: '03',
    title: 'COMPOSABLE WITH EVERYTHING',
    description: 'Compose interactions at the intent level, not just the transaction level, unifying state across connected chains.',
    icon: 'COMPOSABLE WITH EVERYTHING',
    iconComponent: FaChartLine,
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=400&fit=crop&crop=center',
    backgroundImage: SVGIcon06,
    bgColor: '#F5B027',
    bgColorLight: '#10b981',
    textColor: '#ffffff',
    isColorful: true,
  },
  {
    id: 'uniquely-expressive',
    number: '04',
    title: 'UNIQUELY EXPRESSIVE',
    description: 'Express any user intent and create arbitrary application types that are fully decentralized.',
    icon: 'UNIQUELY EXPRESSIVE',
    iconComponent: FaUsers,
    imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=400&fit=crop&crop=center',
    backgroundImage: SVGIcon03,
    bgColor: '#7c3aed',
    bgColorLight: '27F5F5',
    textColor: '#ffffff',
    isColorful: true,
  },
  {
    id: 'scale-free',
    number: '05',
    title: 'SCALE-FREE & COST EFFECTIVE',
    description: 'Scale as much as the laws of physics allow thanks to Anoma\'s unique approach to scalability.',
    icon: 'SCALE-FREE & COST EFFECTIVE',
    iconComponent: FaBolt,
    imageUrl: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=400&fit=crop&crop=center',
    backgroundImage: SVGIcon04,
    bgColor: '#ea580c',
    bgColorLight: '#f97316',
    textColor: '#ffffff',
    isColorful: true,
  },
  {
    id: 'programmable-data',
    number: '06',
    title: 'PROGRAMMABLE DATA SOVEREIGNTY',
    description: 'Control what data is shared with whom and for what purposes, and empower your users with full sovereignty over their own data.',
    icon: 'PROGRAMMABLE DATA SOVEREIGNTY',
    iconComponent: FaShieldAlt,
    imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=400&fit=crop&crop=center',
    backgroundImage: SVGIcon05,
    bgColor: '#be185d',
    bgColorLight: '#ec4899',
    textColor: '#ffffff',
    isColorful: true,
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
        overflow-hidden h-full border-2 border-red-500"
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
                color: feature.textColor,
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
                color: feature.textColor,
                textShadow: '2px 2px 20px rgba(0,0,0,0.3)',
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
              color: feature.textColor,
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
        overflow-hidden min-h-[400px] bg-white border-2 border-red-500"
        style={{
          borderRadius: '1.5rem',
        }}>
        
        {/* SVG Background */}
        <div className="absolute inset-0" style={{ borderRadius: '1.5rem' }}>
          <feature.backgroundImage 
            width="100%" 
            height="100%" 
            className="w-full h-full object-cover" 
          />
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
