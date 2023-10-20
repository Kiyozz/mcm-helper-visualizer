import { useMcmConfig } from '@/hooks/mcm/use-mcm-config.ts'
import LoadConfigButton from '@/components/header/load-config-button.tsx'
import LoadTranslationsButton from '@/components/header/load-translations-button.tsx'
import ReloadChangesButton from '@/components/header/reload-changes-button.tsx'
import SimulationSelect from '@/components/header/simutation-select.tsx'

export default function Header() {
  const { mcmConfig } = useMcmConfig()

  return (
    <header>
      <div className="flex gap-4 p-4">
        <LoadConfigButton />
        {mcmConfig !== undefined && (
          <>
            <LoadTranslationsButton />
            <ReloadChangesButton />
            <SimulationSelect />
          </>
        )}
      </div>
    </header>
  )
}
