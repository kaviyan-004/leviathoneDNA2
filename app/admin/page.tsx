'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Settings, 
  Users, 
  Database, 
  Activity, 
  Shield, 
  BarChart3, 
  Download,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  UserPlus,
  AlertTriangle,
  TrendingUp,
  Clock,
  Globe
} from 'lucide-react'
import Navigation from '@/components/Navigation'
import { useApp } from '@/app/providers'
import { supabase } from '@/lib/supabase'

interface AdminUser {
  id: string
  email: string
  full_name?: string
  role: 'researcher' | 'student' | 'policymaker' | 'public' | 'admin'
  organization?: string
  created_at: string
  last_login?: string
  datasets_count: number
  status: 'active' | 'inactive' | 'suspended'
}

interface AdminStats {
  totalUsers: number
  activeUsers: number
  totalDatasets: number
  processedDatasets: number
  systemHealth: 'excellent' | 'good' | 'warning' | 'critical'
  storageUsed: number
  apiCalls: number
}

export default function AdminPage() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    activeUsers: 0,
    totalDatasets: 0,
    processedDatasets: 0,
    systemHealth: 'excellent',
    storageUsed: 0,
    apiCalls: 0
  })
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null)
  const { user, t } = useApp()

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      window.location.href = '/'
      return
    }
    
    fetchAdminData()
  }, [user])

  const fetchAdminData = async () => {
    setLoading(true)
    try {
      // Mock data for demonstration
      const mockUsers: AdminUser[] = [
        {
          id: '1',
          email: 'dr.priya@marinebio.edu',
          full_name: 'Dr. Priya Sharma',
          role: 'researcher',
          organization: 'Marine Biology Institute',
          created_at: '2024-01-15T10:30:00Z',
          last_login: '2025-01-15T08:45:00Z',
          datasets_count: 12,
          status: 'active'
        },
        {
          id: '2',
          email: 'rajesh.kumar@oceanresearch.org',
          full_name: 'Dr. Rajesh Kumar',
          role: 'researcher',
          organization: 'Deep Ocean Research Center',
          created_at: '2024-02-20T14:20:00Z',
          last_login: '2025-01-14T16:30:00Z',
          datasets_count: 8,
          status: 'active'
        },
        {
          id: '3',
          email: 'student@university.edu',
          full_name: 'Ananya Patel',
          role: 'student',
          organization: 'University of Mumbai',
          created_at: '2024-03-10T09:15:00Z',
          last_login: '2025-01-13T20:15:00Z',
          datasets_count: 3,
          status: 'active'
        },
        {
          id: '4',
          email: 'policy@environment.gov',
          full_name: 'Ministry of Environment',
          role: 'policymaker',
          organization: 'Government of India',
          created_at: '2024-01-05T11:00:00Z',
          last_login: '2025-01-12T10:30:00Z',
          datasets_count: 0,
          status: 'active'
        }
      ]

      const mockStats: AdminStats = {
        totalUsers: 1247,
        activeUsers: 892,
        totalDatasets: 3456,
        processedDatasets: 2890,
        systemHealth: 'excellent',
        storageUsed: 2.4,
        apiCalls: 45678
      }

      setUsers(mockUsers)
      setStats(mockStats)
    } catch (error) {
      console.error('Error fetching admin data:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.organization?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'text-purple-600 bg-purple-100'
      case 'researcher': return 'text-blue-600 bg-blue-100'
      case 'student': return 'text-green-600 bg-green-100'
      case 'policymaker': return 'text-orange-600 bg-orange-100'
      case 'public': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100'
      case 'inactive': return 'text-yellow-600 bg-yellow-100'
      case 'suspended': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getSystemHealthColor = (health: string) => {
    switch (health) {
      case 'excellent': return 'text-green-600 bg-green-100'
      case 'good': return 'text-blue-600 bg-blue-100'
      case 'warning': return 'text-yellow-600 bg-yellow-100'
      case 'critical': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-crisp-white flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-charcoal-gray">Loading admin dashboard...</p>
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
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-navy-blue to-deep-saffron rounded-xl flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-charcoal-gray">
                Admin Dashboard
              </h1>
              <p className="text-gray-600">
                Manage users, datasets, and system settings
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-navy-blue text-white rounded-lg hover:bg-deep-saffron transition-colors duration-200">
                <UserPlus className="w-4 h-4" />
                <span>Add User</span>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <Download className="w-4 h-4" />
                <span>Export Data</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">System Status:</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSystemHealthColor(stats.systemHealth)}`}>
                {stats.systemHealth}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {[
            { 
              label: 'Total Users', 
              value: stats.totalUsers.toLocaleString(), 
              icon: Users, 
              color: 'from-navy-blue to-deep-saffron',
              change: '+12%'
            },
            { 
              label: 'Active Users', 
              value: stats.activeUsers.toLocaleString(), 
              icon: Activity, 
              color: 'from-indian-green to-navy-blue',
              change: '+8%'
            },
            { 
              label: 'Total Datasets', 
              value: stats.totalDatasets.toLocaleString(), 
              icon: Database, 
              color: 'from-deep-saffron to-indian-green',
              change: '+24%'
            },
            { 
              label: 'Storage Used (GB)', 
              value: stats.storageUsed.toFixed(1), 
              icon: Shield, 
              color: 'from-navy-blue to-deep-saffron',
              change: '+5%'
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
                <span className="text-sm font-medium text-indian-green">
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3"
          >
            {/* User Management */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-charcoal-gray">
                  User Management
                </h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-blue focus:border-transparent text-sm"
                    />
                  </div>
                  
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-navy-blue focus:border-transparent text-sm"
                  >
                    <option value="all">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="researcher">Researcher</option>
                    <option value="student">Student</option>
                    <option value="policymaker">Policymaker</option>
                    <option value="public">Public</option>
                  </select>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-charcoal-gray">User</th>
                      <th className="text-left py-3 px-4 font-medium text-charcoal-gray">Role</th>
                      <th className="text-left py-3 px-4 font-medium text-charcoal-gray">Organization</th>
                      <th className="text-left py-3 px-4 font-medium text-charcoal-gray">Datasets</th>
                      <th className="text-left py-3 px-4 font-medium text-charcoal-gray">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-charcoal-gray">Last Login</th>
                      <th className="text-left py-3 px-4 font-medium text-charcoal-gray">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user, index) => (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="py-4 px-4">
                          <div>
                            <div className="font-medium text-charcoal-gray">
                              {user.full_name || 'N/A'}
                            </div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600">
                          {user.organization || 'N/A'}
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-medium text-charcoal-gray">
                            {user.datasets_count}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600">
                          {user.last_login ? new Date(user.last_login).toLocaleDateString() : 'Never'}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setSelectedUser(user)}
                              className="p-1 text-gray-400 hover:text-navy-blue transition-colors duration-200"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-navy-blue transition-colors duration-200">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-200">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-6"
          >
            {/* System Health */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-charcoal-gray mb-4">
                System Health
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Overall Status</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSystemHealthColor(stats.systemHealth)}`}>
                    {stats.systemHealth}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">API Calls Today</span>
                    <span className="font-medium text-charcoal-gray">{stats.apiCalls.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Storage Usage</span>
                    <span className="font-medium text-charcoal-gray">{stats.storageUsed}GB</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Processed Datasets</span>
                    <span className="font-medium text-charcoal-gray">{stats.processedDatasets}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-charcoal-gray mb-4">
                Recent Activity
              </h3>
              
              <div className="space-y-3">
                {[
                  { action: 'New user registered', user: 'Dr. Priya Sharma', time: '2 hours ago' },
                  { action: 'Dataset uploaded', user: 'Rajesh Kumar', time: '4 hours ago' },
                  { action: 'System backup completed', user: 'System', time: '6 hours ago' },
                  { action: 'User suspended', user: 'spam@example.com', time: '1 day ago' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-navy-blue rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="text-sm text-charcoal-gray">
                        {activity.action}
                      </div>
                      <div className="text-xs text-gray-500">{activity.user}</div>
                      <div className="text-xs text-gray-400">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-navy-blue to-deep-saffron rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full bg-white/20 backdrop-blur-sm text-white py-3 px-4 rounded-lg hover:bg-white/30 transition-colors duration-200 text-sm font-medium flex items-center space-x-2">
                  <UserPlus className="w-4 h-4" />
                  <span>Add User</span>
                </button>
                <button className="w-full bg-white/20 backdrop-blur-sm text-white py-3 px-4 rounded-lg hover:bg-white/30 transition-colors duration-200 text-sm font-medium flex items-center space-x-2">
                  <Database className="w-4 h-4" />
                  <span>Backup Data</span>
                </button>
                <button className="w-full bg-white/20 backdrop-blur-sm text-white py-3 px-4 rounded-lg hover:bg-white/30 transition-colors duration-200 text-sm font-medium flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4" />
                  <span>View Analytics</span>
                </button>
                <button className="w-full bg-white/20 backdrop-blur-sm text-white py-3 px-4 rounded-lg hover:bg-white/30 transition-colors duration-200 text-sm font-medium flex items-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span>System Settings</span>
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
