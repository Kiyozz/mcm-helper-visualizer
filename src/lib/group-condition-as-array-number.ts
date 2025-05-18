import { GroupCondition } from '@/config.ts'

export function groupConditionAsArrayNumber(groupCondition: GroupCondition): number[] {
  if (typeof groupCondition === 'number') {
    return [groupCondition]
  }

  if (Array.isArray(groupCondition)) {
    return groupCondition.map((g) => groupConditionAsArrayNumber(g)).flat()
  }

  if (typeof groupCondition === 'object' && groupCondition !== null) {
    return Object.values(groupCondition)
      .map((value) => groupConditionAsArrayNumber(value))
      .flat()
  }

  return [0]
}
