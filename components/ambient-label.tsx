"use client"

import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"

export function AmbientLabel() {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-20"
      initial={{ opacity: 0, x: 50, y: 50 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.6, delay: 1.5, ease: "easeOut" }}
      whileHover={{ scale: 1.05, rotate: 2 }}
    >
      <Card className="p-3 px-5 bg-black/40 backdrop-blur-md border-white/30 rounded-full shadow-lg">
        <div className="text-white text-sm font-medium drop-shadow-md">Ambient</div>
      </Card>
    </motion.div>
  )
}
