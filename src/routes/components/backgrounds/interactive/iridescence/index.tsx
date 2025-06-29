import { createFileRoute } from '@tanstack/react-router';
import { MainLayout } from '@/main-layout';
import PageTitle from '@/components/ui/page-title';
import { PreviewTabs } from '@/components/preview-tabs';
import { UsageSection } from '@/components/usage-section';
import { DocsSection } from '@/components/docs-section';
import type { PropsTableRow } from '@/components/props-table';
import Iridescence from './Iridescence';
import { useTranslation } from '@/hooks/use-translation';

export const Route = createFileRoute('/components/backgrounds/interactive/iridescence/')({
    component: IridescencePage,
});

function IridescencePage() {
    const { t } = useTranslation();
    return (
        <MainLayout>
            <div className="w-full px-6 py-16">
                <PageTitle>Iridescence Background</PageTitle>
                <p className="max-w-xl text-white/60">
                    {t('A WebGL-based iridescent shader effect that reacts to mouse movement.')}
                </p>

                <div className="mt-8 flex flex-col gap-10">
                    <PreviewTabs
                        title="Default"
                        codeText={defaultCode}
                        reactBitsUrl="https://www.reactbits.dev/backgrounds/iridescence"
                    >
                        <div className="relative h-full w-full overflow-hidden rounded-lg bg-black">
                            <Iridescence />
                        </div>
                    </PreviewTabs>

                    <PreviewTabs
                        title="Blue color"
                        codeText={blueCode}
                        reactBitsUrl="https://www.reactbits.dev/backgrounds/iridescence"
                    >
                        <div className="relative h-full w-full overflow-hidden rounded-lg bg-black">
                            <Iridescence color={[0.1, 0.3, 1.0]} />
                        </div>
                    </PreviewTabs>

                    <PreviewTabs
                        title="No mouse interaction"
                        codeText={noMouseCode}
                        reactBitsUrl="https://www.reactbits.dev/backgrounds/iridescence"
                    >
                        <div className="relative h-full w-full overflow-hidden rounded-lg bg-black">
                            <Iridescence mouseReact={false} />
                        </div>
                    </PreviewTabs>

                    <PreviewTabs
                        title="Slower and less reactive"
                        codeText={slowCode}
                        reactBitsUrl="https://www.reactbits.dev/backgrounds/iridescence"
                    >
                        <div className="relative h-full w-full overflow-hidden rounded-lg bg-black">
                            <Iridescence speed={0.5} amplitude={0.05} />
                        </div>
                    </PreviewTabs>
                </div>

                <UsageSection
                    description={t(
                        'This component uses a WebGL shader to create a dynamic, colorful, and interactive background.',
                    )}
                    code={componentCode}
                />

                <DocsSection
                    description={
                        <p>
                            {t(`The effect is rendered on a 'canvas' element and can be customized
                            through various props to change its color, speed, and interactivity.`)}
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
        prop: 'color',
        type: 'Array<number>',
        defaultValue: '[1, 1, 1]',
        required: false,
        description: 'Base color as an array of RGB values (each between 0 and 1).',
    },
    {
        prop: 'speed',
        type: 'number',
        defaultValue: '1.0',
        required: false,
        description: 'Speed multiplier for the animation.',
    },
    {
        prop: 'amplitude',
        type: 'number',
        defaultValue: '0.1',
        required: false,
        description: 'Amplitude for the mouse-driven effect.',
    },
    {
        prop: 'mouseReact',
        type: 'boolean',
        defaultValue: 'true',
        required: false,
        description: 'Enable or disable mouse interaction with the shader.',
    },
];

const defaultCode = `import Iridescence from "@/components/backgrounds/Iridescence";

export default function Page() {
  return (
    <div className="relative h-screen w-full bg-black">
      <Iridescence />
    </div>
  );
}`;

const blueCode = `import Iridescence from "@/components/backgrounds/Iridescence";

export default function Page() {
  return (
    <div className="relative h-screen w-full bg-black">
      <Iridescence color={[0.1, 0.3, 1.0]} />
    </div>
  );
}`;
const noMouseCode = `import Iridescence from "@/components/backgrounds/Iridescence";

export default function Page() {
  return (
    <div className="relative h-screen w-full bg-black">
      <Iridescence mouseReact={false} />
    </div>
  );
}`;
const slowCode = `import Iridescence from "@/components/backgrounds/Iridescence";

export default function Page() {
  return (
    <div className="relative h-screen w-full bg-black">
      <Iridescence speed={0.5} amplitude={0.05} />
    </div>
  );
}`;

const componentCode = `
import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';
import { useEffect, useRef } from 'react';

const vertexShader = \`
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
\`;

const fragmentShader = \`
precision highp float;

uniform float uTime;
uniform vec3 uColor;
uniform vec3 uResolution;
uniform vec2 uMouse;
uniform float uAmplitude;
uniform float uSpeed;

varying vec2 vUv;

void main() {
  float mr = min(uResolution.x, uResolution.y);
  vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;

  uv += (uMouse - vec2(0.5)) * uAmplitude;

  float d = -uTime * 0.5 * uSpeed;
  float a = 0.0;
  for (float i = 0.0; i < 8.0; ++i) {
    a += cos(i - d - a * uv.x);
    d += sin(uv.y * i + a);
  }
  d += uTime * 0.5 * uSpeed;
  vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);
  col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5) * uColor;
  gl_FragColor = vec4(col, 1.0);
}
\`;

interface IridescenceProps {
    color?: [number, number, number];
    speed?: number;
    amplitude?: number;
    mouseReact?: boolean;
}

export default function Iridescence({
    color = [1, 1, 1],
    speed = 1.0,
    amplitude = 0.1,
    mouseReact = true,
    ...rest
}: IridescenceProps) {
    const ctnDom = useRef<HTMLDivElement>(null);
    const mousePos = useRef({ x: 0.5, y: 0.5 });

    useEffect(() => {
        if (!ctnDom.current) return;
        const ctn = ctnDom.current;
        const renderer = new Renderer();
        const gl = renderer.gl;
        gl.clearColor(1, 1, 1, 1);

        // eslint-disable-next-line prefer-const
        let program: Program;

        function resize() {
            const scale = 1;
            renderer.setSize(ctn.offsetWidth * scale, ctn.offsetHeight * scale);
            if (program) {
                program.uniforms.uResolution.value = new Color(
                    gl.canvas.width,
                    gl.canvas.height,
                    gl.canvas.width / gl.canvas.height,
                );
            }
        }
        window.addEventListener('resize', resize, false);
        resize();

        const geometry = new Triangle(gl);
        program = new Program(gl, {
            vertex: vertexShader,
            fragment: fragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uColor: { value: new Color(...color) },
                uResolution: {
                    value: new Color(
                        gl.canvas.width,
                        gl.canvas.height,
                        gl.canvas.width / gl.canvas.height,
                    ),
                },
                uMouse: { value: new Float32Array([mousePos.current.x, mousePos.current.y]) },
                uAmplitude: { value: amplitude },
                uSpeed: { value: speed },
            },
        });

        const mesh = new Mesh(gl, { geometry, program });
        let animateId: number;

        function update(t: number) {
            animateId = requestAnimationFrame(update);
            program.uniforms.uTime.value = t * 0.001;
            renderer.render({ scene: mesh });
        }
        animateId = requestAnimationFrame(update);
        ctn.appendChild(gl.canvas);

        function handleMouseMove(e: MouseEvent) {
            const rect = ctn.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = 1.0 - (e.clientY - rect.top) / rect.height;
            mousePos.current = { x, y };
            program.uniforms.uMouse.value[0] = x;
            program.uniforms.uMouse.value[1] = y;
        }
        if (mouseReact) {
            ctn.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            cancelAnimationFrame(animateId);
            window.removeEventListener('resize', resize);
            if (mouseReact) {
                ctn.removeEventListener('mousemove', handleMouseMove);
            }
            ctn.removeChild(gl.canvas);
            gl.getExtension('WEBGL_lose_context')?.loseContext();
        };
    }, [color, speed, amplitude, mouseReact]);

    return <div ref={ctnDom} className="h-full w-full" {...rest} />;
}
`;
