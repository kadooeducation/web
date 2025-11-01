export function formatDate(date: Date) {
  const formatted = new Date(`${date}T00:00:00`)

  return formatted.toLocaleDateString()
}