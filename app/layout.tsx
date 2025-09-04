import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/lib/contexts/theme-context"
import { ThemeLanguageToggle } from "@/components/theme-language-toggle"
import { PreLoader } from "@/components/pre-loader"
import { RussianFlagAnimation } from "@/components/russian-flag-animation"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "راشا گستر پازیریک - خدمات تخصصی روسیه | Rasha Gostar Pazirik - Russian Services",
  description:
    "ارائه خدمات تخصصی ویزا، تحصیل، حواله ارزی، صادرات و واردات به روسیه. مشاوره رایگان پازیریک | Professional Russian visa, education, money transfer, export and import services",
  keywords:
    "روسیه، تحصیل در روسیه، بانک های روسیه، ارسال حواله روسیه، دریافت ویزای روسیه، تحقیقات بازاریابی کالا در روسیه، صادرات به روسیه، واردات از روسیه، Russian visa, study in Russia, Russian banks, money transfer to Russia, market research Russia, export to Russia, import from Russia",
  authors: [{ name: "Rasha Gostar Pazirik" }],
  creator: "Rasha Gostar Pazirik",
  publisher: "Rasha Gostar Pazirik",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "fa_IR",
    alternateLocale: "ru_RU",
    url: "https://pazirik.com",
    siteName: "راشا گستر پازیریک",
    title: "راشا گستر پازیریک - خدمات تخصصی روسیه",
    description: "ارائه خدمات تخصصی ویزا، تحصیل، حواله ارزی، صادرات و واردات به روسیه",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "راشا گستر پازیریک - خدمات روسیه",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "راشا گستر پازیریک - خدمات تخصصی روسیه",
    description: "ارائه خدمات تخصصی ویزا، تحصیل، حواله ارزی، صادرات و واردات به روسیه",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "your-google-verification-code",
  },
  generator: "v0.app",
  category: "Business Services",
  classification: "Russian Services Provider",
  other: {
    "geo.region": "IR-07",
    "geo.placename": "Tehran",
    "geo.position": "35.6892;51.3890",
    ICBM: "35.6892, 51.3890",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fa" dir="rtl" className="light">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="color-scheme" content="light dark" />
        <link rel="canonical" href="https://pazirik.com" />
        <link rel="alternate" hrefLang="fa" href="https://pazirik.com" />
        <link rel="alternate" hrefLang="ru" href="https://pazirik.com/ru" />
        <link rel="alternate" hrefLang="x-default" href="https://pazirik.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.fontcdn.ir" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://cdn.fontcdn.ir" />
        <link
          href="https://cdn.fontcdn.ir/Font/Persian/IRAN_KHARAZMI/IRAN_KHARAZMI.woff2"
          rel="preload"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "راشا گستر پازیریک",
              alternateName: "Rasha Gostar Pazirik",
              url: "https://pazirik.com",
              logo: "https://pazirik.com/logo.png",
              description: "ارائه خدمات تخصصی ویزا، تحصیل، حواله ارزی، صادرات و واردات به روسیه",
              address: {
                "@type": "PostalAddress",
                streetAddress: "خیابان عبدالحمید اکبری، برج سپهر ساعی، طبقه دهم، واحد ۱۰۰۴",
                addressLocality: "یوسف آباد",
                addressRegion: "تهران",
                addressCountry: "IR",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+98-912-218-3653",
                contactType: "customer service",
                availableLanguage: ["Persian", "Russian"],
                email: "info@pazirik.com",
              },
              sameAs: ["https://instagram.com/pazirik", "https://telegram.me/pazirik"],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "خدمات پازیریک",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "دریافت ویزای روسیه",
                      description: "خدمات دریافت انواع ویزای روسیه",
                      serviceType: "Visa Services",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "تحصیل در روسیه",
                      description: "مشاوره و خدمات تحصیل در دانشگاه‌های روسیه",
                      serviceType: "Education Consulting",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "حواله ارزی",
                      description: "ارسال حواله ارزی به روسیه",
                      serviceType: "Money Transfer",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "صادرات به روسیه",
                      description: "خدمات صادرات کالا به روسیه",
                      serviceType: "Export Services",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "واردات از روسیه",
                      description: "خدمات واردات کالا از روسیه",
                      serviceType: "Import Services",
                    },
                  },
                ],
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "150",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "خانه",
                  item: "https://pazirik.com",
                },
              ],
            }),
          }}
        />
        <style>{`
          @font-face {
            font-family: 'IRAN KHARAZMI';
            src: url('https://cdn.fontcdn.ir/Font/Persian/IRAN_KHARAZMI/IRAN_KHARAZMI.woff2') format('woff2'),
                 url('https://cdn.fontcdn.ir/Font/Persian/IRAN_KHARAZMI/IRAN_KHARAZMI.woff') format('woff');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
          }
          
          html {
            font-family: ${inter.style.fontFamily};
            --font-inter: ${inter.variable};
          }
          
          /* Persian text styling */
          .font-persian {
            font-family: 'IRAN KHARAZMI', ${inter.style.fontFamily}, sans-serif;
          }
          
          /* Russian text styling */
          .font-russian {
            font-family: ${inter.style.fontFamily}, sans-serif;
          }
        `}</style>
      </head>
      <body className={`${inter.variable} antialiased font-persian`}>
        <ThemeProvider>
          <PreLoader />
          <RussianFlagAnimation />
          <div className="relative z-10">{children}</div>
          <ThemeLanguageToggle />
        </ThemeProvider>
      </body>
    </html>
  )
}
