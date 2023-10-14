import { Button } from '@/components/ui/button.tsx'
import { open } from '@tauri-apps/api/dialog'
import { useState } from 'react'
import { invoke } from '@tauri-apps/api'
import { McmHelperConfig, McmHelperConfigSchema } from '@/config.ts'
import McmContent from '@/components/mcm/mcm-content.tsx'
import { Translations } from '@/lib/translations.ts'
import McmProvider from '@/hooks/mcm/use-mcm.tsx'

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
    }).then(async (result) => {
      if (Array.isArray(result) || result === null) return

      const fileContent: string | null = await invoke('read_file', { path: result })

      if (fileContent === null) return

      let fileAsJson: unknown

      try {
        fileAsJson = JSON.parse(fileContent)
      } catch (err) {
        // TODO: handle error
        throw err
      }

      const parseResult = McmHelperConfigSchema.safeParse(fileAsJson)

      if (parseResult.success) {
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

      const translations: Record<string, string> | null = await invoke('read_translations', { path: result })

      if (translations === null) return

      setTranslations(new Map(Object.entries(translations)))
    })
  }

  return (
    <>
      <header className="sticky top-0 bg-background">
        <div className="flex justify-between p-4">
          <div className="flex gap-4">
            <Button onClick={onClickLoadConfigJson}>Load config.json</Button>
            <Button variant="secondary" onClick={onClickLoadTranslations}>
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
