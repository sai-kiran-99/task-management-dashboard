import { createContext, useContext } from 'react'
import { useTasks } from '../hooks/useTasks'

const TaskContext = createContext(null)

export function TaskProvider({ children }) {
  const taskData = useTasks()
  return (
    <TaskContext.Provider value={taskData}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTaskContext() {
  return useContext(TaskContext)
}