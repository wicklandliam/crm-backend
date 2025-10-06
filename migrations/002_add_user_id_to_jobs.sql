-- Add user_id column to jobs table
ALTER TABLE jobs
ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Create index for faster user-specific queries
CREATE INDEX idx_jobs_user_id ON jobs(user_id);

-- Drop the old policy
DROP POLICY IF EXISTS "Allow all operations on jobs" ON jobs;

-- Create new RLS policies for user-specific access
-- Users can only see their own jobs
CREATE POLICY "Users can view their own jobs" ON jobs
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can only insert jobs for themselves
CREATE POLICY "Users can insert their own jobs" ON jobs
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can only update their own jobs
CREATE POLICY "Users can update their own jobs" ON jobs
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can only delete their own jobs
CREATE POLICY "Users can delete their own jobs" ON jobs
  FOR DELETE
  USING (auth.uid() = user_id);
