import { McmHelperHiddenToggle, McmHelperToggle } from '@/config.ts'

export default function DisplayControlGroupControlConfig({
  control,
}: { control: McmHelperToggle | McmHelperHiddenToggle }) {
  return (
    <>
      {control.groupControl !== undefined && (
        <span className="text-slate-400 text-xs italic">(Control {control.groupControl})</span>
      )}
    </>
  )
}
