import { MainLayout } from "@/main-layout";

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/patterns/payment-form/')({
  component: PaymentFormPage,
});


export function PaymentFormPage() {
//   const usageCode = `import { PaymentForm } from "@/components/ui/payment-form";

// export default function Page() {
//   return (
//     <div className="p-4">
//       <PaymentForm />
//     </div>
//   );
// }`;

  return (
    <MainLayout>
<div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Payment Form</h1>
        <p className="text-lg text-muted-foreground">
          A fully interactive payment form component with flip animation and form validation.
        </p>
      </div>

      {/* <PreviewTabs 
        title="Default" 
        codeText={usageCode}
      >
          <PaymentForm />
      </PreviewTabs> */}
    </div>
    </MainLayout>
    
  );
}
