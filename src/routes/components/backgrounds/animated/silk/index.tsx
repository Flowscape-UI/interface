import React, { forwardRef, useMemo, useRef, useLayoutEffect } from 'react';
import { Canvas, useFrame, useThree, type RootState } from '@react-three/fiber';
import { Color, Mesh, ShaderMaterial, type IUniform } from 'three';
import { createFileRoute } from '@tanstack/react-router';

import { MainLayout } from '@/main-layout';
import PageTitle from '@/components/ui/page-title';
import { PreviewTabs } from '@/components/preview-tabs';
import { UsageSection } from '@/components/usage-section';
import { DocsSection } from '@/components/docs-section';
import type { PropsTableRow } from '@/components/props-table';
import { useTranslation } from '@/hooks/use-translation';

export const Route = createFileRoute('/components/backgrounds/animated/silk/')({
    component: SilkPage,
});

/* --------------------------------------------------
 * Component
 * -------------------------------------------------- */
type NormalizedRGB = [number, number, number];

const hexToNormalizedRGB = (hex: string): NormalizedRGB => {
    const clean = hex.replace('#', '');
    const r = parseInt(clean.slice(0, 2), 16) / 255;
    const g = parseInt(clean.slice(2, 4), 16) / 255;
    const b = parseInt(clean.slice(4, 6), 16) / 255;
    return [r, g, b];
};

interface UniformValue<T = number | Color> {
    value: T;
}

interface SilkUniforms {
    uSpeed: UniformValue<number>;
    uScale: UniformValue<number>;
    uNoiseIntensity: UniformValue<number>;
    uColor: UniformValue<Color>;
    uRotation: UniformValue<number>;
    uTime: UniformValue<number>;
    [uniform: string]: IUniform;
}

const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vPosition = position;
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform vec3  uColor;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;

const float e = 2.71828182845904523536;

float noise(vec2 texCoord) {
  float G = e;
  vec2  r = (G * sin(G * texCoord));
  return fract(r.x * r.y * (1.0 + texCoord.x));
}

vec2 rotateUvs(vec2 uv, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  mat2  rot = mat2(c, -s, s, c);
  return rot * uv;
}

