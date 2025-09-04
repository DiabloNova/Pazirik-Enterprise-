"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  getSpecialOffers,
  createSpecialOffer,
  updateSpecialOffer,
  deleteSpecialOffer,
  type SpecialOffer,
} from "@/lib/cms/content-api"

export default function SpecialOffersPage() {
  const [offers, setOffers] = useState<SpecialOffer[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editingOffer, setEditingOffer] = useState<SpecialOffer | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  useEffect(() => {
    loadOffers()
  }, [])

  const loadOffers = async () => {
    try {
      const data = await getSpecialOffers()
      setOffers(data)
    } catch (error) {
      console.error("Failed to load offers:", error)
      setMessage({ type: "error", text: "Failed to load special offers" })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (offerData: Omit<SpecialOffer, "id"> | SpecialOffer) => {
    setSaving(true)
    setMessage(null)

    try {
      if ("id" in offerData) {
        await updateSpecialOffer(offerData.id, offerData)
        setMessage({ type: "success", text: "Offer updated successfully" })
      } else {
        await createSpecialOffer(offerData)
        setMessage({ type: "success", text: "Offer created successfully" })
      }
      await loadOffers()
      setIsDialogOpen(false)
      setEditingOffer(null)
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Failed to save offer" })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this offer?")) return

    try {
      await deleteSpecialOffer(id)
      setMessage({ type: "success", text: "Offer deleted successfully" })
      await loadOffers()
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Failed to delete offer" })
    }
  }

  const handleToggleActive = async (offer: SpecialOffer) => {
    try {
      await updateSpecialOffer(offer.id, { is_active: !offer.is_active })
      await loadOffers()
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Failed to update offer status" })
    }
  }

  const handleMoveOffer = async (offer: SpecialOffer, direction: "up" | "down") => {
    const currentIndex = offers.findIndex((o) => o.id === offer.id)
    if ((direction === "up" && currentIndex === 0) || (direction === "down" && currentIndex === offers.length - 1)) {
      return
    }

    const newOrder = direction === "up" ? offer.order - 1 : offer.order + 1
    const swapOffer = offers.find((o) => o.order === newOrder)

    if (swapOffer) {
      try {
        await updateSpecialOffer(offer.id, { order: newOrder })
        await updateSpecialOffer(swapOffer.id, { order: offer.order })
        await loadOffers()
      } catch (error: any) {
        setMessage({ type: "error", text: error.message || "Failed to reorder offers" })
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Special Offers Management</h1>
        <button
          onClick={() => {
            setEditingOffer(null)
            setIsDialogOpen(true)
          }}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
        >
          Add New Offer
        </button>
      </div>

      {message && (
        <div
          className={`p-4 rounded-md mb-4 ${
            message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="grid gap-4">
        {offers.map((offer) => (
          <div key={offer.id} className="border rounded-lg p-4 bg-card">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{offer.title_fa}</h3>
                <p className="text-sm text-muted-foreground mb-2">{offer.title_ru}</p>
                <p className="text-sm">{offer.description_fa}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      offer.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {offer.is_active ? "Active" : "Inactive"}
                  </span>
                  <span className="text-xs text-muted-foreground">Order: {offer.order}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleMoveOffer(offer, "up")}
                  disabled={offers.findIndex((o) => o.id === offer.id) === 0}
                  className="p-1 text-sm bg-gray-100 rounded disabled:opacity-50"
                >
                  ↑
                </button>
                <button
                  onClick={() => handleMoveOffer(offer, "down")}
                  disabled={offers.findIndex((o) => o.id === offer.id) === offers.length - 1}
                  className="p-1 text-sm bg-gray-100 rounded disabled:opacity-50"
                >
                  ↓
                </button>
                <button
                  onClick={() => handleToggleActive(offer)}
                  className={`px-3 py-1 rounded text-sm ${
                    offer.is_active ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
                  }`}
                >
                  {offer.is_active ? "Deactivate" : "Activate"}
                </button>
                <button
                  onClick={() => {
                    setEditingOffer(offer)
                    setIsDialogOpen(true)
                  }}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(offer.id)}
                  className="px-3 py-1 bg-red-100 text-red-800 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isDialogOpen && (
        <OfferDialog
          offer={editingOffer}
          onSave={handleSave}
          onClose={() => {
            setIsDialogOpen(false)
            setEditingOffer(null)
          }}
          saving={saving}
        />
      )}
    </div>
  )
}

function OfferDialog({
  offer,
  onSave,
  onClose,
  saving,
}: {
  offer: SpecialOffer | null
  onSave: (data: Omit<SpecialOffer, "id"> | SpecialOffer) => void
  onClose: () => void
  saving: boolean
}) {
  const [formData, setFormData] = useState({
    title_fa: offer?.title_fa || "",
    title_ru: offer?.title_ru || "",
    description_fa: offer?.description_fa || "",
    description_ru: offer?.description_ru || "",
    image_url: offer?.image_url || "",
    link_url: offer?.link_url || "",
    is_active: offer?.is_active ?? true,
    order: offer?.order || 1,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (offer) {
      onSave({ ...formData, id: offer.id })
    } else {
      onSave(formData)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">{offer ? "Edit Offer" : "Add New Offer"}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title (Persian)</label>
              <input
                type="text"
                value={formData.title_fa}
                onChange={(e) => setFormData({ ...formData, title_fa: e.target.value })}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Title (Russian)</label>
              <input
                type="text"
                value={formData.title_ru}
                onChange={(e) => setFormData({ ...formData, title_ru: e.target.value })}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Description (Persian)</label>
              <textarea
                value={formData.description_fa}
                onChange={(e) => setFormData({ ...formData, description_fa: e.target.value })}
                className="w-full p-2 border rounded-md h-24"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description (Russian)</label>
              <textarea
                value={formData.description_ru}
                onChange={(e) => setFormData({ ...formData, description_ru: e.target.value })}
                className="w-full p-2 border rounded-md h-24"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Link URL</label>
            <input
              type="url"
              value={formData.link_url}
              onChange={(e) => setFormData({ ...formData, link_url: e.target.value })}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Order</label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: Number.parseInt(e.target.value) })}
                className="w-full p-2 border rounded-md"
                min="1"
                required
              />
            </div>
            <div className="flex items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="mr-2"
                />
                Active
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border rounded-md hover:bg-gray-50"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
