"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"
type Language = "fa" | "ru"

interface ThemeContextType {
  theme: Theme
  language: Language
  setTheme: (theme: Theme) => void
  setLanguage: (language: Language) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light")
  const [language, setLanguage] = useState<Language>("fa")

  useEffect(() => {
    // Load saved preferences from localStorage
    const savedTheme = localStorage.getItem("pazirik-theme") as Theme
    const savedLanguage = localStorage.getItem("pazirik-language") as Language

    if (savedTheme) setTheme(savedTheme)
    if (savedLanguage) setLanguage(savedLanguage)
  }, [])

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(theme)
    localStorage.setItem("pazirik-theme", theme)
  }, [theme])

  useEffect(() => {
    // Apply language and direction to document
    document.documentElement.lang = language
    document.documentElement.dir = language === "fa" ? "rtl" : "ltr"
    localStorage.setItem("pazirik-language", language)
  }, [language])

  return <ThemeContext.Provider value={{ theme, language, setTheme, setLanguage }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
