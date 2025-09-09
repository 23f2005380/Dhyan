"use client"

import { PomodoroTimer } from "@/components/pomodoro-timer"
import { NatureBackground } from "@/components/nature-background"
import { FloatingControls } from "@/components/floating-controls"
import { MotivationalQuote } from "@/components/motivational-quote"
import { FocusInput } from "@/components/focus-input"
import { AmbientLabel } from "@/components/ambient-label"
import { TodoSidebar } from "@/components/todo-sidebar"

export default function FocusApp() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <NatureBackground />

      {/* Header */}
      <header className="relative z-10 p-6 flex justify-between items-start">
        <div className="flex items-center space-x-2">
          <div className="text-3xl font-bold text-white">dhyan</div>
          <div className="text-xs text-white/70 mt-2">by Aman </div>
        </div>
      </header>

      {/* Motivational Quote */}
      <MotivationalQuote />

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-6">
        <FocusInput />
        <div className="w-full px-4 flex flex-col md:flex-row items-center md:items-start justify-center gap-12">
          <div className="md:w-[65%] ">
            <div className="w-full flex justify-end">
              <PomodoroTimer />
            </div>
          </div>

          <div className=" md:w-[35%] ">
            <div className="w-full max-h-[60vh] md:max-h-[72vh] flex">
              <TodoSidebar />
            </div>
          </div>
        </div>
        
      </main>

      

      {/* Floating Controls */}
      <FloatingControls />

      {/* Ambient Label */}
      <AmbientLabel />
    </div>
  )
}
