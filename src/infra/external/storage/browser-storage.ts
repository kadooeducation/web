export interface BrowserStorage {
  get(name: string): string | null
  set(name: string, value: string): void
  delete(name: string): void
}
