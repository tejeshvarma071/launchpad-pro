import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { z } from "zod";

const waitlistSchema = z.object({
  email: z.string().trim().email("Please enter a valid email").max(255),
  name: z.string().trim().max(100).optional(),
});

interface WaitlistFormProps {
  showName?: boolean;
  variant?: "hero" | "inline" | "card";
}

export const WaitlistForm = ({ showName = false, variant = "hero" }: WaitlistFormProps) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = waitlistSchema.safeParse({ email, name: name || undefined });
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from("waitlist")
        .insert({ email: result.data.email, name: result.data.name });

      if (error) {
        if (error.code === "23505") {
          toast.error("You're already on the waitlist!");
        } else {
          throw error;
        }
      } else {
        setIsSuccess(true);
        toast.success("Welcome aboard! You're on the list.");
        setEmail("");
        setName("");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess && variant === "hero") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-3 text-primary"
      >
        <CheckCircle className="w-6 h-6" />
        <span className="font-medium">You're on the list! We'll be in touch.</span>
      </motion.div>
    );
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-secondary border-border"
          required
        />
        <Button 
          type="submit" 
          disabled={isLoading}
          className="bg-gradient-to-r from-primary to-emerald-400 text-primary-foreground hover:opacity-90"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Join"}
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      {showName && (
        <Input
          type="text"
          placeholder="Your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-12 bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground"
        />
      )}
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 h-12 bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground"
          required
        />
        <Button 
          type="submit" 
          disabled={isLoading}
          size="lg"
          className="h-12 px-8 bg-gradient-to-r from-primary to-emerald-400 text-primary-foreground hover:opacity-90 glow-sm"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Join Waitlist
              <ArrowRight className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground text-center sm:text-left">
        No spam, ever. Unsubscribe anytime.
      </p>
    </form>
  );
};
