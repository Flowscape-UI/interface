import type React from 'react';
import { useId } from 'react';
import { CreditCard } from './credit-card';
import { usePaymentForm } from './hooks/use-payment-form';
import type { PaymentFormProps } from './types/payment-form';
import { cn } from '@/lib/utils';

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
                            pattern="[0-9\s]*"
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
