import { Button } from '@/components/ui/button.tsx'
import { open } from '@tauri-apps/api/dialog'
import { useLoadConfig } from '@/hooks/use-load-config.tsx'
import { useSimulation } from '@/hooks/mcm/use-simulation.ts'
import { useMcmConfig } from '@/hooks/mcm/use-mcm-config.ts'

export default function LoadConfigButton() {
  const loadConfig = useLoadConfig()
  const setGroups = useSimulation((s) => s.setGroups)
  const { mcmConfig, setMcmConfig } = useMcmConfig((s) => ({ setMcmConfig: s.setMcmConfig, mcmConfig: s.mcmConfig }))

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
