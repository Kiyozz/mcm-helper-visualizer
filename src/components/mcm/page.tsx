import { Button } from '@/components/ui/button.tsx'
import { cn } from '@/lib/utils.ts'
import Header from '@/components/mcm/header.tsx'
import Toggle from '@/components/mcm/toggle.tsx'
import Text from '@/components/mcm/text.tsx'
import Slider from '@/components/mcm/slider.tsx'
import Enum from '@/components/mcm/enum.tsx'
import { useMcm } from '@/hooks/mcm/use-mcm.tsx'
import { ChevronRightIcon } from 'lucide-react'
import { orderPageContent } from '@/lib/order-page-content.ts'

export default function Page() {
  const {
    mcmConfig,
    currentPage: [currentPage, setCurrentPage],
    t,
  } = useMcm()

  const pageContentToUse = orderPageContent(currentPage)

  console.log(pageContentToUse)

  return (
    <div className="flex flex-col">
      <header className="font-fertigo pl-52 text-center text-2xl uppercase">{t(currentPage?.pageDisplayName ?? mcmConfig.displayName)}</header>
      <div className="flex h-full grow py-8">
        <aside className="font-fertigo flex w-52 flex-col overflow-hidden">
          {mcmConfig.pages?.map((page) => {
            const active = page === currentPage

            return (
              <Button
                key={page.pageDisplayName}
                className={cn('flex justify-end whitespace-nowrap rounded-none text-xl')}
                variant="ghost"
                onClick={() => {
                  setCurrentPage(page)
                }}
              >
                {active && <ChevronRightIcon className="h-5 w-5" />}
                {t(page.pageDisplayName)}
              </Button>
            )
          })}
        </aside>
        <main className="font-fertigo flex grow flex-col px-4 text-xl text-slate-300">
          {currentPage && pageContentToUse && (
            <div className={cn('grid divide-x-2', pageContentToUse.length === 2 ? 'grid-cols-2' : 'grid-cols-1')}>
              {pageContentToUse.map((contentColumn, i) => {
                if (contentColumn === undefined) return null

                return (
                  <div key={i} className="flex flex-col gap-2 pl-8 first:pl-0 first:pr-8">
                    {contentColumn.map((control, i) => {
                      switch (control.type) {
                        case 'header':
                          return <Header key={i} control={control} />
                        case 'toggle':
                          return <Toggle key={i} control={control} />
                        case 'text':
                          return <Text key={i} control={control} />
                        case 'slider':
                          return <Slider key={i} control={control} />
                        case 'enum':
                          return <Enum key={i} control={control} />
                        default:
                          return (
                            <div key={i} className="flex h-8 items-center pl-3">
                              {control.type}
                            </div>
                          )
                      }
                    })}
                  </div>
                )
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
