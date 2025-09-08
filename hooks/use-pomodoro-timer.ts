"use client"

import { useState, useEffect, useCallback } from "react"
import { useAudioManager } from "./use-audio-manager"

export type SessionType = "focus" | "short-break" | "long-break"

interface PomodoroState {
  timeLeft: number
  isRunning: boolean
  sessionType: SessionType
  sessionCount: number
}

const SESSION_DURATIONS = {
  focus: 25 * 60, // 25 minutes
  "short-break": 5 * 60, // 5 minutes
  "long-break": 15 * 60, // 15 minutes
}

export function usePomodoroTimer() {
  const [state, setState] = useState<PomodoroState>({
    timeLeft: SESSION_DURATIONS.focus,
    isRunning: false,
    sessionType: "focus",
    sessionCount: 0,
  })

  const { playNotification } = useAudioManager()

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }, [])

  const startTimer = useCallback(() => {
    setState((prev) => ({ ...prev, isRunning: true }))
  }, [])

  const pauseTimer = useCallback(() => {
    setState((prev) => ({ ...prev, isRunning: false }))
  }, [])

  const resetTimer = useCallback(() => {
    setState((prev) => ({
      ...prev,
      timeLeft: SESSION_DURATIONS[prev.sessionType],
      isRunning: false,
    }))
  }, [])

  const switchSession = useCallback((newSessionType: SessionType) => {
    setState((prev) => ({
      ...prev,
      sessionType: newSessionType,
      timeLeft: SESSION_DURATIONS[newSessionType],
      isRunning: false,
    }))
  }, [])

  const nextSession = useCallback(() => {
    setState((prev) => {
      const newSessionCount = prev.sessionType === "focus" ? prev.sessionCount + 1 : prev.sessionCount
      let nextSessionType: SessionType

      if (prev.sessionType === "focus") {
        nextSessionType = newSessionCount % 4 === 0 ? "long-break" : "short-break"
      } else {
        nextSessionType = "focus"
      }

      return {
        ...prev,
        sessionType: nextSessionType,
        timeLeft: SESSION_DURATIONS[nextSessionType],
        sessionCount: newSessionCount,
        isRunning: false,
      }
    })
  }, [])

  // Timer countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (state.isRunning && state.timeLeft > 0) {
      interval = setInterval(() => {
        setState((prev) => ({
          ...prev,
          timeLeft: prev.timeLeft - 1,
        }))
      }, 1000)
    } else if (state.timeLeft === 0) {
      // Session completed
      setState((prev) => ({ ...prev, isRunning: false }))
      playNotification()
      // Auto-switch to next session
      nextSession()
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [state.isRunning, state.timeLeft, nextSession, playNotification])

  return {
    ...state,
    formatTime,
    startTimer,
    pauseTimer,
    resetTimer,
    switchSession,
    nextSession,
    formattedTime: formatTime(state.timeLeft),
    progress: 1 - state.timeLeft / SESSION_DURATIONS[state.sessionType],
  }
}
