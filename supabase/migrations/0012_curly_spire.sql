/*
  # Additional Database Tables and Enhancements

  1. New Tables
    - `pricing_plans` - Store product pricing plans
    - `subscriptions` - Track user subscriptions
    - `subscription_features` - Features included in each plan
    - `payment_history` - Track payment records
    - `usage_metrics` - Track user resource usage

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies
    - Add indexes for performance

  3. Changes
    - Add subscription management
    - Add usage tracking
    - Add payment history
*/

-- Create pricing_plans table
CREATE TABLE IF NOT EXISTS pricing_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price_monthly numeric(10,2) NOT NULL,
  price_yearly numeric(10,2) NOT NULL,
  currency text NOT NULL DEFAULT 'AED',
  tier text NOT NULL CHECK (tier IN ('starter', 'professional', 'enterprise')),
  is_public boolean DEFAULT true,
  is_active boolean DEFAULT true,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create subscription_features table
CREATE TABLE IF NOT EXISTS subscription_features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id uuid REFERENCES pricing_plans ON DELETE CASCADE NOT NULL,
  feature_name text NOT NULL,
  feature_value text,
  is_highlighted boolean DEFAULT false,
  order_index integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (plan_id, feature_name)
);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  plan_id uuid REFERENCES pricing_plans ON DELETE RESTRICT NOT NULL,
  status text NOT NULL CHECK (status IN ('active', 'canceled', 'expired', 'past_due')),
  billing_cycle text NOT NULL CHECK (billing_cycle IN ('monthly', 'yearly')),
  current_period_start timestamptz NOT NULL,
  current_period_end timestamptz NOT NULL,
  cancel_at_period_end boolean DEFAULT false,
  canceled_at timestamptz,
  trial_start timestamptz,
  trial_end timestamptz,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create payment_history table
CREATE TABLE IF NOT EXISTS payment_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id uuid REFERENCES subscriptions ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  amount numeric(10,2) NOT NULL,
  currency text NOT NULL DEFAULT 'AED',
  status text NOT NULL CHECK (status IN ('pending', 'succeeded', 'failed')),
  payment_method text NOT NULL,
  invoice_url text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Create usage_metrics table
CREATE TABLE IF NOT EXISTS usage_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  subscription_id uuid REFERENCES subscriptions ON DELETE CASCADE NOT NULL,
  metric_name text NOT NULL,
  metric_value numeric NOT NULL,
  recorded_at timestamptz NOT NULL DEFAULT now(),
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_metrics ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Pricing Plans (public read for active plans)
CREATE POLICY "Public plans are viewable by everyone"
  ON pricing_plans FOR SELECT
  TO public
  USING (is_public AND is_active);

-- Subscription Features (public read)
CREATE POLICY "Features are viewable by everyone"
  ON subscription_features FOR SELECT
  TO public
  USING (true);

-- Subscriptions (users can view their own)
CREATE POLICY "Users can view their own subscriptions"
  ON subscriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Payment History (users can view their own)
CREATE POLICY "Users can view their own payments"
  ON payment_history FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Usage Metrics (users can view their own)
CREATE POLICY "Users can view their own usage"
  ON usage_metrics FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX pricing_plans_tier_idx ON pricing_plans(tier);
CREATE INDEX pricing_plans_is_active_idx ON pricing_plans(is_active);
CREATE INDEX subscription_features_plan_id_idx ON subscription_features(plan_id);
CREATE INDEX subscriptions_user_id_idx ON subscriptions(user_id);
CREATE INDEX subscriptions_plan_id_idx ON subscriptions(plan_id);
CREATE INDEX subscriptions_status_idx ON subscriptions(status);
CREATE INDEX payment_history_subscription_id_idx ON payment_history(subscription_id);
CREATE INDEX payment_history_user_id_idx ON payment_history(user_id);
CREATE INDEX payment_history_status_idx ON payment_history(status);
CREATE INDEX usage_metrics_user_id_idx ON usage_metrics(user_id);
CREATE INDEX usage_metrics_subscription_id_idx ON usage_metrics(subscription_id);
CREATE INDEX usage_metrics_metric_name_idx ON usage_metrics(metric_name);

