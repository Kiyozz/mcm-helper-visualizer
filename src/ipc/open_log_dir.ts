import { invoke } from '@tauri-apps/api/core'

export function openLogDir(): Promise<void> {
  return invoke('open_log_dir')
}
