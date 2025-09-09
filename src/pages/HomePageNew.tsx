import { 
  HeroSection,
  QuickActionsSection, 
  CTASection 
} from '../components/sections';
import WhyChooseUsSection from '../components/featuresSection/WhyChooseUsSection';
import './HomePageNew.css';

export function HomePageNew() {
  return (
    <div className="homepage-new">
      <main className="homepage-main">
        {/* Section 1: Hero */}
        <HeroSection />

        {/* Section 2: Quick Actions */}
        <QuickActionsSection />

        {/* Section 3: Features */}
        {/* <FeaturesSection /> */}

        {/* Section 3.5: Why Choose Us */}
        <WhyChooseUsSection />

        {/* Section 4: Call to Action */}
        <CTASection />
      </main>
    </div>
  );
}