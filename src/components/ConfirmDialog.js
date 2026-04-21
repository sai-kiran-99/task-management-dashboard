import Modal from './Modal'

export default function ConfirmDialog({ task, onConfirm, onCancel }) {
  return (
    <Modal
      onClose={onCancel}
      title="Delete Task"
      showClose={false}
      maxWidth="sm"
      footer={(
        <div className="modal-footer">
          <button type="button" onClick={onCancel} className="btn-muted">Cancel</button>
          <button type="button" onClick={onConfirm} className="btn-danger">Delete</button>
        </div>
      )}
    >
      <div className="px-6 py-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Are you sure you want to delete{' '}
          <span className="font-semibold text-gray-800 dark:text-white">{`"${task.title}"`}</span>?
          This action cannot be undone.
        </p>
      </div>
    </Modal>
  )
}
