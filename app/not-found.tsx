import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowRight } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary/20 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-foreground mb-2 font-persian">صفحه یافت نشد</h2>
          <p className="text-muted-foreground font-persian">متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد.</p>
        </div>

        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/" className="flex items-center justify-center gap-2">
              <Home className="w-4 h-4" />
              <span className="font-persian">بازگشت به صفحه اصلی</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>

          <Button variant="outline" asChild className="w-full bg-transparent">
            <Link href="/contact" className="font-persian">
              تماس با ما
            </Link>
          </Button>
        </div>

        <div className="mt-8 text-sm text-muted-foreground">
          <p className="font-persian">در صورت بروز مشکل، لطفاً با پشتیبانی تماس بگیرید.</p>
        </div>
      </div>
    </div>
  )
}
