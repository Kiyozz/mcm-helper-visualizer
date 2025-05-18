import { invoke } from '@tauri-apps/api/core'

export async function readTranslationsFromPath(path: string) {
  const translations: Record<string, string> | null = await invoke('read_translations', { path })

  if (translations === null) return

  return new Map(Object.entries(translations))
}
