import { cn, removeTrailingZeros } from '@/lib/utils';
import React, { useRef } from 'react';
import { FaRegDotCircle } from 'react-icons/fa';
import { Input } from './input';

export type Progression = 'linear' | 'arithmetic' | 'geometric' | 'paraboloid' | 'exponential';

export interface InputSelectNumberProps
    extends Omit<React.ComponentProps<'input'>, 'defaultValue' | 'onChange'> {
    icon?: React.JSX.Element | string;
    orientation?: 'horizontal' | 'vertical' | 'diagonal';
    step?: number;
    precision?: number;
    progression?: Progression;
    classNameInput?: string;
    value: number | string;
    fieldOnChange: (value: number | string) => void;
    isDisabledMouseEvent?: boolean;
}

export const InputSelectNumber = React.forwardRef<HTMLInputElement, InputSelectNumberProps>(
    (
        {
            min,
            max,
            icon,
            orientation = 'horizontal',
            className,
            classNameInput,
            progression = 'linear',
            step = 0,
            precision = 0,
            value,
            fieldOnChange,
            ...props
        },
        ref,
    ) => {
        const { disabled } = props;
        const dragRef = useRef(null);
        const startValueRef = useRef<number>(value === '' ? 0 : Number(value));

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const handleMouseDown = (_event: React.MouseEvent<HTMLDivElement>) => {
            if (disabled) return;

            startValueRef.current = value === '' ? 0 : Number(value);

            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        const handleMouseMove = (event: MouseEvent) => {
            let deltaMouse;
            if (orientation === 'vertical') {
                deltaMouse = -event.movementY;
            } else if (orientation === 'horizontal') {
                deltaMouse = event.movementX;
            } else {
                deltaMouse = event.movementX - event.movementY;
            }

            const deltaValue = deltaMouse * (step || 1);

            let newValue = calculateByProgression(startValueRef.current, deltaValue, progression);

            if (min !== undefined && newValue < +min) newValue = +min;
            if (max !== undefined && newValue > +max) newValue = +max;

            fieldOnChange(removeTrailingZeros(newValue, precision));
            // Update startValueRef to allow continuous dragging without releasing mouse
            startValueRef.current = newValue;
        };

        const calculateByProgression = (
            value: number,
            delta: number,
            progression?: Progression,
        ) => {
            switch (progression) {
                case 'linear':
                    return value + delta;
                case 'arithmetic':
                    return value + delta * 2;
                case 'paraboloid':
                    return value + delta * Math.abs(delta) * 0.1;
                case 'exponential':
                    return value * (1 + delta * 0.01);
                case 'geometric':
                    // eslint-disable-next-line no-case-declarations
                    const factor = 1.05;
                    if (delta > 0) {
                        return (value + delta) * factor;
                    } else if (delta < 0) {
                        return (value + delta) / factor;
                    } else {
                        return value + delta;
                    }
                default:
                    return value + delta;
            }
        };

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const rawValue = e.target.value;
            if (rawValue === '' || rawValue === '-' || !isNaN(+rawValue)) {
                fieldOnChange(rawValue);
            }
        };

        const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            const rawValue = e.target.value;

            if (rawValue.trim() === '' || rawValue === '-') {
                fieldOnChange(min !== undefined ? +min : '');
                return;
            }

            let numericValue = +rawValue;

            if (isNaN(numericValue)) {
                fieldOnChange(min !== undefined ? +min : '');
                return;
            }

            if (min !== undefined && numericValue < +min) {
                numericValue = +min;
            }
            if (max !== undefined && numericValue > +max) {
                numericValue = +max;
            }

            fieldOnChange(removeTrailingZeros(numericValue, precision));
        };

        return (
            <div
                className={cn(
                    'focus-within:ring-ring dark:bg-input/30 inline-flex h-8 items-center overflow-hidden rounded-lg border-2 border-gray-400 bg-transparent focus-within:ring-1',
                    className,
                )}
            >
                <div
                    ref={dragRef}
                    onMouseDown={handleMouseDown}
                    className={cn(
                        'flex aspect-square h-full items-center justify-center',
                        {
                            'cursor-ew-resize': orientation === 'horizontal',
                            'cursor-ns-resize': orientation === 'vertical',
                            'cursor-nwse-resize': orientation === 'diagonal',
                        },
                        disabled && 'cursor-not-allowed opacity-50',
                    )}
                >
                    {typeof icon === 'string' && icon.length > 0 ? (
                        <span className="text-sm font-medium select-none">{icon.charAt(0)}</span>
                    ) : React.isValidElement(icon) ? (
                        icon
                    ) : (
                        <FaRegDotCircle />
                    )}
                </div>

                <Input
                    type="number"
                    className={cn(
                        'h-full w-full [appearance:textfield] rounded-none border-none bg-transparent px-2 py-0 focus-visible:ring-0 dark:bg-transparent [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
                        classNameInput,
                    )}
                    value={value}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    ref={ref}
                    {...props}
                />
            </div>
        );
    },
);

InputSelectNumber.displayName = 'InputSelectNumber';
