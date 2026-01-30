import { motion } from "motion/react";
import { Instagram, Facebook, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-neutral-900 px-4 sm:px-6 py-12 sm:py-16 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 sm:gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mb-4 sm:mb-6 text-lg sm:text-xl md:text-2xl tracking-[0.2em]"
            >
              GM'S RENOVATION
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6 text-sm sm:text-base text-white/70"
            >
              Crafting exceptional spaces that embody sophistication, elegance, and timeless design since 2010.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex gap-4"
            >
              {[
                { Icon: Instagram, url: "https://instagram.com" },
                { Icon: Facebook, url: "https://facebook.com" },
                { Icon: Linkedin, url: "https://linkedin.com" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="transition-opacity hover:opacity-60"
                >
                  <social.Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-6 text-sm uppercase tracking-wider text-white/50">Quick Links</div>
            <ul className="space-y-3">
              {[
                { label: "Portfolio", id: "portfolio" },
                { label: "Services", id: "services" },
                { label: "Process", id: "process" },
                { label: "About Us", id: "about" }
              ].map((link, index) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
                  whileHover={{ x: 5 }}
                >
                  <button
                    onClick={() => {
                      const section = document.getElementById(link.id);
                      section?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-white/70 transition-opacity hover:opacity-100"
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-6 text-sm uppercase tracking-wider text-white/50">Contact</div>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-white/70">
              <li>123 Design Avenue</li>
              <li>New York, NY 10001</li>
              <li className="mt-4"><a href="tel:+15551234567" className="hover:text-white transition-colors">+1 (555) 123-4567</a></li>
              <li><a href="mailto:hello@gmsrenovation.com" className="hover:text-white transition-colors break-words">hello@gmsrenovation.com</a></li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 sm:mt-16 border-t border-white/10 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-white/50"
        >
          © 2026 GM'S RENOVATION. All rights reserved.
        </motion.div>
      </div>
    </footer>
  );
}