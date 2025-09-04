"use client"

import { useTheme } from "@/lib/contexts/theme-context"

// Hook to get content based on current language
export function useContent() {
  const { language } = useTheme()

  const getContent = (persianText: string, russianText: string) => {
    return language === "fa" ? persianText : russianText
  }

  const getFontClass = () => {
    return language === "fa" ? "font-persian" : "font-russian"
  }

  return { getContent, getFontClass, language }
}
