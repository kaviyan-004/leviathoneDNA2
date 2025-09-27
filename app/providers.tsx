'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { supabase, mockAuth } from '@/lib/supabase'
import { User } from '@/types'
import { translations, LanguageCode } from '@/lib/i18n'

interface AppContextType {
  user: User | null
  loading: boolean
  language: LanguageCode
  setLanguage: (lang: LanguageCode) => void
  t: (key: string) => string
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within a Providers')
  }
  return context
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [language, setLanguage] = useState<LanguageCode>('en')

  useEffect(() => {
    // Get initial session (demo mode)
    const checkDemoSession = () => {
      if (typeof window !== 'undefined') {
        const userData = localStorage.getItem('demo-user')
        if (userData) {
          try {
            const parsedUser = JSON.parse(userData)
            setUser(parsedUser)
          } catch (error) {
            localStorage.removeItem('demo-user')
          }
        }
      }
      setLoading(false)
    }

    checkDemoSession()

    // Listen for auth changes (demo mode)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'demo-user') {
        if (e.newValue) {
          try {
            const parsedUser = JSON.parse(e.newValue)
            setUser(parsedUser)
          } catch (error) {
            setUser(null)
          }
        } else {
          setUser(null)
        }
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange)
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('storage', handleStorageChange)
      }
    }
  }, [])

  // Load language preference from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
  const savedLanguage = localStorage.getItem('leviathan-language') as LanguageCode
      if (savedLanguage && translations[savedLanguage]) {
        setLanguage(savedLanguage)
      }
    }
  }, [])

  // Save language preference to localStorage
  const handleSetLanguage = (lang: LanguageCode) => {
    setLanguage(lang)
    if (typeof window !== 'undefined') {
  localStorage.setItem('leviathan-language', lang)
    }
  }

  // Translation function
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[LanguageCode]] || key
  }

  const value = {
    user,
    loading,
    language,
    setLanguage: handleSetLanguage,
    t,
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}
