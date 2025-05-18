import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, type TooltipTriggerProps } from '@/components/ui/tooltip.tsx'
import { type ElementRef, forwardRef, useEffect, useState } from 'react'
import { clipboard } from '@tauri-apps/api'
import { CopyIcon } from 'lucide-react'

const ControlTextTooltip = forwardRef<ElementRef<typeof TooltipTrigger>, { controlText: string } & TooltipTriggerProps>(
  ({ controlText, children, ...props }, ref) => {
    const [hasBeenCopied, setHasBeenCopied] = useState(false)

    useEffect(() => {
      let timer: NodeJS.Timeout

      if (hasBeenCopied) {
        timer = setTimeout(() => {
          setHasBeenCopied(false)
        }, 2000)
      }

      return () => {
        if (timer) {
          clearTimeout(timer)
        }
      }
    }, [hasBeenCopied])

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger ref={ref} {...props}>
            {children}
          </TooltipTrigger>
          <TooltipContent
            onClick={async (evt) => {
              evt.stopPropagation()

              await clipboard.writeText(controlText)
              setHasBeenCopied(true)
            }}
            className="flex cursor-pointer items-center gap-2"
          >
            {!hasBeenCopied ? (
              <>
                <CopyIcon className="h-4 w-4" />
                <span>{controlText}</span>
              </>
            ) : (
              <span>Copied!</span>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  },
)

ControlTextTooltip.displayName = 'TranslatedText'

export default ControlTextTooltip
