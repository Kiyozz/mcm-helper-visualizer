import { Button } from '@/components/ui/button.tsx'
import { open } from '@tauri-apps/api/dialog'
import * as path from '@tauri-apps/api/path'
import { useState } from 'react'
import { McmHelperConfig, McmHelperConfigSchema } from '@/config.ts'
import McmContent from '@/components/mcm/mcm-content.tsx'
import { Translations } from '@/lib/translations.ts'
import McmProvider from '@/hooks/mcm/use-mcm.tsx'
import { invoke } from '@tauri-apps/api'
import { cn } from '@/lib/utils.ts'
import { highestGroupConditionInConfig } from '@/lib/highest-group-condition-in-config.ts'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx'
import { CheckIcon, ChevronDownIcon } from 'lucide-react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command.tsx'

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
  const [lastMcmConfigPath, setLastMcmConfigPath] = useState<string>()
  const [mcmConfig, setMcmConfig] = useState<McmHelperConfig>()
  const [translations, setTranslations] = useState<Translations>()
  const simulatedGroupControl = useState<number[]>()
  const setSimulatedGroupControl = simulatedGroupControl[1]

  async function loadConfig(configPath: string) {
    setMcmConfig(undefined)
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

      setLastMcmConfigPath(configPath)
      setMcmConfig(parseResult.data)
    } else {
      // TODO: handle error
      console.log(parseResult.error)
    }
  }

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

      await loadConfig(configPath)

      setSimulatedGroupControl(undefined)
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

  async function onClickReloadChanges() {
    if (!lastMcmConfigPath) return

    await loadConfig(lastMcmConfigPath)

    setSimulatedGroupControl(undefined)
  }

  const highestCondition = highestGroupConditionInConfig(mcmConfig)

  return (
    <>
      <header className={cn(mcmConfig === undefined ? 'flex h-screen flex-col items-center justify-center' : 'sticky top-0 bg-background')}>
        {mcmConfig === undefined && <h1 className="text-xl">Welcome to McmHelper Visualizer. Load your McmHelper config.json here</h1>}
        <div className="flex gap-4 p-4">
          <Button onClick={onClickLoadConfigJson} size={mcmConfig === undefined ? 'lg' : undefined}>
            Load config.json
          </Button>
          {mcmConfig && (
            <>
              <Button onClick={onClickLoadTranslations} variant="secondary">
                Load translations
              </Button>
              <Button variant="ghost" onClick={onClickReloadChanges}>
                Reload changes
              </Button>
              {highestCondition !== undefined && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" className="min-w-[200px] justify-between">
                      {simulatedGroupControl[0] === undefined || simulatedGroupControl[0].length === 0
                        ? 'Simulation'
                        : `Simulating ${simulatedGroupControl[0].join(', ')}`}
                      <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Group Control" />
                      <CommandEmpty>This group control is not in this page</CommandEmpty>
                      <CommandGroup>
                        {new Array(highestCondition).fill(null).map((_, index) => {
                          const groupControl = index + 1

                          return (
                            <CommandItem
                              key={groupControl}
                              value={`${groupControl}`}
                              onSelect={() => {
                                if (simulatedGroupControl[0]?.includes(groupControl)) {
                                  setSimulatedGroupControl(simulatedGroupControl[0].filter((g) => g !== groupControl))

                                  return
                                }

                                setSimulatedGroupControl([...(simulatedGroupControl[0] ?? []), groupControl].sort((a, b) => a - b))
                              }}
                            >
                              <CheckIcon className={cn('mr-2 h-4 w-4', simulatedGroupControl[0]?.includes(groupControl) ? 'opacity-100' : 'opacity-0')} />
                              {groupControl}
                            </CommandItem>
                          )
                        })}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              )}
            </>
          )}
        </div>
      </header>

      {mcmConfig && (
        <McmProvider mcmConfig={mcmConfig} translations={translations} simulatedGroupControl={simulatedGroupControl}>
          <McmContent />
        </McmProvider>
      )}
    </>
  )
}

export default App
