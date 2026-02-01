import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { WaitlistForm } from "./WaitlistForm";
import { Sparkles } from "lucide-react";

export const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden bg-secondary/30">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Limited spots available
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-balance">
            Ready to <span className="gradient-text">launch</span>?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Join the waitlist today and be among the first to experience the future of startup development.
          </p>
          <div className="flex justify-center">
            <WaitlistForm showName />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
