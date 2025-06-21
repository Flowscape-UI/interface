import { createFileRoute } from '@tanstack/react-router';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import { MainLayout } from '@/main-layout';
import PageTitle from '@/components/ui/page-title';
import { PreviewTabs } from '@/components/preview-tabs';
import { UsageSection } from '@/components/usage-section';
import { DocsSection } from '@/components/docs-section';
import type { PropsTableRow } from '@/components/props-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '../../../../../components/ui/slider';

export const Route = createFileRoute(
    '/components/backgrounds/interactive/particle-floor/',
)({
    component: ParticleFloorPage,
});

interface ParticleFloorProps {
    waveIntensity?: number;
    color?: string;
    particleSize?: number;
    density?: number;
    gridSize?: number;
}

function ParticleFloor({
    waveIntensity = 1,
    color = 'black',
    particleSize = 0.1,
    density = 0.5,
    gridSize = 100,
}: ParticleFloorProps) {
    const points = useRef<THREE.Points>(null!);

    const particles = useMemo(() => {
        const temp = [];
        for (let x = 0; x < gridSize; x += density) {
            for (let z = 0; z < gridSize; z += density) {
                const position = new THREE.Vector3(x - gridSize / 2, 0, z - gridSize / 2);
                temp.push({ position, originalX: position.x, originalZ: position.z });
            }
        }
        return temp;
    }, [gridSize, density]);

    const positions = useMemo(() => {
        return new Float32Array(particles.length * 3);
    }, [particles]);

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();
        particles.forEach((particle, i) => {
            const waveX = Math.sin(particle.originalX * 0.3 + time * 2) * 0.2 * waveIntensity;
            const waveZ = Math.cos(particle.originalZ * 0.2 + time * 1.5) * 0.2 * waveIntensity;
            particle.position.y = waveX + waveZ;

            const rotatedY =
                particle.position.y * Math.cos(Math.PI / 4) -
                particle.originalZ * Math.sin(Math.PI / 4);
            const rotatedZ =
                particle.position.y * Math.sin(Math.PI / 4) +
                particle.originalZ * Math.cos(Math.PI / 4);

            positions[i * 3] = particle.originalX;
            positions[i * 3 + 1] = rotatedY;
            positions[i * 3 + 2] = rotatedZ;
        });
        if (points.current) {
            points.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particles.length}
                    array={positions}
                    itemSize={3}
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial color={color} size={particleSize} sizeAttenuation />
        </points>
    );
}

function ParticleFloorDemo({
    showControls = true,
    ...props
}: ParticleFloorProps & { showControls?: boolean }) {
    const [waveIntensity, setWaveIntensity] = useState(props.waveIntensity ?? 1);

    return (
        <div className="relative h-full w-full bg-transparent">
            <Canvas camera={{ position: [0, 5, 10], fov: 45 }}>
                <color attach="background" args={['white']} />
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <ParticleFloor {...props} waveIntensity={waveIntensity} />
                <OrbitControls />
            </Canvas>
            {showControls && (
                <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                    <Card className="w-full max-w-md mx-4 shadow-lg border-2 border-black">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-center text-base font-normal">
                                Wave motion intensity
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Slider
                                defaultValue={[waveIntensity]}
                                max={3}
                                min={0.1}
                                step={0.1}
                                onValueChange={(value: number[]) => setWaveIntensity(value[0])}
                                className="my-4"
                            />
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}

function ParticleFloorPage() {
    return (
        <MainLayout>
            <div className="w-full px-6 py-16">
                <PageTitle>Particle Floor Wave Animation</PageTitle>
                <p className="max-w-xl text-white/60">
                    A 3D particle floor with a wave animation. Control the intensity of the wave
                    with a slider. Based on a component from{' '}
                    <a
                        href="https://v0.dev/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-sky-400 hover:text-sky-300"
                    >
                        v0.dev
                    </a>
                    .
                </p>

                <div className="mt-8 flex flex-col gap-10">
                    <PreviewTabs title="Default" codeText={particleFloorCode}>
                        <ParticleFloorDemo />
                    </PreviewTabs>

                    <PreviewTabs title="Red Particles" codeText={particleFloorCode}>
                        <ParticleFloorDemo color="#ff0000" particleSize={0.15} showControls={false} />
                    </PreviewTabs>

                    <PreviewTabs title="High Density" codeText={particleFloorCode}>
                        <ParticleFloorDemo density={0.2} particleSize={0.08} waveIntensity={0.5} />
                    </PreviewTabs>
                </div>

                <UsageSection
                    description={
                        'The component is rendered within a @react-three/fiber Canvas. You can control the wave intensity, particle color, size, and density through props.'
                    }
                    code={particleFloorCode}
                />

                <DocsSection
                    description={
                        <p>
                            This component uses <code>three.js</code> and{' '}
                            <code>@react-three/fiber</code> to create a dynamic grid of particles
                            that animate in a wave-like motion.
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
        prop: 'waveIntensity',
        type: 'number',
        defaultValue: '1',
        required: false,
        description: 'Intensity of the wave animation.',
    },
    {
        prop: 'color',
        type: 'string',
        defaultValue: 'black',
        required: false,
        description: 'Color of the particles.',
    },
    {
        prop: 'particleSize',
        type: 'number',
        defaultValue: '0.1',
        required: false,
        description: 'Size of each particle.',
    },
    {
        prop: 'density',
        type: 'number',
        defaultValue: '0.5',
        required: false,
        description: 'Density of particles in the grid (lower is denser).',
    },
    {
        prop: 'gridSize',
        type: 'number',
        defaultValue: '100',
        required: false,
        description: 'The overall size of the particle grid.',
    },
];

const particleFloorCode = `import { Canvas } from '@react-three/fiber';
import { ParticleFloor } from '@/components/backgrounds/particle-floor'; // Adjust import path

export default function Page() {
  return (
    <div className="relative h-96 w-full bg-white">
      <Canvas>
        <ParticleFloor waveIntensity={1} color="black" />
      </Canvas>
    </div>
  );
}`; 