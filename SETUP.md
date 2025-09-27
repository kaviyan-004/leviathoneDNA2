# 🚀 Leviathon eDNA Portal - Setup Guide

## ✅ Installation Complete!

Your Leviathon eDNA Portal has been successfully installed with all dependencies. The development server should now be running.

## 🌐 Access Your Application

Open your browser and navigate to:
**http://localhost:3000**

## ⚙️ Environment Setup

### 1. Create Environment File
Create a `.env.local` file in your project root with the following content:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Optional: For server-side operations
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2. Set Up Supabase

1. **Create a Supabase Project:**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Copy your project URL and anon key

2. **Set up the Database:**
   Run these SQL commands in your Supabase SQL editor:

```sql
-- Enable Row Level Security
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create users table
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('researcher', 'student', 'policymaker', 'public', 'admin')),
  full_name TEXT,
  organization TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create datasets table
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

-- Create analysis_results table
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

-- Enable RLS policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE datasets ENABLE ROW LEVEL SECURITY;
ALTER TABLE analysis_results ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own datasets" ON datasets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own datasets" ON datasets FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own datasets" ON datasets FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own analysis results" ON analysis_results FOR SELECT USING (
  EXISTS (SELECT 1 FROM datasets WHERE datasets.id = analysis_results.dataset_id AND datasets.user_id = auth.uid())
);
```

3. **Set up Storage:**
   - Go to Storage in your Supabase dashboard
   - Create a bucket named `datasets`
   - Set it to public or configure appropriate policies

### 3. Update Environment Variables
Replace the placeholder values in your `.env.local` file with your actual Supabase credentials.

## 🎯 Features Available

### ✅ Fully Functional Pages:
- **Home Page** - Animated ocean waves and marine imagery
- **Authentication** - Sign in/Sign up with role selection
- **Dashboard** - Interactive charts and biodiversity data
- **Upload** - Drag & drop file upload (CSV, FASTA, FASTQ)
- **Policy & Governance** - Reports with PDF/CSV export
- **Learning & Education** - Multilingual learning modules
- **Conservation & Discovery** - New species and success stories
- **Admin Dashboard** - User and system management
- **About & Contact** - Team information and contact form

### 🌐 Multilingual Support:
- English (default)
- Hindi (हिन्दी)
- Malayalam (മലയാളം)

### 📱 Responsive Design:
- Desktop, tablet, and mobile optimized
- Touch-friendly interactions

## 🚀 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 🎨 Design Features

- **Brand Colors:**
  - Crisp White (#FFFFFF) background
  - Charcoal Gray (#37474F) text
  - Navy Blue (#06038D) primary buttons
  - Deep Saffron (#FF671F) hover effects
  - Indian Green (#046A38) accents

- **Animations:**
  - Ocean wave effects
  - Smooth page transitions
  - Floating marine life elements
  - Hover animations

## 🔧 Troubleshooting

### Common Issues:

1. **Server not starting:**
   ```bash
   # Kill any existing processes
   npx kill-port 3000
   # Restart development server
   npm run dev
   ```

2. **Supabase connection issues:**
   - Verify your environment variables
   - Check Supabase project status
   - Ensure RLS policies are set up correctly

3. **Build errors:**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

## 📞 Support

For issues or questions:
- Check the README.md for detailed documentation
- Review the console for error messages
- Ensure all environment variables are set correctly

## 🏆 SIH 2025 Ready!

Your Leviathon eDNA Portal is now ready for the Smart India Hackathon 2025 presentation with:
- Professional design and animations
- Complete functionality across all pages
- Multilingual support
- Responsive design
- Security best practices
- Scalable architecture

**Happy coding! 🌊🐠**
