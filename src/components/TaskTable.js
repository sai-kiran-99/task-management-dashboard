import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useTaskContext } from '../context/TaskContext'
import { getPriorityClasses, formatDate } from '../utils/helpers'
import { STATUS } from '../constants'

const MENU_W = 128
const HEADERS = ['Title', 'Description', 'Priority', 'Created At', 'Due Date', 'Status', '']
const thCls =
  'sticky top-0 z-20 border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-normal uppercase tracking-wide text-gray-500 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400'

export default function TaskTable({ tasks, onEdit, onDelete }) {
  const { toggleStatus } = useTaskContext()
  const [openMenu, setOpenMenu] = useState(null)

  useEffect(() => {
    if (!openMenu) return
    const close = () => setOpenMenu(null)
    window.addEventListener('scroll', close, true)
    window.addEventListener('resize', close)
    return () => {
      window.removeEventListener('scroll', close, true)
      window.removeEventListener('resize', close)
    }
  }, [openMenu])

  const toggleRowMenu = (task, el) => {
    if (openMenu?.task.id === task.id) {
      setOpenMenu(null)
      return
    }
    const r = el.getBoundingClientRect()
    setOpenMenu({
      task,
      top: r.bottom + 4,
      left: Math.min(r.right - MENU_W, window.innerWidth - MENU_W - 8),
    })
  }

  return (
    <div className="min-w-0">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr>
            {HEADERS.map((label, i) => (
              <th key={i} className={`${thCls}${i === HEADERS.length - 1 ? ' w-14' : ''}`}>
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr
              key={task.id}
              className={`border-b border-gray-100 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700 ${
                task.status === STATUS.COMPLETED ? 'opacity-60' : ''
              }`}
            >
              <td className="px-6 py-4 font-medium text-gray-800 dark:text-white">
                <span className={task.status === STATUS.COMPLETED ? 'text-gray-400 line-through' : ''}>
                  {task.title}
                </span>
              </td>
              <td className="max-w-xs truncate px-6 py-4 text-gray-500 dark:text-gray-400">
                {task.description || '—'}
              </td>
              <td className="px-6 py-4">
                <span className={`rounded-full px-2 py-1 text-xs font-medium ${getPriorityClasses(task.priority)}`}>
                  {task.priority}
                </span>
              </td>
              <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{formatDate(task.createdAt)}</td>
              <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{formatDate(task.dueDate)}</td>
              <td className="px-6 py-4">
                <button
                  type="button"
                  onClick={() => toggleStatus(task.id)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    task.status === STATUS.COMPLETED
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                  }`}
                >
                  {task.status}
                </button>
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  type="button"
                  onClick={e => toggleRowMenu(task, e.currentTarget)}
                  className="rounded px-2 text-lg font-bold text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-expanded={openMenu?.task.id === task.id}
                  aria-haspopup="menu"
                >
                  ⋮
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {openMenu &&
        createPortal(
          <>
            <button
              type="button"
              className="fixed inset-0 z-30 cursor-default bg-transparent"
              aria-label="Close menu"
              onClick={() => setOpenMenu(null)}
            />
            <div
              role="menu"
              className="fixed z-40 w-32 rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
              style={{ top: openMenu.top, left: openMenu.left }}
            >
              <button
                type="button"
                role="menuitem"
                className="w-full rounded-t-lg px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                onClick={() => { onEdit(openMenu.task); setOpenMenu(null) }}
              >
                ✏️ Edit
              </button>
              <button
                type="button"
                role="menuitem"
                className="w-full rounded-b-lg px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30"
                onClick={() => { onDelete(openMenu.task); setOpenMenu(null) }}
              >
                🗑️ Delete
              </button>
            </div>
          </>,
          document.body
        )}
    </div>
  )
}
