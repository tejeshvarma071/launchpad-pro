import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Founder, TechFlow",
    content: "The community feedback on my startup idea was invaluable. Other founders helped me refine my pitch and find my blind spots.",
    avatar: "SC",
  },
  {
    name: "Marcus Rodriguez",
    role: "Founder, NexGen",
    content: "Getting comments from experienced entrepreneurs transformed my business model. The collaborative environment here is unmatched.",
    avatar: "MR",
  },
  {
    name: "Emily Watson",
    role: "Founder, Streamline",
    content: "I posted my idea and within hours had actionable feedback. The premium access to see all ideas was worth every penny.",
    avatar: "EW",
  },
];

export const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            <span className="gradient-text">Comment, collaborate, improve</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Share your startup idea and get valuable feedback from the community. Comment on others to help them grow.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/10" />
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground mb-6 leading-relaxed relative z-10">"{testimonial.content}"</p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center text-sm font-semibold text-primary-foreground shadow-lg">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
