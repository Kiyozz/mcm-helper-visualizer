import { readFile } from '@/lib/read-file.ts'
import { McmHelperConfigSchema } from '@/config.ts'
import * as path from '@tauri-apps/api/path'
import { pathExists } from '@/lib/path-exists.ts'
import { readTranslationsFromPath } from '@/lib/read-translations-from-path.ts'
import { useMcmConfig } from '@/hooks/mcm/use-mcm-config.ts'
import { useTranslations } from '@/hooks/use-translations.ts'
import { useCallback } from 'react'
import { useToast } from '@/components/ui/use-toast.ts'

export function useLoadConfig() {
  const { setMcmConfig, setLastMcmConfigPath } = useMcmConfig((s) => ({
    setMcmConfig: s.setMcmConfig,
    setLastMcmConfigPath: s.setLastMcmConfigPath,
  }))
  const toast = useToast()

  const setTranslations = useTranslations((s) => s.setTranslations)

  return useCallback(
    async (configPath: string) => {
      const fileAsJson = await readFile(configPath)

      const parseResult = McmHelperConfigSchema.safeParse(fileAsJson)

      if (parseResult.success) {
        try {
          const modName = await path.basename(await path.dirname(configPath))
          const translationsFile = await path.resolve(configPath, '../../../../Interface/Translations', `${modName}_english.txt`)

          if (!(await pathExists(translationsFile))) {
            console.log('Translations file does not exist for this config.json')
            toast.toast({
              title: 'Translations',
              description: <span>The translations file does not exists. Check the logs.</span>,
            })

            return
          }

          const translations = await readTranslationsFromPath(translationsFile)

          toast.toast({
            title: 'Translations',
            description: <span>The translations file has been loaded.</span>,
          })

          setTranslations(translations)
        } catch (error) {
          console.error(error)
        }

        setLastMcmConfigPath(configPath)
        setMcmConfig(parseResult.data)
      } else {
        console.log(parseResult.error)
        toast.toast({
          title: 'Error',
          description: <span className="text-destructive-foreground">Invalid config.json. Check the logs.</span>,
        })
      }
    },
    [setMcmConfig, setLastMcmConfigPath, setTranslations],
  )
}
