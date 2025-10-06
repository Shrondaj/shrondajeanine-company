/*
  # Create FAQs Table for Abundant Harvest

  1. New Tables
    - `faqs`
      - `id` (uuid, primary key) - Unique identifier for each FAQ
      - `question` (text) - The FAQ question
      - `answer` (text) - The FAQ answer
      - `category` (text) - Category grouping (e.g., 'ordering', 'products', 'delivery')
      - `order_position` (integer) - Display order on the page
      - `active` (boolean) - Whether FAQ is visible
      - `created_at` (timestamptz) - When FAQ was created
      - `updated_at` (timestamptz) - When FAQ was last updated
  
  2. Security
    - Enable RLS on `faqs` table
    - Add policy for anyone to read active FAQs
    - Add policy for authenticated users to manage FAQs (for admin)
  
  3. Indexes
    - Index on active and order_position for efficient filtering and sorting
*/

-- Create faqs table
CREATE TABLE IF NOT EXISTS faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  category text DEFAULT 'general',
  order_position integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read active FAQs
CREATE POLICY "Anyone can view active FAQs"
  ON faqs
  FOR SELECT
  USING (active = true);

-- Policy: Authenticated users can view all FAQs
CREATE POLICY "Authenticated users can view all FAQs"
  ON faqs
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Authenticated users can insert FAQs
CREATE POLICY "Authenticated users can create FAQs"
  ON faqs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Authenticated users can update FAQs
CREATE POLICY "Authenticated users can update FAQs"
  ON faqs
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Authenticated users can delete FAQs
CREATE POLICY "Authenticated users can delete FAQs"
  ON faqs
  FOR DELETE
  TO authenticated
  USING (true);

-- Create index
CREATE INDEX IF NOT EXISTS idx_faqs_active_order ON faqs(active, order_position);

-- Create trigger to update updated_at
DROP TRIGGER IF EXISTS update_faqs_updated_at ON faqs;
CREATE TRIGGER update_faqs_updated_at
  BEFORE UPDATE ON faqs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample FAQs
INSERT INTO faqs (question, answer, category, order_position, active) VALUES
('How do I place an order?', 'You can place orders by calling us at (602) 902-2677 or emailing shrondajeanineandcompany@gmail.com. We recommend ordering at least 48 hours in advance to ensure availability.', 'ordering', 1, true),
('What payment methods do you accept?', 'We accept cash, Venmo, CashApp, and Zelle. Payment is due at pickup or delivery.', 'ordering', 2, true),
('Do you offer delivery?', 'Yes! We offer local delivery in the Phoenix, Arizona area. Delivery fees may apply based on location. Contact us for details.', 'delivery', 3, true),
('Are your products made in a licensed kitchen?', 'Abundant Harvest operates as an Arizona Cottage Food Program. All products are prepared in a residential kitchen that meets Arizona cottage food requirements and regulations.', 'products', 4, true),
('Do you accommodate dietary restrictions?', 'We can accommodate many dietary needs with advance notice. Please contact us to discuss your specific requirements, and we will do our best to create something special for you.', 'products', 5, true),
('How far in advance should I order?', 'We recommend placing orders at least 48-72 hours in advance. For large orders or special events, please give us at least one week notice.', 'ordering', 6, true),
('What is your cancellation policy?', 'We require 24 hours notice for cancellations. Orders cancelled with less than 24 hours notice may be subject to a cancellation fee.', 'ordering', 7, true),
('How should I store my items?', 'Storage instructions vary by product. Generally, baked goods should be kept in an airtight container at room temperature for 2-3 days, or refrigerated for up to a week. Jams should be refrigerated after opening.', 'products', 8, true);
