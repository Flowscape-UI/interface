// import type React from "react"
// // import { usePaymentForm } from "./hooks/use-payment-form"
// // import { CreditCard } from "./credit-card"
// import type { PaymentFormProps } from "./types/types"

// const defaultLabels = {
//   cardNumber: "Номер карты",
//   cardHolder: "Держатель карты",
//   expiryDate: "Срок действия",
//   cvv: "CVV",
//   submitButton: "Подтвердить оплату",
//   enterCardNumber: "Введите номер карты",
//   fullName: "ПОЛНОЕ ИМЯ",
//   monthYear: "ММ/ГГ",
// }

// const defaultPlaceholders = {
//   cardNumber: "1234 5678 9012 3456",
//   cardHolder: "Полное имя",
//   expiryDate: "ММ/ГГ",
//   cvv: "•••",
// }

// export default function PaymentForm({
//   onSubmit,
//   labels = {},
//   placeholders = {},
//   className = "",
//   disabled = false,
// }: PaymentFormProps) {
//   const {
//     cardData,
//     cardType,
//     isFlipped,
//     displayData,
//     updateCardNumber,
//     updateCardHolder,
//     updateCardExpiry,
//     updateCardCvv,
//     flipCard,
//   } = usePaymentForm()

//   const mergedLabels = { ...defaultLabels, ...labels }
//   const mergedPlaceholders = { ...defaultPlaceholders, ...placeholders }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (onSubmit && !disabled) {
//       onSubmit(cardData)
//     }
//   }

//   const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.value.length <= 19) {
//       updateCardNumber(e.target.value)
//     }
//   }

//   const handleCardHolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     updateCardHolder(e.target.value)
//   }

//   const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.value.length <= 5) {
//       updateCardExpiry(e.target.value)
//     }
//   }

//   const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.value.length <= 3) {
//       updateCardCvv(e.target.value)
//     }
//   }

//   const handleCvvFocus = () => flipCard(true)
//   const handleCvvBlur = () => flipCard(false)

//   const isFormValid = cardType.type && cardData.number && cardData.holder && cardData.expiry && cardData.cvv

//   return (
//     <div className={`payment-container ${className}`}>
//       <style>{`
//         .payment-container {
//           width: 100%;
//           max-width: 420px;
//           perspective: 1000px;
//           font-family: "Fira Code", monospace;
//         }

//         .card-wrapper {
//           position: relative;
//           width: 100%;
//           aspect-ratio: 2;
//           perspective: 1000px;
//           display: flex;
//           justify-content: center;
//         }

//         .card {
//           position: absolute;
//           width: 90%;
//           height: 100%;
//           transform-style: preserve-3d;
//           transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
//           border-radius: 16px;
//           box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
//         }

//         .card-front,
//         .card-back {
//           position: absolute;
//           width: 100%;
//           height: 100%;
//           backface-visibility: hidden;
//           overflow: hidden;
//           border-radius: 16px;
//           box-sizing: border-box;
//           display: flex;
//           flex-direction: column;
//           justify-content: space-between;
//           color: white;
//           transition: all 0.3s ease;
//         }

//         .card-back {
//           transform: rotateY(180deg);
//           background: linear-gradient(135deg, #3a3a3a, #1a1a1a);
//         }

//         .card-info-container {
//           width: 100%;
//           height: 100%;
//         }

//         .card-info-type {
//           width: 100%;
//           height: 35%;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           padding: 20px;
//           background: linear-gradient(135deg, #3a7bd5, #00d2ff);
//           transition: background 0.5s ease;
//         }

//         .card-info-user {
//           padding: 20px;
//           width: 100%;
//           height: 65%;
//           background: #252B37;
//         }

//         .card-info-user-container {
//           width: 100%;
//           height: 100%;
//           display: flex;
//           flex-direction: column;
//           justify-content: end;
//         }

//         .card-details {
//           display: flex;
//           justify-content: space-between;
//         }

//         .card-holder,
//         .card-expiry {
//           display: flex;
//           flex-direction: column;
//         }

//         .label {
//           font-size: clamp(10px, 2.5vw, 12px);
//           opacity: 0.8;
//           margin-bottom: 5px;
//           text-transform: uppercase;
//           letter-spacing: 1px;
//         }

//         .value {
//           font-size: clamp(12px, 3vw, 14px);
//           font-weight: 500;
//           letter-spacing: 1px;
//           transition: all 0.3s ease;
//         }

//         .card-number {
//           margin-top: 10px;
//           font-size: clamp(12px, 4vw, 20px);
//           letter-spacing: 2px;
//           text-align: center;
//           white-space: nowrap;
//           transition: all 0.3s ease;
//         }

//         .card-type-container {
//           height: 42px;
//           padding: 8px;
//           background: #fff;
//           border-radius: 10px;
//           display: flex;
//           opacity: 0;
//           transform: translateY(20px);
//           transition: opacity 0.3s ease, transform 0.3s ease;
//         }

