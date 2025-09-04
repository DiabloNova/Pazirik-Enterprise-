import { PageLayout } from "@/components/page-layout"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plane, GraduationCap, CreditCard, FileText, Users, Shield } from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: Plane,
    titlePersian: "دریافت انواع ویزای روسیه",
    titleRussian: "Получение различных типов российских виз",
    descriptionPersian: "خدمات کامل اخذ ویزای روسیه شامل ویزای توریستی، تجاری، تحصیلی و کاری",
    descriptionRussian: "Полный сервис получения российской визы включая туристическую, деловую, учебную и рабочую",
    link: "/services/visa",
    features: ["ویزای توریستی", "ویزای تجاری", "ویزای تحصیلی", "ویزای کاری"],
  },
  {
    icon: GraduationCap,
    titlePersian: "تحصیل در روسیه",
    titleRussian: "Обучение в России",
    descriptionPersian: "راهنمایی کامل برای تحصیل در بهترین دانشگاه‌های روسیه از انتخاب رشته تا اخذ پذیرش",
    descriptionRussian:
      "Полное руководство по обучению в лучших российских университетах от выбора специальности до получения приглашения",
    link: "/services/study",
    features: ["انتخاب دانشگاه", "اخذ پذیرش", "ترجمه مدارک", "راهنمایی کامل"],
  },
  {
    icon: CreditCard,
    titlePersian: "ارسال حواله ارزی به روسیه",
    titleRussian: "Отправка денежных переводов в Россию",
    descriptionPersian: "ارسال سریع و امن حواله ارزی به روسیه با بهترین نرخ و کمترین کارمزد",
    descriptionRussian:
      "Быстрая и безопасная отправка денежных переводов в Россию по лучшему курсу и с минимальной комиссией",
    link: "/services/transfer",
    features: ["نرخ عالی", "ارسال سریع", "امنیت بالا", "کارمزد کم"],
  },
]

const additionalServices = [
  {
    icon: FileText,
    titlePersian: "ترجمه رسمی مدارک",
    titleRussian: "Официальный перевод документов",
    descriptionPersian: "ترجمه رسمی و تایید شده تمامی مدارک مورد نیاز",
  },
  {
    icon: Users,
    titlePersian: "مشاوره تخصصی",
    titleRussian: "Специализированная консультация",
    descriptionPersian: "مشاوره رایگان با متخصصان مجرب در امور روسیه",
  },
  {
    icon: Shield,
    titlePersian: "بیمه مسافرتی",
    titleRussian: "Туристическая страховка",
    descriptionPersian: "بیمه مسافرتی معتبر برای سفر به روسیه",
  },
]

export default function ServicesPage() {
  return (
    <PageLayout>
      <PageHeader
        titlePersian="خدمات ما"
        titleRussian="Наши услуги"
        descriptionPersian="ارائه کامل‌ترین خدمات تخصصی روسیه"
        descriptionRussian="Предоставление самых полных специализированных российских услуг"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Services */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 font-persian">{service.titlePersian}</h3>
                    <p className="text-muted-foreground mb-6 font-persian">{service.descriptionPersian}</p>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm font-persian">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link href={service.link}>
                    <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                      <span className="font-persian">اطلاعات بیشتر</span>
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Additional Services */}
        <div className="bg-muted/30 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8 font-persian">سایر خدمات</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => {
              const IconComponent = service.icon
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h4 className="font-semibold mb-2 font-persian">{service.titlePersian}</h4>
                  <p className="text-sm text-muted-foreground font-persian">{service.descriptionPersian}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
