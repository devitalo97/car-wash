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

function formatShortDate(date: Date) {
  return date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  });
}

function formatPriceFromCents(price: number) {
  return (price / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export {
  formatDate, formatTime, formatShortDate, formatPriceFromCents,
  formatBytes
}