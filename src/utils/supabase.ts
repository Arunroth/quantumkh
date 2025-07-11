import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://dtoironstdvrgabmcifp.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0b2lyb25zdGR2cmdhYm1jaWZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5NDg2MDYsImV4cCI6MjA1MjUyNDYwNn0.cLq0L3b5gx82cTTtZxGMxY6I4RdzBL5nOOrPIyUy4WM";

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);