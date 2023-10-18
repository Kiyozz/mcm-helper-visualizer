import { cn } from '@/lib/utils.ts'
import { getHexColorFromText, removeColorTagFromText } from '@/lib/color-from-text.tsx'
import { useT } from '@/hooks/use-t.ts'

export default function HelpText() {
  const t = useT()
  const helpText = ''

  const text = helpText !== undefined ? t(helpText) : undefined

  return (
    <div className={cn('fixed bottom-0 left-0 right-0 flex h-20 w-full items-center justify-center border-t bg-background text-center font-futura text-xl')}>
      {text && <p style={{ color: text ? getHexColorFromText(text) : undefined }}>{removeColorTagFromText(text)}</p>}
    </div>
  )
}
