import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import PageTitle from '@/components/ui/page-title';
import { PreviewTabs } from '@/components/preview-tabs';
import { PixelateImage, ControlsPanel } from '@/components/ui/pixelate-image';
import { DocsSection } from '@/components/docs-section';
import type { PropsTableRow } from '@/components/props-table';
import { MainLayout } from '@/main-layout';
import { useTranslation } from '@/hooks/use-translation';

const componentCode = `/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect, useState } from 'react';
import * as LabelPrimitive from "@radix-ui/react-label"
import { FaRegDotCircle } from 'react-icons/fa';


export interface ControlsPanelProps {
  currentPixelSize: number;
  setCurrentPixelSize: (value: number) => void;
  currentSize: number;
  setCurrentSize: (value: number) => void;
}

export function ControlsPanel({
  currentPixelSize,
  setCurrentPixelSize,
  currentSize,
  setCurrentSize,
}: ControlsPanelProps) {
  return (
    <div className="w-full rounded-b-lg border-t border-white/20 bg-black/50 backdrop-blur-sm">
      <div className="mx-auto grid w-full max-w-sm grid-cols-2 gap-4 p-4">
        <div className="space-y-1">
          <Label htmlFor="pixelSize" className="text-xs text-white/80">
            Pixel Size
          </Label>
          <InputSelectNumber
            id="pixelSize"
            value={currentPixelSize}
            fieldOnChange={(val) => setCurrentPixelSize(Number(val))}
            min={1}
            max={50}
            step={1}
            precision={0}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="imgSize" className="text-xs text-white/80">
            Size
          </Label>
          <InputSelectNumber
            id="imgSize"
            value={currentSize}
            fieldOnChange={(val) => setCurrentSize(Number(val))}
            min={100}
            max={1000}
            step={10}
            precision={0}
          />
        </div>
      </div>
    </div>
  );
}

export interface PixelateImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  pixelSize?: number;
  backgroundColor?: string;
  className?: string;
}

export function PixelateImage({
  src,
  alt,
  width = 400,
  height = 300,
  pixelSize = 10,
  backgroundColor = 'transparent',
  className,
}: PixelateImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = src;

    img.onload = () => {
      const pz = Math.max(1, pixelSize);
      const w = width / pz;
      const h = height / pz;

      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = w;
      tempCanvas.height = h;
      const tempCtx = tempCanvas.getContext('2d');

      if (!tempCtx) return;

      // Draw image on temp canvas
      tempCtx.drawImage(img, 0, 0, w, h);

      // Disable smoothing on main canvas
      ctx.imageSmoothingEnabled = false;
      (ctx as any).mozImageSmoothingEnabled = false;
      (ctx as any).webkitImageSmoothingEnabled = false;
      (ctx as any).msImageSmoothingEnabled = false;

      // Fill background
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      // Draw temp canvas to main canvas, scaling it up
      ctx.drawImage(tempCanvas, 0, 0, width, height);
    };

    img.onerror = () => {
      console.error('Failed to load image for pixelation');
    };
  }, [src, width, height, pixelSize, backgroundColor]);

  return (
    <div className="relative inline-block">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className={cn('rounded-lg', className)}
        aria-label={alt}
        role="img"
      />
    </div>
  );
}

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

import type { ClassValue } from "clsx";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

function removeTrailingZeros(num: number, precision = 0) {
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

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

// example usage 

export function MyComponent() {
  const [pixelSize, setPixelSize] = useState(10);
  const [size, setSize] = useState(400);

  return (
    <div className="flex flex-col items-center gap-6">
      <PixelateImage
        src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
        alt="A laptop"
        pixelSize={pixelSize}
        width={size}
        height={size}
        backgroundColor="transparent"
      />
      <div className="w-full max-w-md">
        <ControlsPanel
          currentPixelSize={pixelSize}
          setCurrentPixelSize={setPixelSize}
          currentSize={size}
          setCurrentSize={setSize}
        />
      </div>
    </div>
  )
}
`;

export const Route = createFileRoute('/utils/pixelate-image/')({
    component: PixelateImagePage,
});

const pixelateImageRows: PropsTableRow[] = [
    { prop: 'src', type: 'string', required: true, description: 'Image source URL.' },
    { prop: 'alt', type: 'string', required: true, description: 'Alternative text for the image.' },
    {
        prop: 'width',
        type: 'number',
        required: false,
        defaultValue: '400',
        description: 'Width of the canvas.',
    },
    {
        prop: 'height',
        type: 'number',
        required: false,
        defaultValue: '300',
        description: 'Height of the canvas.',
    },
    {
        prop: 'pixelSize',
        type: 'number',
        required: false,
        defaultValue: '10',
        description: "The size of each 'pixel' block.",
    },
    {
        prop: 'backgroundColor',
        type: 'string',
        required: false,
        defaultValue: "'transparent'",
        description: 'Background color of the canvas.',
    },
    {
        prop: 'className',
        type: 'string',
        required: false,
        defaultValue: '""',
        description: 'Additional classes for the canvas element.',
    },
];

function PixelateImagePage() {
    const [pixelSize, setPixelSize] = useState(10);
    const [size, setSize] = useState(400);
    const { t } = useTranslation();

    return (
        <MainLayout>
            <div className="w-full px-6 py-16">
                <PageTitle>Pixelate Image</PageTitle>
                <p className="max-w-xl text-white/60">
                    {t(`A component to render a pixelated version of an image using HTML Canvas. Customize the
          pixel size, dimensions, and background with interactive controls.`)}
                </p>

                <div className="mt-8 flex flex-col gap-10">
                    <PreviewTabs title="Interactive Example" codeText={componentCode}>
                        <div className="flex flex-col items-center justify-center gap-6 rounded-lg p-8">
                            <div className="flex h-96 w-full items-center justify-center overflow-auto rounded-lg border border-white/10 bg-black/20">
                                <PixelateImage
                                    src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
                                    alt="A laptop"
                                    pixelSize={pixelSize}
                                    width={size}
                                    height={size}
                                    backgroundColor="transparent"
                                />
                            </div>
                            <div className="w-full max-w-md">
                                <ControlsPanel
                                    currentPixelSize={pixelSize}
                                    setCurrentPixelSize={setPixelSize}
                                    currentSize={size}
                                    setCurrentSize={setSize}
                                />
                            </div>
                        </div>
                    </PreviewTabs>

                    <DocsSection
                        rows={pixelateImageRows}
                        description={
                            <>
                                <h2 className="mb-4 text-2xl font-bold">PixelateImage</h2>
                                <p className="mb-4">
                                    <strong>Pixelate Image</strong>{' '}
                                    {t(`is a fun visual component that renders an image
                  with a pixelated effect. It's perfect for placeholders, loading effects, or just
                  for stylistic purposes. Use it with the`)}{' '}
                                    <code>ControlsPanel</code>{' '}
                                    {t('component for real-time adjustments.')}
                                </p>
                            </>
                        }
                    />
                </div>
            </div>
        </MainLayout>
    );
}
