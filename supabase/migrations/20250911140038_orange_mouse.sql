/*
  # Create user profiles table for AI Fitness Coach

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, foreign key to auth.users.id)
      - `created_at` (timestamp with time zone, default now())
      - `name` (text, not null) - User's full name
      - `age` (smallint) - User's age in years
      - `height` (real) - User's height in centimeters
      - `weight` (real) - User's weight in kilograms
      - `fitness_level` (text) - User's fitness level (Beginner, Intermediate, Advanced)
      - `goals` (text[]) - Array of fitness goals

  2. Security
    - Enable RLS on `profiles` table
    - Add policy for users to read and update their own profile
    - Add policy for users to insert their own profile during onboarding
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now() NOT NULL,
  name text NOT NULL,
  age smallint,
  height real,
  weight real,
  fitness_level text,
  goals text[]
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policy for users to read their own profile
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Policy for users to insert their own profile
CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Policy for users to update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS profiles_id_idx ON profiles(id);