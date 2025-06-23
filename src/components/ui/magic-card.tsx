import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { Label } from './label';
import { Slider } from './slider';

/* --------------------------------------------------
 * Types and Settings
 * -------------------------------------------------- */

interface MagicCardSettings {
    card: {
        width: number;
        height: number;
        glowIntensity: number;
        glowMax: number;
    };
    particles: {
        count: number;
        minSize: number;
        maxSize: number;
        minSpeed: number;
        maxSpeed: number;
        minOpacity: number;
        maxOpacity: number;
    };
    lines: {
        count: number;
        minWidth: number;
        maxWidth: number;
        minSpeed: number;
        maxSpeed: number;
        minOpacity: number;
        maxOpacity: number;
        waveHeight: number;
    };
}

type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};

interface MagicCardProps {
    initialSettings?: DeepPartial<MagicCardSettings>;
    className?: string;
    showControls?: boolean;
}

const defaultSettings: MagicCardSettings = {
    card: {
        width: 284,
        height: 410,
        glowIntensity: 15,
        glowMax: 25,
    },
    particles: {
        count: 100,
        minSize: 1,
        maxSize: 4,
        minSpeed: 0.25,
        maxSpeed: 0.5,
        minOpacity: 0.1,
        maxOpacity: 0.6,
    },
    lines: {
        count: 15,
        minWidth: 0.5,
        maxWidth: 2,
        minSpeed: 0.01,
        maxSpeed: 0.03,
        minOpacity: 0.05,
        maxOpacity: 0.2,
        waveHeight: 10,
    },
};

/* --------------------------------------------------
 * Controls Panel Component
 * -------------------------------------------------- */

interface ControlSliderProps {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    onChange: (value: number) => void;
}

function ControlSlider({ label, value, min, max, step, onChange }: ControlSliderProps) {
    return (
        <div className="grid grid-cols-3 items-center gap-x-2">
            <Label className="truncate text-xs text-neutral-400">{label}</Label>
            <Slider
                value={[value]}
                onValueChange={([val]) => onChange(val)}
                min={min}
                max={max}
                step={step}
                className="w-full"
            />
            <span className="w-12 text-right font-mono text-xs">{value.toFixed(2)}</span>
        </div>
    );
}

interface ControlsProps {
    settings: MagicCardSettings;
    onSettingsChange: (newSettings: MagicCardSettings) => void;
    onRandomize: () => void;
    isVisible: boolean;
    onToggle: () => void;
}

