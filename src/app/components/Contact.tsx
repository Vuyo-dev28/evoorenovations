import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Here you would typically send the data to your backend
      console.log("Form submitted:", formData);
      
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
      
      // Reset success message after 3 seconds
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } catch (error) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={ref} className="relative bg-white px-4 sm:px-6 py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 sm:gap-12 lg:gap-16 lg:grid-cols-2">
          {/* Left Side - Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-4 text-xs sm:text-sm uppercase tracking-[0.3em] text-neutral-500">Get in Touch</div>
            <h2 className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Let's Create Something Extraordinary</h2>
            <p className="mb-8 sm:mb-12 text-base sm:text-lg text-neutral-600">
              Ready to transform your space? Reach out to us and let's discuss how we can bring your vision to life with our exclusive design services.
            </p>

            <div className="space-y-6 sm:space-y-8">
              {[
                { icon: MapPin, label: "Office", value: "Gauteng, South Africa", link: null },
                { icon: Phone, label: "Phone", value: "+27 67 844 3526", link: "tel:+27 67 844 3526" },
                { icon: Mail, label: "Email", value: "hello@gmsrenovation.com", link: "mailto:hello@gmsrenovation.com" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ x: 8, transition: { duration: 0.3 } }}
                  className="flex items-start gap-3 sm:gap-4"
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <item.icon className="h-5 w-5 sm:h-6 sm:w-6 text-neutral-400 flex-shrink-0" />
                  </motion.div>
                  <div className="min-w-0">
                    <div className="mb-1 text-xs sm:text-sm uppercase tracking-wider text-neutral-500">{item.label}</div>
                    {item.link ? (
                      <a
                        href={item.link}
                        className="text-sm sm:text-base md:text-lg transition-colors hover:text-neutral-900 break-words"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <div className="text-sm sm:text-base md:text-lg break-words">{item.value}</div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="border border-neutral-200 bg-neutral-50 p-6 sm:p-8 lg:p-12"
          >
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {["name", "email", "phone"].map((field, index) => (
                <motion.div
                  key={field}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <label
                    htmlFor={field}
                    className="mb-2 block text-sm uppercase tracking-wider text-neutral-700"
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <motion.input
                    type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                    id={field}
                    value={formData[field as keyof typeof formData]}
                    onChange={handleInputChange}
                    required
                    whileFocus={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                    className="w-full border border-neutral-300 bg-white px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base transition-all duration-300 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <label htmlFor="message" className="mb-2 block text-sm uppercase tracking-wider text-neutral-700">
                  Message
                </label>
                <motion.textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="w-full border border-neutral-300 bg-white px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base transition-all duration-300 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 resize-none"
                />
              </motion.div>
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-800"
                >
                  Thank you! Your inquiry has been sent successfully.
                </motion.div>
              )}
              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800"
                >
                  Something went wrong. Please try again.
                </motion.div>
              )}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className="w-full border-2 border-black bg-black px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm uppercase tracking-widest text-white transition-all duration-500 hover:bg-transparent hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Inquiry"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}