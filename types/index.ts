export interface User {
  id: string
  email: string
  role: 'researcher' | 'student' | 'policymaker' | 'public' | 'admin'
  full_name?: string
  organization?: string
  created_at: string
  updated_at: string
}

export interface Dataset {
  id: string
  user_id: string
  name: string
  description?: string
  file_path: string
  file_size: number
  file_type: string
  status: 'uploaded' | 'processing' | 'completed' | 'failed'
  metadata?: any
  created_at: string
  updated_at: string
}

export interface AnalysisResult {
  id: string
  dataset_id: string
  species_count: number
  diversity_index: number
  abundance_data: any
  species_distribution: any
  geographic_data: any
  created_at: string
}

export interface ConservationAlert {
  id: string
  title: string
  description: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  location?: string
  species_affected?: string[]
  created_at: string
}

export interface Language {
  code: string
  name: string
  nativeName: string
}

export interface ChartData {
  name: string
  value: number
  color?: string
}

export interface GeographicPoint {
  lat: number
  lng: number
  species: string
  abundance: number
}

export interface UserRole {
  value: string
  label: string
  description: string
  icon: string
}
