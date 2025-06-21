// import type React from "react"
// import type { CardType } from "./types/types"
// import { getCardTypeIcon } from "./utils/card-utils"

// interface CreditCardProps {
//   displayData: {
//     number: string
//     holder: string
//     expiry: string
//     cvv: string
//   }
//   cardType: CardType
//   isFlipped: boolean
//   bankName: string
// }

// export const CreditCard: React.FC<CreditCardProps> = ({ displayData, cardType, isFlipped, bankName }) => {
//   const cardStyle = {
//     "--card-color": cardType.color,
//   } as React.CSSProperties

//   return (
//     <div className="card-wrapper">
//       <div
//         className={`card ${isFlipped ? "flipped" : ""}`}
//         style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
//       >
//         {/* Передняя сторона карты */}
//         <div className="card-front" style={cardStyle}>
//           <div className="card-info-container">
//             <div
//               className="card-info-type"
//               style={{
//                 background: `linear-gradient(135deg, ${cardType.color}, #00d2ff)`,
//               }}
//             >
//               <p>{bankName}</p>
//               <div className={`card-type-container ${cardType.type ? "visible" : ""}`}>
//                 {cardType.type && (
//                   <div
//                     className={`card-type visible ${cardType.type}`}
//                     style={{
//                       backgroundImage: `url(${getCardTypeIcon(cardType.type)})`,
//                     }}
//                   />
//                 )}
//               </div>
//             </div>

//             <div className="card-info-user">
//               <div className="card-info-user-container">
//                 <div>
//                   <div className="card-details">
//                     <div className="card-holder">
//                       <span className="label">Держатель карты</span>
//                       <span className="value">{displayData.holder}</span>
//                     </div>
//                     <div className="card-expiry">
//                       <span className="label">Срок действия</span>
//                       <span className="value">{displayData.expiry}</span>
//                     </div>
//                   </div>
//                   <div className="card-number">{displayData.number}</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Задняя сторона карты */}
//         <div className="card-back">
//           <div className="card-magnetic-strip"></div>
//           <div className="card-cvv">
//             <span className="label">CVV</span>
//             <span className="value">{displayData.cvv}</span>
//           </div>
//           {cardType.type && (
//             <div
//               className={`card-type visible ${cardType.type}`}
//               style={{
//                 backgroundImage: `url(${getCardTypeIcon(cardType.type)})`,
//               }}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }
