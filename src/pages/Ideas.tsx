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

export default function Ideas() {
  const { user, isLoading: authLoading } = useAuth();
  const { data: ideas = [], isLoading: ideasLoading } = useIdeas();
  const toggleInterest = useToggleInterest();
  
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);
  const [commentsOpen, setCommentsOpen] = useState(false);

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
    setSelectedIdea(idea);
    setCommentsOpen(true);
  };

  const handleInterestClick = (idea: Idea) => {
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
        </motion.div>

        {ideasLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-pulse text-muted-foreground">
              Loading ideas...
            </div>
          </div>
        ) : ideas.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-muted-foreground mb-4">
              No ideas shared yet. Be the first!
            </p>
            <Link to="/submit">
              <Button className="bg-gradient-to-r from-primary to-emerald-400 text-primary-foreground">
                Share Your Idea
              </Button>
            </Link>
          </motion.div>
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
