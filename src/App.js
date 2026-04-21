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

  const [modalOpen, setModalOpen] = useState(false)
  const [taskToEdit, setTaskToEdit] = useState(null)
  const [taskToDelete, setTaskToDelete] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [priorityFilter, setPriorityFilter] = useState('All')
  const [viewMode, setViewMode] = useState('list')
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'
  })

  // Sync dark class to html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  const pending = tasks.filter(t => t.status === STATUS.PENDING).length
  const completed = tasks.filter(t => t.status === STATUS.COMPLETED).length

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesStatus = statusFilter === 'All' || task.status === statusFilter
      const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter
      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [tasks, searchQuery, statusFilter, priorityFilter])

  const handleOpenCreate = () => { setTaskToEdit(null); setModalOpen(true) }
  const handleEdit = (task) => { setTaskToEdit(task); setModalOpen(true) }
  const handleDeleteClick = (task) => setTaskToDelete(task)
  const handleConfirmDelete = () => { deleteTask(taskToDelete.id); setTaskToDelete(null) }
  const handleCancelDelete = () => setTaskToDelete(null)
  const handleCloseModal = () => { setModalOpen(false); setTaskToEdit(null) }

  return (
    <div className="h-screen bg-gray-100 dark:bg-gray-900 transition-colors flex flex-col overflow-hidden">
      <Header viewMode={viewMode} onViewChange={setViewMode} darkMode={darkMode} onToggleDark={() => setDarkMode(!darkMode)} />
      <main className="max-w-6xl w-full mx-auto flex flex-col flex-1 overflow-hidden py-6 px-6">
        <StatsBar total={tasks.length} pending={pending} completed={completed} />
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col flex-1 overflow-hidden">
          <div className="shrink-0">
            <Toolbar
              onNewTask={handleOpenCreate}
              searchQuery={searchQuery}
              onSearch={setSearchQuery}
              statusFilter={statusFilter}
              onStatusFilter={setStatusFilter}
              priorityFilter={priorityFilter}
              onPriorityFilter={setPriorityFilter}
            />
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 flex-1 overflow-y-auto">
            {filteredTasks.length === 0 && tasks.length === 0 && <EmptyState />}
            {filteredTasks.length === 0 && tasks.length > 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <span className="text-4xl mb-3">🔍</span>
                <p className="text-gray-500 text-sm">No tasks match your search or filters</p>
              </div>
            )}
            {filteredTasks.length > 0 && viewMode === 'list' && (
              <TaskTable tasks={filteredTasks} onEdit={handleEdit} onDelete={handleDeleteClick} />
            )}
            {filteredTasks.length > 0 && viewMode === 'card' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                {filteredTasks.map(task => (
                  <TaskCard key={task.id} task={task} onEdit={handleEdit} onDelete={handleDeleteClick} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {modalOpen && <TaskModal taskToEdit={taskToEdit} onClose={handleCloseModal} />}
      {taskToDelete && (
        <ConfirmDialog task={taskToDelete} onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} />
      )}
    </div>
  )
}