function Controls({ settings, onSettingsChange, onRandomize, isVisible, onToggle }: ControlsProps) {
    const handleChange = (category: keyof MagicCardSettings, key: string, value: number) => {
        onSettingsChange({
            ...settings,
            [category]: {
                ...settings[category],
                [key]: value,
            },
        });
    };

    return (
        <>
            <Button
                onClick={onToggle}
                className="absolute top-4 left-4 z-20"
                variant="secondary"
                size="sm"
            >
                {isVisible ? 'Hide Controls' : 'Show Controls'}
            </Button>
            {isVisible && (
                <div className="absolute top-16 left-4 z-10 h-[calc(100vh-5rem)] max-h-[800px] w-80 space-y-4 overflow-y-auto rounded-lg border border-neutral-700 p-4 text-white backdrop-blur-sm">
                    <div>
                        <h3 className="mb-2 border-b border-neutral-700 pb-1 text-sm font-bold">
                            Card Size
                        </h3>
                        <div className="space-y-2">
                            <ControlSlider
                                label="Width"
                                value={settings.card.width}
                                onChange={(v) => handleChange('card', 'width', v)}
                                min={200}
                                max={800}
                                step={1}
                            />
                            <ControlSlider
                                label="Height"
                                value={settings.card.height}
                                onChange={(v) => handleChange('card', 'height', v)}
                                min={300}
                                max={800}
                                step={1}
                            />
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-2 border-b border-neutral-700 pb-1 text-sm font-bold">
                            Glow Controls
                        </h3>
                        <div className="space-y-2">
                            <ControlSlider
                                label="Intensity"
                                value={settings.card.glowIntensity}
                                onChange={(v) => handleChange('card', 'glowIntensity', v)}
                                min={0}
                                max={50}
                                step={1}
                            />
                            <ControlSlider
                                label="Max"
                                value={settings.card.glowMax}
                                onChange={(v) => handleChange('card', 'glowMax', v)}
                                min={10}
                                max={100}
                                step={1}
                            />
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-2 border-b border-neutral-700 pb-1 text-sm font-bold">
                            Particle Controls
                        </h3>
                        <div className="space-y-2">
                            {Object.keys(settings.particles).map((key) => {
                                const k = key as keyof typeof settings.particles;
                                return (
                                    <ControlSlider
                                        key={`particle-${k}`}
                                        label={k
                                            .replace(/([A-Z])/g, ' $1')
                                            .replace(/^./, (str) => str.toUpperCase())}
                                        value={settings.particles[k]}
                                        onChange={(v) => handleChange('particles', k, v)}
                                        min={0}
                                        max={
                                            k === 'count'
                                                ? 500
                                                : k.includes('Opacity')
                                                  ? 1
                                                  : k.includes('Speed')
                                                    ? 2
                                                    : 10
                                        }
                                        step={k === 'count' ? 1 : 0.01}
                                    />
                                );
                            })}
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-2 border-b border-neutral-700 pb-1 text-sm font-bold">
                            Line Controls
                        </h3>
                        <div className="space-y-2">
                            {Object.keys(settings.lines).map((key) => {
                                const k = key as keyof typeof settings.lines;
                                return (
                                    <ControlSlider
                                        key={`line-${k}`}
                                        label={k
                                            .replace(/([A-Z])/g, ' $1')
                                            .replace(/^./, (str) => str.toUpperCase())}
                                        value={settings.lines[k]}
                                        onChange={(v) => handleChange('lines', k, v)}
                                        min={0}
                                        max={
                                            k === 'count'
                                                ? 50
                                                : k.includes('Width')
                                                  ? 5
                                                  : k.includes('Opacity')
                                                    ? 1
                                                    : k.includes('Speed')
                                                      ? 0.1
                                                      : 30
                                        }
                                        step={k === 'count' ? 1 : 0.01}
                                    />
                                );
                            })}
                        </div>
                    </div>

                    <Button onClick={onRandomize} className="w-full">
                        Randomize All
                    </Button>
                </div>
            )}
        </>
    );
}
/* --------------------------------------------------
 * Main Component
 * -------------------------------------------------- */
