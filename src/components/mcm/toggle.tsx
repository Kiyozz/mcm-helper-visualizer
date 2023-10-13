import { McmHelperConfig, McmHelperToggle } from '@/config.ts'
import { useId } from 'react'
import { Checkbox } from '@/components/ui/checkbox.tsx'

export default function Toggle({ mcmConfig: _mcmConfig, control }: { mcmConfig: McmHelperConfig; control: McmHelperToggle }) {
  const id = useId()

  return (
    <div className="flex h-8 items-center gap-x-2">
      <label htmlFor={id} className="flex h-full grow cursor-pointer items-center pl-3">
        {control.text}
      </label>
      <Checkbox id={id} />
    </div>
  )
}
