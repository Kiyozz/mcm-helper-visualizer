import { createContext, Dispatch, PropsWithChildren, SetStateAction, useCallback, useContext, useState } from 'react'
import { McmHelperConfig, McmHelperPage } from '@/config.ts'
import { Translations } from '@/lib/translations.ts'

type Context = {
  currentPage: [McmHelperPage | undefined, Dispatch<SetStateAction<McmHelperPage | undefined>>]
  mcmConfig: McmHelperConfig
  translations: Translations | undefined
  t: (keyOrText: string) => string
}

const McmContext = createContext({} as Context)

export default function McmProvider({
  mcmConfig,
  translations,
  children,
}: PropsWithChildren<{
  mcmConfig: McmHelperConfig
  translations: Translations | undefined
}>) {
  const currentPage = useState<McmHelperPage | undefined>(mcmConfig.pages?.at(0))

  const t = useCallback(
    (keyOrText: string) => {
      if (translations === undefined) return keyOrText

      return translations.get(keyOrText) ?? keyOrText
    },
    [translations],
  )

  return (
    <McmContext.Provider
      value={{
        mcmConfig,
        translations,
        t,
        currentPage,
      }}
    >
      {children}
    </McmContext.Provider>
  )
}

export function useMcm() {
  return useContext(McmContext)
}
