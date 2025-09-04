-- Create default admin user
-- First, we need to create the auth user, then add to admin_users table
-- Note: This will be handled by the admin setup process since we can't directly insert into auth.users

-- For now, we'll create a function to handle admin user creation
CREATE OR REPLACE FUNCTION create_admin_user(
  admin_email TEXT,
  admin_password TEXT,
  admin_username TEXT
) RETURNS UUID AS $$
DECLARE
  new_user_id UUID;
BEGIN
  -- This function will be called from the application
  -- to create the initial admin user
  RETURN new_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create admin settings table for storing admin configuration
CREATE TABLE IF NOT EXISTS public.admin_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key TEXT UNIQUE NOT NULL,
  setting_value JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for admin_settings
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

-- Allow authenticated admin users to manage settings
CREATE POLICY "admin_settings_admin_all" ON public.admin_settings FOR ALL USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
);

-- Insert default admin settings
INSERT INTO public.admin_settings (setting_key, setting_value) VALUES
('default_theme', '{"theme": "light"}'),
('default_language', '{"language": "fa"}'),
('admin_credentials', '{"username": "DiabloNova", "email": "admin@pazirik.com"}')
ON CONFLICT (setting_key) DO NOTHING;
