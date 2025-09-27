'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Eye, EyeOff, UserPlus, ArrowLeft, Users, GraduationCap, Shield, Globe, Settings } from 'lucide-react'
import { supabase, mockAuth } from '@/lib/supabase'
import { useApp } from '@/app/providers'
import OceanWave from '@/components/OceanWave'
import toast from 'react-hot-toast'
import { UserRole } from '@/types'

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    organization: '',
    role: '' as UserRole['value']
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { t } = useApp()

  const userRoles: UserRole[] = [
    {
      value: 'researcher',
      label: t('researcher'),
      description: 'Conduct biodiversity research and analysis',
      icon: 'Users'
    },
    {
      value: 'student',
      label: t('student'),
      description: 'Learn about eDNA and biodiversity',
      icon: 'GraduationCap'
    },
    {
      value: 'policymaker',
      label: t('policymaker'),
      description: 'Access policy insights and reports',
      icon: 'Shield'
    },
    {
      value: 'public',
      label: t('public'),
      description: 'Explore biodiversity discoveries',
      icon: 'Globe'
    },
    {
      value: 'admin',
      label: t('admin'),
      description: 'Manage platform and users',
      icon: 'Settings'
    }
  ]

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users': return <Users className="w-6 h-6" />
      case 'GraduationCap': return <GraduationCap className="w-6 h-6" />
      case 'Shield': return <Shield className="w-6 h-6" />
      case 'Globe': return <Globe className="w-6 h-6" />
      case 'Settings': return <Settings className="w-6 h-6" />
      default: return <Users className="w-6 h-6" />
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleRoleSelect = (role: string) => {
    setFormData({
      ...formData,
      role
    })
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (!formData.role) {
      toast.error('Please select a role')
      return
    }

    setLoading(true)

    try {
      // Use mock authentication for demo
      const { data, error } = await mockAuth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            organization: formData.organization,
            role: formData.role,
          }
        }
      })

      if (error) {
        toast.error((error as { message?: string }).message || 'An error occurred')
      } else if (data.user) {
        // Store user data in localStorage for demo
        if (typeof window !== 'undefined') {
          localStorage.setItem('demo-user', JSON.stringify({
            id: data.user.id,
            email: data.user.email,
            role: data.user.user_metadata.role,
            full_name: data.user.user_metadata.full_name,
            organization: data.user.user_metadata.organization
          }))
        }
        
        toast.success('Account created successfully! You are now signed in.')
        router.push('/dashboard')
      }
    } catch (error) {
      toast.error('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <OceanWave className="opacity-30" />
      
      {/* Background marine images */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
          }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl w-full space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Link 
              href="/"
              className="inline-flex items-center space-x-2 text-charcoal-gray hover:text-navy-blue transition-colors duration-200 mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-navy-blue to-deep-saffron rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">L</span>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-charcoal-gray mb-2">
              Join Leviathan
            </h2>
            <p className="text-gray-600">
              Create your account to start exploring marine biodiversity
            </p>
          </motion.div>

          {/* Sign Up Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20"
          >
            <form className="space-y-6" onSubmit={handleSignUp}>
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-charcoal-gray mb-2">
                    {t('fullName')}
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-blue focus:border-transparent transition-all duration-200"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-charcoal-gray mb-2">
                    {t('organization')}
                  </label>
                  <input
                    id="organization"
                    name="organization"
                    type="text"
                    value={formData.organization}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-blue focus:border-transparent transition-all duration-200"
                    placeholder="Enter your organization"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-charcoal-gray mb-2">
                  {t('email')}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-blue focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-charcoal-gray mb-2">
                    {t('password')}
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-blue focus:border-transparent transition-all duration-200"
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-charcoal-gray transition-colors duration-200"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-charcoal-gray mb-2">
                    {t('confirmPassword')}
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-blue focus:border-transparent transition-all duration-200"
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-charcoal-gray transition-colors duration-200"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-charcoal-gray mb-4">
                  {t('selectRole')}
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userRoles.map((role) => (
                    <motion.button
                      key={role.value}
                      type="button"
                      onClick={() => handleRoleSelect(role.value)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                        formData.role === role.value
                          ? 'border-navy-blue bg-navy-blue/5 shadow-md'
                          : 'border-gray-200 hover:border-navy-blue/50 hover:shadow-sm'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`p-2 rounded-lg ${
                          formData.role === role.value
                            ? 'bg-navy-blue text-white'
                            : 'bg-gray-100 text-charcoal-gray'
                        }`}>
                          {getIcon(role.icon)}
                        </div>
                        <h3 className="font-semibold text-charcoal-gray">
                          {role.label}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600">
                        {role.description}
                      </p>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-navy-blue focus:ring-navy-blue border-gray-300 rounded mt-1"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-charcoal-gray">
                  I agree to the{' '}
                  <a href="#" className="text-navy-blue hover:text-deep-saffron transition-colors duration-200">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-navy-blue hover:text-deep-saffron transition-colors duration-200">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="spinner" />
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    <span>{t('signUp')}</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-charcoal-gray">
                Already have an account?{' '}
                <Link 
                  href="/auth/signin" 
                  className="font-medium text-navy-blue hover:text-deep-saffron transition-colors duration-200"
                >
                  {t('signIn')}
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
