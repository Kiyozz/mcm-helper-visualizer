import { McmHelperText } from '@/config.ts'
import { useMcm } from '@/hooks/mcm/use-mcm.tsx'
import { getHexColorFromText, removeColorTagFromText } from '@/lib/color-from-text.tsx'
import ControlTextTooltip from '@/components/mcm/control-text-tooltip.tsx'
import { Slot } from '@radix-ui/react-slot'

export default function Text({ control }: { control: McmHelperText }) {
  const { t } = useMcm()
  const text = t(control.text)
  const textValue = t(control.valueOptions?.value ?? '')

  return (
    <div className="flex h-8 cursor-pointer items-center justify-between whitespace-nowrap pl-3 text-left">
      <Slot style={{ color: getHexColorFromText(text) }}>
        <ControlTextTooltip controlText={control.text} className="justify-between overflow-hidden">
          <span>{removeColorTagFromText(text)}</span>
        </ControlTextTooltip>
      </Slot>
      {/* ici */}
      {textValue && (
        <Slot style={{ color: getHexColorFromText(textValue) }}>
          <ControlTextTooltip controlText={control.valueOptions?.value ?? ''} className="justify-between">
            <span>{removeColorTagFromText(textValue)}</span>
          </ControlTextTooltip>
        </Slot>
      )}
    </div>
  )
}
