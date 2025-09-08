"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, Calendar, Clock, Trash2, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTodoList } from "@/hooks/use-todo-list"
import { ModernDateTimePicker } from "./modern-datetime-picker"
import { PrioritySelector } from "./priority-selector"

export function TodoSidebar() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodoList()
  const [newTask, setNewTask] = useState("")
  const [newDate, setNewDate] = useState<Date | null>(null)
  const [newTime, setNewTime] = useState("")
  const [newPriority, setNewPriority] = useState<"low" | "medium" | "high">("medium")

  const handleAddTodo = () => {
    if (newTask.trim()) {
      addTodo({
        title: newTask.trim(),
        dueDate: newDate,
        dueTime: newTime || "09:00",
        completed: false,
        priority: newPriority,
      })
      setNewTask("")
      setNewDate(null)
      setNewTime("")
      setNewPriority("medium")
    }
  }

  const sortedTodos = [...todos].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1
    }
    if (!a.dueDate || !b.dueDate) {
      if (!a.dueDate && !b.dueDate) return 0
      return !a.dueDate ? 1 : -1
    }
    return (
      new Date(`${a.dueDate.toDateString()} ${a.dueTime}`).getTime() -
      new Date(`${b.dueDate.toDateString()} ${b.dueTime}`).getTime()
    )
  })

  return (
    <motion.div
      className="fixed right-6 top-1/2 transform -translate-y-1/2 z-10 w-80"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <Card className="bg-black/40 backdrop-blur-md border-white/30 p-4 h-96 shadow-2xl">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-white" />
          <h3 className="text-white font-semibold drop-shadow-md">Tasks</h3>
        </div>

        {/* Add new task */}
        <div className="space-y-3 mb-4">
          <Input
            placeholder="Add new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="bg-black/30 border-white/30 text-white placeholder:text-white/70"
            onKeyPress={(e) => e.key === "Enter" && handleAddTodo()}
          />

          <ModernDateTimePicker
            selectedDate={newDate}
            selectedTime={newTime}
            onDateChange={setNewDate}
            onTimeChange={setNewTime}
          />

          <div className="flex items-center justify-between">
            <PrioritySelector selectedPriority={newPriority} onPriorityChange={setNewPriority} />
            <Button onClick={handleAddTodo} size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Todo list with scroll */}
        <ScrollArea className="h-48">
          <AnimatePresence>
            {sortedTodos.map((todo) => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="mb-2"
              >
                <Card className="p-3 bg-black/30 border-white/20 shadow-md">
                  <div className="flex items-start gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleTodo(todo.id)}
                      className={`p-1 ${
                        todo.completed ? "text-emerald-400 hover:text-emerald-300" : "text-white/60 hover:text-white"
                      }`}
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm drop-shadow-sm ${todo.completed ? "text-white/60 line-through" : "text-white"}`}
                      >
                        {todo.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        {todo.dueDate && (
                          <div className="flex items-center gap-1 text-xs text-white/80 drop-shadow-sm">
                            <Clock className="w-3 h-3" />
                            {todo.dueDate.toLocaleDateString()} {todo.dueTime}
                          </div>
                        )}
                        <div
                          className={`w-2 h-2 rounded-full ${
                            todo.priority === "high"
                              ? "bg-red-500"
                              : todo.priority === "medium"
                                ? "bg-yellow-500"
                                : "bg-green-500"
                          }`}
                        />
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteTodo(todo.id)}
                      className="p-1 text-white/60 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </ScrollArea>
      </Card>
    </motion.div>
  )
}
