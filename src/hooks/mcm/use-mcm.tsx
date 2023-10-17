import { createContext, Dispatch, PropsWithChildren, SetStateAction, useCallback, useContext, useMemo, useState } from 'react'
import { GroupCondition, McmHelperConfig, McmHelperControl, McmHelperCustomContent, McmHelperPage } from '@/config.ts'
import { Translations } from '@/lib/translations.ts'
import { hasContentOrCustomContent } from '@/lib/order-page-content.ts'
import { evaluateGroupCondition } from '@/lib/evaluate-group-condition.ts'

type Context = {
  currentPage: [McmPage, Dispatch<SetStateAction<McmPage>>]
  helpText: [string | undefined, Dispatch<SetStateAction<string | undefined>>]
  simulatedGroupControl: [number[] | undefined, Dispatch<SetStateAction<number[] | undefined>>]
  mcmConfig: McmHelperConfig
  translations: Translations | undefined
  evaluateCondition: (groupCondition: GroupCondition | undefined) => undefined | boolean
  t: (keyOrText: string) => string
}

export type McmPage = McmHelperPage | McmHelperControl[] | McmHelperCustomContent | undefined

const McmContext = createContext({} as Context)

export default function McmProvider({
  mcmConfig,
  translations,
  simulatedGroupControl,
  children,
}: PropsWithChildren<{
  mcmConfig: McmHelperConfig
  simulatedGroupControl: [number[] | undefined, Dispatch<SetStateAction<number[] | undefined>>]
  translations: Translations | undefined
}>) {
  const [currentPage, baseSetCurrentPage] = useState<McmPage>(
    hasContentOrCustomContent(mcmConfig) ? mcmConfig.customContentData ?? mcmConfig.content : mcmConfig.pages?.at(0),
  )
  const helpText = useState<string | undefined>()

  const t = useCallback(
    (keyOrText: string) => {
      if (translations === undefined) return keyOrText

      return translations.get(keyOrText) ?? keyOrText
    },
    [translations],
  )

  const evaluateControlCondition = useCallback(
    (groupCondition: GroupCondition | undefined) => {
      if (groupCondition === undefined) return undefined

      const simulation = simulatedGroupControl[0]

      console.log({ simulation })

      if (simulation === undefined || simulation.length === 0) return undefined

      return evaluateGroupCondition(groupCondition, simulation)
    },
    [simulatedGroupControl[0]],
  )

  const setCurrentPage = useCallback((currentPage: SetStateAction<McmPage>) => {
    helpText[1](undefined)
    simulatedGroupControl[1](undefined)
    baseSetCurrentPage(currentPage)
  }, [])

  return (
    <McmContext.Provider
      value={{
        mcmConfig,
        translations,
        t,
        currentPage: useMemo(() => [currentPage, setCurrentPage], [currentPage, setCurrentPage]),
        helpText,
        simulatedGroupControl,
        evaluateCondition: evaluateControlCondition,
      }}
    >
      {children}
    </McmContext.Provider>
  )
}

export function useMcm() {
  return useContext(McmContext)
}
