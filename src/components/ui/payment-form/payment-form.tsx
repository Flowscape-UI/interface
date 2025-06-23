import type React from "react"
import { CreditCard } from "./credit-card"
import { usePaymentForm } from "./hooks/use-payment-form"
import type { PaymentFormProps } from "./types/payment-form"
import { cn } from "@/lib/utils"

const defaultLabels = {
  cardNumber: "Номер карты",
  cardHolder: "Держатель карты",
  expiryDate: "Срок действия",
  cvv: "CVV",
  submitButton: "Подтвердить оплату",
  enterCardNumber: "Введите номер карты",
  fullName: "ПОЛНОЕ ИМЯ",
  monthYear: "ММ/ГГ",
}

const defaultPlaceholders = {
  cardNumber: "1234 5678 9012 3456",
  cardHolder: "Полное имя",
  expiryDate: "ММ/ГГ",
  cvv: "•••",
}

export default function PaymentForm({
  onSubmit,
  labels = {},
  placeholders = {},
  className = "",
  disabled = false,
}: PaymentFormProps) {
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
  } = usePaymentForm()

  const mergedLabels = { ...defaultLabels, ...labels }
  const mergedPlaceholders = { ...defaultPlaceholders, ...placeholders }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSubmit && !disabled) {
      onSubmit(cardData)
    }
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 19) {
      updateCardNumber(e.target.value)
    }
  }

  const handleCardHolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateCardHolder(e.target.value)
  }

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 5) {
      updateCardExpiry(e.target.value)
    }
  }

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 3) {
      updateCardCvv(e.target.value)
    }
  }

  const handleCvvFocus = () => flipCard(true)
  const handleCvvBlur = () => flipCard(false)

  const isFormValid = cardType.type && cardData.number && cardData.holder && cardData.expiry && cardData.cvv

  const inputStyles = "w-full p-4 border border-gray-300 rounded-lg text-base box-border transition-all duration-300 bg-gray-50 text-gray-800 focus:outline-none focus:bg-white disabled:opacity-60 disabled:cursor-not-allowed"

  return (
    <div className={cn("w-full max-w-[420px] [perspective:1000px] font-mono", className)}>
      <CreditCard
        displayData={displayData}
        cardType={cardType}
        isFlipped={isFlipped}
        bankName={cardType.name || mergedLabels.enterCardNumber}
      />

      <form
        className="bg-white p-[5%] rounded-xl shadow-lg -mt-[140px] pt-[160px] border border-gray-200 max-[450px]:-mt-[120px] max-[450px]:pt-[140px]"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div className="mb-[5%] relative">
          <label htmlFor="card-number" className="block mb-1.5 text-sm text-gray-600 font-medium">
            {mergedLabels.cardNumber}
          </label>
          <input
            type="text"
            id="card-number"
            className={inputStyles}
            value={cardData.number}
            onChange={handleCardNumberChange}
            placeholder={mergedPlaceholders.cardNumber}
            disabled={disabled}
            style={{
              borderColor: cardData.number ? cardType.color : '#D1D5DB',
              boxShadow: cardData.number ? `0 0 0 2px ${cardType.color}33` : 'none',
            }}
          />
        </div>

        <div className="mb-[5%] relative">
          <label htmlFor="card-holder" className="block mb-1.5 text-sm text-gray-600 font-medium">
            {mergedLabels.cardHolder}
          </label>
          <input
            type="text"
            id="card-holder"
            className={inputStyles}
            value={cardData.holder}
            onChange={handleCardHolderChange}
            placeholder={mergedPlaceholders.cardHolder}
            disabled={disabled}
          />
        </div>

        <div className="flex gap-4">
          <div className="mb-[5%] relative w-full">
            <label htmlFor="card-expiry" className="block mb-1.5 text-sm text-gray-600 font-medium">
              {mergedLabels.expiryDate}
            </label>
            <input
              type="text"
              id="card-expiry"
              className={inputStyles}
              value={cardData.expiry}
              onChange={handleExpiryChange}
              placeholder={mergedPlaceholders.expiryDate}
              disabled={disabled}
            />
          </div>
          <div className="mb-[5%] relative w-full">
            <label htmlFor="card-cvv" className="block mb-1.5 text-sm text-gray-600 font-medium">
              {mergedLabels.cvv}
            </label>
            <input
              type="text"
              id="card-cvv"
              className={inputStyles}
              value={cardData.cvv}
              onChange={handleCvvChange}
              onFocus={handleCvvFocus}
              onBlur={handleCvvBlur}
              placeholder={mergedPlaceholders.cvv}
              disabled={disabled}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!isFormValid || disabled}
          className="w-full p-4 text-white border-none rounded-lg text-base font-light cursor-pointer transition-all duration-300 shadow-md hover:enabled:-translate-y-0.5 hover:enabled:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
          style={{ background: `linear-gradient(135deg, ${cardType.color}, #00d2ff)` }}
        >
          {mergedLabels.submitButton}
        </button>
      </form>
    </div>
  )
}
