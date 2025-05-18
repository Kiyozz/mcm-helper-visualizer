import ControlTextTooltip from '@/components/page/control-text-tooltip.tsx'
import DisplayControlGroupConfig from '@/components/page/display-control-group-config.tsx'
import HelpText from '@/components/page/help-text.tsx'
import { McmHelperStepper } from '@/config.ts'
import { useEvaluateGroupCondition } from '@/hooks/use-evaluate-group-condition.ts'
import { useT } from '@/hooks/use-t.ts'
import { classnameByGroupBehavior } from '@/lib/classname-by-group-behavior.ts'
import { getHexColorFromText, removeColorTagFromText } from '@/lib/color-from-text.tsx'
import { cn } from '@/lib/utils.ts'
import { Slot } from '@radix-ui/react-slot'

export default function Stepper({ control, isAfterHeader }: { control: McmHelperStepper; isAfterHeader: boolean }) {
  const t = useT()
  const evaluateCondition = useEvaluateGroupCondition()
  const text = t(control.text)
  const isControlEvaluated = evaluateCondition(control.groupCondition)

  return (
    <div
      className={cn(
        'group flex h-10 cursor-pointer items-center justify-between whitespace-nowrap text-left',
        isControlEvaluated !== undefined && !isControlEvaluated && classnameByGroupBehavior(control.groupBehavior),
        isAfterHeader && 'pl-3',
      )}
    >
      <Slot style={{ color: getHexColorFromText(text) }}>
        <ControlTextTooltip
          controlText={control.text}
          className="flex items-center gap-2 overflow-hidden whitespace-nowrap"
        >
          <span>{removeColorTagFromText(text)}</span>
          <DisplayControlGroupConfig control={control} />
        </ControlTextTooltip>
      </Slot>
      <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">Stepper</div>
      <HelpText control={control} />
    </div>
  )
}
