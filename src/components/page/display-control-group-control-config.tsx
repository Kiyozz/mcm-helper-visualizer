import { McmHelperHiddenToggle, McmHelperToggle } from '@/config.ts'

export default function DisplayControlGroupControlConfig({ control }: { control: McmHelperToggle | McmHelperHiddenToggle }) {
  return <>{control.groupControl !== undefined && <span className="text-xs italic text-slate-400">(Control {control.groupControl})</span>}</>
}
