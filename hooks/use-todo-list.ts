"use client"

import { useState, useEffect } from "react"

export interface Todo {
  id: string
  title: string
  description?: string
  dueDate: Date | null
  dueTime: string
  completed: boolean
  priority: "low" | "medium" | "high"
  createdAt: Date
}

export function useTodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [sortBy, setSortBy] = useState<"dueDate" | "priority" | "createdAt">("dueDate")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("focus-app-todos")
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos).map((todo: any) => ({
        ...todo,
        dueDate: todo.dueDate ? new Date(todo.dueDate) : null,
        createdAt: new Date(todo.createdAt),
      }))
      setTodos(parsedTodos)
    }
  }, [])

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("focus-app-todos", JSON.stringify(todos))
  }, [todos])

  const addTodo = (todoData: Omit<Todo, "id" | "createdAt">) => {
    const newTodo: Todo = {
      ...todoData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    }
    setTodos((prev) => [...prev, newTodo])
  }

  const updateTodo = (id: string, updates: Partial<Todo>) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo)))
  }

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleTodo = (id: string) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const getSortedTodos = () => {
    return [...todos].sort((a, b) => {
      let comparison = 0

      switch (sortBy) {
        case "dueDate":
          if (!a.dueDate || !b.dueDate) {
            if (!a.dueDate && !b.dueDate) return 0
            if (!a.dueDate) return 1
            if (!b.dueDate) return -1
          }
          const aDateTime = new Date(`${a.dueDate.toDateString()} ${a.dueTime}`)
          const bDateTime = new Date(`${b.dueDate.toDateString()} ${b.dueTime}`)
          comparison = aDateTime.getTime() - bDateTime.getTime()
          break
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 }
          comparison = priorityOrder[b.priority] - priorityOrder[a.priority]
          break
        case "createdAt":
          comparison = a.createdAt.getTime() - b.createdAt.getTime()
          break
      }

      return sortOrder === "asc" ? comparison : -comparison
    })
  }

  const getUpcomingTodos = () => {
    const now = new Date()
    return getSortedTodos().filter((todo) => {
      if (todo.completed) return false
      if (!todo.dueDate) return false
      const todoDateTime = new Date(`${todo.dueDate.toDateString()} ${todo.dueTime}`)
      return todoDateTime >= now
    })
  }

  const getOverdueTodos = () => {
    const now = new Date()
    return getSortedTodos().filter((todo) => {
      if (todo.completed) return false
      if (!todo.dueDate) return false
      const todoDateTime = new Date(`${todo.dueDate.toDateString()} ${todo.dueTime}`)
      return todoDateTime < now
    })
  }

  return {
    todos: getSortedTodos(),
    upcomingTodos: getUpcomingTodos(),
    overdueTodos: getOverdueTodos(),
    sortBy,
    sortOrder,
    setSortBy,
    setSortOrder,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
  }
}
