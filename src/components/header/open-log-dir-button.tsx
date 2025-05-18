import { Button } from '@/components/ui/button.tsx'
import { useMcmConfig } from '@/hooks/mcm/use-mcm-config.ts'
import { openLogDir } from '@/ipc/open_log_dir.ts'

export function OpenLogDirButton() {
  const mcmConfig = useMcmConfig((s) => s.mcmConfig)

  return (
    <Button
      onClick={async () => {
        await openLogDir()
      }}
      size={mcmConfig === undefined ? 'lg' : undefined}
    >
      Open Logs
    </Button>
  )
}
