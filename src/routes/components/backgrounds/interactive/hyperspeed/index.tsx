import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { MainLayout } from '@/main-layout';
import PageTitle from '@/components/ui/page-title';
import { PreviewTabs } from '@/components/preview-tabs';
import { UsageSection } from '@/components/usage-section';
import { DocsSection } from '@/components/docs-section';
import type { PropsTableRow } from '@/components/props-table';
import Hyperspeed from './Hyperspeed';
import type { HyperspeedOptions } from './Hyperspeed';

export const Route = createFileRoute('/components/backgrounds/interactive/hyperspeed/')({
    component: HyperspeedPage,
});

const hyperspeedPresets: Record<string, Partial<HyperspeedOptions>> = {
    one: {
        distortion: 'turbulentDistortion',
        length: 400,
        roadWidth: 10,
        islandWidth: 2,
        lanesPerRoad: 3,
        fov: 90,
        fovSpeedUp: 150,
        speedUp: 2,
        carLightsFade: 0.4,
        totalSideLightSticks: 20,
        lightPairsPerRoadWay: 40,
        shoulderLinesWidthPercentage: 0.05,
        brokenLinesWidthPercentage: 0.1,
        brokenLinesLengthPercentage: 0.5,
        lightStickWidth: [0.12, 0.5],
        lightStickHeight: [1.3, 1.7],
        movingAwaySpeed: [60, 80],
        movingCloserSpeed: [-120, -160],
        carLightsLength: [400 * 0.03, 400 * 0.2],
        carLightsRadius: [0.05, 0.14],
        carWidthPercentage: [0.3, 0.5],
        carShiftX: [-0.8, 0.8],
        carFloorSeparation: [0, 5],
        colors: {
          roadColor: 0x080808,
          islandColor: 0x0a0a0a,
          background: 0x000000,
          shoulderLines: 0x131318,
          brokenLines: 0x131318,
          leftCars: [0xD856BF, 0x6750A2, 0xC247AC],
          rightCars: [0x03B3C3, 0x0E5EA5, 0x324555],
          sticks: 0x03B3C3,
        }
      },
      two: {
        distortion: 'mountainDistortion',
        length: 400,
        roadWidth: 9,
        islandWidth: 2,
        lanesPerRoad: 3,
        fov: 90,
        fovSpeedUp: 150,
        speedUp: 2,
        carLightsFade: 0.4,
        totalSideLightSticks: 50,
        lightPairsPerRoadWay: 50,
        shoulderLinesWidthPercentage: 0.05,
        brokenLinesWidthPercentage: 0.1,
        brokenLinesLengthPercentage: 0.5,
        lightStickWidth: [0.12, 0.5],
        lightStickHeight: [1.3, 1.7],
    
        movingAwaySpeed: [60, 80],
        movingCloserSpeed: [-120, -160],
        carLightsLength: [400 * 0.05, 400 * 0.15],
        carLightsRadius: [0.05, 0.14],
        carWidthPercentage: [0.3, 0.5],
        carShiftX: [-0.2, 0.2],
        carFloorSeparation: [0.05, 1],
        colors: {
          roadColor: 0x080808,
          islandColor: 0x0a0a0a,
          background: 0x000000,
          shoulderLines: 0x131318,
          brokenLines: 0x131318,
          leftCars: [0xff102a, 0xEB383E, 0xff102a],
          rightCars: [0xdadafa, 0xBEBAE3, 0x8F97E4],
          sticks: 0xdadafa,
        }
      },
      three: {
        distortion: 'xyDistortion',
        length: 400,
        roadWidth: 9,
        islandWidth: 2,
        lanesPerRoad: 3,
        fov: 90,
        fovSpeedUp: 150,
        speedUp: 3,
        carLightsFade: 0.4,
        totalSideLightSticks: 50,
        lightPairsPerRoadWay: 30,
        shoulderLinesWidthPercentage: 0.05,
        brokenLinesWidthPercentage: 0.1,
        brokenLinesLengthPercentage: 0.5,
        lightStickWidth: [0.02, 0.05],
        lightStickHeight: [0.3, 0.7],
        movingAwaySpeed: [20, 50],
        movingCloserSpeed: [-150, -230],
        carLightsLength: [400 * 0.05, 400 * 0.2],
        carLightsRadius: [0.03, 0.08],
        carWidthPercentage: [0.1, 0.5],
        carShiftX: [-0.5, 0.5],
        carFloorSeparation: [0, 0.1],
        colors: {
          roadColor: 0x080808,
          islandColor: 0x0a0a0a,
          background: 0x000000,
          shoulderLines: 0x131318,
          brokenLines: 0x131318,
          leftCars: [0x7D0D1B, 0xA90519, 0xff102a],
          rightCars: [0xF1EECE, 0xE6E2B1, 0xDFD98A],
          sticks: 0xF1EECE,
        }
      },
};

