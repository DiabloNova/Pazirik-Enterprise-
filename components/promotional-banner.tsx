"use client"

import { useContent } from "@/lib/hooks/use-content"

export function PromotionalBanner() {
  const { getContent, getFontClass } = useContent()

  return (
    <div className="relative w-full h-16 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 dark:from-green-600 dark:via-green-700 dark:to-green-800 overflow-hidden banner-shadow">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:20px_20px] animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-end px-6 md:px-12">
        <div className={`text-white text-lg md:text-xl font-semibold font-persian ${getFontClass()}`}>
          {getContent("مشاوره تخصصی رایگان با پازیریک", "Бесплатная специализированная консультация с Пазирик")}
        </div>
      </div>
    </div>
  )
}
