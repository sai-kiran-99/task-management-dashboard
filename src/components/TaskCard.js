import { useState } from 'react'
import { useTaskContext } from '../context/TaskContext'
import { getPriorityClasses, formatDate } from '../utils/helpers'
import { STATUS } from '../constants'

export default function TaskCard({ task, onEdit, onDelete }) {
  const { toggleStatus } = useTaskContext()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className={`bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow relative ${
      task.status === STATUS.COMPLETED ? 'opacity-60' : ''
    }`}>
      {/* Top row — title + menu */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className={`font-semibold text-gray-800 text-sm leading-snug ${
          task.status === STATUS.COMPLETED ? 'line-through text-gray-400' : ''
        }`}>
          {task.title}
        </h3>
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-400 hover:text-gray-600 font-bold text-lg px-1"
          >
            ⋮
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-6 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-32">
              <button
                onClick={() => { onEdit(task); setMenuOpen(false) }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => { onDelete(task); setMenuOpen(false) }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                🗑️ Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-500 text-xs mb-3 line-clamp-2">
        {task.description || 'No description'}
      </p>

      {/* Priority + Due Date */}
      <div className="flex items-center justify-between mb-3">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityClasses(task.priority)}`}>
          {task.priority}
        </span>
        <span className="text-xs text-gray-400">📅 {formatDate(task.dueDate)}</span>
      </div>

      {/* Status toggle */}
      <button
        onClick={() => toggleStatus(task.id)}
        className={`w-full py-1.5 rounded-lg text-xs font-medium transition-colors ${
          task.status === STATUS.COMPLETED
            ? 'bg-green-100 text-green-700 hover:bg-green-200'
            : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
        }`}
      >
        {task.status}
      </button>
    </div>
  )
}