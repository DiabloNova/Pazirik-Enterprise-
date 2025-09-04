"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Loader2 } from "lucide-react"
import {
  getWebsiteContent,
  updateWebsiteContent,
  verifyContentUpdate,
  type WebsiteContent,
} from "@/lib/cms/content-api"

export default function ContentManagementPage() {
  const [content, setContent] = useState<WebsiteContent[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = async () => {
    try {
      const data = await getWebsiteContent()
      setContent(data)
    } catch (error) {
      console.error("Failed to load content:", error)
      setMessage({ type: "error", text: "Failed to load content" })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (sectionKey: string, contentPersian: any, contentRussian: any) => {
    setSaving(sectionKey)
    setMessage(null)

    try {
      await updateWebsiteContent(sectionKey, contentPersian, contentRussian)
      const verification = await verifyContentUpdate(sectionKey)
      setMessage({ type: "success", text: `Content updated successfully and is live on the website.` })
      await loadContent()
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Failed to update content" })
    } finally {
      setSaving(null)
    }
  }

  const getContentByKey = (key: string) => {
    return content.find((c) => c.section_key === key)
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Content Management</h1>
          <p className="text-muted-foreground">Edit and manage all website content</p>
        </div>

        {message && (
          <Alert variant={message.type === "error" ? "destructive" : "default"}>
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="banner" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="banner">Banner</TabsTrigger>
            <TabsTrigger value="navbar">Navbar</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="why-pazirik">Why Pazirik</TabsTrigger>
            <TabsTrigger value="footer">Footer</TabsTrigger>
          </TabsList>

          <TabsContent value="banner">
            <PromotionalBannerEditor
              content={getContentByKey("promotional_banner")}
              onSave={handleSave}
              saving={saving}
            />
          </TabsContent>

          <TabsContent value="navbar">
            <NavbarEditor content={getContentByKey("navbar")} onSave={handleSave} saving={saving} />
          </TabsContent>

          <TabsContent value="services">
            <ServicesEditor content={getContentByKey("services")} onSave={handleSave} saving={saving} />
          </TabsContent>

          <TabsContent value="why-pazirik">
            <WhyPazirikEditor content={getContentByKey("why_pazirik")} onSave={handleSave} saving={saving} />
          </TabsContent>

          <TabsContent value="footer">
            <FooterEditor content={getContentByKey("footer")} onSave={handleSave} saving={saving} />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}

// Component for editing promotional banner
function PromotionalBannerEditor({
  content,
  onSave,
  saving,
}: {
  content?: WebsiteContent
  onSave: (key: string, persian: any, russian: any) => void
  saving: string | null
}) {
  const [persian, setPersian] = useState(content?.content_persian?.text || "")
  const [russian, setRussian] = useState(content?.content_russian?.text || "")

  const handleSave = () => {
    onSave("promotional_banner", { text: persian }, { text: russian })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Promotional Banner</CardTitle>
        <CardDescription>Edit the promotional banner text displayed at the top of the website</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="banner-persian">Persian Text</Label>
          <Input
            id="banner-persian"
            value={persian}
            onChange={(e) => setPersian(e.target.value)}
            placeholder="Enter Persian banner text"
            className="font-persian"
          />
        </div>
        <div>
          <Label htmlFor="banner-russian">Russian Text</Label>
          <Input
            id="banner-russian"
            value={russian}
            onChange={(e) => setRussian(e.target.value)}
            placeholder="Enter Russian banner text"
          />
        </div>
        <Button onClick={handleSave} disabled={saving === "promotional_banner"}>
          {saving === "promotional_banner" ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

// Component for editing navbar
function NavbarEditor({
  content,
  onSave,
  saving,
}: {
  content?: WebsiteContent
  onSave: (key: string, persian: any, russian: any) => void
  saving: string | null
}) {
  const [persianTitle, setPersianTitle] = useState(content?.content_persian?.title || "")
  const [russianTitle, setRussianTitle] = useState(content?.content_russian?.title || "")
  const [persianLogo, setPersianLogo] = useState(content?.content_persian?.logo_text || "")
  const [russianLogo, setRussianLogo] = useState(content?.content_russian?.logo_text || "")

  const handleSave = () => {
    onSave("navbar", { title: persianTitle, logo_text: persianLogo }, { title: russianTitle, logo_text: russianLogo })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Navigation Bar</CardTitle>
        <CardDescription>Edit the navigation bar title and logo text</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="navbar-title-persian">Persian Title</Label>
            <Input
              id="navbar-title-persian"
              value={persianTitle}
              onChange={(e) => setPersianTitle(e.target.value)}
              placeholder="Persian navbar title"
              className="font-persian"
            />
          </div>
          <div>
            <Label htmlFor="navbar-title-russian">Russian Title</Label>
            <Input
              id="navbar-title-russian"
              value={russianTitle}
              onChange={(e) => setRussianTitle(e.target.value)}
              placeholder="Russian navbar title"
            />
          </div>
          <div>
            <Label htmlFor="navbar-logo-persian">Persian Logo Text</Label>
            <Input
              id="navbar-logo-persian"
              value={persianLogo}
              onChange={(e) => setPersianLogo(e.target.value)}
              placeholder="Persian logo text"
              className="font-persian"
            />
          </div>
          <div>
            <Label htmlFor="navbar-logo-russian">Russian Logo Text</Label>
            <Input
              id="navbar-logo-russian"
              value={russianLogo}
              onChange={(e) => setRussianLogo(e.target.value)}
              placeholder="Russian logo text"
            />
          </div>
        </div>
        <Button onClick={handleSave} disabled={saving === "navbar"}>
          {saving === "navbar" ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

// Component for editing services
function ServicesEditor({
  content,
  onSave,
  saving,
}: {
  content?: WebsiteContent
  onSave: (key: string, persian: any, russian: any) => void
  saving: string | null
}) {
  const [persianData, setPersianData] = useState({
    title: content?.content_persian?.title || "",
    visa_title: content?.content_persian?.visa_title || "",
    visa_desc: content?.content_persian?.visa_desc || "",
    study_title: content?.content_persian?.study_title || "",
    study_desc: content?.content_persian?.study_desc || "",
    transfer_title: content?.content_persian?.transfer_title || "",
    transfer_desc: content?.content_persian?.transfer_desc || "",
  })

  const [russianData, setRussianData] = useState({
    title: content?.content_russian?.title || "",
    visa_title: content?.content_russian?.visa_title || "",
    visa_desc: content?.content_russian?.visa_desc || "",
    study_title: content?.content_russian?.study_title || "",
    study_desc: content?.content_russian?.study_desc || "",
    transfer_title: content?.content_russian?.transfer_title || "",
    transfer_desc: content?.content_russian?.transfer_desc || "",
  })

  const handleSave = () => {
    onSave("services", persianData, russianData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Services Section</CardTitle>
        <CardDescription>Edit the services section content</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="services-title-persian">Persian Section Title</Label>
            <Input
              id="services-title-persian"
              value={persianData.title}
              onChange={(e) => setPersianData((prev) => ({ ...prev, title: e.target.value }))}
              className="font-persian"
            />
          </div>
          <div>
            <Label htmlFor="services-title-russian">Russian Section Title</Label>
            <Input
              id="services-title-russian"
              value={russianData.title}
              onChange={(e) => setRussianData((prev) => ({ ...prev, title: e.target.value }))}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold">Visa Service</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Persian Title</Label>
              <Input
                value={persianData.visa_title}
                onChange={(e) => setPersianData((prev) => ({ ...prev, visa_title: e.target.value }))}
                className="font-persian"
              />
            </div>
            <div>
              <Label>Russian Title</Label>
              <Input
                value={russianData.visa_title}
                onChange={(e) => setRussianData((prev) => ({ ...prev, visa_title: e.target.value }))}
              />
            </div>
            <div>
              <Label>Persian Description</Label>
              <Textarea
                value={persianData.visa_desc}
                onChange={(e) => setPersianData((prev) => ({ ...prev, visa_desc: e.target.value }))}
                className="font-persian"
              />
            </div>
            <div>
              <Label>Russian Description</Label>
              <Textarea
                value={russianData.visa_desc}
                onChange={(e) => setRussianData((prev) => ({ ...prev, visa_desc: e.target.value }))}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold">Study Service</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Persian Title</Label>
              <Input
                value={persianData.study_title}
                onChange={(e) => setPersianData((prev) => ({ ...prev, study_title: e.target.value }))}
                className="font-persian"
              />
            </div>
            <div>
              <Label>Russian Title</Label>
              <Input
                value={russianData.study_title}
                onChange={(e) => setRussianData((prev) => ({ ...prev, study_title: e.target.value }))}
              />
            </div>
            <div>
              <Label>Persian Description</Label>
              <Textarea
                value={persianData.study_desc}
                onChange={(e) => setPersianData((prev) => ({ ...prev, study_desc: e.target.value }))}
                className="font-persian"
              />
            </div>
            <div>
              <Label>Russian Description</Label>
              <Textarea
                value={russianData.study_desc}
                onChange={(e) => setRussianData((prev) => ({ ...prev, study_desc: e.target.value }))}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold">Transfer Service</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Persian Title</Label>
              <Input
                value={persianData.transfer_title}
                onChange={(e) => setPersianData((prev) => ({ ...prev, transfer_title: e.target.value }))}
                className="font-persian"
              />
            </div>
            <div>
              <Label>Russian Title</Label>
              <Input
                value={russianData.transfer_title}
                onChange={(e) => setRussianData((prev) => ({ ...prev, transfer_title: e.target.value }))}
              />
            </div>
            <div>
              <Label>Persian Description</Label>
              <Textarea
                value={persianData.transfer_desc}
                onChange={(e) => setPersianData((prev) => ({ ...prev, transfer_desc: e.target.value }))}
                className="font-persian"
              />
            </div>
            <div>
              <Label>Russian Description</Label>
              <Textarea
                value={russianData.transfer_desc}
                onChange={(e) => setRussianData((prev) => ({ ...prev, transfer_desc: e.target.value }))}
              />
            </div>
          </div>
        </div>

        <Button onClick={handleSave} disabled={saving === "services"}>
          {saving === "services" ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

// Component for editing Why Pazirik section
function WhyPazirikEditor({
  content,
  onSave,
  saving,
}: {
  content?: WebsiteContent
  onSave: (key: string, persian: any, russian: any) => void
  saving: string | null
}) {
  const [persianTitle, setPersianTitle] = useState(content?.content_persian?.title || "")
  const [russianTitle, setRussianTitle] = useState(content?.content_russian?.title || "")
  const [persianReasons, setPersianReasons] = useState<string[]>(content?.content_persian?.reasons || [])
  const [russianReasons, setRussianReasons] = useState<string[]>(content?.content_russian?.reasons || [])

  const handleSave = () => {
    onSave(
      "why_pazirik",
      { title: persianTitle, reasons: persianReasons },
      { title: russianTitle, reasons: russianReasons },
    )
  }

  const updatePersianReason = (index: number, value: string) => {
    const newReasons = [...persianReasons]
    newReasons[index] = value
    setPersianReasons(newReasons)
  }

  const updateRussianReason = (index: number, value: string) => {
    const newReasons = [...russianReasons]
    newReasons[index] = value
    setRussianReasons(newReasons)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Why Pazirik Section</CardTitle>
        <CardDescription>Edit the reasons why customers should choose Pazirik</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="why-title-persian">Persian Title</Label>
            <Input
              id="why-title-persian"
              value={persianTitle}
              onChange={(e) => setPersianTitle(e.target.value)}
              className="font-persian"
            />
          </div>
          <div>
            <Label htmlFor="why-title-russian">Russian Title</Label>
            <Input id="why-title-russian" value={russianTitle} onChange={(e) => setRussianTitle(e.target.value)} />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold">Reasons</h4>
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Persian Reason {index + 1}</Label>
                <Input
                  value={persianReasons[index] || ""}
                  onChange={(e) => updatePersianReason(index, e.target.value)}
                  className="font-persian"
                />
              </div>
              <div>
                <Label>Russian Reason {index + 1}</Label>
                <Input
                  value={russianReasons[index] || ""}
                  onChange={(e) => updateRussianReason(index, e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>

        <Button onClick={handleSave} disabled={saving === "why_pazirik"}>
          {saving === "why_pazirik" ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

// Component for editing footer
function FooterEditor({
  content,
  onSave,
  saving,
}: {
  content?: WebsiteContent
  onSave: (key: string, persian: any, russian: any) => void
  saving: string | null
}) {
  const [persianData, setPersianData] = useState({
    phone: content?.content_persian?.phone || "",
    email: content?.content_persian?.email || "",
    address: content?.content_persian?.address || "",
    copyright: content?.content_persian?.copyright || "",
  })

  const [russianData, setRussianData] = useState({
    phone: content?.content_russian?.phone || "",
    email: content?.content_russian?.email || "",
    address: content?.content_russian?.address || "",
    copyright: content?.content_russian?.copyright || "",
  })

  const handleSave = () => {
    onSave("footer", persianData, russianData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Footer Section</CardTitle>
        <CardDescription>Edit footer contact information and copyright</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Phone Number</Label>
            <Input
              value={persianData.phone}
              onChange={(e) => setPersianData((prev) => ({ ...prev, phone: e.target.value }))}
            />
          </div>
          <div>
            <Label>Email Address</Label>
            <Input
              value={persianData.email}
              onChange={(e) => setPersianData((prev) => ({ ...prev, email: e.target.value }))}
            />
          </div>
          <div>
            <Label>Persian Address</Label>
            <Input
              value={persianData.address}
              onChange={(e) => setPersianData((prev) => ({ ...prev, address: e.target.value }))}
              className="font-persian"
            />
          </div>
          <div>
            <Label>Russian Address</Label>
            <Input
              value={russianData.address}
              onChange={(e) => setRussianData((prev) => ({ ...prev, address: e.target.value }))}
            />
          </div>
          <div>
            <Label>Persian Copyright</Label>
            <Input
              value={persianData.copyright}
              onChange={(e) => setPersianData((prev) => ({ ...prev, copyright: e.target.value }))}
              className="font-persian"
            />
          </div>
          <div>
            <Label>Russian Copyright</Label>
            <Input
              value={russianData.copyright}
              onChange={(e) => setRussianData((prev) => ({ ...prev, copyright: e.target.value }))}
            />
          </div>
        </div>

        <Button onClick={handleSave} disabled={saving === "footer"}>
          {saving === "footer" ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
