import { cn } from '@/lib/utils.ts'
import { getHexColorFromText, removeColorTagFromText } from '@/lib/color-from-text.tsx'
import { useT } from '@/hooks/use-t.ts'
import { McmHelperControl } from '@/config.ts'

export default function HelpText({ control }: { control: McmHelperControl }) {
  const t = useT()
  const helpText = 'help' in control ? control.help : undefined
  const text = helpText !== undefined ? t(helpText) : undefined

  if (text === undefined) return null

  return (
    <div
      className={cn(
        'pointer-events-none fixed bottom-0 left-0 right-0 flex h-20 w-full items-center justify-center border-t bg-background text-center font-futura text-xl group-hover:z-10',
      )}
    >
      <span className="container hidden group-hover:inline">
        <p style={{ color: text ? getHexColorFromText(text) : undefined }}>{removeColorTagFromText(text)}</p>
      </span>
    </div>
  )
}
