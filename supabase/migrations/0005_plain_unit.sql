/*
  # Reporting Views and Analytics Functions

  1. New Views
    - `user_performance_summary`: Aggregated user performance metrics
    - `call_success_rates`: Call success rates by user and period
    - `conversion_analytics`: Detailed conversion analytics
    
  2. Functions
    - Calculate user performance metrics
    - Generate activity summaries
*/

-- Create user performance summary view
CREATE OR REPLACE VIEW user_performance_summary AS
SELECT 
  u.id as user_id,
  p.full_name,
  COUNT(cs.id) as total_calls,
  COUNT(cs.id) FILTER (WHERE cs.status = 'completed') as completed_calls,
  COUNT(cs.id) FILTER (WHERE cs.status = 'failed') as failed_calls,
  CAST(AVG(EXTRACT(EPOCH FROM cs.duration)) AS NUMERIC(10,2)) as avg_duration_seconds,
  CAST(AVG(ca.sentiment_score) AS NUMERIC(10,2)) as avg_sentiment,
  COUNT(ct.id) as total_conversions,
  CAST(
    CASE 
      WHEN COUNT(cs.id) > 0 
      THEN (COUNT(ct.id)::NUMERIC * 100 / COUNT(cs.id)) 
      ELSE 0 
    END 
    AS NUMERIC(10,2)
  ) as conversion_rate
FROM auth.users u
LEFT JOIN profiles p ON u.id = p.id
LEFT JOIN call_schedules cs ON u.id = cs.user_id
LEFT JOIN call_analytics ca ON cs.id = ca.call_id
LEFT JOIN conversion_tracking ct ON cs.id = ct.call_id
GROUP BY u.id, p.full_name;

-- Create call success rates view
CREATE OR REPLACE VIEW call_success_rates AS
SELECT 
  user_id,
  date_trunc('week', scheduled_at) as period,
  COUNT(*) as total_calls,
  COUNT(*) FILTER (WHERE status = 'completed') as successful_calls,
  CAST(
    CASE 
      WHEN COUNT(*) > 0 
      THEN (COUNT(*) FILTER (WHERE status = 'completed')::NUMERIC * 100 / COUNT(*)) 
      ELSE 0 
    END 
    AS NUMERIC(10,2)
  ) as success_rate
FROM call_schedules
GROUP BY user_id, date_trunc('week', scheduled_at);

-- Create conversion analytics view
CREATE OR REPLACE VIEW conversion_analytics AS
SELECT 
  ct.user_id,
  p.full_name,
  ct.conversion_type,
  COUNT(*) as conversion_count,
  CAST(SUM(ct.value) AS NUMERIC(10,2)) as total_value,
  CAST(AVG(ct.value) AS NUMERIC(10,2)) as average_value,
  MIN(ct.created_at) as first_conversion,
  MAX(ct.created_at) as last_conversion
FROM conversion_tracking ct
JOIN profiles p ON ct.user_id = p.id
GROUP BY ct.user_id, p.full_name, ct.conversion_type;

-- Create function to calculate user performance metrics
CREATE OR REPLACE FUNCTION calculate_user_metrics(user_uuid uuid, start_date date)
RETURNS TABLE (
  metric_name text,
  metric_value numeric
) AS $$
BEGIN
  RETURN QUERY
  SELECT 'Total Calls'::text, COUNT(*)::numeric
  FROM call_schedules
  WHERE user_id = user_uuid
  AND date_trunc('day', scheduled_at) >= start_date
  UNION ALL
  SELECT 'Success Rate'::text,
    CAST(
      CASE 
        WHEN COUNT(*) > 0 
        THEN (COUNT(*) FILTER (WHERE status = 'completed')::NUMERIC * 100 / COUNT(*)) 
        ELSE 0 
      END 
      AS NUMERIC(10,2)
    )
  FROM call_schedules
  WHERE user_id = user_uuid
  AND date_trunc('day', scheduled_at) >= start_date
  UNION ALL
  SELECT 'Average Duration (minutes)'::text,
    CAST(AVG(EXTRACT(EPOCH FROM duration) / 60) AS NUMERIC(10,2))
  FROM call_schedules
  WHERE user_id = user_uuid
  AND date_trunc('day', scheduled_at) >= start_date;
END;
$$ LANGUAGE plpgsql;