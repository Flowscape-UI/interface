import type React from "react"
import { getCardTypeIcon } from "./utils/card-utils"
import type { CardType } from "./types/payment-form"
import { cn } from "@/lib/utils"

interface CreditCardProps {
  displayData: {
    number: string
    holder: string
    expiry: string
    cvv: string
  }
  cardType: CardType
  isFlipped: boolean
  bankName: string
}

export const CreditCard: React.FC<CreditCardProps> = ({ displayData, cardType, isFlipped, bankName }) => {
  return (
    <div className="relative w-full aspect-[1.8/1] flex justify-center [perspective:1000px]">
      <div
        className="absolute w-[90%] h-full [transform-style:preserve-3d] transition-transform duration-700 ease-in-out rounded-2xl shadow-xl"
        style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* Card Front */}
        <div className="absolute w-full h-full [backface-visibility:hidden] overflow-hidden rounded-2xl flex flex-col justify-between text-white transition-all duration-300 ease-in-out">
          <div className="w-full h-full">
            <div
              className="w-full h-[40%] flex justify-between items-center p-5 transition-colors duration-500 ease-in-out"
              style={{ background: `linear-gradient(135deg, ${cardType.color}, #00d2ff)` }}
            >
              <p className="font-medium">{bankName}</p>
              <div
                className={cn(
                  "h-[42px] p-2 bg-white/80 backdrop-blur-sm rounded-xl flex opacity-0 translate-y-5 transition-all duration-300 ease-in-out",
                  cardType.type && "opacity-100 translate-y-0",
                )}
              >
                {cardType.type && (
                  <div
                    className={cn(
                      "w-[50px] aspect-square bg-contain bg-no-repeat bg-center opacity-0 scale-80 transition-all duration-300 ease-in-out",
                      cardType.type && "opacity-100 scale-100",
                    )}
                    style={{ backgroundImage: `url(${getCardTypeIcon(cardType.type)})` }}
                  />
                )}
              </div>
            </div>
            <div className="p-5 w-full h-[60%] bg-[#252B37]">
              <div className="w-full h-full flex flex-col justify-end">
                <div>
                  <div className="flex justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs opacity-80 mb-1 uppercase tracking-wider">Держатель карты</span>
                      <span className="text-sm font-medium tracking-wider transition-all duration-300 ease-in-out h-6">
                        {displayData.holder}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs opacity-80 mb-1 uppercase tracking-wider">Срок действия</span>
                      <span className="text-sm font-medium tracking-wider transition-all duration-300 ease-in-out h-6">
                        {displayData.expiry}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2.5 text-xl tracking-widest text-center whitespace-nowrap transition-all duration-300 ease-in-out h-8">
                    {displayData.number}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card Back */}
        <div className="absolute w-full h-full [backface-visibility:hidden] overflow-hidden rounded-2xl flex flex-col justify-start items-end text-white transition-all duration-300 ease-in-out [transform:rotateY(180deg)] bg-gradient-to-br from-gray-700 to-gray-900">
          <div className="h-12 bg-gray-900 mt-7 w-full" />
          <div className="w-full p-4 flex flex-col items-end">
            <span className="text-xs text-gray-300">CVV</span>
            <div className="h-10 w-full bg-white rounded-md mt-1 flex items-center justify-end px-4 text-gray-800 font-mono tracking-widest">
              {displayData.cvv}
            </div>
          </div>
          {cardType.type && (
            <div
              className="w-[60px] aspect-video bg-contain bg-no-repeat bg-center mr-4 mt-4"
              style={{ backgroundImage: `url(${getCardTypeIcon(cardType.type)})` }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
