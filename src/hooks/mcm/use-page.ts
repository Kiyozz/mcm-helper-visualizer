import { create } from 'zustand'
import { McmDisplayableContent } from '@/lib/mcm-displayable-content.ts'
import { useSimulation } from '@/hooks/mcm/use-simulation.ts'

type PageStore = {
  page: McmDisplayableContent | undefined
  setPage: (page: McmDisplayableContent | undefined) => void
}

export const usePage = create<PageStore>((set) => ({
  page: undefined,
  setPage: (page) => {
    useSimulation.getState().setGroups(undefined)
    set({ page })
  },
}))
