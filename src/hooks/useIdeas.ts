import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export interface Idea {
  id: string;
  name: string;
  description: string;
  industry: string;
  stage: string;
  author_name: string;
  user_id: string;
  created_at: string;
  comments_count: number;
  interests_count: number;
  is_interested: boolean;
}

export interface Comment {
  id: string;
  idea_id: string;
  user_id: string;
  author_name: string;
  content: string;
  created_at: string;
}

export function useIdeas() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["ideas"],
    queryFn: async () => {
      // Fetch ideas
      const { data: ideas, error: ideasError } = await supabase
        .from("startup_ideas")
        .select("*")
        .order("created_at", { ascending: false });

      if (ideasError) throw ideasError;

      // Fetch all comments counts
      const { data: commentsCounts } = await supabase
        .from("idea_comments")
        .select("idea_id");

      // Fetch all interests counts
      const { data: interestsCounts } = await supabase
        .from("idea_interests")
        .select("idea_id, user_id");

      // Map ideas with counts
      return (ideas || []).map((idea) => ({
        ...idea,
        comments_count: commentsCounts?.filter((c) => c.idea_id === idea.id).length || 0,
        interests_count: interestsCounts?.filter((i) => i.idea_id === idea.id).length || 0,
        is_interested: interestsCounts?.some(
          (i) => i.idea_id === idea.id && i.user_id === user?.id
        ) || false,
      })) as Idea[];
    },
    enabled: !!user,
  });
}

export function useIdeaComments(ideaId: string | null) {
  return useQuery({
    queryKey: ["idea-comments", ideaId],
    queryFn: async () => {
      if (!ideaId) return [];
      
      const { data, error } = await supabase
        .from("idea_comments")
        .select("*")
        .eq("idea_id", ideaId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data as Comment[];
    },
    enabled: !!ideaId,
  });
}

export function useAddComment() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ ideaId, content }: { ideaId: string; content: string }) => {
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from("idea_comments").insert({
        idea_id: ideaId,
        user_id: user.id,
        author_name: user.email?.split("@")[0] || "Anonymous",
        content,
      });

      if (error) throw error;
    },
    onSuccess: (_, { ideaId }) => {
      queryClient.invalidateQueries({ queryKey: ["idea-comments", ideaId] });
      queryClient.invalidateQueries({ queryKey: ["ideas"] });
      toast.success("Comment added!");
    },
    onError: () => {
      toast.error("Failed to add comment");
    },
  });
}

export function useToggleInterest() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ ideaId, isInterested }: { ideaId: string; isInterested: boolean }) => {
      if (!user) throw new Error("Not authenticated");

      if (isInterested) {
        // Remove interest
        const { error } = await supabase
          .from("idea_interests")
          .delete()
          .eq("idea_id", ideaId)
          .eq("user_id", user.id);

        if (error) throw error;
      } else {
        // Add interest
        const { error } = await supabase.from("idea_interests").insert({
          idea_id: ideaId,
          user_id: user.id,
        });

        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ideas"] });
    },
    onError: () => {
      toast.error("Failed to update interest");
    },
  });
}
