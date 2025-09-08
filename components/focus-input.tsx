"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Edit3 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function FocusInput() {
  const [focusGoal, setFocusGoal] = useState("What do you want to focus on?")
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    setIsEditing(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave()
    }
  }

  return (
    <motion.div
      className="text-center mb-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <AnimatePresence mode="wait">
        {isEditing ? (
          <motion.div
            key="editing"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-4 bg-black/40 backdrop-blur-md border-white/30 rounded-2xl max-w-2xl mx-auto shadow-2xl">
              <div className="flex gap-3 items-center">
                <Input
                  value={focusGoal}
                  onChange={(e) => setFocusGoal(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="text-xl font-medium bg-transparent border-none text-white placeholder-white/70 focus:ring-0"
                  placeholder="What do you want to focus on?"
                  autoFocus
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={handleSave}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4"
                  >
                    Save
                  </Button>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="display"
            className="group cursor-pointer"
            onClick={() => setIsEditing(true)}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance leading-tight drop-shadow-lg">
              {focusGoal}
              <motion.span
                className="inline-block ml-3"
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ opacity: 0.7, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Edit3 className="inline-block w-6 h-6" />
              </motion.span>
            </h1>
            <motion.div
              className="w-12 h-1 bg-white/40 mx-auto rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
