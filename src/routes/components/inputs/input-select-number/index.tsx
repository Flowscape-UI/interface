import { useState } from 'react';
import PageTitle from '@/components/ui/page-title';
import { PreviewTabs } from '@/components/preview-tabs';
import { UsageSection } from '@/components/usage-section';
import { DocsSection } from '@/components/docs-section';
import type { PropsTableRow } from '@/components/props-table';
import { createFileRoute } from '@tanstack/react-router';
import { MainLayout } from '@/main-layout';
import { InputSelectNumber } from '@/components/ui/input-select-number';
import { useTranslation } from '@/hooks/use-translation';

export const Route = createFileRoute('/components/inputs/input-select-number/')({
    component: InputSelectNumberPage,
});

const componentCode = `import { cn, removeTrailingZeros } from './lib/utils';
import React, { useRef } from 'react';
import { FaRegDotCircle } from 'react-icons/fa';

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
                    'inline-flex h-8 items-center overflow-hidden rounded-lg border-2 border-gray-400 bg-transparent focus-within:ring-1 focus-within:ring-ring dark:bg-input/30',
                    className,
                )}
            >
                <div
                    ref={dragRef}
                    onMouseDown={handleMouseDown}
                    className={cn(
                        'flex h-full aspect-square items-center justify-center',
                        {
                            'cursor-ew-resize': orientation === 'horizontal',
                            'cursor-ns-resize': orientation === 'vertical',
                            'cursor-nwse-resize': orientation === 'diagonal',
                        },
                        disabled && 'cursor-not-allowed opacity-50',
                    )}
                >
                    {typeof icon === 'string' && icon.length > 0 ? (
                        <span className="select-none text-sm font-medium">{icon.charAt(0)}</span>
                    ) : React.isValidElement(icon) ? (
                        icon
                    ) : (
                        <FaRegDotCircle />
                    )}
                </div>

                <Input
                    type="number"
                    className={cn(
                        'h-full w-full rounded-none border-none bg-transparent px-2 py-0 focus-visible:ring-0 [appearance:textfield] dark:bg-transparent [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
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

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }

// Libs

import type { ClassValue } from "clsx";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export function removeTrailingZeros(num: number, precision = 0) {
  if (typeof num !== 'number') {
      throw new TypeError('Input must be a number');
  }

  if (precision < 0) {
      throw new RangeError('Precision must be a non-negative integer');
  }

  // Convert the number to a string
  const numStr = num.toString();

  // For integer numbers, remove trailing zeros and return as integer if precision is 0
  if (Number.isInteger(num) && precision === 0) {
      return parseInt(numStr, 10);
  } else {
      // Handle floating point numbers with specific precision
      // eslint-disable-next-line prefer-const
      let [integerPart, decimalPart] = numStr.split('.');

      if (decimalPart) {
          // Limit decimal places based on precision
          decimalPart = decimalPart.slice(0, precision);
          if (decimalPart.length === 0) {
              // If there's no decimal part left after slicing, return the integer part
              return parseInt(integerPart, 10);
          }
          return parseFloat(integerPart + '.' + decimalPart);
      }

      // If no decimal part, return the integer
      return parseInt(numStr, 10);
  }
}

`;

const example1Code = `
import { InputSelectNumber } from '@/components/ui/input-select-number';
import { useState } from 'react';

export default function BasicExample() {
    const [value, setValue] = useState(50);
    return (
        <InputSelectNumber
            value={value}
            fieldOnChange={setValue}
            step={1}
            min={0}
            max={100}
        />
    );
}
`;

const example2Code = `
import { InputSelectNumber } from '@/components/ui/input-select-number';
import { useState } from 'react';

export default function PrecisionExample() {
    const [value, setValue] = useState(10.5);
    return (
        <InputSelectNumber
            value={value}
            fieldOnChange={setValue}
            step={0.1}
            precision={2}
            min={0}
            max={20}
        />
    );
}
`;

const example3Code = `
import { InputSelectNumber } from '@/components/ui/input-select-number';
import { useState } from 'react';

export default function ProgressionExample() {
    const [value, setValue] = useState(100);
    return (
        <InputSelectNumber
            value={value}
            fieldOnChange={setValue}
            step={1}
            progression="geometric"
            min={1}
            max={1000}
        />
    );
}
`;

const example4Code = `
import { InputSelectNumber } from '@/components/ui/input-select-number';
import { useState } from 'react';

export default function VerticalExample() {
    const [value, setValue] = useState(50);
    return (
        <InputSelectNumber
            value={value}
            fieldOnChange={setValue}
            orientation="vertical"
            icon="Y"
            step={1}
            min={0}
            max={100}
        />
    );
}
`;

