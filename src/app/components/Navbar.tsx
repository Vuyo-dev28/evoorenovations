import { motion, useScroll, useTransform } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { trackNavigation, trackButtonClick } from "../../utils/analytics";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.95)"]
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      // Close mobile menu on scroll
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    trackNavigation(sectionId);
    
    // Small delay to ensure mobile menu animation completes
    const delay = isMobileMenuOpen ? 300 : 0;
    
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        // Use scrollIntoView with block: 'start' and the CSS scroll-margin-top will handle the offset
        section.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, delay);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{ backgroundColor }}
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        isScrolled ? "text-black shadow-lg backdrop-blur-md bg-white/95" : "text-white"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-4 sm:py-6">
        {/* Logo */}
        <motion.button
          onClick={() => {
            trackButtonClick("Logo", "Navbar");
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-sm sm:text-lg md:text-xl tracking-[0.2em]"
        >
          EVOO RENOVATIONS
        </motion.button>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 lg:gap-12 md:flex">
          {[
            { label: "Portfolio", id: "portfolio" },
            { label: "Services", id: "services" },
            { label: "Process", id: "process" },
            { label: "About", id: "about" }
          ].map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -2 }}
              className="relative text-sm uppercase tracking-wider transition-opacity duration-300 hover:opacity-60"
            >
              {item.label}
              <motion.span
                className="absolute -bottom-1 left-0 h-px w-0 bg-current"
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </motion.button>
          ))}
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('contact')}
            className="relative overflow-hidden border border-current px-4 lg:px-8 py-2 lg:py-3 text-xs lg:text-sm uppercase tracking-wider transition-all duration-500"
          >
            <motion.span
              className="absolute inset-0 bg-current"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
            <span className={`relative z-10 transition-colors duration-300 ${isScrolled ? "group-hover:text-white" : ""}`}>
              Contact
            </span>
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: isMobileMenuOpen ? "auto" : 0,
          opacity: isMobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden md:hidden"
      >
        <div className={`border-t ${isScrolled ? 'border-black/20 bg-white/95 backdrop-blur-md' : 'border-white/20 bg-black/50 backdrop-blur-md'} px-4 py-6`}>
          <div className="flex flex-col gap-2">
            {[
              { label: "Portfolio", id: "portfolio" },
              { label: "Services", id: "services" },
              { label: "Process", id: "process" },
              { label: "About", id: "about" }
            ].map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                whileTap={{ scale: 0.98 }}
                className={`text-left py-3 px-2 text-base uppercase tracking-wider transition-all min-h-[44px] flex items-center ${
                  isScrolled 
                    ? 'text-black hover:bg-black/5 active:bg-black/10' 
                    : 'text-white hover:bg-white/10 active:bg-white/20'
                }`}
              >
                {item.label}
              </motion.button>
            ))}
            <motion.button
              onClick={() => scrollToSection('contact')}
              whileTap={{ scale: 0.95 }}
              className={`mt-2 border-2 ${isScrolled ? 'border-black text-black hover:bg-black hover:text-white' : 'border-white text-white hover:bg-white hover:text-black'} px-6 py-3.5 text-base uppercase tracking-wider transition-all min-h-[50px] flex items-center justify-center font-medium`}
            >
              Contact
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
}