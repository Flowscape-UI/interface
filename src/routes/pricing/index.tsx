import { MainLayout } from '@/main-layout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/pricing/')({
  component: PricingPage,
})

function PricingPage() {
  return <MainLayout>
    <div>Hello "/pricing/"!</div>
  </MainLayout>
}
