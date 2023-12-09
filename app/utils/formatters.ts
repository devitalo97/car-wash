function formatDate(date: Date) {
  return date.toLocaleDateString('pt-BR', {
    weekday: "long",
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

function formatTime(date: Date) {
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

export {
  formatDate, formatTime
}