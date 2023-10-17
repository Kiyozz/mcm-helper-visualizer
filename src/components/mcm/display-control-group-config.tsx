import { McmHelperControl } from '@/config.ts'
import { groupConditionAsString } from '@/lib/group-condition-as-string.ts'

export default function DisplayControlGroupConfig({ control }: { control: McmHelperControl }) {
  return (
    <>
      {control.groupCondition !== undefined && (
        <span className="text-xs italic text-slate-400">(Conditioned {groupConditionAsString(control.groupCondition)})</span>
      )}

      {control.groupBehavior !== undefined && <span className="text-xs italic text-slate-400">(Behavior {control.groupBehavior})</span>}
    </>
  )
}
