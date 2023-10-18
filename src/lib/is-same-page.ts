import { McmDisplayableContent } from '@/lib/mcm-displayable-content.ts'
import { isPage } from '@/lib/order-page-content.ts'

export function isSamePage(page: McmDisplayableContent, otherPage: McmDisplayableContent) {
  if (page === undefined || otherPage === undefined) return false

  if (isPage(page) && isPage(otherPage) && page.pageDisplayName === otherPage.pageDisplayName) {
    return true
  }

  if ('customContent' in page && 'customContent' in otherPage) {
    const { x, y, source } = page.customContent

    return source === otherPage.customContent.source && x === otherPage.customContent.x && y === otherPage.customContent.y
  }

  return false
}
