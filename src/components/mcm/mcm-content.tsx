import { McmHelperConfig } from '@/config.ts'
import Page from '@/components/mcm/page.tsx'
import { useState } from 'react'

export default function McmContent({ mcmConfig }: { mcmConfig: McmHelperConfig }) {
  const currentPage = useState(mcmConfig.pages?.at(0))

  return (
    <div className="flex flex-col">
      <Page mcmConfig={mcmConfig} currentPage={currentPage} />
    </div>
  )
}
