"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { useContent } from "@/lib/hooks/use-content"
import { OptimizedImage } from "@/components/optimized-image"

interface SpecialOffer {
  id: string
  title_fa: string
  title_ru: string
  description_fa: string
  description_ru: string
  image_url: string
  link_url: string
  is_active: boolean
  order: number
}

const fallbackOffers = [
  {
    image: "/visa-discount-special-offer.png",
    titlePersian: "تخفیف ویژه ویزا",
    titleRussian: "Специальная скидка на визу",
    descriptionPersian: "۲۰٪ تخفیف برای درخواست ویزای روسیه",
    descriptionRussian: "20% скидка на подачу заявления на российскую визу",
    link: "/services/visa",
  },
  {
    image: "/free-education-consultation.png",
    titlePersian: "مشاوره رایگان تحصیل",
    titleRussian: "Бесплатная консультация по образованию",
    descriptionPersian: "مشاوره کامل و رایگان برای تحصیل در روسیه",
    descriptionRussian: "Полная и бесплатная консультация по обучению в России",
    link: "/services/study",
  },
  {
    image: "/no-fee-money-transfer.png",
    titlePersian: "حواله بدون کارمزد",
    titleRussian: "Перевод без комиссии",
    descriptionPersian: "ارسال حواله ارزی بدون کارمزد اضافی",
    descriptionRussian: "Отправка денежного перевода без дополнительной комиссии",
    link: "/services/transfer",
  },
  {
    image: "/express-visa-service.png",
    titlePersian: "ویزای فوری",
    titleRussian: "Экспресс-виза",
    descriptionPersian: "دریافت ویزا در کمترین زمان ممکن",
    descriptionRussian: "Получение визы в кратчайшие сроки",
    link: "/services/visa",
  },
  {
    image: "/russian-exhibitions.png",
    titlePersian: "شرکت در نمایشگاه های روسیه",
    titleRussian: "Участие в российских выставках",
    descriptionPersian: "راهنمایی کامل برای حضور در نمایشگاه‌های تجاری روسیه",
    descriptionRussian: "Полное руководство по участию в российских торговых выставках",
    link: "/services/exhibitions",
  },
  {
    image: "/company-registration-russia.png",
    titlePersian: "مشاوره ثبت شرکت در روسیه",
    titleRussian: "Консультация по регистрации компании в России",
    descriptionPersian: "راهنمایی تخصصی برای ثبت و راه‌اندازی شرکت در روسیه",
    descriptionRussian: "Экспертное руководство по регистрации и запуску компании в России",
    link: "/services/company-registration",
  },
]

export function SpecialOffers() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [offers, setOffers] = useState<SpecialOffer[]>([])
  const [loading, setLoading] = useState(true)
  const { getContent, getFontClass } = useContent()

  useEffect(() => {
    const loadOffers = async () => {
      try {
        const response = await fetch("/api/cms/offers")
        if (response.ok) {
          const data = await response.json()
          const activeOffers = data.filter((offer: SpecialOffer) => offer.is_active)
          setOffers(activeOffers)
        }
      } catch (error) {
        console.error("Failed to load special offers:", error)
      } finally {
        setLoading(false)
      }
    }

    loadOffers()
  }, [])

  useEffect(() => {
    const displayOffers = offers.length > 0 ? offers : fallbackOffers
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.max(1, displayOffers.length))
    }, 4000)

    return () => clearInterval(timer)
  }, [offers])

  if (loading) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-muted animate-pulse rounded-lg h-64"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  const displayOffers = offers.length > 0 ? offers : fallbackOffers
  const visibleOffers = displayOffers.slice(currentIndex, currentIndex + 3)

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className={`text-3xl md:text-4xl font-bold text-center mb-12 font-persian ${getFontClass()} animate-fade-in-up`}
        >
          {getContent("پیشنهادات ویژه", "Специальные предложения")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleOffers.map((offer, index) => {
            const offerData =
              "title_fa" in offer
                ? {
                    image: offer.image_url,
                    title: getContent(offer.title_fa, offer.title_ru),
                    description: getContent(offer.description_fa, offer.description_ru),
                    link: offer.link_url,
                  }
                : {
                    image: offer.image,
                    title: getContent(offer.titlePersian, offer.titleRussian),
                    description: getContent(offer.descriptionPersian, offer.descriptionRussian),
                    link: offer.link,
                  }

            return (
              <Link key={`${currentIndex}-${index}`} href={offerData.link}>
                <Card
                  className="group card-shadow hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 cursor-pointer overflow-hidden animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="aspect-video overflow-hidden">
                    <OptimizedImage
                      src={offerData.image || "/placeholder.svg"}
                      alt={offerData.title}
                      width={400}
                      height={225}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className={`text-xl font-semibold mb-3 font-persian ${getFontClass()}`}>{offerData.title}</h3>
                    <p className={`text-muted-foreground font-persian ${getFontClass()}`}>{offerData.description}</p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
