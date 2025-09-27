'use client'

import { motion } from 'framer-motion'
import { 
  Info, 
  Users, 
  Target, 
  Award, 
  Globe, 
  Heart, 
  MessageSquare,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Github,
  ChevronRight,
  Star,
  CheckCircle
} from 'lucide-react'
import Navigation from '@/components/Navigation'
import { useApp } from '@/app/providers'

interface TeamMember {
  id: string
  name: string
  role: string
  expertise: string[]
  image: string
  bio: string
  linkedin?: string
  twitter?: string
  github?: string
}

interface ProjectGoal {
  id: string
  title: string
  description: string
  icon: any
  status: 'completed' | 'in_progress' | 'planned'
}

interface Achievement {
  id: string
  title: string
  description: string
  year: number
  category: 'research' | 'innovation' | 'impact' | 'recognition'
}

export default function AboutPage() {
  const { t } = useApp()

  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Dr. Priya Sharma',
      role: 'Lead Researcher & Project Director',
      expertise: ['Marine Biology', 'eDNA Analysis', 'Biodiversity Conservation'],
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      bio: 'Dr. Sharma has over 15 years of experience in marine biology and environmental DNA research. She has published 50+ papers and led numerous conservation projects.',
      linkedin: 'https://linkedin.com/in/drpriyasharma',
      twitter: '@DrPriyaSharma'
    },
    {
      id: '2',
      name: 'Rajesh Kumar',
      role: 'AI/ML Engineer',
      expertise: ['Machine Learning', 'Data Science', 'Bioinformatics'],
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      bio: 'Rajesh specializes in developing AI models for biodiversity analysis and has created several innovative algorithms for eDNA species identification.',
      linkedin: 'https://linkedin.com/in/rajeshkumar',
      github: 'https://github.com/rajeshkumar'
    },
    {
      id: '3',
      name: 'Ananya Patel',
      role: 'Frontend Developer',
      expertise: ['React', 'TypeScript', 'Data Visualization'],
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      bio: 'Ananya is passionate about creating intuitive user interfaces that make complex biodiversity data accessible to researchers and policymakers.',
      linkedin: 'https://linkedin.com/in/ananyapatel',
      github: 'https://github.com/ananyapatel'
    },
    {
      id: '4',
      name: 'Dr. Michael Chen',
      role: 'Backend Developer',
      expertise: ['Node.js', 'Database Design', 'API Development'],
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      bio: 'Dr. Chen has a PhD in Computer Science and specializes in building scalable backend systems for scientific applications.',
      linkedin: 'https://linkedin.com/in/drmichaelchen',
      github: 'https://github.com/michaelchen'
    }
  ]

  const projectGoals: ProjectGoal[] = [
    {
      id: '1',
      title: 'AI-Powered Species Identification',
      description: 'Develop machine learning models to identify marine species from eDNA data with 95%+ accuracy',
      icon: Target,
      status: 'completed'
    },
    {
      id: '2',
      title: 'Real-time Biodiversity Monitoring',
      description: 'Create a system for continuous monitoring of marine biodiversity using automated eDNA analysis',
      icon: Globe,
      status: 'in_progress'
    },
    {
      id: '3',
      title: 'Policy Integration Platform',
      description: 'Build tools for policymakers to access and understand biodiversity data for informed decision-making',
      icon: Users,
      status: 'in_progress'
    },
    {
      id: '4',
      title: 'Educational Resources',
      description: 'Develop comprehensive learning modules for students and researchers on eDNA biodiversity analysis',
      icon: Award,
      status: 'planned'
    }
  ]

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'SIH 2025 Winner',
      description: 'First place in the Smart India Hackathon 2025 for innovative biodiversity monitoring solution',
      year: 2025,
      category: 'recognition'
    },
    {
      id: '2',
      title: 'Species Discovery',
      description: 'Identified 15+ new marine species through eDNA analysis in Indian coastal waters',
      year: 2024,
      category: 'research'
    },
    {
      id: '3',
      title: 'AI Model Patent',
      description: 'Patented novel machine learning algorithm for rapid eDNA species identification',
      year: 2024,
      category: 'innovation'
    },
    {
      id: '4',
      title: 'Conservation Impact',
      description: 'Contributed to the protection of 3 marine protected areas through data-driven insights',
      year: 2023,
      category: 'impact'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100'
      case 'in_progress': return 'text-blue-600 bg-blue-100'
      case 'planned': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'research': return <Users className="w-5 h-5" />
      case 'innovation': return <Award className="w-5 h-5" />
      case 'impact': return <Heart className="w-5 h-5" />
      case 'recognition': return <Star className="w-5 h-5" />
      default: return <Award className="w-5 h-5" />
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
          className="mb-12"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-navy-blue to-deep-saffron rounded-xl flex items-center justify-center">
              <Info className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-charcoal-gray">
                About Leviathon
              </h1>
              <p className="text-gray-600">
                Pioneering AI-driven eDNA biodiversity analysis for marine conservation
              </p>
            </div>
          </div>
        </motion.div>

        {/* Project Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-r from-navy-blue to-deep-saffron rounded-2xl p-8 text-white mb-12"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Revolutionizing Marine Biodiversity Monitoring
            </h2>
            <p className="text-lg leading-relaxed mb-8">
              Leviathon is a cutting-edge platform that combines artificial intelligence with environmental DNA (eDNA) analysis 
              to revolutionize how we understand and protect marine biodiversity. Our mission is to make advanced biodiversity 
              monitoring accessible to researchers, policymakers, and conservationists worldwide.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">95%+</div>
                <div className="text-sm opacity-90">Species Identification Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">10,000+</div>
                <div className="text-sm opacity-90">Species in Database</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">50+</div>
                <div className="text-sm opacity-90">Countries Covered</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Project Goals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-charcoal-gray mb-8 text-center">
            Our Mission & Goals
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectGoals.map((goal, index) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-navy-blue to-deep-saffron rounded-xl flex items-center justify-center flex-shrink-0">
                    <goal.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-charcoal-gray">
                        {goal.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(goal.status)}`}>
                        {goal.status.replace('_', ' ')}
                      </span>
                    </div>
                    
                    <p className="text-gray-600">
                      {goal.description}
                    </p>
                    
                    {goal.status === 'completed' && (
                      <div className="flex items-center space-x-1 mt-3 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">Completed</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-charcoal-gray mb-8 text-center">
            Our Team
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 text-center"
              >
                <div 
                  className="w-24 h-24 bg-cover bg-center rounded-full mx-auto mb-4"
                  style={{ backgroundImage: `url(${member.image})` }}
                />
                
                <h3 className="text-lg font-semibold text-charcoal-gray mb-1">
                  {member.name}
                </h3>
                
                <p className="text-sm text-navy-blue font-medium mb-3">
                  {member.role}
                </p>
                
                <p className="text-sm text-gray-600 mb-4">
                  {member.bio}
                </p>
                
                <div className="flex flex-wrap justify-center gap-1 mb-4">
                  {member.expertise.slice(0, 2).map((skill, i) => (
                    <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-center space-x-3">
                  {member.linkedin && (
                    <a 
                      href={member.linkedin} 
                      className="p-2 text-gray-400 hover:text-navy-blue transition-colors duration-200"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {member.twitter && (
                    <a 
                      href={`https://twitter.com/${member.twitter.replace('@', '')}`}
                      className="p-2 text-gray-400 hover:text-navy-blue transition-colors duration-200"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                  {member.github && (
                    <a 
                      href={member.github}
                      className="p-2 text-gray-400 hover:text-navy-blue transition-colors duration-200"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-charcoal-gray mb-8 text-center">
            Our Achievements
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-navy-blue to-deep-saffron rounded-xl flex items-center justify-center flex-shrink-0">
                    {getCategoryIcon(achievement.category)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-charcoal-gray">
                        {achievement.title}
                      </h3>
                      <span className="text-sm font-medium text-navy-blue">
                        {achievement.year}
                      </span>
                    </div>
                    
                    <p className="text-gray-600">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="bg-gradient-to-r from-indian-green to-navy-blue rounded-2xl p-8 text-white text-center"
        >
          <div className="flex justify-center mb-6">
            <img src="/leviathan.jpg" alt="Leviathan Logo" className="w-16 h-16 rounded-lg" />
          </div>
          <h2 className="text-2xl font-bold mb-4">
            Join Our Mission
          </h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Be part of the revolution in marine biodiversity conservation. Whether you're a researcher, 
            policymaker, or conservation enthusiast, there's a place for you in the Leviathon community.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a 
              href="/contact"
              className="flex items-center space-x-2 bg-white text-indian-green px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Get in Touch</span>
            </a>
            
            <a 
              href="/auth/signup"
              className="flex items-center space-x-2 border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-indian-green transition-all duration-200"
            >
              <span>Join Platform</span>
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
        </div>
      </div>
    </div>
  )
}