const rows: PropsTableRow[] = [
    {
        prop: 'value',
        type: 'number | string',
        required: true,
        description: 'The current value of the input.',
    },
    {
        prop: 'fieldOnChange',
        type: '(value: number | string) => void',
        required: true,
        description: 'Callback function when the value changes.',
    },
    {
        prop: 'icon',
        type: 'React.JSX.Element | string',
        required: false,
        description: 'Custom icon or a single character string for the drag handle.',
    },
    {
        prop: 'orientation',
        type: "'horizontal' | 'vertical'",
        required: false,
        defaultValue: "'horizontal'",
        description: 'The orientation of the component.',
    },
    {
        prop: 'step',
        type: 'number',
        required: false,
        defaultValue: '0',
        description: 'The increment/decrement step for value change on drag.',
    },
    {
        prop: 'precision',
        type: 'number',
        required: false,
        defaultValue: '0',
        description: 'The number of decimal places to preserve.',
    },
    {
        prop: 'progression',
        type: "'linear' | 'arithmetic' | 'geometric' | 'paraboloid' | 'exponential'",
        required: false,
        defaultValue: "'linear'",
        description: 'The progression type for value change.',
    },
    {
        prop: 'classNameInput',
        type: 'string',
        required: false,
        description: 'Custom class for the input element.',
    },
    {
        prop: 'min',
        type: 'number | string',
        required: false,
        description: 'Minimum allowed value.',
    },
    {
        prop: 'max',
        type: 'number | string',
        required: false,
        description: 'Maximum allowed value.',
    },
    { prop: 'disabled', type: 'boolean', required: false, description: 'Disables the component.' },
];

function InputSelectNumberPage() {
    const [value1, setValue1] = useState<number | string>(50);
    const [value2, setValue2] = useState<number | string>(10.5);
    const [value3, setValue3] = useState<number | string>(100);
    const [value4, setValue4] = useState<number | string>(50);
    const { t } = useTranslation();

    return (
        <MainLayout>
            <div className="w-full px-6 py-16">
                <PageTitle data-toc>Input Select Number</PageTitle>
                <p className="max-w-xl text-white/60">
                    {t(
                        'A numeric input component that allows value changes by dragging the mouse horizontally or vertically',
                    )}
                    .
                </p>

                <div className="mt-8 flex flex-col gap-10">
                    <PreviewTabs
                        title="Basic Usage"
                        description={t('A simple input with linear progression.')}
                        codeText={example1Code}
                    >
                        <div className="relative flex h-full items-center justify-center">
                            <InputSelectNumber
                                value={value1}
                                fieldOnChange={setValue1}
                                step={1}
                                min={0}
                                max={100}
                            />
                        </div>
                    </PreviewTabs>

                    <PreviewTabs
                        title="With Precision"
                        description={t('An input that handles decimal values.')}
                        codeText={example2Code}
                    >
                        <div className="relative flex h-full items-center justify-center">
                            <InputSelectNumber
                                value={value2}
                                fieldOnChange={setValue2}
                                step={0.1}
                                precision={2}
                                min={0}
                                max={20}
                            />
                        </div>
                    </PreviewTabs>

                    <PreviewTabs
                        title="Geometric Progression"
                        description={t('An input with non-linear value change.')}
                        codeText={example3Code}
                    >
                        <div className="relative flex h-full items-center justify-center">
                            <InputSelectNumber
                                value={value3}
                                fieldOnChange={setValue3}
                                step={1}
                                progression="geometric"
                                min={1}
                                max={1000}
                            />
                        </div>
                    </PreviewTabs>

                    <PreviewTabs
                        title="Vertical Orientation"
                        description={t('An input that changes value on vertical drag.')}
                        codeText={example4Code}
                    >
                        <div className="relative flex h-48 items-center justify-center">
                            <InputSelectNumber
                                value={value4}
                                fieldOnChange={setValue4}
                                orientation="vertical"
                                icon="Y"
                                step={1}
                                min={0}
                                max={100}
                            />
                        </div>
                    </PreviewTabs>
                </div>

                <UsageSection
                    title="Component Code"
                    description={`${t('The source code for the')} InputSelectNumber ${t('component')}.`}
                    code={componentCode}
                />

                <DocsSection
                    description={
                        <>
                            <p className="mb-4">
                                <strong>Input Select Number</strong> &mdash;{' '}
                                {t('a highly customizable numeric input component')}.
                            </p>
                        </>
                    }
                    rows={rows}
                />
            </div>
        </MainLayout>
    );
}
