"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useTodoList, type Todo } from "@/hooks/use-todo-list"
import { Plus, Calendar, Clock, Trash2, Edit, SortAsc, SortDesc } from "lucide-react"

export function TodoList() {
  const {
    todos,
    upcomingTodos,
    overdueTodos,
    sortBy,
    sortOrder,
    setSortBy,
    setSortOrder,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
  } = useTodoList()

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    dueDate: new Date().toISOString().split("T")[0],
    dueTime: "09:00",
    priority: "medium" as const,
    completed: false,
  })

  const handleAddTodo = () => {
    if (!newTodo.title.trim()) return

    addTodo({
      title: newTodo.title,
      description: newTodo.description,
      dueDate: new Date(newTodo.dueDate),
      dueTime: newTodo.dueTime,
      priority: newTodo.priority,
      completed: false,
    })

    setNewTodo({
      title: "",
      description: "",
      dueDate: new Date().toISOString().split("T")[0],
      dueTime: "09:00",
      priority: "medium",
      completed: false,
    })
    setIsAddDialogOpen(false)
  }

  const handleUpdateTodo = () => {
    if (!editingTodo) return

    updateTodo(editingTodo.id, {
      title: editingTodo.title,
      description: editingTodo.description,
      dueDate: editingTodo.dueDate,
      dueTime: editingTodo.dueTime,
      priority: editingTodo.priority,
    })
    setEditingTodo(null)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":")
    const hour = Number.parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      case "low":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  return (
    <Card className="w-full max-w-2xl bg-white/10 backdrop-blur-md border-white/20 rounded-2xl overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Focus Tasks</h2>
          <div className="flex items-center gap-3">
            {/* Sort Controls */}
            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dueDate">Due Date</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="createdAt">Created</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="text-white hover:bg-white/20"
            >
              {sortOrder === "asc" ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
            </Button>

            {/* Add Todo Button */}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Task
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-slate-700 text-white">
                <DialogHeader>
                  <DialogTitle>Add New Task</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Task title"
                    value={newTodo.title}
                    onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                    className="bg-slate-800 border-slate-600 text-white"
                  />
                  <Textarea
                    placeholder="Description (optional)"
                    value={newTodo.description}
                    onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                    className="bg-slate-800 border-slate-600 text-white"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="date"
                      value={newTodo.dueDate}
                      onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
                      className="bg-slate-800 border-slate-600 text-white"
                    />
                    <Input
                      type="time"
                      value={newTodo.dueTime}
                      onChange={(e) => setNewTodo({ ...newTodo, dueTime: e.target.value })}
                      className="bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                  <Select
                    value={newTodo.priority}
                    onValueChange={(value: any) => setNewTodo({ ...newTodo, priority: value })}
                  >
                    <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="high">High Priority</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex gap-3 pt-4">
                    <Button onClick={handleAddTodo} className="flex-1 bg-blue-600 hover:bg-blue-700">
                      Add Task
                    </Button>
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="flex-1">
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{todos.filter((t) => !t.completed).length}</div>
            <div className="text-sm text-white/70">Pending</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">{overdueTodos.length}</div>
            <div className="text-sm text-white/70">Overdue</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{todos.filter((t) => t.completed).length}</div>
            <div className="text-sm text-white/70">Completed</div>
          </div>
        </div>

        {/* Todo List */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {todos.length === 0 ? (
            <div className="text-center py-8 text-white/70">
              <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No tasks yet. Add your first task to get started!</p>
            </div>
          ) : (
            todos.map((todo) => (
              <Card
                key={todo.id}
                className={`p-4 bg-white/5 border-white/10 transition-all duration-300 ${
                  todo.completed ? "opacity-60" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <Checkbox checked={todo.completed} onCheckedChange={() => toggleTodo(todo.id)} className="mt-1" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h3 className={`font-medium text-white ${todo.completed ? "line-through" : ""}`}>
                          {todo.title}
                        </h3>
                        {todo.description && <p className="text-sm text-white/70 mt-1">{todo.description}</p>}
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1 text-xs text-white/70">
                            <Calendar className="w-3 h-3" />
                            {formatDate(todo.dueDate)}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-white/70">
                            <Clock className="w-3 h-3" />
                            {formatTime(todo.dueTime)}
                          </div>
                          <Badge className={`text-xs ${getPriorityColor(todo.priority)}`}>{todo.priority}</Badge>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEditingTodo(todo)}
                          className="w-8 h-8 text-white/70 hover:text-white hover:bg-white/10"
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteTodo(todo.id)}
                          className="w-8 h-8 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingTodo} onOpenChange={() => setEditingTodo(null)}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          {editingTodo && (
            <div className="space-y-4">
              <Input
                placeholder="Task title"
                value={editingTodo.title}
                onChange={(e) => setEditingTodo({ ...editingTodo, title: e.target.value })}
                className="bg-slate-800 border-slate-600 text-white"
              />
              <Textarea
                placeholder="Description (optional)"
                value={editingTodo.description || ""}
                onChange={(e) => setEditingTodo({ ...editingTodo, description: e.target.value })}
                className="bg-slate-800 border-slate-600 text-white"
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="date"
                  value={editingTodo.dueDate.toISOString().split("T")[0]}
                  onChange={(e) => setEditingTodo({ ...editingTodo, dueDate: new Date(e.target.value) })}
                  className="bg-slate-800 border-slate-600 text-white"
                />
                <Input
                  type="time"
                  value={editingTodo.dueTime}
                  onChange={(e) => setEditingTodo({ ...editingTodo, dueTime: e.target.value })}
                  className="bg-slate-800 border-slate-600 text-white"
                />
              </div>
              <Select
                value={editingTodo.priority}
                onValueChange={(value: any) => setEditingTodo({ ...editingTodo, priority: value })}
              >
                <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-3 pt-4">
                <Button onClick={handleUpdateTodo} className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Update Task
                </Button>
                <Button variant="outline" onClick={() => setEditingTodo(null)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  )
}
