import { useCallback } from 'react'
import { GroupCondition } from '@/config.ts'
import { evaluateGroupCondition } from '@/lib/evaluate-group-condition.ts'
import { useSimulation } from '@/hooks/mcm/use-simulation.ts'

export function useEvaluateGroupCondition() {
  const groups = useSimulation((s) => s.groups)

  return useCallback(
    (groupCondition: GroupCondition | undefined) => {
      if (groupCondition === undefined) return undefined

      if (groups === undefined || groups.length === 0) return undefined

      return evaluateGroupCondition(groupCondition, groups)
    },
    [groups],
  )
}
