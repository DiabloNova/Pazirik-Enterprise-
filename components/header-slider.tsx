"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useContent } from "@/lib/hooks/use-content"
import Link from "next/link"
import { OptimizedImage } from "@/components/optimized-image"

interface SliderContent {
  id: string
  slide_number: number
  title_fa: string
  title_ru: string
  description_fa: string
  description_ru: string
  image_url: string
  button_text_fa: string
  button_text_ru: string
  button_link: string
  is_active: boolean
}

const fallbackSlides = [
  {
    image: "/russian-visa-services.png",
    titlePersian: "خدمات ویزای روسیه",
    titleRussian: "Услуги российской визы",
    descriptionPersian: "دریافت سریع و آسان ویزای روسیه با پازیریک",
    descriptionRussian: "Быстрое и легкое получение российской визы с Пазирик",
    ctaPersian: "درخواست ویزا",
    ctaRussian: "Подать заявку на визу",
    link: "/services/visa",
    bgColor: "from-blue-600/80 to-blue-800/80",
  },
  {
    image: "/russian-university-students.png",
    titlePersian: "تحصیل در روسیه",
    titleRussian: "Обучение в России",
    descriptionPersian: "بهترین دانشگاه‌های روسیه در انتظار شما",
    descriptionRussian: "Лучшие российские университеты ждут вас",
    ctaPersian: "اطلاعات بیشتر",
    ctaRussian: "Подробнее",
    link: "/services/study",
    bgColor: "from-green-600/80 to-green-800/80",
  },
  {
    image: "/currency-transfer-russia.png",
    titlePersian: "حواله ارزی به روسیه",
    titleRussian: "Денежные переводы в Россию",
    descriptionPersian: "ارسال امن و سریع پول به روسیه",
    descriptionRussian: "Безопасная и быстрая отправка денег в Россию",
    ctaPersian: "ارسال حواله",
    ctaRussian: "Отправить перевод",
    link: "/services/transfer",
    bgColor: "from-purple-600/80 to-purple-800/80",
  },
]

export function HeaderSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slides, setSlides] = useState<SliderContent[]>([])
  const [loading, setLoading] = useState(true)
  const { getContent, getFontClass } = useContent()

  useEffect(() => {
    const loadSliderContent = async () => {
      try {
        const response = await fetch("/api/cms/slider")
        if (response.ok) {
          const data = await response.json()
          setSlides(data)
        }
      } catch (error) {
        console.error("Failed to load slider content:", error)
      } finally {
        setLoading(false)
      }
    }

    loadSliderContent()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      const slideCount = slides.length > 0 ? slides.length : fallbackSlides.length
      setCurrentSlide((prev) => (prev + 1) % slideCount)
    }, 5000)

    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    const slideCount = slides.length > 0 ? slides.length : fallbackSlides.length
    setCurrentSlide((prev) => (prev + 1) % slideCount)
  }

  const prevSlide = () => {
    const slideCount = slides.length > 0 ? slides.length : fallbackSlides.length
    setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount)
  }

  const displaySlides = slides.length > 0 ? slides : fallbackSlides
  const getSlideColors = (index: number) => {
    const colors = [
      "from-blue-600/80 to-blue-800/80",
      "from-green-600/80 to-green-800/80",
      "from-purple-600/80 to-purple-800/80",
    ]
    return colors[index % colors.length]
  }

  if (loading) {
    return (
      <div className="w-full h-[500px] md:h-[600px] bg-muted animate-pulse flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      {displaySlides.map((slide, index) => {
        const slideData =
          "slide_number" in slide
            ? {
                image: slide.image_url,
                title: getContent(slide.title_fa, slide.title_ru),
                description: getContent(slide.description_fa, slide.description_ru),
                buttonText: getContent(slide.button_text_fa, slide.button_text_ru),
                link: slide.button_link,
                bgColor: getSlideColors(index),
              }
            : {
                image: slide.image,
                title: getContent(slide.titlePersian, slide.titleRussian),
                description: getContent(slide.descriptionPersian, slide.descriptionRussian),
                buttonText: getContent(slide.ctaPersian, slide.ctaRussian),
                link: slide.link,
                bgColor: slide.bgColor,
              }

        return (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          >
            {/* Background Image */}
            <OptimizedImage
              src={slideData.image}
              alt={slideData.title}
              fill
              priority={index === 0}
              className="absolute inset-0"
              sizes="100vw"
            />

            {/* Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slideData.bgColor}`} />

            {/* Content */}
            <div className="relative h-full flex items-end justify-end p-8 md:p-12">
              <div className="text-right max-w-lg transform transition-all duration-1000 ease-out">
                <h2 className={`text-3xl md:text-5xl font-bold text-white mb-4 ${getFontClass()} animate-fade-in-up`}>
                  {slideData.title}
                </h2>
                <p className={`text-lg md:text-xl text-white/90 mb-6 ${getFontClass()} animate-fade-in-up delay-200`}>
                  {slideData.description}
                </p>
                <Link href={slideData.link}>
                  <Button
                    size="lg"
                    className="bg-white text-gray-900 hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 animate-fade-in-up delay-400"
                  >
                    <span className={getFontClass()}>{slideData.buttonText}</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )
      })}

      {/* Navigation Arrows */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 hover:scale-110 transition-all duration-200"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 hover:scale-110 transition-all duration-200"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {displaySlides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${index === currentSlide ? "bg-white scale-125" : "bg-white/50"}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}
