'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface OceanWaveProps {
  className?: string
}

export default function OceanWave({ className = '' }: OceanWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let time = 0

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    const drawWave = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
      
      const width = canvas.offsetWidth
      const height = canvas.offsetHeight
      
      // Create multiple wave layers
      const waves = [
        { amplitude: 20, frequency: 0.02, speed: 0.02, color: 'rgba(6, 3, 141, 0.3)' },
        { amplitude: 15, frequency: 0.03, speed: 0.015, color: 'rgba(74, 144, 226, 0.4)' },
        { amplitude: 25, frequency: 0.015, speed: 0.025, color: 'rgba(255, 103, 31, 0.2)' },
      ]

      waves.forEach((wave, index) => {
        ctx.beginPath()
        ctx.moveTo(0, height / 2)
        
        for (let x = 0; x <= width; x += 2) {
          const y = height / 2 + 
            wave.amplitude * Math.sin((x * wave.frequency) + (time * wave.speed)) +
            (index * 5) // Offset each wave slightly
          ctx.lineTo(x, y)
        }
        
        ctx.lineTo(width, height)
        ctx.lineTo(0, height)
        ctx.closePath()
        
        const gradient = ctx.createLinearGradient(0, 0, 0, height)
        gradient.addColorStop(0, wave.color)
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
        
        ctx.fillStyle = gradient
        ctx.fill()
      })

      time += 1
      animationId = requestAnimationFrame(drawWave)
    }

    resizeCanvas()
    drawWave()

    window.addEventListener('resize', resizeCanvas)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />
      
      {/* Floating marine life elements */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-20"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          >
            {i % 3 === 0 && (
              <svg className="w-8 h-8 text-navy-blue" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            )}
            {i % 3 === 1 && (
              <svg className="w-6 h-6 text-deep-saffron" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            )}
            {i % 3 === 2 && (
              <svg className="w-10 h-10 text-indian-green" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
