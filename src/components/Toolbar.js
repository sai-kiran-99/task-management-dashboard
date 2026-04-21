export default function Toolbar({ onNewTask, searchQuery, onSearch, statusFilter, onStatusFilter, priorityFilter, onPriorityFilter }) {
  return (
    <div className="px-4 md:px-6 py-3 flex flex-col gap-3">
      {/* Top row — search + new task button */}
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={e => onSearch(e.target.value)}
          className="flex-1 min-w-0 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={onNewTask}
          className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          + New Task
        </button>
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Status:</span>
        {['All', 'Pending', 'Completed'].map(s => (
          <button
            key={s}
            onClick={() => onStatusFilter(s)}
            className={`text-xs px-3 py-1 rounded-full border transition-colors ${
              statusFilter === s
                ? 'bg-blue-600 text-white border-blue-600'
                : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {s}
          </button>
        ))}
        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium ml-2">Priority:</span>
        {['All', 'Low', 'Medium', 'High'].map(p => (
          <button
            key={p}
            onClick={() => onPriorityFilter(p)}
            className={`text-xs px-3 py-1 rounded-full border transition-colors ${
              priorityFilter === p
                ? 'bg-blue-600 text-white border-blue-600'
                : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  )
}