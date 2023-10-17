import { McmHelperEnum } from '@/config.ts'
import { DiamondIcon } from 'lucide-react'
import { useMcm } from '@/hooks/mcm/use-mcm.tsx'
import { getHexColorFromText, removeColorTagFromText } from '@/lib/color-from-text.tsx'
import ControlTextTooltip from '@/components/mcm/control-text-tooltip.tsx'
import { useHelpTextHandler } from '@/hooks/mcm/use-help-text-handler.tsx'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.tsx'
import { Button } from '@/components/ui/button.tsx'
import { useState } from 'react'
import { cn } from '@/lib/utils.ts'

export default function Enum({ control }: { control: McmHelperEnum }) {
  const { t } = useMcm()
  const text = t(control.text)
  const helpTextHandler = useHelpTextHandler(control.help)
  const { defaultValue, options } = control.valueOptions
  const defaultKeyToUse = options.at(0) ?? options.at(defaultValue === true ? 0 : defaultValue || 0) ?? 'value'
  const [currentValue, setCurrentValue] = useState<string>(defaultKeyToUse)
  const textToUse = t(currentValue)

  return (
    <Dialog
      onOpenChange={(open) => {
        if (open) {
          setCurrentValue(textToUse)
        }
      }}
    >
      <DialogTrigger asChild>
        <button className="flex h-10 cursor-pointer pl-3 text-left" {...helpTextHandler}>
          <ControlTextTooltip controlText={control.text} asChild>
            <span className="grow" style={{ color: getHexColorFromText(text) }}>
              {removeColorTagFromText(text)}
            </span>
          </ControlTextTooltip>
          <span className="flex items-center gap-2 uppercase">
            <DiamondIcon className="mt-1 h-3 w-3 fill-foreground" />
            {removeColorTagFromText(textToUse)}
          </span>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center uppercase">{removeColorTagFromText(text)}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col">
          {control.valueOptions.options.map((option, i) => {
            const optionText = t(option)
            const active = optionText === currentValue

            return (
              <Button
                key={i}
                variant="ghost"
                style={{ color: getHexColorFromText(optionText) }}
                className="relative flex w-full items-center justify-center gap-2 py-0.5 text-center uppercase"
                onClick={() => {
                  setCurrentValue(optionText)
                }}
              >
                <div className="relative">
                  <DiamondIcon className={cn('absolute -left-4 top-[calc(50%+1px)] h-3 w-3 -translate-y-1/2 fill-foreground', !active && 'hidden')} />
                  <span>{removeColorTagFromText(optionText)}</span>
                </div>
              </Button>
            )
          })}
        </div>
        <DialogFooter>
          <Button className="mr-auto" variant="ghost">
            Default
          </Button>
          <DialogClose asChild>
            <Button>Accept</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
