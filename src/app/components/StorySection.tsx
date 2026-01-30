import { motion, useScroll, useTransform } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

export function StorySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-white px-4 sm:px-6 py-20 sm:py-32 md:py-40">
      <div className="mx-auto max-w-5xl">
        <motion.div
          style={{ opacity, scale }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 sm:mb-6 text-xs sm:text-sm uppercase tracking-[0.3em] text-neutral-500"
          >
            Our Philosophy
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight px-4"
          >
            Every Space Tells a Story.<br />
            <span className="text-neutral-400">What Will Yours Say?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-3xl text-base sm:text-lg leading-relaxed text-neutral-600 md:text-xl px-4"
          >
            We believe that exceptional design is more than aesthetics—it's an experience, a feeling, a journey. 
            From the first conversation to the final reveal, we guide you through a transformative process 
            that honors your vision while exceeding your expectations.
          </motion.p>

          {/* Decorative Elements */}
          <div className="mt-12 sm:mt-16 flex items-center justify-center gap-4 sm:gap-8">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1, delay: 0.6 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="h-px w-12 sm:w-16 bg-neutral-300 origin-center"
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Background Parallax Elements */}
      <motion.div
        style={{
          y: useTransform(scrollYProgress, [0, 1], [100, -100]),
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.1, 0]),
        }}
        className="absolute right-4 sm:right-10 top-20 h-48 w-48 sm:h-96 sm:w-96 rounded-full bg-neutral-100 blur-3xl"
      />
    </section>
  );
}
