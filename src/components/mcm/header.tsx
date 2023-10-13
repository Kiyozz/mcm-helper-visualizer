import { McmHelperConfig, McmHelperHeader } from '@/config.ts'

export default function Header({ control }: { mcmConfig: McmHelperConfig; control: McmHelperHeader }) {
  return (
    <h2 className="flex h-12 items-center gap-3 font-bold text-foreground">
      <span>{control.text}</span>
      <span className="h-1.5 grow border-y border-r border-foreground" />
    </h2>
  )
}
