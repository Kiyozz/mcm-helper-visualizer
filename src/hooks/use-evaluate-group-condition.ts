import { GroupCondition } from '@/config.ts'
import { useSimulation } from '@/hooks/mcm/use-simulation.ts'
import { evaluateGroupCondition } from '@/lib/evaluate-group-condition.ts'
import { useCallback } from 'react'

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
