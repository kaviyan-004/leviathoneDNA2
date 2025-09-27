'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, File, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { supabase, mockAuth } from '@/lib/supabase'
import { useApp } from '@/app/providers'
import toast from 'react-hot-toast'

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  progress: number
  status: 'uploading' | 'completed' | 'error'
  error?: string
}

interface FileUploadProps {
  onUploadComplete?: (files: UploadedFile[]) => void
}

export default function FileUpload({ onUploadComplete }: FileUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const { user, t } = useApp()

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!user) {
      toast.error('Please sign in to upload files')
      return
    }

    setIsUploading(true)
    const newFiles: UploadedFile[] = []

    for (const file of acceptedFiles) {
      const fileId = Math.random().toString(36).substr(2, 9)
      const uploadedFile: UploadedFile = {
        id: fileId,
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        status: 'uploading'
      }

      newFiles.push(uploadedFile)
      setUploadedFiles(prev => [...prev, uploadedFile])

      try {
        // Simulate file upload for demo
        setUploadedFiles(prev => 
          prev.map(f => f.id === fileId ? { ...f, progress: 30 } : f)
        )

        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 1000))

        setUploadedFiles(prev => 
          prev.map(f => f.id === fileId ? { ...f, progress: 70 } : f)
        )

        // Simulate more processing
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Update progress to completed
        setUploadedFiles(prev => 
          prev.map(f => f.id === fileId ? { ...f, status: 'completed', progress: 100 } : f)
        )

        toast.success(`${file.name} uploaded successfully! (Demo Mode)`)

      } catch (error: any) {
        console.error('Upload error:', error)
        setUploadedFiles(prev => 
          prev.map(f => f.id === fileId ? { 
            ...f, 
            status: 'error', 
            error: error.message || 'Upload failed' 
          } : f)
        )
        toast.error(`Failed to upload ${file.name}`)
      }
    }

    setIsUploading(false)
    onUploadComplete?.(newFiles)
  }, [user, onUploadComplete])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'text/plain': ['.fasta', '.fa', '.fastq', '.fq'],
      'application/octet-stream': ['.fasta', '.fa', '.fastq', '.fq']
    },
    maxSize: 100 * 1024 * 1024, // 100MB
    multiple: true
  })

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase()
    switch (ext) {
      case 'csv':
        return '📊'
      case 'fasta':
      case 'fa':
        return '🧬'
      case 'fastq':
      case 'fq':
        return '🔬'
      default:
        return '📄'
    }
  }

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
          isDragActive 
            ? 'border-navy-blue bg-navy-blue/5 scale-105' 
            : 'border-gray-300 hover:border-navy-blue hover:bg-gray-50'
        }`}
      >
        <input {...getInputProps()} />
        
        <div className="space-y-4">
          <motion.div
            animate={{ 
              scale: isDragActive ? 1.1 : 1,
              rotate: isDragActive ? 5 : 0 
            }}
            transition={{ duration: 0.2 }}
            className="mx-auto w-20 h-20 bg-gradient-to-br from-navy-blue to-deep-saffron rounded-2xl flex items-center justify-center"
          >
            <Upload className="w-10 h-10 text-white" />
          </motion.div>
          
          <div>
            <h3 className="text-2xl font-semibold text-charcoal-gray mb-2">
              {isDragActive ? 'Drop your files here' : t('dragDropFiles')}
            </h3>
            <p className="text-gray-600 mb-4">
              {t('supportedFormats')}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {['CSV', 'FASTA', 'FASTQ'].map((format) => (
                <span 
                  key={format}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                >
                  {format}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Uploaded Files */}
      <AnimatePresence>
        {uploadedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-charcoal-gray">
              {t('uploadProgress')}
            </h3>
            
            <div className="space-y-3">
              {uploadedFiles.map((file) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">
                      {getFileIcon(file.name)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-charcoal-gray truncate">
                          {file.name}
                        </h4>
                        <span className="text-xs text-gray-500">
                          {formatFileSize(file.size)}
                        </span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="progress-bar mb-2">
                        <div 
                          className="progress-fill"
                          style={{ width: `${file.progress}%` }}
                        />
                      </div>
                      
                      {/* Status */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {file.status === 'uploading' && (
                            <>
                              <Loader2 className="w-4 h-4 text-navy-blue animate-spin" />
                              <span className="text-sm text-navy-blue">{t('processing')}</span>
                            </>
                          )}
                          {file.status === 'completed' && (
                            <>
                              <CheckCircle className="w-4 h-4 text-indian-green" />
                              <span className="text-sm text-indian-green">{t('completed')}</span>
                            </>
                          )}
                          {file.status === 'error' && (
                            <>
                              <AlertCircle className="w-4 h-4 text-deep-saffron" />
                              <span className="text-sm text-deep-saffron">
                                {file.error || 'Upload failed'}
                              </span>
                            </>
                          )}
                        </div>
                        
                        <button
                          onClick={() => removeFile(file.id)}
                          className="p-1 text-gray-400 hover:text-deep-saffron transition-colors duration-200"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Tips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-gradient-to-r from-navy-blue/5 to-deep-saffron/5 rounded-xl p-6"
      >
        <h4 className="font-semibold text-charcoal-gray mb-3">Upload Tips</h4>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start space-x-2">
            <span className="text-navy-blue mt-1">•</span>
            <span>CSV files should contain species data with headers</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-navy-blue mt-1">•</span>
            <span>FASTA files should contain DNA sequences in standard format</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-navy-blue mt-1">•</span>
            <span>FASTQ files should contain quality scores and sequences</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-navy-blue mt-1">•</span>
            <span>Maximum file size: 100MB per file</span>
          </li>
        </ul>
      </motion.div>
    </div>
  )
}
