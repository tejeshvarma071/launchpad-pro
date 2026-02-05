import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageSquare, ThumbsUp, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Placeholder data until database is set up
const placeholderIdeas = [
  {
    id: "1",
    name: "EcoTrack",
    description: "A mobile app that helps users track and reduce their carbon footprint through daily habit suggestions and community challenges.",
    industry: "Sustainability",
    stage: "Idea",
    author: "Alex M.",
    comments: 12,
    interests: 34,
  },
  {
    id: "2",
    name: "HealthSync",
    description: "AI-powered platform that aggregates health data from multiple wearables and provides personalized wellness recommendations.",
    industry: "HealthTech",
    stage: "MVP",
    author: "Jordan K.",
    comments: 8,
    interests: 27,
  },
  {
    id: "3",
    name: "LearnLoop",
    description: "Peer-to-peer skill exchange platform where professionals can teach and learn from each other in micro-sessions.",
    industry: "EdTech",
    stage: "Idea",
    author: "Sam R.",
    comments: 15,
    interests: 42,
  },
];

export default function Ideas() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
                Startup Ideas
              </h1>
              <p className="text-muted-foreground">
                Explore ideas from the community and share your feedback
              </p>
            </div>
            <Link to="/submit">
              <Button className="bg-gradient-to-r from-primary to-emerald-400 text-primary-foreground">
                Share Your Idea
              </Button>
            </Link>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-8">
            <Lock className="w-4 h-4" />
            <span className="text-sm">Premium members can see all ideas and comments</span>
          </div>
        </motion.div>

        <div className="grid gap-6">
          {placeholderIdeas.map((idea, index) => (
            <motion.div
              key={idea.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">
                    {idea.name}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span>{idea.industry}</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                    <span>{idea.stage}</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                    <span>by {idea.author}</span>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {idea.description}
              </p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm">{idea.comments} comments</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm">{idea.interests} interested</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
