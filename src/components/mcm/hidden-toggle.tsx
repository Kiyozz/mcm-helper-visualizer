import { McmHelperHiddenToggle } from '@/config.ts'
import { cn } from '@/lib/utils.ts'
import DisplayControlGroupControlConfig from '@/components/mcm/display-control-group-control-config.tsx'
import DisplayControlSourceConfig from '@/components/mcm/display-control-source-config.tsx'

export default function HiddenToggle({ control, isAfterHeader }: { control: McmHelperHiddenToggle; isAfterHeader: boolean }) {
  return (
    <div className={cn('flex h-10 items-center gap-2 overflow-hidden whitespace-nowrap text-xs italic', isAfterHeader && 'pl-3')}>
      <span>Hidden Toggle</span>
      <DisplayControlGroupControlConfig control={control} />
      <DisplayControlSourceConfig control={control} />
    </div>
  )
}
