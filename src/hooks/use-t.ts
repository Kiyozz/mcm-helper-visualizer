import { useTranslations } from '@/hooks/use-translations.ts'
import { useCallback } from 'react'

export function useT() {
  const translations = useTranslations((s) => s.translations)

  return useCallback(
    (keyOrText: string) => {
      if (translations === undefined) return keyOrText

      return translations.get(keyOrText) ?? keyOrText
    },
    [translations],
  )
}
