import { McmHelperColor } from '@/config.ts'
import { getHexColorFromText, removeColorTagFromText } from '@/lib/color-from-text.tsx'
import ControlTextTooltip from '@/components/mcm/control-text-tooltip.tsx'
import { Slot } from '@radix-ui/react-slot'
import { useHelpTextHandler } from '@/hooks/use-help-text-handler.ts'
import { cn } from '@/lib/utils.ts'
import DisplayControlGroupConfig from '@/components/mcm/display-control-group-config.tsx'
import { classnameByGroupBehavior } from '@/lib/classname-by-group-behavior.ts'
import { useT } from '@/hooks/use-t.ts'
import { useEvaluateGroupCondition } from '@/hooks/use-evaluate-group-condition.ts'

export default function Color({ control, isAfterHeader }: { control: McmHelperColor; isAfterHeader: boolean }) {
  const t = useT()
  const evaluateCondition = useEvaluateGroupCondition()
  const text = t(control.text)
  const helpTextHandler = useHelpTextHandler(control.help)
  const isControlEvaluated = evaluateCondition(control.groupCondition)

  return (
    <div
      className={cn(
        'flex h-10 cursor-pointer items-center justify-between whitespace-nowrap text-left',
        isControlEvaluated !== undefined && !isControlEvaluated && classnameByGroupBehavior(control.groupBehavior),
        isAfterHeader && 'pl-3',
      )}
      {...helpTextHandler}
    >
      <Slot style={{ color: getHexColorFromText(text) }}>
        <ControlTextTooltip controlText={control.text} className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
          <span>{removeColorTagFromText(text)}</span>
          <DisplayControlGroupConfig control={control} />
        </ControlTextTooltip>
      </Slot>
      <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">Color</div>
    </div>
  )
}
