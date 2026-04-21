import { useState, useEffect } from 'react'
import { useTaskContext } from '../context/TaskContext'
import { PRIORITY } from '../constants'
import Modal from './Modal'

const emptyForm = () => ({
  title: '',
  description: '',
  priority: PRIORITY.MEDIUM,
  dueDate: '',
})

export default function TaskModal({ taskToEdit, onClose }) {
  const { addTask, editTask } = useTaskContext()
  const isEditing = Boolean(taskToEdit)
  const [formData, setFormData] = useState(emptyForm)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title,
        description: taskToEdit.description,
        priority: taskToEdit.priority,
        dueDate: taskToEdit.dueDate,
      })
    } else {
      setFormData(emptyForm())
    }
    setErrors({})
  }, [taskToEdit])

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = () => {
    const next = {}
    if (!formData.title.trim()) next.title = 'Title is required'
    if (!formData.dueDate) next.dueDate = 'Due date is required'
    if (Object.keys(next).length) {
      setErrors(next)
      return
    }
    isEditing ? editTask(taskToEdit.id, formData) : addTask(formData)
    onClose()
  }

  return (
    <Modal
      onClose={onClose}
      title={isEditing ? 'Edit Task' : 'Create New Task'}
      footer={(
        <div className="modal-footer">
          <button type="button" onClick={onClose} className="btn-muted">Cancel</button>
          <button type="button" onClick={handleSubmit} className="btn-primary">
            {isEditing ? 'Save Changes' : 'Create Task'}
          </button>
        </div>
      )}
    >
      <div className="flex flex-col gap-4 px-6 py-4">
        <div>
          <label className="field-label">Title <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title"
            className={`field-input ${errors.title ? 'field-input--error' : ''}`}
          />
          {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
        </div>
        <div>
          <label className="field-label">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter task description (optional)"
            rows={3}
            className="field-input resize-none"
          />
        </div>
        <div>
          <label className="field-label">Priority</label>
          <select name="priority" value={formData.priority} onChange={handleChange} className="field-input">
            {Object.values(PRIORITY).map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="field-label">Due Date <span className="text-red-500">*</span></label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className={`field-input ${errors.dueDate ? 'field-input--error' : ''}`}
          />
          {errors.dueDate && <p className="mt-1 text-xs text-red-500">{errors.dueDate}</p>}
        </div>
      </div>
    </Modal>
  )
}
