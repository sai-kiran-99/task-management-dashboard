import { useState } from 'react'
import { useTaskContext } from '../context/TaskContext'
import { getPriorityClasses, formatDate } from '../utils/helpers'
import { STATUS } from '../constants'

export default function TaskTable({ tasks, onEdit, onDelete }) {
  const { toggleStatus } = useTaskContext()
  const [openMenuId, setOpenMenuId] = useState(null)

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-left text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wide">
            <th className="px-6 py-3">Title</th>
            <th className="px-6 py-3">Description</th>
            <th className="px-6 py-3">Priority</th>
            <th className="px-6 py-3">Created At</th>
            <th className="px-6 py-3">Due Date</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr
              key={task.id}
              className={`border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                task.status === STATUS.COMPLETED ? 'opacity-60' : ''
              }`}
            >
              <td className="px-6 py-4 font-medium text-gray-800 dark:text-white">
                <span className={task.status === STATUS.COMPLETED ? 'line-through text-gray-400' : ''}>
                  {task.title}
                </span>
              </td>
              <td className="px-6 py-4 text-gray-500 dark:text-gray-400 max-w-xs truncate">
                {task.description || '—'}
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityClasses(task.priority)}`}>
                  {task.priority}
                </span>
              </td>
              <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                {formatDate(task.createdAt)}
              </td>
              <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                {formatDate(task.dueDate)}
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => toggleStatus(task.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    task.status === STATUS.COMPLETED
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                  }`}
                >
                  {task.status}
                </button>
              </td>
              <td className="px-6 py-4 relative">
                <button
                  onClick={() => setOpenMenuId(openMenuId === task.id ? null : task.id)}
                  className="text-gray-400 hover:text-gray-600 text-lg font-bold px-2"
                >
                  ⋮
                </button>
                {openMenuId === task.id && (
                  <div className="absolute right-6 top-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10 w-32">
                    <button
                      onClick={() => { onEdit(task); setOpenMenuId(null) }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => { onDelete(task); setOpenMenuId(null) }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}