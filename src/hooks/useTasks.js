import { v4 as uuidv4 } from 'uuid'
import { useLocalStorage } from './useLocalStorage'
import { STATUS } from '../constants'
export function useTasks() {
  const [tasks, setTasks] = useLocalStorage('tasks', [])

  const addTask = (taskData) => {
    const newTask = {
      id: uuidv4(),
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority,
      dueDate: taskData.dueDate,
      status: STATUS.PENDING,
      createdAt: new Date().toISOString(),
    }
    setTasks([...tasks, newTask])
  }

  const editTask = (id, updatedData) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ...updatedData } : task
    ))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const toggleStatus = (id) => {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, status: task.status === STATUS.PENDING ? STATUS.COMPLETED : STATUS.PENDING }
        : task
    ))
  }

  return { tasks, addTask, editTask, deleteTask, toggleStatus }
}