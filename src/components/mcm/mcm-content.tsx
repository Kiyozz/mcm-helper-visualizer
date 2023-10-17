import Page from '@/components/mcm/page.tsx'
import HelpText from '@/components/mcm/help-text.tsx'

export default function McmContent() {
  return (
    <div className="flex flex-col">
      <Page />
      <HelpText />
    </div>
  )
}
