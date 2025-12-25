'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface GanttTask {
  id: string
  name: string
  start: string
  end: string
  progress: number
  dependencies?: string[]
  assignee?: string
  category: string
}

interface GanttData {
  tasks: GanttTask[]
  milestones: Array<{
    date: string
    name: string
  }>
}

export default function GanttChart() {
  const [data, setData] = useState<GanttData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load Gantt data from JSON file
    fetch('/data/gantt-data.json')
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load Gantt data:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-neon-green border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading development timeline...</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="bg-dark-card neon-border p-8 text-center">
        <p className="text-gray-400 mb-4">No timeline data available.</p>
        <p className="text-sm text-gray-500">
          Upload gantt-data.json to /public/data/ to display the development timeline.
        </p>
      </div>
    )
  }

  // Calculate date range for timeline
  const allDates = data.tasks.flatMap(t => [new Date(t.start), new Date(t.end)])
  const minDate = new Date(Math.min(...allDates.map(d => d.getTime())))
  const maxDate = new Date(Math.max(...allDates.map(d => d.getTime())))

  // Generate months for timeline header
  const months: Date[] = []
  const current = new Date(minDate)
  current.setDate(1)
  while (current <= maxDate) {
    months.push(new Date(current))
    current.setMonth(current.getMonth() + 1)
  }

  const totalDays = Math.ceil((maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24))

  const getTaskPosition = (task: GanttTask) => {
    const start = new Date(task.start)
    const end = new Date(task.end)
    const startOffset = Math.ceil((start.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24))
    const duration = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))

    return {
      left: `${(startOffset / totalDays) * 100}%`,
      width: `${(duration / totalDays) * 100}%`,
    }
  }

  const categoryColors: Record<string, string> = {
    analysis: 'bg-blue-500',
    design: 'bg-green-500',
    development: 'bg-purple-500',
    testing: 'bg-orange-500',
    art: 'bg-pink-500',
    default: 'bg-neon-green',
  }

  return (
    <div className="space-y-6">
      {/* Gantt Chart */}
      <div className="bg-dark-card neon-border overflow-x-auto">
        {/* Timeline Header */}
        <div className="min-w-[800px]">
          <div className="flex border-b border-neon-green/20">
            <div className="w-64 p-4 bg-dark-bg/50 font-semibold text-neon-green border-r border-neon-green/20">
              TASK NAME
            </div>
            <div className="flex-1 relative">
              <div className="flex h-full">
                {months.map((month, index) => (
                  <div
                    key={index}
                    className="flex-1 p-4 text-center border-r border-neon-green/10 text-sm text-gray-400"
                  >
                    {month.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Task Rows */}
          {data.tasks.map((task, index) => {
            const position = getTaskPosition(task)
            const color = categoryColors[task.category] || categoryColors.default

            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex border-b border-neon-green/10 hover:bg-dark-bg/30 transition-colors group"
              >
                <div className="w-64 p-4 border-r border-neon-green/20">
                  <div className="font-medium text-gray-300 mb-1">{task.name}</div>
                  {task.assignee && (
                    <div className="text-xs text-gray-500">{task.assignee}</div>
                  )}
                </div>
                <div className="flex-1 relative p-2">
                  {/* Grid lines */}
                  <div className="absolute inset-0 flex">
                    {months.map((_, i) => (
                      <div key={i} className="flex-1 border-r border-neon-green/5" />
                    ))}
                  </div>

                  {/* Task Bar */}
                  <div
                    className="relative h-8 group-hover:scale-105 transition-transform"
                    style={position}
                  >
                    <div className={`h-full ${color} rounded relative overflow-hidden`}>
                      <div
                        className="h-full bg-white/20"
                        style={{ width: `${task.progress}%` }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-semibold text-white drop-shadow">
                          {task.progress}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Milestones */}
      {data.milestones && data.milestones.length > 0 && (
        <div className="bg-dark-card neon-border p-6">
          <h3 className="text-xl font-bold text-neon-green mb-4">KEY MILESTONES</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-3 bg-dark-bg neon-border"
              >
                <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse" />
                <div>
                  <div className="text-sm text-gray-400">
                    {new Date(milestone.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                  <div className="text-white font-semibold">{milestone.name}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="bg-dark-card neon-border p-6">
        <h3 className="text-xl font-bold text-neon-green mb-4">CATEGORY LEGEND</h3>
        <div className="flex flex-wrap gap-4">
          {Object.entries(categoryColors).filter(([key]) => key !== 'default').map(([category, color]) => (
            <div key={category} className="flex items-center gap-2">
              <div className={`w-4 h-4 ${color} rounded`} />
              <span className="text-gray-400 capitalize">{category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
