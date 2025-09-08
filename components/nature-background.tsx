"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const NATURE_BACKGROUNDS = [
  "/lush-green-forest-with-sunlight-filtering-through-.jpg",
  "/peaceful-mountain-lake-surrounded-by-pine-trees.jpg",
  "/serene-meadow-with-wildflowers-and-rolling-hills.jpg",
  "/misty-forest-path-with-ferns-and-moss-covered-rock.jpg",
  "/tranquil-bamboo-grove-with-soft-natural-lighting.jpg",
]

export function NatureBackground() {
  const [currentBg, setCurrentBg] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % NATURE_BACKGROUNDS.length)
    }, 30000) // Change background every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 -z-10">
      <AnimatePresence>
        <motion.div
          key={currentBg}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        >
          <img
            src={NATURE_BACKGROUNDS[currentBg] || "/placeholder.svg"}
            alt="Nature background"
            className="w-full h-full object-cover"
          />
          {/* Enhanced overlay with subtle animation */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/20 to-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
