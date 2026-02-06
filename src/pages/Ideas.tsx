import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IdeaCard } from "@/components/IdeaCard";
import { CommentsDialog } from "@/components/CommentsDialog";
import { useIdeas, useToggleInterest, type Idea } from "@/hooks/useIdeas";

// Sample ideas to show when database is empty
const sampleIdeas: Idea[] = [
  {
    id: "sample-1",
    name: "EcoTrack",
    description: "A mobile app that helps users track and reduce their carbon footprint through daily habit suggestions and community challenges.",
    industry: "Sustainability",
    stage: "Idea",
    author_name: "Alex M.",
    user_id: "",
    created_at: new Date().toISOString(),
    comments_count: 12,
    interests_count: 34,
    is_interested: false,
  },
  {
    id: "sample-2",
    name: "HealthSync",
    description: "AI-powered platform that aggregates health data from multiple wearables and provides personalized wellness recommendations.",
    industry: "HealthTech",
    stage: "MVP",
    author_name: "Jordan K.",
    user_id: "",
    created_at: new Date().toISOString(),
    comments_count: 8,
    interests_count: 27,
    is_interested: false,
  },
  {
    id: "sample-3",
    name: "LearnLoop",
    description: "Peer-to-peer skill exchange platform where professionals can teach and learn from each other in micro-sessions.",
    industry: "EdTech",
    stage: "Idea",
    author_name: "Sam R.",
    user_id: "",
    created_at: new Date().toISOString(),
    comments_count: 15,
    interests_count: 42,
    is_interested: false,
  },
];

export default function Ideas() {
  const { user, isLoading: authLoading } = useAuth();
  const { data: dbIdeas = [], isLoading: ideasLoading } = useIdeas();
  const toggleInterest = useToggleInterest();
  
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);
  const [commentsOpen, setCommentsOpen] = useState(false);

  // Use database ideas if available, otherwise show sample ideas
  const ideas = dbIdeas.length > 0 ? dbIdeas : sampleIdeas;
  const isShowingSamples = dbIdeas.length === 0;

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const handleCommentsClick = (idea: Idea) => {
    if (isShowingSamples) return; // Don't open comments for sample ideas
    setSelectedIdea(idea);
    setCommentsOpen(true);
  };

  const handleInterestClick = (idea: Idea) => {
    if (isShowingSamples) return; // Don't toggle interest for sample ideas
    toggleInterest.mutate({
      ideaId: idea.id,
      isInterested: idea.is_interested,
    });
  };

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
                <Plus className="w-4 h-4 mr-2" />
                Share Your Idea
              </Button>
            </Link>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-8">
            <Lock className="w-4 h-4" />
            <span className="text-sm">
              Premium members can see all ideas and comments
            </span>
          </div>

          {isShowingSamples && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-muted-foreground mb-4 ml-4">
              <span className="text-sm">
                Showing sample ideas. Share your own to get started!
              </span>
            </div>
          )}
        </motion.div>

        {ideasLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-pulse text-muted-foreground">
              Loading ideas...
            </div>
          </div>
        ) : (
          <div className="grid gap-6">
            {ideas.map((idea, index) => (
              <IdeaCard
                key={idea.id}
                idea={idea}
                index={index}
                onCommentsClick={() => handleCommentsClick(idea)}
                onInterestClick={() => handleInterestClick(idea)}
                isTogglingInterest={toggleInterest.isPending}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />

      <CommentsDialog
        ideaId={selectedIdea?.id || null}
        ideaName={selectedIdea?.name || ""}
        open={commentsOpen}
        onOpenChange={setCommentsOpen}
      />
    </div>
  );
}
