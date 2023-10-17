import { McmHelperHeader } from '@/config.ts'
import ControlTextTooltip from '@/components/mcm/control-text-tooltip.tsx'
import { getHexColorFromText, removeColorTagFromText } from '@/lib/color-from-text.tsx'
import { useMcm } from '@/hooks/mcm/use-mcm.tsx'

export default function Header({ control }: { control: McmHelperHeader }) {
  const { t } = useMcm()

  const text = t(control.text)

  return (
    <h2 className="flex h-10 items-center gap-3 font-bold text-foreground">
      <ControlTextTooltip controlText={control.text} asChild>
        <span style={{ color: getHexColorFromText(text) }}>{removeColorTagFromText(text)}</span>
      </ControlTextTooltip>
      <span className="h-1.5 grow border-y border-r border-foreground" />
    </h2>
  )
}