void main() {
  float rnd        = noise(gl_FragCoord.xy);
  vec2  uv         = rotateUvs(vUv * uScale, uRotation);
  vec2  tex        = uv * uScale;
  float tOffset    = uSpeed * uTime;

  tex.y += 0.03 * sin(8.0 * tex.x - tOffset);

  float pattern = 0.6 +
                  0.4 * sin(5.0 * (tex.x + tex.y +
                                   cos(3.0 * tex.x + 5.0 * tex.y) +
                                   0.02 * tOffset) +
                           sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));

  vec4 col = vec4(uColor, 1.0) * vec4(pattern) - rnd / 15.0 * uNoiseIntensity;
  col.a = 1.0;
  gl_FragColor = col;
}
`;

interface SilkPlaneProps {
    uniforms: SilkUniforms;
}

const SilkPlane = forwardRef<Mesh, SilkPlaneProps>(function SilkPlane({ uniforms }, ref) {
    const { viewport } = useThree();

    useLayoutEffect(() => {
        const mesh = ref as React.MutableRefObject<Mesh | null>;
        if (mesh.current) {
            mesh.current.scale.set(viewport.width, viewport.height, 1);
        }
    }, [ref, viewport]);

    useFrame((_state: RootState, delta: number) => {
        const mesh = ref as React.MutableRefObject<Mesh | null>;
        if (mesh.current) {
            const material = mesh.current.material as ShaderMaterial & {
                uniforms: SilkUniforms;
            };
            material.uniforms.uTime.value += 0.1 * delta;
        }
    });

    return (
        <mesh ref={ref}>
            <planeGeometry args={[1, 1, 1, 1]} />
            <shaderMaterial
                uniforms={uniforms}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
            />
        </mesh>
    );
});
SilkPlane.displayName = 'SilkPlane';

export interface SilkProps {
    speed?: number;
    scale?: number;
    color?: string;
    noiseIntensity?: number;
    rotation?: number;
}

const Silk: React.FC<SilkProps> = ({
    speed = 5,
    scale = 1,
    color = '#7B7481',
    noiseIntensity = 1.5,
    rotation = 0,
}) => {
    const meshRef = useRef<Mesh>(null);

    const uniforms = useMemo<SilkUniforms>(
        () => ({
            uSpeed: { value: speed },
            uScale: { value: scale },
            uNoiseIntensity: { value: noiseIntensity },
            uColor: { value: new Color(...hexToNormalizedRGB(color)) },
            uRotation: { value: rotation },
            uTime: { value: 0 },
        }),
        [speed, scale, noiseIntensity, color, rotation],
    );

    return (
        <Canvas dpr={[1, 2]} frameloop="always">
            <SilkPlane ref={meshRef} uniforms={uniforms} />
        </Canvas>
    );
};

/* --------------------------------------------------
 * Page
 * -------------------------------------------------- */

function SilkPage() {
    const {t} = useTranslation();
    return (
        <MainLayout>
            <div className="w-full px-6 py-16">
                <PageTitle>Silk Background</PageTitle>
                <p className="max-w-xl text-white/60">
                    {t('A mesmerizing, animated silk-like background created with shaders in')}{' '}
                    React Three Fiber.
                </p>

                <div className="mt-8 flex flex-col gap-10">
                    <PreviewTabs title="Default" codeText={defaultCode}>
                        <div className="relative h-full w-full overflow-hidden rounded-lg">
                            <Silk />
                        </div>
                    </PreviewTabs>

                    <PreviewTabs title="Blue Silk" codeText={blueCode}>
                        <div className="relative h-full w-full overflow-hidden rounded-lg">
                            <Silk color="#3498db" speed={3} scale={1.2} />
                        </div>
                    </PreviewTabs>

                    <PreviewTabs title="Emerald Green & Rotated" codeText={greenCode}>
                        <div className="relative h-full w-full overflow-hidden rounded-lg">
                            <Silk
                                color="#2ecc71"
                                speed={8}
                                scale={0.8}
                                noiseIntensity={0.5}
                                rotation={Math.PI / 4}
                            />
                        </div>
                    </PreviewTabs>
                </div>

                <UsageSection
                    description={t("This component creates an animated silk background using a custom shader. It is highly configurable through props.")}
                    code={defaultCode}
                />

                <DocsSection
                    description={
                        <p>
                            {t('The effect is achieved using a GLSL shader within a')} React Three Fiber
                            canvas. {t('All properties are passed as uniforms to the shader.')}
                        </p>
                    }
                    rows={rows}
                />
            </div>
        </MainLayout>
    );
}

const rows: PropsTableRow[] = [
    { prop: 'speed', type: 'number', defaultValue: '5', required: false, description: 'Controls the animation speed of the silk effect.' },
    { prop: 'scale', type: 'number', defaultValue: '1', required: false, description: 'Controls the scale of the silk pattern.' },
    { prop: 'color', type: 'string', defaultValue: '#7B7481', required: false, description: 'Hex color code for the silk pattern.' },
    { prop: 'noiseIntensity', type: 'number', defaultValue: '1.5', required: false, description: 'Controls the intensity of the noise effect.' },
    { prop: 'rotation', type: 'number', defaultValue: '0', required: false, description: 'Controls the rotation of the silk pattern (in radians).' },
];

const defaultCode = `import Silk from "@/components/backgrounds/silk"; // Adjust import path

export default function Page() {
  return (
    <div className="relative h-screen w-full">
      <Silk />
    </div>
  );
}`;

const blueCode = `import Silk from "@/components/backgrounds/silk"; // Adjust import path

export default function Page() {
  return (
    <div className="relative h-screen w-full">
      <Silk color="#3498db" speed={3} scale={1.2} />
    </div>
  );
}`;

const greenCode = `import Silk from "@/components/backgrounds/silk"; // Adjust import path

export default function Page() {
  return (
    <div className="relative h-screen w-full">
      <Silk
        color="#2ecc71"
        speed={8}
        scale={0.8}
        noiseIntensity={0.5}
        rotation={Math.PI / 4}
      />
    </div>
  );
}`; 