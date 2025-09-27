'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Download, 
  FileText, 
  TrendingUp, 
  AlertTriangle, 
  MapPin, 
  Calendar,
  Users,
  BarChart3,
  Eye,
  Printer
} from 'lucide-react'
import Navigation from '@/components/Navigation'
import { useApp } from '@/app/providers'
import jsPDF from 'jspdf'

interface PolicyReport {
  id: string
  title: string
  description: string
  category: 'biodiversity' | 'conservation' | 'climate' | 'research'
  priority: 'low' | 'medium' | 'high' | 'critical'
  status: 'draft' | 'review' | 'published'
  createdAt: string
  updatedAt: string
  data: {
    speciesCount: number
    diversityIndex: number
    threats: number
    recommendations: number
  }
}

interface BiodiversitySummary {
  totalSpecies: number
  endangeredSpecies: number
  newDiscoveries: number
  conservationStatus: string
  threats: string[]
  recommendations: string[]
}

export default function PolicyPage() {
  const [reports, setReports] = useState<PolicyReport[]>([])
  const [selectedReport, setSelectedReport] = useState<PolicyReport | null>(null)
  const [biodiversitySummary, setBiodiversitySummary] = useState<BiodiversitySummary>({
    totalSpecies: 1247,
    endangeredSpecies: 23,
    newDiscoveries: 8,
    conservationStatus: 'Moderate Concern',
    threats: [
      'Coral bleaching due to rising sea temperatures',
      'Overfishing in critical habitats',
      'Pollution from coastal development',
      'Invasive species introduction'
    ],
    recommendations: [
      'Implement marine protected areas in critical habitats',
      'Strengthen fishing regulations and monitoring',
      'Reduce coastal pollution through better waste management',
      'Establish early warning systems for coral bleaching'
    ]
  })
  const { t } = useApp()

  useEffect(() => {
    // Mock data for policy reports
    const mockReports: PolicyReport[] = [
      {
        id: '1',
        title: 'Marine Biodiversity Assessment 2025',
        description: 'Comprehensive analysis of marine biodiversity trends and conservation priorities',
        category: 'biodiversity',
        priority: 'high',
        status: 'published',
        createdAt: '2025-01-15',
        updatedAt: '2025-01-15',
        data: {
          speciesCount: 1247,
          diversityIndex: 94,
          threats: 4,
          recommendations: 8
        }
      },
      {
        id: '2',
        title: 'Climate Change Impact on Coral Reefs',
        description: 'Assessment of coral bleaching events and mitigation strategies',
        category: 'climate',
        priority: 'critical',
        status: 'review',
        createdAt: '2025-01-10',
        updatedAt: '2025-01-12',
        data: {
          speciesCount: 456,
          diversityIndex: 78,
          threats: 6,
          recommendations: 12
        }
      },
      {
        id: '3',
        title: 'Sustainable Fisheries Management',
        description: 'Policy recommendations for sustainable fishing practices',
        category: 'conservation',
        priority: 'high',
        status: 'published',
        createdAt: '2025-01-08',
        updatedAt: '2025-01-08',
        data: {
          speciesCount: 234,
          diversityIndex: 82,
          threats: 3,
          recommendations: 6
        }
      }
    ]
    setReports(mockReports)
  }, [])

  const exportToPDF = (report: PolicyReport) => {
    const doc = new jsPDF()
    
    // Title
    doc.setFontSize(20)
    doc.text(report.title, 20, 30)
    
    // Description
    doc.setFontSize(12)
    doc.text(report.description, 20, 50)
    
    // Data section
    doc.setFontSize(16)
    doc.text('Biodiversity Data', 20, 80)
    
    doc.setFontSize(12)
    doc.text(`Total Species: ${report.data.speciesCount}`, 20, 100)
    doc.text(`Diversity Index: ${report.data.diversityIndex}%`, 20, 110)
    doc.text(`Threats Identified: ${report.data.threats}`, 20, 120)
    doc.text(`Recommendations: ${report.data.recommendations}`, 20, 130)
    
    // Footer
    doc.setFontSize(10)
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, 20, 280)
    
    doc.save(`${report.title.replace(/\s+/g, '_')}.pdf`)
  }

  const exportToCSV = () => {
    const csvContent = [
      ['Report Title', 'Category', 'Priority', 'Species Count', 'Diversity Index', 'Status'],
      ...reports.map(report => [
        report.title,
        report.category,
        report.priority,
        report.data.speciesCount.toString(),
        report.data.diversityIndex.toString(),
        report.status
      ])
    ].map(row => row.join(',')).join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'biodiversity_reports.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-100'
      case 'high': return 'text-orange-600 bg-orange-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'biodiversity': return <BarChart3 className="w-5 h-5" />
      case 'conservation': return <Shield className="w-5 h-5" />
      case 'climate': return <TrendingUp className="w-5 h-5" />
      case 'research': return <FileText className="w-5 h-5" />
      default: return <FileText className="w-5 h-5" />
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
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-navy-blue to-deep-saffron rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
        <div className="flex justify-center mb-6">
          <img src="/leviathan.jpg" alt="Leviathan Logo" className="w-16 h-16 rounded-lg" />
        </div>
            <div>
              <h1 className="text-3xl font-bold text-charcoal-gray">
                Policy & Governance
              </h1>
              <p className="text-gray-600">
                Biodiversity insights for policymakers and stakeholders
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={exportToCSV}
                className="flex items-center space-x-2 px-4 py-2 bg-navy-blue text-white rounded-lg hover:bg-deep-saffron transition-colors duration-200"
              >
                <Download className="w-4 h-4" />
                <span>Export All CSV</span>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <Printer className="w-4 h-4" />
                <span>Print Summary</span>
              </button>
            </div>
            
            <div className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Biodiversity Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-charcoal-gray mb-6">
                Biodiversity Summary
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {[
                  { label: 'Total Species', value: biodiversitySummary.totalSpecies, icon: BarChart3, color: 'from-navy-blue to-deep-saffron' },
                  { label: 'Endangered Species', value: biodiversitySummary.endangeredSpecies, icon: AlertTriangle, color: 'from-red-500 to-orange-500' },
                  { label: 'New Discoveries', value: biodiversitySummary.newDiscoveries, icon: TrendingUp, color: 'from-indian-green to-navy-blue' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-3`}>
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-charcoal-gray mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-charcoal-gray">
                    Conservation Status
                  </h3>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                    {biodiversitySummary.conservationStatus}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-charcoal-gray mb-3">Key Threats</h4>
                    <ul className="space-y-2">
                      {biodiversitySummary.threats.map((threat, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                          <span className="text-red-500 mt-1">•</span>
                          <span>{threat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-charcoal-gray mb-3">Recommendations</h4>
                    <ul className="space-y-2">
                      {biodiversitySummary.recommendations.map((recommendation, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                          <span className="text-indian-green mt-1">•</span>
                          <span>{recommendation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Policy Reports */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-charcoal-gray mb-6">
                Policy Reports
              </h2>
              
              <div className="space-y-4">
                {reports.map((report, index) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          {getCategoryIcon(report.category)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-charcoal-gray">
                            {report.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {report.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(report.priority)}`}>
                          {report.priority}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                          {report.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <BarChart3 className="w-4 h-4" />
                          <span>{report.data.speciesCount} species</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedReport(report)}
                          className="flex items-center space-x-1 px-3 py-1 text-navy-blue hover:text-deep-saffron transition-colors duration-200"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View</span>
                        </button>
                        <button
                          onClick={() => exportToPDF(report)}
                          className="flex items-center space-x-1 px-3 py-1 text-navy-blue hover:text-deep-saffron transition-colors duration-200"
                        >
                          <Download className="w-4 h-4" />
                          <span>PDF</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-charcoal-gray mb-4">
                Quick Statistics
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Total Reports', value: reports.length },
                  { label: 'Published Reports', value: reports.filter(r => r.status === 'published').length },
                  { label: 'Critical Issues', value: reports.filter(r => r.priority === 'critical').length },
                  { label: 'Species Analyzed', value: reports.reduce((sum, r) => sum + r.data.speciesCount, 0) }
                ].map((stat, index) => (
                  <div key={stat.label} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{stat.label}</span>
                    <span className="text-sm font-semibold text-charcoal-gray">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Export Options */}
            <div className="bg-gradient-to-br from-navy-blue to-deep-saffron rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">
                Export Options
              </h3>
              <div className="space-y-3">
                <button
                  onClick={exportToCSV}
                  className="w-full bg-white/20 backdrop-blur-sm text-white py-3 px-4 rounded-lg hover:bg-white/30 transition-colors duration-200 text-sm font-medium flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Export CSV</span>
                </button>
                <button className="w-full bg-white/20 backdrop-blur-sm text-white py-3 px-4 rounded-lg hover:bg-white/30 transition-colors duration-200 text-sm font-medium flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Generate Report</span>
                </button>
                <button className="w-full bg-white/20 backdrop-blur-sm text-white py-3 px-4 rounded-lg hover:bg-white/30 transition-colors duration-200 text-sm font-medium flex items-center space-x-2">
                  <Printer className="w-4 h-4" />
                  <span>Print Summary</span>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-charcoal-gray mb-4">
                Recent Activity
              </h3>
              <div className="space-y-3">
                {[
                  { action: 'Report published', item: 'Marine Biodiversity Assessment 2025', time: '2 hours ago' },
                  { action: 'Data updated', item: 'Climate Change Impact Report', time: '1 day ago' },
                  { action: 'New analysis', item: 'Fisheries Management Policy', time: '3 days ago' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-navy-blue rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="text-sm text-charcoal-gray">
                        {activity.action}: <span className="font-medium">{activity.item}</span>
                      </div>
                      <div className="text-xs text-gray-500">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        </div>
      </div>
    </div>
  )
}
