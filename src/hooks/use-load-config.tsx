import { readFile } from '@/lib/read-file.ts'
import { McmHelperConfigSchema } from '@/config.ts'
import * as path from '@tauri-apps/api/path'
import { pathExists } from '@/lib/path-exists.ts'
import { readTranslationsFromPath } from '@/lib/read-translations-from-path.ts'
import { useMcmConfig } from '@/hooks/mcm/use-mcm-config.ts'
import { useTranslations } from '@/hooks/use-translations.ts'
import { useCallback } from 'react'
import { useToast } from '@/components/ui/use-toast.ts'
import { logText } from '@/lib/log-text.ts'

export function useLoadConfig() {
  const { setMcmConfig, setLastMcmConfigPath } = useMcmConfig((s) => ({
    setMcmConfig: s.setMcmConfig,
    setLastMcmConfigPath: s.setLastMcmConfigPath,
  }))
  const toast = useToast()

  const setTranslations = useTranslations((s) => s.setTranslations)

  return useCallback(
    async (configPath: string) => {
      await logText(`Loading config.json from "${configPath}"`)

      const fileAsJson = await readFile(configPath)

      const parseResult = McmHelperConfigSchema.safeParse(fileAsJson)

      if (parseResult.success) {
        const modName = await path.basename(await path.dirname(configPath))
        const translationsFile = await path.resolve(configPath, '../../../../Interface/Translations', `${modName}_english.txt`)

        try {
          if (await pathExists(translationsFile)) {
            await logText('Translations file has been detected and will be loaded.')

            const translations = await readTranslationsFromPath(translationsFile)

            toast.toast({
              title: 'Translations',
              description: <span>The translations file has been loaded.</span>,
            })

            setTranslations(translations)
          } else {
            console.log('Translations file does not exist for this config.json')
            await logText(`Translations file "${translationsFile}" does not exist for this config.json`, 'warn')
            toast.toast({
              title: 'Translations',
              description: <span>This config.json does not have any translations. If not expected, check the logs.</span>,
            })
            setTranslations(undefined)
          }
        } catch (error) {
          console.error(error)

          await logText(`Translations file has been detected but cannot be loaded: "${translationsFile}"`, 'error')
        }

        setLastMcmConfigPath(configPath)
        setMcmConfig(parseResult.data)
      } else {
        console.log(parseResult.error, parseResult.error.errors)
        await logText('Cannot parse config.json. The config file does not meet the McmHelper format.', 'error')
        toast.toast({
          title: 'Error',
          description: <span className="text-destructive-foreground">Invalid config.json. Check the logs.</span>,
        })
      }
    },
    [setMcmConfig, setLastMcmConfigPath, setTranslations],
  )
}
