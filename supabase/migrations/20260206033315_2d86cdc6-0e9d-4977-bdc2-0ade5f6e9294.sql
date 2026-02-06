-- Create startup_ideas table
CREATE TABLE public.startup_ideas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  industry TEXT NOT NULL,
  stage TEXT NOT NULL DEFAULT 'Idea',
  author_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create idea_comments table
CREATE TABLE public.idea_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  idea_id UUID REFERENCES public.startup_ideas(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  author_name TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create idea_interests table (for "Interested" button)
CREATE TABLE public.idea_interests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  idea_id UUID REFERENCES public.startup_ideas(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(idea_id, user_id)
);

-- Enable RLS on all tables
ALTER TABLE public.startup_ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.idea_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.idea_interests ENABLE ROW LEVEL SECURITY;

-- RLS for startup_ideas
CREATE POLICY "Anyone authenticated can view ideas"
  ON public.startup_ideas FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create their own ideas"
  ON public.startup_ideas FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ideas"
  ON public.startup_ideas FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own ideas"
  ON public.startup_ideas FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS for idea_comments
CREATE POLICY "Anyone authenticated can view comments"
  ON public.idea_comments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create their own comments"
  ON public.idea_comments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments"
  ON public.idea_comments FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS for idea_interests
CREATE POLICY "Anyone authenticated can view interests"
  ON public.idea_interests FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can add their interest"
  ON public.idea_interests FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their interest"
  ON public.idea_interests FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Fix waitlist security issue
DROP POLICY IF EXISTS "Authenticated users can view waitlist" ON public.waitlist;
CREATE POLICY "No public read access to waitlist"
  ON public.waitlist FOR SELECT
  USING (false);