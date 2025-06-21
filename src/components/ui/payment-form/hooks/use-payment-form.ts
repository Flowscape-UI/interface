// import { useState, useCallback } from "react"
// import {
//   detectCardType,
//   formatCardNumber,
//   formatDisplayCardNumber,
//   formatExpiry,
//   transliterate,
// } from "../utils/card-utils"
// import type { CardData } from "../types/types"

// export const usePaymentForm = () => {
//   const [cardData, setCardData] = useState<CardData>({
//     number: "",
//     holder: "",
//     expiry: "",
//     cvv: "",
//   })

//   const [isFlipped, setIsFlipped] = useState(false)
//   const [cardType, setCardType] = useState(detectCardType(""))

//   const updateCardNumber = useCallback((value: string) => {
//     const formatted = formatCardNumber(value)
//     const newCardType = detectCardType(value)

//     setCardData((prev) => ({ ...prev, number: formatted }))
//     setCardType(newCardType)
//   }, [])

//   const updateCardHolder = useCallback((value: string) => {
//     let transliterated = transliterate(value)
//     if (transliterated.length > 35) {
//       transliterated = transliterated.slice(0, 35)
//     }
//     setCardData((prev) => ({ ...prev, holder: transliterated }))
//   }, [])

//   const updateCardExpiry = useCallback((value: string) => {
//     const formatted = formatExpiry(value)
//     setCardData((prev) => ({ ...prev, expiry: formatted }))
//   }, [])

//   const updateCardCvv = useCallback((value: string) => {
//     const cleaned = value.replace(/[^0-9]/g, "")
//     setCardData((prev) => ({ ...prev, cvv: cleaned }))
//   }, [])

//   const flipCard = useCallback((flip: boolean) => {
//     setIsFlipped(flip)
//   }, [])

//   const getDisplayData = useCallback(
//     () => ({
//       number: formatDisplayCardNumber(cardData.number.replace(/\s/g, "")),
//       holder: cardData.holder.toUpperCase() || "ПОЛНОЕ ИМЯ",
//       expiry: cardData.expiry || "ММ/ГГ",
//       cvv: cardData.cvv.replace(/./g, "•"),
//     }),
//     [cardData],
//   )

//   return {
//     cardData,
//     cardType,
//     isFlipped, 
//     displayData: getDisplayData(),
//     updateCardNumber,
//     updateCardHolder,
//     updateCardExpiry,
//     updateCardCvv,
//     flipCard,
//   }
// }
