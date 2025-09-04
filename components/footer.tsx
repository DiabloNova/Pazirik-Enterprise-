"use client"

import { Phone, Mail, MapPin, Facebook, Instagram, Instagram as Telegram } from "lucide-react"
import { useContent } from "@/lib/hooks/use-content"
import Link from "next/link"

export function Footer() {
  const { getContent, getFontClass } = useContent()

  const quickLinks = [
    { href: "/", label: getContent("خانه", "Главная") },
    { href: "/about", label: getContent("درباره ما", "О нас") },
    { href: "/services", label: getContent("خدمات", "Услуги") },
    { href: "/contact", label: getContent("تماس با ما", "Контакты") },
  ]

  const services = [
    { href: "/services/visa", label: getContent("ویزای روسیه", "Российская виза") },
    { href: "/services/study", label: getContent("تحصیل در روسیه", "Обучение в России") },
    { href: "/services/transfer", label: getContent("حواله ارزی", "Денежные переводы") },
    { href: "/magazine", label: getContent("مجله پازیریک", "Журнал Пазирик") },
  ]

  return (
    <footer className="bg-card border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className={`text-xl font-bold text-primary ${getFontClass()}`}>
              {getContent("راشا گستر پازیریک", "Раша Гостар Пазирик")}
            </h3>
            <p className={`text-muted-foreground ${getFontClass()}`}>
              {getContent(
                "ارائه‌دهنده خدمات تخصصی روسیه با بیش از ۱۰ سال تجربه",
                "Поставщик специализированных российских услуг с более чем 10-летним опытом",
              )}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className={`text-lg font-semibold ${getFontClass()}`}>
              {getContent("لینک‌های سریع", "Быстрые ссылки")}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-muted-foreground hover:text-primary transition-colors ${getFontClass()}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className={`text-lg font-semibold ${getFontClass()}`}>{getContent("خدمات", "Услуги")}</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className={`text-muted-foreground hover:text-primary transition-colors ${getFontClass()}`}
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className={`text-lg font-semibold ${getFontClass()}`}>{getContent("تماس با ما", "Контакты")}</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Phone className="h-5 w-5 text-primary" />
                <span className={`text-muted-foreground ${getFontClass()}`}>09122183653</span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Mail className="h-5 w-5 text-primary" />
                <span className={`text-muted-foreground ${getFontClass()}`}>info@pazirik.com</span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <MapPin className="h-5 w-5 text-primary" />
                <span className={`text-muted-foreground ${getFontClass()}`}>
                  {getContent(
                    "تهران، یوسف آباد، خیابان عبدالحمید اکبری، برج سپهر ساعی، طبقه دهم ، واحد ۱۰۰۴",
                    "Тегеран, Юсеф Абад, улица Абдолхамид Акбари, башня Сепехр Саи, 10 этаж, квартира 1004",
                  )}
                </span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4 rtl:space-x-reverse pt-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Telegram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t mt-8 pt-8 text-center">
          <p className={`text-muted-foreground ${getFontClass()}`}>
            {getContent("تمامی حقوق محفوظ است - راشا گستر پازیریک", "Все права защищены - Раша Гостар Пазирик")}
            {" © 2024"}
          </p>
        </div>
      </div>
    </footer>
  )
}
