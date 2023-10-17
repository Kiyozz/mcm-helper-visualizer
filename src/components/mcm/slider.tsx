import { McmHelperSlider } from '@/config.ts'
import { ChevronsUpDownIcon } from 'lucide-react'
import { Button } from '@/components/ui/button.tsx'
import { useMcm } from '@/hooks/mcm/use-mcm.tsx'
import { getHexColorFromText, removeColorTagFromText } from '@/lib/color-from-text.tsx'
import ControlTextTooltip from '@/components/mcm/control-text-tooltip.tsx'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.tsx'
import { Slider as SliderUi } from '@/components/ui/slider.tsx'
import { useState } from 'react'
import { useHelpTextHandler } from '@/hooks/mcm/use-help-text-handler.tsx'
import { cn } from '@/lib/utils.ts'
import DisplayControlGroupConfig from '@/components/mcm/display-control-group-config.tsx'

export default function Slider({ control, isAfterHeader }: { control: McmHelperSlider; isAfterHeader: boolean }) {
  const { t } = useMcm()
  const text = t(control.text)
  const digitString = Number(control.valueOptions.formatString?.match(/{(\d+)}/)?.[1])
  const digit = Number.isNaN(digitString) ? undefined : digitString
  const defaultValueToUse = typeof control.valueOptions.defaultValue === 'boolean' ? 0 : control.valueOptions.defaultValue ?? control.valueOptions.min
  const [currentValue, setCurrentValue] = useState(defaultValueToUse)
  const helpTextHandler = useHelpTextHandler(control.help)

  return (
    <Dialog>
      <DialogTrigger className={cn('flex h-10 items-center text-left', isAfterHeader && 'pl-3')} {...helpTextHandler}>
        <ControlTextTooltip controlText={control.text} asChild>
          <span className="flex grow items-center gap-2 overflow-hidden whitespace-nowrap" style={{ color: getHexColorFromText(text) }}>
            <span>{removeColorTagFromText(text)}</span>
            <DisplayControlGroupConfig control={control} />
          </span>
        </ControlTextTooltip>
        <Button asChild variant="ghost" className="flex h-10 items-center gap-1 p-0 text-xl hover:bg-transparent">
          <span>
            <ChevronsUpDownIcon className="mt-px h-full w-5 rotate-90" />
            <span>{currentValue.toFixed(digit ?? 0)}</span>
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center uppercase">{removeColorTagFromText(text)}</DialogTitle>
        </DialogHeader>
        <div>
          <div className="flex justify-center py-3 text-xl">{currentValue}</div>
          <SliderUi
            value={[currentValue]}
            min={control.valueOptions.min}
            max={control.valueOptions.max}
            step={control.valueOptions.step}
            onValueChange={([value]: [number]) => {
              setCurrentValue(value)
            }}
          />
        </div>
        <DialogFooter>
          <Button variant="ghost" className="mr-auto">
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
