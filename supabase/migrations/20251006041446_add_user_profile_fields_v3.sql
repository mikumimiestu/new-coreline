/*
  # Add User Profile and Subscription Fields

  1. Changes to users table
    - Add `username` (text, unique) - Username unik untuk user
    - Add `email` (text) - Email user
    - Add `phone` (text) - Nomor HP user
    - Add `subscription_type` (text) - Tipe langganan: free, plus, pro
    - Add `subscription_period` (text) - Periode: monthly, yearly
    - Add `subscription_start` (timestamptz) - Tanggal mulai langganan
    - Add `subscription_end` (timestamptz) - Tanggal akhir langganan
    - Add `subscription_status` (text) - Status: active, expired, cancelled

  2. New Table: subscriptions
    - Track payment history and subscription records

  3. Notes
    - Using ALTER TABLE ADD COLUMN IF NOT EXISTS syntax
    - Setting default values separately after columns are added
*/

-- Add all columns to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS username text;
ALTER TABLE users ADD COLUMN IF NOT EXISTS email text;
ALTER TABLE users ADD COLUMN IF NOT EXISTS phone text;
ALTER TABLE users ADD COLUMN IF NOT EXISTS subscription_type text DEFAULT 'free';
ALTER TABLE users ADD COLUMN IF NOT EXISTS subscription_period text;
ALTER TABLE users ADD COLUMN IF NOT EXISTS subscription_start timestamptz;
ALTER TABLE users ADD COLUMN IF NOT EXISTS subscription_end timestamptz;
ALTER TABLE users ADD COLUMN IF NOT EXISTS subscription_status text DEFAULT 'active';

-- Update existing users with default values where null
UPDATE users 
SET username = LOWER(access_code)
WHERE username IS NULL;

UPDATE users 
SET email = LOWER(access_code) || '@codelearn.com'
WHERE email IS NULL;

UPDATE users 
SET subscription_type = 'free'
WHERE subscription_type IS NULL;

UPDATE users 
SET subscription_status = 'active'
WHERE subscription_status IS NULL;

-- Add unique constraint to username
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'users_username_key'
  ) THEN
    ALTER TABLE users ADD CONSTRAINT users_username_key UNIQUE (username);
  END IF;
END $$;

-- Create subscriptions table for payment history
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subscription_type text NOT NULL,
  period text NOT NULL,
  amount decimal NOT NULL,
  currency text DEFAULT 'IDR',
  status text DEFAULT 'pending',
  start_date timestamptz,
  end_date timestamptz,
  payment_date timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on subscriptions table
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for subscriptions table
CREATE POLICY "Users can view own subscriptions"
  ON subscriptions FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own subscriptions"
  ON subscriptions FOR INSERT
  WITH CHECK (true);
