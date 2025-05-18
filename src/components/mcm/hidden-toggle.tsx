import DisplayControlGroupControlConfig from '@/components/page/display-control-group-control-config.tsx'
import DisplayControlSourceConfig from '@/components/page/display-control-source-config.tsx'
import { McmHelperHiddenToggle } from '@/config.ts'
import { useEvaluateGroupCondition } from '@/hooks/use-evaluate-group-condition.ts'
import { classnameByGroupBehavior } from '@/lib/classname-by-group-behavior.ts'
import { cn } from '@/lib/utils.ts'

export default function HiddenToggle({
  control,
  isAfterHeader,
}: { control: McmHelperHiddenToggle; isAfterHeader: boolean }) {
  const evaluateCondition = useEvaluateGroupCondition()
  const isControlEvaluated = evaluateCondition(control.groupCondition)

  return (
    <div
      className={cn(
        'flex h-10 items-center gap-2 overflow-hidden whitespace-nowrap text-xs italic',
        isControlEvaluated !== undefined && !isControlEvaluated && classnameByGroupBehavior(control.groupBehavior),
        isAfterHeader && 'pl-3',
      )}
    >
      <span>Hidden Toggle</span>
      <DisplayControlGroupControlConfig control={control} />
      <DisplayControlSourceConfig control={control} />
    </div>
  )
}
