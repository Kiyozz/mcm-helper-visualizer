import McmContent from '@/components/page/mcm-content.tsx'
import { Toaster } from '@/components/ui/toaster.tsx'
import Header from '@/header.tsx'

function App() {
  return (
    <>
      <Toaster />
      <Header />

      <McmContent />
    </>
  )
}

export default App
