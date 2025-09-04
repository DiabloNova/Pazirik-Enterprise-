"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useContent } from "@/lib/hooks/use-content"
import Link from "next/link"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { getContent, getFontClass } = useContent()

  const menuItems = [
    {
      href: "/",
      label: getContent("خانه", "Главная"),
    },
    {
      href: "/about",
      label: getContent("درباره ما", "О нас"),
    },
    {
      href: "/services",
      label: getContent("خدمات", "Услуги"),
    },
    {
      href: "/services/visa",
      label: getContent("ویزای روسیه", "Российская виза"),
    },
    {
      href: "/services/study",
      label: getContent("تحصیل در روسیه", "Обучение в России"),
    },
    {
      href: "/services/transfer",
      label: getContent("حواله ارزی", "Денежные переводы"),
    },
    {
      href: "/magazine",
      label: getContent("مجله پازیریک", "Журнал Пазирик"),
    },
    {
      href: "/contact",
      label: getContent("تماس با ما", "Контакты"),
    },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-b navbar-shadow">
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-blue-500/5 to-red-500/5 animate-pulse-glow opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className={`text-xl font-bold text-primary font-persian animate-fade-in-up`}>
              {getContent("راشا گستر پازیریک", "Раша Гостар Пазирик")}
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
            {menuItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-foreground hover:text-primary transition-all duration-300 font-persian hover:scale-105 animate-slide-in-right`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:scale-110 transition-transform duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t animate-fade-in-up">
            <div className="flex flex-col space-y-3">
              {menuItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-foreground hover:text-primary transition-colors px-2 py-1 font-persian hover:translate-x-2 transition-transform duration-200 animate-fade-in-up`}
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
