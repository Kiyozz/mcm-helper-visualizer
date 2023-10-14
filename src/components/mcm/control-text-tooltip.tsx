import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, TooltipTriggerProps } from '@/components/ui/tooltip.tsx'
import { ElementRef, forwardRef } from 'react'

const ControlTextTooltip = forwardRef<ElementRef<typeof TooltipTrigger>, { controlText: string } & TooltipTriggerProps>(
  ({ controlText, children, ...props }, ref) => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger ref={ref} {...props}>
            {children}
          </TooltipTrigger>
          <TooltipContent>{controlText}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  },
)

ControlTextTooltip.displayName = 'TranslatedText'

export default ControlTextTooltip
