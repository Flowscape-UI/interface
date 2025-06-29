import React, { useId, useRef } from 'react';
import { createFileRoute } from '@tanstack/react-router';

import { MainLayout } from '@/main-layout';
import PageTitle from '@/components/ui/page-title';
import { PreviewTabs } from '@/components/preview-tabs';
import { UsageSection } from '@/components/usage-section';
import { DocsSection } from '@/components/docs-section';
import type { PropsTableRow } from '@/components/props-table';
import { useTranslation } from '@/hooks/use-translation';

export const Route = createFileRoute('/components/backgrounds/animated/bubbles/')({
    component: BubblesPage,
});

/* --------------------------------------------------
 * Component
 * -------------------------------------------------- */

interface AnimatedBubblesProps {
    className?: string;
    colors?: {
        bg1?: string;
        bg2?: string;
        color1?: string;
        color2?: string;
        color3?: string;
        color4?: string;
        color5?: string;
    };
    circleSize?: string;
    blendMode?: React.CSSProperties['mixBlendMode'];
    animations?: {
        moveVertical?: number;
        moveInCircle?: number;
        moveHorizontal?: number;
    };
}

function AnimatedBubbles({
    className = '',
    colors = {},
    circleSize = '80%',
    blendMode = 'hard-light',
    animations = {},
}: AnimatedBubblesProps) {
    const uniqueId = useId();
    const containerRef = useRef<HTMLDivElement>(null);
    const filterId = `goo-${uniqueId}`;

    const defaultColors = {
        bg1: 'rgb(108, 0, 162)',
        bg2: 'rgb(0, 17, 82)',
        color1: '18, 113, 255',
        color2: '221, 74, 255',
        color3: '100, 220, 255',
        color4: '200, 50, 50',
        color5: '180, 180, 50',
        ...colors,
    };

    const defaultAnimations = {
        moveVertical: 30,
        moveInCircle: 20,
        moveHorizontal: 40,
        ...animations,
    };

    const cssVariables = {
        '--color-bg1': defaultColors.bg1,
        '--color-bg2': defaultColors.bg2,
        '--color1': defaultColors.color1,
        '--color2': defaultColors.color2,
        '--color3': defaultColors.color3,
        '--color4': defaultColors.color4,
        '--color5': defaultColors.color5,
        '--circle-size': circleSize,
        '--blending': blendMode,
        '--move-vertical-duration': `${defaultAnimations.moveVertical}s`,
        '--move-circle-duration': `${defaultAnimations.moveInCircle}s`,
        '--move-horizontal-duration': `${defaultAnimations.moveHorizontal}s`,
    } as React.CSSProperties;

    return (
        <div
            ref={containerRef}
            className={`relative h-full w-full overflow-hidden ${className}`}
            style={{ ...cssVariables, willChange: 'transform' }}
        >
            <style>
                {`
                @keyframes moveInCircle { 0% { transform: rotate(0deg); } 50% { transform: rotate(180deg); } 100% { transform: rotate(360deg); } }
                @keyframes moveVertical { 0% { transform: translateY(-50%); } 50% { transform: translateY(50%); } 100% { transform: translateY(-50%); } }
                @keyframes moveHorizontal { 0% { transform: translateX(-50%) translateY(-10%); } 50% { transform: translateX(50%) translateY(10%); } 100% { transform: translateX(-50%) translateY(-10%); } }

                .animate-move-vertical { animation: moveVertical var(--move-vertical-duration) ease infinite; }
                .animate-move-in-circle { animation: moveInCircle var(--move-horizontal-duration) linear infinite; }
                .animate-move-in-circle-reverse { animation: moveInCircle var(--move-circle-duration) reverse infinite; }
                .animate-move-in-circle-slow { animation: moveInCircle var(--move-circle-duration) ease infinite; }
                .animate-move-horizontal { animation: moveHorizontal var(--move-horizontal-duration) ease infinite; }
                `}
            </style>
            <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(40deg, var(--color-bg1), var(--color-bg2))` }}
            />
            <svg style={{ display: 'none' }}>
                <defs>
                    <filter id={filterId}>
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                            result="goo"
                        />
                        <feBlend in="SourceGraphic" in2="goo" />
                    </filter>
                </defs>
            </svg>
            <div className="h-full w-full" style={{ filter: `url(#${filterId}) blur(40px)` }}>
                <div
                    className="animate-move-vertical absolute"
                    style={{
                        background: `radial-gradient(circle at center, rgba(var(--color1), 0.8) 0, rgba(var(--color1), 0) 50%)`,
                        mixBlendMode: blendMode,
                        width: 'var(--circle-size)',
                        height: 'var(--circle-size)',
                        top: 'calc(50% - var(--circle-size) / 2)',
                        left: 'calc(50% - var(--circle-size) / 2)',
                        transformOrigin: 'center center',
                        opacity: 1,
                    }}
                />
                <div
                    className="animate-move-in-circle-reverse absolute"
                    style={{
                        background: `radial-gradient(circle at center, rgba(var(--color2), 0.8) 0, rgba(var(--color2), 0) 50%)`,
                        mixBlendMode: blendMode,
                        width: 'var(--circle-size)',
                        height: 'var(--circle-size)',
                        top: 'calc(50% - var(--circle-size) / 2)',
                        left: 'calc(50% - var(--circle-size) / 2)',
                        transformOrigin: 'calc(50% - 400px)',
                        opacity: 1,
                    }}
                />
                <div
                    className="animate-move-in-circle absolute"
                    style={{
                        background: `radial-gradient(circle at center, rgba(var(--color3), 0.8) 0, rgba(var(--color3), 0) 50%)`,
                        mixBlendMode: blendMode,
                        width: 'var(--circle-size)',
                        height: 'var(--circle-size)',
                        top: 'calc(50% - var(--circle-size) / 2 + 200px)',
                        left: 'calc(50% - var(--circle-size) / 2 - 500px)',
                        transformOrigin: 'calc(50% + 400px)',
                        opacity: 1,
                    }}
                />
                <div
                    className="animate-move-horizontal absolute"
                    style={{
                        background: `radial-gradient(circle at center, rgba(var(--color4), 0.8) 0, rgba(var(--color4), 0) 50%)`,
                        mixBlendMode: blendMode,
                        width: 'var(--circle-size)',
                        height: 'var(--circle-size)',
                        top: 'calc(50% - var(--circle-size) / 2)',
                        left: 'calc(50% - var(--circle-size) / 2)',
                        transformOrigin: 'calc(50% - 200px)',
                        opacity: 0.7,
                    }}
                />
                <div
                    className="animate-move-in-circle-slow absolute"
                    style={{
                        background: `radial-gradient(circle at center, rgba(var(--color5), 0.8) 0, rgba(var(--color5), 0) 50%)`,
                        mixBlendMode: blendMode,
                        width: 'calc(var(--circle-size) * 2)',
                        height: 'calc(var(--circle-size) * 2)',
                        top: 'calc(50% - var(--circle-size))',
                        left: 'calc(50% - var(--circle-size))',
                        transformOrigin: 'calc(50% - 800px) calc(50% + 200px)',
                        opacity: 1,
                    }}
                />
            </div>
        </div>
    );
}

/* --------------------------------------------------
 * Page
 * -------------------------------------------------- */

function BubblesPage() {
    const { t } = useTranslation();
    return (
        <MainLayout>
            <div className="w-full px-6 py-16">
                <PageTitle>Animated Bubbles Background</PageTitle>
                <p className="max-w-xl text-white/60">
                    {t(`A mesmerizing, interactive "lava lamp" effect created with CSS. Fully
                    customizable via props.`)}
                </p>

                <div className="mt-8 flex flex-col gap-10">
                    <PreviewTabs
                        title="Default"
                        codeText={bubblesCode}
                        codeSandboxUrl="https://codepen.io/glitchworker/pen/jENZGOV"
                    >
                        <div className="relative h-full w-full overflow-hidden rounded-lg">
                            <AnimatedBubbles />
                        </div>
                    </PreviewTabs>

                    <PreviewTabs
                        title="Fiery Theme"
                        codeText={fieryCode}
                        codeSandboxUrl="https://codepen.io/glitchworker/pen/jENZGOV"
                    >
                        <div className="relative h-full w-full overflow-hidden rounded-lg">
                            <AnimatedBubbles
                                colors={{
                                    bg1: 'rgb(130, 0, 0)',
                                    bg2: 'rgb(50, 0, 20)',
                                    color1: '255, 100, 100',
                                    color2: '255, 150, 50',
                                    color3: '200, 100, 20',
                                    color4: '255, 50, 50',
                                    color5: '240, 120, 80',
                                }}
                                blendMode="soft-light"
                            />
                        </div>
                    </PreviewTabs>

                    <PreviewTabs
                        title="Oceanic Theme"
                        codeText={oceanCode}
                        codeSandboxUrl="https://codepen.io/glitchworker/pen/jENZGOV"
                    >
                        <div className="relative h-full w-full overflow-hidden rounded-lg">
                            <AnimatedBubbles
                                colors={{
                                    bg1: 'rgb(0, 20, 80)',
                                    bg2: 'rgb(0, 50, 120)',
                                    color1: '50, 150, 255',
                                    color2: '80, 200, 255',
                                    color3: '100, 220, 255',
                                    color4: '20, 100, 200',
                                    color5: '0, 180, 220',
                                }}
                                blendMode="screen"
                                animations={{
                                    moveVertical: 50,
                                    moveInCircle: 15,
                                    moveHorizontal: 30,
                                }}
                            />
                        </div>
                    </PreviewTabs>
                </div>

                <UsageSection
                    description={t(
                        "This component creates a dynamic, interactive bubble background. It's built to be self-contained and highly customizable through props.",
                    )}
                    code={bubblesComponentCode}
                />

                <DocsSection
                    description={
                        <p>
                            {t('The component uses a clever SVG filter to achieve the')} 'gooey' |
                            'lava lamp' {t('effect.')}{' '}
                            {t(`The animation is pure CSS, powered by dynamic CSS
                            variables passed from React.`)}
                        </p>
                    }
                    rows={rows}
                />
            </div>
        </MainLayout>
    );
}

const rows: PropsTableRow[] = [
    {
        prop: 'text',
        type: 'string',
        defaultValue: 'Bubbles',
        required: false,
        description: 'The text to display in the center.',
    },
    {
        prop: 'className',
        type: 'string',
        defaultValue: '""',
        required: false,
        description: 'Additional classes for the container.',
    },
    {
        prop: 'colors',
        type: 'object',
        defaultValue: '{...}',
        required: false,
        description: 'Object to customize the background and bubble colors.',
    },
    {
        prop: 'circleSize',
        type: 'string',
        defaultValue: '80%',
        required: false,
        description: 'Base size of the bubbles as a percentage or pixel value.',
    },
    {
        prop: 'blendMode',
        type: 'mix-blend-mode',
        defaultValue: 'hard-light',
        required: false,
        description: 'CSS mix-blend-mode for the bubbles.',
    },
    {
        prop: 'animations',
        type: 'object',
        defaultValue: '{...}',
        required: false,
        description: 'Object to customize the duration of the animations in seconds.',
    },
];

const bubblesCode = `import { AnimatedBubbles } from "@/components/backgrounds/bubbles"; // Adjust import path

export default function Page() {
  return (
    <div className="relative h-screen w-full">
      <AnimatedBubbles />
    </div>
  );
}`;

const fieryCode = `import { AnimatedBubbles } from "@/components/backgrounds/bubbles"; // Adjust import path

export default function Page() {
  return (
    <div className="relative h-screen w-full">
      <AnimatedBubbles
        colors={{
          bg1: 'rgb(130, 0, 0)',
          bg2: 'rgb(50, 0, 20)',
          color1: '255, 100, 100',
          color2: '255, 150, 50',
          color3: '200, 100, 20',
          color4: '255, 50, 50',
          color5: '240, 120, 80',
        }}
        blendMode="soft-light"
      />
    </div>
  );
}`;

const oceanCode = `import { AnimatedBubbles } from "@/components/backgrounds/bubbles"; // Adjust import path

export default function Page() {
  return (
    <div className="relative h-screen w-full">
      <AnimatedBubbles
        colors={{
          bg1: 'rgb(0, 20, 80)',
          bg2: 'rgb(0, 50, 120)',
          color1: '50, 150, 255',
          color2: '80, 200, 255',
          color3: '100, 220, 255',
          color4: '20, 100, 200',
          color5: '0, 180, 220',
        }}
        blendMode="screen"
        animations={{
          moveVertical: 50,
          moveInCircle: 15,
          moveHorizontal: 30,
        }}
      />
    </div>
  );
}`;

const bubblesComponentCode = `
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
    Clock,
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
    type WebGLRendererParameters,
    SRGBColorSpace,
    MathUtils,
    Vector2,
    Vector3,
    MeshPhysicalMaterial,
    ShaderChunk,
    Color,
    Object3D,
    InstancedMesh,
    PMREMGenerator,
    SphereGeometry,
    AmbientLight,
    PointLight,
    ACESFilmicToneMapping,
    Raycaster,
    Plane,
} from 'three';
import { useEffect, useId, useRef } from 'react'

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

interface XConfig {
    canvas?: HTMLCanvasElement;
    id?: string;
    rendererOptions?: Partial<WebGLRendererParameters>;
    size?: 'parent' | { width: number; height: number };
}

interface SizeData {
    width: number;
    height: number;
    wWidth: number;
    wHeight: number;
    ratio: number;
    pixelRatio: number;
}

class X {
    #config: XConfig;
    #postprocessing: any;
    #resizeObserver?: ResizeObserver;
    #intersectionObserver?: IntersectionObserver;
    #resizeTimer?: number;
    #animationFrameId: number = 0;
    #clock: Clock = new Clock();
    #animationState = { elapsed: 0, delta: 0 };
    #isAnimating: boolean = false;
    #isVisible: boolean = false;

    canvas!: HTMLCanvasElement;
    camera!: PerspectiveCamera;
    cameraMinAspect?: number;
    cameraMaxAspect?: number;
    cameraFov!: number;
    maxPixelRatio?: number;
    minPixelRatio?: number;
    scene!: Scene;
    renderer!: WebGLRenderer;
    size: SizeData = {
        width: 0,
        height: 0,
        wWidth: 0,
        wHeight: 0,
        ratio: 0,
        pixelRatio: 0,
    };

    render: () => void = this.#render.bind(this);
    onBeforeRender: (state: { elapsed: number; delta: number }) => void = () => {};
    onAfterRender: (state: { elapsed: number; delta: number }) => void = () => {};
    onAfterResize: (size: SizeData) => void = () => {};
    isDisposed: boolean = false;

    constructor(config: XConfig) {
        this.#config = { ...config };
        this.#initCamera();
        this.#initScene();
        this.#initRenderer();
        this.resize();
        this.#initObservers();
    }

    #initCamera() {
        this.camera = new PerspectiveCamera();
        this.cameraFov = this.camera.fov;
    }

    #initScene() {
        this.scene = new Scene();
    }

    #initRenderer() {
        if (this.#config.canvas) {
            this.canvas = this.#config.canvas;
        } else if (this.#config.id) {
            const elem = document.getElementById(this.#config.id);
            if (elem instanceof HTMLCanvasElement) {
                this.canvas = elem;
            } else {
                console.error('Three: Missing canvas or id parameter');
            }
        } else {
            console.error('Three: Missing canvas or id parameter');
        }
        this.canvas!.style.display = 'block';
        const rendererOptions: WebGLRendererParameters = {
            canvas: this.canvas,
            powerPreference: 'high-performance',
            ...(this.#config.rendererOptions ?? {}),
        };
        this.renderer = new WebGLRenderer(rendererOptions);
        this.renderer.outputColorSpace = SRGBColorSpace;
    }

    #initObservers() {
        if (!(this.#config.size instanceof Object)) {
            window.addEventListener('resize', this.#onResize.bind(this));
            if (this.#config.size === 'parent' && this.canvas.parentNode) {
                this.#resizeObserver = new ResizeObserver(this.#onResize.bind(this));
                this.#resizeObserver.observe(this.canvas.parentNode as Element);
            }
        }
        this.#intersectionObserver = new IntersectionObserver(this.#onIntersection.bind(this), {
            root: null,
            rootMargin: '0px',
            threshold: 0,
        });
        this.#intersectionObserver.observe(this.canvas);
        document.addEventListener('visibilitychange', this.#onVisibilityChange.bind(this));
    }

    #onResize() {
        if (this.#resizeTimer) clearTimeout(this.#resizeTimer);
        this.#resizeTimer = window.setTimeout(this.resize.bind(this), 100);
    }

    resize() {
        let w: number, h: number;
        if (this.#config.size instanceof Object) {
            w = this.#config.size.width;
            h = this.#config.size.height;
        } else if (this.#config.size === 'parent' && this.canvas.parentNode) {
            w = (this.canvas.parentNode as HTMLElement).offsetWidth;
            h = (this.canvas.parentNode as HTMLElement).offsetHeight;
        } else {
            w = window.innerWidth;
            h = window.innerHeight;
        }
        this.size.width = w;
        this.size.height = h;
        this.size.ratio = w / h;
        this.#updateCamera();
        this.#updateRenderer();
        this.onAfterResize(this.size);
    }

    #updateCamera() {
        this.camera.aspect = this.size.width / this.size.height;
        if (this.camera.isPerspectiveCamera && this.cameraFov) {
            if (this.cameraMinAspect && this.camera.aspect < this.cameraMinAspect) {
                this.#adjustFov(this.cameraMinAspect);
            } else if (this.cameraMaxAspect && this.camera.aspect > this.cameraMaxAspect) {
                this.#adjustFov(this.cameraMaxAspect);
            } else {
                this.camera.fov = this.cameraFov;
            }
        }
        this.camera.updateProjectionMatrix();
        this.updateWorldSize();
    }

    #adjustFov(aspect: number) {
        const tanFov = Math.tan(MathUtils.degToRad(this.cameraFov / 2));
        const newTan = tanFov / (this.camera.aspect / aspect);
        this.camera.fov = 2 * MathUtils.radToDeg(Math.atan(newTan));
    }

    updateWorldSize() {
        if (this.camera.isPerspectiveCamera) {
            const fovRad = (this.camera.fov * Math.PI) / 180;
            this.size.wHeight = 2 * Math.tan(fovRad / 2) * this.camera.position.length();
            this.size.wWidth = this.size.wHeight * this.camera.aspect;
        } else if ((this.camera as any).isOrthographicCamera) {
            const cam = this.camera as any;
            this.size.wHeight = cam.top - cam.bottom;
            this.size.wWidth = cam.right - cam.left;
        }
    }

    #updateRenderer() {
        this.renderer.setSize(this.size.width, this.size.height);
        this.#postprocessing?.setSize(this.size.width, this.size.height);
        let pr = window.devicePixelRatio;
        if (this.maxPixelRatio && pr > this.maxPixelRatio) {
            pr = this.maxPixelRatio;
        } else if (this.minPixelRatio && pr < this.minPixelRatio) {
            pr = this.minPixelRatio;
        }
        this.renderer.setPixelRatio(pr);
        this.size.pixelRatio = pr;
    }

    get postprocessing() {
        return this.#postprocessing;
    }
    set postprocessing(value: any) {
        this.#postprocessing = value;
        this.render = value.render.bind(value);
    }

    #onIntersection(entries: IntersectionObserverEntry[]) {
        this.#isVisible = entries[0].isIntersecting;
        this.#isVisible ? this.#startAnimation() : this.#stopAnimation();
    }

    #onVisibilityChange() {
        if (this.#isAnimating) {
            document.hidden ? this.#stopAnimation() : this.#startAnimation();
        }
    }

    #startAnimation() {
        if (this.#isAnimating) return;
        const animateFrame = () => {
            this.#animationFrameId = requestAnimationFrame(animateFrame);
            this.#animationState.delta = this.#clock.getDelta();
            this.#animationState.elapsed += this.#animationState.delta;
            this.onBeforeRender(this.#animationState);
            this.render();
            this.onAfterRender(this.#animationState);
        };
        this.#isAnimating = true;
        this.#clock.start();
        animateFrame();
    }

    #stopAnimation() {
        if (this.#isAnimating) {
            cancelAnimationFrame(this.#animationFrameId);
            this.#isAnimating = false;
            this.#clock.stop();
        }
    }

    #render() {
        this.renderer.render(this.scene, this.camera);
    }

    clear() {
        this.scene.traverse((obj) => {
            if (
                (obj as any).isMesh &&
                typeof (obj as any).material === 'object' &&
                (obj as any).material !== null
            ) {
                Object.keys((obj as any).material).forEach((key) => {
                    const matProp = (obj as any).material[key];
                    if (
                        matProp &&
                        typeof matProp === 'object' &&
                        typeof matProp.dispose === 'function'
                    ) {
                        matProp.dispose();
                    }
                });
                (obj as any).material.dispose();
                (obj as any).geometry.dispose();
            }
        });
        this.scene.clear();
    }

    dispose() {
        this.#onResizeCleanup();
        this.#stopAnimation();
        this.clear();
        this.#postprocessing?.dispose();
        this.renderer.dispose();
        this.isDisposed = true;
    }

    #onResizeCleanup() {
        window.removeEventListener('resize', this.#onResize.bind(this));
        this.#resizeObserver?.disconnect();
        this.#intersectionObserver?.disconnect();
        document.removeEventListener('visibilitychange', this.#onVisibilityChange.bind(this));
    }
}

interface WConfig {
    count: number;
    maxX: number;
    maxY: number;
    maxZ: number;
    maxSize: number;
    minSize: number;
    size0: number;
    gravity: number;
    friction: number;
    wallBounce: number;
    maxVelocity: number;
    controlSphere0?: boolean;
    followCursor?: boolean;
}

class W {
    config: WConfig;
    positionData: Float32Array;
    velocityData: Float32Array;
    sizeData: Float32Array;
    center: Vector3 = new Vector3();

    constructor(config: WConfig) {
        this.config = config;
        this.positionData = new Float32Array(3 * config.count).fill(0);
        this.velocityData = new Float32Array(3 * config.count).fill(0);
        this.sizeData = new Float32Array(config.count).fill(1);
        this.center = new Vector3();
        this.#initializePositions();
        this.setSizes();
    }

    #initializePositions() {
        const { config, positionData } = this;
        this.center.toArray(positionData, 0);
        for (let i = 1; i < config.count; i++) {
            const idx = 3 * i;
            positionData[idx] = MathUtils.randFloatSpread(2 * config.maxX);
            positionData[idx + 1] = MathUtils.randFloatSpread(2 * config.maxY);
            positionData[idx + 2] = MathUtils.randFloatSpread(2 * config.maxZ);
        }
    }

    setSizes() {
        const { config, sizeData } = this;
        sizeData[0] = config.size0;
        for (let i = 1; i < config.count; i++) {
            sizeData[i] = MathUtils.randFloat(config.minSize, config.maxSize);
        }
    }

    update(deltaInfo: { delta: number }) {
        const { config, center, positionData, sizeData, velocityData } = this;
        let startIdx = 0;
        if (config.controlSphere0) {
            startIdx = 1;
            const firstVec = new Vector3().fromArray(positionData, 0);
            firstVec.lerp(center, 0.1).toArray(positionData, 0);
            new Vector3(0, 0, 0).toArray(velocityData, 0);
        }
        for (let idx = startIdx; idx < config.count; idx++) {
            const base = 3 * idx;
            const pos = new Vector3().fromArray(positionData, base);
            const vel = new Vector3().fromArray(velocityData, base);
            vel.y -= deltaInfo.delta * config.gravity * sizeData[idx];
            vel.multiplyScalar(config.friction);
            vel.clampLength(0, config.maxVelocity);
            pos.add(vel);
            pos.toArray(positionData, base);
            vel.toArray(velocityData, base);
        }
        for (let idx = startIdx; idx < config.count; idx++) {
            const base = 3 * idx;
            const pos = new Vector3().fromArray(positionData, base);
            const vel = new Vector3().fromArray(velocityData, base);
            const radius = sizeData[idx];
            for (let jdx = idx + 1; jdx < config.count; jdx++) {
                const otherBase = 3 * jdx;
                const otherPos = new Vector3().fromArray(positionData, otherBase);
                const otherVel = new Vector3().fromArray(velocityData, otherBase);
                const diff = new Vector3().copy(otherPos).sub(pos);
                const dist = diff.length();
                const sumRadius = radius + sizeData[jdx];
                if (dist < sumRadius) {
                    const overlap = sumRadius - dist;
                    const correction = diff.normalize().multiplyScalar(0.5 * overlap);
                    const velCorrection = correction
                        .clone()
                        .multiplyScalar(Math.max(vel.length(), 1));
                    pos.sub(correction);
                    vel.sub(velCorrection);
                    pos.toArray(positionData, base);
                    vel.toArray(velocityData, base);
                    otherPos.add(correction);
                    otherVel.add(correction.clone().multiplyScalar(Math.max(otherVel.length(), 1)));
                    otherPos.toArray(positionData, otherBase);
                    otherVel.toArray(velocityData, otherBase);
                }
            }
            if (config.controlSphere0) {
                const diff = new Vector3().copy(new Vector3().fromArray(positionData, 0)).sub(pos);
                const d = diff.length();
                const sumRadius0 = radius + sizeData[0];
                if (d < sumRadius0) {
                    const correction = diff.normalize().multiplyScalar(sumRadius0 - d);
                    const velCorrection = correction
                        .clone()
                        .multiplyScalar(Math.max(vel.length(), 2));
                    pos.sub(correction);
                    vel.sub(velCorrection);
                }
            }
            if (Math.abs(pos.x) + radius > config.maxX) {
                pos.x = Math.sign(pos.x) * (config.maxX - radius);
                vel.x = -vel.x * config.wallBounce;
            }
            if (config.gravity === 0) {
                if (Math.abs(pos.y) + radius > config.maxY) {
                    pos.y = Math.sign(pos.y) * (config.maxY - radius);
                    vel.y = -vel.y * config.wallBounce;
                }
            } else if (pos.y - radius < -config.maxY) {
                pos.y = -config.maxY + radius;
                vel.y = -vel.y * config.wallBounce;
            }
            const maxBoundary = Math.max(config.maxZ, config.maxSize);
            if (Math.abs(pos.z) + radius > maxBoundary) {
                pos.z = Math.sign(pos.z) * (config.maxZ - radius);
                vel.z = -vel.z * config.wallBounce;
            }
            pos.toArray(positionData, base);
            vel.toArray(velocityData, base);
        }
    }
}

class Y extends MeshPhysicalMaterial {
    uniforms: { [key: string]: { value: any } } = {
        thicknessDistortion: { value: 0.1 },
        thicknessAmbient: { value: 0 },
        thicknessAttenuation: { value: 0.1 },
        thicknessPower: { value: 2 },
        thicknessScale: { value: 10 },
    };

    constructor(params: any) {
        super(params);
        this.defines = { USE_UV: '' };
        this.onBeforeCompile = (shader) => {
            Object.assign(shader.uniforms, this.uniforms);
            shader.fragmentShader =
                \`
        uniform float thicknessPower;
        uniform float thicknessScale;
        uniform float thicknessDistortion;
        uniform float thicknessAmbient;
        uniform float thicknessAttenuation;
        \` + shader.fragmentShader;
            shader.fragmentShader = shader.fragmentShader.replace(
                'void main() {',
                \`
        void RE_Direct_Scattering(const in IncidentLight directLight, const in vec2 uv, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, inout ReflectedLight reflectedLight) {
          vec3 scatteringHalf = normalize(directLight.direction + (geometryNormal * thicknessDistortion));
          float scatteringDot = pow(saturate(dot(geometryViewDir, -scatteringHalf)), thicknessPower) * thicknessScale;
          #ifdef USE_COLOR
            vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * vColor;
          #else
            vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * diffuse;
          #endif
          reflectedLight.directDiffuse += scatteringIllu * thicknessAttenuation * directLight.color;
        }

        void main() {
        \`,
            );
            const lightsChunk = ShaderChunk.lights_fragment_begin.replaceAll(
                'RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );',
                \`
          RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
          RE_Direct_Scattering(directLight, vUv, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, reflectedLight);
        \`,
            );
            shader.fragmentShader = shader.fragmentShader.replace(
                '#include <lights_fragment_begin>',
                lightsChunk,
            );
            if (this.onBeforeCompile2) this.onBeforeCompile2(shader);
        };
    }
    onBeforeCompile2?: (shader: any) => void;
}

const XConfig = {
    count: 200,
    colors: [0x7000ff, 0xa166ff, 0x3d008d, 0xffffff, 0x808080, 0x4b4b4b],
    ambientColor: 0xffffff,
    ambientIntensity: 1,
    lightIntensity: 200,
    materialParams: {
        metalness: 0.2,
        roughness: 0.5,
        clearcoat: 0.8,
        clearcoatRoughness: 0.2,
    },
    minSize: 0.5,
    maxSize: 1,
    size0: 1,
    gravity: 0.5,
    friction: 0.9975,
    wallBounce: 0.95,
    maxVelocity: 0.15,
    maxX: 5,
    maxY: 5,
    maxZ: 2,
    controlSphere0: false,
    followCursor: true,
};

const U = new Object3D();

let globalPointerActive = false;
const pointerPosition = new Vector2();

interface PointerData {
    position: Vector2;
    nPosition: Vector2;
    hover: boolean;
    onEnter: (data: PointerData) => void;
    onMove: (data: PointerData) => void;
    onClick: (data: PointerData) => void;
    onLeave: (data: PointerData) => void;
    dispose?: () => void;
}

const pointerMap = new Map<HTMLElement, PointerData>();

function createPointerData(
    options: Partial<PointerData> & { domElement: HTMLElement },
): PointerData {
    const defaultData: PointerData = {
        position: new Vector2(),
        nPosition: new Vector2(),
        hover: false,
        onEnter: () => {},
        onMove: () => {},
        onClick: () => {},
        onLeave: () => {},
        ...options,
    };
    if (!pointerMap.has(options.domElement)) {
        pointerMap.set(options.domElement, defaultData);
        if (!globalPointerActive) {
            document.body.addEventListener('pointermove', onPointerMove as EventListener);
            document.body.addEventListener('pointerleave', onPointerLeave as EventListener);
            document.body.addEventListener('click', onPointerClick as EventListener);
            globalPointerActive = true;
        }
    }
    defaultData.dispose = () => {
        pointerMap.delete(options.domElement);
        if (pointerMap.size === 0) {
            document.body.removeEventListener('pointermove', onPointerMove as EventListener);
            document.body.removeEventListener('pointerleave', onPointerLeave as EventListener);
            document.body.removeEventListener('click', onPointerClick as EventListener);
            globalPointerActive = false;
        }
    };
    return defaultData;
}

function onPointerMove(e: PointerEvent) {
    pointerPosition.set(e.clientX, e.clientY);
    for (const [elem, data] of pointerMap) {
        const rect = elem.getBoundingClientRect();
        if (isInside(rect)) {
            updatePointerData(data, rect);
            if (!data.hover) {
                data.hover = true;
                data.onEnter(data);
            }
            data.onMove(data);
        } else if (data.hover) {
            data.hover = false;
            data.onLeave(data);
        }
    }
}

function onPointerClick(e: PointerEvent) {
    pointerPosition.set(e.clientX, e.clientY);
    for (const [elem, data] of pointerMap) {
        const rect = elem.getBoundingClientRect();
        updatePointerData(data, rect);
        if (isInside(rect)) data.onClick(data);
    }
}

function onPointerLeave() {
    for (const data of pointerMap.values()) {
        if (data.hover) {
            data.hover = false;
            data.onLeave(data);
        }
    }
}

function updatePointerData(data: PointerData, rect: DOMRect) {
    data.position.set(pointerPosition.x - rect.left, pointerPosition.y - rect.top);
    data.nPosition.set(
        (data.position.x / rect.width) * 2 - 1,
        (-data.position.y / rect.height) * 2 + 1,
    );
}

function isInside(rect: DOMRect) {
    return (
        pointerPosition.x >= rect.left &&
        pointerPosition.x <= rect.left + rect.width &&
        pointerPosition.y >= rect.top &&
        pointerPosition.y <= rect.top + rect.height
    );
}

class Z extends InstancedMesh {
    config: typeof XConfig;
    physics: W;
    ambientLight: AmbientLight | undefined;
    light: PointLight | undefined;

    constructor(renderer: WebGLRenderer, params: Partial<typeof XConfig> = {}) {
        const config = { ...XConfig, ...params };
        const roomEnv = new RoomEnvironment();
        const pmrem = new PMREMGenerator(renderer);
        const envTexture = pmrem.fromScene(roomEnv).texture;
        const geometry = new SphereGeometry();
        const material = new Y({ envMap: envTexture, ...config.materialParams });
        material.envMapRotation.x = -Math.PI / 2;
        super(geometry, material, config.count);
        this.config = config;
        this.physics = new W(config);
        this.#setupLights();
        this.setColors(config.colors);
    }

    #setupLights() {
        this.ambientLight = new AmbientLight(
            this.config.ambientColor,
            this.config.ambientIntensity,
        );
        this.add(this.ambientLight);
        this.light = new PointLight(this.config.colors[0], this.config.lightIntensity);
        this.add(this.light);
    }

    setColors(colors: number[]) {
        if (Array.isArray(colors) && colors.length > 1) {
            const colorUtils = (function (colorsArr: number[]) {
                let baseColors: number[] = colorsArr;
                let colorObjects: Color[] = [];
                baseColors.forEach((col) => {
                    colorObjects.push(new Color(col));
                });
                return {
                    setColors: (cols: number[]) => {
                        baseColors = cols;
                        colorObjects = [];
                        baseColors.forEach((col) => {
                            colorObjects.push(new Color(col));
                        });
                    },
                    getColorAt: (ratio: number, out: Color = new Color()) => {
                        const clamped = Math.max(0, Math.min(1, ratio));
                        const scaled = clamped * (baseColors.length - 1);
                        const idx = Math.floor(scaled);
                        const start = colorObjects[idx];
                        if (idx >= baseColors.length - 1) return start.clone();
                        const alpha = scaled - idx;
                        const end = colorObjects[idx + 1];
                        out.r = start.r + alpha * (end.r - start.r);
                        out.g = start.g + alpha * (end.g - start.g);
                        out.b = start.b + alpha * (end.b - start.b);
                        return out;
                    },
                };
            })(colors);
            for (let idx = 0; idx < this.count; idx++) {
                this.setColorAt(idx, colorUtils.getColorAt(idx / this.count));
                if (idx === 0) {
                    this.light!.color.copy(colorUtils.getColorAt(idx / this.count));
                }
            }

            if (!this.instanceColor) return;
            this.instanceColor.needsUpdate = true;
        }
    }

    update(deltaInfo: { delta: number }) {
        this.physics.update(deltaInfo);
        for (let idx = 0; idx < this.count; idx++) {
            U.position.fromArray(this.physics.positionData, 3 * idx);
            if (idx === 0 && this.config.followCursor === false) {
                U.scale.setScalar(0);
            } else {
                U.scale.setScalar(this.physics.sizeData[idx]);
            }
            U.updateMatrix();
            this.setMatrixAt(idx, U.matrix);
            if (idx === 0) this.light!.position.copy(U.position);
        }
        this.instanceMatrix.needsUpdate = true;
    }
}

interface CreateBallpitReturn {
    three: X;
    spheres: Z;
    setCount: (count: number) => void;
    togglePause: () => void;
    dispose: () => void;
}

function createBallpit(canvas: HTMLCanvasElement, config: any = {}): CreateBallpitReturn {
    const threeInstance = new X({
        canvas,
        size: 'parent',
        rendererOptions: { antialias: true, alpha: true },
    });
    let spheres: Z | null = null;
    threeInstance.renderer.toneMapping = ACESFilmicToneMapping;
    threeInstance.camera.position.set(0, 0, 20);
    threeInstance.camera.lookAt(0, 0, 0);
    threeInstance.cameraMaxAspect = 1.5;
    threeInstance.resize();
    initialize(config);
    const raycaster = new Raycaster();
    const plane = new Plane(new Vector3(0, 0, 1), 0);
    const intersectionPoint = new Vector3();
    let isPaused = false;
    const pointerData = createPointerData({
        domElement: canvas,
        onMove() {
            if (!spheres || !spheres.config.followCursor) return;
            raycaster.setFromCamera(pointerData.nPosition, threeInstance.camera);
            threeInstance.camera.getWorldDirection(plane.normal);
            raycaster.ray.intersectPlane(plane, intersectionPoint);
            spheres.physics.center.copy(intersectionPoint);
            spheres.config.controlSphere0 = true;
        },
        onLeave() {
            if (!spheres || !spheres.config.followCursor) return;
            spheres.config.controlSphere0 = false;
        },
    });
    function initialize(cfg: any) {
        if (spheres) {
            threeInstance.clear();
            threeInstance.scene.remove(spheres);
        }
        spheres = new Z(threeInstance.renderer, cfg);
        threeInstance.scene.add(spheres);
    }
    threeInstance.onBeforeRender = (deltaInfo) => {
        if (!isPaused && spheres) spheres.update(deltaInfo);
    };
    threeInstance.onAfterResize = (size) => {
        if (spheres) {
            spheres.config.maxX = size.wWidth / 2;
            spheres.config.maxY = size.wHeight / 2;
        }
    };
    return {
        three: threeInstance,
        get spheres() {
            return spheres!;
        },
        setCount(count: number) {
            if (spheres) {
                initialize({ ...spheres.config, count });
            }
        },
        togglePause() {
            isPaused = !isPaused;
        },
        dispose() {
            pointerData.dispose?.();
            threeInstance.dispose();
        },
    };
}

interface BallpitProps {
    className?: string;
    title?: string;
    titleClassName?: string;
    followCursor?: boolean;
    [key: string]: any;
}

export const Ballpit: React.FC<BallpitProps> = ({
    className = '',
    title = '',
    titleClassName = '',
    followCursor = true,
    ...props
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const spheresInstanceRef = useRef<CreateBallpitReturn | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        spheresInstanceRef.current = createBallpit(canvas, {
            followCursor,
            ...props,
        });

        return () => {
            if (spheresInstanceRef.current) {
                spheresInstanceRef.current.dispose();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            className={cn(
                'relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-black',
                className,
            )}
        >
            {title && (
                <h2 className={cn('z-10 text-8xl font-bold select-none', titleClassName)}>
                    {title}
                </h2>
            )}
            <canvas className="absolute inset-0 h-full w-full" ref={canvasRef} />
        </div>
    );
};

interface AnimatedBubblesProps {
    className?: string;
    colors?: {
        bg1?: string;
        bg2?: string;
        color1?: string;
        color2?: string;
        color3?: string;
        color4?: string;
        color5?: string;
    };
    circleSize?: string;
    blendMode?: React.CSSProperties['mixBlendMode'];
    animations?: {
        moveVertical?: number;
        moveInCircle?: number;
        moveHorizontal?: number;
    };
}

export function AnimatedBubbles({
    className = '',
    colors = {},
    circleSize = '80%',
    blendMode = 'hard-light',
    animations = {},
}: AnimatedBubblesProps) {
    const uniqueId = useId();
    const containerRef = useRef<HTMLDivElement>(null);
    const filterId = \`goo-\${uniqueId}\`;

    const defaultColors = {
        bg1: 'rgb(108, 0, 162)',
        bg2: 'rgb(0, 17, 82)',
        color1: '18, 113, 255',
        color2: '221, 74, 255',
        color3: '100, 220, 255',
        color4: '200, 50, 50',
        color5: '180, 180, 50',
        ...colors,
    };

    const defaultAnimations = {
        moveVertical: 30,
        moveInCircle: 20,
        moveHorizontal: 40,
        ...animations,
    };

    const cssVariables = {
        '--color-bg1': defaultColors.bg1,
        '--color-bg2': defaultColors.bg2,
        '--color1': defaultColors.color1,
        '--color2': defaultColors.color2,
        '--color3': defaultColors.color3,
        '--color4': defaultColors.color4,
        '--color5': defaultColors.color5,
        '--circle-size': circleSize,
        '--blending': blendMode,
        '--move-vertical-duration': \`\${defaultAnimations.moveVertical}s\`,
        '--move-circle-duration': \`\${defaultAnimations.moveInCircle}s\`,
        '--move-horizontal-duration': \`\${defaultAnimations.moveHorizontal}s\`,
    } as React.CSSProperties;

    return (
        <div
            ref={containerRef}
            className={\`relative h-full w-full overflow-hidden \${className}\`}
            style={{ ...cssVariables, willChange: 'transform' }}
        >
            <style>
                {\`
                @keyframes moveInCircle { 0% { transform: rotate(0deg); } 50% { transform: rotate(180deg); } 100% { transform: rotate(360deg); } }
                @keyframes moveVertical { 0% { transform: translateY(-50%); } 50% { transform: translateY(50%); } 100% { transform: translateY(-50%); } }
                @keyframes moveHorizontal { 0% { transform: translateX(-50%) translateY(-10%); } 50% { transform: translateX(50%) translateY(10%); } 100% { transform: translateX(-50%) translateY(-10%); } }

                .animate-move-vertical { animation: moveVertical var(--move-vertical-duration) ease infinite; }
                .animate-move-in-circle { animation: moveInCircle var(--move-horizontal-duration) linear infinite; }
                .animate-move-in-circle-reverse { animation: moveInCircle var(--move-circle-duration) reverse infinite; }
                .animate-move-in-circle-slow { animation: moveInCircle var(--move-circle-duration) ease infinite; }
                .animate-move-horizontal { animation: moveHorizontal var(--move-horizontal-duration) ease infinite; }
                \`}
            </style>
            <div
                className="absolute inset-0"
                style={{ background: \`linear-gradient(40deg, var(--color-bg1), var(--color-bg2))\` }}
            />
            <svg style={{ display: 'none' }}>
                <defs>
                    <filter id={filterId}>
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                            result="goo"
                        />
                        <feBlend in="SourceGraphic" in2="goo" />
                    </filter>
                </defs>
            </svg>
            <div className="h-full w-full" style={{ filter: \`url(#\${filterId}) blur(40px)\` }}>
                <div
                    className="animate-move-vertical absolute"
                    style={{
                        background: \`radial-gradient(circle at center, rgba(var(--color1), 0.8) 0, rgba(var(--color1), 0) 50%)\`,
                        mixBlendMode: blendMode,
                        width: 'var(--circle-size)',
                        height: 'var(--circle-size)',
                        top: 'calc(50% - var(--circle-size) / 2)',
                        left: 'calc(50% - var(--circle-size) / 2)',
                        transformOrigin: 'center center',
                        opacity: 1,
                    }}
                />
                <div
                    className="animate-move-in-circle-reverse absolute"
                    style={{
                        background: \`radial-gradient(circle at center, rgba(var(--color2), 0.8) 0, rgba(var(--color2), 0) 50%)\`,
                        mixBlendMode: blendMode,
                        width: 'var(--circle-size)',
                        height: 'var(--circle-size)',
                        top: 'calc(50% - var(--circle-size) / 2)',
                        left: 'calc(50% - var(--circle-size) / 2)',
                        transformOrigin: 'calc(50% - 400px)',
                        opacity: 1,
                    }}
                />
                <div
                    className="animate-move-in-circle absolute"
                    style={{
                        background: \`radial-gradient(circle at center, rgba(var(--color3), 0.8) 0, rgba(var(--color3), 0) 50%)\`,
                        mixBlendMode: blendMode,
                        width: 'var(--circle-size)',
                        height: 'var(--circle-size)',
                        top: 'calc(50% - var(--circle-size) / 2 + 200px)',
                        left: 'calc(50% - var(--circle-size) / 2 - 500px)',
                        transformOrigin: 'calc(50% + 400px)',
                        opacity: 1,
                    }}
                />
                <div
                    className="animate-move-horizontal absolute"
                    style={{
                        background: \`radial-gradient(circle at center, rgba(var(--color4), 0.8) 0, rgba(var(--color4), 0) 50%)\`,
                        mixBlendMode: blendMode,
                        width: 'var(--circle-size)',
                        height: 'var(--circle-size)',
                        top: 'calc(50% - var(--circle-size) / 2)',
                        left: 'calc(50% - var(--circle-size) / 2)',
                        transformOrigin: 'calc(50% - 200px)',
                        opacity: 0.7,
                    }}
                />
                <div
                    className="animate-move-in-circle-slow absolute"
                    style={{
                        background: \`radial-gradient(circle at center, rgba(var(--color5), 0.8) 0, rgba(var(--color5), 0) 50%)\`,
                        mixBlendMode: blendMode,
                        width: 'calc(var(--circle-size) * 2)',
                        height: 'calc(var(--circle-size) * 2)',
                        top: 'calc(50% - var(--circle-size))',
                        left: 'calc(50% - var(--circle-size))',
                        transformOrigin: 'calc(50% - 800px) calc(50% + 200px)',
                        opacity: 1,
                    }}
                />
            </div>
        </div>
    );
}`;
