import ControlTextTooltip from '@/components/page/control-text-tooltip.tsx'
import DisplayControlGroupConfig from '@/components/page/display-control-group-config.tsx'
import HelpText from '@/components/page/help-text.tsx'
import { Button } from '@/components/ui/button.tsx'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx'
import { Slider as SliderUi } from '@/components/ui/slider.tsx'
import { McmHelperSlider } from '@/config.ts'
import { useEvaluateGroupCondition } from '@/hooks/use-evaluate-group-condition.ts'
import { useT } from '@/hooks/use-t.ts'
import { classnameByGroupBehavior } from '@/lib/classname-by-group-behavior.ts'
import { getHexColorFromText, removeColorTagFromText } from '@/lib/color-from-text.tsx'
import { cn } from '@/lib/utils.ts'
import { ChevronsUpDownIcon } from 'lucide-react'
import { useState } from 'react'

export default function Slider({ control, isAfterHeader }: { control: McmHelperSlider; isAfterHeader: boolean }) {
  const t = useT()
  const evaluateCondition = useEvaluateGroupCondition()
  const text = t(control.text)
  const digitString = Number(control.valueOptions.formatString?.match(/{(\d+)}/)?.[1])
  const digit = Number.isNaN(digitString) ? undefined : digitString
  const defaultValueToUse =
    typeof control.valueOptions.defaultValue === 'boolean'
      ? 0
      : (control.valueOptions.defaultValue ?? control.valueOptions.min)
  const [currentValue, setCurrentValue] = useState(defaultValueToUse)
  const isControlEvaluated = evaluateCondition(control.groupCondition)

  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          'group flex h-10 items-center text-left',
          isAfterHeader && 'pl-3',
          isControlEvaluated !== undefined && !isControlEvaluated && classnameByGroupBehavior(control.groupBehavior),
        )}
      >
        <ControlTextTooltip controlText={control.text} asChild>
          <span
            className="flex grow items-center gap-2 overflow-hidden whitespace-nowrap"
            style={{ color: getHexColorFromText(text) }}
          >
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
        <HelpText control={control} />
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
