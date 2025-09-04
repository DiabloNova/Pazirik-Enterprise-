"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Save, Loader2, ImageIcon, MoveUp, MoveDown } from "lucide-react"
import {
  getSliderImages,
  createSliderImage,
  updateSliderImage,
  deleteSliderImage,
  type SliderImage,
} from "@/lib/cms/content-api"

export default function SliderManagementPage() {
  const [slides, setSlides] = useState<SliderImage[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editingSlide, setEditingSlide] = useState<SliderImage | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  useEffect(() => {
    loadSlides()
  }, [])

  const loadSlides = async () => {
    try {
      const data = await getSliderImages()
      setSlides(data)
    } catch (error) {
      console.error("Failed to load slides:", error)
      setMessage({ type: "error", text: "Failed to load slider images" })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (slideData: Omit<SliderImage, "id"> | SliderImage) => {
    setSaving(true)
    setMessage(null)

    try {
      if ("id" in slideData) {
        // Update existing slide
        await updateSliderImage(slideData.id, slideData)
        setMessage({ type: "success", text: "Slide updated successfully" })
      } else {
        // Create new slide
        await createSliderImage(slideData)
        setMessage({ type: "success", text: "Slide created successfully" })
      }
      await loadSlides()
      setIsDialogOpen(false)
      setEditingSlide(null)
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Failed to save slide" })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this slide?")) return

    try {
      await deleteSliderImage(id)
      setMessage({ type: "success", text: "Slide deleted successfully" })
      await loadSlides()
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Failed to delete slide" })
    }
  }

  const handleToggleActive = async (slide: SliderImage) => {
    try {
      await updateSliderImage(slide.id, { is_active: !slide.is_active })
      await loadSlides()
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Failed to update slide status" })
    }
  }

  const handleMoveSlide = async (slide: SliderImage, direction: "up" | "down") => {
    const currentIndex = slides.findIndex((s) => s.id === slide.id)
    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1

    if (newIndex < 0 || newIndex >= slides.length) return

    try {
      const otherSlide = slides[newIndex]
      await updateSliderImage(slide.id, { order_index: otherSlide.order_index })
      await updateSliderImage(otherSlide.id, { order_index: slide.order_index })
      await loadSlides()
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Failed to reorder slides" })
    }
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Slider Management</h1>
            <p className="text-muted-foreground">Manage homepage slider images and content</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingSlide(null)}>
                <Plus className="h-4 w-4 mr-2" />
                Add New Slide
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingSlide ? "Edit Slide" : "Add New Slide"}</DialogTitle>
                <DialogDescription>
                  {editingSlide ? "Update the slide information" : "Create a new slide for the homepage slider"}
                </DialogDescription>
              </DialogHeader>
              <SlideEditor slide={editingSlide} onSave={handleSave} saving={saving} />
            </DialogContent>
          </Dialog>
        </div>

        {message && (
          <Alert variant={message.type === "error" ? "destructive" : "default"}>
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 gap-6">
          {slides.map((slide, index) => (
            <Card key={slide.id} className={`${!slide.is_active ? "opacity-60" : ""}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-24 h-16 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                      {slide.image_url ? (
                        <img
                          src={slide.image_url || "/placeholder.svg"}
                          alt="Slide"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{slide.title_persian}</h3>
                      <p className="text-sm text-muted-foreground">{slide.title_russian}</p>
                      <p className="text-xs text-muted-foreground">Order: {slide.order_index}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMoveSlide(slide, "up")}
                      disabled={index === 0}
                    >
                      <MoveUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMoveSlide(slide, "down")}
                      disabled={index === slides.length - 1}
                    >
                      <MoveDown className="h-4 w-4" />
                    </Button>
                    <Switch checked={slide.is_active} onCheckedChange={() => handleToggleActive(slide)} />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingSlide(slide)
                        setIsDialogOpen(true)
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(slide.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Persian Description:</p>
                    <p className="text-muted-foreground">{slide.description_persian || "No description"}</p>
                  </div>
                  <div>
                    <p className="font-medium">Russian Description:</p>
                    <p className="text-muted-foreground">{slide.description_russian || "No description"}</p>
                  </div>
                  <div>
                    <p className="font-medium">CTA Link:</p>
                    <p className="text-muted-foreground">{slide.cta_link}</p>
                  </div>
                  <div>
                    <p className="font-medium">Status:</p>
                    <p className={slide.is_active ? "text-green-600" : "text-red-600"}>
                      {slide.is_active ? "Active" : "Inactive"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {slides.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No slides found</h3>
              <p className="text-muted-foreground mb-4">Create your first slide to get started</p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add First Slide
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}

function SlideEditor({
  slide,
  onSave,
  saving,
}: {
  slide: SliderImage | null
  onSave: (slide: Omit<SliderImage, "id"> | SliderImage) => void
  saving: boolean
}) {
  const [formData, setFormData] = useState({
    image_url: slide?.image_url || "",
    title_persian: slide?.title_persian || "",
    title_russian: slide?.title_russian || "",
    description_persian: slide?.description_persian || "",
    description_russian: slide?.description_russian || "",
    cta_text_persian: slide?.cta_text_persian || "",
    cta_text_russian: slide?.cta_text_russian || "",
    cta_link: slide?.cta_link || "",
    order_index: slide?.order_index || 1,
    is_active: slide?.is_active ?? true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (slide) {
      onSave({ ...slide, ...formData })
    } else {
      onSave(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="image_url">Image URL</Label>
        <Input
          id="image_url"
          value={formData.image_url}
          onChange={(e) => setFormData((prev) => ({ ...prev, image_url: e.target.value }))}
          placeholder="https://example.com/image.jpg"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title_persian">Persian Title</Label>
          <Input
            id="title_persian"
            value={formData.title_persian}
            onChange={(e) => setFormData((prev) => ({ ...prev, title_persian: e.target.value }))}
            className="font-persian"
            required
          />
        </div>
        <div>
          <Label htmlFor="title_russian">Russian Title</Label>
          <Input
            id="title_russian"
            value={formData.title_russian}
            onChange={(e) => setFormData((prev) => ({ ...prev, title_russian: e.target.value }))}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="description_persian">Persian Description</Label>
          <Textarea
            id="description_persian"
            value={formData.description_persian}
            onChange={(e) => setFormData((prev) => ({ ...prev, description_persian: e.target.value }))}
            className="font-persian"
          />
        </div>
        <div>
          <Label htmlFor="description_russian">Russian Description</Label>
          <Textarea
            id="description_russian"
            value={formData.description_russian}
            onChange={(e) => setFormData((prev) => ({ ...prev, description_russian: e.target.value }))}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="cta_text_persian">Persian CTA Text</Label>
          <Input
            id="cta_text_persian"
            value={formData.cta_text_persian}
            onChange={(e) => setFormData((prev) => ({ ...prev, cta_text_persian: e.target.value }))}
            className="font-persian"
            required
          />
        </div>
        <div>
          <Label htmlFor="cta_text_russian">Russian CTA Text</Label>
          <Input
            id="cta_text_russian"
            value={formData.cta_text_russian}
            onChange={(e) => setFormData((prev) => ({ ...prev, cta_text_russian: e.target.value }))}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="cta_link">CTA Link</Label>
          <Input
            id="cta_link"
            value={formData.cta_link}
            onChange={(e) => setFormData((prev) => ({ ...prev, cta_link: e.target.value }))}
            placeholder="/services/visa"
            required
          />
        </div>
        <div>
          <Label htmlFor="order_index">Order Index</Label>
          <Input
            id="order_index"
            type="number"
            value={formData.order_index}
            onChange={(e) => setFormData((prev) => ({ ...prev, order_index: Number.parseInt(e.target.value) }))}
            min="1"
            required
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="is_active"
          checked={formData.is_active}
          onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, is_active: checked }))}
        />
        <Label htmlFor="is_active">Active</Label>
      </div>

      <Button type="submit" disabled={saving} className="w-full">
        {saving ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save className="h-4 w-4 mr-2" />
            {slide ? "Update Slide" : "Create Slide"}
          </>
        )}
      </Button>
    </form>
  )
}
