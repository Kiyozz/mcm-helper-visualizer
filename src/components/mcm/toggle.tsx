import { McmHelperToggle } from '@/config.ts'
import { useId } from 'react'
import { Checkbox } from '@/components/ui/checkbox.tsx'
import { getHexColorFromText, removeColorTagFromText } from '@/lib/color-from-text.tsx'
import ControlTextTooltip from '@/components/mcm/control-text-tooltip.tsx'
import { useMcm } from '@/hooks/mcm/use-mcm.tsx'
import { useHelpTextHandler } from '@/hooks/mcm/use-help-text-handler.tsx'
import { cn } from '@/lib/utils.ts'
import DisplayControlGroupConfig from '@/components/mcm/display-control-group-config.tsx'
import DisplayControlGroupControlConfig from '@/components/mcm/display-control-group-control-config.tsx'

export default function Toggle({ control, isAfterHeader }: { control: McmHelperToggle; isAfterHeader: boolean }) {
  const id = useId()
  const { t } = useMcm()

  const text = t(control.text)
  const helpTextHandler = useHelpTextHandler(control.help)

  return (
    <div className={cn('flex h-10 items-center gap-x-2', isAfterHeader && 'pl-3')} {...helpTextHandler}>
      <ControlTextTooltip controlText={control.text} asChild>
        <label
          htmlFor={id}
          className="flex h-full grow cursor-pointer items-center gap-2 overflow-hidden whitespace-nowrap"
          style={{ color: getHexColorFromText(text) }}
        >
          <span>{removeColorTagFromText(text)}</span>
          <DisplayControlGroupControlConfig control={control} />
          <DisplayControlGroupConfig control={control} />
        </label>
      </ControlTextTooltip>
      <Checkbox id={id} />
    </div>
  )
}
