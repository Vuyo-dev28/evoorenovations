import { motion, useScroll, useTransform } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";
import { trackButtonClick } from "../../utils/analytics";

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <motion.div style={{ scale }} className="absolute inset-0">
        <img
          src="/pictures/banner.png"
          alt="EVOO Renovations - Professional Interior and Exterior Home Renovation Services in Gauteng, South Africa"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity, y }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-3 text-xs sm:text-sm uppercase tracking-[0.3em] text-white/90 px-4"
        >
          Interior & Exterior Renovations
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 sm:mb-6 max-w-4xl text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl px-4 leading-tight"
        >
          Transforming Spaces Into Timeless Elegance
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 sm:mb-12 max-w-2xl text-base sm:text-lg text-white/80 md:text-xl px-4"
        >
          Professional renovation services in Gauteng, South Africa. Specializing in interior and exterior home renovations, kitchen remodeling, bathroom design, and luxury finishes. Transform your space with EVOO Renovations.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            trackButtonClick("Start Your Journey", "Hero");
            const contactSection = document.getElementById('contact');
            contactSection?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="group relative overflow-hidden border-2 border-white bg-transparent px-6 sm:px-10 py-3 sm:py-4 text-xs sm:text-sm uppercase tracking-widest text-white transition-all duration-500 hover:text-black"
        >
          <motion.span
            className="absolute inset-0 bg-white"
            initial={{ y: "100%" }}
            whileHover={{ y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
          <span className="relative z-10">Start Your Journey</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6, ease: "easeOut" }}
          className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
          onClick={() => {
            const aboutSection = document.getElementById('about');
            aboutSection?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-6 w-6 sm:h-8 sm:w-8 text-white/70" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Reveal Overlay */}
      <motion.div
        style={{ scaleY: scrollYProgress }}
        className="absolute inset-0 origin-top bg-neutral-900"
      />
    </section>
  );
}