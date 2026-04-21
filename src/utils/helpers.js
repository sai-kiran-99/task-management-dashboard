export function getPriorityClasses(priority) {
    switch (priority) {
      case 'High':   return 'bg-red-100 text-red-700'
      case 'Medium': return 'bg-yellow-100 text-yellow-700'
      case 'Low':    return 'bg-green-100 text-green-700'
      default:       return 'bg-gray-100 text-gray-700'
    }
  }
  
  export function formatDate(dateString) {
    if (!dateString) return '—'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
  }