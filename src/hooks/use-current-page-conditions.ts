import { useMcmConfig } from '@/hooks/mcm/use-mcm-config.ts'
import { useOrderedPage } from '@/hooks/use-ordered-page.ts'
import { groupConditionAsArrayNumber } from '@/lib/group-condition-as-array-number.ts'
import { useMemo } from 'react'

export function useCurrentPageConditions() {
  const mcmConfig = useMcmConfig((s) => s.mcmConfig)
  const page = useOrderedPage()

  return useMemo(() => {
    if (mcmConfig === undefined) return undefined

    const conditions: number[] = []

    if (Array.isArray(page)) {
      page.flat().forEach((p) => {
        if (!p) {
          return
        }

        if (p.groupCondition !== undefined) {
          const groupCondition = groupConditionAsArrayNumber(p.groupCondition)

          groupCondition.forEach((g) => {
            if (!conditions.includes(g)) {
              conditions.push(g)
            }
          })
        }
      })
    }

    return conditions
  }, [mcmConfig, page])
}
