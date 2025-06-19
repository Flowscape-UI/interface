import { MainLayout } from '@/main-layout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/changelog/')({
  component: ChangelogPage,
})

function ChangelogPage() {
  return <MainLayout>
    <div>Hello "/changelog/"!</div>
  </MainLayout>
}
