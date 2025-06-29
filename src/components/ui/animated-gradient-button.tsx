import React from 'react';
import type { CSSProperties } from 'react';

interface GradientColor {
    color: string;
    size?: number;
    transparency?: number;
}

interface AnimatedGradientButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    style?: CSSProperties;

    // Настройки градиентов
    gradientColors?: GradientColor[];
    animationDuration?: number;
    animationEnabled?: boolean;

    // Настройки кнопки
    padding?: string;
    fontSize?: string;
    borderRadius?: string;
    backgroundColor?: string;
    textColor?: string;

    // Настройки эффектов
    hoverBlur?: number;
    hoverOpacity?: number;
    transitionDuration?: number;

    // HTML атрибуты
    type?: 'button' | 'submit' | 'reset';
    'aria-label'?: string;
}

const defaultGradientColors: GradientColor[] = [
    { color: '#18346d', size: 5 },
    { color: 'purple', size: 5 },
    { color: 'red', size: 5 },
    { color: 'orange', size: 5 },
    { color: 'green', size: 5 },
    { color: 'yellow', size: 5 },
];

export default function AnimatedGradientButton({
    children,
    onClick,
    disabled = false,
    className = '',
    style = {},
    gradientColors = defaultGradientColors,
    animationDuration = 10,
    animationEnabled = true,
    padding = '1rem 4rem',
    fontSize = '1rem',
    borderRadius = '999px',
    backgroundColor = 'black',
    textColor = 'white',
    hoverBlur = 3,
    hoverOpacity = 1,
    transitionDuration = 500,
    type = 'button',
    'aria-label': ariaLabel,
    ...props
}: AnimatedGradientButtonProps) {
    // Генерируем уникальный ID для компонента
    const componentId = React.useId().replace(/:/g, '');

    // Генерируем CSS с @property правилами и keyframes
    const generateCSS = () => {
        let css = '';

        // Генерируем @property правила для каждого цвета
        gradientColors.forEach((_, index) => {
            css += `
        @property --${componentId}-color-${index}-x {
          syntax: "<percentage>";
          initial-value: 50%;
          inherits: false;
        }
        @property --${componentId}-color-${index}-y {
          syntax: "<percentage>";
          initial-value: 50%;
          inherits: false;
        }
      `;
        });

        // Генерируем keyframes для анимации
        if (animationEnabled) {
            css += `
        @keyframes ${componentId}-moveGradients {
          0%, 100% {
            --${componentId}-color-0-x: -40%;
            --${componentId}-color-0-y: 35%;
            --${componentId}-color-1-x: 35%;
            --${componentId}-color-1-y: -10%;
            --${componentId}-color-2-x: -10%;
            --${componentId}-color-2-y: -80%;
            --${componentId}-color-3-x: 50%;
            --${componentId}-color-3-y: 145%;
            --${componentId}-color-4-x: 0%;
            --${componentId}-color-4-y: 80%;
            --${componentId}-color-5-x: 35%;
            --${componentId}-color-5-y: 95%;
          }
          25% {
            --${componentId}-color-0-x: 30%;
            --${componentId}-color-0-y: -25%;
            --${componentId}-color-1-x: 5%;
            --${componentId}-color-1-y: 40%;
            --${componentId}-color-2-x: 45%;
            --${componentId}-color-2-y: 150%;
            --${componentId}-color-3-x: -15%;
            --${componentId}-color-3-y: 30%;
            --${componentId}-color-4-x: 45%;
            --${componentId}-color-4-y: 15%;
            --${componentId}-color-5-x: -20%;
            --${componentId}-color-5-y: -40%;
          }
          50% {
            --${componentId}-color-0-x: 70%;
            --${componentId}-color-0-y: 50%;
            --${componentId}-color-1-x: 50%;
            --${componentId}-color-1-y: 120%;
            --${componentId}-color-2-x: 35%;
            --${componentId}-color-2-y: -80%;
            --${componentId}-color-3-x: 75%;
            --${componentId}-color-3-y: -75%;
            --${componentId}-color-4-x: 85%;
            --${componentId}-color-4-y: 100%;
            --${componentId}-color-5-x: 50%;
            --${componentId}-color-5-y: -20%;
          }
          75% {
            --${componentId}-color-0-x: -25%;
            --${componentId}-color-0-y: 10%;
            --${componentId}-color-1-x: 35%;
            --${componentId}-color-1-y: -45%;
            --${componentId}-color-2-x: -10%;
            --${componentId}-color-2-y: 30%;
            --${componentId}-color-3-x: 20%;
            --${componentId}-color-3-y: -40%;
            --${componentId}-color-4-x: -15%;
            --${componentId}-color-4-y: 50%;
            --${componentId}-color-5-x: 45%;
            --${componentId}-color-5-y: -15%;
          }
        }
      `;
        }

        // Стили для кнопки
        css += `
      .${componentId}-button {
        padding: ${padding};
        font-size: ${fontSize};
        border: none;
        border-radius: ${borderRadius};
        position: relative;
        color: ${textColor};
        background: ${backgroundColor};
        isolation: isolate;
        overflow: clip;
        z-index: 0;
        cursor: ${disabled ? 'not-allowed' : 'pointer'};
        opacity: ${disabled ? 0.6 : 1};
        transition: opacity ${transitionDuration}ms ease-in-out;
      }

      .${componentId}-button:hover {
        --${componentId}-after-opacity: ${hoverOpacity};
      }

      .${componentId}-button::before {
        content: "";
        position: absolute;
        inset: 0;
        z-index: -2;
        border-radius: inherit;
        background-image: ${gradientColors
            .map((gradientColor, index) => {
                const size = gradientColor.size || 5;
                const transparency = gradientColor.transparency || 30;
                return `radial-gradient(
            circle at var(--${componentId}-color-${index}-x, 50%) var(--${componentId}-color-${index}-y, 50%),
            ${gradientColor.color} ${size}%,
            transparent ${transparency}%
          )`;
            })
            .join(', ')};
        background-size: 200% 200%;
        background-repeat: no-repeat;
        ${animationEnabled ? `animation: ${componentId}-moveGradients ${animationDuration}s linear infinite;` : ''}
      }

      .${componentId}-button::after {
        content: "";
        position: absolute;
        inset: 2px;
        border-radius: inherit;
        background: ${backgroundColor};
        z-index: -1;
        backdrop-filter: blur(${hoverBlur}px);
        transition: opacity ${transitionDuration}ms ease-in-out;
        opacity: var(--${componentId}-after-opacity, 0);
      }
    `;

        return css;
    };

    const buttonStyles: CSSProperties = {
        ...style,
    };

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: generateCSS() }} />
            <button
                type={type}
                onClick={disabled ? undefined : onClick}
                disabled={disabled}
                className={`${componentId}-button ${className}`}
                style={buttonStyles}
                aria-label={ariaLabel}
                {...props}
            >
                {children}
            </button>
        </>
    );
}
