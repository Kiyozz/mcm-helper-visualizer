import { create } from 'zustand'
import { McmDisplayableContent } from '@/lib/mcm-displayable-content.ts'
import { useSimulation } from '@/hooks/mcm/use-simulation.ts'
import { isSamePage } from '@/lib/is-same-page.ts'

type PageStore = {
  page: McmDisplayableContent | undefined
  setPage: (page: McmDisplayableContent | undefined) => void
}

export const usePage = create<PageStore>((set, getState) => ({
  page: undefined,
  setPage: (page) => {
    const currentPage = getState().page

    if (!isSamePage(page, currentPage)) {
      useSimulation.getState().setGroups(undefined)
    }

    set({ page })
  },
}))
