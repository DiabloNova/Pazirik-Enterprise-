"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Save, Eye, Settings, FileText, ImageIcon, Menu, Palette } from "lucide-react"

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("content")

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold font-persian">پنل مدیریت پازیریک</h1>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              <span className="font-persian">مشاهده سایت</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="font-persian">محتوا</span>
            </TabsTrigger>
            <TabsTrigger value="images" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              <span className="font-persian">تصاویر</span>
            </TabsTrigger>
            <TabsTrigger value="layout" className="flex items-center gap-2">
              <Menu className="h-4 w-4" />
              <span className="font-persian">طرح‌بندی</span>
            </TabsTrigger>
            <TabsTrigger value="navigation" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="font-persian">منو</span>
            </TabsTrigger>
            <TabsTrigger value="typography" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span className="font-persian">فونت</span>
            </TabsTrigger>
          </TabsList>

          {/* Content Management */}
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-persian">مدیریت محتوای صفحات</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Label className="font-persian">انتخاب صفحه</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option value="home">صفحه اصلی</option>
                      <option value="about">درباره ما</option>
                      <option value="services">خدمات</option>
                      <option value="study">تحصیل در روسیه</option>
                      <option value="visa">ویزا</option>
                      <option value="magazine">مجله</option>
                      <option value="contact">تماس با ما</option>
                    </select>
                  </div>
                  <div className="space-y-4">
                    <Label className="font-persian">بخش محتوا</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option value="title">عنوان اصلی</option>
                      <option value="subtitle">زیرعنوان</option>
                      <option value="description">توضیحات</option>
                      <option value="services">خدمات</option>
                      <option value="features">ویژگی‌ها</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <Label className="font-persian">محتوای فارسی</Label>
                  <Textarea placeholder="متن فارسی را وارد کنید..." className="min-h-32" />
                </div>
                <div className="space-y-4">
                  <Label className="font-persian">محتوای روسی</Label>
                  <Textarea placeholder="Введите русский текст..." className="min-h-32" />
                </div>
                <Button className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  <span className="font-persian">ذخیره تغییرات</span>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Image Management */}
          <TabsContent value="images" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-persian">مدیریت تصاویر</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Label className="font-persian">انتخاب صفحه</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option value="home">صفحه اصلی</option>
                      <option value="about">درباره ما</option>
                      <option value="services">خدمات</option>
                      <option value="study">تحصیل در روسیه</option>
                      <option value="magazine">مجله</option>
                    </select>
                  </div>
                  <div className="space-y-4">
                    <Label className="font-persian">نوع تصویر</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option value="hero">تصویر اصلی</option>
                      <option value="gallery">گالری</option>
                      <option value="service">خدمات</option>
                      <option value="university">دانشگاه‌ها</option>
                      <option value="background">پس‌زمینه</option>
                    </select>
                  </div>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 font-persian">تصویر جدید را اینجا بکشید یا کلیک کنید</p>
                  <Input type="file" className="hidden" accept="image/*" />
                  <Button variant="outline" className="mt-4 bg-transparent">
                    <span className="font-persian">انتخاب فایل</span>
                  </Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="relative group">
                      <div className="aspect-square bg-gray-200 rounded-lg"></div>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        حذف
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Layout Management */}
          <TabsContent value="layout" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-persian">مدیریت هدر</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="font-persian">لوگو سایت</Label>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-200 rounded"></div>
                      <Button variant="outline" size="sm">
                        <span className="font-persian">تغییر لوگو</span>
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-persian">شعار سایت</Label>
                    <Input placeholder="شعار جدید را وارد کنید..." />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-persian">رنگ هدر</Label>
                    <Input type="color" className="w-full h-10" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-persian">مدیریت فوتر</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="font-persian">متن کپی‌رایت</Label>
                    <Input placeholder="© 2024 پازیریک. تمامی حقوق محفوظ است." />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-persian">شبکه‌های اجتماعی</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder="لینک تلگرام" />
                      <Input placeholder="لینک اینستاگرام" />
                      <Input placeholder="لینک واتساپ" />
                      <Input placeholder="لینک لینکدین" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-persian">رنگ فوتر</Label>
                    <Input type="color" className="w-full h-10" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Navigation Management */}
          <TabsContent value="navigation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-persian">مدیریت منوی سایت</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {[
                    { name: "صفحه اصلی", url: "/" },
                    { name: "درباره ما", url: "/about" },
                    { name: "خدمات", url: "/services" },
                    { name: "مجله", url: "/magazine" },
                    { name: "تماس با ما", url: "/contact" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="flex-1 grid grid-cols-2 gap-4">
                        <Input value={item.name} placeholder="نام منو" />
                        <Input value={item.url} placeholder="آدرس لینک" />
                      </div>
                      <Button variant="outline" size="sm">
                        <span className="font-persian">ویرایش</span>
                      </Button>
                      <Button variant="destructive" size="sm">
                        <span className="font-persian">حذف</span>
                      </Button>
                    </div>
                  ))}
                </div>
                <Button className="w-full">
                  <span className="font-persian">افزودن آیتم جدید</span>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Typography Management */}
          <TabsContent value="typography" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-persian">مدیریت فونت و تایپوگرافی</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label className="font-persian">آپلود فونت جدید</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-600 font-persian">فایل فونت (.woff, .woff2, .ttf, .otf) را اینجا بکشید</p>
                    <Input type="file" className="hidden" accept=".woff,.woff2,.ttf,.otf" />
                    <Button variant="outline" className="mt-2 bg-transparent">
                      <span className="font-persian">انتخاب فایل فونت</span>
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Label className="font-persian">فونت اصلی سایت</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option value="vazir">وزیر</option>
                      <option value="iran-sans">ایران سنس</option>
                      <option value="shabnam">شبنم</option>
                      <option value="custom">فونت سفارشی</option>
                    </select>
                  </div>
                  <div className="space-y-4">
                    <Label className="font-persian">اندازه فونت پایه</Label>
                    <Input type="number" placeholder="16" min="12" max="24" />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="font-persian">رنگ‌های متن</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-persian">متن اصلی</Label>
                      <Input type="color" className="w-full h-10" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-persian">عنوان‌ها</Label>
                      <Input type="color" className="w-full h-10" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-persian">لینک‌ها</Label>
                      <Input type="color" className="w-full h-10" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-persian">متن کم‌رنگ</Label>
                      <Input type="color" className="w-full h-10" />
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg bg-muted/30">
                  <Label className="font-persian mb-2 block">پیش‌نمایش</Label>
                  <div className="space-y-2">
                    <h1 className="text-2xl font-bold">نمونه عنوان اصلی</h1>
                    <h2 className="text-xl font-semibold">نمونه زیرعنوان</h2>
                    <p className="text-base">این یک نمونه متن است که نحوه نمایش فونت و رنگ‌های انتخابی را نشان می‌دهد.</p>
                    <a href="#" className="text-primary underline">
                      نمونه لینک
                    </a>
                  </div>
                </div>

                <Button className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  <span className="font-persian">اعمال تغییرات فونت</span>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
