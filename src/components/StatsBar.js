export default function StatsBar({ total, pending, completed }) {
  return (
    <div className="grid grid-cols-3 gap-3 px-4 md:px-6 py-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-3 md:p-4 border border-gray-200 dark:border-gray-700 text-center">
        <p className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">{total}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Total</p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-3 md:p-4 border border-gray-200 dark:border-gray-700 text-center">
        <p className="text-xl md:text-2xl font-bold text-yellow-500">{pending}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Pending</p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-3 md:p-4 border border-gray-200 dark:border-gray-700 text-center">
        <p className="text-xl md:text-2xl font-bold text-green-500">{completed}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Completed</p>
      </div>
    </div>
  )
}