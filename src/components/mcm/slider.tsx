import { McmHelperConfig, McmHelperSlider } from '@/config.ts'
import { ChevronsUpDownIcon } from 'lucide-react'
import { Button } from '@/components/ui/button.tsx'

export default function Slider({ mcmConfig: _mcmConfig, control }: { mcmConfig: McmHelperConfig; control: McmHelperSlider }) {
  return (
    <div className="flex h-8 items-center pl-3 text-left">
      <span className="grow">{control.text}</span>
      <Button variant="ghost" className="flex items-center gap-1 p-0 hover:bg-transparent">
        <ChevronsUpDownIcon className="mt-1 h-full w-5 rotate-90" />
        <span>{control.valueOptions.defaultValue ?? 0}</span>
      </Button>
    </div>
  )
}
