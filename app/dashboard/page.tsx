'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  Upload, 
  Download, 
  RefreshCw, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  MapPin,
  Calendar,
  Filter,
  Settings
} from 'lucide-react'
import Navigation from '@/components/Navigation'
import Charts from '@/components/Charts'
import BiodiversityMap from '@/components/BiodiversityMap'
import { useApp } from '@/app/providers'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

interface DashboardStats {
  totalSpecies: number
  diversityIndex: number
  datasetsProcessed: number
  alertsCount: number
}

interface ConservationAlert {
  id: string
  title: string
  description: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  location: string
  timestamp: string
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalSpecies: 0,
    diversityIndex: 0,
    datasetsProcessed: 0,
    alertsCount: 0
  })
  const [alerts, setAlerts] = useState<ConservationAlert[]>([])
  const [dashboardLoading, setDashboardLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const { user, t, loading } = useApp()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      fetchDashboardData()
    }
  }, [user, loading, router])

  const fetchDashboardData = async () => {
  setDashboardLoading(true)
    try {
      // Fetch user's datasets
      const { data: datasets, error: datasetsError } = await supabase
        .from('datasets')
        .select('*')
        .eq('user_id', user?.id)

      if (datasetsError) {
        console.error('Error fetching datasets:', datasetsError)
      }

      // Mock data for demonstration
      const mockStats: DashboardStats = {
        totalSpecies: 1247,
        diversityIndex: 94,
        datasetsProcessed: datasets?.length || 3,
        alertsCount: 2
      }

      const mockAlerts: ConservationAlert[] = [
        {
          id: '1',
          title: 'Declining Coral Reef Health',
          description: 'Coral bleaching detected in 3 sampling locations. Immediate conservation action recommended.',
          severity: 'critical',
          location: 'Goa Marine Sanctuary',
          timestamp: '2025-01-15T10:30:00Z'
        },
        {
          id: '2',
          title: 'New Species Discovery',
          description: 'Previously unknown species of marine fish identified in Kerala coastal waters.',
          severity: 'low',
          location: 'Kerala Coast',
          timestamp: '2025-01-14T15:45:00Z'
        }
      ]

      setStats(mockStats)
      setAlerts(mockAlerts)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      toast.error('Failed to load dashboard data')
    } finally {
      setDashboardLoading(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchDashboardData()
    setRefreshing(false)
    toast.success('Dashboard refreshed')
  }

  const getAlertIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-red-600" />
      case 'high':
        return <AlertTriangle className="w-5 h-5 text-orange-600" />
      case 'medium':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      case 'low':
        return <AlertTriangle className="w-5 h-5 text-blue-600" />
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-600" />
    }
  }

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'border-red-500 bg-red-50'
      case 'high':
        return 'border-orange-500 bg-orange-50'
      case 'medium':
        return 'border-yellow-500 bg-yellow-50'
      case 'low':
        return 'border-blue-500 bg-blue-50'
      default:
        return 'border-gray-500 bg-gray-50'
    }
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-crisp-white flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-charcoal-gray">Loading dashboard...</p>
        </div>
      </div>
    )
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
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-navy-blue to-deep-saffron rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-charcoal-gray">
                  Biodiversity Dashboard
                </h1>
                <p className="text-gray-600">
                  AI-powered analysis of your eDNA datasets
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-navy-blue transition-colors duration-200 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2 bg-navy-blue text-white rounded-lg hover:bg-deep-saffron transition-colors duration-200">
                <Upload className="w-4 h-4" />
                <span>Upload Data</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {[
            { 
              label: 'Total Species', 
              value: stats.totalSpecies.toLocaleString(), 
              icon: Users, 
              color: 'from-navy-blue to-deep-saffron',
              change: '+12%'
            },
            { 
              label: 'Diversity Index', 
              value: `${stats.diversityIndex}%`, 
              icon: TrendingUp, 
              color: 'from-indian-green to-navy-blue',
              change: '+3%'
            },
            { 
              label: 'Datasets Processed', 
              value: stats.datasetsProcessed.toString(), 
              icon: BarChart3, 
              color: 'from-deep-saffron to-indian-green',
              change: '+1'
            },
            { 
              label: 'Active Alerts', 
              value: stats.alertsCount.toString(), 
              icon: AlertTriangle, 
              color: 'from-red-500 to-orange-500',
              change: '-1'
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-sm font-medium ${
                  stat.change.startsWith('+') ? 'text-indian-green' : 
                  stat.change.startsWith('-') ? 'text-red-600' : 
                  'text-gray-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div>
                <div className="text-3xl font-bold text-charcoal-gray mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Charts Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Charts />
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-6"
          >
            {/* Conservation Alerts */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-charcoal-gray">
                  Conservation Alerts
                </h3>
                <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full">
                  {alerts.length}
                </span>
              </div>
              
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg border-l-4 ${getAlertColor(alert.severity)}`}
                  >
                    <div className="flex items-start space-x-3">
                      {getAlertIcon(alert.severity)}
                      <div className="flex-1">
                        <h4 className="font-medium text-charcoal-gray mb-1">
                          {alert.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {alert.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{alert.location}</span>
                          <span>{formatTimestamp(alert.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Biodiversity Map */}
            <BiodiversityMap />

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-navy-blue to-deep-saffron rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => router.push('/upload')}
                  className="w-full bg-white/20 backdrop-blur-sm text-white py-3 px-4 rounded-lg hover:bg-white/30 transition-colors duration-200 text-sm font-medium flex items-center space-x-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload New Dataset</span>
                </button>
                <button className="w-full bg-white/20 backdrop-blur-sm text-white py-3 px-4 rounded-lg hover:bg-white/30 transition-colors duration-200 text-sm font-medium flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Export Report</span>
                </button>
                <button className="w-full bg-white/20 backdrop-blur-sm text-white py-3 px-4 rounded-lg hover:bg-white/30 transition-colors duration-200 text-sm font-medium flex items-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span>Dashboard Settings</span>
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
