"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Home, Gift, Settings, Maximize, ListTodo } from "lucide-react"
import { TodoList } from "./todo-list"
import { AudioControls } from "./audio-controls"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { motion } from "framer-motion"

export function FloatingControls() {
  const [isTodoOpen, setIsTodoOpen] = useState(false)

  return (
    <>
      <motion.div
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
      >
        <Card className="p-3 bg-white/10 backdrop-blur-md border-white/20 rounded-full">
          <div className="flex items-center gap-3">
            {/* Audio Controls */}
            <div className="flex gap-1">
              <AudioControls />
            </div>

            {/* Separator */}
            <div className="w-px h-6 bg-white/20" />

            {/* Navigation Controls */}
            <div className="flex gap-1">
              {[
                { icon: Home, component: Home },
                { icon: ListTodo, component: ListTodo, special: true },
                { icon: Gift, component: Gift },
                { icon: Settings, component: Settings },
                { icon: Maximize, component: Maximize },
              ].map(({ icon: Icon, component: Component, special }, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 1.4 + index * 0.1 }}
                >
                  {special ? (
                    <Dialog open={isTodoOpen} onOpenChange={setIsTodoOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-10 h-10 rounded-full text-white hover:bg-white/20 transition-all duration-300"
                        >
                          <Component className="w-5 h-5" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl bg-transparent border-none p-0">
                        <TodoList />
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-10 h-10 rounded-full text-white hover:bg-white/20 transition-all duration-300"
                    >
                      <Component className="w-5 h-5" />
                    </Button>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>
    </>
  )
}
