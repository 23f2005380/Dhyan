"use client"

import { FlipDigit } from "./flip-digit"
import { motion } from "framer-motion"

interface FlipTimerProps {
  time: string
  className?: string
}

export function FlipTimer({ time, className = "" }: FlipTimerProps) {
  // Split time into individual digits (MM:SS format)
  const [minutes, seconds] = time.split(":")
  const minute1 = minutes[0] || "0"
  const minute2 = minutes[1] || "0"
  const second1 = seconds[0] || "0"
  const second2 = seconds[1] || "0"

  return (
    <motion.div
      className={`flex items-center gap-2 md:gap-4 ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Minutes */}
      <div className="flex gap-1">
        <FlipDigit digit={minute1} />
        <FlipDigit digit={minute2} />
      </div>

      {/* Colon separator */}
      <motion.div
        className="flex flex-col gap-2 px-2"
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <div className="w-2 h-2 bg-white rounded-full shadow-lg" />
        <div className="w-2 h-2 bg-white rounded-full shadow-lg" />
      </motion.div>

      {/* Seconds */}
      <div className="flex gap-1">
        <FlipDigit digit={second1} />
        <FlipDigit digit={second2} />
      </div>
    </motion.div>
  )
}
