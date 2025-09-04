-- Create admin users table for the admin panel
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for admin_users
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Admin users can only access their own data
CREATE POLICY "admin_users_select_own" ON public.admin_users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "admin_users_update_own" ON public.admin_users FOR UPDATE USING (auth.uid() = id);

-- Create website content tables
CREATE TABLE IF NOT EXISTS public.website_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key TEXT UNIQUE NOT NULL,
  content_persian JSONB NOT NULL DEFAULT '{}',
  content_russian JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for website_content
ALTER TABLE public.website_content ENABLE ROW LEVEL SECURITY;

-- Allow authenticated admin users to manage content
CREATE POLICY "website_content_select" ON public.website_content FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
);
CREATE POLICY "website_content_insert" ON public.website_content FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
);
CREATE POLICY "website_content_update" ON public.website_content FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
);
CREATE POLICY "website_content_delete" ON public.website_content FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
);

-- Create slider images table
CREATE TABLE IF NOT EXISTS public.slider_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  title_persian TEXT NOT NULL,
  title_russian TEXT NOT NULL,
  description_persian TEXT,
  description_russian TEXT,
  cta_text_persian TEXT NOT NULL,
  cta_text_russian TEXT NOT NULL,
  cta_link TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for slider_images
ALTER TABLE public.slider_images ENABLE ROW LEVEL SECURITY;

-- Allow public read access for slider images
CREATE POLICY "slider_images_select_public" ON public.slider_images FOR SELECT USING (is_active = TRUE);

-- Allow authenticated admin users to manage slider images
CREATE POLICY "slider_images_admin_all" ON public.slider_images FOR ALL USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
);

-- Create special offers table
CREATE TABLE IF NOT EXISTS public.special_offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  title_persian TEXT NOT NULL,
  title_russian TEXT NOT NULL,
  description_persian TEXT NOT NULL,
  description_russian TEXT NOT NULL,
  link_url TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for special_offers
ALTER TABLE public.special_offers ENABLE ROW LEVEL SECURITY;

-- Allow public read access for special offers
CREATE POLICY "special_offers_select_public" ON public.special_offers FOR SELECT USING (is_active = TRUE);

-- Allow authenticated admin users to manage special offers
CREATE POLICY "special_offers_admin_all" ON public.special_offers FOR ALL USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
);
