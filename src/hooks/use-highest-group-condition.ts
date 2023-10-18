import { useMemo } from 'react'
import { useMcmConfig } from '@/hooks/mcm/use-mcm-config.ts'
import { groupConditionAsNumber } from '@/lib/group-condition-as-number.ts'

export function useHighestGroupCondition() {
  const mcmConfig = useMcmConfig((s) => s.mcmConfig)

  return useMemo(() => {
    if (mcmConfig === undefined) return undefined

    let highest = 0

    for (const control of mcmConfig.content ?? []) {
      const groupCondition = control.groupCondition !== undefined && groupConditionAsNumber(control.groupCondition)

      if (groupCondition !== false && groupCondition > highest) {
        highest = groupCondition
      }
    }

    for (const control of mcmConfig.pages?.flatMap((p) => {
      if (!('content' in p)) {
        return []
      }

      return p.content
    }) ?? []) {
      const groupCondition = control.groupCondition !== undefined && groupConditionAsNumber(control.groupCondition)

      if (groupCondition !== false && groupCondition > highest) {
        highest = groupCondition
      }
    }

    return highest
  }, [])
}
