import { GroupCondition } from '@/config.ts'

export function evaluateGroupCondition(
  groupCondition: GroupCondition,
  simulatedGroupControl: number[] | undefined,
): boolean {
  if (typeof groupCondition === 'number') {
    return simulatedGroupControl?.includes(groupCondition) ?? false
  }

  if (Array.isArray(groupCondition)) {
    for (const condition of groupCondition) {
      if (evaluateGroupCondition(condition, simulatedGroupControl)) {
        return true
      }
    }
    return false
  }

  if (groupCondition.AND) {
    const andConditions = Array.isArray(groupCondition.AND) ? groupCondition.AND : [groupCondition.AND]
    for (const condition of andConditions) {
      if (!evaluateGroupCondition(condition, simulatedGroupControl)) {
        return false
      }
    }
    return true
  }

  if (groupCondition.OR) {
    const orConditions = Array.isArray(groupCondition.OR) ? groupCondition.OR : [groupCondition.OR]
    for (const condition of orConditions) {
      if (evaluateGroupCondition(condition, simulatedGroupControl)) {
        return true
      }
    }
    return false
  }

  if (groupCondition.NOT) {
    const notConditions = Array.isArray(groupCondition.NOT) ? groupCondition.NOT : [groupCondition.NOT]
    for (const condition of notConditions) {
      if (evaluateGroupCondition(condition, simulatedGroupControl)) {
        return false
      }
    }
    return true
  }

  if (groupCondition.ONLY) {
    const onlyConditions = Array.isArray(groupCondition.ONLY) ? groupCondition.ONLY : [groupCondition.ONLY]
    const activeGroups = simulatedGroupControl || []
    for (const condition of onlyConditions) {
      if (!evaluateGroupCondition(condition, simulatedGroupControl)) {
        return false
      }
    }
    return activeGroups.every((group) => onlyConditions.includes(group))
  }

  return false
}
