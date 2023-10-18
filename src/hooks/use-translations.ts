import { Translations } from '@/lib/translations.ts'
import { create } from 'zustand'

type TranslationsStore = {
  translations: Translations | undefined
  setTranslations: (translations: Translations | undefined) => void
}

export const useTranslations = create<TranslationsStore>((set) => ({
  translations: undefined,
  setTranslations: (translations) => set({ translations }),
}))
