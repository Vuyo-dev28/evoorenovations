import { useState, useEffect } from "react";
import { Preloader } from "./components/Preloader";
import { ScrollProgress } from "./components/ScrollProgress";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { StorySection } from "./components/StorySection";
import { Services } from "./components/Services";
import { Portfolio } from "./components/Portfolio";
import { Process } from "./components/Process";
import { Testimonials } from "./components/Testimonials";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { trackPageView } from "../utils/analytics";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Track page view on load
  useEffect(() => {
    if (!isLoading) {
      trackPageView(window.location.pathname);
    }
  }, [isLoading]);

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      
      {!isLoading && (
        <div className="min-h-screen">
          <ScrollProgress />
          <Navbar />
          <Hero />
          <div id="about">
            <StorySection />
          </div>
          <div id="process">
            <Process />
          </div>
          <div id="services">
            <Services />
          </div>
          <div id="portfolio">
            <Portfolio />
          </div>
          <Testimonials />
          <div id="contact">
            <Contact />
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}