import { cn, removeTrailingZeros } from '@/lib/utils';
import React, { useRef } from 'react';
import { FaRegDotCircle } from 'react-icons/fa';
import { Input } from './input';

export type Progression = 'linear' | 'arithmetic' | 'geometric' | 'paraboloid' | 'exponential';

export interface InputSelectNumberProps
    extends Omit<React.ComponentProps<'input'>, 'defaultValue' | 'onChange'> {
    icon?: React.JSX.Element | string;
    orientation?: 'horizontal' | 'vertical';
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
        const startMousePosRef = useRef({ x: 0, y: 0 });

        const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
            if (disabled) return;

            startValueRef.current = value === '' ? 0 : Number(value);
            startMousePosRef.current = { x: event.clientX, y: event.clientY };

            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        const handleMouseMove = (event: MouseEvent) => {
            const deltaMouse =
                orientation === 'vertical'
                    ? startMousePosRef.current.y - event.clientY
                    : event.clientX - startMousePosRef.current.x;

            const deltaValue = deltaMouse * (step || 1);

            let newValue = calculateByProgression(startValueRef.current, deltaValue, progression);

            if (min !== undefined && newValue < +min) newValue = +min;
            if (max !== undefined && newValue > +max) newValue = +max;

            fieldOnChange(removeTrailingZeros(newValue, precision));
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
            // Allow typing numbers, a single minus sign, or an empty string.
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

            // Clamp the value to the min/max range.
            if (min !== undefined && numericValue < +min) {
                numericValue = +min;
            }
            if (max !== undefined && numericValue > +max) {
                numericValue = +max;
            }

            // Format to the correct precision and update the state.
            fieldOnChange(removeTrailingZeros(numericValue, precision));
        };

        return (
            <div
                className={cn(
                    'inline-flex items-center overflow-hidden rounded-lg border-2 border-gray-400 focus-within:ring-1 focus-within:ring-ring bg-transparent dark:bg-input/30',
                    {
                        'flex-col w-12 h-full': orientation === 'vertical',
                        'h-8': orientation === 'horizontal',
                    },
                    className,
                )}
            >
                <div
                    ref={dragRef}
                    onMouseDown={handleMouseDown}
                    className={cn(
                        'flex items-center justify-center',
                        {
                            'aspect-square h-full cursor-ew-resize':
                                orientation === 'horizontal',
                            'w-full h-8 cursor-ns-resize': orientation === 'vertical',
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
                        'w-full rounded-none border-none bg-transparent dark:bg-transparent px-2 py-0 focus-visible:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
                        {
                            'w-full text-center': orientation === 'vertical',
                            'h-full': orientation === 'horizontal',
                        },
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
