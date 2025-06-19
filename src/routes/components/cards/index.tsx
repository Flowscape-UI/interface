import { MainLayout } from '@/main-layout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/components/cards/')({
  component: CardsPage,
})

function CardsPage() {
  return <MainLayout>
    <div>Hello "/components/cards/"!</div>
  </MainLayout>
}
