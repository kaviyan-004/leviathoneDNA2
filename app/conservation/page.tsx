'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Leaf, 
  MapPin, 
  Calendar, 
  Users, 
  Award, 
  TrendingUp, 
  AlertTriangle, 
  Search,
  Filter,
  Share2,
  Heart,
  Eye,
  ChevronRight,
  Star,
  Globe,
  Shield,
  TreePine
} from 'lucide-react'
import Navigation from '@/components/Navigation'
import { useApp } from '@/app/providers'

interface NewDiscovery {
  id: string
  name: string
  scientificName: string
  description: string
  location: string
  discoveryDate: string
  discoverer: string
  image: string
  category: 'fish' | 'coral' | 'mollusk' | 'crustacean' | 'other'
  conservationStatus: 'least_concern' | 'near_threatened' | 'vulnerable' | 'endangered' | 'critically_endangered'
  ecologicalRole: string[]
  significance: string
}

interface ConservationSuccess {
  id: string
  title: string
  description: string
  location: string
  year: number
  impact: string
  image: string
  metrics: {
    speciesRecovered: number
    habitatRestored: number
    communityInvolved: number
  }
  challenges: string[]
  solutions: string[]
}

interface EcologicalMapping {
  id: string
  species: string
  role: string
  interactions: string[]
  importance: 'critical' | 'high' | 'medium' | 'low'
  threats: string[]
  conservationActions: string[]
}

