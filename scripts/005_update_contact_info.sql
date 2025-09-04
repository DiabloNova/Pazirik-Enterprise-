-- Update contact information in the database
UPDATE website_content 
SET 
  content_fa = '{"phone": "09122183653", "email": "info@pazirik.com", "address": "تهران، یوسف آباد، خیابان عبدالحمید اکبری، برج سپهر ساعی، طبقه دهم ، واحد ۱۰۰۴"}',
  content_ru = '{"phone": "09122183653", "email": "info@pazirik.com", "address": "Тегеран, Юсеф Абад, улица Абдолхамид Акбари, башня Сепехр Саи, 10 этаж, квартира 1004"}',
  updated_at = NOW()
WHERE section_key = 'footer_contact';

-- Update slider images to use new .jpg files
UPDATE slider_content 
SET 
  image_url = CASE 
    WHEN slide_number = 1 THEN '/russian-visa-services.png'
    WHEN slide_number = 2 THEN '/russian-university-students.png'
    WHEN slide_number = 3 THEN '/currency-transfer-russia.png'
    ELSE image_url
  END,
  updated_at = NOW()
WHERE slide_number IN (1, 2, 3);
