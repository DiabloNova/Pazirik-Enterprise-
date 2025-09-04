"use client"

import { Moon, Sun, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/lib/contexts/theme-context"

export function ThemeLanguageToggle() {
  const { theme, language, setTheme, setLanguage } = useTheme()

  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-2">
      {/* Theme Toggle */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm border-2 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        <span className="sr-only">Toggle theme</span>
      </Button>

      {/* Language Toggle */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setLanguage(language === "fa" ? "ru" : "fa")}
        className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm border-2 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <Globe className="h-4 w-4" />
        <span className="sr-only">Toggle language</span>
      </Button>

      {/* Language indicator */}
      <div className="text-xs text-center font-medium text-muted-foreground">{language === "fa" ? "فا" : "RU"}</div>
    </div>
  )
}
