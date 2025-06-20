import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';
import { createFileRoute } from '@tanstack/react-router';

import { MainLayout } from '@/main-layout';
import PageTitle from '@/components/ui/page-title';
import { PreviewTabs } from '@/components/preview-tabs';
import { UsageSection } from '@/components/usage-section';
import { DocsSection } from '@/components/docs-section';
import type { PropsTableRow } from '@/components/props-table';

export const Route = createFileRoute('/components/backgrounds/animated/aurora/')({
    component: AuroraPage,
});

/* --------------------------------------------------
 * Component
 * -------------------------------------------------- */

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v){
  const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
      -0.577350269189626, 0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
      0.5 - vec3(
          dot(x0, x0),
          dot(x12.xy, x12.xy),
          dot(x12.zw, x12.zw)
      ), 
      0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop {
  vec3 color;
  float position;
};

#define COLOR_RAMP(colors, factor, finalColor) {              \\
  int index = 0;                                            \\
  for (int i = 0; i < 2; i++) {                               \\
     ColorStop currentColor = colors[i];                    \\
     bool isInBetween = currentColor.position <= factor;    \\
     index = int(mix(float(index), float(i), float(isInBetween))); \\
  }                                                         \\
  ColorStop currentColor = colors[index];                   \\
  ColorStop nextColor = colors[index + 1];                  \\
  float range = nextColor.position - currentColor.position; \\
  float lerpFactor = (factor - currentColor.position) / range; \\
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \\
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  
  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);
  
  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);
  
  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * height;
  
  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);
  
  vec3 auroraColor = intensity * rampColor;
  
  fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
}
`;

interface AuroraProps {
    colorStops?: string[];
    amplitude?: number;
    blend?: number;
    time?: number;
    speed?: number;
}

function Aurora(props: AuroraProps) {
    const {
        colorStops = ['#3A29FF', '#FF94B4', '#FF3232'],
        amplitude = 1.0,
        blend = 0.5,
    } = props;
    const propsRef = useRef<AuroraProps>(props);
    propsRef.current = props;

    const ctnDom = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctn = ctnDom.current;
        if (!ctn) return;

        const renderer = new Renderer({
            alpha: true,
            premultipliedAlpha: true,
            antialias: true,
        });
        const gl = renderer.gl;
        gl.clearColor(0, 0, 0, 0);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.canvas.style.backgroundColor = 'transparent';

        let program: Program | undefined;

        function resize() {
            if (!ctn) return;
            const width = ctn.offsetWidth;
            const height = ctn.offsetHeight;
            renderer.setSize(width, height);
            if (program) {
                program.uniforms.uResolution.value = [width, height];
            }
        }
        window.addEventListener('resize', resize);

        const geometry = new Triangle(gl);
        if (geometry.attributes.uv) {
            delete (geometry.attributes as any).uv;
        }

        const colorStopsArray = colorStops.map((hex) => {
            const c = new Color(hex);
            return [c.r, c.g, c.b];
        });

        program = new Program(gl, {
            vertex: VERT,
            fragment: FRAG,
            uniforms: {
                uTime: { value: 0 },
                uAmplitude: { value: amplitude },
                uColorStops: { value: colorStopsArray },
                uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
                uBlend: { value: blend },
            },
        });

        const mesh = new Mesh(gl, { geometry, program });
        ctn.appendChild(gl.canvas);

        let animateId = 0;
        const update = (t: number) => {
            animateId = requestAnimationFrame(update);
            const { time = t * 0.01, speed = 1.0 } = propsRef.current;
            if (program) {
                program.uniforms.uTime.value = time * speed * 0.1;
                program.uniforms.uAmplitude.value = propsRef.current.amplitude ?? 1.0;
                program.uniforms.uBlend.value = propsRef.current.blend ?? blend;
                const stops = propsRef.current.colorStops ?? colorStops;
                program.uniforms.uColorStops.value = stops.map((hex: string) => {
                    const c = new Color(hex);
                    return [c.r, c.g, c.b];
                });
                renderer.render({ scene: mesh });
            }
        };
        animateId = requestAnimationFrame(update);

        resize();

        return () => {
            cancelAnimationFrame(animateId);
            window.removeEventListener('resize', resize);
            if (ctn && gl.canvas.parentNode === ctn) {
                ctn.removeChild(gl.canvas);
            }
            gl.getExtension('WEBGL_lose_context')?.loseContext();
        };
    }, []); // Removed dependencies to prevent re-initialization

    return <div ref={ctnDom} className="h-full w-full" />;
}

/* --------------------------------------------------
 * Page
 * -------------------------------------------------- */

function AuroraPage() {
    return (
        <MainLayout>
            <div className="w-full px-6 py-16">
                <PageTitle>Aurora Background</PageTitle>
                <p className="max-w-xl text-white/60">
                    A beautiful, animated aurora effect created with OGL and shaders.
                </p>

                <div className="mt-8 flex flex-col gap-10">
                    <PreviewTabs title="Default" codeText={defaultCode}>
                        <div className="relative h-full w-full overflow-hidden rounded-lg bg-black">
                            <Aurora />
                        </div>
                    </PreviewTabs>

                    <PreviewTabs title="Green Sky" codeText={greenCode}>
                        <div className="relative h-full w-full overflow-hidden rounded-lg bg-black">
                            <Aurora colorStops={['#166534', '#a3e635', '#16a34a']} speed={0.5} />
                        </div>
                    </PreviewTabs>

                    <PreviewTabs title="Intense Red" codeText={redCode}>
                        <div className="relative h-full w-full overflow-hidden rounded-lg bg-black">
                            <Aurora
                                colorStops={['#881337', '#fecdd3', '#fda4af']}
                                amplitude={2.0}
                                blend={0.8}
                                speed={2.0}
                            />
                        </div>
                    </PreviewTabs>
                </div>

                <UsageSection
                    description="This component uses OGL to render a WebGL canvas with an aurora-like shader animation."
                    code={defaultCode}
                />

                <DocsSection
                    description={
                        <p>
                            The effect is highly customizable through props that control the color,
                            speed, and shape of the aurora.
                        </p>
                    }
                    rows={rows}
                />
            </div>
        </MainLayout>
    );
}

const rows: PropsTableRow[] = [
    { prop: 'colorStops', type: '[string, string, string]', defaultValue: '["#3A29FF", ...]', required: false, description: 'An array of three hex colors defining the aurora gradient.' },
    { prop: 'speed', type: 'number', defaultValue: '1.0', required: false, description: 'Controls the animation speed. Higher values make the aurora move faster.' },
    { prop: 'blend', type: 'number', defaultValue: '0.5', required: false, description: 'Controls the blending of the aurora effect with the background.' },
    { prop: 'amplitude', type: 'number', defaultValue: '1.0', required: false, description: 'Controls the height intensity of the aurora effect.' },
];

const defaultCode = `import Aurora from "@/components/backgrounds/aurora"; // Adjust import path

export default function Page() {
  return (
    <div className="relative h-screen w-full bg-black">
      <Aurora />
    </div>
  );
}`;

const greenCode = `import Aurora from "@/components/backgrounds/aurora"; // Adjust import path

export default function Page() {
  return (
    <div className="relative h-screen w-full bg-black">
      <Aurora 
        colorStops={['#166534', '#a3e635', '#16a34a']} 
        speed={0.5} 
      />
    </div>
  );
}`;

const redCode = `import Aurora from "@/components/backgrounds/aurora"; // Adjust import path

export default function Page() {
  return (
    <div className="relative h-screen w-full bg-black">
      <Aurora
        colorStops={['#881337', '#fecdd3', '#fda4af']}
        amplitude={2.0}
        blend={0.8}
        speed={2.0}
      />
    </div>
  );
}`; 