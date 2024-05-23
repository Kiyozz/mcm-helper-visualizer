import { usePage } from '@/hooks/mcm/use-page.ts'
import { McmHelperControl } from '@/config.ts'
import { isPage } from '@/lib/order-page-content.ts'
import { useMcmConfig } from '@/hooks/mcm/use-mcm-config.ts'

export function useOrderedPage(): [McmHelperControl[], McmHelperControl[] | undefined] | undefined {
  const page = usePage((s) => s.page)
  const mcm = useMcmConfig((s) => s.mcmConfig)

  if (page === undefined) {
    return undefined
  }

  if (!isPage(page) && 'x' in page) {
    // TODO: handle customContentData
    return [[], undefined]
  }

  const content = Array.isArray(page) ? page : 'content' in page ? page.content : undefined

  if ('customContent' in page || content === undefined) {
    return undefined
  }

  let currentPosition = 0

  return content.reduce(
    (acc, control, i) => {
      const cursorFillMode = 'cursorFillMode' in page ? page.cursorFillMode : mcm?.cursorFillMode ?? 'leftToRight'

      if (cursorFillMode === 'leftToRight') {
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
