'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Play, 
  Download, 
  Users, 
  Award, 
  Clock, 
  ChevronRight,
  Globe,
  Microscope,
  Fish,
  Waves,
  TreePine
} from 'lucide-react'
import Navigation from '@/components/Navigation'
import { useApp } from '@/app/providers'

interface LearningModule {
  id: string
  title: string
  description: string
  duration: string
  level: 'beginner' | 'intermediate' | 'advanced'
  category: 'basics' | 'analysis' | 'conservation' | 'research'
  icon: any
  lessons: number
  completed: boolean
  progress: number
}

interface CaseStudy {
  id: string
  title: string
  description: string
  location: string
  species: string
  image: string
  results: string[]
  learnings: string[]
}

export default function LearningPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'hi' | 'ml'>('en')
  const { t, language, setLanguage } = useApp()

  const learningModules: LearningModule[] = [
    {
      id: '1',
      title: 'Introduction to eDNA',
      description: 'Learn the fundamentals of environmental DNA and its applications in marine biology',
      duration: '45 min',
      level: 'beginner',
      category: 'basics',
      icon: Microscope,
      lessons: 6,
      completed: true,
      progress: 100
    },
    {
      id: '2',
      title: 'DNA Extraction Techniques',
      description: 'Master the various methods of extracting DNA from environmental samples',
      duration: '60 min',
      level: 'intermediate',
      category: 'analysis',
      icon: Microscope,
      lessons: 8,
      completed: false,
      progress: 65
    },
    {
      id: '3',
      title: 'Marine Biodiversity Assessment',
      description: 'Understand how to assess and monitor marine biodiversity using eDNA data',
      duration: '75 min',
      level: 'intermediate',
      category: 'conservation',
      icon: Fish,
      lessons: 10,
      completed: false,
      progress: 30
    },
    {
      id: '4',
      title: 'Data Analysis & Visualization',
      description: 'Learn to analyze eDNA data and create meaningful visualizations',
      duration: '90 min',
      level: 'advanced',
      category: 'analysis',
      icon: Globe,
      lessons: 12,
      completed: false,
      progress: 0
    },
    {
      id: '5',
      title: 'Conservation Strategies',
      description: 'Explore conservation strategies based on eDNA biodiversity findings',
      duration: '50 min',
      level: 'intermediate',
      category: 'conservation',
      icon: TreePine,
      lessons: 7,
      completed: false,
      progress: 0
    },
    {
      id: '6',
      title: 'Research Methodology',
      description: 'Advanced research methods and experimental design for eDNA studies',
      duration: '120 min',
      level: 'advanced',
      category: 'research',
      icon: BookOpen,
      lessons: 15,
      completed: false,
      progress: 0
    }
  ]

  const caseStudies: CaseStudy[] = [
    {
      id: '1',
      title: 'Coral Reef Restoration in Goa',
      description: 'How eDNA analysis helped identify the best locations for coral reef restoration',
      location: 'Goa Marine Sanctuary',
      species: '45 coral species, 120 fish species',
      image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      results: [
        'Identified 3 optimal restoration sites',
        'Discovered 12 previously unknown coral species',
        'Increased coral coverage by 35% in 2 years'
      ],
      learnings: [
        'eDNA can detect species not visible to divers',
        'Historical DNA traces help understand past ecosystems',
        'Community involvement is crucial for success'
      ]
    },
    {
      id: '2',
      title: 'Endangered Species Monitoring in Kerala',
      description: 'Using eDNA to monitor critically endangered marine species populations',
      location: 'Kerala Backwaters',
      species: '8 endangered species monitored',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      results: [
        'Confirmed presence of 3 critically endangered species',
        'Identified new breeding grounds',
        'Improved conservation planning'
      ],
      learnings: [
        'Non-invasive monitoring is more effective',
        'Early detection prevents population collapse',
        'Data sharing improves conservation outcomes'
      ]
    }
  ]

  const categories = [
    { id: 'all', label: 'All Modules', icon: BookOpen },
    { id: 'basics', label: 'Basics', icon: Microscope },
    { id: 'analysis', label: 'Analysis', icon: Globe },
    { id: 'conservation', label: 'Conservation', icon: TreePine },
    { id: 'research', label: 'Research', icon: BookOpen }
  ]

  const filteredModules = selectedCategory === 'all' 
    ? learningModules 
    : learningModules.filter(module => module.category === selectedCategory)

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'text-green-600 bg-green-100'
      case 'intermediate': return 'text-yellow-600 bg-yellow-100'
      case 'advanced': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress === 100) return 'bg-indian-green'
    if (progress >= 50) return 'bg-deep-saffron'
    if (progress > 0) return 'bg-navy-blue'
    return 'bg-gray-300'
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
              <BookOpen className="w-6 h-6 text-white" />
            </div>
        <div className="flex justify-center mb-6">
          <img src="/leviathan.jpg" alt="Leviathan Logo" className="w-16 h-16 rounded-lg" />
        </div>
            <div>
              <h1 className="text-3xl font-bold text-charcoal-gray">
                Learning & Education
              </h1>
              <p className="text-gray-600">
                Master eDNA biodiversity analysis through interactive modules and case studies
              </p>
            </div>
          </div>
          
          {/* Language Switcher */}
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-sm font-medium text-charcoal-gray">Language:</span>
            <div className="flex space-x-2">
              {[
                { code: 'en', name: 'English' },
                { code: 'hi', name: 'हिन्दी' },
                { code: 'ml', name: 'മലയാളം' }
              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as 'en' | 'hi' | 'ml')}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    language === lang.code
                      ? 'bg-navy-blue text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Learning Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {[
            { label: 'Modules Completed', value: learningModules.filter(m => m.completed).length, total: learningModules.length, icon: Award, color: 'from-indian-green to-navy-blue' },
            { label: 'Lessons Learned', value: 24, total: 58, icon: BookOpen, color: 'from-navy-blue to-deep-saffron' },
            { label: 'Study Hours', value: '12.5', icon: Clock, color: 'from-deep-saffron to-indian-green' },
            { label: 'Certificates', value: 2, icon: Award, color: 'from-navy-blue to-deep-saffron' }
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
                {stat.total && (
                  <span className="text-sm text-gray-500">
                    {stat.value}/{stat.total}
                  </span>
                )}
              </div>
              <div>
                <div className="text-2xl font-bold text-charcoal-gray mb-1">
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
            className="lg:col-span-3 space-y-8"
          >
            {/* Category Filter */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-charcoal-gray mb-4">
                Learning Modules
              </h2>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-navy-blue text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <category.icon className="w-4 h-4" />
                    <span>{category.label}</span>
                  </button>
                ))}
              </div>

              {/* Learning Modules Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredModules.map((module, index) => (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-navy-blue to-deep-saffron rounded-xl flex items-center justify-center">
                          <module.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-charcoal-gray">
                            {module.title}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(module.level)}`}>
                              {module.level}
                            </span>
                            <span className="text-xs text-gray-500">{module.duration}</span>
                          </div>
                        </div>
                      </div>
                      
                      {module.completed && (
                        <div className="w-6 h-6 bg-indian-green rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">
                      {module.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">{module.lessons} lessons</span>
                        <span className="text-gray-500">{module.progress}% complete</span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(module.progress)}`}
                          style={{ width: `${module.progress}%` }}
                        />
                      </div>
                      
                      <button className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-navy-blue text-white rounded-lg hover:bg-deep-saffron transition-colors duration-200">
                        {module.completed ? (
                          <>
                            <Play className="w-4 h-4" />
                            <span>Review</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4" />
                            <span>Start Learning</span>
                          </>
                        )}
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Case Studies */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-charcoal-gray mb-6">
                Case Studies
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {caseStudies.map((study, index) => (
                  <motion.div
                    key={study.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <div 
                      className="h-48 bg-cover bg-center"
                      style={{ backgroundImage: `url(${study.image})` }}
                    />
                    
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-charcoal-gray">
                          {study.title}
                        </h3>
                        <span className="text-xs text-gray-500">{study.location}</span>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4">
                        {study.description}
                      </p>
                      
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-medium text-charcoal-gray mb-2">Key Results:</h4>
                          <ul className="space-y-1">
                            {study.results.slice(0, 2).map((result, i) => (
                              <li key={i} className="flex items-start space-x-2 text-xs text-gray-600">
                                <span className="text-indian-green mt-1">•</span>
                                <span>{result}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <button className="w-full py-2 px-4 border border-navy-blue text-navy-blue rounded-lg hover:bg-navy-blue hover:text-white transition-colors duration-200 text-sm font-medium">
                          View Full Case Study
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
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-6"
          >
            {/* Progress Overview */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-charcoal-gray mb-4">
                Learning Progress
              </h3>
              <div className="space-y-4">
                {learningModules.slice(0, 4).map((module) => (
                  <div key={module.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-charcoal-gray truncate">
                        {module.title}
                      </span>
                      <span className="text-xs text-gray-500">{module.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full transition-all duration-300 ${getProgressColor(module.progress)}`}
                        style={{ width: `${module.progress}%` }}
                      />
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
                  <Download className="w-4 h-4" />
                  <span>Download Resources</span>
                </button>
                <button className="w-full bg-white/20 backdrop-blur-sm text-white py-3 px-4 rounded-lg hover:bg-white/30 transition-colors duration-200 text-sm font-medium flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>Join Community</span>
                </button>
                <button className="w-full bg-white/20 backdrop-blur-sm text-white py-3 px-4 rounded-lg hover:bg-white/30 transition-colors duration-200 text-sm font-medium flex items-center space-x-2">
                  <Award className="w-4 h-4" />
                  <span>View Certificates</span>
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
                  { action: 'Completed module', item: 'Introduction to eDNA', time: '2 hours ago' },
                  { action: 'Started lesson', item: 'DNA Extraction Techniques', time: '1 day ago' },
                  { action: 'Downloaded resource', item: 'eDNA Analysis Guide', time: '3 days ago' }
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
