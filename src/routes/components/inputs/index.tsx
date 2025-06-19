import { MainLayout } from '@/main-layout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/components/inputs/')({
  component: InputsPage,
})

function InputsPage() {
  return <MainLayout>
    <div>Hello "/components/inputs/"!</div>
  </MainLayout>
}