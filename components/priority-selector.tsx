"use client"

import { motion } from "framer-motion"

interface PrioritySelectorProps {
  selectedPriority: "low" | "medium" | "high"
  onPriorityChange: (priority: "low" | "medium" | "high") => void
}

export function PrioritySelector({ selectedPriority, onPriorityChange }: PrioritySelectorProps) {
  const priorities = [
    { value: "low" as const, color: "bg-green-500", label: "Low" },
    { value: "medium" as const, color: "bg-yellow-500", label: "Medium" },
    { value: "high" as const, color: "bg-red-500", label: "High" },
  ]

  return (
    <div className="flex items-center gap-3">
      <span className="text-white/80 text-sm">Priority:</span>
      <div className="flex gap-2">
        {priorities.map((priority) => (
          <motion.button
            key={priority.value}
            onClick={() => onPriorityChange(priority.value)}
            className={`w-6 h-6 rounded-full border-2 transition-all ${
              selectedPriority === priority.value
                ? "border-white scale-110 shadow-lg"
                : "border-white/30 hover:border-white/60"
            } ${priority.color}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title={priority.label}
          />
        ))}
      </div>
    </div>
  )
}
