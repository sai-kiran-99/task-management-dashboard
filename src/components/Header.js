export default function Header({ viewMode, onViewChange, darkMode, onToggleDark }) {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 md:px-6 py-3 flex items-center justify-between transition-colors">
      <div className="flex items-center gap-2">
        <span className="text-xl">✅</span>
        <h1 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white">Task Manager</h1>
      </div>

      <div className="flex items-center gap-2">
        {/* Dark mode toggle */}
        <button
          onClick={onToggleDark}
          className="text-lg px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>

        {/* View toggle */}
        <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
          <button
            onClick={() => onViewChange('list')}
            className={`px-2 md:px-3 py-1.5 text-xs md:text-sm transition-colors ${
              viewMode === 'list'
                ? 'bg-blue-600 text-white'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            ☰ List
          </button>
          <button
            onClick={() => onViewChange('card')}
            className={`px-2 md:px-3 py-1.5 text-xs md:text-sm transition-colors ${
              viewMode === 'card'
                ? 'bg-blue-600 text-white'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            ⊞ Card
          </button>
        </div>
      </div>
    </header>
  )
}