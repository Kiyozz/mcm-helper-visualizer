import { McmHelperEnum } from '@/config.ts'
import { DiamondIcon } from 'lucide-react'
import { useMcm } from '@/hooks/mcm/use-mcm.tsx'
import { getHexColorFromText, removeColorTagFromText } from '@/lib/color-from-text.tsx'
import ControlTextTooltip from '@/components/mcm/control-text-tooltip.tsx'

export default function Enum({ control }: { control: McmHelperEnum }) {
  const { t } = useMcm()
  const text = t(control.text)

  return (
    <button className="flex h-8 cursor-pointer items-center pl-3 text-left">
      <ControlTextTooltip controlText={control.text} asChild>
        <span className="grow" style={{ color: getHexColorFromText(text) }}>
          {removeColorTagFromText(text)}
        </span>
      </ControlTextTooltip>
      <span className="flex items-center gap-2 uppercase">
        <DiamondIcon className="mt-1 h-3 w-3 fill-foreground" />
        {control.valueOptions.defaultValue ?? 'value'}
      </span>
    </button>
  )
}
