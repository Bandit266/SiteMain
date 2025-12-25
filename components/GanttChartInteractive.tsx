'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion'
import DecryptText from '@/components/DecryptText'
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

// Muted, sophisticated color palette aligned with concept-art
const sophisticatedColors = {
  design: { from: '#4a5568', to: '#5a6a7a' },      // Muted steel blue
  development: { from: '#6b3030', to: '#8b4040' }, // Muted crimson
  testing: { from: '#3d5a4a', to: '#4d6a5a' },     // Muted green
  marketing: { from: '#5a4a6b', to: '#6a5a7b' },   // Muted purple
  default: { from: '#3a4a5a', to: '#4a5a6a' }      // Neutral gray-blue
}

export default function GanttChartInteractive() {
  const [viewMode, setViewMode] = useState<ViewMode>('3-months')
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [hoveredTask, setHoveredTask] = useState<string | null>(null)
  const [scrollX, setScrollX] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)

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

  // Get sophisticated gradient for category
  const getCategoryGradient = (category: string) => {
    const colors = sophisticatedColors[category as keyof typeof sophisticatedColors] || sophisticatedColors.default
    return `linear-gradient(135deg, ${colors.from}, ${colors.to})`
  }

  const getCategoryColor = (category: string) => {
    const colors = sophisticatedColors[category as keyof typeof sophisticatedColors] || sophisticatedColors.default
    return colors.to
  }

  // Handle horizontal drag/pan gestures for mobile
  const handlePanStart = () => {
    setIsDragging(true)
  }

  const handlePan = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (scrollContainerRef.current) {
      const newScrollX = scrollX - info.delta.x
      const maxScroll = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth
      const clampedScroll = Math.max(0, Math.min(newScrollX, maxScroll))
      setScrollX(clampedScroll)
      scrollContainerRef.current.scrollLeft = clampedScroll
    }
  }

  const handlePanEnd = () => {
    setIsDragging(false)
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-6 sm:mb-8">
        <div>
          <DecryptText
            text=">>>_DEVELOPMENT.TIMELINE"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-crimson-bright text-glow mb-2 code-font leading-tight max-w-[16ch] sm:max-w-none"
            as="h2"
            speed={40}
          />
          <DecryptText
            text="tracking.progress.in_real-time"
            className="text-gray-400 code-font text-xs sm:text-sm"
            as="p"
            speed={25}
          />
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 code-font">
          <button
            onClick={() => setViewMode('3-months')}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 border transition-all text-xs sm:text-sm ${
              viewMode === '3-months'
                ? 'border-crimson bg-crimson/20 text-crimson-bright'
                : 'border-crimson/30 text-gray-400 hover:text-crimson-bright hover:border-crimson/50'
            }`}
          >
            <DecryptText text="3.MONTHS" as="span" speed={30} />
          </button>
          <button
            onClick={() => setViewMode('12-months')}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 border transition-all text-xs sm:text-sm ${
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
      <div className="flex flex-wrap gap-3 sm:gap-4 mb-5 sm:mb-6 pb-5 sm:pb-6 border-b border-crimson/10">
        {Object.entries(categories).map(([key, cat]) => (
          <div key={key} className="flex items-center gap-2 code-font text-xs sm:text-sm">
            <div
              className="w-3 h-3 sm:w-4 sm:h-4"
              style={{
                background: getCategoryGradient(key),
                boxShadow: `0 0 4px ${getCategoryColor(key)}40`
              }}
            />
            <span className="text-gray-500">{cat.label}</span>
          </div>
        ))}
      </div>

      {/* Mobile Scroll Hint */}
      <div className="md:hidden mb-3 p-2 bg-crimson/10 border border-crimson/30 code-font text-xs text-gray-400 flex items-center gap-2">
        <motion.div
          animate={{ x: [-5, 5, -5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-crimson-bright"
        >
          ◀▶
        </motion.div>
        <span>Swipe left/right to pan timeline</span>
      </div>

      {/* Gantt Chart Container with custom scrollbar and pan support */}
      <motion.div
        ref={scrollContainerRef}
        className="overflow-x-auto overflow-y-visible gantt-scrollbar"
        onPanStart={handlePanStart}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div className="min-w-[600px] sm:min-w-[800px] bg-[#0a0e14] p-3 sm:p-6 border border-crimson/10 bg-[radial-gradient(circle_at_20%_0%,rgba(120,255,255,0.12),transparent_55%)]">
          {/* Timeline Header */}
          <div className="flex mb-2">
            <div className="w-24 sm:w-32 md:w-56 lg:w-64 flex-shrink-0" />
            <div className="flex-1 flex bg-[#0f1419]">
              {monthColumns.map((col, idx) => (
                <div
                  key={idx}
                  className="flex-1 text-center border-l border-[#1a2832] code-font py-1.5 sm:py-2"
                >
                  <div className="text-[10px] sm:text-xs md:text-sm text-gray-600 font-semibold tracking-wider">
                    {col.month.toUpperCase()}.{col.year}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tasks */}
          <div className="space-y-0.5 sm:space-y-1 overflow-visible">
            {tasks.map((task, idx) => {
              const categoryColor = getCategoryColor(task.category)
              const categoryGradient = getCategoryGradient(task.category)
              const style = getTaskStyle(task)
              const isHovered = hoveredTask === task.id

              return (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center group hover:bg-[#0f1419]/30 transition-colors"
                >
                  {/* Task Name */}
                  <div className="w-24 sm:w-32 md:w-56 lg:w-64 flex-shrink-0 pr-1 sm:pr-2 md:pr-4 py-1.5 sm:py-2">
                    <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
                      <div
                        className="w-0.5 sm:w-0.5 md:w-1 h-4 sm:h-5 md:h-6"
                        style={{ background: categoryGradient }}
                      />
                      <span className="text-[9px] sm:text-[11px] md:text-sm text-gray-400 group-hover:text-gray-300 transition-colors code-font truncate leading-tight">
                        {task.name}
                      </span>
                    </div>
                  </div>

                  {/* Timeline Bar */}
                  <div className="flex-1 relative h-8 sm:h-9 md:h-11 lg:h-12 border-l border-[#1a2832]">
                    {/* Month separators */}
                    {monthColumns.map((_, idx) => (
                      <div
                        key={idx}
                        className="absolute top-0 bottom-0 border-l border-[#1a2832]/50"
                        style={{ left: `${(idx / months) * 100}%` }}
                      />
                    ))}

                    {/* Task Bar */}
                    <motion.div
                      className="absolute top-1/2 -translate-y-1/2 h-4 sm:h-5 md:h-6 lg:h-7 cursor-pointer shadow-[0_0_12px_rgba(120,255,255,0.12)] touch-manipulation"
                      style={style}
                      onMouseEnter={() => !isDragging && setHoveredTask(task.id)}
                      onMouseLeave={() => setHoveredTask(null)}
                      onTouchStart={() => setHoveredTask(task.id)}
                      onTouchEnd={() => setHoveredTask(null)}
                      onClick={() => !isDragging && setSelectedTask(task)}
                      whileHover={{ scaleY: 1.15 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Progress Background */}
                      <div
                        className="absolute inset-0 border transition-all overflow-hidden"
                        style={{
                          borderColor: categoryColor,
                          background: `${categoryColor}15`,
                          boxShadow: isHovered ? `0 0 12px ${categoryColor}60` : 'none',
                          filter: isHovered ? 'brightness(1.2)' : 'none'
                        }}
                      >
                        {/* Progress Fill */}
                        <div
                          className="h-full transition-all duration-300 relative overflow-hidden"
                          style={{
                            width: `${task.progress}%`,
                            background: categoryGradient,
                            opacity: 0.8
                          }}
                        >
                          {/* Animated scan line */}
                          <motion.div
                            animate={{ x: ['-100%', '200%'] }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: 'linear'
                            }}
                            className="absolute inset-0 w-8 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          />
                        </div>
                      </div>

                      {/* Hover Tooltip - FIXED WITH WORD WRAP */}
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 max-w-[300px] p-4 bg-[#0a0e14] border-2 border-crimson/40 z-50 pointer-events-none"
                          style={{ boxShadow: `0 0 20px ${categoryColor}30` }}
                        >
                          <div className="code-font text-xs space-y-2">
                            <div className="text-crimson-bright font-bold text-sm border-b border-crimson/20 pb-2">
                              ▸ {task.name}
                            </div>
                            <div
                              className="text-gray-400 leading-relaxed whitespace-normal break-words"
                              style={{
                                wordWrap: 'break-word',
                                overflowWrap: 'break-word',
                                maxWidth: '100%'
                              }}
                            >
                              {task.description}
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t border-crimson/10">
                              <span className="text-gray-500">
                                {task.progress}% complete
                              </span>
                              <span
                                className="text-xs font-semibold uppercase"
                                style={{ color: categoryColor }}
                              >
                                {task.status.replace('_', ' ')}
                              </span>
                            </div>
                            {task.priority === 'high' || task.priority === 'critical' && (
                              <div className="text-red-400 text-xs">
                                [!] {task.priority.toUpperCase()} PRIORITY
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}

                      {/* Progress Text */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span
                          className="text-[8px] sm:text-[10px] md:text-xs font-bold code-font"
                          style={{
                            color: task.progress > 50 ? '#fff' : categoryColor,
                            textShadow: '0 1px 2px rgba(0,0,0,0.8)'
                          }}
                        >
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
          <div className="relative mt-6">
            <div className="flex">
              <div className="w-24 sm:w-32 md:w-56 lg:w-64 flex-shrink-0" />
              <div className="flex-1 relative h-2">
                <motion.div
                  className="absolute top-0 left-0 w-px h-full bg-crimson-bright"
                  style={{ boxShadow: '0 0 8px rgba(196, 30, 58, 0.8)' }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-1.5 sm:px-2 py-0.5 bg-crimson-bright text-black text-[8px] sm:text-[10px] code-font whitespace-nowrap font-bold">
                    TODAY
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Statistics */}
      <div className="mt-6 hidden md:grid md:grid-cols-4 gap-4">
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
            className="p-4 bg-[#0a0e14] border border-crimson/20 hover:border-crimson/40 transition-colors group"
          >
            <div className="text-xs text-gray-600 code-font mb-2 tracking-wider">{stat.label}</div>
            <div className="text-2xl font-bold text-crimson-bright code-font group-hover:text-glow">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Task Modal */}
      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          categoryColor={getCategoryColor(selectedTask.category)}
        />
      )}

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .gantt-scrollbar::-webkit-scrollbar {
          height: 10px;
        }
        .gantt-scrollbar::-webkit-scrollbar-track {
          background: rgba(10, 14, 20, 0.8);
          border: 1px solid rgba(196, 30, 58, 0.15);
        }
        .gantt-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, rgba(196, 30, 58, 0.3), rgba(196, 30, 58, 0.5));
          border-radius: 2px;
        }
        .gantt-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, rgba(196, 30, 58, 0.5), rgba(196, 30, 58, 0.7));
        }
      `}</style>
    </div>
  )
}
