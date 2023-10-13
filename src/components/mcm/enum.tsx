import { McmHelperConfig, McmHelperEnum } from '@/config.ts'
import { DiamondIcon } from 'lucide-react'

export default function Enum({ mcmConfig: _mcmConfig, control }: { mcmConfig: McmHelperConfig; control: McmHelperEnum }) {
  return (
    <button className="flex h-8 cursor-pointer items-center pl-3 text-left">
      <span className="grow">{control.text}</span>
      <span className="flex items-center gap-2 uppercase">
        <DiamondIcon className="mt-1 h-3 w-3 fill-foreground" />
        {control.valueOptions.defaultValue ?? 'value'}
      </span>
    </button>
  )
}
