import { McmHelperEnum } from '@/config.ts'
import { DiamondIcon } from 'lucide-react'
import { getHexColorFromText, removeColorTagFromText } from '@/lib/color-from-text.tsx'
import ControlTextTooltip from '@/components/mcm/control-text-tooltip.tsx'
import { useHelpTextHandler } from '@/hooks/use-help-text-handler.ts'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.tsx'
import { Button } from '@/components/ui/button.tsx'
import { useState } from 'react'
import { cn } from '@/lib/utils.ts'
import DisplayControlGroupConfig from '@/components/mcm/display-control-group-config.tsx'
import { classnameByGroupBehavior } from '@/lib/classname-by-group-behavior.ts'
import { useT } from '@/hooks/use-t.ts'
import { useEvaluateGroupCondition } from '@/hooks/use-evaluate-group-condition.ts'

export default function Enum({ control, isAfterHeader }: { control: McmHelperEnum; isAfterHeader: boolean }) {
  const t = useT()
  const evaluateCondition = useEvaluateGroupCondition()
  const text = t(control.text)
  const helpTextHandler = useHelpTextHandler(control.help)
  const { defaultValue, options, shortNames } = control.valueOptions
  const defaultKeyToUse = (shortNames ?? options).at(0) ?? (shortNames ?? options).at(defaultValue === true ? 0 : defaultValue || 0) ?? 'value'
  const [currentValue, setCurrentValue] = useState<string>(defaultKeyToUse)
  const textToUse = t(currentValue)
  const isControlEvaluated = evaluateCondition(control.groupCondition)

  return (
    <Dialog
      onOpenChange={(open) => {
        if (open) {
          setCurrentValue(textToUse)
        }
      }}
    >
      <DialogTrigger asChild>
        <button
          className={cn(
            'flex h-10 cursor-pointer items-center text-left',
            isControlEvaluated !== undefined && !isControlEvaluated && classnameByGroupBehavior(control.groupBehavior),
            isAfterHeader && 'pl-3',
          )}
          {...helpTextHandler}
        >
          <ControlTextTooltip controlText={control.text} asChild>
            <span className="flex grow items-center gap-2 overflow-hidden whitespace-nowrap" style={{ color: getHexColorFromText(text) }}>
              <span>{removeColorTagFromText(text)}</span>
              <DisplayControlGroupConfig control={control} />
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
