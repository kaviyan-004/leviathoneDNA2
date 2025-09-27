# Leviathon - AI-Powered eDNA Biodiversity Analysis Platform

A comprehensive, modern web portal for AI-driven eDNA biodiversity analysis, designed for SIH 2025 judges with stunning visuals and professional functionality.

## 🌊 Overview

Leviathon is a cutting-edge platform that combines artificial intelligence with environmental DNA (eDNA) analysis to revolutionize marine biodiversity monitoring. Built for researchers, policymakers, students, and conservationists worldwide.

## ✨ Features

### 🎨 Design & Branding
- **Crisp White Background** (#FFFFFF) with **Charcoal Gray** text (#37474F)
- **Navy Blue** primary buttons (#06038D) with **Deep Saffron** hover effects (#FF671F)
- **Indian Green** accent color (#046A38)
- Animated ocean wave effects and marine imagery
- Smooth fade-in animations and page transitions

### 🔐 Authentication & User Management
- Supabase-powered authentication
- Role-based access (Researcher, Student, Policymaker, Public, Admin)
- Secure sign-in/sign-up with email verification
- User profile management

### 📊 Dashboard & Analytics
- Interactive data visualizations using Recharts
- Real-time biodiversity monitoring
- Species distribution charts (donut, bar, line, area)
- Ocean heatmap with sampling locations
- Conservation alerts and notifications

### 📁 Data Management
- Drag & drop dataset upload (CSV, FASTA, FASTQ)
- Real-time upload progress tracking
- Secure file storage with Supabase
- Data processing status monitoring

### 🌐 Multilingual Support
- English, Hindi, and Malayalam language support
- Dynamic language switching
- Localized content and interface

### 📋 Policy & Governance
- Comprehensive biodiversity reports
- PDF and CSV export functionality
- Policy recommendations and insights
- Stakeholder-specific dashboards

### 📚 Learning & Education
- Interactive learning modules
- Case studies and success stories
- Progress tracking and certifications
- Multilingual educational content

### 🛡️ Conservation & Discovery
- New species discovery tracking
- Conservation success stories
- Ecological role mapping
- Community engagement features

### ⚙️ Admin Dashboard
- User management and monitoring
- System health and analytics
- Dataset oversight
- Activity logs and reports

## 🚀 Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Animations**: Framer Motion, GSAP
- **Charts**: Recharts for data visualization
- **Maps**: Leaflet.js for geographic visualization
- **Backend**: Supabase (Authentication, Database, Storage)
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast
- **Icons**: Lucide React

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/leviathon-edna-portal.git
   cd leviathon-edna-portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Fill in your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Setup

The platform uses Supabase for backend services. Set up the following tables:

### Users Table
```sql
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('researcher', 'student', 'policymaker', 'public', 'admin')),
  full_name TEXT,
  organization TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Datasets Table
```sql
CREATE TABLE datasets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  file_path TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  file_type TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('uploaded', 'processing', 'completed', 'failed')),
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Analysis Results Table
```sql
CREATE TABLE analysis_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  dataset_id UUID REFERENCES datasets(id) NOT NULL,
  species_count INTEGER NOT NULL,
  diversity_index DECIMAL NOT NULL,
  abundance_data JSONB,
  species_distribution JSONB,
  geographic_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🎯 User Roles & Permissions

- **Admin**: Full system access, user management, system monitoring
- **Researcher**: Dataset upload, analysis, research tools, collaboration features
- **Student**: Learning modules, limited dataset access, educational resources
- **Policymaker**: Policy reports, governance insights, export capabilities
- **Public**: Basic exploration, conservation information, community features

## 📱 Responsive Design

The platform is fully responsive and optimized for:
- Desktop (1920px+)
- Tablet (768px - 1024px)
- Mobile (320px - 767px)

## 🌍 Multilingual Features

- **English**: Full interface and content
- **Hindi (हिन्दी)**: Complete localization
- **Malayalam (മലയാളം)**: Complete localization
- Dynamic language switching
- Localized date formats and numbers

## 🔒 Security Features

- Supabase Row Level Security (RLS)
- Encrypted data transmission
- Secure file upload validation
- Role-based access control
- Session management
- CSRF protection

## 📈 Performance Optimizations

- Next.js App Router for optimal performance
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Optimized bundle size
- Efficient state management
- Caching strategies

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm test:watch

# Run tests with coverage
npm test:coverage
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 📊 Analytics & Monitoring

- Built-in performance monitoring
- User analytics dashboard
- Error tracking and logging
- System health monitoring
- API usage analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 SIH 2025

Built specifically for the Smart India Hackathon 2025, showcasing:
- Innovation in marine biodiversity monitoring
- AI/ML integration for environmental research
- User-friendly interface for diverse stakeholders
- Comprehensive data visualization and analysis
- Multilingual support for Indian languages
- Scalable architecture for real-world deployment

## 📞 Support

For support, email support@leviathon.ai or join our community discussions.

## 🙏 Acknowledgments

- Marine Biology Institute, Kochi
- Deep Ocean Research Center
- University of Mumbai
- Government of India - Ministry of Environment
- SIH 2025 Organizing Committee

---

**Leviathon** - Pioneering the future of marine biodiversity conservation through AI and eDNA analysis.
