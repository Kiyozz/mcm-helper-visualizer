import { cn } from '@/lib/utils.ts'
import Header from '@/components/mcm/header.tsx'
import Toggle from '@/components/mcm/toggle.tsx'
import Text from '@/components/mcm/text.tsx'
import Slider from '@/components/mcm/slider.tsx'
import Enum from '@/components/mcm/enum.tsx'
import { isPage } from '@/lib/order-page-content.ts'
import Keymap from '@/components/mcm/keymap.tsx'
import Empty from '@/components/mcm/empty.tsx'
import HiddenToggle from '@/components/mcm/hidden-toggle.tsx'
import Input from '@/components/mcm/input.tsx'
import Color from '@/components/mcm/color.tsx'
import Stepper from '@/components/mcm/stepper.tsx'
import Menu from '@/components/mcm/menu.tsx'
import { useOrderedPage } from '@/hooks/use-ordered-page.ts'
import { useT } from '@/hooks/use-t.ts'
import { usePage } from '@/hooks/mcm/use-page.ts'
import { useMcmConfig } from '@/hooks/mcm/use-mcm-config.ts'
import PageMenu from '@/components/page/page-menu.tsx'

export default function Page() {
  const t = useT()
  const mcmConfig = useMcmConfig((s) => s.mcmConfig)
  const page = usePage((s) => s.page)
  const pageContentToUse = useOrderedPage()

  if (mcmConfig === undefined) return null

  return (
    <div className="flex flex-col">
      <header className="fixed left-1/2 top-[4.5rem] w-full -translate-x-1/2 bg-background pl-52 text-center font-futura text-3xl uppercase">
        {t((isPage(page) ? page?.pageDisplayName : undefined) ?? mcmConfig.displayName)}
      </header>
      <div className="flex h-full grow pb-24 pt-[4.25rem]">
        <PageMenu />
        <main className="mt-14 flex grow flex-col pl-[21rem] pr-4 font-futura text-xl text-slate-300">
          {isPage(page) && Array.isArray(pageContentToUse) && (
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
