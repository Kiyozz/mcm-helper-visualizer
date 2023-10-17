import { McmHelperEmpty } from '@/config.ts'
import { useMcm } from '@/hooks/mcm/use-mcm.tsx'
import { cn } from '@/lib/utils.ts'
import { classnameByGroupBehavior } from '@/lib/classname-by-group-behavior.ts'

export default function Empty({ control }: { control: McmHelperEmpty }) {
  const { evaluateCondition } = useMcm()
  const isControlEvaluated = evaluateCondition(control.groupCondition)

  return (
    <div
      className={cn('flex h-10 items-center pl-3', isControlEvaluated !== undefined && !isControlEvaluated && classnameByGroupBehavior(control.groupBehavior))}
    />
  )
}
