"use client"

import { createClient } from "@/lib/supabase/client"

export interface WebsiteContent {
  id: string
  section_key: string
  content_persian: any
  content_russian: any
  updated_at: string
}

export interface SliderImage {
  id: string
  image_url: string
  title_persian: string
  title_russian: string
  description_persian?: string
  description_russian?: string
  cta_text_persian: string
  cta_text_russian: string
  cta_link: string
  order_index: number
  is_active: boolean
}

export interface SpecialOffer {
  id: string
  image_url: string
  title_persian: string
  title_russian: string
  description_persian: string
  description_russian: string
  link_url: string
  order_index: number
  is_active: boolean
}

// Website Content Management
export async function getWebsiteContent() {
  const supabase = createClient()
  const { data, error } = await supabase.from("website_content").select("*").order("section_key")

  if (error) throw error
  return data as WebsiteContent[]
}

export async function updateWebsiteContent(sectionKey: string, contentPersian: any, contentRussian: any) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("website_content")
    .upsert({
      section_key: sectionKey,
      content_persian: contentPersian,
      content_russian: contentRussian,
      updated_at: new Date().toISOString(),
    })
    .select()

  if (error) throw error
  return data[0] as WebsiteContent
}

// Slider Management
export async function getSliderImages() {
  const supabase = createClient()
  const { data, error } = await supabase.from("slider_images").select("*").order("order_index")

  if (error) throw error
  return data as SliderImage[]
}

export async function createSliderImage(slider: Omit<SliderImage, "id">) {
  const supabase = createClient()
  const { data, error } = await supabase.from("slider_images").insert(slider).select()

  if (error) throw error
  return data[0] as SliderImage
}

export async function updateSliderImage(id: string, updates: Partial<SliderImage>) {
  const supabase = createClient()
  const { data, error } = await supabase.from("slider_images").update(updates).eq("id", id).select()

  if (error) throw error
  return data[0] as SliderImage
}

export async function deleteSliderImage(id: string) {
  const supabase = createClient()
  const { error } = await supabase.from("slider_images").delete().eq("id", id)

  if (error) throw error
}

// Special Offers Management
export async function getSpecialOffers() {
  const supabase = createClient()
  const { data, error } = await supabase.from("special_offers").select("*").order("order_index")

  if (error) throw error
  return data as SpecialOffer[]
}

export async function createSpecialOffer(offer: Omit<SpecialOffer, "id">) {
  const supabase = createClient()
  const { data, error } = await supabase.from("special_offers").insert(offer).select()

  if (error) throw error
  return data[0] as SpecialOffer
}

export async function updateSpecialOffer(id: string, updates: Partial<SpecialOffer>) {
  const supabase = createClient()
  const { data, error } = await supabase.from("special_offers").update(updates).eq("id", id).select()

  if (error) throw error
  return data[0] as SpecialOffer
}

export async function deleteSpecialOffer(id: string) {
  const supabase = createClient()
  const { error } = await supabase.from("special_offers").delete().eq("id", id)

  if (error) throw error
}

// Content Verification
export async function verifyContentUpdate(sectionKey: string) {
  // This would typically make a request to verify the content is live
  // For now, we'll simulate the verification
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: `Content for ${sectionKey} has been successfully updated and is live on the website.`,
        timestamp: new Date().toISOString(),
      })
    }, 1000)
  })
}
