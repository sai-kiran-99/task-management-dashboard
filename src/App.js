import { useState, useMemo, useEffect } from 'react'
import { useTaskContext } from './context/TaskContext'
import Header from './components/Header'
import StatsBar from './components/StatsBar'
import Toolbar from './components/Toolbar'
import EmptyState from './components/EmptyState'
import TaskTable from './components/TaskTable'
import TaskCard from './components/TaskCard'
import TaskModal from './components/TaskModal'
import ConfirmDialog from './components/ConfirmDialog'
import { STATUS } from './constants'

export default function App() {
  const { tasks, deleteTask } = useTaskContext()
  const [dialog, setDialog] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [priorityFilter, setPriorityFilter] = useState('All')
  const [viewMode, setViewMode] = useState('list')
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  const pending = tasks.filter(t => t.status === STATUS.PENDING).length
  const completed = tasks.filter(t => t.status === STATUS.COMPLETED).length

  const filteredTasks = useMemo(() => {
    const q = searchQuery.toLowerCase()
    return tasks.filter(task => {
      const matchesSearch =
        task.title.toLowerCase().includes(q) ||
        (task.description && task.description.toLowerCase().includes(q))
      const matchesStatus = statusFilter === 'All' || task.status === statusFilter
      const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter
      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [tasks, searchQuery, statusFilter, priorityFilter])

  const closeDialog = () => setDialog(null)

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gray-100 transition-colors dark:bg-gray-900">
      <Header viewMode={viewMode} onViewChange={setViewMode} darkMode={darkMode} onToggleDark={() => setDarkMode(d => !d)} />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col overflow-hidden px-6 py-6">
        <StatsBar total={tasks.length} pending={pending} completed={completed} />
        <div className="flex flex-1 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
          <div className="shrink-0">
            <Toolbar
              onNewTask={() => setDialog({ type: 'task', task: null })}
              searchQuery={searchQuery}
              onSearch={setSearchQuery}
              statusFilter={statusFilter}
              onStatusFilter={setStatusFilter}
              priorityFilter={priorityFilter}
              onPriorityFilter={setPriorityFilter}
            />
          </div>
          <div className="min-h-0 flex-1 overflow-auto border-t border-gray-200 dark:border-gray-700">
            {filteredTasks.length === 0 && tasks.length === 0 && <EmptyState />}
            {filteredTasks.length === 0 && tasks.length > 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <span className="mb-3 text-4xl">🔍</span>
                <p className="text-sm text-gray-500">No tasks match your search or filters</p>
              </div>
            )}
            {filteredTasks.length > 0 && viewMode === 'list' && (
              <TaskTable
                tasks={filteredTasks}
                onEdit={task => setDialog({ type: 'task', task })}
                onDelete={task => setDialog({ type: 'delete', task })}
              />
            )}
            {filteredTasks.length > 0 && viewMode === 'card' && (
              <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={t => setDialog({ type: 'task', task: t })}
                    onDelete={t => setDialog({ type: 'delete', task: t })}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {dialog?.type === 'task' && (
        <TaskModal taskToEdit={dialog.task} onClose={closeDialog} />
      )}
      {dialog?.type === 'delete' && (
        <ConfirmDialog
          task={dialog.task}
          onConfirm={() => { deleteTask(dialog.task.id); closeDialog() }}
          onCancel={closeDialog}
        />
      )}
    </div>
  )
}
