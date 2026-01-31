import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CTASection } from "@/components/CTASection";
import { Target, Heart, Lightbulb, Users } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "We believe every founder deserves access to enterprise-grade tools. Our mission is to democratize startup infrastructure.",
  },
  {
    icon: Heart,
    title: "Customer Obsessed",
    description: "Your success is our success. We're not happy until you've launched and scaled your dream product.",
  },
  {
    icon: Lightbulb,
    title: "Innovation First",
    description: "We're constantly pushing boundaries. If there's a better way to do something, we'll find it.",
  },
  {
    icon: Users,
    title: "Community Focused",
    description: "We're building more than a product—we're building a community of ambitious founders.",
  },
];

const team = [
  { name: "Alex Turner", role: "CEO & Co-Founder", initials: "AT" },
  { name: "Jordan Lee", role: "CTO & Co-Founder", initials: "JL" },
  { name: "Sam Rivera", role: "Head of Product", initials: "SR" },
  { name: "Chris Morgan", role: "Head of Engineering", initials: "CM" },
];

const About = () => {
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
              Building the future of{" "}
              <span className="gradient-text">startup infrastructure</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              We're a team of engineers, designers, and entrepreneurs who believe 
              that building great products shouldn't require a massive team or budget.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-display font-bold mb-6 text-foreground">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  LaunchPad was born out of frustration. As repeat founders, we spent countless 
                  hours setting up infrastructure, configuring deployments, and wrestling with 
                  scaling issues—time that should have been spent building our products.
                </p>
                <p>
                  We asked ourselves: what if launching a startup was as simple as pushing 
                  code? What if security, scaling, and analytics were built-in from day one?
                </p>
                <p>
                  Today, LaunchPad powers thousands of startups worldwide, from solo founders 
                  to venture-backed teams. We're proud to be the platform that helps ideas 
                  become reality, faster than ever before.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Our <span className="gradient-text">Values</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4 p-6 rounded-xl glass"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-emerald-400/20 flex items-center justify-center shrink-0">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold mb-2 text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Meet the <span className="gradient-text">Team</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The people building LaunchPad
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary to-emerald-400 flex items-center justify-center text-xl font-bold text-primary-foreground mb-4">
                  {member.initials}
                </div>
                <h3 className="font-display font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
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

export default About;
