"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

interface FlipDigitProps {
  digit: string
  className?: string
}

export function FlipDigit({ digit, className = "" }: FlipDigitProps) {
  const [currentDigit, setCurrentDigit] = useState(digit)
  const [isFlipping, setIsFlipping] = useState(false)

  useEffect(() => {
    if (digit !== currentDigit) {
      setIsFlipping(true)
      const timer = setTimeout(() => {
        setCurrentDigit(digit)
        setIsFlipping(false)
      }, 150)
      return () => clearTimeout(timer)
    }
  }, [digit, currentDigit])

  return (
    <div className={`relative inline-block ${className}`}>
      <div className="relative w-20 h-24 md:w-24 md:h-32 perspective-1000">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDigit}
            className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm border border-white/20 rounded-lg shadow-2xl"
            initial={isFlipping ? { rotateX: -90, opacity: 0 } : { rotateX: 0, opacity: 1 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: 90, opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            <span className="text-4xl md:text-5xl font-bold text-white font-mono drop-shadow-lg">{currentDigit}</span>

            {/* Paper-like divider line */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10 transform -translate-y-px" />

            {/* Subtle gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/20 rounded-lg pointer-events-none" />
          </motion.div>
        </AnimatePresence>

        {/* Shadow effect */}
        <div className="absolute inset-0 bg-black/20 rounded-lg transform translate-y-1 -z-10" />
      </div>
    </div>
  )
}
