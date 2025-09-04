-- Create additional CMS tables for content management
CREATE TABLE IF NOT EXISTS slider_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slide_number INTEGER NOT NULL,
  title_fa TEXT NOT NULL,
  title_ru TEXT NOT NULL,
  description_fa TEXT,
  description_ru TEXT,
  image_url TEXT NOT NULL,
  button_text_fa TEXT,
  button_text_ru TEXT,
  button_link TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS website_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section_key TEXT UNIQUE NOT NULL,
  content_fa JSONB NOT NULL,
  content_ru JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default slider content
INSERT INTO slider_content (slide_number, title_fa, title_ru, description_fa, description_ru, image_url, button_text_fa, button_text_ru, button_link) VALUES
(1, 'خدمات ویزای روسیه', 'Визовые услуги России', 'دریافت انواع ویزای روسیه با سرعت و دقت بالا', 'Получение различных типов российских виз быстро и точно', '/placeholder.svg?height=600&width=1200', 'اطلاعات بیشتر', 'Подробнее', '/services/visa'),
(2, 'تحصیل در روسیه', 'Обучение в России', 'راهنمایی کامل برای تحصیل در بهترین دانشگاه‌های روسیه', 'Полное руководство по обучению в лучших российских университетах', '/placeholder.svg?height=600&width=1200', 'شروع کنید', 'Начать', '/services/study'),
(3, 'حواله ارزی', 'Денежные переводы', 'ارسال سریع و امن حواله ارزی به روسیه', 'Быстрые и безопасные денежные переводы в Россию', '/placeholder.svg?height=600&width=1200', 'ارسال حواله', 'Отправить перевод', '/services/transfer');

-- Insert default website content
INSERT INTO website_content (section_key, content_fa, content_ru) VALUES
('promotional_banner', '{"text": "مشاوره تخصصی رایگان با پازیریک"}', '{"text": "Бесплатная специализированная консультация с Пазирик"}'),
('footer_contact', '{"phone": "+98 21 1234 5678", "email": "info@pazirik.com", "address": "تهران، خیابان ولیعصر، پلاک ۱۲۳"}', '{"phone": "+98 21 1234 5678", "email": "info@pazirik.com", "address": "Тегеран, улица Валиаср, дом 123"}'),
('why_pazirik', '{"reasons": ["تجربه بیش از ۱۰ سال", "مشاوره تخصصی رایگان", "پشتیبانی ۲۴ ساعته", "نرخ موفقیت ۹۸٪"]}', '{"reasons": ["Более 10 лет опыта", "Бесплатная специализированная консультация", "Круглосуточная поддержка", "98% успешности"]}');
