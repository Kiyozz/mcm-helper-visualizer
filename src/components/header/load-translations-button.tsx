import { open } from '@tauri-apps/api/dialog'
import { readTranslationsFromPath } from '@/lib/read-translations-from-path.ts'
import { Button } from '@/components/ui/button.tsx'
import { useTranslations } from '@/hooks/use-translations.ts'
import { useToast } from '@/components/ui/use-toast.ts'

export default function LoadTranslationsButton() {
  const toast = useToast()
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

      try {
        setTranslations(await readTranslationsFromPath(result))
        toast.toast({
          description: 'Translations have been loaded successfully',
        })
      } catch (err: any) {
        toast.toast({
          title: 'Failed to load translations',
          description: <span className="text-destructive-foreground">Check the logs: {err.message}</span>,
        })
      }
    })
  }

  return (
    <Button onClick={onClickLoadTranslations} variant="secondary">
      Load translations
    </Button>
  )
}
