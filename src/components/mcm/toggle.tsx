import { McmHelperToggle } from '@/config.ts'
import { useId } from 'react'
import { Checkbox } from '@/components/ui/checkbox.tsx'
import { getHexColorFromText, removeColorTagFromText } from '@/lib/color-from-text.tsx'
import ControlTextTooltip from '@/components/page/control-text-tooltip.tsx'
import { cn } from '@/lib/utils.ts'
import DisplayControlGroupConfig from '@/components/page/display-control-group-config.tsx'
import DisplayControlGroupControlConfig from '@/components/page/display-control-group-control-config.tsx'
import { classnameByGroupBehavior } from '@/lib/classname-by-group-behavior.ts'
import { useT } from '@/hooks/use-t.ts'
import { useEvaluateGroupCondition } from '@/hooks/use-evaluate-group-condition.ts'
import HelpText from '@/components/page/help-text.tsx'

export default function Toggle({ control, isAfterHeader }: { control: McmHelperToggle; isAfterHeader: boolean }) {
  const id = useId()
  const t = useT()
  const evaluateCondition = useEvaluateGroupCondition()

  const text = t(control.text)
  const isControlEvaluated = evaluateCondition(control.groupCondition)

  return (
    <div
      className={cn(
        'group flex h-10 items-center gap-x-2',
        isControlEvaluated !== undefined && !isControlEvaluated && classnameByGroupBehavior(control.groupBehavior),
        isAfterHeader && 'pl-3',
      )}
    >
      <ControlTextTooltip controlText={control.text} asChild>
        <label
          htmlFor={id}
          className="flex h-full grow cursor-pointer items-center gap-2 overflow-hidden whitespace-nowrap"
          style={{ color: getHexColorFromText(text) }}
        >
          <span>{removeColorTagFromText(text)}</span>
          <DisplayControlGroupControlConfig control={control} />
          <DisplayControlGroupConfig control={control} />
        </label>
      </ControlTextTooltip>
      <Checkbox id={id} />

      <HelpText control={control} />
    </div>
  )
}
