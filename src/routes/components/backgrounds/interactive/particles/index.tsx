import { useEffect, useRef } from 'react';
import { createFileRoute } from '@tanstack/react-router';

import { MainLayout } from '@/main-layout';
import PageTitle from '@/components/ui/page-title';
import { PreviewTabs } from '@/components/preview-tabs';
import { UsageSection } from '@/components/usage-section';
import { DocsSection } from '@/components/docs-section';
import type { PropsTableRow } from '@/components/props-table';
import { useTranslation } from '@/hooks/use-translation';

export const Route = createFileRoute('/components/backgrounds/interactive/particles/')({
    component: ParticlesPage,
});

/* --------------------------------------------------
 * Component
 * -------------------------------------------------- */
declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        particlesJS: any;
    }
}

interface ParticleConfig {
    particles: {
        number: {
            value: number;
            density: {
                enable: boolean;
                value_area: number;
            };
        };
        color: {
            value: string;
        };
        shape: {
            type: string;
            stroke: {
                width: number;
                color: string;
            };
            polygon: {
                nb_sides: number;
            };
            image: {
                src: string;
                width: number;
                height: number;
            };
        };
        opacity: {
            value: number;
            random: boolean;
            anim: {
                enable: boolean;
                speed: number;
                opacity_min: number;
                sync: boolean;
            };
        };
        size: {
            value: number;
            random: boolean;
            anim: {
                enable: boolean;
                speed: number;
                size_min: number;
                sync: boolean;
            };
        };
        line_linked: {
            enable: boolean;
            distance: number;
            color: string;
            opacity: number;
            width: number;
        };
        move: {
            enable: boolean;
            speed: number;
            direction: string;
            random: boolean;
            straight: boolean;
            out_mode: string;
            bounce: boolean;
            attract: {
                enable: boolean;
                rotateX: number;
                rotateY: number;
            };
        };
    };
    interactivity: {
        detect_on: string;
        events: {
            onhover: {
                enable: boolean;
                mode: string;
            };
            onclick: {
                enable: boolean;
                mode: string;
            };
            resize: boolean;
        };
        modes: {
            grab: {
                distance: number;
                line_linked: {
                    opacity: number;
                };
            };
            bubble: {
                distance: number;
                size: number;
                duration: number;
                opacity: number;
                speed: number;
            };
            repulse: {
                distance: number;
                duration: number;
            };
            push: {
                particles_nb: number;
            };
            remove: {
                particles_nb: number;
            };
        };
    };
    retina_detect: boolean;
}

interface ParticlesBackgroundProps {
    id?: string;
    className?: string;
    backgroundColor?: string;
    particleCount?: number;
    particleColor?: string;
    lineColor?: string;
    particleSize?: number;
    moveSpeed?: number;
    lineDistance?: number;
    lineWidth?: number;
    hoverMode?: 'grab' | 'repulse' | 'bubble';
    clickMode?: 'push' | 'remove' | 'bubble' | 'repulse';
    shape?: 'circle' | 'edge' | 'triangle' | 'polygon' | 'star' | 'image';
    enableLines?: boolean;
    enableHover?: boolean;
    enableClick?: boolean;
    opacity?: number;
    customConfig?: Partial<ParticleConfig>;
}

