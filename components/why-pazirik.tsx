"use client"

import { useState, useEffect } from "react"
import { CheckCircle } from "lucide-react"
import { useContent } from "@/lib/hooks/use-content"

const reasons = [
  {
    persian: "تجربه بیش از ۱۰ سال در خدمات روسیه",
    russian: "Более 10 лет опыта в российских услугах",
  },
  {
    persian: "پشتیبانی ۲۴ ساعته",
    russian: "Круглосуточная поддержка",
  },
  {
    persian: "بهترین قیمت‌ها در بازار",
    russian: "Лучшие цены на рынке",
  },
  {
    persian: "سرعت بالا در ارائه خدمات",
    russian: "Высокая скорость предоставления услуг",
  },
  {
    persian: "مشاوره رایگان",
    russian: "Бесплатная консультация",
  },
]

export function WhyPazirik() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const { getContent, getFontClass } = useContent()

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleItems((prev) => {
        if (prev.length < reasons.length) {
          return [...prev, prev.length]
        }
        return []
      })
    }, 800)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className={`text-3xl md:text-4xl font-bold mb-12 ${getFontClass()}`}>
          {getContent("چرا پازیریک بهترین انتخاب است؟", "Почему Пазирик - лучший выбор?")}
        </h2>

        <div className="space-y-6">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className={`flex items-center justify-center space-x-4 rtl:space-x-reverse transition-all duration-500 transform ${
                visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0" />
              <span className={`text-lg md:text-xl ${getFontClass()}`}>
                {getContent(reason.persian, reason.russian)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
