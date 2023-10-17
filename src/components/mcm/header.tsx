import { McmHelperHeader } from '@/config.ts'
import ControlTextTooltip from '@/components/mcm/control-text-tooltip.tsx'
import { getHexColorFromText, removeColorTagFromText } from '@/lib/color-from-text.tsx'
import { useMcm } from '@/hooks/mcm/use-mcm.tsx'
import DisplayControlGroupConfig from '@/components/mcm/display-control-group-config.tsx'
import { useHelpTextHandler } from '@/hooks/mcm/use-help-text-handler.tsx'

export default function Header({ control }: { control: McmHelperHeader }) {
  const { t } = useMcm()

  const text = t(control.text)
  const helpTextHandler = useHelpTextHandler(control.help)

  return (
    <h2 className="flex h-10 items-center gap-3 font-bold text-foreground" {...helpTextHandler}>
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
