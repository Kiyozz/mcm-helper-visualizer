import { useCallback } from 'react'
import { useMcm } from '@/hooks/mcm/use-mcm.tsx'

export function useHelpTextHandler(helpText: string | undefined) {
  const {
    helpText: [, setHelpText],
  } = useMcm()

  const onMouseEnter = useCallback(() => {
    setHelpText(helpText)
  }, [helpText])

  const onMouseLeave = useCallback(() => {
    setHelpText(undefined)
  }, [])

  if (helpText === undefined) return undefined

  return {
    onMouseEnter,
    onMouseLeave,
  }
}
