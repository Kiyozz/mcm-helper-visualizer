import { invoke } from '@tauri-apps/api'

export async function pathExists(path: string) {
  return await invoke('path_exists', { path })
}
