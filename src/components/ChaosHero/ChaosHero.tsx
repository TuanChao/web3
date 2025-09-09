import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { 
  ArrowRight, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Zap,
  Star,
  ChevronDown,
  Play
} from 'lucide-react';
import './ChaosHero.css';

export default function ChaosHero() {
  const [stats] = useState({
    totalValueLocked: 2450000000,
    volume24h: 89000000,
    totalUsers: 4200000,
    totalTrades: 125000000
  });

  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const mascotRef = useRef<HTMLDivElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      // Hero entrance animation
      const tl = gsap.timeline({ delay: 0.2 });
      
      tl.fromTo(titleRef.current, 
        { opacity: 0, y: 60, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' }
      )
      .fromTo(subtitleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4'
      )
      .fromTo(ctaRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3'
      )
      .fromTo(mascotRef.current,
        { opacity: 0, scale: 0.8, rotation: -10 },
        { opacity: 1, scale: 1, rotation: 0, duration: 0.7, ease: 'back.out(1.2)' }, '-=0.5'
      );

      // Floating animation for decorative elements
      gsap.to('.floating-element', {
        y: -15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
        stagger: 0.3
      });

      // Pancake mascot breathing animation
      gsap.to('.pancake-mascot', {
        scale: 1.05,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="pancake-hero" ref={heroRef}>
      {/* Background Elements */}
      <div className="hero-background">
        <div className="gradient-bg"></div>
        <div className="pattern-overlay"></div>
      </div>

      {/* Floating Decorative Elements */}
      {/* <div className="floating-elements" ref={floatingRef}>
        <div className="floating-element coin coin-1">💰</div>
        <div className="floating-element coin coin-2">🔄</div>
        <div className="floating-element coin coin-3">⚡</div>
        <div className="floating-element star star-1">⭐</div>
        <div className="floating-element star star-2">✨</div>
        <div className="floating-element star star-3">💎</div>
      </div> */}

      <div className="hero-container">
        {/* Left Content */}
        <div className="hero-content">
          <div className="hero-badge">
            <Zap className="badge-icon" />
            <span>Advanced DeFi Trading Platform</span>
          </div>

          <h1 className="hero-title" ref={titleRef}>
            Welcome to
            <span className="title-highlight"> ChaosSwap</span>
            <br />
            Your DeFi Gateway
          </h1>

          <p className="hero-subtitle" ref={subtitleRef}>
            Experience seamless token trading with the best rates, 
            lowest fees, and advanced features for DeFi enthusiasts.
          </p>

          <div className="hero-cta" ref={ctaRef}>
            <button className="cta-primary">
              <span>Connect Wallet</span>
              <ArrowRight className="cta-icon" />
            </button>
            
            <button className="cta-secondary">
              <Play className="play-icon" />
              <span>Trade Now</span>
            </button>
          </div>          
        </div>
        {/* Right Mascot */}
        
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <ChevronDown className="scroll-arrow" />
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}