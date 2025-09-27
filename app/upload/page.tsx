'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Upload as UploadIcon, FileText, BarChart3, MapPin, Clock } from 'lucide-react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import FileUpload from '@/components/FileUpload'
import { useApp } from '@/app/providers'
import { supabase } from '@/lib/supabase'

export default function UploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([])
  const [recentDatasets, setRecentDatasets] = useState<any[]>([])
  const { user, t, loading } = useApp()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      // Fetch recent datasets
      fetchRecentDatasets()
    }
  }, [user, loading, router])

  const fetchRecentDatasets = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('datasets')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5)

      if (error) {
        console.error('Error fetching datasets:', error)
      } else {
        setRecentDatasets(data || [])
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleUploadComplete = (files: any[]) => {
    setUploadedFiles(files)
    fetchRecentDatasets() // Refresh the list
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-indian-green bg-indian-green/10'
      case 'processing':
        return 'text-deep-saffron bg-deep-saffron/10'
      case 'uploaded':
        return 'text-navy-blue bg-navy-blue/10'
      case 'failed':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="min-h-screen bg-crisp-white">
      <Navigation />
      
      {/* Add top padding to account for fixed header */}
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link 
            href="/"
            className="inline-flex items-center space-x-2 text-charcoal-gray hover:text-navy-blue transition-colors duration-200 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-navy-blue to-deep-saffron rounded-xl flex items-center justify-center">
              <UploadIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-charcoal-gray">
                {t('upload')} Dataset
              </h1>
              <p className="text-gray-600">
                Upload your eDNA data for AI-powered biodiversity analysis
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <FileUpload onUploadComplete={handleUploadComplete} />
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Upload Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-charcoal-gray mb-4">
                Upload Statistics
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-navy-blue/10 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-navy-blue" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Total Datasets</div>
                      <div className="text-xl font-semibold text-charcoal-gray">
                        {recentDatasets.length}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-indian-green/10 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-indian-green" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Processed</div>
                      <div className="text-xl font-semibold text-charcoal-gray">
                        {recentDatasets.filter(d => d.status === 'completed').length}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-deep-saffron/10 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-deep-saffron" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Processing</div>
                      <div className="text-xl font-semibold text-charcoal-gray">
                        {recentDatasets.filter(d => d.status === 'processing').length}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Datasets */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-charcoal-gray mb-4">
                Recent Datasets
              </h3>
              
              {recentDatasets.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-sm">No datasets uploaded yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentDatasets.map((dataset) => (
                    <motion.div
                      key={dataset.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow duration-200"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-sm font-medium text-charcoal-gray truncate flex-1">
                          {dataset.name}
                        </h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(dataset.status)}`}>
                          {dataset.status}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{formatFileSize(dataset.file_size)}</span>
                        <span>{formatDate(dataset.created_at)}</span>
                      </div>
                      
                      {dataset.status === 'completed' && (
                        <button
                          onClick={() => router.push('/dashboard')}
                          className="mt-2 w-full text-xs bg-navy-blue text-white py-1 px-3 rounded-lg hover:bg-deep-saffron transition-colors duration-200"
                        >
                          View Analysis
                        </button>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-navy-blue to-deep-saffron rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => router.push('/dashboard')}
                  className="w-full bg-white/20 backdrop-blur-sm text-white py-2 px-4 rounded-lg hover:bg-white/30 transition-colors duration-200 text-sm font-medium"
                >
                  View Dashboard
                </button>
                <button
                  onClick={() => router.push('/learning')}
                  className="w-full bg-white/20 backdrop-blur-sm text-white py-2 px-4 rounded-lg hover:bg-white/30 transition-colors duration-200 text-sm font-medium"
                >
                  Learn About eDNA
                </button>
                <button
                  onClick={() => router.push('/policy')}
                  className="w-full bg-white/20 backdrop-blur-sm text-white py-2 px-4 rounded-lg hover:bg-white/30 transition-colors duration-200 text-sm font-medium"
                >
                  Policy Reports
                </button>
              </div>
            </div>
          </motion.div>
        </div>
        </div>
      </div>
    </div>
  )
}
