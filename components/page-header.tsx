"use client"

import { useContent } from "@/lib/hooks/use-content"

interface PageHeaderProps {
  titlePersian: string
  titleRussian: string
  descriptionPersian?: string
  descriptionRussian?: string
  backgroundImage?: string
}

export function PageHeader({
  titlePersian,
  titleRussian,
  descriptionPersian,
  descriptionRussian,
  backgroundImage = "/page-header-russia-background.jpg", // Updated default background image
}: PageHeaderProps) {
  const { getContent, getFontClass } = useContent()

  return (
    <div className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden animate-fade-in">
      {" "}
      {/* Added fade-in animation */}
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transform hover:scale-105 transition-transform duration-700" // Added hover scale effect
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60 animate-pulse" />{" "}
      {/* Added subtle pulse animation */}
      {/* Content */}
      <div className="relative text-center text-white px-4 animate-fade-in-up">
        {" "}
        {/* Added fade-in-up animation */}
        <h1
          className={`text-3xl md:text-5xl font-bold mb-4 ${getFontClass()} transform hover:scale-105 transition-transform duration-300`}
        >
          {" "}
          {/* Added hover scale */}
          {getContent(titlePersian, titleRussian)}
        </h1>
        {descriptionPersian && descriptionRussian && (
          <p className={`text-lg md:text-xl opacity-90 max-w-2xl ${getFontClass()} animate-fade-in-up delay-200`}>
            {" "}
            {/* Added delayed animation */}
            {getContent(descriptionPersian, descriptionRussian)}
          </p>
        )}
      </div>
    </div>
  )
}
