"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"

const MOTIVATIONAL_QUOTES = [
  "Sometimes you win, sometimes you learn",
  "Focus is the key to productivity",
  "Small steps lead to big achievements",
  "Progress, not perfection",
  "Your future self will thank you",
  "Consistency beats intensity",
  "Every moment is a fresh beginning",
  "Success is the sum of small efforts",
]

export function MotivationalQuote() {
  const [currentQuote, setCurrentQuote] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length)
    }, 45000) // Change quote every 45 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="fixed top-6 right-6 max-w-sm z-20"
      initial={{ opacity: 0, x: 100, y: -50 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.02, rotate: 1 }}
    >
      <Card className="p-4 bg-black/40 backdrop-blur-md border-white/30 rounded-2xl shadow-2xl">
        <div className="text-white text-right">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuote}
              className="text-lg font-medium italic text-balance drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              "{MOTIVATIONAL_QUOTES[currentQuote]}"
            </motion.div>
          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  )
}
