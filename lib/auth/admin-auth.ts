"use client"

import { createClient } from "@/lib/supabase/client"

export interface AdminCredentials {
  username: string
  password: string
}

export interface AdminUser {
  id: string
  username: string
  email: string
}

const FALLBACK_ADMIN = {
  id: "fallback-admin-id",
  username: "adminpaz",
  email: "admin@pazirik.com",
  password: "Mb4338**",
}

function setAdminSession(adminUser: AdminUser) {
  if (typeof window !== "undefined") {
    localStorage.setItem(
      "admin_session",
      JSON.stringify({
        user: adminUser,
        timestamp: Date.now(),
      }),
    )
  }
}

function getAdminSession(): AdminUser | null {
  if (typeof window === "undefined") return null

  try {
    const session = localStorage.getItem("admin_session")
    if (!session) return null

    const { user, timestamp } = JSON.parse(session)
    // Session expires after 24 hours
    if (Date.now() - timestamp > 24 * 60 * 60 * 1000) {
      localStorage.removeItem("admin_session")
      return null
    }

    return user
  } catch {
    return null
  }
}

function clearAdminSession() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("admin_session")
  }
}

export async function signInAdmin({ username, password }: AdminCredentials) {
  console.log("[v0] Admin sign in attempt:", { username })
  const supabase = createClient()

  if (supabase) {
    console.log("[v0] Attempting Supabase authentication")
    try {
      const email = username === "adminpaz" ? "admin@pazirik.com" : `${username}@pazirik.com`

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      const { data: adminUser, error: adminError } = await supabase
        .from("admin_users")
        .select("*")
        .eq("id", data.user.id)
        .single()

      if (adminError || !adminUser) {
        await supabase.auth.signOut()
        throw new Error("Access denied. Admin privileges required.")
      }

      console.log("[v0] Supabase authentication successful")
      return { user: data.user, adminUser }
    } catch (error) {
      console.log("[v0] Supabase authentication failed, trying fallback:", error)
    }
  } else {
    console.log("[v0] Supabase client not available, using fallback authentication")
  }

  console.log("[v0] Checking fallback credentials:", {
    providedUsername: username,
    expectedUsername: FALLBACK_ADMIN.username,
    passwordMatch: password === FALLBACK_ADMIN.password,
  })

  if (username === FALLBACK_ADMIN.username && password === FALLBACK_ADMIN.password) {
    const adminUser = {
      id: FALLBACK_ADMIN.id,
      username: FALLBACK_ADMIN.username,
      email: FALLBACK_ADMIN.email,
    }

    console.log("[v0] Fallback authentication successful, setting session")
    setAdminSession(adminUser)
    return { user: adminUser, adminUser }
  }

  console.log("[v0] Authentication failed - invalid credentials")
  throw new Error("Invalid credentials")
}

export async function signOutAdmin() {
  const supabase = createClient()

  if (supabase) {
    try {
      await supabase.auth.signOut()
    } catch (error) {
      console.error("Supabase sign out error:", error)
    }
  }

  clearAdminSession()
}

export async function getCurrentAdmin(): Promise<AdminUser | null> {
  console.log("[v0] Getting current admin")
  const supabase = createClient()

  if (supabase) {
    console.log("[v0] Checking Supabase session")
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()

      if (!error && user) {
        const { data: adminUser, error: adminError } = await supabase
          .from("admin_users")
          .select("*")
          .eq("id", user.id)
          .single()

        if (!adminError && adminUser) {
          console.log("[v0] Found Supabase admin user")
          return adminUser
        }
      }
    } catch (error) {
      console.log("[v0] Supabase session check failed:", error)
    }
  }

  const fallbackSession = getAdminSession()
  console.log("[v0] Fallback session check:", fallbackSession ? "Found" : "Not found")
  return fallbackSession
}

export async function changeAdminPassword(currentPassword: string, newPassword: string) {
  const supabase = createClient()

  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error("Change password error:", error)
    throw error
  }
}

export async function createInitialAdmin() {
  const supabase = createClient()

  try {
    const { data: existingAdmin } = await supabase.from("admin_users").select("id").limit(1).single()

    if (existingAdmin) {
      return { success: true, message: "Admin already exists" }
    }

    const { data, error } = await supabase.auth.signUp({
      email: "admin@pazirik.com",
      password: "Mb4338**",
      options: {
        data: {
          username: "adminpaz",
        },
      },
    })

    if (error) throw error

    if (data.user) {
      const { error: adminError } = await supabase.from("admin_users").insert({
        id: data.user.id,
        username: "adminpaz",
        email: "admin@pazirik.com",
      })

      if (adminError) throw adminError
    }

    return { success: true, message: "Initial admin created successfully" }
  } catch (error) {
    console.error("Create initial admin error:", error)
    throw error
  }
}
// src/lib/auth/admin-auth.ts
// (قسمت‌های قبلی کد شما در اینجا قرار دارند)
// ...

export async function signInAdmin(credentials: AdminCredentials): Promise<void> {
  const { username, password } = credentials;

  // Simulate an API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Check against the hardcoded fallback admin credentials
  if (username === FALLBACK_ADMIN.username && password === FALLBACK_ADMIN.password) {
    // If credentials are valid, create a user object and set the session
    const adminUser: AdminUser = {
      id: FALLBACK_ADMIN.id,
      username: FALLBACK_ADMIN.username,
      email: FALLBACK_ADMIN.email,
    };
    setAdminSession(adminUser);
    return;
  }

  // If credentials are not valid, throw an error
  throw new Error("Invalid username or password.");
}

export function signOutAdmin() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("admin_session");
  }
}

export function getCurrentAdmin(): AdminUser | null {
  const session = getAdminSession();
  if (session && Date.now() - session.timestamp < 3600000) { // 1 hour validity
    return session.user;
  }
  signOutAdmin(); // Clear expired session
  return null;
}