function HyperspeedPage() {
    return (
        <MainLayout>
            <div className="w-full px-6 py-16">
                <PageTitle>Hyperspeed Background</PageTitle>
                <p className="max-w-xl text-white/60">
                    A highly customizable hyperspeed travel effect using Three.js.
                </p>

                <div className="mt-8 flex flex-col gap-10">
                    <PreviewTabs title="Default" codeText={defaultCode}>
                        <div className="relative h-full w-full overflow-hidden rounded-lg bg-black">
                            <Hyperspeed />
                        </div>
                    </PreviewTabs>

                    <PreviewTabs title="Preset 1" codeText={preset1Code}>
                        <div className="relative h-full w-full overflow-hidden rounded-lg bg-black">
                            <Hyperspeed effectOptions={hyperspeedPresets.one} />
                        </div>
                    </PreviewTabs>

                    <PreviewTabs title="Preset 2" codeText={preset2Code}>
                        <div className="relative h-full w-full overflow-hidden rounded-lg bg-black">
                            <Hyperspeed effectOptions={hyperspeedPresets.two} />
                        </div>
                    </PreviewTabs>

                    <PreviewTabs title="Preset 3" codeText={preset3Code}>
                        <div className="relative h-full w-full overflow-hidden rounded-lg bg-black">
                            <Hyperspeed effectOptions={hyperspeedPresets.three} />
                        </div>
                    </PreviewTabs>
                </div>

                <UsageSection
                    description="This component uses Three.js to create an interactive hyperspeed effect."
                    code={defaultCode}
                />

                <DocsSection
                    description={
                        <p>
                            The main prop is `effectOptions`, an object that allows for deep
                            customization of the animation.
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
        prop: 'effectOptions',
        type: 'object',
        defaultValue: 'See the "code" tab for default values and presets.',
        required: false,
        description:
            'The highly customizable configuration object for the effect, controls things like colors, distortion, line properties, etc.',
    },
];

const defaultCode = `import Hyperspeed from "@/components/backgrounds/Hyperspeed";

export default function Page() {
  return (
    <div className="relative h-screen w-full bg-black">
      <Hyperspeed />
    </div>
  );
}`;

const preset1Code = `import Hyperspeed from "@/components/backgrounds/Hyperspeed";
import { hyperspeedPresets } from "@/components/backgrounds/hyperspeed-presets";

export default function Page() {
  return (
    <div className="relative h-screen w-full bg-black">
      <Hyperspeed effectOptions={hyperspeedPresets.one} />
    </div>
  );
}`;
const preset2Code = `import Hyperspeed from "@/components/backgrounds/Hyperspeed";
import { hyperspeedPresets } from "@/components/backgrounds/hyperspeed-presets";

export default function Page() {
  return (
    <div className="relative h-screen w-full bg-black">
      <Hyperspeed effectOptions={hyperspeedPresets.two} />
    </div>
  );
}`;
const preset3Code = `import Hyperspeed from "@/components/backgrounds/Hyperspeed";
import { hyperspeedPresets } from "@/components/backgrounds/hyperspeed-presets";

export default function Page() {
  return (
    <div className="relative h-screen w-full bg-black">
      <Hyperspeed effectOptions={hyperspeedPresets.three} />
    </div>
  );
}`; 