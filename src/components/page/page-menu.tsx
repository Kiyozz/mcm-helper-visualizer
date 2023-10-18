import { Button } from '@/components/ui/button.tsx'
import { cn } from '@/lib/utils.ts'
import { hasContentOrCustomContent, isPage } from '@/lib/order-page-content.ts'
import { ChevronRightIcon } from 'lucide-react'
import { useMcmConfig } from '@/hooks/mcm/use-mcm-config.ts'
import { useT } from '@/hooks/use-t.ts'
import { usePage } from '@/hooks/mcm/use-page.ts'
import { isSamePage } from '@/lib/is-same-page.ts'

export default function PageMenu() {
  const mcmConfig = useMcmConfig((s) => s.mcmConfig)
  const t = useT()
  const { page: currentPage, setPage } = usePage()

  if (mcmConfig === undefined) return null

  return (
    <aside className="fixed left-0 flex w-80 flex-col overflow-hidden font-futura">
      <Button
        variant="ghost"
        className={cn(
          'mb-2 flex h-14 items-center justify-end whitespace-nowrap rounded-r-lg bg-accent px-4 text-2xl',
          !hasContentOrCustomContent(mcmConfig) && 'cursor-default',
          mcmConfig.displayName.length > 15 && 'text-xl',
        )}
      >
        {!isPage(currentPage) && <ChevronRightIcon className="h-5 w-5" />}
        {t(mcmConfig.displayName)}
      </Button>
      {mcmConfig.pages?.map((page) => {
        const active = isSamePage(page, currentPage)

        return (
          <Button
            key={page.pageDisplayName}
            className={cn('flex h-9 justify-end whitespace-nowrap rounded-none py-1 text-xl')}
            variant="ghost"
            onClick={() => {
              setPage(page)
            }}
          >
            {active && <ChevronRightIcon className="h-5 w-5" />}
            {t(page.pageDisplayName)}
          </Button>
        )
      })}
    </aside>
  )
}
