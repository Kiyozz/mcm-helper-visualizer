import { GroupCondition } from '@/config.ts'

export function groupConditionAsNumber(groupCondition: GroupCondition): number {
  if (typeof groupCondition === 'number') {
    return groupCondition
  }

  if (Array.isArray(groupCondition)) {
    return Math.max(...groupCondition.map((g) => groupConditionAsNumber(g)))
  }

  if (typeof groupCondition === 'object' && groupCondition !== null) {
    return Math.max(...Object.values(groupCondition).map((value) => groupConditionAsNumber(value)))
  }

  return 0
}
