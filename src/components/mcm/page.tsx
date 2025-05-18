import Color from '@/components/mcm/color.tsx'
import Empty from '@/components/mcm/empty.tsx'
import Enum from '@/components/mcm/enum.tsx'
import Header from '@/components/mcm/header.tsx'
import HiddenToggle from '@/components/mcm/hidden-toggle.tsx'
import Input from '@/components/mcm/input.tsx'
import Keymap from '@/components/mcm/keymap.tsx'
import Menu from '@/components/mcm/menu.tsx'
import Slider from '@/components/mcm/slider.tsx'
import Stepper from '@/components/mcm/stepper.tsx'
import Text from '@/components/mcm/text.tsx'
import Toggle from '@/components/mcm/toggle.tsx'
import PageMenu from '@/components/page/page-menu.tsx'
import { useMcmConfig } from '@/hooks/mcm/use-mcm-config.ts'
import { usePage } from '@/hooks/mcm/use-page.ts'
import { useOrderedPage } from '@/hooks/use-ordered-page.ts'
import { useT } from '@/hooks/use-t.ts'
import { isPage } from '@/lib/order-page-content.ts'
import { cn } from '@/lib/utils.ts'

export default function Page() {
  const t = useT()
  const mcmConfig = useMcmConfig((s) => s.mcmConfig)
  const page = usePage((s) => s.page)
  const pageContentToUse = useOrderedPage()

  if (mcmConfig === undefined) return null

  return (
    <div className="flex flex-col">
      <header className="sticky top-[4.5rem] left-1/2 z-10 w-full bg-background pl-52 text-center font-futura text-3xl uppercase">
        {t((isPage(page) ? page?.pageDisplayName : undefined) ?? mcmConfig.displayName)}
      </header>
      <div className="flex h-full grow pt-[4.25rem] pb-24">
        <PageMenu />
        <main className="mt-14 flex grow flex-col pr-4 pl-[21rem] font-futura text-slate-300 text-xl">
          {Array.isArray(pageContentToUse) && (
            <div className={cn('grid divide-x-2', pageContentToUse.length === 2 ? 'grid-cols-2' : 'grid-cols-1')}>
              {pageContentToUse.map((contentColumn, i) => {
                if (contentColumn === undefined) return null

                return (
                  <div key={i} className="flex flex-col pl-8 first:pr-8 first:pl-0">
                    {contentColumn.map((control, index) => {
                      const isAfterHeader = contentColumn.some((c, cIndex) => {
                        return c.type === 'header' && cIndex < index
                      })

                      switch (control.type) {
                        case 'header':
                          return <Header key={`${index}-${control.text}`} control={control} />
                        case 'toggle':
                          return (
                            <Toggle key={`${index}-${control.text}`} isAfterHeader={isAfterHeader} control={control} />
                          )
                        case 'text':
                          return (
                            <Text key={`${index}-${control.text}`} isAfterHeader={isAfterHeader} control={control} />
                          )
                        case 'slider':
                          return (
                            <Slider key={`${index}-${control.text}`} isAfterHeader={isAfterHeader} control={control} />
                          )
                        case 'enum':
                          return (
                            <Enum key={`${index}-${control.text}`} isAfterHeader={isAfterHeader} control={control} />
                          )
                        case 'keymap':
                          return (
                            <Keymap key={`${index}-${control.text}`} isAfterHeader={isAfterHeader} control={control} />
                          )
                        case 'empty':
                          return <Empty key={`${index}-empty`} control={control} />
                        case 'hiddenToggle':
                          return (
                            <HiddenToggle
                              key={`${index}-${control.text}`}
                              isAfterHeader={isAfterHeader}
                              control={control}
                            />
                          )
                        case 'input':
                          return (
                            <Input key={`${index}-${control.text}`} isAfterHeader={isAfterHeader} control={control} />
                          )
                        case 'color':
                          return (
                            <Color key={`${index}-${control.text}`} isAfterHeader={isAfterHeader} control={control} />
                          )
                        case 'stepper':
                          return (
                            <Stepper key={`${index}-${control.text}`} isAfterHeader={isAfterHeader} control={control} />
                          )
                        case 'menu':
                          return (
                            <Menu key={`${index}-${control.text}`} isAfterHeader={isAfterHeader} control={control} />
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
