import { motion, useScroll, useTransform } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Modern Kitchen",
    category: "Kitchen Design",
    image: "/pictures/kitchen_two.png",
  },
  {
    id: 2,
    title: "Elegant Living",
    category: "Living Room",
    image: "https://images.unsplash.com/photo-1707299231603-6c0a93e0f7fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwbGl2aW5nJTIwcm9vbXxlbnwxfHx8fDE3Njc5NDc0NjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 3,
    title: "Spa Bathroom",
    category: "Bathroom Design",
    image: "https://images.unsplash.com/photo-1686943812586-65d1d30ab40f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYXRocm9vbSUyMGRlc2lnbnxlbnwxfHx8fDE3Njc5NDE3ODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 4,
    title: "Contemporary Exterior",
    category: "Architecture",
    image: "/pictures/house.png"},
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
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section ref={ref} className="relative bg-white px-4 sm:px-6 py-16 sm:py-24 md:py-32">
      {/* Parallax Background Element */}
      <motion.div
        style={{ y }}
        className="absolute right-0 top-1/3 h-[300px] w-[300px] sm:h-[600px] sm:w-[600px] rounded-full bg-neutral-100/50 blur-3xl"
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
          <div className="mb-4 text-xs sm:text-sm uppercase tracking-[0.3em] text-neutral-500">Featured Work</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl">Our Portfolio</h2>
          <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base text-neutral-600 px-4">
            A curated selection of our most prestigious projects, showcasing our commitment to excellence and innovation.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid gap-4 sm:gap-6 md:gap-8 md:grid-cols-2"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={item}
              className="group relative aspect-[4/3] cursor-pointer overflow-hidden bg-neutral-100"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              onTouchStart={() => setHoveredId(project.id)}
              onClick={() => {
                // Could open a modal or navigate to project detail page
                // For now, we'll scroll to contact section to inquire about the project
                const contactSection = document.getElementById('contact');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <motion.img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover"
                animate={{
                  scale: hoveredId === project.id ? 1.15 : 1,
                }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
              
              {/* Curtain Reveal Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"
                initial={{ y: "100%" }}
                animate={{ y: hoveredId === project.id ? 0 : "100%" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex h-full flex-col items-center justify-center px-4 sm:px-8 text-white">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{
                      opacity: hoveredId === project.id ? 1 : 0,
                      y: hoveredId === project.id ? 0 : 30,
                    }}
                    transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-[0.2em] text-white/70"
                  >
                    {project.category}
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 30 }}
                    animate={{
                      opacity: hoveredId === project.id ? 1 : 0,
                      y: hoveredId === project.id ? 0 : 30,
                    }}
                    transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-2 text-xl sm:text-2xl md:text-3xl text-center px-2"
                  >
                    {project.title}
                  </motion.h3>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{
                      opacity: hoveredId === project.id ? 1 : 0,
                      y: hoveredId === project.id ? 0 : 30,
                    }}
                    transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-4 sm:mb-6 max-w-md text-center text-xs sm:text-sm text-white/60 px-2"
                  >
                    Discover how we transformed this space into a masterpiece
                  </motion.div>

                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: hoveredId === project.id ? 1 : 0,
                      scale: hoveredId === project.id ? 1 : 0.8,
                    }}
                    transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      // Could open a modal or navigate to project detail page
                      // For now, we'll scroll to contact section to inquire about the project
                      const contactSection = document.getElementById('contact');
                      contactSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="group/btn flex items-center gap-2 border border-white px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm uppercase tracking-wider transition-all duration-500 hover:bg-white hover:text-black"
                  >
                    View Project
                    <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover/btn:translate-x-1" />
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              // Scroll to contact section to discuss more projects
              const contactSection = document.getElementById('contact');
              contactSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative overflow-hidden border-2 border-black bg-transparent px-6 sm:px-12 py-3 sm:py-4 text-xs sm:text-sm uppercase tracking-widest text-black"
          >
            <motion.span
              className="absolute inset-0 bg-black"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
            <span className="relative z-10 flex items-center gap-2 transition-colors group-hover:text-white">
              Explore All Projects
              <ArrowRight className="h-4 w-4" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}