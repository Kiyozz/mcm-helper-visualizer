import { McmHelperKeymap } from '@/config.ts'
import { Button } from '@/components/ui/button.tsx'
import { useMcm } from '@/hooks/mcm/use-mcm.tsx'
import { getHexColorFromText, removeColorTagFromText } from '@/lib/color-from-text.tsx'
import ControlTextTooltip from '@/components/mcm/control-text-tooltip.tsx'
import { KeyboardIcon } from 'lucide-react'

export default function Keymap({ control }: { control: McmHelperKeymap }) {
  const { t } = useMcm()
  const text = t(control.text)

  return (
    <div className="flex h-10 items-center pl-3">
      <ControlTextTooltip controlText={control.text} asChild>
        <span className="grow" style={{ color: getHexColorFromText(text) }}>
          {removeColorTagFromText(text)}
        </span>
      </ControlTextTooltip>
      <Button variant="ghost" className="flex items-center gap-1 p-0 text-xl hover:bg-transparent">
        <KeyboardIcon />
      </Button>
    </div>
  )
}
