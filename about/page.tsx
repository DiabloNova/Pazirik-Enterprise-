import { PageLayout } from "@/components/page-layout"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Award, Clock, Globe } from "lucide-react"

export default function AboutPage() {
  return (
    <PageLayout>
      <PageHeader
        titlePersian="درباره ما"
        titleRussian="О нас"
        descriptionPersian="بیش از ۱۰ سال تجربه در ارائه خدمات تخصصی روسیه"
        descriptionRussian="Более 10 лет опыта предоставления специализированных российских услуг"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Company Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6 font-persian">داستان ما</h2>
            <p className="text-lg leading-relaxed text-muted-foreground mb-4 font-persian">
              راشا گستر پازیریک از سال ۲۰۱۳ با هدف ارائه بهترین خدمات در زمینه روسیه فعالیت خود را آغاز کرد. ما با تکیه
              بر تجربه و دانش تخصصی، توانسته‌ایم به یکی از معتبرترین شرکت‌های ارائه‌دهنده خدمات روسیه تبدیل شویم.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground font-persian">
              تیم ما متشکل از متخصصان با تجربه در زمینه‌های مختلف است که همواره در تلاش برای ارائه بهترین خدمات به
              مشتریان عزیز هستند.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6 font-russian">Наша история</h2>
            <p className="text-lg leading-relaxed text-muted-foreground mb-4 font-russian">
              Раша Гостар Пазирик начала свою деятельность в 2013 году с целью предоставления лучших услуг в области
              России. Опираясь на опыт и специальные знания, мы смогли стать одной из самых авторитетных компаний,
              предоставляющих российские услуги.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground font-russian">
              Наша команда состоит из опытных специалистов в различных областях, которые всегда стремятся предоставить
              лучшие услуги нашим дорогим клиентам.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <Card className="text-center">
            <CardContent className="p-6">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">۱۰۰۰+</h3>
              <p className="text-muted-foreground font-persian">مشتری راضی</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Award className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">۱۰+</h3>
              <p className="text-muted-foreground font-persian">سال تجربه</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">۲۴/۷</h3>
              <p className="text-muted-foreground font-persian">پشتیبانی</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">۵۰+</h3>
              <p className="text-muted-foreground font-persian">شهر روسیه</p>
            </CardContent>
          </Card>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 font-persian">ماموریت ما</h3>
              <p className="text-muted-foreground leading-relaxed font-persian">
                ارائه خدمات با کیفیت، سریع و مقرون به صرفه در زمینه روسیه با هدف تسهیل امور مشتریان و ایجاد تجربه‌ای
                مطلوب برای آنها.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 font-persian">چشم‌انداز ما</h3>
              <p className="text-muted-foreground leading-relaxed font-persian">
                تبدیل شدن به معتبرترین و بزرگ‌ترین ارائه‌دهنده خدمات روسیه در منطقه با حفظ استانداردهای بالای کیفیت و
                رضایت مشتری.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
