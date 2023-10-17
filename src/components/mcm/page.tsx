import { Button } from '@/components/ui/button.tsx'
import { cn } from '@/lib/utils.ts'
import Header from '@/components/mcm/header.tsx'
import Toggle from '@/components/mcm/toggle.tsx'
import Text from '@/components/mcm/text.tsx'
import Slider from '@/components/mcm/slider.tsx'
import Enum from '@/components/mcm/enum.tsx'
import { useMcm } from '@/hooks/mcm/use-mcm.tsx'
import { ChevronRightIcon } from 'lucide-react'
import { hasContentOrCustomContent, isPage, orderPageContent } from '@/lib/order-page-content.ts'
import Keymap from '@/components/mcm/keymap.tsx'
import Empty from '@/components/mcm/empty.tsx'
import HiddenToggle from '@/components/mcm/hidden-toggle.tsx'
import Input from '@/components/mcm/input.tsx'
import Color from '@/components/mcm/color.tsx'
import Stepper from '@/components/mcm/stepper.tsx'
import Menu from '@/components/mcm/menu.tsx'

export default function Page() {
  const {
    mcmConfig,
    currentPage: [currentPage, setCurrentPage],
    t,
  } = useMcm()

  const pageContentToUse = orderPageContent(currentPage)

  return (
    <div className="flex flex-col">
      <header className="font-futura pl-52 text-center text-3xl uppercase">
        {t((isPage(currentPage) ? currentPage?.pageDisplayName : undefined) ?? mcmConfig.displayName)}
      </header>
      <div className="grid h-full grow grid-cols-[20rem_1fr] py-8">
        <aside className="font-futura flex flex-col overflow-hidden">
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
            const active = page.pageDisplayName === (isPage(currentPage) && currentPage.pageDisplayName)

            return (
              <Button
                key={page.pageDisplayName}
                className={cn('flex h-9 justify-end whitespace-nowrap rounded-none py-1 text-xl')}
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
        <main className="font-futura mt-14 flex grow flex-col px-4 text-xl text-slate-300">
          {isPage(currentPage) && Array.isArray(pageContentToUse) && (
            <div className={cn('grid divide-x-2', pageContentToUse.length === 2 ? 'grid-cols-2' : 'grid-cols-1')}>
              {pageContentToUse.map((contentColumn, i) => {
                if (contentColumn === undefined) return null

                return (
                  <div key={i} className="flex flex-col pl-8 first:pl-0 first:pr-8">
                    {contentColumn.map((control, i) => {
                      const isAfterHeader = contentColumn.some((c, cI) => {
                        return c.type === 'header' && cI < i
                      })

                      switch (control.type) {
                        case 'header':
                          return <Header key={`${i}-${control.text}`} control={control} />
                        case 'toggle':
                          return <Toggle key={`${i}-${control.text}`} isAfterHeader={isAfterHeader} control={control} />
                        case 'text':
                          return <Text key={`${i}-${control.text}`} isAfterHeader={isAfterHeader} control={control} />
                        case 'slider':
                          return <Slider key={`${i}-${control.text}`} isAfterHeader={isAfterHeader} control={control} />
                        case 'enum':
                          return <Enum key={`${i}-${control.text}`} isAfterHeader={isAfterHeader} control={control} />
                        case 'keymap':
                          return <Keymap key={`${i}-${control.text}`} isAfterHeader={isAfterHeader} control={control} />
                        case 'empty':
                          return <Empty key={`${i}-empty`} control={control} />
                        case 'hiddenToggle':
                          return <HiddenToggle key={`${i}-${control.text}`} isAfterHeader={isAfterHeader} control={control} />
                        case 'input':
                          return <Input key={`${i}-${control.text}`} isAfterHeader={isAfterHeader} control={control} />
                        case 'color':
                          return <Color key={`${i}-${control.text}`} isAfterHeader={isAfterHeader} control={control} />
                        case 'stepper':
                          return <Stepper key={`${i}-${control.text}`} isAfterHeader={isAfterHeader} control={control} />
                        case 'menu':
                          return <Menu key={`${i}-${control.text}`} isAfterHeader={isAfterHeader} control={control} />
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
