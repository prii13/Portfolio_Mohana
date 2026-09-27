import { HelmetProvider } from 'react-helmet-async';
import { Header, Footer, ScrollProgress, NoiseOverlay } from '@/components/layout';
import {
  Hero,
  About,
  Skills,
  Experience,
  Publications,
  Projects,
  Certifications,
  Achievements,
  Contact,
} from '@/components/sections';

function App() {
  return (
    <HelmetProvider>
      <div className="min-h-screen bg-primary text-white antialiased relative overflow-x-hidden">
        <ScrollProgress />
        <NoiseOverlay opacity={0.15} />
        <Header />

        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Publications />
          <Certifications />
          <Achievements />
          <Contact />
        </main>

        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default App;
