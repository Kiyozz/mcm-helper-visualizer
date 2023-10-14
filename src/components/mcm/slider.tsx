import { McmHelperSlider } from '@/config.ts'
import { ChevronsUpDownIcon } from 'lucide-react'
import { Button } from '@/components/ui/button.tsx'
import { useMcm } from '@/hooks/mcm/use-mcm.tsx'
import { getHexColorFromText, removeColorTagFromText } from '@/lib/color-from-text.tsx'
import ControlTextTooltip from '@/components/mcm/control-text-tooltip.tsx'

export default function Slider({ control }: { control: McmHelperSlider }) {
  const { t } = useMcm()
  const text = t(control.text)
  const digitString = Number(text.match(/{(\d+)}/)?.[1])
  const digit = Number.isNaN(digitString) ? undefined : digitString

  return (
    <div className="flex h-8 items-center pl-3">
      <ControlTextTooltip controlText={control.text} asChild>
        <span className="grow" style={{ color: getHexColorFromText(text) }}>
          {removeColorTagFromText(text)}
        </span>
      </ControlTextTooltip>
      <Button variant="ghost" className="flex items-center gap-1 p-0 text-xl hover:bg-transparent">
        <ChevronsUpDownIcon className="mt-1 h-full w-5 rotate-90" />
        <span>
          {typeof control.valueOptions.defaultValue === 'boolean'
            ? control.valueOptions.defaultValue
              ? 'Yes'
              : 'No'
            : (control.valueOptions.defaultValue ?? 0).toFixed(digit ?? 1)}
        </span>
      </Button>
    </div>
  )
}
