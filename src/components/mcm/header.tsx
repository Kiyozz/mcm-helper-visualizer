import { McmHelperHeader } from '@/config.ts'
import ControlTextTooltip from '@/components/mcm/control-text-tooltip.tsx'
import { getHexColorFromText, removeColorTagFromText } from '@/lib/color-from-text.tsx'
import { useMcm } from '@/hooks/mcm/use-mcm.tsx'
import DisplayControlGroupConfig from '@/components/mcm/display-control-group-config.tsx'
import { useHelpTextHandler } from '@/hooks/mcm/use-help-text-handler.tsx'
import { cn } from '@/lib/utils.ts'
import { classnameByGroupBehavior } from '@/lib/classname-by-group-behavior.ts'

export default function Header({ control }: { control: McmHelperHeader }) {
  const { t, evaluateCondition } = useMcm()

  const text = t(control.text)
  const helpTextHandler = useHelpTextHandler(control.help)
  const isControlEvaluated = evaluateCondition(control.groupCondition)

  return (
    <h2
      className={cn(
        'flex h-10 items-center gap-3 font-bold text-foreground',
        isControlEvaluated !== undefined && !isControlEvaluated && classnameByGroupBehavior(control.groupBehavior),
      )}
      {...helpTextHandler}
    >
      <ControlTextTooltip controlText={control.text} asChild>
        <span style={{ color: getHexColorFromText(text) }} className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
          <span>{removeColorTagFromText(text)}</span>

          <DisplayControlGroupConfig control={control} />
        </span>
      </ControlTextTooltip>
      <span className="h-1.5 grow border-y border-r border-foreground" />
    </h2>
  )
}
