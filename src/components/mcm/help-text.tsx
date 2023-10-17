import { useMcm } from '@/hooks/mcm/use-mcm.tsx'
import { cn } from '@/lib/utils.ts'
import { getHexColorFromText, removeColorTagFromText } from '@/lib/color-from-text.tsx'

export default function HelpText() {
  const {
    t,
    helpText: [helpText],
  } = useMcm()

  const text = helpText !== undefined ? t(helpText) : undefined

  return (
    <div className={cn('font-futura fixed bottom-0 left-0 right-0 flex h-20 w-full items-center justify-center border-t bg-background text-center text-xl')}>
      {text && <p style={{ color: text ? getHexColorFromText(text) : undefined }}>{removeColorTagFromText(text)}</p>}
    </div>
  )
}
