import { useState } from "react";
import { MessageSquare, Send, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIdeaComments, useAddComment, type Comment } from "@/hooks/useIdeas";
import { formatDistanceToNow } from "date-fns";

interface CommentsDialogProps {
  ideaId: string | null;
  ideaName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommentsDialog({
  ideaId,
  ideaName,
  open,
  onOpenChange,
}: CommentsDialogProps) {
  const [newComment, setNewComment] = useState("");
  const { data: comments = [], isLoading } = useIdeaComments(ideaId);
  const addComment = useAddComment();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ideaId || !newComment.trim()) return;

    addComment.mutate(
      { ideaId, content: newComment.trim() },
      {
        onSuccess: () => setNewComment(""),
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Comments on {ideaName}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4 -mr-4 min-h-[200px] max-h-[300px]">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-pulse text-muted-foreground">
                Loading comments...
              </div>
            </div>
          ) : comments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <MessageSquare className="w-12 h-12 text-muted-foreground/50 mb-2" />
              <p className="text-muted-foreground">No comments yet</p>
              <p className="text-sm text-muted-foreground/70">
                Be the first to share your thoughts!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            </div>
          )}
        </ScrollArea>

        <form onSubmit={handleSubmit} className="mt-4 pt-4 border-t border-border">
          <div className="flex gap-2">
            <Textarea
              placeholder="Share your thoughts..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[80px] resize-none"
            />
          </div>
          <div className="flex justify-end mt-2">
            <Button
              type="submit"
              disabled={!newComment.trim() || addComment.isPending}
              className="bg-gradient-to-r from-primary to-emerald-400"
            >
              <Send className="w-4 h-4 mr-2" />
              {addComment.isPending ? "Posting..." : "Post Comment"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function CommentItem({ comment }: { comment: Comment }) {
  return (
    <div className="p-3 rounded-lg bg-muted/50">
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium text-sm text-foreground">
          {comment.author_name}
        </span>
        <span className="text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
        </span>
      </div>
      <p className="text-sm text-muted-foreground">{comment.content}</p>
    </div>
  );
}
