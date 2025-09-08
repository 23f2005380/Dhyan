"use client"

import { useState, useEffect, useRef, useCallback } from "react"

export interface AmbientSound {
  id: string
  name: string
  url: string
  icon: string
}

export interface AudioState {
  isPlaying: boolean
  volume: number
  currentSound: AmbientSound | null
  isMuted: boolean
}

const AMBIENT_SOUNDS: AmbientSound[] = [
  {
    id: "forest",
    name: "Forest Sounds",
    url: "/audio/forest-ambience.mp3",
    icon: "🌲",
  },
  {
    id: "rain",
    name: "Rain",
    url: "/audio/rain-sounds.mp3",
    icon: "🌧️",
  },
  {
    id: "ocean",
    name: "Ocean Waves",
    url: "/audio/ocean-waves.mp3",
    icon: "🌊",
  },
  {
    id: "birds",
    name: "Bird Songs",
    url: "/audio/bird-songs.mp3",
    icon: "🐦",
  },
  {
    id: "whitenoise",
    name: "White Noise",
    url: "/audio/white-noise.mp3",
    icon: "📻",
  },
  {
    id: "cafe",
    name: "Cafe Ambience",
    url: "/audio/cafe-ambience.mp3",
    icon: "☕",
  },
]

export function useAudioManager() {
  const [audioState, setAudioState] = useState<AudioState>({
    isPlaying: false,
    volume: 0.5,
    currentSound: null,
    isMuted: false,
  })

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const notificationRef = useRef<HTMLAudioElement | null>(null)

  // Initialize audio elements
  useEffect(() => {
    audioRef.current = new Audio()
    audioRef.current.loop = true
    audioRef.current.volume = audioState.volume

    notificationRef.current = new Audio("/audio/timer-notification.mp3")
    notificationRef.current.volume = 0.7

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
      if (notificationRef.current) {
        notificationRef.current = null
      }
    }
  }, [])

  // Update volume when state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = audioState.isMuted ? 0 : audioState.volume
    }
  }, [audioState.volume, audioState.isMuted])

  const playSound = useCallback(
    (sound: AmbientSound) => {
      if (!audioRef.current) return

      if (audioState.currentSound?.id === sound.id && audioState.isPlaying) {
        // If same sound is playing, pause it
        audioRef.current.pause()
        setAudioState((prev) => ({ ...prev, isPlaying: false }))
      } else {
        // Play new sound or resume
        audioRef.current.src = sound.url
        audioRef.current.play().catch((error) => {
          console.warn("Audio playback failed:", error)
        })
        setAudioState((prev) => ({
          ...prev,
          isPlaying: true,
          currentSound: sound,
        }))
      }
    },
    [audioState.currentSound, audioState.isPlaying],
  )

  const pauseSound = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      setAudioState((prev) => ({ ...prev, isPlaying: false }))
    }
  }, [])

  const setVolume = useCallback((volume: number) => {
    setAudioState((prev) => ({ ...prev, volume }))
  }, [])

  const toggleMute = useCallback(() => {
    setAudioState((prev) => ({ ...prev, isMuted: !prev.isMuted }))
  }, [])

  const playNotification = useCallback(() => {
    if (notificationRef.current) {
      notificationRef.current.currentTime = 0
      notificationRef.current.play().catch((error) => {
        console.warn("Notification sound failed:", error)
      })
    }
  }, [])

  return {
    audioState,
    ambientSounds: AMBIENT_SOUNDS,
    playSound,
    pauseSound,
    setVolume,
    toggleMute,
    playNotification,
  }
}