//         .card-type-container.visible {
//           opacity: 1;
//           transform: translateY(0);
//         }

//         .card-type {
//           width: 50px;
//           height: auto;
//           aspect-ratio: 1 / 1;
//           background-size: contain;
//           background-repeat: no-repeat;
//           background-position: center;
//           opacity: 0;
//           transform: scale(0.8);
//           transition: all 0.3s ease;
//         }

//         .card-type.visible {
//           opacity: 1;
//           transform: scale(1);
//         }

//         .card-magnetic-strip {
//           height: 40px;
//           background: #1a1a1a;
//           margin-top: 27px;
//           width: 100%;
//         }

//         .card-cvv {
//           background: white;
//           color: #333;
//           padding: 4%;
//           border-radius: 14px;
//           position: absolute;
//           bottom: 15px;
//           right: 15px;
//         }

//         .card-cvv .label {
//           font-size: clamp(10px, 2vw, 14px);
//           margin-bottom: 5px;
//           color: #666;
//         }

//         .card-cvv .value {
//           font-size: clamp(14px, 3vw, 18px);
//           font-weight: 500;
//           letter-spacing: 2px;
//           font-family: 'Courier New', monospace;
//         }

//         .card-form {
//           background: #fff;
//           padding: 5%;
//           border-radius: 12px;
//           box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
//           margin-top: -140px;
//           padding-top: 160px;
//           border: 1px solid #d5d5d5;
//         }

//         .form-group {
//           margin-bottom: 5%;
//           position: relative;
//         }

//         .form-row {
//           display: flex;
//           gap: 10px;
//         }

//         label {
//           display: block;
//           margin-bottom: 5px;
//           font-size: clamp(12px, 2.5vw, 13px);
//           color: #555;
//           font-weight: 500;
//         }

//         input {
//           width: 100%;
//           padding: 15px;
//           border: 1px solid #ddd;
//           border-radius: 8px;
//           font-size: clamp(14px, 3vw, 16px);
//           box-sizing: border-box;
//           transition: all 0.3s ease;
//           background: #f9f9f9;
//         }

//         input:focus {
//           border-color: ${cardType.color};
//           box-shadow: 0 0 0 2px ${cardType.color}33;
//           outline: none;
//           background: white;
//         }

//         input:disabled {
//           opacity: 0.6;
//           cursor: not-allowed;
//         }

//         button {
//           width: 100%;
//           padding: 4%;
//           background: linear-gradient(135deg, ${cardType.color}, #00d2ff);
//           color: white;
//           border: none;
//           border-radius: 8px;
//           font-size: clamp(14px, 3vw, 16px);
//           font-weight: 300;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//         }

//         button:hover:not(:disabled) {
//           transform: translateY(-2px);
//           box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
//         }

//         button:disabled {
//           opacity: 0.6;
//           cursor: not-allowed;
//           transform: none;
//         }

//         @media screen and (max-width: 450px) {
//           .card-form {
//             margin-top: -120px;
//             padding-top: 140px;
//           }
//         }

//         @media screen and (max-width: 370px) {
//           .card {
//             width: 100%;
//           }
//           .card-wrapper {
//             aspect-ratio: 1.6;
//           }
//         }
//       `}</style>

//       <CreditCard
//         displayData={displayData}
//         cardType={cardType}
//         isFlipped={isFlipped}
//         bankName={cardType.name || mergedLabels.enterCardNumber}
//       />

//       <form className="card-form" onSubmit={handleSubmit} autoComplete="off">
//         <div className="form-group">
//           <label htmlFor="card-number">{mergedLabels.cardNumber}</label>
//           <input
//             type="text"
//             id="card-number"
//             value={cardData.number}
//             onChange={handleCardNumberChange}
//             placeholder={mergedPlaceholders.cardNumber}
//             disabled={disabled}
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="card-holder">{mergedLabels.cardHolder}</label>
//           <input
//             type="text"
//             id="card-holder"
//             value={cardData.holder}
//             onChange={handleCardHolderChange}
//             placeholder={mergedPlaceholders.cardHolder}
//             disabled={disabled}
//           />
//         </div>

//         <div className="form-row">
//           <div className="form-group">
//             <label htmlFor="card-expiry">{mergedLabels.expiryDate}</label>
//             <input
//               type="text"
//               id="card-expiry"
//               value={cardData.expiry}
//               onChange={handleExpiryChange}
//               placeholder={mergedPlaceholders.expiryDate}
//               disabled={disabled}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="card-cvv">{mergedLabels.cvv}</label>
//             <input
//               type="text"
//               id="card-cvv"
//               value={cardData.cvv}
//               onChange={handleCvvChange}
//               onFocus={handleCvvFocus}
//               onBlur={handleCvvBlur}
//               placeholder={mergedPlaceholders.cvv}
//               disabled={disabled}
//             />
//           </div>
//         </div>

//         <button type="submit" disabled={disabled || !isFormValid}>
//           {mergedLabels.submitButton}
//         </button>
//       </form>
//     </div>
//   )
// }
