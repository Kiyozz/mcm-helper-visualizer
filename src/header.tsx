import LoadConfigButton from '@/components/header/load-config-button.tsx'
import LoadTranslationsButton from '@/components/header/load-translations-button.tsx'
import { OpenLogDirButton } from '@/components/header/open-log-dir-button.tsx'
import ReloadChangesButton from '@/components/header/reload-changes-button.tsx'
import SimulationSelect from '@/components/header/simutation-select.tsx'
import { useMcmConfig } from '@/hooks/mcm/use-mcm-config.ts'

export default function Header() {
  const { mcmConfig } = useMcmConfig()

  return (
    <header>
      <div className="flex gap-4 p-4">
        <LoadConfigButton />
        <OpenLogDirButton />
        {mcmConfig !== undefined && (
          <div className="flex gap-4">
            <LoadTranslationsButton />
            <ReloadChangesButton />
            <SimulationSelect />
          </div>
        )}
      </div>
    </header>
  )
}
