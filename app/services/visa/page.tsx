import { PageLayout } from "@/components/page-layout"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, FileText, Users } from "lucide-react"
import Link from "next/link"

const visaTypes = [
  {
    name: "ویزای توریستی",
    duration: "۳۰ روز",
    price: "۱۵۰ دلار",
    features: ["اقامت تا ۳۰ روز", "یک بار ورود", "پردازش ۵-۷ روز کاری"],
  },
  {
    name: "ویزای تجاری",
    duration: "۹۰ روز",
    price: "۲۰۰ دلار",
    features: ["اقامت تا ۹۰ روز", "چند بار ورود", "پردازش ۷-۱۰ روز کاری"],
  },
  {
    name: "ویزای تحصیلی",
    duration: "۱ سال",
    price: "۱۰۰ دلار",
    features: ["اقامت تحصیلی", "قابل تمدید", "پردازش ۱۰-۱۵ روز کاری"],
  },
  {
    name: "ویزای کاری",
    duration: "۱ سال",
    price: "۳۰۰ دلار",
    features: ["اقامت کاری", "چند بار ورود", "پردازش ۱۵-۲۰ روز کاری"],
  },
]

const requirements = [
  "پاسپورت معتبر (حداقل ۶ ماه اعتبار)",
  "فرم درخواست ویزا تکمیل شده",
  "عکس پاسپورتی (۳.۵ × ۴.۵ سانتی‌متر)",
  "بیمه مسافرتی معتبر",
  "رزرو هتل یا دعوت‌نامه",
  "بلیط رفت و برگشت",
]

const process = [
  {
    step: "۱",
    title: "مشاوره رایگان",
    description: "دریافت مشاوره کامل در مورد نوع ویزا و مدارک مورد نیاز",
  },
  {
    step: "۲",
    title: "تکمیل مدارک",
    description: "آماده‌سازی و تکمیل تمامی مدارک مورد نیاز",
  },
  {
    step: "۳",
    title: "ارسال درخواست",
    description: "ارسال درخواست ویزا به کنسولگری روسیه",
  },
  {
    step: "۴",
    title: "دریافت ویزا",
    description: "دریافت ویزا و تحویل به مشتری",
  },
]

export default function VisaPage() {
  return (
    <PageLayout>
      <PageHeader
        titlePersian="دریافت انواع ویزای روسیه"
        titleRussian="Получение различных типов российских виз"
        descriptionPersian="خدمات کامل اخذ ویزای روسیه با بهترین قیمت و سریع‌ترین زمان"
        descriptionRussian="Полный сервис получения российской визы по лучшей цене и в кратчайшие сроки"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Visa Types */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 font-persian">انواع ویزای روسیه</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visaTypes.map((visa, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-bold mb-2 font-persian">{visa.name}</h3>
                  <div className="text-2xl font-bold text-primary mb-4">{visa.price}</div>
                  <div className="text-sm text-muted-foreground mb-4 font-persian">مدت اقامت: {visa.duration}</div>
                  <ul className="space-y-2 text-sm">
                    {visa.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center font-persian">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 font-persian">مدارک مورد نیاز</h3>
              <ul className="space-y-3">
                {requirements.map((req, index) => (
                  <li key={index} className="flex items-start font-persian">
                    <FileText className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 font-persian">مزایای همکاری با ما</h3>
              <ul className="space-y-3">
                <li className="flex items-start font-persian">
                  <Clock className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  پردازش سریع در کمترین زمان ممکن
                </li>
                <li className="flex items-start font-persian">
                  <Users className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  مشاوره رایگان با متخصصان مجرب
                </li>
                <li className="flex items-start font-persian">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  ضمانت بازگشت وجه در صورت رد درخواست
                </li>
                <li className="flex items-start font-persian">
                  <FileText className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  کمک در تکمیل فرم‌ها و آماده‌سازی مدارک
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Process */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 font-persian">فرآیند دریافت ویزا</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground text-xl font-bold mb-4">
                  {step.step}
                </div>
                <h4 className="font-bold mb-2 font-persian">{step.title}</h4>
                <p className="text-sm text-muted-foreground font-persian">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-muted/30 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4 font-persian">آماده دریافت ویزای روسیه هستید؟</h2>
          <p className="text-muted-foreground mb-6 font-persian">
            همین الان با ما تماس بگیرید و مشاوره رایگان دریافت کنید
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg">
                <span className="font-persian">تماس با ما</span>
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              <span className="font-persian">مشاوره رایگان</span>
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
