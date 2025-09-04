import { PageLayout } from "@/components/page-layout"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, BookOpen, Award, Users, Globe, Star } from "lucide-react"
import Link from "next/link"

const universities = [
  {
    name: "دانشگاه لومونوسوف مسکو",
    ranking: "رتبه ۱ روسیه",
    programs: "۴۰+ رشته تحصیلی",
    tuition: "از ۳۰۰۰ دلار سالانه",
    image: "/moscow-state-university.jpg",
  },
  {
    name: "دانشگاه پیتر کبیر سن پترزبورگ",
    ranking: "رتبه ۲ روسیه",
    programs: "۳۵+ رشته تحصیلی",
    tuition: "از ۲۵۰۰ دلار سالانه",
    image: "/saint-petersburg-university.jpg",
  },
  {
    name: "دانشگاه تکنولوژی مسکو",
    ranking: "رتبه ۱ فنی",
    programs: "۲۵+ رشته فنی",
    tuition: "از ۳۵۰۰ دلار سالانه",
    image: "/moscow-tech-university.jpg",
  },
  {
    name: "دانشگاه پزشکی مسکو",
    ranking: "رتبه ۱ پزشکی",
    programs: "۱۰+ رشته پزشکی",
    tuition: "از ۵۰۰۰ دلار سالانه",
    image: "/moscow-medical-university.jpg",
  },
]

const popularFields = [
  {
    icon: BookOpen,
    name: "مهندسی",
    description: "رشته‌های مختلف مهندسی با تجهیزات مدرن",
  },
  {
    icon: Award,
    name: "پزشکی",
    description: "تحصیل در معتبرترین دانشکده‌های پزشکی",
  },
  {
    icon: Globe,
    name: "روابط بین‌الملل",
    description: "آموزش در حوزه دیپلماسی و روابط بین‌الملل",
  },
  {
    icon: Star,
    name: "هنر و معماری",
    description: "رشته‌های هنری و معماری با اساتید مجرب",
  },
]

const services = [
  "مشاوره انتخاب دانشگاه و رشته",
  "ترجمه و تایید مدارک تحصیلی",
  "اخذ پذیرش از دانشگاه‌های معتبر",
  "کمک در تکمیل فرم‌های درخواست",
  "راهنمایی برای اخذ ویزای تحصیلی",
  "کمک در یافتن محل اسکان",
  "پشتیبانی در طول دوره تحصیل",
  "راهنمایی برای بورسیه تحصیلی",
]

export default function StudyPage() {
  return (
    <PageLayout>
      <PageHeader
        titlePersian="تحصیل در روسیه"
        titleRussian="Обучение в России"
        descriptionPersian="راهنمایی کامل برای تحصیل در بهترین دانشگاه‌های روسیه"
        descriptionRussian="Полное руководство по обучению в лучших университетах России"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Why Study in Russia */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-8 font-persian">چرا تحصیل در روسیه؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <GraduationCap className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2 font-persian">کیفیت آموزش بالا</h3>
                <p className="text-sm text-muted-foreground font-persian">
                  دانشگاه‌های روسیه در رتبه‌بندی‌های جهانی جایگاه بالایی دارند
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2 font-persian">مدرک معتبر بین‌المللی</h3>
                <p className="text-sm text-muted-foreground font-persian">
                  مدارک دانشگاه‌های روسیه در سراسر جهان پذیرفته می‌شود
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2 font-persian">هزینه مناسب</h3>
                <p className="text-sm text-muted-foreground font-persian">
                  هزینه تحصیل و زندگی در روسیه نسبت به کشورهای اروپایی کمتر است
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Top Universities */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 font-persian">برترین دانشگاه‌های روسیه</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {universities.map((uni, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-10"
                  style={{ backgroundImage: `url(${uni.image})` }}
                />
                <CardContent className="p-6 relative z-10">
                  <h3 className="text-lg font-bold mb-2 font-persian">{uni.name}</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground font-persian">رتبه‌بندی: </span>
                      <span className="font-semibold font-persian">{uni.ranking}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground font-persian">رشته‌ها: </span>
                      <span className="font-semibold font-persian">{uni.programs}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-muted-foreground font-persian">شهریه: </span>
                      <span className="font-semibold text-primary font-persian">{uni.tuition}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Popular Fields */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 font-persian">رشته‌های محبوب</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularFields.map((field, index) => {
              const IconComponent = field.icon
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <IconComponent className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h3 className="font-bold mb-2 font-persian">{field.name}</h3>
                    <p className="text-sm text-muted-foreground font-persian">{field.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Our Services */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 font-persian">خدمات ما</h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index} className="flex items-start font-persian">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    {service}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 font-persian">مراحل ثبت‌نام</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
                    ۱
                  </div>
                  <div>
                    <h4 className="font-semibold font-persian">مشاوره و انتخاب رشته</h4>
                    <p className="text-sm text-muted-foreground font-persian">
                      بررسی علایق و انتخاب بهترین رشته و دانشگاه
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
                    ۲
                  </div>
                  <div>
                    <h4 className="font-semibold font-persian">آماده‌سازی مدارک</h4>
                    <p className="text-sm text-muted-foreground font-persian">ترجمه و تایید مدارک تحصیلی</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
                    ۳
                  </div>
                  <div>
                    <h4 className="font-semibold font-persian">ارسال درخواست</h4>
                    <p className="text-sm text-muted-foreground font-persian">ارسال درخواست پذیرش به دانشگاه</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
                    ۴
                  </div>
                  <div>
                    <h4 className="font-semibold font-persian">اخذ ویزا</h4>
                    <p className="text-sm text-muted-foreground font-persian">کمک در اخذ ویزای تحصیلی</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center bg-muted/30 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4 font-persian">آماده شروع تحصیل در روسیه هستید؟</h2>
          <p className="text-muted-foreground mb-6 font-persian">
            مشاوره رایگان دریافت کنید و مسیر تحصیل خود را بسازید
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg">
                <span className="font-persian">مشاوره رایگان</span>
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              <span className="font-persian">دانلود کاتالوگ دانشگاه‌ها</span>
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
