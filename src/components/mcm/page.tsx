import { McmHelperConfig, McmPage } from '@/config.ts'
import { Button } from '@/components/ui/button.tsx'
import { Dispatch, SetStateAction } from 'react'
import { cn } from '@/lib/utils.ts'
import Header from '@/components/mcm/header.tsx'
import Toggle from '@/components/mcm/toggle.tsx'
import Text from '@/components/mcm/text.tsx'
import Slider from '@/components/mcm/slider.tsx'
import Enum from '@/components/mcm/enum.tsx'

export default function Page({
  mcmConfig,
  currentPage: [currentPage, setCurrentPage],
}: {
  mcmConfig: McmHelperConfig
  currentPage: [McmPage | undefined, Dispatch<SetStateAction<McmPage | undefined>>]
}) {
  return (
    <div className="flex flex-col">
      <header className="text-center font-semibold">{mcmConfig.displayName}</header>
      <div className="flex h-full grow py-8">
        <aside className="flex w-52 flex-col overflow-hidden ">
          {mcmConfig.pages?.map((page) => {
            const active = page === currentPage

            return (
              <Button
                key={page.pageDisplayName}
                className={cn('flex justify-start rounded-none', active && 'bg-accent')}
                variant="ghost"
                onClick={() => {
                  setCurrentPage(page)
                }}
              >
                {page.pageDisplayName}
              </Button>
            )
          })}
        </aside>
        <main className="flex grow flex-col px-4 text-lg text-slate-300">
          {currentPage && 'content' in currentPage && (
            <div className="flex flex-col gap-2">
              {currentPage.content.map((control, i) => {
                switch (control.type) {
                  case 'header':
                    return <Header key={i} mcmConfig={mcmConfig} control={control} />
                  case 'toggle':
                    return <Toggle key={i} mcmConfig={mcmConfig} control={control} />
                  case 'text':
                    return <Text key={i} mcmConfig={mcmConfig} control={control} />
                  case 'slider':
                    return <Slider key={i} mcmConfig={mcmConfig} control={control} />
                  case 'enum':
                    return <Enum key={i} mcmConfig={mcmConfig} control={control} />
                  default:
                    return (
                      <div key={i} className="flex h-8 items-center pl-3">
                        {control.type}
                      </div>
                    )
                }
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
