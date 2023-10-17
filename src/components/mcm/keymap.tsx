import { McmHelperKeymap } from '@/config.ts'
import { Button } from '@/components/ui/button.tsx'
import { useMcm } from '@/hooks/mcm/use-mcm.tsx'
import { getHexColorFromText, removeColorTagFromText } from '@/lib/color-from-text.tsx'
import ControlTextTooltip from '@/components/mcm/control-text-tooltip.tsx'
import { KeyboardIcon } from 'lucide-react'
import { cn } from '@/lib/utils.ts'
import DisplayControlGroupConfig from '@/components/mcm/display-control-group-config.tsx'
import { useHelpTextHandler } from '@/hooks/mcm/use-help-text-handler.tsx'

export default function Keymap({ control, isAfterHeader }: { control: McmHelperKeymap; isAfterHeader: boolean }) {
  const { t } = useMcm()
  const text = t(control.text)
  const helpTextHandler = useHelpTextHandler(control.help)

  return (
    <div className={cn('flex h-10 items-center', isAfterHeader && 'pl-3')} {...helpTextHandler}>
      <ControlTextTooltip controlText={control.text} asChild>
        <span className="flex grow items-center gap-2 overflow-hidden whitespace-nowrap" style={{ color: getHexColorFromText(text) }}>
          <span>{removeColorTagFromText(text)}</span>
          <DisplayControlGroupConfig control={control} />
        </span>
      </ControlTextTooltip>
      <Button variant="ghost" className="flex items-center gap-1 p-0 text-xl hover:bg-transparent">
        <KeyboardIcon />
      </Button>
    </div>
  )
}
