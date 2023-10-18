import { invoke } from '@tauri-apps/api'

export async function readFile(path: string) {
  const fileContent: string | null = await invoke('read_file', { path })

  if (fileContent === null) return

  let fileAsJson: unknown

  try {
    fileAsJson = JSON.parse(fileContent)
  } catch (err) {
    // TODO: handle error
    throw err
  }

  return fileAsJson
}