function ParticlesBackground({
    id = 'particles-js',
    className = '',
    backgroundColor = '#1b2431',
    particleCount = 80,
    particleColor = '#ff6e48',
    lineColor = '#ff6e48',
    particleSize = 10,
    moveSpeed = 6,
    lineDistance = 150,
    lineWidth = 3,
    hoverMode = 'repulse',
    clickMode = 'push',
    shape = 'circle',
    enableLines = true,
    enableHover = true,
    enableClick = true,
    opacity = 1,
    customConfig,
}: ParticlesBackgroundProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scriptId = 'particles-js-script';
        const initializeParticles = () => {
            if (!window.particlesJS) {
                return;
            }

            const defaultConfig: ParticleConfig = {
                particles: {
                    number: {
                        value: particleCount,
                        density: { enable: true, value_area: 800 },
                    },
                    color: { value: particleColor },
                    shape: {
                        type: shape,
                        stroke: { width: 0, color: '#000000' },
                        polygon: { nb_sides: 5 },
                        image: { src: 'img/github.svg', width: 100, height: 100 },
                    },
                    opacity: {
                        value: opacity,
                        random: false,
                        anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
                    },
                    size: {
                        value: particleSize,
                        random: false,
                        anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
                    },
                    line_linked: {
                        enable: enableLines,
                        distance: lineDistance,
                        color: lineColor,
                        opacity: 1,
                        width: lineWidth,
                    },
                    move: {
                        enable: true,
                        speed: moveSpeed,
                        direction: 'none',
                        random: false,
                        straight: false,
                        out_mode: 'out',
                        bounce: false,
                        attract: { enable: false, rotateX: 600, rotateY: 1200 },
                    },
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: { enable: enableHover, mode: hoverMode },
                        onclick: { enable: enableClick, mode: clickMode },
                        resize: true,
                    },
                    modes: {
                        grab: { distance: 400, line_linked: { opacity: 1 } },
                        bubble: {
                            distance: 400,
                            size: 40,
                            duration: 2,
                            opacity: 8,
                            speed: 3,
                        },
                        repulse: { distance: 200, duration: 0.4 },
                        push: { particles_nb: 4 },
                        remove: { particles_nb: 2 },
                    },
                },
                retina_detect: true,
            };

            const finalConfig = customConfig
                ? { ...defaultConfig, ...customConfig }
                : defaultConfig;
            window.particlesJS(id, finalConfig);
        };

        const existingScript = document.getElementById(scriptId) as HTMLScriptElement;

        if (!existingScript) {
            const script = document.createElement('script');
            script.id = scriptId;
            script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
            script.addEventListener('load', initializeParticles);
            document.head.appendChild(script);
        } else {
            if (window.particlesJS) {
                initializeParticles();
            } else {
                existingScript.addEventListener('load', initializeParticles);
            }
        }

        return () => {
            const script = document.getElementById(scriptId) as HTMLScriptElement;
            if (script) {
                script.removeEventListener('load', initializeParticles);
            }
            const canvas = document.querySelector(`#${id} > .particles-js-canvas-el`);
            if (canvas && canvas.parentElement?.id === id) {
                canvas.remove();
            }
        };
    }, [
        id,
        particleCount,
        particleColor,
        lineColor,
        particleSize,
        moveSpeed,
        lineDistance,
        lineWidth,
        hoverMode,
        clickMode,
        shape,
        enableLines,
        enableHover,
        enableClick,
        opacity,
        customConfig,
    ]);

    return (
        <div
            ref={containerRef}
            id={id}
            className={`absolute inset-0 overflow-hidden ${className}`}
            style={{ backgroundColor, willChange: 'transform' }}
        />
    );
}

/* --------------------------------------------------
 * Page
 * -------------------------------------------------- */

