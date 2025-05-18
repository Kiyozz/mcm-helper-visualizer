import { Button } from '@/components/ui/button.tsx'
import { useMcmConfig } from '@/hooks/mcm/use-mcm-config.ts'
import { useSimulation } from '@/hooks/mcm/use-simulation.ts'
import { useLoadConfig } from '@/hooks/use-load-config.tsx'
import { open } from '@tauri-apps/plugin-dialog'

export default function LoadConfigButton() {
  const loadConfig = useLoadConfig()
  const setGroups = useSimulation((s) => s.setGroups)
  const mcmConfig = useMcmConfig((s) => s.mcmConfig)
  const setMcmConfig = useMcmConfig((s) => s.setMcmConfig)

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
      title: 'Mcm config.json',
    }).then(async (configPath) => {
      if (Array.isArray(configPath) || configPath === null) return

      setMcmConfig(undefined)

      await loadConfig(configPath)

      setGroups(undefined)
    })
  }

  return (
    <Button onClick={onClickLoadConfigJson} size={mcmConfig === undefined ? 'lg' : undefined}>
      Load config.json
    </Button>
  )
}
