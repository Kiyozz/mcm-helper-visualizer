import { McmHelperConfig } from '@/config.ts'
import { create } from 'zustand'
import { usePage } from '@/hooks/mcm/use-page.ts'
import { hasContentOrCustomContent } from '@/lib/order-page-content.ts'

type McmStore = {
  mcmConfig: McmHelperConfig | undefined
  lastMcmConfigPath: string | undefined
  setMcmConfig: (mcmConfig: McmHelperConfig | undefined) => void
  setLastMcmConfigPath: (lastMcmConfigPath: string | undefined) => void
}

export const useMcmConfig = create<McmStore>((set) => ({
  mcmConfig: undefined,
  lastMcmConfigPath: undefined,
  setMcmConfig: (mcmConfig) => {
    set({ mcmConfig })

    if (mcmConfig !== undefined) {
      usePage.getState().setPage(hasContentOrCustomContent(mcmConfig) ? mcmConfig.customContentData ?? mcmConfig.content : mcmConfig.pages?.at(0))
    }
  },
  setLastMcmConfigPath: (lastMcmConfigPath) => set({ lastMcmConfigPath }),
}))
