import { PageLayout } from "@/components/page-layout"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, Shield, Clock, DollarSign, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Clock,
    title: "ارسال سریع",
    description: "حواله شما در کمتر از ۲۴ ساعت به مقصد می‌رسد",
  },
  {
    icon: Shield,
    title: "امنیت بالا",
    description: "استفاده از بالاترین استانداردهای امنیتی",
  },
  {
    icon: DollarSign,
    title: "نرخ عالی",
    description: "بهترین نرخ تبدیل ارز در بازار",
  },
  {
    icon: CreditCard,
    title: "کارمزد کم",
    description: "کمترین کارمزد برای ارسال حواله",
  },
]

const transferMethods = [
  {
    name: "حواله بانکی",
    time: "۲-۴ ساعت",
    fee: "۰.۵٪",
    description: "ارسال مستقیم به حساب بانکی",
  },
  {
    name: "دریافت نقدی",
    time: "۱۵ دقیقه",
    fee: "۱٪",
    description: "دریافت نقد از نمایندگی‌های مجاز",
  },
  {
    name: "کیف پول دیجیتال",
    time: "فوری",
    fee: "۰.۳٪",
    description: "انتقال به کیف پول‌های دیجیتال",
  },
]

const process = [
  {
    step: "۱",
    title: "ثبت درخواست",
    description: "مبلغ و اطلاعات گیرنده را وارد کنید",
  },
  {
    step: "۲",
    title: "پرداخت",
    description: "مبلغ را به حساب ما واریز کنید",
  },
  {
    step: "۳",
    title: "تایید",
    description: "درخواست شما بررسی و تایید می‌شود",
  },
  {
    step: "۴",
    title: "ارسال",
    description: "حواله به گیرنده در روسیه ارسال می‌شود",
  },
]

const requirements = [
  "کپی کارت ملی فرستنده",
  "اطلاعات کامل گیرنده (نام، نام خانوادگی، آدرس)",
  "شماره تماس گیرنده",
  "مشخص کردن نحوه دریافت (بانکی یا نقدی)",
]

export default function TransferPage() {
  return (
    <PageLayout>
      <PageHeader
        titlePersian="ارسال حواله ارزی به روسیه"
        titleRussian="Отправка денежных переводов в Россию"
        descriptionPersian="ارسال سریع و امن حواله ارزی با بهترین نرخ"
        descriptionRussian="Быстрая и безопасная отправка денежных переводов по лучшему курсу"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <IconComponent className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-bold mb-2 font-persian">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground font-persian">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Transfer Methods */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 font-persian">روش‌های ارسال حواله</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {transferMethods.map((method, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-3 font-persian">{method.name}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground font-persian">زمان رسیدن:</span>
                      <span className="font-semibold font-persian">{method.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground font-persian">کارمزد:</span>
                      <span className="font-semibold text-primary font-persian">{method.fee}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground font-persian">{method.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Process & Requirements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 font-persian">فرآیند ارسال حواله</h3>
              <div className="space-y-6">
                {process.map((step, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 font-persian">{step.title}</h4>
                      <p className="text-sm text-muted-foreground font-persian">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 font-persian">مدارک مورد نیاز</h3>
              <ul className="space-y-3">
                {requirements.map((req, index) => (
                  <li key={index} className="flex items-start font-persian">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>

              <div className="mt-8 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2 font-persian">نکات مهم:</h4>
                <ul className="text-sm text-muted-foreground space-y-1 font-persian">
                  <li>• حداقل مبلغ ارسال: ۱۰۰ دلار</li>
                  <li>• حداکثر مبلغ ارسال: ۱۰,۰۰۰ دلار</li>
                  <li>• نرخ ارز روزانه بروزرسانی می‌شود</li>
                  <li>• امکان پیگیری آنلاین حواله</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Exchange Rate */}
        <Card className="mb-16">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-center mb-6 font-persian">نرخ ارز امروز</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-4 bg-muted/30 rounded-lg">
                <h4 className="font-semibold mb-2 font-persian">دلار آمریکا</h4>
                <div className="text-2xl font-bold text-primary">۵۲,۰۰۰</div>
                <p className="text-sm text-muted-foreground font-persian">تومان</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <h4 className="font-semibold mb-2 font-persian">یورو</h4>
                <div className="text-2xl font-bold text-primary">۵۵,۰۰۰</div>
                <p className="text-sm text-muted-foreground font-persian">تومان</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <h4 className="font-semibold mb-2 font-persian">روبل روسیه</h4>
                <div className="text-2xl font-bold text-primary">۵۵۰</div>
                <p className="text-sm text-muted-foreground font-persian">تومان</p>
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4 font-persian">
              نرخ‌ها به صورت لحظه‌ای بروزرسانی می‌شوند
            </p>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center bg-muted/30 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4 font-persian">آماده ارسال حواله هستید؟</h2>
          <p className="text-muted-foreground mb-6 font-persian">
            همین الان درخواست خود را ثبت کنید و از بهترین نرخ استفاده کنید
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg">
                <span className="font-persian">ثبت درخواست</span>
                <ArrowRight className="mr-2 h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              <span className="font-persian">محاسبه کارمزد</span>
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
