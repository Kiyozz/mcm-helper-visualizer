import McmContent from '@/components/page/mcm-content.tsx'
import { Toaster } from '@/components/ui/toaster.tsx'
import Header from '@/header.tsx'
import { useMcmConfig } from '@/hooks/mcm/use-mcm-config.ts'
import Welcome from '@/components/app/welcome.tsx'
import { cn } from '@/lib/utils.ts'

function App() {
  const mcmConfig = useMcmConfig((s) => s.mcmConfig)

  return (
    <>
      <Toaster />
      <div className={cn(mcmConfig === undefined ? 'flex h-screen flex-col items-center justify-center' : 'sticky top-0 bg-background')}>
        {mcmConfig === undefined && <Welcome />}
        <Header />
      </div>
      <McmContent />
    </>
  )
}

export default App
