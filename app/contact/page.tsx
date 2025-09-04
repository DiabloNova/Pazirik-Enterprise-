"use client"

import type React from "react"

import { PageLayout } from "@/components/page-layout"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { useContent } from "@/lib/hooks/use-content"
import { useState } from "react"

export default function ContactPage() {
  const { getContent, getFontClass } = useContent()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <PageLayout>
      <PageHeader
        titlePersian="تماس با ما"
        titleRussian="Контакты"
        descriptionPersian="ما همیشه آماده پاسخگویی به سوالات شما هستیم"
        descriptionRussian="Мы всегда готовы ответить на ваши вопросы"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardContent className="p-8">
              <h2 className={`text-2xl font-bold mb-6 ${getFontClass()}`}>
                {getContent("فرم تماس", "Форма обратной связи")}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className={getFontClass()}>
                    {getContent("نام و نام خانوادگی", "Имя и фамилия")}
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className={getFontClass()}>
                    {getContent("ایمیل", "Email")}
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className={getFontClass()}>
                    {getContent("شماره تماس", "Номер телефона")}
                  </Label>
                  <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="subject" className={getFontClass()}>
                    {getContent("موضوع", "Тема")}
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="message" className={getFontClass()}>
                    {getContent("پیام", "Сообщение")}
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="mt-1"
                  />
                </div>
                <Button type="submit" className="w-full">
                  <span className={getFontClass()}>{getContent("ارسال پیام", "Отправить сообщение")}</span>
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <Phone className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className={`font-semibold ${getFontClass()}`}>{getContent("تماس تلفنی", "Телефон")}</h3>
                    <p className="text-muted-foreground">+98 21 1234 5678</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <Mail className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className={`font-semibold ${getFontClass()}`}>{getContent("ایمیل", "Email")}</h3>
                    <p className="text-muted-foreground">info@pazirik.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <MapPin className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className={`font-semibold ${getFontClass()}`}>{getContent("آدرس", "Адрес")}</h3>
                    <p className={`text-muted-foreground ${getFontClass()}`}>
                      {getContent("تهران، خیابان ولیعصر", "Тегеран, улица Валиаср")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <Clock className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className={`font-semibold ${getFontClass()}`}>{getContent("ساعات کاری", "Часы работы")}</h3>
                    <p className={`text-muted-foreground ${getFontClass()}`}>
                      {getContent("شنبه تا پنج‌شنبه: ۹ تا ۱۸", "Суббота - четверг: 9:00 - 18:00")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
