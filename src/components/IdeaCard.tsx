import { MessageSquare, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Idea } from "@/hooks/useIdeas";

interface IdeaCardProps {
  idea: Idea;
  index: number;
  onCommentsClick: () => void;
  onInterestClick: () => void;
  isTogglingInterest: boolean;
}

export function IdeaCard({
  idea,
  index,
  onCommentsClick,
  onInterestClick,
  isTogglingInterest,
}: IdeaCardProps) {
  return (
    <motion.div
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
            <span>by {idea.author_name}</span>
          </div>
        </div>
      </div>
      <p className="text-muted-foreground mb-4 leading-relaxed">
        {idea.description}
      </p>
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onCommentsClick}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <MessageSquare className="w-4 h-4" />
          <span>{idea.comments_count} comments</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onInterestClick}
          disabled={isTogglingInterest}
          className={cn(
            "flex items-center gap-2 transition-colors",
            idea.is_interested
              ? "text-primary hover:text-primary/80"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <ThumbsUp
            className={cn("w-4 h-4", idea.is_interested && "fill-current")}
          />
          <span>{idea.interests_count} interested</span>
        </Button>
      </div>
    </motion.div>
  );
}
