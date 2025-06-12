"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  role: "patient" | "doctor" | "admin"
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Sample credentials for testing
  const sampleUsers = {
    // Patient credentials
    "patient@test.com": {
      id: "pat_001",
      name: "John Smith",
      email: "patient@test.com",
      role: "patient" as const,
      password: "patient123",
    },
    // Doctor credentials
    "doctor@test.com": {
      id: "doc_001",
      name: "Dr. Sarah Johnson",
      email: "doctor@test.com",
      role: "doctor" as const,
      password: "doctor123",
    },
    // Admin credentials
    "admin@test.com": {
      id: "adm_001",
      name: "Admin User",
      email: "admin@test.com",
      role: "admin" as const,
      password: "admin123",
    },
  }

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("careXpert_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    const userData = sampleUsers[email as keyof typeof sampleUsers]

    if (userData && userData.password === password) {
      const { password: _, ...userWithoutPassword } = userData
      setUser(userWithoutPassword)
      localStorage.setItem("careXpert_user", JSON.stringify(userWithoutPassword))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("careXpert_user")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
