import { McmHelperConfig, McmHelperControl, McmHelperCustomContent, McmHelperPage } from '@/config.ts'
import { McmPage } from '@/hooks/mcm/use-mcm.tsx'

export function hasContentOrCustomContent<T extends McmHelperConfig>(
  mcmConfig: T,
): mcmConfig is T & ({ content: McmHelperControl[] } | { customContentData: McmHelperCustomContent }) {
  return 'content' in mcmConfig || 'customContentData' in mcmConfig
}

export function isPage(pageOrContent: McmPage): pageOrContent is McmHelperPage {
  if (pageOrContent === undefined) return false

  return 'pageDisplayName' in pageOrContent
}

export function orderPageContent(page?: McmPage): [McmHelperControl[], McmHelperControl[] | undefined] | undefined {
  if (page === undefined) {
    return undefined
  }

  if (!isPage(page) && 'x' in page) {
    // TODO: handle customContentData
    return [[], undefined]
  }

  if (!('content' in page) && !('customContent' in page)) {
    return undefined
  }

  if ('customContent' in page) {
    return [[], undefined]
  }

  let currentPosition = 0

  return (Array.isArray(page) ? page : page.content).reduce(
    (acc, control, i) => {
      if (page.cursorFillMode === 'leftToRight') {
        const isEven = i % 2 === 0

        if (isEven) {
          currentPosition = 0

          acc[0].push(control)
        } else {
          currentPosition = 1

          if (acc[1] === undefined) {
            acc[1] = []
          }

          acc[1].push(control)
        }

        return acc
      }

      if (currentPosition === 0 && control.position === 0) {
        acc[0].push(control)
      } else {
        currentPosition = 1

        if (acc[1] === undefined) {
          acc[1] = []
        }

        acc[1].push(control)
      }

      return acc
    },
    [[], undefined] as [McmHelperControl[], McmHelperControl[] | undefined],
  )
}
