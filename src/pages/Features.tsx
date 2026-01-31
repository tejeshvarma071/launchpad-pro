import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CTASection } from "@/components/CTASection";
import { 
  Zap, Shield, BarChart3, Globe, Layers, Rocket, 
  Database, Code, Users, Bell, Lock, Cpu 
} from "lucide-react";

const allFeatures = [
  {
    icon: Zap,
    title: "Lightning Fast Deployment",
    description: "Deploy your applications in seconds with our optimized CI/CD pipeline. Zero-downtime deployments ensure your users never experience interruptions.",
    highlight: true,
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description: "SOC 2 Type II certified with bank-grade encryption. Your data is protected with industry-leading security practices.",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Beautiful dashboards with real-time metrics. Track user behavior, performance, and business KPIs in one place.",
    highlight: true,
  },
  {
    icon: Globe,
    title: "Global Edge Network",
    description: "200+ edge locations worldwide ensure sub-50ms latency for all your users, wherever they are.",
  },
  {
    icon: Layers,
    title: "Seamless Integrations",
    description: "Connect with Slack, GitHub, Jira, and 100+ other tools. Our API makes custom integrations a breeze.",
  },
  {
    icon: Rocket,
    title: "Continuous Deployment",
    description: "Automated testing, staging environments, and rollback capabilities. Ship with confidence.",
    highlight: true,
  },
  {
    icon: Database,
    title: "Managed Databases",
    description: "PostgreSQL, Redis, and MongoDB fully managed. Automatic backups, scaling, and maintenance.",
  },
  {
    icon: Code,
    title: "Developer-First API",
    description: "RESTful and GraphQL APIs with comprehensive documentation. SDKs for all major languages.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Role-based access control, audit logs, and team workspaces. Built for teams of all sizes.",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "AI-powered anomaly detection with customizable alerts. Know about issues before your users do.",
  },
  {
    icon: Lock,
    title: "Compliance Ready",
    description: "GDPR, HIPAA, and CCPA compliant out of the box. We handle the paperwork so you don't have to.",
  },
  {
    icon: Cpu,
    title: "Auto-Scaling",
    description: "Handle traffic spikes automatically. Pay only for what you use with intelligent scaling.",
  },
];

const Features = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Powerful features for{" "}
              <span className="gradient-text">modern startups</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Everything you need to build, deploy, and scale your product. 
              From development to production, we've got you covered.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-6 rounded-xl transition-all duration-300 ${
                  feature.highlight
                    ? "glass glow-sm"
                    : "bg-card/50 border border-border hover:bg-card"
                }`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                  feature.highlight
                    ? "bg-gradient-to-br from-primary to-emerald-400"
                    : "bg-secondary"
                }`}>
                  <feature.icon className={`w-6 h-6 ${
                    feature.highlight ? "text-primary-foreground" : "text-primary"
                  }`} />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default Features;
