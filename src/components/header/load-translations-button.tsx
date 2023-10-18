import { open } from '@tauri-apps/api/dialog'
import { readTranslationsFromPath } from '@/lib/read-translations-from-path.ts'
import { Button } from '@/components/ui/button.tsx'
import { useTranslations } from '@/hooks/use-translations.ts'

export default function LoadTranslationsButton() {
  const setTranslations = useTranslations((s) => s.setTranslations)

  async function onClickLoadTranslations() {
    open({
      directory: false,
      filters: [
        {
          name: 'Translation file',
          extensions: ['txt'],
        },
      ],
      multiple: false,
    }).then(async (result) => {
      if (Array.isArray(result) || result === null) return

      setTranslations(await readTranslationsFromPath(result))
    })
  }

  return (
    <Button onClick={onClickLoadTranslations} variant="secondary">
      Load translations
    </Button>
  )
}
