import { motion, useScroll, useTransform } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Consultation",
    description: "We begin with an in-depth conversation to understand your vision, preferences, and lifestyle requirements.",
    stage: "Discovery",
  },
  {
    number: "02",
    title: "Design Concept",
    description: "Our team creates detailed mood boards and 3D renderings to bring your dream space to life.",
    stage: "Creation",
  },
  {
    number: "03",
    title: "Material Selection",
    description: "Carefully curated materials and finishes are chosen to ensure the highest quality and aesthetic harmony.",
    stage: "Curation",
  },
  {
    number: "04",
    title: "Execution",
    description: "Expert craftsmen bring the design to reality with precision, care, and unwavering attention to detail.",
    stage: "Realization",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-neutral-900 px-4 sm:px-6 py-16 sm:py-24 text-white md:py-32">
      {/* Animated Background */}
      <motion.div
        style={{ y }}
        className="absolute right-0 top-1/4 h-[400px] w-[400px] sm:h-[700px] sm:w-[700px] rounded-full bg-white/5 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mb-6 h-px w-24 bg-white/40"
          />
          <div className="mb-4 text-xs sm:text-sm uppercase tracking-[0.3em] text-white/70">How We Work</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl">Our Design Process</h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mx-auto mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base md:text-lg text-white/60 px-4"
          >
            A carefully orchestrated journey from vision to reality
          </motion.p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid gap-8 sm:gap-12 md:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={item}
              whileHover={{ y: -12, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
              className="group relative"
            >
              {/* Stage Label */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="mb-2 sm:mb-3 text-xs uppercase tracking-[0.3em] text-white/40"
              >
                {step.stage}
              </motion.div>

              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative mb-4 sm:mb-6"
              >
                <div className="text-5xl sm:text-6xl md:text-7xl font-light text-white/20 transition-all duration-500 group-hover:text-white/30">
                  {step.number}
                </div>
                
                {/* Animated Circle */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute -right-2 sm:-right-4 -top-2 sm:-top-4 h-12 w-12 sm:h-16 sm:w-16 rounded-full border border-white/20"
                />
              </motion.div>

              <h3 className="mb-3 sm:mb-4 text-xl sm:text-2xl transition-colors duration-300 group-hover:text-white/90">{step.title}</h3>
              <p className="text-sm sm:text-base text-white/70 transition-colors duration-300 group-hover:text-white/80">{step.description}</p>
              
              {index < steps.length - 1 && (
                <>
                  {/* Connecting Line */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 + index * 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -right-6 top-16 hidden h-px w-12 origin-left bg-gradient-to-r from-white/20 to-transparent lg:block"
                  />
                  
                  {/* Animated Dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.5, delay: 1 + index * 0.2 }}
                    className="absolute -right-6 top-16 hidden h-1 w-1 rounded-full bg-white/40 lg:block"
                  />
                </>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}