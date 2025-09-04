"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plane, GraduationCap, CreditCard } from "lucide-react"
import { useContent } from "@/lib/hooks/use-content"
import Link from "next/link"

const services = [
  {
    icon: Plane,
    titlePersian: "دریافت انواع ویزای روسیه",
    titleRussian: "Получение различных типов российских виз",
    descriptionPersian: "خدمات کامل اخذ ویزای روسیه با بهترین قیمت و سریع‌ترین زمان",
    descriptionRussian: "Полный сервис получения российской визы по лучшей цене и в кратчайшие сроки",
    link: "/services/visa",
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    icon: GraduationCap,
    titlePersian: "تحصیل در روسیه",
    titleRussian: "Обучение в России",
    descriptionPersian: "راهنمایی کامل برای تحصیل در بهترین دانشگاه‌های روسیه",
    descriptionRussian: "Полное руководство по обучению в лучших университетах России",
    link: "/services/study",
    color: "text-green-600 dark:text-green-400",
  },
  {
    icon: CreditCard,
    titlePersian: "ارسال حواله ارزی به روسیه",
    titleRussian: "Отправка денежных переводов в Россию",
    descriptionPersian: "ارسال سریع و امن حواله ارزی با بهترین نرخ",
    descriptionRussian: "Быстрая и безопасная отправка денежных переводов по лучшему курсу",
    link: "/services/transfer",
    color: "text-purple-600 dark:text-purple-400",
  },
]

export function OurServices() {
  const { getContent, getFontClass } = useContent()

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 font-persian ${getFontClass()}`}>
          {getContent("خدمات ما", "Наши услуги")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <Card
                key={index}
                className="group card-shadow hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-2 hover:border-primary/20"
              >
                <CardContent className="p-8 text-center">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-6 ${service.color}`}
                  >
                    <IconComponent className="h-8 w-8" />
                  </div>

                  <h3 className={`text-xl font-semibold mb-4 font-persian ${getFontClass()}`}>
                    {getContent(service.titlePersian, service.titleRussian)}
                  </h3>

                  <p className={`text-muted-foreground mb-6 leading-relaxed font-persian ${getFontClass()}`}>
                    {getContent(service.descriptionPersian, service.descriptionRussian)}
                  </p>

                  <Link href={service.link}>
                    <Button
                      variant="outline"
                      className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent button-shadow"
                    >
                      <span className={`font-persian ${getFontClass()}`}>
                        {getContent("اطلاعات بیشتر", "Подробнее")}
                      </span>
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
