import { PageLayout } from "@/components/page-layout"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react"

const articles = [
  {
    id: 1,
    title: "راهنمای کامل تحصیل در دانشگاه‌های روسیه ۲۰۲۴",
    excerpt: "همه چیزهایی که باید درباره تحصیل در روسیه بدانید، از انتخاب رشته تا اخذ ویزا",
    author: "تیم پازیریک",
    date: "۱۵ دی ۱۴۰۲",
    category: "تحصیل",
    image: "/magazine-russia-education-guide.jpg", // Updated with proper image
    readTime: "۱۰ دقیقه",
  },
  {
    id: 2,
    title: "تغییرات جدید در قوانین ویزای روسیه",
    excerpt: "آخرین تغییرات در قوانین صدور ویزای روسیه و تأثیر آن بر متقاضیان",
    author: "احمد محمدی",
    date: "۱۰ دی ۱۴۰۲",
    category: "ویزا",
    image: "/magazine-russia-visa-changes.jpg", // Updated with proper image
    readTime: "۵ دقیقه",
  },
  {
    id: 3,
    title: "بهترین شهرهای روسیه برای زندگی دانشجویان",
    excerpt: "معرفی بهترین شهرهای روسیه که برای زندگی دانشجویان بین‌المللی مناسب هستند",
    author: "مریم احمدی",
    date: "۵ دی ۱۴۰۲",
    category: "سفر",
    image: "/magazine-russia-student-cities.jpg", // Updated with proper image
    readTime: "۸ دقیقه",
  },
  {
    id: 4,
    title: "نحوه ارسال حواله ارزی به روسیه در سال ۲۰۲۴",
    excerpt: "راهنمای کامل ارسال حواله ارزی به روسیه با کمترین کارمزد و بیشترین امنیت",
    author: "علی رضایی",
    date: "۱ دی ۱۴۰۲",
    category: "مالی",
    image: "/magazine-russia-money-transfer.jpg", // Updated with proper image
    readTime: "۶ دقیقه",
  },
  {
    id: 5,
    title: "فرهنگ و آداب و رسوم روسیه",
    excerpt: "آشنایی با فرهنگ، آداب و رسوم مردم روسیه برای بهتر زندگی کردن در این کشور",
    author: "سارا کریمی",
    date: "۲۵ آذر ۱۴۰۲",
    category: "فرهنگ",
    image: "/magazine-russia-culture-traditions.jpg", // Updated with proper image
    readTime: "۱۲ دقیقه",
  },
  {
    id: 6,
    title: "بورسیه‌های تحصیلی دولت روسیه",
    excerpt: "معرفی انواع بورسیه‌های تحصیلی دولت روسیه و نحوه درخواست آنها",
    author: "محمد حسینی",
    date: "۲۰ آذر ۱۴۰۲",
    category: "تحصیل",
    image: "/magazine-russia-scholarships.jpg", // Updated with proper image
    readTime: "۹ دقیقه",
  },
]

const categories = [
  { name: "همه", count: 25 },
  { name: "تحصیل", count: 8 },
  { name: "ویزا", count: 6 },
  { name: "سفر", count: 4 },
  { name: "مالی", count: 3 },
  { name: "فرهنگ", count: 4 },
]

export default function MagazinePage() {
  return (
    <PageLayout>
      <PageHeader
        titlePersian="مجله پازیریک"
        titleRussian="Журнал Пазирик"
        descriptionPersian="آخرین اخبار، راهنماها و مقالات مفید درباره روسیه"
        descriptionRussian="Последние новости, руководства и полезные статьи о России"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4 font-persian">دسته‌بندی مقالات</h3>
                <ul className="space-y-2">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <button className="flex items-center justify-between w-full text-right hover:text-primary transition-colors font-persian">
                        <span className="text-sm text-muted-foreground">({category.count})</span>
                        <span>{category.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2 font-persian">خبرنامه پازیریک</h4>
                  <p className="text-sm text-muted-foreground mb-4 font-persian">
                    برای دریافت آخرین مقالات و اخبار عضو شوید
                  </p>
                  <Button size="sm" className="w-full">
                    <span className="font-persian">عضویت در خبرنامه</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Articles */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.map((article) => (
                <Card
                  key={article.id}
                  className="group hover:shadow-lg transition-all duration-300 animate-fade-in-up hover:scale-105"
                >
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" // Enhanced hover animation
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded font-persian animate-pulse">
                        {" "}
                        {/* Added pulse animation */}
                        {article.category}
                      </span>
                      <span className="font-persian">{article.readTime}</span>
                    </div>

                    <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors font-persian">
                      {article.title}
                    </h3>

                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3 font-persian">{article.excerpt}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        <span className="font-persian">{article.author}</span>
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="font-persian">{article.date}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="group-hover:text-primary">
                        <span className="font-persian">ادامه مطلب</span>
                        <ArrowRight className="mr-1 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                <BookOpen className="ml-2 h-4 w-4" />
                <span className="font-persian">مقالات بیشتر</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
