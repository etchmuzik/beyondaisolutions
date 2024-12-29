import { Header } from '../components/layout/Header';
import { HeroSlider } from '../components/home/HeroSlider';
import { KeyFeatures } from '../components/home/KeyFeatures';
import { WorkProcess } from '../components/home/WorkProcess';
import { Integrations } from '../components/home/Integrations';
import { Testimonials } from '../components/home/Testimonials';
import { CTA } from '../components/home/CTA';
import { Footer } from '../components/layout/Footer';

export function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      <HeroSlider />
      <KeyFeatures />
      <WorkProcess />
      <Integrations />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}