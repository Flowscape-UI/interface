import { MainLayout } from '@/main-layout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/templates/')({
  component: TemplatesPage,
})

function TemplatesPage() {
  return <MainLayout>
    <div>Hello "/templates/"!</div>
  </MainLayout>
}
