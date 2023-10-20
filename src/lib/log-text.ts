import { invoke } from '@tauri-apps/api'

export async function logText(text: string, level?: 'info' | 'warn' | 'error' | 'debug' | 'trace') {
  await invoke('log_text', { text, level })
}
