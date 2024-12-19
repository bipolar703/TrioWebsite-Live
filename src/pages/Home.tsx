import HeroSlider from '../components/home/HeroSlider';
import AboutSection from '../components/home/AboutSection';
import ClientLogos from '../components/home/ClientLogos';
import AchievementsSection from '../components/home/AchievementsSection';
import Features from '../components/home/Features';
import { useHeroSlides } from '../hooks/useHeroSlides';

export default function Home() {
  const { heroSlides, loading } = useHeroSlides();

  return (
    <main>
      {/* Hero Section */}
      {!loading && heroSlides.length > 0 && <HeroSlider slides={heroSlides} />}

      {/* Rest of the components */}
      <AboutSection />
      <AchievementsSection />
      <ClientLogos />
      <Features />
    </main>
  );
}