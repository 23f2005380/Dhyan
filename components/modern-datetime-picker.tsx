"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

interface ModernDateTimePickerProps {
  selectedDate: Date | null
  selectedTime: string
  onDateChange: (date: Date | null) => void
  onTimeChange: (time: string) => void
}

export function ModernDateTimePicker({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
}: ModernDateTimePickerProps) {
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const today = new Date()
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const generateTimeSlots = () => {
    const slots = []
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
        slots.push(timeString)
      }
    }
    return slots
  }

  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    onDateChange(newDate)
    setShowDatePicker(false)
  }

  const handleTimeSelect = (time: string) => {
    onTimeChange(time)
    setShowTimePicker(false)
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        {/* Date Picker Button */}
        <Button
          variant="outline"
          onClick={() => setShowDatePicker(!showDatePicker)}
          className="flex-1 bg-black/30 border-white/30 text-white hover:bg-black/40 justify-start"
        >
          <Calendar className="w-4 h-4 mr-2" />
          {selectedDate ? selectedDate.toLocaleDateString() : "Select Date"}
        </Button>

        {/* Time Picker Button */}
        <Button
          variant="outline"
          onClick={() => setShowTimePicker(!showTimePicker)}
          className="flex-1 bg-black/30 border-white/30 text-white hover:bg-black/40 justify-start"
        >
          <Clock className="w-4 h-4 mr-2" />
          {selectedTime || "Select Time"}
        </Button>
      </div>

      {/* Modern Date Picker */}
      {showDatePicker && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
          <Card className="p-4 bg-black/40 backdrop-blur-md border-white/30">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                className="text-white hover:bg-white/10"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <h3 className="text-white font-medium">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                className="text-white hover:bg-white/10"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div key={day} className="text-center text-xs text-white/60 p-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDayOfMonth }, (_, i) => (
                <div key={`empty-${i}`} className="p-2" />
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1
                const isToday =
                  today.getDate() === day &&
                  today.getMonth() === currentMonth.getMonth() &&
                  today.getFullYear() === currentMonth.getFullYear()
                const isSelected =
                  selectedDate?.getDate() === day &&
                  selectedDate?.getMonth() === currentMonth.getMonth() &&
                  selectedDate?.getFullYear() === currentMonth.getFullYear()

                return (
                  <Button
                    key={day}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDateSelect(day)}
                    className={`p-2 h-8 text-sm ${
                      isSelected
                        ? "bg-emerald-600 text-white hover:bg-emerald-700"
                        : isToday
                          ? "bg-white/20 text-white hover:bg-white/30"
                          : "text-white hover:bg-white/10"
                    }`}
                  >
                    {day}
                  </Button>
                )
              })}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Modern Time Picker */}
      {showTimePicker && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
          <Card className="p-4 bg-black/40 backdrop-blur-md border-white/30 max-h-48 overflow-y-auto">
            <div className="grid grid-cols-4 gap-2">
              {generateTimeSlots().map((time) => (
                <Button
                  key={time}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleTimeSelect(time)}
                  className={`text-xs ${
                    selectedTime === time
                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  {time}
                </Button>
              ))}
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