-- Create updated_at triggers
CREATE TRIGGER update_pricing_plans_updated_at
  BEFORE UPDATE ON pricing_plans
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscription_features_updated_at
  BEFORE UPDATE ON subscription_features
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create views
CREATE OR REPLACE VIEW subscription_stats AS
SELECT
  p.tier,
  p.name as plan_name,
  COUNT(s.id) as total_subscriptions,
  COUNT(s.id) FILTER (WHERE s.status = 'active') as active_subscriptions,
  SUM(ph.amount) FILTER (WHERE ph.status = 'succeeded') as total_revenue
FROM pricing_plans p
LEFT JOIN subscriptions s ON p.id = s.plan_id
LEFT JOIN payment_history ph ON s.id = ph.subscription_id
GROUP BY p.tier, p.name;

CREATE OR REPLACE VIEW user_subscription_summary AS
SELECT
  s.user_id,
  p.name as plan_name,
  p.tier,
  s.status,
  s.billing_cycle,
  s.current_period_end,
  COUNT(DISTINCT ph.id) as total_payments,
  SUM(ph.amount) FILTER (WHERE ph.status = 'succeeded') as total_paid
FROM subscriptions s
JOIN pricing_plans p ON s.plan_id = p.id
LEFT JOIN payment_history ph ON s.id = ph.subscription_id
GROUP BY s.user_id, p.name, p.tier, s.status, s.billing_cycle, s.current_period_end;

-- Insert default pricing plans
INSERT INTO pricing_plans (name, description, price_monthly, price_yearly, tier) VALUES
('Starter', 'Perfect for small businesses', 4999, 47990, 'starter'),
('Professional', 'Ideal for growing teams', 12999, 124790, 'professional'),
('Enterprise', 'For large organizations', 99999, 999990, 'enterprise');

-- Insert features for each plan
WITH plans AS (
  SELECT id, tier FROM pricing_plans
)
INSERT INTO subscription_features (plan_id, feature_name, feature_value, is_highlighted, order_index)
SELECT
  p.id,
  feature_name,
  feature_value,
  is_highlighted,
  order_index
FROM plans p
CROSS JOIN (
  VALUES
    ('AI-powered calls', '10,000 minutes/month', true, 1),
    ('Team members', '5 users', true, 2),
    ('Analytics', 'Basic', false, 3),
    ('API access', 'Limited', false, 4)
) AS f(feature_name, feature_value, is_highlighted, order_index)
WHERE p.tier = 'starter'
UNION ALL
SELECT
  p.id,
  feature_name,
  feature_value,
  is_highlighted,
  order_index
FROM plans p
CROSS JOIN (
  VALUES
    ('AI-powered calls', '50,000 minutes/month', true, 1),
    ('Team members', 'Unlimited', true, 2),
    ('Analytics', 'Advanced', true, 3),
    ('API access', 'Full access', false, 4),
    ('Custom workflows', 'Included', true, 5)
) AS f(feature_name, feature_value, is_highlighted, order_index)
WHERE p.tier = 'professional'
UNION ALL
SELECT
  p.id,
  feature_name,
  feature_value,
  is_highlighted,
  order_index
FROM plans p
CROSS JOIN (
  VALUES
    ('AI-powered calls', 'Unlimited', true, 1),
    ('Team members', 'Unlimited', true, 2),
    ('Analytics', 'Enterprise', true, 3),
    ('API access', 'Priority access', true, 4),
    ('Custom development', 'Included', true, 5),
    ('Dedicated support', '24/7', true, 6)
) AS f(feature_name, feature_value, is_highlighted, order_index)
WHERE p.tier = 'enterprise';