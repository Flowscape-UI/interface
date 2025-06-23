export interface CardData {
    number: string
    holder: string
    expiry: string
    cvv: string
  }
  
  export interface CardType {
    type: string
    color: string
    name: string
  }
  
  export interface PaymentFormProps {
    onSubmit?: (data: CardData) => void
    labels?: {
      cardNumber?: string
      cardHolder?: string
      expiryDate?: string
      cvv?: string
      submitButton?: string
      enterCardNumber?: string
      fullName?: string
      monthYear?: string
    }
    placeholders?: {
      cardNumber?: string
      cardHolder?: string
      expiryDate?: string
      cvv?: string
    }
    className?: string
    disabled?: boolean
  }
  