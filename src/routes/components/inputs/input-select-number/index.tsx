import { useState } from 'react';
import PageTitle from '@/components/ui/page-title';
import { PreviewTabs } from '@/components/preview-tabs';
import { UsageSection } from '@/components/usage-section';
import { DocsSection } from '@/components/docs-section';
import type { PropsTableRow } from '@/components/props-table';
import { createFileRoute } from '@tanstack/react-router';
import { MainLayout } from '@/main-layout';
import { InputSelectNumber } from '@/components/ui/input-select-number';

export const Route = createFileRoute('/components/inputs/input-select-number/')({
    component: InputSelectNumberPage,
});

const componentCode = `import { cn, removeTrailingZeros } from '@/lib/utils';
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

        const handleMouseDown = () => {
            startValueRef.current = value === '' ? 0 : Number(value);
            if (!disabled) {
                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);
            }
        };

        const handleMouseUp = () => {
            if (!disabled) {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            }
        };

        const handleMouseMove = (event: MouseEvent) => {
            const movement = orientation === 'vertical' ? -event.movementY : event.movementX;
            const delta: number = movement * step;
            let newValue = calculateByProgression(startValueRef.current, delta, progression);

            if (min !== undefined && newValue < +min) newValue = +min;
            if (max !== undefined && newValue > +max) newValue = +max;

            startValueRef.current = newValue;
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
            if (rawValue === '') {
                fieldOnChange('');
                return;
            }
            let numericValue = +rawValue;
            if (max !== undefined && numericValue > +max) {
                numericValue = +max;
            }
            fieldOnChange(numericValue);
        };

        const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            const rawValue = e.target.value;
            let numericValue: number | string = rawValue === '' ? '' : +rawValue;

            if (numericValue === '' || isNaN(numericValue as number)) {
                if (min !== undefined) {
                    fieldOnChange(+min);
                } else {
                    fieldOnChange('');
                }
                return;
            }

            if (typeof numericValue === 'number') {
                if (min !== undefined && numericValue < +min) {
                    numericValue = +min;
                }
                fieldOnChange(numericValue);
            }
        };

        return (
            <div
                className={cn(
                    'inline-flex items-center overflow-hidden rounded-lg border-2 border-gray-400 focus-within:ring-1 focus-within:ring-ring bg-transparent dark:bg-input/30',
                    {
                        'flex-col w-20': orientation === 'vertical',
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
                        'w-full rounded-none border-none bg-transparent text-center dark:bg-transparent px-2 py-0 focus-visible:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
                        {
                            'h-8': orientation === 'vertical',
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

InputSelectNumber.displayName = 'InputSelectNumber';`;

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
    { prop: 'value', type: 'number | string', required: true, description: 'The current value of the input.' },
    { prop: 'fieldOnChange', type: '(value: number | string) => void', required: true, description: 'Callback function when the value changes.' },
    { prop: 'icon', type: 'React.JSX.Element | string', required: false, description: 'Custom icon or a single character string for the drag handle.' },
    { prop: 'orientation', type: "'horizontal' | 'vertical'", required: false, defaultValue: "'horizontal'", description: 'The orientation of the component.' },
    { prop: 'step', type: 'number', required: false, defaultValue: '0', description: 'The increment/decrement step for value change on drag.' },
    { prop: 'precision', type: 'number', required: false, defaultValue: '0', description: 'The number of decimal places to preserve.' },
    { prop: 'progression', type: "'linear' | 'arithmetic' | 'geometric' | 'paraboloid' | 'exponential'", required: false, defaultValue: "'linear'", description: 'The progression type for value change.' },
    { prop: 'classNameInput', type: 'string', required: false, description: 'Custom class for the input element.' },
    { prop: 'min', type: 'number | string', required: false, description: 'Minimum allowed value.' },
    { prop: 'max', type: 'number | string', required: false, description: 'Maximum allowed value.' },
    { prop: 'disabled', type: 'boolean', required: false, description: 'Disables the component.' },
];

function InputSelectNumberPage() {
    const [value1, setValue1] = useState<number | string>(50);
    const [value2, setValue2] = useState<number | string>(10.5);
    const [value3, setValue3] = useState<number | string>(100);
    const [value4, setValue4] = useState<number | string>(50);

    return (
        <MainLayout>
            <div className="w-full px-6 py-16">
                <PageTitle data-toc>Input Select Number</PageTitle>
                <p className="max-w-xl text-white/60">
                    A numeric input component that allows value changes by dragging the mouse horizontally or vertically.
                </p>

                <div className="mt-8 flex flex-col gap-10">
                    <PreviewTabs title="Basic Usage" description="A simple input with linear progression." codeText={example1Code}>
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

                    <PreviewTabs title="With Precision" description="An input that handles decimal values." codeText={example2Code}>
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

                    <PreviewTabs title="Geometric Progression" description="An input with non-linear value change." codeText={example3Code}>
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

                    <PreviewTabs title="Vertical Orientation" description="An input that changes value on vertical drag." codeText={example4Code}>
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
                    description="The source code for the InputSelectNumber component."
                    code={componentCode}
                />

                <DocsSection
                    description={
                        <>
                            <p className="mb-4">
                                <strong>Input Select Number</strong> &mdash; a highly customizable numeric input component.
                            </p>
                        </>
                    }
                    rows={rows}
                />
            </div>
        </MainLayout>
    );
}
