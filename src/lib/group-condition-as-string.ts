import { GroupCondition } from '@/config.ts'

export function groupConditionAsString(groupCondition: GroupCondition): string | undefined {
  if (typeof groupCondition === 'number') {
    return groupCondition.toString()
  }

  if (Array.isArray(groupCondition)) {
    return groupCondition.map((g) => groupConditionAsString(g)).join(', ')
  }

  if (typeof groupCondition === 'object' && groupCondition !== null) {
    return Object.entries(groupCondition)
      .map(([key, value]) => {
        return `${key}:${groupConditionAsString(value)}`
      })
      .join(', ')
  }
}
