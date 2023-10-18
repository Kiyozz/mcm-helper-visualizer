import { useCallback } from 'react'

export function useHelpTextHandler(helpText: string | undefined) {
  const setHelpText = (helpText?: string) => {
    void 0
  }

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
