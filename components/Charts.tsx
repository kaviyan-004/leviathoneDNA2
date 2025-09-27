'use client'

import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts'
import { motion } from 'framer-motion'

// Sample data for demonstration
const speciesDistributionData = [
  { name: 'Fish', value: 35, color: '#06038D' },
  { name: 'Corals', value: 25, color: '#FF671F' },
  { name: 'Mollusks', value: 20, color: '#046A38' },
  { name: 'Crustaceans', value: 12, color: '#4A90E2' },
  { name: 'Others', value: 8, color: '#9C27B0' }
]

const topTaxaData = [
  { name: 'Parrotfish', abundance: 145, color: '#06038D' },
  { name: 'Grouper', abundance: 132, color: '#FF671F' },
  { name: 'Snapper', abundance: 128, color: '#046A38' },
  { name: 'Tuna', abundance: 115, color: '#4A90E2' },
  { name: 'Mackerel', abundance: 98, color: '#9C27B0' },
  { name: 'Shark', abundance: 87, color: '#E91E63' },
  { name: 'Ray', abundance: 76, color: '#FF9800' },
  { name: 'Eel', abundance: 65, color: '#4CAF50' },
  { name: 'Seahorse', abundance: 54, color: '#2196F3' },
  { name: 'Octopus', abundance: 43, color: '#9C27B0' }
]

const abundanceTrendsData = [
  { month: 'Jan', abundance: 1200, diversity: 85 },
  { month: 'Feb', abundance: 1350, diversity: 88 },
  { month: 'Mar', abundance: 1420, diversity: 92 },
  { month: 'Apr', abundance: 1580, diversity: 89 },
  { month: 'May', abundance: 1650, diversity: 94 },
  { month: 'Jun', abundance: 1720, diversity: 96 },
  { month: 'Jul', abundance: 1680, diversity: 93 },
  { month: 'Aug', abundance: 1750, diversity: 95 },
  { month: 'Sep', abundance: 1820, diversity: 97 },
  { month: 'Oct', abundance: 1780, diversity: 94 },
  { month: 'Nov', abundance: 1850, diversity: 96 },
  { month: 'Dec', abundance: 1920, diversity: 98 }
]

interface ChartsProps {
  className?: string
}

export default function Charts({ className = '' }: ChartsProps) {
  return (
    <div className={`space-y-8 ${className}`}>
      {/* Species Distribution Pie Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="chart-container"
      >
        <h3 className="text-xl font-semibold text-charcoal-gray mb-6">
          Species Distribution
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={speciesDistributionData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {speciesDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: any) => [`${value}%`, 'Percentage']}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
          {speciesDistributionData.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-charcoal-gray">{item.name}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Top 10 Taxa Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="chart-container"
      >
        <h3 className="text-xl font-semibold text-charcoal-gray mb-6">
          Top 10 Taxa by Abundance
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topTaxaData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="name" 
                stroke="#37474F"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis stroke="#37474F" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="abundance" radius={[4, 4, 0, 0]}>
                {topTaxaData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Abundance Trends Area Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="chart-container"
      >
        <h3 className="text-xl font-semibold text-charcoal-gray mb-6">
          Abundance Trends Over Time
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={abundanceTrendsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#37474F" fontSize={12} />
              <YAxis stroke="#37474F" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area
                type="monotone"
                dataKey="abundance"
                stroke="#06038D"
                fill="url(#abundanceGradient)"
                strokeWidth={3}
              />
              <defs>
                <linearGradient id="abundanceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06038D" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#06038D" stopOpacity={0.1} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Diversity Index Line Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="chart-container"
      >
        <h3 className="text-xl font-semibold text-charcoal-gray mb-6">
          Diversity Index Trends
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={abundanceTrendsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#37474F" fontSize={12} />
              <YAxis stroke="#37474F" fontSize={12} domain={[80, 100]} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line
                type="monotone"
                dataKey="diversity"
                stroke="#FF671F"
                strokeWidth={3}
                dot={{ fill: '#FF671F', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: '#FF671F', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  )
}
