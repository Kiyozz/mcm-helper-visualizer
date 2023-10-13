import { Button } from '@/components/ui/button.tsx'
import { open } from '@tauri-apps/api/dialog'
import { useState } from 'react'
import { invoke } from '@tauri-apps/api'
import { McmHelperConfig, McmHelperConfigSchema } from '@/config.ts'
import McmContent from '@/components/mcm/mcm-content.tsx'

function App() {
  const [mcmConfig, setMcmConfig] = useState<McmHelperConfig>()

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

  return (
    <>
      <header className="sticky top-0 bg-background">
        <div className="flex justify-between">
          <Button className="m-4" onClick={onClickLoadConfigJson}>
            Load config.json
          </Button>
          <Button className="m-4" variant="ghost">
            Refresh
          </Button>
        </div>
      </header>

      {mcmConfig && <McmContent mcmConfig={mcmConfig} />}
    </>
  )
}

export default App
