"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { usePomodoroTimer, type SessionType } from "@/hooks/use-pomodoro-timer"
import { Play, Pause, RotateCcw } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { FlipTimer } from "./flip-timer"

export function PomodoroTimer() {
  const {
    formattedTime,
    isRunning,
    sessionType,
    sessionCount,
    progress,
    startTimer,
    pauseTimer,
    resetTimer,
    switchSession,
  } = usePomodoroTimer()

  const sessionButtons: { type: SessionType; label: string }[] = [
    { type: "focus", label: "Focus" },
    { type: "short-break", label: "Short Break" },
    { type: "long-break", label: "Long Break" },
  ]

  return (
    <motion.div
      className="flex flex-col items-center space-y-12"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Session Type Buttons */}
      <motion.div
        className="flex gap-3"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {sessionButtons.map(({ type, label }, index) => (
          <motion.div
            key={type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant={sessionType === type ? "default" : "outline"}
              onClick={() => switchSession(type)}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 shadow-lg ${
                sessionType === type
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-black/40 hover:bg-black/50 text-white border-white/40 backdrop-blur-sm"
              }`}
              disabled={isRunning}
            >
              {label}
            </Button>
          </motion.div>
        ))}
      </motion.div>

      {/* Progress Dots */}
      <motion.div
        className="flex gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        {[0, 1, 2, 3].map((dot) => (
          <motion.div
            key={dot}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              dot < sessionCount ? "bg-white" : "bg-white/30"
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.7 + dot * 0.1 }}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </motion.div>

      {/* Large Timer Display */}
      <div className="text-center">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <FlipTimer time={formattedTime} />
        </motion.div>

        {/* Control Buttons */}
        <motion.div
          className="flex gap-6 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={isRunning ? pauseTimer : startTimer}
              size="lg"
              className="px-12 py-4 rounded-full text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white shadow-xl transition-all duration-300"
            >
              <AnimatePresence mode="wait">
                {isRunning ? (
                  <motion.div
                    key="pause"
                    initial={{ rotate: 180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -180, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center"
                  >
                    <Pause className="w-6 h-6 mr-3" />
                    Pause
                  </motion.div>
                ) : (
                  <motion.div
                    key="play"
                    initial={{ rotate: 180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -180, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center"
                  >
                    <Play className="w-6 h-6 mr-3" />
                    Start
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={resetTimer}
              variant="outline"
              size="lg"
              className="px-8 py-4 rounded-full text-lg font-medium bg-black/40 hover:bg-black/50 text-white border-white/40 backdrop-blur-sm transition-all duration-300 shadow-lg"
            >
              <RotateCcw className="w-6 h-6 mr-3" />
              Reset
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Session Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        whileHover={{ scale: 1.02 }}
      >
        <Card className="p-6 bg-black/40 backdrop-blur-md border-white/30 rounded-2xl shadow-2xl">
          <div className="text-center text-white">
            <motion.div
              className="text-lg font-medium mb-1 drop-shadow-lg"
              key={sessionType}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {sessionType === "focus" ? "Time to focus and be productive!" : "Take a well-deserved break!"}
            </motion.div>
            <div className="text-sm text-white/80 capitalize drop-shadow-md">
              {sessionType.replace("-", " ")} session • Completed: {sessionCount}
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}
