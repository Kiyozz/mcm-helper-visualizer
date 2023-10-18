import { McmHelperEmpty } from '@/config.ts'
import { cn } from '@/lib/utils.ts'
import { classnameByGroupBehavior } from '@/lib/classname-by-group-behavior.ts'
import { useEvaluateGroupCondition } from '@/hooks/use-evaluate-group-condition.ts'

export default function Empty({ control }: { control: McmHelperEmpty }) {
  const evaluateCondition = useEvaluateGroupCondition()
  const isControlEvaluated = evaluateCondition(control.groupCondition)

  return (
    <div
      className={cn('flex h-10 items-center pl-3', isControlEvaluated !== undefined && !isControlEvaluated && classnameByGroupBehavior(control.groupBehavior))}
    />
  )
}
