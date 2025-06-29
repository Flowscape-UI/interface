import type React from 'react';
import { getCardTypeIcon } from './utils/card-utils';
import type { CardType } from './types/payment-form';
import { cn } from '@/lib/utils';

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
        <div className="relative mx-auto flex aspect-[16/10] w-full max-w-[340px] justify-center [perspective:1000px] sm:aspect-[1.8/1] sm:max-w-[420px]">
            <div
                className="absolute h-full w-full rounded-2xl shadow-xl transition-transform duration-700 ease-in-out [transform-style:preserve-3d]"
                style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
            >
                {/* Card Front */}
                <div className="absolute flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl text-white transition-all duration-300 ease-in-out [backface-visibility:hidden]">
                    <div className="h-full w-full">
                        <div
                            className="flex h-[40%] w-full items-center justify-between p-3 transition-colors duration-500 ease-in-out sm:p-5"
                            style={{
                                background: [
                                    'linear-gradient(135deg, ',
                                    cardType.color,
                                    ', #00d2ff)',
                                ].join(''),
                            }}
                        >
                            <p className="text-xs font-medium sm:text-base">{bankName}</p>
                            <div
                                className={cn(
                                    'flex h-[32px] translate-y-5 rounded-xl bg-white/80 p-1 opacity-0 backdrop-blur-sm transition-all duration-300 ease-in-out sm:h-[42px] sm:p-2',
                                    cardType.type && 'translate-y-0 opacity-100',
                                )}
                            >
                                {cardType.type && (
                                    <div
                                        className={cn(
                                            'aspect-square w-[32px] scale-80 bg-contain bg-center bg-no-repeat opacity-0 transition-all duration-300 ease-in-out sm:w-[50px]',
                                            cardType.type && 'scale-100 opacity-100',
                                        )}
                                        style={{
                                            backgroundImage:
                                                'url(' + getCardTypeIcon(cardType.type) + ')',
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="h-[60%] w-full bg-[#252B37] p-2 sm:p-5">
                            <div className="flex h-full w-full flex-col justify-end">
                                <div>
                                    <div className="flex justify-between p-1 sm:p-3">
                                        <div className="flex flex-col">
                                            <span className="mb-0.5 text-[10px] tracking-wider uppercase opacity-80 sm:text-xs">
                                                CARD HOLDER
                                            </span>
                                            <span className="h-5 text-xs font-medium tracking-wider transition-all duration-300 ease-in-out sm:h-6 sm:text-sm">
                                                {displayData.holder}
                                            </span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="mb-0.5 text-[10px] tracking-wider uppercase opacity-80 sm:text-xs">
                                                EXPIRY DATE
                                            </span>
                                            <span className="h-5 text-xs font-medium tracking-wider transition-all duration-300 ease-in-out sm:h-6 sm:text-sm">
                                                {displayData.expiry}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-2 h-7 text-center text-base tracking-widest whitespace-nowrap transition-all duration-300 ease-in-out sm:h-8 sm:text-xl">
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
                    <div className="flex w-full flex-col items-end p-2 sm:p-4">
                        <span className="text-xs text-gray-300 sm:text-sm">CVV</span>
                        <div className="mt-1 flex h-10 w-full items-center justify-end rounded-md bg-white px-4 font-mono tracking-widest text-gray-800">
                            {displayData.cvv}
                        </div>
                    </div>
                    {cardType.type && (
                        <div
                            className="mt-4 mr-4 aspect-video w-[36px] bg-contain bg-center bg-no-repeat sm:w-[60px]"
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
