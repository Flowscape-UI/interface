import { MainLayout } from '@/main-layout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/docs/getting-started/')({
  component: GettingStartedPage,
})

function GettingStartedPage() {
  return <MainLayout>
    <div>Hello "/docs/getting-started/"!</div>
  </MainLayout>
}
