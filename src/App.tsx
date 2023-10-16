import { Button } from '@/components/ui/button.tsx'
import { open } from '@tauri-apps/api/dialog'
import * as path from '@tauri-apps/api/path'
import { useState } from 'react'
import { McmHelperConfig, McmHelperConfigSchema } from '@/config.ts'
import McmContent from '@/components/mcm/mcm-content.tsx'
import { Translations } from '@/lib/translations.ts'
import McmProvider from '@/hooks/mcm/use-mcm.tsx'
import { invoke } from '@tauri-apps/api'

async function readTranslationsFromPath(path: string) {
  const translations: Record<string, string> | null = await invoke('read_translations', { path })

  if (translations === null) return

  return new Map(Object.entries(translations))
}

async function readConfigFromPath(path: string) {
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

async function pathExists(path: string) {
  return await invoke('path_exists', { path })
}

function App() {
  const [mcmConfig, setMcmConfig] = useState<McmHelperConfig>()
  const [translations, setTranslations] = useState<Translations>()

  async function onClickLoadConfigJson() {
    open({
      directory: false,
      filters: [
        {
          name: 'config.json',
          extensions: ['json'],
        },
      ],
      multiple: false,
      title: 'Load config.json',
    }).then(async (configPath) => {
      if (Array.isArray(configPath) || configPath === null) return

      const fileAsJson = await readConfigFromPath(configPath)

      const parseResult = McmHelperConfigSchema.safeParse(fileAsJson)

      if (parseResult.success) {
        try {
          const modName = await path.basename(await path.dirname(configPath))
          const translationsFile = await path.resolve(configPath, '../../../../Interface/Translations', `${modName}_english.txt`)

          if (!(await pathExists(translationsFile))) {
            console.log('Translations file does not exist for this config.json')

            return
          }

          const translations = await readTranslationsFromPath(translationsFile)

          setTranslations(translations)
        } catch (error) {
          console.error(error)
        }

        setMcmConfig(parseResult.data)
      } else {
        // TODO: handle error
        console.log(parseResult.error)
      }
    })
  }

  async function onClickLoadTranslations() {
    open({
      directory: false,
      filters: [
        {
          name: 'Translation file',
          extensions: ['txt'],
        },
      ],
      multiple: false,
    }).then(async (result) => {
      if (Array.isArray(result) || result === null) return

      setTranslations(await readTranslationsFromPath(result))
    })
  }

  return (
    <>
      <header className="sticky top-0 bg-background">
        <div className="flex justify-between p-4">
          <div className="flex gap-4">
            <Button onClick={onClickLoadConfigJson}>Load config.json</Button>
            <Button variant="secondary" onClick={onClickLoadTranslations} disabled={mcmConfig === undefined}>
              Load Translations
            </Button>
          </div>
          <Button variant="ghost">Refresh</Button>
        </div>
      </header>

      {mcmConfig && (
        <McmProvider mcmConfig={mcmConfig} translations={translations}>
          <McmContent />
        </McmProvider>
      )}
    </>
  )
}

export default App
