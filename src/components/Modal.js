/** Shared modal shell: dimmed backdrop + panel. */
export default function Modal({ onClose, title, showClose = true, maxWidth = 'md', children, footer }) {
  const max = maxWidth === 'sm' ? 'max-w-sm' : 'max-w-md'
  return (
    <div
      role="presentation"
      className="fixed inset-0 z-50 flex max-h-screen items-center justify-center overflow-y-auto bg-black/50 px-4 py-8"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className={`my-auto w-full ${max} rounded-xl bg-white shadow-xl dark:bg-gray-800`}>
        {(title != null || showClose) && (
          <div className="flex items-center justify-between gap-4 border-b border-gray-200 px-6 py-4 dark:border-gray-700">
            {title != null && (
              <h2 className="flex-1 text-lg font-semibold text-gray-800 dark:text-white">{title}</h2>
            )}
            {showClose && (
              <button type="button" onClick={onClose} className="text-xl font-bold text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                ✕
              </button>
            )}
          </div>
        )}
        {children}
        {footer}
      </div>
    </div>
  )
}
