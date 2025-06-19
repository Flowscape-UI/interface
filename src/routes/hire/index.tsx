import { MainLayout } from '@/main-layout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/hire/')({
  component: HirePage,
})

function HirePage() {
  return <MainLayout>
    <div>Hello "/hire/"!</div>
  </MainLayout>
}
