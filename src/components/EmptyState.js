export default function EmptyState() {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <span className="text-6xl mb-4">📋</span>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">No tasks yet</h2>
        <p className="text-gray-400 text-sm">Click "New Task" to create your first task</p>
      </div>
    )
  }