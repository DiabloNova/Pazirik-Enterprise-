"use client"

import { useEffect, useState } from "react"
import { useTheme } from "@/lib/contexts/theme-context"

export function PreLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const { theme } = useTheme()

  useEffect(() => {
    const handleLoad = () => {
      // Add a small delay for better UX
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }

    if (document.readyState === "complete") {
      handleLoad()
    } else {
      window.addEventListener("load", handleLoad)
      return () => window.removeEventListener("load", handleLoad)
    }
  }, [])

  if (!isLoading) return null

  return (
    <div className={`preloader-container ${theme}`}>
      <div className="preloader-content">
        <div>
          <div className="Strich1">
            <div className="Strich2">
              <div className="bubble"></div>
              <div className="bubble1"></div>
              <div className="bubble2"></div>
              <div className="bubble3"></div>
              <div className="bubble4"></div>
            </div>
          </div>
        </div>
        <p className="loading-text font-persian">پازیریک در حال بارگذاری است ...</p>
      </div>
    </div>
  )
}