export function MagicCard({ initialSettings, className, showControls = false }: MagicCardProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isControlsVisible, setIsControlsVisible] = useState(false);

    const mergedSettings = useMemo(() => {
        const deepMerge = (target: any, source: any): any => {
            for (const key in source) {
                if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                    target[key] = deepMerge(target[key] ? target[key] : {}, source[key]);
                } else if (source[key] !== undefined) {
                    target[key] = source[key];
                }
            }
            return target;
        };
        // Always return a MagicCardSettings object
        return deepMerge(
            JSON.parse(JSON.stringify(defaultSettings)),
            initialSettings || {},
        ) as MagicCardSettings;
    }, [initialSettings]);

    const [settings, setSettings] = useState<MagicCardSettings>(mergedSettings);
    const settingsRef = useRef(settings);

    useEffect(() => {
        settingsRef.current = settings;
    }, [settings]);

    const handleRandomize = useCallback(() => {
        const newSettings: MagicCardSettings = JSON.parse(JSON.stringify(defaultSettings));
        const s = newSettings;
        s.card.glowIntensity = Math.random() * 30;
        s.card.glowMax = Math.random() * 40 + 10;
        s.particles.count = Math.floor(Math.random() * 250);
        s.particles.minSize = Math.random() * 4.9 + 0.1;
        s.particles.maxSize = s.particles.minSize + Math.random() * 5;
        s.particles.minSpeed = Math.random();
        s.particles.maxSpeed = s.particles.minSpeed + Math.random();
        s.particles.minOpacity = Math.random() * 0.5;
        s.particles.maxOpacity = s.particles.minOpacity + Math.random() * 0.5;
        s.lines.count = Math.floor(Math.random() * 25);
        s.lines.minWidth = Math.random() * 2.9 + 0.1;
        s.lines.maxWidth = s.lines.minWidth + Math.random() * 3;
        s.lines.minSpeed = Math.random() * 0.1;
        s.lines.maxSpeed = s.lines.minSpeed + Math.random() * 0.05;
        s.lines.minOpacity = Math.random() * 0.3;
        s.lines.maxOpacity = s.lines.minOpacity + Math.random() * 0.4;
        s.lines.waveHeight = Math.random() * 29 + 1;
        setSettings(newSettings);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let mouseX = 0,
            mouseY = 0,
            isHovering = false,
            pulseTime = 0,
            activeHue = 140;
        let isCardClicked = false,
            clickTime = 0,
            cardShakeAmount = 0;
        const particles: any[] = [];
        const lines: any[] = [];
        interface ClickEffect {
            type: 'particle';
            x: number;
            y: number;
            speedX: number;
            speedY: number;
            size: number;
            opacity: number;
            decay: number;
            color: string;
        }
        const clickEffects: ClickEffect[] = [];

        const resizeCanvas = () => {
            const container = canvas.parentElement;
            if (container) {
                canvas.width = container.clientWidth;
                canvas.height = container.clientHeight;
            }
        };

        const getCardDimensions = () => {
            const s = settingsRef.current;
            const x = canvas.width / 2 - s.card.width / 2;
            const y = canvas.height / 2 - s.card.height / 2;
            return { ...s.card, x, y };
        };

        const createEntities = (entityType: 'particles' | 'lines') => {
            const list = entityType === 'particles' ? particles : lines;
            const s = settingsRef.current[entityType];
            const card = getCardDimensions();
            list.length = 0;

            for (let i = 0; i < s.count; i++) {
                if (entityType === 'particles') {
                    const ps = s as MagicCardSettings['particles'];
                    list.push({
                        x: Math.random() * card.width,
                        y: Math.random() * card.height,
                        size: Math.random() * (ps.maxSize - ps.minSize) + ps.minSize,
                        speedX: Math.random() * (ps.maxSpeed * 2) - ps.maxSpeed,
                        speedY: Math.random() * (ps.maxSpeed * 2) - ps.maxSpeed,
                        opacity: Math.random() * (ps.maxOpacity - ps.minOpacity) + ps.minOpacity,
                    });
                } else {
                    const numPoints = 5;
                    const points = Array.from({ length: numPoints }, (_, j) => {
                        const startY = Math.random() * card.height;
                        return {
                            x: j * (card.width / (numPoints - 1)),
                            y: startY,
                            originalY: startY,
                        };
                    });
                    list.push({
                        points,
                        width:
                            'minWidth' in s && 'maxWidth' in s
                                ? Math.random() * (s.maxWidth - s.minWidth) + s.minWidth
                                : 1,
                        speed: Math.random() * (s.maxSpeed - s.minSpeed) + s.minSpeed,
                        offset: Math.random() * Math.PI * 2,
                        opacity: Math.random() * (s.maxOpacity - s.minOpacity) + s.minOpacity,
                        color: `hsl(${activeHue}, 100%, 60%)`,
                    });
                }
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
            isHovering = true;
        };
        const handleMouseLeave = () => {
            isHovering = false;
        };

        const createClickEffect = (x: number, y: number) => {
            isCardClicked = true;
            clickTime = 0;
            cardShakeAmount = 5;

            for (let i = 0; i < 20; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 4 + 2;
                clickEffects.push({
                    type: 'particle',
                    x,
                    y,
                    speedX: Math.cos(angle) * speed,
                    speedY: Math.sin(angle) * speed,
                    size: Math.random() * 6 + 2,
                    opacity: 1,
                    decay: Math.random() * 0.04 + 0.02,
                    color: `hsl(${activeHue + Math.random() * 30 - 15}, 100%, 60%)`,
                });
            }
        };
        const handleClick = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;
            const card = getCardDimensions();
            if (
                clickX >= card.x &&
                clickX <= card.x + card.width &&
                clickY >= card.y &&
                clickY <= card.y + card.height
            ) {
                createClickEffect(clickX, clickY);
            }
        };

        const roundedRect = (
            x: number,
            y: number,
            width: number,
            height: number,
            radius: number,
        ) => {
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + width - radius, y);
            ctx.arcTo(x + width, y, x + width, y + radius, radius);
            ctx.lineTo(x + width, y + height - radius);
            ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
            ctx.lineTo(x + radius, y + height);
            ctx.arcTo(x, y + height, x, y + height - radius, radius);
            ctx.lineTo(x, y + radius);
            ctx.arcTo(x, y, x + radius, y, radius);
            ctx.closePath();
        };

        const drawCardContent = () => {
            const card = getCardDimensions();
            let cardOffsetX = 0,
                cardOffsetY = 0;
            if (isCardClicked) {
                clickTime += 0.1;
                cardShakeAmount *= 0.9;
                if (clickTime > 2 || cardShakeAmount < 0.1) isCardClicked = false;
                cardOffsetX = Math.sin(clickTime * 10) * cardShakeAmount;
                cardOffsetY = Math.cos(clickTime * 8) * cardShakeAmount;
            }
            const shiftedX = card.x + cardOffsetX;
            const shiftedY = card.y + cardOffsetY;

            ctx.save();
            roundedRect(shiftedX, shiftedY, card.width, card.height, 15);
            ctx.clip();
            const gradient = ctx.createLinearGradient(
                shiftedX,
                shiftedY,
                shiftedX + card.width,
                shiftedY + card.height,
            );
            gradient.addColorStop(0, '#1a1a1a');
            gradient.addColorStop(1, '#0c0c0c');
            ctx.fillStyle = gradient;
            ctx.fillRect(shiftedX, shiftedY, card.width, card.height);

            const sLines = settingsRef.current.lines;
            for (const line of lines) {
                ctx.beginPath();
                ctx.moveTo(shiftedX + line.points[0].x, shiftedY + line.points[0].y);
                for (let i = 1; i < line.points.length; i++) {
                    const p = line.points[i];
                    p.y =
                        p.originalY +
                        Math.sin(pulseTime * line.speed + line.offset + i * 0.5) *
                            sLines.waveHeight;
                    ctx.lineTo(shiftedX + p.x, shiftedY + p.y);
                }
                ctx.strokeStyle = line.color
                    .replace(')', `, ${line.opacity})`)
                    .replace('hsl', 'hsla');
                ctx.lineWidth = line.width;
                ctx.stroke();
            }
            for (const p of particles) {
                p.x += p.speedX;
                p.y += p.speedY;
                if (p.x < 0) p.x = card.width;
                if (p.x > card.width) p.x = 0;
                if (p.y < 0) p.y = card.height;
                if (p.y > card.height) p.y = 0;
                ctx.beginPath();
                ctx.arc(shiftedX + p.x, shiftedY + p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
                ctx.fill();
            }
            ctx.restore();

            ctx.strokeStyle = '#333';
            ctx.lineWidth = 2;
            roundedRect(shiftedX, shiftedY, card.width, card.height, 15);
            ctx.stroke();
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 24px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('MAGIC CARD', shiftedX + card.width / 2, shiftedY + 50);
            const centerX = shiftedX + card.width / 2,
                centerY = shiftedY + card.height / 2;
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(pulseTime * 0.4);
            ctx.beginPath();
            for (let i = 0; i < 5; i++) {
                const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
                const r = 70;
                const x = r * Math.cos(angle),
                    y = r * Math.sin(angle);
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.strokeStyle = `hsl(${activeHue}, 100%, 60%)`;
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(0, 0, 40, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 136, 0.2)`;
            ctx.fill();
            ctx.strokeStyle = `hsl(${activeHue}, 100%, 60%)`;
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.restore();
            ctx.fillStyle = '#ccc';
            ctx.font = '16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Move your cursor to', centerX, centerY + 100);
            ctx.fillText('control the glow effect', centerX, centerY + 125);
            ctx.fillText('Click to activate magic!', centerX, centerY + 150);
            ctx.fillStyle = '#888';
            ctx.font = '12px Arial';
            ctx.fillText('Card Glow Challenge', centerX, shiftedY + card.height - 20);
        };

        const drawClickEffects = () => {
            for (let i = clickEffects.length - 1; i >= 0; i--) {
                const e = clickEffects[i];
                e.x += e.speedX;
                e.y += e.speedY;
                e.speedX *= 0.95;
                e.speedY *= 0.95;
                e.opacity -= e.decay;
                if (e.opacity <= 0) {
                    clickEffects.splice(i, 1);
                    continue;
                }
                ctx.beginPath();
                ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
                ctx.fillStyle = e.color.replace(')', `, ${e.opacity})`).replace('hsl', 'hsla');
                ctx.fill();
            }
        };

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            pulseTime += 0.02;
            const card = getCardDimensions();
            const centerX = card.x + card.width / 2,
                centerY = card.y + card.height / 2;
            let glowSize = card.glowIntensity,
                hue = 140;
            if (isHovering) {
                const dx = mouseX - centerX,
                    dy = mouseY - centerY;
                glowSize =
                    card.glowIntensity +
                    Math.max(0, card.glowMax - Math.sqrt(dx * dx + dy * dy) / 10);
                hue = (((Math.atan2(dy, dx) + Math.PI) / (Math.PI * 2)) * 360) % 360;
                lines.forEach((line) => {
                    line.color = `hsl(${hue}, 100%, 60%)`;
                });
            } else {
                glowSize = card.glowIntensity + Math.sin(pulseTime) * 5;
            }
            activeHue = hue;
            ctx.shadowBlur = glowSize * (isCardClicked ? 1.5 : 1);
            ctx.shadowColor = `hsl(${hue}, 100%, 50%)`;
            drawCardContent();
            ctx.shadowBlur = 0;
            drawClickEffects();
        };

        resizeCanvas();
        createEntities('particles');
        createEntities('lines');
        animate();
        window.addEventListener('resize', resizeCanvas);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);
        canvas.addEventListener('click', handleClick);

        const observer = new ResizeObserver(() => {
            resizeCanvas();
            createEntities('particles');
            createEntities('lines');
        });
        if (canvas.parentElement) observer.observe(canvas.parentElement);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            canvas.removeEventListener('click', handleClick);
            if (canvas.parentElement) observer.unobserve(canvas.parentElement);
        };
    }, [handleRandomize]);

    useEffect(() => {
        const s = settingsRef.current;
        if (s.particles.count > 1000) s.particles.count = 1000;
        if (s.lines.count > 100) s.lines.count = 100;
    }, [settings.particles.count, settings.lines.count]);

    return (
        <div className={cn('relative h-full w-full', className)}>
            {showControls && (
                <Controls
                    settings={settings}
                    onSettingsChange={setSettings}
                    onRandomize={handleRandomize}
                    isVisible={isControlsVisible}
                    onToggle={() => setIsControlsVisible(!isControlsVisible)}
                />
            )}
            <canvas ref={canvasRef} className="absolute top-0 left-0 h-full w-full" />
        </div>
    );
}
