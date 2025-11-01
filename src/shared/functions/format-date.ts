export function formatDate(date: Date, config?: Intl.DateTimeFormatOptions) {
  const formatted = new Date(`${date}T00:00:00`)

  return formatted.toLocaleDateString("pt-BR", config)
}