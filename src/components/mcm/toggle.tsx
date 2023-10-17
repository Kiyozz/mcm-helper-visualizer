import { McmHelperToggle } from '@/config.ts'
import { useId } from 'react'
import { Checkbox } from '@/components/ui/checkbox.tsx'
import { getHexColorFromText, removeColorTagFromText } from '@/lib/color-from-text.tsx'
import ControlTextTooltip from '@/components/mcm/control-text-tooltip.tsx'
import { useMcm } from '@/hooks/mcm/use-mcm.tsx'
import { useHelpTextHandler } from '@/hooks/mcm/use-help-text-handler.tsx'

export default function Toggle({ control }: { control: McmHelperToggle }) {
  const id = useId()
  const { t } = useMcm()

  const text = t(control.text)
  const helpTextHandler = useHelpTextHandler(control.help)

  return (
    <div className="flex h-10 items-center gap-x-2" {...helpTextHandler}>
      <ControlTextTooltip controlText={control.text} asChild>
        <label htmlFor={id} className="flex h-full grow cursor-pointer items-center pl-3" style={{ color: getHexColorFromText(text) }}>
          {removeColorTagFromText(text)}
        </label>
      </ControlTextTooltip>
      <Checkbox id={id} />
    </div>
  )
}