export default function ConservationPage() {
  const [discoveries, setDiscoveries] = useState<NewDiscovery[]>([])
  const [successStories, setSuccessStories] = useState<ConservationSuccess[]>([])
  const [ecologicalMapping, setEcologicalMapping] = useState<EcologicalMapping[]>([])
  const [selectedFilter, setSelectedFilter] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const { t } = useApp()

  useEffect(() => {
    // Mock data for new discoveries
    const mockDiscoveries: NewDiscovery[] = [
      {
        id: '1',
        name: 'Kerala Rainbow Goby',
        scientificName: 'Stiphodon keralensis',
        description: 'A newly discovered species of freshwater goby with unique rainbow coloration patterns',
        location: 'Kerala Backwaters, India',
        discoveryDate: '2025-01-10',
        discoverer: 'Dr. Priya Sharma, Marine Biology Institute',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'fish',
        conservationStatus: 'vulnerable',
        ecologicalRole: ['Prey species', 'Nutrient cycling', 'Habitat maintenance'],
        significance: 'This species plays a crucial role in the food web of Kerala backwaters and indicates healthy ecosystem functioning'
      },
      {
        id: '2',
        name: 'Goa Deep-Sea Coral',
        scientificName: 'Madrepora goensis',
        description: 'A deep-sea coral species found at 200m depth with unique bioluminescent properties',
        location: 'Goa Continental Shelf, India',
        discoveryDate: '2025-01-05',
        discoverer: 'Dr. Rajesh Kumar, Deep Ocean Research Center',
        image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'coral',
        conservationStatus: 'endangered',
        ecologicalRole: ['Habitat provider', 'Carbon sequestration', 'Biodiversity hotspot'],
        significance: 'This coral species provides critical habitat for numerous deep-sea organisms and contributes to carbon storage'
      },
      {
        id: '3',
        name: 'Mumbai Mangrove Snail',
        scientificName: 'Littorina mumbaiensis',
        description: 'A small mangrove snail with unique shell patterns adapted to high salinity environments',
        location: 'Mumbai Mangrove Forest, India',
        discoveryDate: '2024-12-28',
        discoverer: 'Dr. Ananya Patel, Coastal Ecology Lab',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'mollusk',
        conservationStatus: 'near_threatened',
        ecologicalRole: ['Decomposer', 'Nutrient cycling', 'Food source'],
        significance: 'This species is an indicator of mangrove health and plays a vital role in nutrient cycling'
      }
    ]

    // Mock data for conservation success stories
    const mockSuccessStories: ConservationSuccess[] = [
      {
        id: '1',
        title: 'Coral Reef Restoration in Lakshadweep',
        description: 'Successful restoration of degraded coral reefs through innovative transplantation techniques',
        location: 'Lakshadweep Islands, India',
        year: 2024,
        impact: 'Significantly improved coral cover and marine biodiversity',
        image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        metrics: {
          speciesRecovered: 45,
          habitatRestored: 1200,
          communityInvolved: 500
        },
        challenges: [
          'Coral bleaching due to rising temperatures',
          'Limited funding for restoration efforts',
          'Community engagement challenges'
        ],
        solutions: [
          'Developed heat-resistant coral varieties',
          'Established community-based conservation programs',
          'Implemented sustainable fishing practices'
        ]
      },
      {
        id: '2',
        title: 'Mangrove Conservation in Sundarbans',
        description: 'Community-driven mangrove restoration project protecting coastal areas from climate change',
        location: 'Sundarbans, West Bengal',
        year: 2023,
        impact: 'Protected coastal communities and enhanced marine biodiversity',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        metrics: {
          speciesRecovered: 78,
          habitatRestored: 5000,
          communityInvolved: 1200
        },
        challenges: [
          'Rising sea levels threatening mangrove habitats',
          'Deforestation for agriculture and development',
          'Human-wildlife conflicts'
        ],
        solutions: [
          'Implemented adaptive management strategies',
          'Created alternative livelihood programs',
          'Established protected areas and buffer zones'
        ]
      }
    ]

    // Mock data for ecological mapping
    const mockEcologicalMapping: EcologicalMapping[] = [
      {
        id: '1',
        species: 'Mangrove Snapper',
        role: 'Top Predator',
        interactions: ['Preys on smaller fish', 'Competes with groupers', 'Provides food for sharks'],
        importance: 'critical',
        threats: ['Overfishing', 'Habitat loss', 'Pollution'],
        conservationActions: ['Fishing quotas', 'Marine protected areas', 'Habitat restoration']
      },
      {
        id: '2',
        species: 'Coral Polyps',
        role: 'Foundation Species',
        interactions: ['Provides habitat for fish', 'Forms symbiotic relationships with algae', 'Supports entire reef ecosystem'],
        importance: 'critical',
        threats: ['Ocean acidification', 'Coral bleaching', 'Physical damage'],
        conservationActions: ['Water quality monitoring', 'Coral restoration', 'Climate action']
      }
    ]

    setDiscoveries(mockDiscoveries)
    setSuccessStories(mockSuccessStories)
    setEcologicalMapping(mockEcologicalMapping)
  }, [])

  const filteredDiscoveries = discoveries.filter(discovery => {
    const matchesFilter = selectedFilter === 'all' || discovery.category === selectedFilter
    const matchesSearch = discovery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discovery.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discovery.location.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getConservationStatusColor = (status: string) => {
    switch (status) {
      case 'least_concern': return 'text-green-600 bg-green-100'
      case 'near_threatened': return 'text-yellow-600 bg-yellow-100'
      case 'vulnerable': return 'text-orange-600 bg-orange-100'
      case 'endangered': return 'text-red-600 bg-red-100'
      case 'critically_endangered': return 'text-red-800 bg-red-200'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'critical': return 'text-red-600 bg-red-100'
      case 'high': return 'text-orange-600 bg-orange-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
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
              <Leaf className="w-6 h-6 text-white" />
            </div>
        <div className="flex justify-center mb-6">
          <img src="/leviathan.jpg" alt="Leviathan Logo" className="w-16 h-16 rounded-lg" />
        </div>
            <div>
              <h1 className="text-3xl font-bold text-charcoal-gray">
                Conservation & Discovery
              </h1>
              <p className="text-gray-600">
                Explore new species discoveries and conservation success stories
              </p>
            </div>
          </div>
          
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search discoveries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-blue focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-navy-blue focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="fish">Fish</option>
                <option value="coral">Corals</option>
                <option value="mollusk">Mollusks</option>
                <option value="crustacean">Crustaceans</option>
                <option value="other">Others</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {[
            { label: 'New Species Discovered', value: discoveries.length, icon: Star, color: 'from-indian-green to-navy-blue' },
            { label: 'Conservation Projects', value: successStories.length, icon: Shield, color: 'from-navy-blue to-deep-saffron' },
            { label: 'Species Recovered', value: successStories.reduce((sum, story) => sum + story.metrics.speciesRecovered, 0), icon: TrendingUp, color: 'from-deep-saffron to-indian-green' },
            { label: 'Habitat Restored (sq km)', value: successStories.reduce((sum, story) => sum + story.metrics.habitatRestored, 0), icon: TreePine, color: 'from-navy-blue to-deep-saffron' }
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
                <span className="text-2xl font-bold text-charcoal-gray">
                  {stat.value.toLocaleString()}
                </span>
              </div>
              <div className="text-gray-600">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* New Discoveries */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-charcoal-gray">
                  Recent Species Discoveries
                </h2>
                <button className="flex items-center space-x-2 text-navy-blue hover:text-deep-saffron transition-colors duration-200">
                  <span>View All</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-6">
                {filteredDiscoveries.map((discovery, index) => (
                  <motion.div
                    key={discovery.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex items-start space-x-4">
                      <div 
                        className="w-24 h-24 bg-cover bg-center rounded-lg flex-shrink-0"
                        style={{ backgroundImage: `url(${discovery.image})` }}
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-lg font-semibold text-charcoal-gray mb-1">
                              {discovery.name}
                            </h3>
                            <p className="text-sm text-gray-600 italic">
                              {discovery.scientificName}
                            </p>
                          </div>
                          
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConservationStatusColor(discovery.conservationStatus)}`}>
                            {discovery.conservationStatus.replace('_', ' ')}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-3">
                          {discovery.description}
                        </p>
                        
                        <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{discovery.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(discovery.discoveryDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{discovery.discoverer}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-charcoal-gray mb-1">Ecological Role:</h4>
                            <div className="flex flex-wrap gap-1">
                              {discovery.ecologicalRole.slice(0, 2).map((role, i) => (
                                <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                                  {role}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <button className="flex items-center space-x-1 px-3 py-1 text-navy-blue hover:text-deep-saffron transition-colors duration-200">
                              <Eye className="w-4 h-4" />
                              <span>Details</span>
                            </button>
                            <button className="flex items-center space-x-1 px-3 py-1 text-navy-blue hover:text-deep-saffron transition-colors duration-200">
                              <Share2 className="w-4 h-4" />
                              <span>Share</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Conservation Success Stories */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-charcoal-gray mb-6">
                Conservation Success Stories
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {successStories.map((story, index) => (
                  <motion.div
                    key={story.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <div 
                      className="h-48 bg-cover bg-center"
                      style={{ backgroundImage: `url(${story.image})` }}
                    />
                    
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-charcoal-gray">
                          {story.title}
                        </h3>
                        <span className="text-sm text-gray-500">{story.year}</span>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4">
                        {story.description}
                      </p>
                      
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-medium text-charcoal-gray mb-2">Impact Metrics:</h4>
                          <div className="grid grid-cols-3 gap-2 text-xs">
                            <div className="text-center">
                              <div className="font-semibold text-indian-green">{story.metrics.speciesRecovered}</div>
                              <div className="text-gray-500">Species</div>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold text-navy-blue">{story.metrics.habitatRestored}</div>
                              <div className="text-gray-500">Hectares</div>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold text-deep-saffron">{story.metrics.communityInvolved}</div>
                              <div className="text-gray-500">People</div>
                            </div>
                          </div>
                        </div>
                        
                        <button className="w-full py-2 px-4 border border-navy-blue text-navy-blue rounded-lg hover:bg-navy-blue hover:text-white transition-colors duration-200 text-sm font-medium">
                          Read Full Story
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
            {/* Ecological Role Mapping */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-charcoal-gray mb-4">
                Ecological Role Mapping
              </h3>
              
              <div className="space-y-4">
                {ecologicalMapping.map((mapping, index) => (
                  <div key={mapping.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-charcoal-gray">{mapping.species}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImportanceColor(mapping.importance)}`}>
                        {mapping.importance}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{mapping.role}</p>
                    
                    <div>
                      <h5 className="text-xs font-medium text-charcoal-gray mb-1">Key Interactions:</h5>
                      <div className="flex flex-wrap gap-1">
                        {mapping.interactions.slice(0, 2).map((interaction, i) => (
                          <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                            {interaction}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Conservation Alerts */}
            <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5" />
                <span>Conservation Alerts</span>
              </h3>
              
              <div className="space-y-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                  <div className="font-medium text-sm">Coral Bleaching Event</div>
                  <div className="text-xs opacity-90">Goa Marine Sanctuary</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                  <div className="font-medium text-sm">Overfishing Alert</div>
                  <div className="text-xs opacity-90">Kerala Coast</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                  <div className="font-medium text-sm">Pollution Spike</div>
                  <div className="text-xs opacity-90">Mumbai Harbor</div>
                </div>
              </div>
              
              <button className="w-full mt-4 bg-white/20 backdrop-blur-sm text-white py-2 px-4 rounded-lg hover:bg-white/30 transition-colors duration-200 text-sm font-medium">
                View All Alerts
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-navy-blue to-deep-saffron rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">
                Get Involved
              </h3>
              <div className="space-y-3">
                <button className="w-full bg-white/20 backdrop-blur-sm text-white py-3 px-4 rounded-lg hover:bg-white/30 transition-colors duration-200 text-sm font-medium flex items-center space-x-2">
                  <Heart className="w-4 h-4" />
                  <span>Support Conservation</span>
                </button>
                <button className="w-full bg-white/20 backdrop-blur-sm text-white py-3 px-4 rounded-lg hover:bg-white/30 transition-colors duration-200 text-sm font-medium flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>Join Community</span>
                </button>
                <button className="w-full bg-white/20 backdrop-blur-sm text-white py-3 px-4 rounded-lg hover:bg-white/30 transition-colors duration-200 text-sm font-medium flex items-center space-x-2">
                  <Globe className="w-4 h-4" />
                  <span>Report Sighting</span>
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
