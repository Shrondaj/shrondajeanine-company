/*
  # Create Newsletter Subscribers Table

  1. New Tables
    - `newsletter_subscribers`
      - `id` (uuid, primary key) - Unique identifier for each subscriber
      - `email` (text, unique) - Subscriber email address
      - `subscribed` (boolean) - Whether currently subscribed
      - `subscribed_at` (timestamptz) - When they subscribed
      - `unsubscribed_at` (timestamptz, nullable) - When they unsubscribed (if applicable)
      - `created_at` (timestamptz) - Record creation timestamp
  
  2. Security
    - Enable RLS on `newsletter_subscribers` table
    - Add policy for anyone to insert (subscribe)
    - Add policy for authenticated users to manage subscribers (for admin)
  
  3. Indexes
    - Index on email for fast lookups
    - Index on subscribed status for filtering
*/

-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  subscribed boolean DEFAULT true,
  subscribed_at timestamptz DEFAULT now(),
  unsubscribed_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can subscribe (insert)
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers
  FOR INSERT
  WITH CHECK (true);

-- Policy: Authenticated users can view all subscribers
CREATE POLICY "Authenticated users can view subscribers"
  ON newsletter_subscribers
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Authenticated users can update subscribers
CREATE POLICY "Authenticated users can update subscribers"
  ON newsletter_subscribers
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Authenticated users can delete subscribers
CREATE POLICY "Authenticated users can delete subscribers"
  ON newsletter_subscribers
  FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribed ON newsletter_subscribers(subscribed);
