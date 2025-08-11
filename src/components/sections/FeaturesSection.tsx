import React, { useEffect, useRef } from 'react';
import './FeaturesSection.css';

interface Feature {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor?: string;
}

// SVG Icons theo phong cách avax.network
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
    description: 'Lightning-fast transactions with institutional-grade security. Our advanced DeFi protocol ensures your swaps are processed in milliseconds while maintaining the highest security standards.',
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
  const cardRef = useRef<HTMLDivElement>(null);
  const cardStyle = {
    '--index': index,
    '--offset': `${index * 64.546875}px`,
    '--bg-color': feature.bgColor || 'var(--color-neutral-50)',
    '--animation-delay': `${index * 0.2}s`,
  } as React.CSSProperties;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className="insight feature-card-reveal sticky top-[calc(var(--navbar-height)+var(--padding-md)+var(--offset))] h-[calc(var(--insight-card-height)-var(--navbar-height)-var(--offset)-var(--padding-md)*2)] grid grid-cols-1 place-items-stretch lg:grid-cols-[2fr_1.2fr] will-change-transform text-black group-[.colorful]/section:text-white"
      style={cardStyle}
    >
      {/* Main Content Section */}
      <div className="relative h-full flex flex-col lg:flex-row gap-base lg:gap-xl p-md lg:pr-4xl fill-[var(--bg-color)] stroke-neutral-200 lg:border border-neutral-200 lg:bg-[var(--bg-color)] lg:rounded-2xl">
        
        {/* Mobile Background Shape */}
        <div className="absolute inset-0 -bottom-px lg:hidden bg-[var(--bg-color)] rounded-t-2xl border border-neutral-200 border-b-0" />
        
        {/* Feature Number */}
        <p className="xl font-mono text-black group-[.colorful]/section:text-white group-[.secondary]/insight:text-neutral-400 relative z-10">
          {feature.number}
        </p>
        
        {/* Content Container */}
        <div className="flex flex-col items-start justify-between gap-base h-full relative z-10">
          <div className="flex flex-col gap-base">
            
            {/* Title */}
            <h2 className="feature-title leading-none uppercase pr-lg lg:pr-0 text-[clamp(1.5rem,calc(1.179rem+1.282vw),2rem)] lg:text-[clamp(2rem,calc(0.857rem+1.786vw),3rem)] font-bold">
              {feature.title}
            </h2>
            
            {/* Description */}
            <p className="feature-description text-[1rem] sm:text-lg leading-[120%] text-gray-700 dark:text-gray-300">
              {feature.description}
            </p>
          </div>
          
          {/* Avalanche Logo */}
          <div className="size-[clamp(2rem,1.711rem+1.235vw,2.5rem)] lg:size-[clamp(1.5rem,0.357rem+1.786vw,2.5rem)] shrink-0 bg-transparent flex items-center justify-center rounded-full text-red group-[.colorful]/section:text-white group-[.secondary]/insight:text-red">
            <svg viewBox="0 0 722 628" className="w-1/2">
              <path d="M548.831 381.485C560.015 362.435 587.792 362.435 598.853 381.485L717.703 584.525C728.887 603.575 714.876 627.296 692.63 627.296H454.932C432.686 627.296 418.797 603.575 429.859 584.525L548.831 381.485Z" fill="currentcolor"/>
              <path d="M477.034 246.295C487.849 227.367 487.849 204.015 477.034 184.965L379.57 14.9872C368.631 -4.06311 341.346 -4.06311 330.408 14.9872L4.21765 584.407C-6.7209 603.457 6.92156 627.301 28.7987 627.301H223.603C245.358 627.301 265.391 615.625 276.207 596.697L476.911 246.295H477.034Z" fill="currentcolor"/>
            </svg>
          </div>
        </div>
      </div>
      
      {/* Icon Section */}
      <div className="relative flex items-center justify-center fill-[var(--bg-color)] bg-[var(--bg-color)] lg:bg-transparent stroke-neutral-200 border border-neutral-200 rounded-2xl lg:border-none lg:rounded-none">
        <div className="feature-icon h-20 py-xs lg:h-[clamp(6.625rem,-0.089rem+10.491vw,12.5rem)] w-auto shrink-0 flex items-center justify-center">
          {feature.icon}
        </div>
        
        {/* Desktop Background Shape */}
        <div className="hidden lg:block absolute inset-0 lg:-left-px bg-[var(--bg-color)] rounded-2xl border border-neutral-200" />
      </div>
    </div>
  );
};

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative overflow-hidden group/section"
      style={{
        '--navbar-height': '80px',
        '--padding-md': '2rem',
        '--insight-card-height': '80vh',
        '--color-neutral-50': '#f9fafb',
        '--color-neutral-100': '#f3f4f6', 
        '--color-neutral-300': '#d1d5db',
        '--color-red': '#E84142',
        '--base': '1rem',
        '--xl': '1.25rem',
        '--md': '0.75rem',
      } as React.CSSProperties}
    >
      <div className="relative flex flex-col items-stretch justify-start">
        
        {/* Sticky Header */}
        <h2 
          ref={headerRef}
          className="header-reveal sticky top-[calc(var(--navbar-height)+var(--padding-md))] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[80%] uppercase mb-xl bg-white dark:bg-black px-4 py-4 z-50"
        >
          <span className="w-fit block translate-x-[50vw] group-visible/section:translate-x-0 transition-transform duration-700 ease-out bg-white dark:bg-black pl-0.75 pt-0.75">
            Why
          </span>
          <span className="block bg-white dark:bg-black pl-0.75 pt-0.75 text-red-500">
            Choose Us
          </span>
        </h2>
        
        {/* Features Cards */}
        <div className="space-y-0">
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>
        
        {/* Bottom Spacer */}
        <div className="h-screen" aria-hidden="true" />
      </div>
    </section>
  );
}