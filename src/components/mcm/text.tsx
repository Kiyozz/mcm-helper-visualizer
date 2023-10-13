import { McmHelperConfig, McmHelperText } from '@/config.ts'

export default function Text({ mcmConfig: _mcmConfig, control }: { mcmConfig: McmHelperConfig; control: McmHelperText }) {
  return <button className="flex h-8 cursor-pointer items-center pl-3 text-left">{control.text}</button>
}
