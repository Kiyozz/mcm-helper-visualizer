import ControlTextTooltip from '@/components/page/control-text-tooltip.tsx'
import DisplayControlGroupConfig from '@/components/page/display-control-group-config.tsx'
import HelpText from '@/components/page/help-text.tsx'
import { Button } from '@/components/ui/button.tsx'
import { McmHelperKeymap } from '@/config.ts'
import { useEvaluateGroupCondition } from '@/hooks/use-evaluate-group-condition.ts'
import { useT } from '@/hooks/use-t.ts'
import { classnameByGroupBehavior } from '@/lib/classname-by-group-behavior.ts'
import { getHexColorFromText, removeColorTagFromText } from '@/lib/color-from-text.tsx'
import { cn } from '@/lib/utils.ts'
import { KeyboardIcon } from 'lucide-react'

export default function Keymap({ control, isAfterHeader }: { control: McmHelperKeymap; isAfterHeader: boolean }) {
  const t = useT()
  const evaluateCondition = useEvaluateGroupCondition()
  const text = t(control.text)
  const isControlEvaluated = evaluateCondition(control.groupCondition)

  return (
    <div
      className={cn(
        'group flex h-10 items-center',
        isControlEvaluated !== undefined && !isControlEvaluated && classnameByGroupBehavior(control.groupBehavior),
        isAfterHeader && 'pl-3',
      )}
    >
      <ControlTextTooltip controlText={control.text} asChild>
        <span
          className="flex grow items-center gap-2 overflow-hidden whitespace-nowrap"
          style={{ color: getHexColorFromText(text) }}
        >
          <span>{removeColorTagFromText(text)}</span>
          <DisplayControlGroupConfig control={control} />
        </span>
      </ControlTextTooltip>
      <Button variant="ghost" className="flex items-center gap-1 p-0 text-xl hover:bg-transparent">
        <KeyboardIcon />
      </Button>
      <HelpText control={control} />
    </div>
  )
}
