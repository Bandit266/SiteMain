'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import DecryptText from './DecryptText'
import TaskModal from './TaskModal'
import ganttData from '@/data/gantt-data.json'

interface Task {
  id: string
  name: string
  description: string
  fullDescription: string
  startDate: string
  endDate: string
  progress: number
  status: 'planned' | 'in_progress' | 'completed'
  category: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  dependencies: string[]
}

type ViewMode = '3-months' | '12-months'

export default function GanttChartInteractive() {
  const [viewMode, setViewMode] = useState<ViewMode>('3-months')
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [hoveredTask, setHoveredTask] = useState<string | null>(null)

  const tasks = ganttData.tasks as Task[]
  const categories = ganttData.categories

  // Calculate date range
  const today = useMemo(() => new Date(), [])
  const months = viewMode === '3-months' ? 3 : 12
  const endDate = useMemo(() => {
    const date = new Date(today)
    date.setMonth(date.getMonth() + months)
    return date
  }, [today, months])

  // Generate month columns
  const monthColumns = useMemo(() => {
    const columns = []
    const current = new Date(today)
    current.setDate(1)

    for (let i = 0; i < months; i++) {
      columns.push({
        month: current.toLocaleDateString('en-US', { month: 'short' }),
        year: current.getFullYear(),
        date: new Date(current)
      })
      current.setMonth(current.getMonth() + 1)
    }
    return columns
  }, [today, months])

  // Calculate task position and width
  const getTaskStyle = (task: Task) => {
    const taskStart = new Date(task.startDate)
    const taskEnd = new Date(task.endDate)

    const totalDays = (endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    const startOffset = Math.max(0, (taskStart.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    const duration = (taskEnd.getTime() - taskStart.getTime()) / (1000 * 60 * 60 * 24)

    const left = (startOffset / totalDays) * 100
    const width = (duration / totalDays) * 100

    return {
      left: `${Math.max(0, left)}%`,
      width: `${Math.min(100 - left, width)}%`
    }
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <DecryptText
            text=">>>_DEVELOPMENT.TIMELINE"
            className="text-3xl font-bold text-crimson-bright text-glow mb-2 code-font"
            as="h2"
            speed={40}
          />
          <DecryptText
            text="tracking.progress.in_real-time"
            className="text-gray-400 code-font text-sm"
            as="p"
            speed={25}
          />
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 code-font">
          <button
            onClick={() => setViewMode('3-months')}
            className={`px-4 py-2 border transition-all ${
              viewMode === '3-months'
                ? 'border-crimson bg-crimson/20 text-crimson-bright'
                : 'border-crimson/30 text-gray-400 hover:text-crimson-bright hover:border-crimson/50'
            }`}
          >
            <DecryptText text="3.MONTHS" as="span" speed={30} />
          </button>
          <button
            onClick={() => setViewMode('12-months')}
            className={`px-4 py-2 border transition-all ${
              viewMode === '12-months'
                ? 'border-crimson bg-crimson/20 text-crimson-bright'
                : 'border-crimson/30 text-gray-400 hover:text-crimson-bright hover:border-crimson/50'
            }`}
          >
            <DecryptText text="12.MONTHS" as="span" speed={30} />
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-crimson/20">
        {Object.entries(categories).map(([key, cat]) => (
          <div key={key} className="flex items-center gap-2 code-font text-xs">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: cat.color }}
            />
            <span className="text-gray-400">{cat.label}</span>
          </div>
        ))}
      </div>

      {/* Gantt Chart Container */}
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Timeline Header */}
          <div className="flex mb-2">
            <div className="w-64 flex-shrink-0" />
            <div className="flex-1 flex">
              {monthColumns.map((col, idx) => (
                <div
                  key={idx}
                  className="flex-1 text-center border-l border-crimson/20 code-font"
                >
                  <div className="text-xs text-gray-500">
                    {col.month}.{col.year}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tasks */}
          <div className="space-y-2">
            {tasks.map((task, idx) => {
              const categoryColor = categories[task.category as keyof typeof categories]?.color || '#c41e3a'
              const style = getTaskStyle(task)
              const isHovered = hoveredTask === task.id

              return (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center group"
                >
                  {/* Task Name */}
                  <div className="w-64 flex-shrink-0 pr-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: categoryColor }}
                      />
                      <DecryptText
                        text={task.name}
                        className="text-sm text-gray-300 group-hover:text-crimson-bright transition-colors code-font"
                        as="span"
                        speed={35}
                      />
                    </div>
                  </div>

                  {/* Timeline Bar */}
                  <div className="flex-1 relative h-12 border-l border-crimson/20">
                    {/* Month separators */}
                    {monthColumns.map((_, idx) => (
                      <div
                        key={idx}
                        className="absolute top-0 bottom-0 border-l border-crimson/10"
                        style={{ left: `${(idx / months) * 100}%` }}
                      />
                    ))}

                    {/* Task Bar */}
                    <motion.div
                      className="absolute top-1/2 -translate-y-1/2 h-8 cursor-pointer"
                      style={style}
                      onMouseEnter={() => setHoveredTask(task.id)}
                      onMouseLeave={() => setHoveredTask(null)}
                      onClick={() => setSelectedTask(task)}
                      whileHover={{ scaleY: 1.2 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Progress Background */}
                      <div
                        className="absolute inset-0 border-2 transition-all"
                        style={{
                          borderColor: categoryColor,
                          backgroundColor: `${categoryColor}20`,
                          boxShadow: isHovered ? `0 0 15px ${categoryColor}` : 'none'
                        }}
                      >
                        {/* Progress Fill */}
                        <div
                          className="h-full transition-all duration-300"
                          style={{
                            width: `${task.progress}%`,
                            backgroundColor: categoryColor,
                            opacity: 0.6
                          }}
                        />
                      </div>

                      {/* Hover Tooltip */}
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-dark-card border-2 neon-border z-10 pointer-events-none"
                        >
                          <div className="text-xs code-font">
                            <div className="text-crimson-bright font-bold mb-1">{task.name}</div>
                            <div className="text-gray-400 mb-2">{task.description}</div>
                            <div className="flex justify-between text-gray-500">
                              <span>Progress: {task.progress}%</span>
                              <span className="text-crimson-bright">{task.status.replace('_', ' ')}</span>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Progress Text */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-bold text-white mix-blend-difference code-font">
                          {task.progress}%
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Current Date Indicator */}
          <div className="relative mt-4">
            <div className="flex">
              <div className="w-64 flex-shrink-0" />
              <div className="flex-1 relative h-1">
                <div className="absolute top-0 left-0 w-0.5 h-full bg-crimson-bright shadow-lg shadow-crimson-bright/50">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-crimson-bright text-black text-xs code-font whitespace-nowrap">
                    TODAY
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'TOTAL.TASKS', value: tasks.length },
          { label: 'IN.PROGRESS', value: tasks.filter(t => t.status === 'in_progress').length },
          { label: 'COMPLETED', value: tasks.filter(t => t.status === 'completed').length },
          { label: 'AVG.PROGRESS', value: `${Math.round(tasks.reduce((acc, t) => acc + t.progress, 0) / tasks.length)}%` }
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + idx * 0.1 }}
            className="p-4 bg-dark-teal neon-border scan-line"
          >
            <div className="text-xs text-gray-500 code-font mb-1">{stat.label}</div>
            <div className="text-2xl font-bold text-crimson-bright code-font">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Task Modal */}
      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          categoryColor={categories[selectedTask.category as keyof typeof categories]?.color || '#c41e3a'}
        />
      )}
    </div>
  )
}
