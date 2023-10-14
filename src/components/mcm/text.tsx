import { McmHelperText } from '@/config.ts'
import { useMcm } from '@/hooks/mcm/use-mcm.tsx'
import { getHexColorFromText, removeColorTagFromText } from '@/lib/color-from-text.tsx'
import ControlTextTooltip from '@/components/mcm/control-text-tooltip.tsx'
import { Slot } from '@radix-ui/react-slot'

export default function Text({ control }: { control: McmHelperText }) {
  const { t } = useMcm()
  const text = t(control.text)

  return (
    <Slot className="flex h-8 cursor-pointer items-center pl-3 text-left" style={{ color: getHexColorFromText(text) }}>
      <ControlTextTooltip controlText={control.text}>
        <span style={{ color: getHexColorFromText(text) }}>{removeColorTagFromText(text)}</span>
      </ControlTextTooltip>
    </Slot>
  )
}
