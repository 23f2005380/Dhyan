"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useAudioManager } from "@/hooks/use-audio-manager"
import { Volume2, VolumeX, Music, Play, Pause } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function AudioControls() {
  const [isAudioDialogOpen, setIsAudioDialogOpen] = useState(false)
  const { audioState, ambientSounds, playSound, pauseSound, setVolume, toggleMute } = useAudioManager()

  return (
    <>
      {/* Music Control Button */}
      <Dialog open={isAudioDialogOpen} onOpenChange={setIsAudioDialogOpen}>
        <DialogTrigger asChild>
          <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300"
            >
              <Music className="w-5 h-5" />
            </Button>
          </motion.div>
        </DialogTrigger>
        <DialogContent className="max-w-md bg-slate-900/95 backdrop-blur-md border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Ambient Sounds</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Volume Control */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Volume</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMute}
                  className="w-8 h-8 text-white hover:bg-white/10"
                >
                  {audioState.isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
              </div>
              <Slider
                value={[audioState.volume * 100]}
                onValueChange={(value) => setVolume(value[0] / 100)}
                max={100}
                step={1}
                className="w-full"
              />
            </div>

            {/* Current Playing */}
            <AnimatePresence>
              {audioState.currentSound && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-3 bg-white/10 rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{audioState.currentSound.icon}</span>
                      <div>
                        <div className="font-medium">{audioState.currentSound.name}</div>
                        <div className="text-xs text-white/70">{audioState.isPlaying ? "Playing" : "Paused"}</div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={audioState.isPlaying ? pauseSound : () => playSound(audioState.currentSound!)}
                      className="w-8 h-8 text-white hover:bg-white/10"
                    >
                      {audioState.isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Sound Selection */}
            <div className="space-y-3">
              <span className="text-sm font-medium">Choose Ambient Sound</span>
              <div className="grid grid-cols-2 gap-2">
                {ambientSounds.map((sound) => (
                  <motion.div key={sound.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant={audioState.currentSound?.id === sound.id ? "default" : "outline"}
                      onClick={() => playSound(sound)}
                      className={`w-full p-3 h-auto flex flex-col items-center gap-2 ${
                        audioState.currentSound?.id === sound.id
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-white/5 hover:bg-white/10 text-white border-white/20"
                      }`}
                    >
                      <span className="text-2xl">{sound.icon}</span>
                      <span className="text-xs text-center">{sound.name}</span>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="text-xs text-white/60 text-center">
              Ambient sounds help improve focus and create a calming atmosphere
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Volume Control Button */}
      <motion.div whileHover={{ scale: 1.1, rotate: -5 }} whileTap={{ scale: 0.9 }}>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMute}
          className="w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300"
        >
          {audioState.isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </Button>
      </motion.div>
    </>
  )
}
