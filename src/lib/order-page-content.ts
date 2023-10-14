import { McmHelperControl, McmHelperPage } from '@/config.ts'

export function orderPageContent(page?: McmHelperPage): [McmHelperControl[], McmHelperControl[] | undefined] | undefined {
  if (page === undefined || !('content' in page)) {
    return undefined
  }

  let currentPosition = 0

  return page.content.reduce(
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
