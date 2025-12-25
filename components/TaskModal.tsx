'use client'

import { motion, AnimatePresence } from 'framer-motion'
import DecryptText from './DecryptText'

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

interface TaskModalProps {
  task: Task | null
  onClose: () => void
  categoryColor: string
}

export default function TaskModal({ task, onClose, categoryColor }: TaskModalProps) {
  if (!task) return null

  const statusColors = {
    planned: 'text-gray-400',
    in_progress: 'text-crimson-bright',
    completed: 'text-green-500'
  }

  const priorityColors = {
    low: 'text-gray-500',
    medium: 'text-blue-400',
    high: 'text-orange-400',
    critical: 'text-red-500'
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative max-w-2xl w-full bg-dark-card border-2 neon-border p-8 max-h-[80vh] overflow-y-auto code-font"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-crimson-bright transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Task Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: categoryColor }}
              />
              <DecryptText
                text={task.name}
                className="text-2xl font-bold text-crimson-bright text-glow"
                as="h2"
                speed={30}
              />
            </div>
            <DecryptText
              text={task.description}
              className="text-gray-400 text-sm"
              as="p"
              speed={20}
            />
          </div>

          {/* Status Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">PROGRESS</span>
              <span className="text-crimson-bright font-bold">{task.progress}%</span>
            </div>
            <div className="h-2 bg-dark-bg rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${task.progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-crimson to-crimson-bright"
                style={{ boxShadow: '0 0 10px rgba(196, 30, 58, 0.5)' }}
              />
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <div className="text-xs text-gray-500 mb-1">STATUS</div>
              <DecryptText
                text={task.status.toUpperCase().replace('_', '.')}
                className={`font-semibold ${statusColors[task.status]}`}
                as="span"
                speed={25}
              />
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">PRIORITY</div>
              <DecryptText
                text={task.priority.toUpperCase()}
                className={`font-semibold ${priorityColors[task.priority]}`}
                as="span"
                speed={25}
              />
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">START.DATE</div>
              <div className="text-gray-300">{new Date(task.startDate).toLocaleDateString()}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">END.DATE</div>
              <div className="text-gray-300">{new Date(task.endDate).toLocaleDateString()}</div>
            </div>
          </div>

          {/* Full Description */}
          <div className="mb-6">
            <div className="text-xs text-gray-500 mb-2">DESCRIPTION</div>
            <DecryptText
              text={task.fullDescription}
              className="text-gray-300 leading-relaxed text-sm"
              as="p"
              speed={15}
            />
          </div>

          {/* Dependencies */}
          {task.dependencies.length > 0 && (
            <div>
              <div className="text-xs text-gray-500 mb-2">DEPENDENCIES</div>
              <div className="flex flex-wrap gap-2">
                {task.dependencies.map((dep) => (
                  <span
                    key={dep}
                    className="px-3 py-1 bg-dark-bg text-crimson-bright text-xs border border-crimson/30"
                  >
                    {dep}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Timeline Indicator */}
          <div className="mt-6 pt-6 border-t border-crimson/20">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <DecryptText
                text=">>>_TASK.TIMELINE"
                as="span"
                speed={20}
              />
              <span>
                {Math.ceil((new Date(task.endDate).getTime() - new Date(task.startDate).getTime()) / (1000 * 60 * 60 * 24))} DAYS
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
