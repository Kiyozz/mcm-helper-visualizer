import { createContext, Dispatch, PropsWithChildren, SetStateAction, useCallback, useContext, useState } from 'react'
import { McmHelperConfig, McmHelperControl, McmHelperCustomContent, McmHelperPage } from '@/config.ts'
import { Translations } from '@/lib/translations.ts'
import { hasContentOrCustomContent } from '@/lib/order-page-content.ts'

type Context = {
  currentPage: [McmPage, Dispatch<SetStateAction<McmPage>>]
  mcmConfig: McmHelperConfig
  translations: Translations | undefined
  t: (keyOrText: string) => string
}

export type McmPage = McmHelperPage | McmHelperControl[] | McmHelperCustomContent | undefined

const McmContext = createContext({} as Context)

export default function McmProvider({
  mcmConfig,
  translations,
  children,
}: PropsWithChildren<{
  mcmConfig: McmHelperConfig
  translations: Translations | undefined
}>) {
  const currentPage = useState<McmPage>(hasContentOrCustomContent(mcmConfig) ? mcmConfig.customContentData ?? mcmConfig.content : mcmConfig.pages?.at(0))

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
