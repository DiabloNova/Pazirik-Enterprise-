"use client"

import { useState, useEffect } from "react"
import { getWebsiteContent, updateWebsiteContent } from "@/lib/cms/content-api"

interface LanguageContent {
  [key: string]: {
    fa: string
    ru: string
  }
}

export default function LanguageManagementPage() {
  const [content, setContent] = useState<LanguageContent>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const contentSections = {
    promotional_banner: "Promotional Banner",
    navbar_title: "Navbar Title",
    services_title: "Services Section Title",
    why_pazirik_title: "Why Pazirik Title",
    footer_copyright: "Footer Copyright",
    contact_form_title: "Contact Form Title",
    about_page_title: "About Page Title",
  }

  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = async () => {
    try {
      const data = await getWebsiteContent()
      const formattedContent: LanguageContent = {}

      data.forEach((item: any) => {
        formattedContent[item.section_key] = {
          fa: typeof item.content_fa === "string" ? item.content_fa : item.content_fa.text || "",
          ru: typeof item.content_ru === "string" ? item.content_ru : item.content_ru.text || "",
        }
      })

      setContent(formattedContent)
    } catch (error) {
      console.error("Failed to load content:", error)
      setMessage({ type: "error", text: "Failed to load language content" })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage(null)

    try {
      for (const [sectionKey, sectionContent] of Object.entries(content)) {
        await updateWebsiteContent(sectionKey, {
          content_fa: { text: sectionContent.fa },
          content_ru: { text: sectionContent.ru },
        })
      }
      setMessage({ type: "success", text: "Language content updated successfully" })
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Failed to update content" })
    } finally {
      setSaving(false)
    }
  }

  const updateContent = (section: string, language: "fa" | "ru", value: string) => {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [language]: value,
      },
    }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Language Management</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save All Changes"}
        </button>
      </div>

      {message && (
        <div
          className={`p-4 rounded-md mb-6 ${
            message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="space-y-8">
        {Object.entries(contentSections).map(([sectionKey, sectionTitle]) => (
          <div key={sectionKey} className="border rounded-lg p-6 bg-card">
            <h2 className="text-xl font-semibold mb-4">{sectionTitle}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Persian (فارسی)</label>
                <textarea
                  value={content[sectionKey]?.fa || ""}
                  onChange={(e) => updateContent(sectionKey, "fa", e.target.value)}
                  className="w-full p-3 border rounded-md h-24 text-right"
                  dir="rtl"
                  placeholder="متن فارسی را وارد کنید..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Russian (Русский)</label>
                <textarea
                  value={content[sectionKey]?.ru || ""}
                  onChange={(e) => updateContent(sectionKey, "ru", e.target.value)}
                  className="w-full p-3 border rounded-md h-24"
                  placeholder="Введите русский текст..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">Language Management Tips:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Persian text will automatically display right-to-left (RTL)</li>
          <li>• Russian text will display left-to-right (LTR)</li>
          <li>• Changes are applied immediately after saving</li>
          <li>• Use the theme toggle to test both light and dark modes</li>
        </ul>
      </div>
    </div>
  )
}
