import { motion, useScroll, useTransform } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Sparkles, Home, Palette, Ruler } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Full Home Renovation",
    description: "Complete home renovation services in Gauteng. Transform your entire house with expert renovation contractors and premium materials.",
  },
  {
    icon: Palette,
    title: "Interior Design",
    description: "Professional interior design and renovation services. Custom interior renovation solutions tailored to your home and lifestyle.",
  },
  {
    icon: Ruler,
    title: "Space Planning",
    description: "Expert space planning for home renovations. Optimize your layout to maximize functionality and aesthetic appeal in every room.",
  },
  {
    icon: Sparkles,
    title: "Luxury Finishes",
    description: "Premium luxury finishes and materials for your renovation project. High-end finishes that elevate your home renovation in Gauteng.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={ref} className="relative bg-neutral-50 px-4 sm:px-6 py-16 sm:py-24 md:py-32">
      {/* Parallax Background */}
      <motion.div
        style={{ y }}
        className="absolute left-0 top-1/4 h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full bg-neutral-200/30 blur-3xl"
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
            className="mx-auto mb-6 h-px w-24 bg-neutral-400"
          />
          <div className="mb-4 text-xs sm:text-sm uppercase tracking-[0.3em] text-neutral-500">Our Expertise</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl">Comprehensive Renovation Services</h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mx-auto mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base md:text-lg text-neutral-600 px-4"
          >
            From full home renovations to kitchen and bathroom remodeling, we provide expert renovation services throughout Gauteng, South Africa
          </motion.p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid gap-4 sm:gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={item}
              whileHover={{ y: -8, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
              className="group relative overflow-hidden border border-neutral-200 bg-white p-6 sm:p-8 transition-shadow duration-500 hover:shadow-2xl"
            >
              {/* Gradient overlay on hover */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.05 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-transparent"
              />
              
              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <service.icon className="mb-4 sm:mb-6 h-8 w-8 sm:h-10 sm:w-10 text-neutral-800" />
                </motion.div>
                <h3 className="mb-3 sm:mb-4 text-lg sm:text-xl">{service.title}</h3>
                <p className="text-sm sm:text-base text-neutral-600">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}