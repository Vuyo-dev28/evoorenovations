import { motion, useAnimate } from "motion/react";
import { useEffect, useState } from "react";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [scope, animate] = useAnimate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const sequence = async () => {
        await animate(scope.current, { opacity: 0 }, { duration: 0.8, delay: 0.3 });
        onComplete();
      };
      sequence();
    }
  }, [progress, animate, scope, onComplete]);

  return (
    <motion.div
      ref={scope}
      initial={{ opacity: 1 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-neutral-900"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-12 text-center"
      >
        <div className="mb-6 text-3xl tracking-[0.3em] text-white md:text-4xl">GM'S RENOVATION</div>
        <div className="text-sm uppercase tracking-[0.4em] text-white/50">Premium Design Experience</div>
      </motion.div>

      <div className="w-64">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress / 100 }}
          className="h-px origin-left bg-white"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-center text-sm text-white/40"
        >
          {progress}%
        </motion.div>
      </div>
    </motion.div>
  );
}
