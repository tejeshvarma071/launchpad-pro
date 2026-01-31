import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Shield, BarChart3, Globe, Layers, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Deploy in seconds, not hours. Our infrastructure is optimized for speed.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade encryption and compliance certifications built-in.",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Track every metric that matters with beautiful dashboards.",
  },
  {
    icon: Globe,
    title: "Global Scale",
    description: "Edge locations worldwide ensure your users get the best experience.",
  },
  {
    icon: Layers,
    title: "Seamless Integrations",
    description: "Connect with your favorite tools in just a few clicks.",
  },
  {
    icon: Rocket,
    title: "Continuous Deployment",
    description: "Ship features faster with automated CI/CD pipelines.",
  },
];

export const FeaturesPreview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-card/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Everything you need to{" "}
            <span className="gradient-text">launch & scale</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed for modern startups. Focus on building your product while we handle the rest.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-6 rounded-xl glass hover:glow-sm transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-emerald-400/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-12"
        >
          <Link to="/features">
            <Button variant="outline" size="lg" className="border-border hover:bg-secondary">
              View All Features
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
