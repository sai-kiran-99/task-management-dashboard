export default function ConfirmDialog({ task, onConfirm, onCancel }) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-sm">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Delete Task</h2>
          </div>
  
          {/* Body */}
          <div className="px-6 py-4">
            <p className="text-gray-600 text-sm">
              Are you sure you want to delete{' '}
              <span className="font-semibold text-gray-800">"{task.title}"</span>?
              This action cannot be undone.
            </p>
          </div>
  
          {/* Footer */}
          <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    )
  }