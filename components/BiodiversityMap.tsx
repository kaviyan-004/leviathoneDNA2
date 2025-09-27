'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Layers, ZoomIn, ZoomOut, Navigation } from 'lucide-react'

// Mock data for biodiversity hotspots
const biodiversityData = [
  { lat: 12.9716, lng: 77.5946, name: 'Bengaluru Marine Research', species: 245, diversity: 94 },
  { lat: 19.0760, lng: 72.8777, name: 'Mumbai Coastal Area', species: 312, diversity: 96 },
  { lat: 22.5726, lng: 88.3639, name: 'Kolkata Estuary', species: 198, diversity: 89 },
  { lat: 13.0827, lng: 80.2707, name: 'Chennai Coast', species: 267, diversity: 92 },
  { lat: 8.5241, lng: 76.9366, name: 'Kochi Backwaters', species: 289, diversity: 95 },
  { lat: 15.2993, lng: 74.1240, name: 'Goa Marine Sanctuary', species: 334, diversity: 97 },
  { lat: 9.9312, lng: 76.2673, name: 'Kerala Coast', species: 276, diversity: 93 },
  { lat: 11.2588, lng: 75.7804, name: 'Kozhikode Research', species: 223, diversity: 91 },
  { lat: 12.3051, lng: 76.6551, name: 'Mysuru Freshwater', species: 156, diversity: 87 },
  { lat: 17.3850, lng: 78.4867, name: 'Hyderabad Research', species: 189, diversity: 88 }
]

interface BiodiversityMapProps {
  className?: string
}

export default function BiodiversityMap({ className = '' }: BiodiversityMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [selectedLocation, setSelectedLocation] = useState<any>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    // Initialize map (using a simple implementation since we don't have Leaflet properly configured)
    if (mapRef.current && !mapLoaded) {
      setMapLoaded(true)
    }
  }, [mapLoaded])

  const getDiversityColor = (diversity: number) => {
    if (diversity >= 95) return '#046A38' // High diversity - Indian Green
    if (diversity >= 90) return '#FF671F' // Medium-high diversity - Deep Saffron
    if (diversity >= 85) return '#06038D' // Medium diversity - Navy Blue
    return '#6B7280' // Low diversity - Gray
  }

  const getMarkerSize = (species: number) => {
    if (species >= 300) return 'w-8 h-8'
    if (species >= 250) return 'w-6 h-6'
    if (species >= 200) return 'w-5 h-5'
    return 'w-4 h-4'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`bg-white rounded-2xl shadow-lg p-6 border border-gray-100 ${className}`}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-charcoal-gray">
          Biodiversity Hotspots
        </h3>
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-500 hover:text-navy-blue transition-colors duration-200">
            <Layers className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-500 hover:text-navy-blue transition-colors duration-200">
            <ZoomIn className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-500 hover:text-navy-blue transition-colors duration-200">
            <ZoomOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative">
        <div 
          ref={mapRef}
          className="w-full h-96 bg-gradient-to-br from-blue-100 to-green-100 rounded-xl relative overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2306038D' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          {/* Map markers */}
          {biodiversityData.map((location, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="absolute cursor-pointer group"
              style={{
                left: `${(location.lng + 180) / 360 * 100}%`,
                top: `${(90 - location.lat) / 180 * 100}%`,
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => setSelectedLocation(location)}
              whileHover={{ scale: 1.2 }}
            >
              <div className={`${getMarkerSize(location.species)} rounded-full border-2 border-white shadow-lg flex items-center justify-center`}
                   style={{ backgroundColor: getDiversityColor(location.diversity) }}>
                <MapPin className="w-3 h-3 text-white" />
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-white rounded-lg shadow-lg p-3 border border-gray-200 min-w-max">
                  <div className="text-sm font-semibold text-charcoal-gray">{location.name}</div>
                  <div className="text-xs text-gray-600">{location.species} species</div>
                  <div className="text-xs text-gray-600">{location.diversity}% diversity</div>
                </div>
                <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white mx-auto"></div>
              </div>
            </motion.div>
          ))}

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 border border-gray-200">
            <h4 className="text-sm font-semibold text-charcoal-gray mb-2">Diversity Index</h4>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-indian-green"></div>
                <span className="text-xs text-gray-600">High (95%+)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-deep-saffron"></div>
                <span className="text-xs text-gray-600">Medium-High (90-94%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-navy-blue"></div>
                <span className="text-xs text-gray-600">Medium (85-89%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                <span className="text-xs text-gray-600">Low (&lt;85%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Location Details */}
        {selectedLocation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 border border-gray-200 max-w-xs"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-charcoal-gray">Location Details</h4>
              <button
                onClick={() => setSelectedLocation(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                ×
              </button>
            </div>
            <div className="space-y-2">
              <div>
                <div className="text-sm font-medium text-charcoal-gray">{selectedLocation.name}</div>
                <div className="text-xs text-gray-600">
                  {selectedLocation.lat.toFixed(4)}°, {selectedLocation.lng.toFixed(4)}°
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="text-center">
                  <div className="text-lg font-semibold text-navy-blue">{selectedLocation.species}</div>
                  <div className="text-xs text-gray-600">Species</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-indian-green">{selectedLocation.diversity}%</div>
                  <div className="text-xs text-gray-600">Diversity</div>
                </div>
              </div>
              <button className="w-full mt-3 bg-navy-blue text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-deep-saffron transition-colors duration-200">
                View Analysis
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Map Controls */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-navy-blue transition-colors duration-200">
            <Navigation className="w-4 h-4" />
            <span>Center Map</span>
          </button>
          <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-navy-blue transition-colors duration-200">
            <Layers className="w-4 h-4" />
            <span>Toggle Layers</span>
          </button>
        </div>
        <div className="text-xs text-gray-500">
          {biodiversityData.length} hotspots identified
        </div>
      </div>
    </motion.div>
  )
}
