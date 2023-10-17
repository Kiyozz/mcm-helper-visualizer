import { GroupBehavior } from '@/config.ts'

export function classnameByGroupBehavior(groupBehavior?: GroupBehavior) {
  switch (groupBehavior) {
    case undefined:
    case 'disable':
      return 'pointer-events-none opacity-50'
    case 'hide':
    case 'skip':
      return 'hidden'
  }
}
