'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Upload, BarChart3, Shield, BookOpen, Leaf, ArrowRight, Play, Users, Award, Globe } from 'lucide-react'
import Navigation from '@/components/Navigation'
import OceanWave from '@/components/OceanWave'
import { useApp } from '@/app/providers'

export default function HomePage() {
  const { t } = useApp()

  const features = [
    {
      icon: Upload,
      title: 'Dataset Upload',
      description: 'Upload CSV, FASTA, and FASTQ files for analysis',
      href: '/upload',
      color: 'from-navy-blue to-deep-saffron'
    },
    {
      icon: BarChart3,
      title: 'AI Analysis',
      description: 'Advanced eDNA analysis with machine learning',
      href: '/dashboard',
      color: 'from-deep-saffron to-indian-green'
    },
    {
      icon: Shield,
      title: 'Policy Insights',
      description: 'Biodiversity reports for policymakers',
      href: '/policy',
      color: 'from-indian-green to-navy-blue'
    },
    {
      icon: BookOpen,
      title: 'Education',
      description: 'Learn about marine biodiversity',
      href: '/learning',
      color: 'from-navy-blue to-deep-saffron'
    }
  ]

  const stats = [
    { label: 'Species Identified', value: '10,000+', icon: Leaf },
    { label: 'Active Researchers', value: '500+', icon: Users },
    { label: 'Countries Covered', value: '50+', icon: Globe },
    { label: 'Accuracy Rate', value: '95%', icon: Award }
  ]

  return (
    <div className="min-h-screen bg-crisp-white">
      <Navigation />
      
      {/* Add top padding to account for fixed header */}
      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <OceanWave className="opacity-40" />
        
        {/* Background marine images */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
            }}
          />
          
          {/* Floating marine life */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute opacity-30"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 4) * 20}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 6 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.8,
              }}
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${
                i % 3 === 0 ? 'from-navy-blue to-deep-saffron' :
                i % 3 === 1 ? 'from-deep-saffron to-indian-green' :
                'from-indian-green to-navy-blue'
              }`} />
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h1 
                className="text-5xl md:text-7xl font-bold text-charcoal-gray"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="gradient-text">Leviathan</span>
              </motion.h1>
              
              <motion.h2 
                className="text-2xl md:text-4xl font-semibold text-charcoal-gray max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {t('welcomeTitle')}
              </motion.h2>
              
              <motion.p 
                className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {t('welcomeSubtitle')}
              </motion.p>
            </div>

            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Link href="/upload" className="btn-primary text-lg px-8 py-4 flex items-center space-x-2">
                <Upload className="w-6 h-6" />
                <span>{t('uploadDataset')}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link href="/dashboard" className="btn-secondary text-lg px-8 py-4 flex items-center space-x-2">
                <Play className="w-6 h-6" />
                <span>{t('getStarted')}</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-navy-blue rounded-full flex justify-center">
            <div className="w-1 h-3 bg-navy-blue rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-navy-blue/5 to-deep-saffron/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-navy-blue to-deep-saffron rounded-2xl mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-charcoal-gray mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-charcoal-gray mb-4">
              Powerful Features for Biodiversity Research
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform provides everything you need for advanced eDNA analysis and biodiversity monitoring
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Link href={feature.href}>
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 h-full">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-charcoal-gray mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {feature.description}
                    </p>
                    <div className="flex items-center text-navy-blue group-hover:text-deep-saffron transition-colors duration-300">
                      <span className="font-medium">Learn More</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-navy-blue to-deep-saffron">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-white">
              Ready to Discover Marine Biodiversity?
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Join thousands of researchers, students, and conservationists in uncovering the secrets of marine ecosystems
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link 
                href="/auth/signup" 
                className="bg-white text-navy-blue px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center space-x-2"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/about" 
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-navy-blue transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal-gray text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src="/leviathan-logo.png" alt="Leviathan Logo" className="w-10 h-10 rounded-lg" />
                <span className="text-xl font-bold">Leviathan</span>
              </div>
              <p className="text-gray-400">
                AI-powered eDNA biodiversity analysis for marine ecosystem conservation.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/upload" className="hover:text-white transition-colors">Upload Data</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link href="/learning" className="hover:text-white transition-colors">Education</Link></li>
                <li><Link href="/conservation" className="hover:text-white transition-colors">Conservation</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/policy" className="hover:text-white transition-colors">Policy Reports</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Documentation</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Community</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">API Docs</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Status</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Leviathan. All rights reserved. Built for SIH 2025.</p>
          </div>
        </div>
      </footer>
      </div>
    </div>
  )
}
