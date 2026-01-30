import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "The transformation of our home exceeded every expectation. Their attention to detail and commitment to excellence is unmatched.",
    author: "Sarah Mitchell",
    role: "Homeowner, Manhattan",
  },
  {
    quote: "Working with this team was an absolute pleasure. They turned our vision into a reality with grace and precision.",
    author: "David Chen",
    role: "CEO, Tech Startup",
  },
  {
    quote: "The quality of craftsmanship and the sophistication of design has truly elevated our living experience.",
    author: "Emma Thompson",
    role: "Designer, Brooklyn",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="bg-neutral-50 px-4 sm:px-6 py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 sm:mb-16 text-center"
        >
          <div className="mb-4 text-xs sm:text-sm uppercase tracking-[0.3em] text-neutral-500">Client Stories</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl">What Our Clients Say</h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid gap-6 sm:gap-8 md:grid-cols-3"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.author}
              variants={item}
              whileHover={{
                y: -8,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
              }}
              className="border border-neutral-200 bg-white p-6 sm:p-8 shadow-sm transition-shadow duration-500"
            >
              <motion.div
                whileHover={{ rotate: 180, scale: 1.2 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Quote className="mb-4 sm:mb-6 h-8 w-8 sm:h-10 sm:w-10 text-neutral-300" />
              </motion.div>
              <p className="mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed text-neutral-700">{testimonial.quote}</p>
              <div className="border-t border-neutral-200 pt-4 sm:pt-6">
                <div className="text-base sm:text-lg">{testimonial.author}</div>
                <div className="text-xs sm:text-sm text-neutral-500">{testimonial.role}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}