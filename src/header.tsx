import { cn } from '@/lib/utils.ts'
import { useMcmConfig } from '@/hooks/mcm/use-mcm-config.ts'
import LoadConfigButton from '@/components/header/load-config-button.tsx'
import LoadTranslationsButton from '@/components/header/load-translations-button.tsx'
import ReloadChangesButton from '@/components/header/reload-changes-button.tsx'
import SimulationSelect from '@/components/header/simutation-select.tsx'
import Welcome from '@/components/app/welcome.tsx'

export default function Header() {
  const { mcmConfig } = useMcmConfig()

  return (
    <header className={cn(mcmConfig === undefined ? 'flex h-screen flex-col items-center justify-center' : 'sticky top-0 bg-background')}>
      {mcmConfig === undefined && <Welcome />}
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
