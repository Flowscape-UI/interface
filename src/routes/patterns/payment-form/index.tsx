import { createFileRoute } from '@tanstack/react-router';
import { MainLayout } from "@/main-layout";
import PageTitle from "@/components/ui/page-title";
import { PreviewTabs } from "@/components/preview-tabs";
import { UsageSection } from "@/components/usage-section";
import { DocsSection } from "@/components/docs-section";
import type { PropsTableRow } from "@/components/props-table";
import PaymentForm from "@/components/ui/payment-form/payment-form";
import { toast } from 'sonner';

export const Route = createFileRoute('/patterns/payment-form/')({
  component: PaymentFormPage,
});

const rows: PropsTableRow[] = [
  {
    prop: "onSubmit",
    type: "(data: CardData) => void",
    required: false,
    description: "Callback function triggered on form submission.",
  },
  {
    prop: "labels",
    type: "object",
    required: false,
    description: "Custom labels for form fields and buttons.",
  },
  {
    prop: "placeholders",
    type: "object",
    required: false,
    description: "Custom placeholders for form input fields.",
  },
  {
    prop: "className",
    type: "string",
    required: false,
    description: "Additional CSS classes for the container.",
  },
  {
    prop: "disabled",
    type: "boolean",
    required: false,
    description: "Disables the form inputs and submit button.",
  },
];

const defaultUsageCode = `
import PaymentForm from "@/components/ui/payment-form/payment-form";
import { toast } from 'sonner';

export default function Page() {
  const handleSubmit = (data) => {
    console.log("Payment Data:", data);
    toast.success("Payment submitted!", {
      description: "Check the console for the form data.",
    });
  };

  return (
    <div className="w-full max-w-md mx-auto flex items-center justify-center p-4 h-full">
      <PaymentForm onSubmit={handleSubmit} />
    </div>
  );
}
`;

const customizedUsageCode = `
import PaymentForm from "@/components/ui/payment-form/payment-form";
import { toast } from 'sonner';

export default function Page() {
  const customLabels = {
    cardNumber: "Card Number",
    cardHolder: "Cardholder Name",
    expiryDate: "Expiry",
    cvv: "CVC",
    submitButton: "Pay Now",
  };

  const customPlaceholders = {
    cardNumber: "•••• •••• •••• ••••",
    cardHolder: "Jane Doe",
    expiryDate: "MM/YY",
    cvv: "123",
  };

  const handleSubmit = (data) => {
    console.log("Payment Data:", data);
    toast.success("Payment submitted!", {
      description: "Check the console for the form data.",
    });
  };

  return (
    <div className="w-full max-w-md mx-auto flex items-center justify-center p-4 h-full">
      <PaymentForm
        onSubmit={handleSubmit}
        labels={customLabels}
        placeholders={customPlaceholders}
      />
    </div>
  );
}
`;

const disabledUsageCode = `
import PaymentForm from "@/components/ui/payment-form/payment-form";

export default function Page() {
  return (
    <div className="w-full max-w-md mx-auto flex items-center justify-center p-4 h-full">
      <PaymentForm disabled />
    </div>
  );
}
`;

export function PaymentFormPage() {
  const handleSubmit = (data: any) => {
    console.log("Payment Data:", data);
    toast.success("Payment submitted!", {
      description: "Check the console for the form data.",
    });
  };

  const customLabels = {
    cardNumber: "Card Number",
    cardHolder: "Cardholder Name",
    expiryDate: "Expiry",
    cvv: "CVC",
    submitButton: "Pay Now",
  };

  const customPlaceholders = {
    cardNumber: "•••• •••• •••• ••••",
    cardHolder: "Jane Doe",
    expiryDate: "MM/YY",
    cvv: "123",
  };

  return (
    <MainLayout>
      <div className="px-6 py-16 w-full">
        <PageTitle>Payment Form</PageTitle>
        <p className="text-white/60 max-w-xl mt-2">
          A fully interactive and animated payment form component. It includes card type detection, a flipping card effect on CVV focus, and customizable labels and placeholders.
        </p>

        <div className="mt-8 flex flex-col gap-10">
          <PreviewTabs title="Default" codeText={defaultUsageCode}>
            <div className="w-full max-w-md mx-auto flex items-center justify-center p-4 h-full">
                <PaymentForm onSubmit={handleSubmit} />
            </div>
          </PreviewTabs>

          <PreviewTabs title="Customized" codeText={customizedUsageCode}>
            <div className="w-full max-w-md mx-auto flex items-center justify-center p-4 h-full">
                <PaymentForm
                    onSubmit={handleSubmit}
                    labels={customLabels}
                    placeholders={customPlaceholders}
                />
            </div>
          </PreviewTabs>

          <PreviewTabs title="Disabled" codeText={disabledUsageCode}>
            <div className="w-full max-w-md mx-auto flex items-center justify-center p-4 h-full">
                <PaymentForm disabled />
            </div>
          </PreviewTabs>
        </div>

        <UsageSection
          description="Import the component and use it within your page. You can provide an onSubmit callback to handle the form data."
          code={defaultUsageCode}
        />

        <DocsSection
          description="The PaymentForm component accepts the following props to customize its appearance and behavior."
          rows={rows}
        />
      </div>
    </MainLayout>
  );
}
