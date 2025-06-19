import { MainLayout } from '@/main-layout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/docs/cli/')({
  component: CliPage,
})

function CliPage() {
  return <MainLayout>
    <div>Hello "/docs/cli/"!</div>
  </MainLayout>
}
