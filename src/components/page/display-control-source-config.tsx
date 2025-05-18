import type { McmHelperHiddenToggle, McmHelperInput } from '@/config.ts'

export default function DisplayControlSourceConfig({ control }: { control: McmHelperHiddenToggle | McmHelperInput }) {
  const defaultValue = control.valueOptions?.defaultValue

  return (
    <>
      {control.valueOptions !== undefined && 'propertyName' in control.valueOptions && (
        <span className="text-slate-400 text-xs">(Property: {control.valueOptions.propertyName})</span>
      )}
      {control.valueOptions?.sourceType != null && (
        <span className="text-slate-400 text-xs">({control.valueOptions?.sourceType ?? 'SourceType not defined'})</span>
      )}
      {control.valueOptions?.sourceForm != null && (
        <span className="text-slate-400 text-xs">({control.valueOptions?.sourceForm ?? 'SourceForm not defined'})</span>
      )}
      {defaultValue !== undefined && (
        <span className="text-slate-400 text-xs">
          (Default: {defaultValue === true ? 'true' : defaultValue === false ? 'false' : defaultValue})
        </span>
      )}
    </>
  )
}
