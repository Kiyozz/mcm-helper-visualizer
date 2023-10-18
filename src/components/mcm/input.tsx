import { McmHelperInput } from '@/config.ts'
import { getHexColorFromText, removeColorTagFromText } from '@/lib/color-from-text.tsx'
import ControlTextTooltip from '@/components/page/control-text-tooltip.tsx'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils.ts'
import DisplayControlGroupConfig from '@/components/page/display-control-group-config.tsx'
import { TextCursorInputIcon } from 'lucide-react'
import DisplayControlSourceConfig from '@/components/page/display-control-source-config.tsx'
import { classnameByGroupBehavior } from '@/lib/classname-by-group-behavior.ts'
import { useT } from '@/hooks/use-t.ts'
import { useEvaluateGroupCondition } from '@/hooks/use-evaluate-group-condition.ts'
import HelpText from '@/components/page/help-text.tsx'

export default function Input({ control, isAfterHeader }: { control: McmHelperInput; isAfterHeader: boolean }) {
  const t = useT()
  const evaluateCondition = useEvaluateGroupCondition()
  const text = t(control.text)
  const isControlEvaluated = evaluateCondition(control.groupCondition)

  return (
    <div
      className={cn(
        'group flex h-10 cursor-pointer items-center justify-between whitespace-nowrap text-left',
        isControlEvaluated !== undefined && !isControlEvaluated && classnameByGroupBehavior(control.groupBehavior),
        isAfterHeader && 'pl-3',
      )}
    >
      <Slot style={{ color: getHexColorFromText(text) }}>
        <ControlTextTooltip controlText={control.text} className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
          <span>{removeColorTagFromText(text)}</span>
          <DisplayControlGroupConfig control={control} />
        </ControlTextTooltip>
      </Slot>
      <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
        <TextCursorInputIcon className="h-5 w-5" />
        <DisplayControlSourceConfig control={control} />
      </div>
      <HelpText control={control} />
    </div>
  )
}