function ParticlesPage() {
    const { t } = useTranslation();
    return (
        <MainLayout>
            <div className="w-full px-6 py-16">
                <PageTitle>Particles Background</PageTitle>
                <p className="max-w-xl text-white/60">
                    {t(
                        'An interactive particle background powered by particles.js. Fully customizable and easy to integrate.',
                    )}
                </p>

                <div className="mt-8 flex flex-col gap-10">
                    <PreviewTabs
                        title="Default"
                        codeText={defaultCode}
                        codeSandboxUrl="https://codepen.io/MichaelVanDenBerg/details/WpXGRm"
                    >
                        <div className="relative h-full w-full overflow-hidden rounded-lg">
                            <ParticlesBackground id="particles-1" />
                        </div>
                    </PreviewTabs>

                    <PreviewTabs
                        title="Starry Night"
                        codeText={starryNightCode}
                        codeSandboxUrl="https://codepen.io/MichaelVanDenBerg/details/WpXGRm"
                    >
                        <div className="relative h-full w-full overflow-hidden rounded-lg">
                            <ParticlesBackground
                                id="particles-2"
                                backgroundColor="#000000"
                                particleColor="#ffffff"
                                shape="star"
                                particleCount={100}
                                particleSize={3}
                                moveSpeed={1}
                                enableLines={false}
                                hoverMode="bubble"
                                clickMode="push"
                            />
                        </div>
                    </PreviewTabs>

                    <PreviewTabs
                        title="Bubble Effect"
                        codeText={bubbleCode}
                        codeSandboxUrl="https://codepen.io/MichaelVanDenBerg/details/WpXGRm"
                    >
                        <div className="relative h-full w-full overflow-hidden rounded-lg">
                            <ParticlesBackground
                                id="particles-3"
                                backgroundColor="#3a2a68"
                                particleColor="#ffffff"
                                lineColor="#ffffff"
                                hoverMode="bubble"
                                clickMode="bubble"
                                particleCount={50}
                                moveSpeed={2}
                            />
                        </div>
                    </PreviewTabs>
                </div>

                <UsageSection
                    description={`${t('This component wraps the particles.js library to create interactive backgrounds. It dynamically loads the library script.')}`}
                    code={componentCode}
                />

                <DocsSection
                    description={
                        <p>
                            {t(`Customize the particle system through a wide range of props, or provide
                            a complete custom configuration object for full control.`)}
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
        prop: 'id',
        type: 'string',
        defaultValue: 'particles-js',
        required: false,
        description: 'Unique ID for the container element.',
    },
    {
        prop: 'className',
        type: 'string',
        defaultValue: '""',
        required: false,
        description: 'Additional classes for the container.',
    },
    {
        prop: 'backgroundColor',
        type: 'string',
        defaultValue: '#1b2431',
        required: false,
        description: 'Background color of the canvas.',
    },
    {
        prop: 'particleCount',
        type: 'number',
        defaultValue: '80',
        required: false,
        description: 'Number of particles.',
    },
    {
        prop: 'particleColor',
        type: 'string',
        defaultValue: '#ff6e48',
        required: false,
        description: 'Color of the particles.',
    },
    {
        prop: 'lineColor',
        type: 'string',
        defaultValue: '#ff6e48',
        required: false,
        description: 'Color of the lines between particles.',
    },
    {
        prop: 'particleSize',
        type: 'number',
        defaultValue: '10',
        required: false,
        description: 'Base size of particles.',
    },
    {
        prop: 'moveSpeed',
        type: 'number',
        defaultValue: '6',
        required: false,
        description: 'Speed of particle movement.',
    },
    {
        prop: 'lineDistance',
        type: 'number',
        defaultValue: '150',
        required: false,
        description: 'Maximum distance for lines to be drawn.',
    },
    {
        prop: 'lineWidth',
        type: 'number',
        defaultValue: '3',
        required: false,
        description: 'Width of the lines.',
    },
    {
        prop: 'hoverMode',
        type: 'string',
        defaultValue: 'repulse',
        required: false,
        description: 'Interaction mode on hover.',
    },
    {
        prop: 'clickMode',
        type: 'string',
        defaultValue: 'push',
        required: false,
        description: 'Interaction mode on click.',
    },
    {
        prop: 'shape',
        type: 'string',
        defaultValue: 'circle',
        required: false,
        description: 'Shape of the particles.',
    },
    {
        prop: 'enableLines',
        type: 'boolean',
        defaultValue: 'true',
        required: false,
        description: 'Enable or disable lines between particles.',
    },
    {
        prop: 'enableHover',
        type: 'boolean',
        defaultValue: 'true',
        required: false,
        description: 'Enable or disable hover interactivity.',
    },
    {
        prop: 'enableClick',
        type: 'boolean',
        defaultValue: 'true',
        required: false,
        description: 'Enable or disable click interactivity.',
    },
    {
        prop: 'opacity',
        type: 'number',
        defaultValue: '1',
        required: false,
        description: 'Opacity of the particles.',
    },
    {
        prop: 'customConfig',
        type: 'object',
        defaultValue: 'null',
        required: false,
        description: 'A complete particles.js config object to override all other props.',
    },
];

const defaultCode = `import ParticlesBackground from "@/components/backgrounds/particles"; // Adjust import path

export default function Page() {
  return (
    <div className="relative h-screen w-full">
      <ParticlesBackground id="particles-1" />
    </div>
  );
}`;

const starryNightCode = `import ParticlesBackground from "@/components/backgrounds/particles"; // Adjust import path

export default function Page() {
  return (
    <div className="relative h-screen w-full">
      <ParticlesBackground
        id="particles-2"
        backgroundColor="#000000"
        particleColor="#ffffff"
        shape="star"
        particleCount={100}
        particleSize={3}
        moveSpeed={1}
        enableLines={false}
        hoverMode="bubble"
        clickMode="push"
      />
    </div>
  );
}`;

const bubbleCode = `import ParticlesBackground from "@/components/backgrounds/particles"; // Adjust import path

export default function Page() {
  return (
    <div className="relative h-screen w-full">
      <ParticlesBackground
        id="particles-3"
        backgroundColor="#3a2a68"
        particleColor="#ffffff"
        lineColor="#ffffff"
        hoverMode="bubble"
        clickMode="bubble"
        particleCount={50}
        moveSpeed={2}
      />
    </div>
  );
}`;

const componentCode = `import { useEffect, useRef } from 'react'
import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

declare global {
  interface Window {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      particlesJS: any;
  }
}

interface ParticleConfig {
  particles: {
      number: {
          value: number;
          density: {
              enable: boolean;
              value_area: number;
          };
      };
      color: {
          value: string;
      };
      shape: {
          type: string;
          stroke: {
              width: number;
              color: string;
          };
          polygon: {
              nb_sides: number;
          };
          image: {
              src: string;
              width: number;
              height: number;
          };
      };
      opacity: {
          value: number;
          random: boolean;
          anim: {
              enable: boolean;
              speed: number;
              opacity_min: number;
              sync: boolean;
          };
      };
      size: {
          value: number;
          random: boolean;
          anim: {
              enable: boolean;
              speed: number;
              size_min: number;
              sync: boolean;
          };
      };
      line_linked: {
          enable: boolean;
          distance: number;
          color: string;
          opacity: number;
          width: number;
      };
      move: {
          enable: boolean;
          speed: number;
          direction: string;
          random: boolean;
          straight: boolean;
          out_mode: string;
          bounce: boolean;
          attract: {
              enable: boolean;
              rotateX: number;
              rotateY: number;
          };
      };
  };
  interactivity: {
      detect_on: string;
      events: {
          onhover: {
              enable: boolean;
              mode: string;
          };
          onclick: {
              enable: boolean;
              mode: string;
          };
          resize: boolean;
      };
      modes: {
          grab: {
              distance: number;
              line_linked: {
                  opacity: number;
              };
          };
          bubble: {
              distance: number;
              size: number;
              duration: number;
              opacity: number;
              speed: number;
          };
          repulse: {
              distance: number;
              duration: number;
          };
          push: {
              particles_nb: number;
          };
          remove: {
              particles_nb: number;
          };
      };
  };
  retina_detect: boolean;
}

interface ParticlesBackgroundProps {
  id?: string;
  className?: string;
  backgroundColor?: string;
  particleCount?: number;
  particleColor?: string;
  lineColor?: string;
  particleSize?: number;
  moveSpeed?: number;
  lineDistance?: number;
  lineWidth?: number;
  hoverMode?: 'grab' | 'repulse' | 'bubble';
  clickMode?: 'push' | 'remove' | 'bubble' | 'repulse';
  shape?: 'circle' | 'edge' | 'triangle' | 'polygon' | 'star' | 'image';
  enableLines?: boolean;
  enableHover?: boolean;
  enableClick?: boolean;
  opacity?: number;
  customConfig?: Partial<ParticleConfig>;
}

export function ParticlesBackground({
  id = 'particles-js',
  className = '',
  backgroundColor = '#1b2431',
  particleCount = 80,
  particleColor = '#ff6e48',
  lineColor = '#ff6e48',
  particleSize = 10,
  moveSpeed = 6,
  lineDistance = 150,
  lineWidth = 3,
  hoverMode = 'repulse',
  clickMode = 'push',
  shape = 'circle',
  enableLines = true,
  enableHover = true,
  enableClick = true,
  opacity = 1,
  customConfig,
}: ParticlesBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
      const scriptId = 'particles-js-script';
      const initializeParticles = () => {
          if (!window.particlesJS) {
              return;
          }

          const defaultConfig: ParticleConfig = {
              particles: {
                  number: {
                      value: particleCount,
                      density: { enable: true, value_area: 800 },
                  },
                  color: { value: particleColor },
                  shape: {
                      type: shape,
                      stroke: { width: 0, color: '#000000' },
                      polygon: { nb_sides: 5 },
                      image: { src: 'img/github.svg', width: 100, height: 100 },
                  },
                  opacity: {
                      value: opacity,
                      random: false,
                      anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
                  },
                  size: {
                      value: particleSize,
                      random: false,
                      anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
                  },
                  line_linked: {
                      enable: enableLines,
                      distance: lineDistance,
                      color: lineColor,
                      opacity: 1,
                      width: lineWidth,
                  },
                  move: {
                      enable: true,
                      speed: moveSpeed,
                      direction: 'none',
                      random: false,
                      straight: false,
                      out_mode: 'out',
                      bounce: false,
                      attract: { enable: false, rotateX: 600, rotateY: 1200 },
                  },
              },
              interactivity: {
                  detect_on: 'canvas',
                  events: {
                      onhover: { enable: enableHover, mode: hoverMode },
                      onclick: { enable: enableClick, mode: clickMode },
                      resize: true,
                  },
                  modes: {
                      grab: { distance: 400, line_linked: { opacity: 1 } },
                      bubble: {
                          distance: 400,
                          size: 40,
                          duration: 2,
                          opacity: 8,
                          speed: 3,
                      },
                      repulse: { distance: 200, duration: 0.4 },
                      push: { particles_nb: 4 },
                      remove: { particles_nb: 2 },
                  },
              },
              retina_detect: true,
          };

          const finalConfig = customConfig
              ? { ...defaultConfig, ...customConfig }
              : defaultConfig;
          window.particlesJS(id, finalConfig);
      };

      const existingScript = document.getElementById(scriptId) as HTMLScriptElement;

      if (!existingScript) {
          const script = document.createElement('script');
          script.id = scriptId;
          script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
          script.addEventListener('load', initializeParticles);
          document.head.appendChild(script);
      } else {
          if (window.particlesJS) {
              initializeParticles();
          } else {
              existingScript.addEventListener('load', initializeParticles);
          }
      }

      return () => {
          const script = document.getElementById(scriptId) as HTMLScriptElement;
          if (script) {
              script.removeEventListener('load', initializeParticles);
          }
          const canvas = document.querySelector('#' + id + ' > .particles-js-canvas-el');
          if (canvas && canvas.parentElement?.id === id) {
              canvas.remove();
          }
      };
  }, [
      id,
      particleCount,
      particleColor,
      lineColor,
      particleSize,
      moveSpeed,
      lineDistance,
      lineWidth,
      hoverMode,
      clickMode,
      shape,
      enableLines,
      enableHover,
      enableClick,
      opacity,
      customConfig,
  ]);

  return (
      <div
          ref={containerRef}
          id={id}
          className={cn('absolute inset-0 overflow-hidden', className)}
          style={{ backgroundColor, willChange: 'transform' }}
      />
  );
}`;
