'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, 
  X, 
  Upload, 
  BarChart3, 
  Shield, 
  BookOpen, 
  Leaf, 
  Settings, 
  Info, 
  Phone,
  LogIn,
  LogOut,
  User,
  Globe
} from 'lucide-react'
import { useApp } from '@/app/providers'
import { supabase, mockAuth } from '@/lib/supabase'
import { languages, LanguageCode } from '@/lib/i18n'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, language, setLanguage, t } = useApp()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSignOut = async () => {
    try {
      await mockAuth.signOut()
      if (typeof window !== 'undefined') {
        localStorage.removeItem('demo-user')
      }
      router.push('/')
    } catch (error) {
      console.error('Sign out error:', error)
      if (typeof window !== 'undefined') {
        localStorage.removeItem('demo-user')
      }
      router.push('/')
    }
  }

  const Home = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  )

  const navigationItems = [
    { href: '/', label: t('home'), icon: Home },
    { href: '/upload', label: t('upload'), icon: Upload },
    { href: '/dashboard', label: t('dashboard'), icon: BarChart3 },
    { href: '/policy', label: t('policy'), icon: Shield },
    { href: '/learning', label: t('learning'), icon: BookOpen },
    { href: '/conservation', label: t('conservation'), icon: Leaf },
    { href: '/about', label: t('about'), icon: Info },
    { href: '/contact', label: t('contact'), icon: Phone },
  ]

  if (user?.role === 'admin') {
    navigationItems.push({ href: '/admin', label: t('admin'), icon: Settings })
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/90 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="flex justify-between items-center h-20">
    <div className="flex items-center space-x-8">
      {/* Logo and Name act as Home, aligned to left corner with gap */}
      <Link href="/" className="flex items-center mr-10">
        <img src="/leviathan.jpg" alt="Leviathan Logo" className="w-10 h-10 rounded-lg object-contain mr-3" />
        <span className="font-bold text-xl text-charcoal-gray">Leviathan</span>
      </Link>
    </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.slice(0, 6).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-1 text-charcoal-gray hover:text-navy-blue transition-colors duration-200"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-charcoal-gray hover:text-navy-blue transition-colors duration-200">
                <Globe className="w-4 h-4" />
                <span className="text-sm">{language.toUpperCase()}</span>
              </button>
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as LanguageCode)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-200 ${
                      language === lang.code ? 'bg-navy-blue text-white' : 'text-charcoal-gray'
                    }`}
                  >
                    {lang.nativeName}
                  </button>
                ))}
              </div>
            </div>

            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-charcoal-gray">
                  {user.full_name || user.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-1 text-charcoal-gray hover:text-deep-saffron transition-colors duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">{t('signOut')}</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/auth/signin"
                  className="flex items-center space-x-1 text-charcoal-gray hover:text-navy-blue transition-colors duration-200"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="text-sm">{t('signIn')}</span>
                </Link>
                <Link
                  href="/auth/signup"
                  className="btn-primary text-sm"
                >
                  {t('signUp')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-charcoal-gray hover:text-navy-blue hover:bg-gray-100 transition-colors duration-200"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-200 shadow-lg"
          >
            <div className="px-4 py-4 space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 px-3 py-2 text-charcoal-gray hover:text-navy-blue hover:bg-gray-50 rounded-lg transition-colors duration-200"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
              
              {/* Mobile Auth Section */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                {user ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 px-3 py-2">
                      <User className="w-5 h-5 text-charcoal-gray" />
                      <span className="text-charcoal-gray">
                        {user.full_name || user.email}
                      </span>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center space-x-3 px-3 py-2 text-charcoal-gray hover:text-deep-saffron hover:bg-gray-50 rounded-lg transition-colors duration-200 w-full"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>{t('signOut')}</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      href="/auth/signin"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 px-3 py-2 text-charcoal-gray hover:text-navy-blue hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    >
                      <LogIn className="w-5 h-5" />
                      <span>{t('signIn')}</span>
                    </Link>
                    <Link
                      href="/auth/signup"
                      onClick={() => setIsOpen(false)}
                      className="btn-primary w-full text-center"
                    >
                      {t('signUp')}
                    </Link>
                  </div>
                )}
                
                {/* Mobile Language Switcher */}
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex items-center space-x-3 px-3 py-2 mb-2">
                    <Globe className="w-5 h-5 text-charcoal-gray" />
                    <span className="text-charcoal-gray">Language</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code as LanguageCode)}
                        className={`px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${
                          language === lang.code 
                            ? 'bg-navy-blue text-white' 
                            : 'bg-gray-100 text-charcoal-gray hover:bg-gray-200'
                        }`}
                      >
                        {lang.nativeName}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
