import { create } from 'zustand'

type SimulationStore = {
  groups: number[] | undefined
  setGroups: (groups: number[] | undefined) => void
}

export const useSimulation = create<SimulationStore>((set) => ({
  groups: undefined,
  setGroups: (groups) => set({ groups }),
}))
