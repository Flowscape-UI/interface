import { createFileRoute } from '@tanstack/react-router';
import { MainLayout } from '@/main-layout';
import PageTitle from '@/components/ui/page-title';
import { PreviewTabs } from '@/components/preview-tabs';
import { UsageSection } from '@/components/usage-section';
import { DocsSection } from '@/components/docs-section';
import type { PropsTableRow } from '@/components/props-table';
import PaymentForm from '@/components/ui/payment-form/payment-form';
import { toast } from 'sonner';
import { useTranslation } from '@/hooks/use-translation';

export const Route = createFileRoute('/patterns/payment-form/')({
    component: PaymentFormPage,
});

const rows: PropsTableRow[] = [
    {
        prop: 'onSubmit',
        type: '(data: CardData) => void',
        required: false,
        defaultValue: '() => {}',
        description: 'Callback function triggered on form submission.',
    },
    {
        prop: 'labels',
        type: 'object',
        required: false,
        defaultValue: '{}',
        description: 'Custom labels for form fields and buttons.',
    },
    {
        prop: 'placeholders',
        type: 'object',
        required: false,
        defaultValue: '{}',
        description: 'Custom placeholders for form input fields.',
    },
    {
        prop: 'className',
        type: 'string',
        required: false,
        defaultValue: '""',
        description: 'Additional CSS classes for the container.',
    },
    {
        prop: 'disabled',
        type: 'boolean',
        required: false,
        defaultValue: 'false',
        description: 'Disables the form inputs and submit button.',
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

const componentCode = `/* eslint-disable react-refresh/only-export-components */
import type React from 'react';
import { useCallback, useId, useState } from 'react';
import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface CardData {
  number: string;
  holder: string;
  expiry: string;
  cvv: string;
}

export interface CardType {
  type: string;
  color: string;
  name: string;
}

export interface PaymentFormProps {
  onSubmit?: (data: CardData) => void;
  labels?: {
      cardNumber?: string;
      cardHolder?: string;
      expiryDate?: string;
      cvv?: string;
      submitButton?: string;
      enterCardNumber?: string;
      fullName?: string;
      monthYear?: string;
  };
  placeholders?: {
      cardNumber?: string;
      cardHolder?: string;
      expiryDate?: string;
      cvv?: string;
  };
  className?: string;
  disabled?: boolean;
}


export interface CardData {
  number: string;
  holder: string;
  expiry: string;
  cvv: string;
}

export interface CardType {
  type: string;
  color: string;
  name: string;
}

export interface PaymentFormProps {
  onSubmit?: (data: CardData) => void;
  labels?: {
      cardNumber?: string;
      cardHolder?: string;
      expiryDate?: string;
      cvv?: string;
      submitButton?: string;
      enterCardNumber?: string;
      fullName?: string;
      monthYear?: string;
  };
  placeholders?: {
      cardNumber?: string;
      cardHolder?: string;
      expiryDate?: string;
      cvv?: string;
  };
  className?: string;
  disabled?: boolean;
}


 
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

const defaultLabels = {
    cardNumber: 'CARD NUMBER',
    cardHolder: 'CARD HOLDER',
    expiryDate: 'EXPIRY DATE',
    cvv: 'CVV',
    submitButton: 'Submit Payment',
    enterCardNumber: 'Enter card number',
    fullName: 'FULL NAME',
    monthYear: 'MM/YY',
};

const defaultPlaceholders = {
    cardNumber: '1234 5678 9012 3456',
    cardHolder: 'FULL NAME',
    expiryDate: 'MM/YY',
    cvv: '•••',
};

export default function PaymentForm({
    onSubmit = () => {},
    labels = {},
    placeholders = {},
    className = '',
    disabled = false,
}: PaymentFormProps) {
    const cardNumberId = useId();
    const cardHolderId = useId();
    const expiryId = useId();
    const cvvId = useId();
    const {
        cardData,
        cardType,
        isFlipped,
        displayData,
        updateCardNumber,
        updateCardHolder,
        updateCardExpiry,
        updateCardCvv,
        flipCard,
    } = usePaymentForm();

    const mergedLabels = { ...defaultLabels, ...labels };
    const mergedPlaceholders = { ...defaultPlaceholders, ...placeholders };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit && !disabled) {
            onSubmit(cardData);
        }
    };

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length <= 19) {
            updateCardNumber(e.target.value);
        }
    };

    const handleCardHolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateCardHolder(e.target.value);
    };

    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length <= 5) {
            updateCardExpiry(e.target.value);
        }
    };

    const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length <= 3) {
            updateCardCvv(e.target.value);
        }
    };

    const handleCvvFocus = () => flipCard(true);
    const handleCvvBlur = () => flipCard(false);

    const isFormValid =
        cardType.type && cardData.number && cardData.holder && cardData.expiry && cardData.cvv;

    return (
        <form
            onSubmit={handleSubmit}
            className={cn(
                'mx-auto flex w-full max-w-md flex-col gap-6 rounded-xl bg-neutral-900 p-4 shadow-lg sm:p-6',
                className,
            )}
        >
            <div className="flex flex-col items-center gap-4 sm:gap-6">
                <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
                    <CreditCard
                        displayData={displayData}
                        cardType={cardType}
                        isFlipped={isFlipped}
                        bankName={mergedLabels.fullName}
                    />
                </div>
                <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor={cardNumberId}
                            className="text-xs font-medium text-white sm:text-sm"
                        >
                            {mergedLabels.cardNumber}
                        </label>
                        <input
                            id={cardNumberId}
                            type="text"
                            className="input input-bordered focus:ring-primary w-full rounded-md bg-neutral-800 px-3 py-2 text-base text-white transition placeholder:text-neutral-400 focus:ring-2 focus:outline-none sm:text-sm"
                            placeholder={mergedPlaceholders.cardNumber}
                            value={cardData.number}
                            onChange={handleCardNumberChange}
                            disabled={disabled}
                            autoComplete="cc-number"
                            inputMode="numeric"
                            pattern="[0-9\\s]*"
                            maxLength={19}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor={cardHolderId}
                            className="text-xs font-medium text-white sm:text-sm"
                        >
                            {mergedLabels.cardHolder}
                        </label>
                        <input
                            id={cardHolderId}
                            type="text"
                            className="input input-bordered focus:ring-primary w-full rounded-md bg-neutral-800 px-3 py-2 text-base text-white transition placeholder:text-neutral-400 focus:ring-2 focus:outline-none sm:text-sm"
                            placeholder={mergedPlaceholders.cardHolder}
                            value={cardData.holder}
                            onChange={handleCardHolderChange}
                            disabled={disabled}
                            autoComplete="cc-name"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor={expiryId}
                            className="text-xs font-medium text-white sm:text-sm"
                        >
                            {mergedLabels.expiryDate}
                        </label>
                        <input
                            id={expiryId}
                            type="text"
                            className="input input-bordered focus:ring-primary w-full rounded-md bg-neutral-800 px-3 py-2 text-base text-white transition placeholder:text-neutral-400 focus:ring-2 focus:outline-none sm:text-sm"
                            placeholder={mergedPlaceholders.expiryDate}
                            value={cardData.expiry}
                            onChange={handleExpiryChange}
                            disabled={disabled}
                            autoComplete="cc-exp"
                            maxLength={5}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor={cvvId}
                            className="text-xs font-medium text-white sm:text-sm"
                        >
                            {mergedLabels.cvv}
                        </label>
                        <input
                            id={cvvId}
                            type="password"
                            className="input input-bordered focus:ring-primary w-full rounded-md bg-neutral-800 px-3 py-2 text-base text-white transition placeholder:text-neutral-400 focus:ring-2 focus:outline-none sm:text-sm"
                            placeholder={mergedPlaceholders.cvv}
                            value={cardData.cvv}
                            onChange={handleCvvChange}
                            onFocus={handleCvvFocus}
                            onBlur={handleCvvBlur}
                            disabled={disabled}
                            autoComplete="cc-csc"
                            maxLength={4}
                        />
                    </div>
                </div>
            </div>
            <button
                type="submit"
                disabled={!isFormValid || disabled}
                className="bg-primary hover:bg-primary/90 w-full rounded-lg px-4 py-3 text-base font-semibold text-white shadow-md transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 sm:text-lg"
            >
                {mergedLabels.submitButton}
            </button>
        </form>
    );
}

interface CreditCardProps {
    displayData: {
        number: string;
        holder: string;
        expiry: string;
        cvv: string;
    };
    cardType: CardType;
    isFlipped: boolean;
    bankName: string;
}

export const CreditCard: React.FC<CreditCardProps> = ({
  displayData,
  cardType,
  isFlipped,
  bankName,
}) => {
  return (
      <div className="relative flex aspect-[1.8/1] w-full justify-center [perspective:1000px]">
          <div
              className="absolute h-full w-full rounded-2xl shadow-xl transition-transform duration-700 ease-in-out [transform-style:preserve-3d]"
              style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
          >
              {/* Card Front */}
              <div className="absolute flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl text-white transition-all duration-300 ease-in-out [backface-visibility:hidden]">
                  <div className="h-full w-full">
                      <div
                          className="flex h-[40%] w-full items-center justify-between p-5 transition-colors duration-500 ease-in-out"
                          style={{
                              background: [
                                  'linear-gradient(135deg, ',
                                  cardType.color,
                                  ', #00d2ff)',
                              ].join(''),
                          }}
                      >
                          <p className="font-medium">{bankName}</p>
                          <div
                              className={cn(
                                  'flex h-[42px] translate-y-5 rounded-xl bg-white/80 p-2 opacity-0 backdrop-blur-sm transition-all duration-300 ease-in-out',
                                  cardType.type && 'translate-y-0 opacity-100',
                              )}
                          >
                              {cardType.type && (
                                  <div
                                      className={cn(
                                          'aspect-square w-[50px] scale-80 bg-contain bg-center bg-no-repeat opacity-0 transition-all duration-300 ease-in-out',
                                          cardType.type && 'scale-100 opacity-100',
                                      )}
                                      style={{
                                          backgroundImage: 'url(' + getCardTypeIcon(cardType.type) + ')',
                                      }}
                                  />
                              )}
                          </div>
                      </div>
                      <div className="h-[60%] w-full bg-[#252B37] p-5">
                          <div className="flex h-full w-full flex-col justify-end">
                              <div>
                                  <div className="flex justify-between">
                                      <div className="flex flex-col">
                                          <span className="mb-1 text-xs tracking-wider uppercase opacity-80">
                                              CARD HOLDER
                                          </span>
                                          <span className="h-6 text-sm font-medium tracking-wider transition-all duration-300 ease-in-out">
                                              {displayData.holder}
                                          </span>
                                      </div>
                                      <div className="flex flex-col">
                                          <span className="mb-1 text-xs tracking-wider uppercase opacity-80">
                                              EXPIRY DATE
                                          </span>
                                          <span className="h-6 text-sm font-medium tracking-wider transition-all duration-300 ease-in-out">
                                              {displayData.expiry}
                                          </span>
                                      </div>
                                  </div>
                                  <div className="mt-2.5 h-8 text-center text-xl tracking-widest whitespace-nowrap transition-all duration-300 ease-in-out">
                                      {displayData.number}
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              {/* Card Back */}
              <div className="absolute flex h-full w-full [transform:rotateY(180deg)] flex-col items-end justify-start overflow-hidden rounded-2xl bg-gradient-to-br from-gray-700 to-gray-900 text-white transition-all duration-300 ease-in-out [backface-visibility:hidden]">
                  <div className="mt-7 h-12 w-full bg-gray-900" />
                  <div className="flex w-full flex-col items-end p-4">
                      <span className="text-xs text-gray-300">CVV</span>
                      <div className="mt-1 flex h-10 w-full items-center justify-end rounded-md bg-white px-4 font-mono tracking-widest text-gray-800">
                          {displayData.cvv}
                      </div>
                  </div>
                  {cardType.type && (
                      <div
                          className="mt-4 mr-4 aspect-video w-[60px] bg-contain bg-center bg-no-repeat"
                          style={{
                              backgroundImage: 'url(' + getCardTypeIcon(cardType.type) + ')',
                          }}
                      />
                  )}
              </div>
          </div>
      </div>
  );
};

export const detectCardType = (number: string): CardType => {
  const num = number.replace(/\\s/g, "")

  if (/^4/.test(num)) return { type: "visa", color: "#1a1f71", name: "Visa" }
  if (/^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01])/.test(num))
    return { type: "mastercard", color: "#eb001b", name: "Mastercard" }
  if (/^3[47]/.test(num)) return { type: "amex", color: "#016fd0", name: "American Express" }
  if (/^6(011|5|22[126-925])/.test(num)) return { type: "discover", color: "#ff6000", name: "Discover" }
  if (/^35(2[89]|[3-8][0-9])/.test(num)) return { type: "jcb", color: "#0c4b8e", name: "JCB" }
  if (/^62/.test(num)) return { type: "unionpay", color: "#045aa7", name: "UnionPay" }
  if (/^(30[0-5]|36|38|39)/.test(num)) return { type: "diners", color: "#888", name: "Diners Club" }
  if (/^220[01]/.test(num)) return { type: "mir", color: "#39b54a", name: "МИР" }

  return { type: "", color: "#3a7bd5", name: "Unknown" }
}

export const formatCardNumber = (value: string): string => {
  const cleaned = value.replace(/\\s+/g, "").replace(/[^0-9]/gi, "")
  let formatted = ""

  for (let i = 0; i < cleaned.length; i++) {
    if (i > 0 && i % 4 === 0) formatted += " "
    formatted += cleaned[i]
  }

  return formatted
}

export const formatDisplayCardNumber = (value: string): string => {
  const cleaned = value.replace(/\\s/g, "")
  let displayed = ""

  for (let i = 0; i < 16; i++) {
    displayed += i < cleaned.length ? cleaned[i] : "•"
    if ((i + 1) % 4 === 0 && i !== 15) displayed += " "
  }

  return displayed || "•••• •••• •••• ••••"
}

export const formatExpiry = (value: string): string => {
  const cleaned = value.replace(/[^0-9]/g, "")

  if (cleaned.length > 2) {
    const month = Number.parseInt(cleaned.substring(0, 2), 10)
    const year = Number.parseInt(cleaned.substring(2, 4), 10)
    return (
      Math.min(month, 12).toString().padStart(2, '0') +
      '/' +
      (year > 38 ? '38' : year.toString().padStart(2, '0'))
  );
  }

  return cleaned.substring(0, 2)
}

export const transliterate = (text: string): string => {
  const translitMap: Record<string, string> = {
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "yo",
    ж: "zh",
    з: "z",
    и: "i",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "kh",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "sch",
    ъ: "",
    ы: "y",
    ь: "",
    э: "e",
    ю: "yu",
    я: "ya",
    А: "A",
    Б: "B",
    В: "V",
    Г: "G",
    Д: "D",
    Е: "E",
    Ё: "Yo",
    Ж: "Zh",
    З: "Z",
    И: "I",
    Й: "Y",
    К: "K",
    Л: "L",
    М: "M",
    Н: "N",
    О: "O",
    П: "P",
    Р: "R",
    С: "S",
    Т: "T",
    У: "U",
    Ф: "F",
    Х: "Kh",
    Ц: "Ts",
    Ч: "Ch",
    Ш: "Sh",
    Щ: "Sch",
    Ъ: "'",
    Ы: "Y",
    Ь: "'",
    Э: "E",
    Ю: "Yu",
    Я: "Ya",
  }

  return text
    .split("")
    .map((char) => translitMap[char] || char)
    .join("")
}

const getCardTypeIcon = (type: string): string => {
  const icons: Record<string, string> = {
    visa: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg",
    mastercard: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
    amex: "https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg",
    discover: "https://upload.wikimedia.org/wikipedia/commons/5/57/Discover_Card_logo.svg",
    jcb: "https://upload.wikimedia.org/wikipedia/commons/1/1b/JCB_logo.svg",
    unionpay: "https://upload.wikimedia.org/wikipedia/commons/3/35/UnionPay_logo.svg",
    diners: "https://upload.wikimedia.org/wikipedia/commons/2/26/Diners_Club_International_logo.svg",
    mir: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Mir-logo.SVG.svg",
  }

  return icons[type] || ""
}

const usePaymentForm = () => {
  const [cardData, setCardData] = useState<CardData>({
    number: "",
    holder: "",
    expiry: "",
    cvv: "",
  })

  const [isFlipped, setIsFlipped] = useState(false)
  const [cardType, setCardType] = useState(detectCardType(""))

  const updateCardNumber = useCallback((value: string) => {
    const formatted = formatCardNumber(value)
    const newCardType = detectCardType(value)

    setCardData((prev) => ({ ...prev, number: formatted }))
    setCardType(newCardType)
  }, [])

  const updateCardHolder = useCallback((value: string) => {
    let transliterated = transliterate(value)
    if (transliterated.length > 35) {
      transliterated = transliterated.slice(0, 35)
    }
    setCardData((prev) => ({ ...prev, holder: transliterated }))
  }, [])

  const updateCardExpiry = useCallback((value: string) => {
    const formatted = formatExpiry(value)
    setCardData((prev) => ({ ...prev, expiry: formatted }))
  }, [])

  const updateCardCvv = useCallback((value: string) => {
    const cleaned = value.replace(/[^0-9]/g, "")
    setCardData((prev) => ({ ...prev, cvv: cleaned }))
  }, [])

  const flipCard = useCallback((flip: boolean) => {
    setIsFlipped(flip)
  }, [])

  const getDisplayData = useCallback(
    () => ({
      number: formatDisplayCardNumber(cardData.number.replace(/\\s/g, "")),
      holder: cardData.holder.toUpperCase() || "FULL NAME",
      expiry: cardData.expiry || "MM/YY",
      cvv: cardData.cvv.replace(/./g, "•"),
    }),
    [cardData],
  )

  return {
    cardData,
    cardType,
    isFlipped,
    displayData: getDisplayData(),
    updateCardNumber,
    updateCardHolder,
    updateCardExpiry,
    updateCardCvv,
    flipCard,
  }
}
`;

export function PaymentFormPage() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSubmit = (data: any) => {
        console.log('Payment Data:', data);
        toast.success('Payment submitted!', {
            description: 'Check the console for the form data.',
        });
    };

    const customLabels = {
        cardNumber: 'Card Number',
        cardHolder: 'Cardholder Name',
        expiryDate: 'Expiry',
        cvv: 'CVC',
        submitButton: 'Pay Now',
    };

    const customPlaceholders = {
        cardNumber: '•••• •••• •••• ••••',
        cardHolder: 'Jane Doe',
        expiryDate: 'MM/YY',
        cvv: '123',
    };

    const { t } = useTranslation();

    return (
        <MainLayout>
            <div className="w-full px-6 py-16">
                <PageTitle>Payment Form</PageTitle>
                <p className="mt-2 max-w-xl text-white/60">
                    {t(
                        'A fully interactive and animated payment form component. It includes card type detection, a flipping card effect on CVV focus, and customizable labels and placeholders.',
                    )}
                </p>

                <div className="mt-8 flex flex-col gap-10">
                    <PreviewTabs
                        title="Default"
                        codeText={defaultUsageCode}
                        codeSandboxUrl="https://codepen.io/VlasovDevCore/pen/YPPryQQ"
                    >
                        <div className="mx-auto flex h-full w-full max-w-md items-center justify-center p-4">
                            <PaymentForm onSubmit={handleSubmit} />
                        </div>
                    </PreviewTabs>

                    <PreviewTabs
                        title="Customized"
                        codeText={customizedUsageCode}
                        codeSandboxUrl="https://codepen.io/VlasovDevCore/pen/YPPryQQ"
                    >
                        <div className="mx-auto flex h-full w-full max-w-md items-center justify-center p-4">
                            <PaymentForm
                                onSubmit={handleSubmit}
                                labels={customLabels}
                                placeholders={customPlaceholders}
                            />
                        </div>
                    </PreviewTabs>

                    <PreviewTabs
                        title="Disabled"
                        codeText={disabledUsageCode}
                        codeSandboxUrl="https://codepen.io/VlasovDevCore/pen/YPPryQQ"
                    >
                        <div className="mx-auto flex h-full w-full max-w-md items-center justify-center p-4">
                            <PaymentForm disabled />
                        </div>
                    </PreviewTabs>
                </div>

                <UsageSection
                    description={t(
                        'Import the component and use it within your page. You can provide callback to handle the form data.',
                    )}
                    code={componentCode}
                />

                <DocsSection
                    description={t(
                        'The PaymentForm component accepts the following props to customize its appearance and behavior.',
                    )}
                    rows={rows}
                />
            </div>
        </MainLayout>
    );
}
