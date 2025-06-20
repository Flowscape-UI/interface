import { createFileRoute } from '@tanstack/react-router';
import { MainLayout } from '@/main-layout';
import PageTitle from '@/components/ui/page-title';
import { PreviewTabs } from '@/components/preview-tabs';
import { UsageSection } from '@/components/usage-section';
import { DocsSection } from '@/components/docs-section';
import type { PropsTableRow } from '@/components/props-table';
import Iridescence from './Iridescence';

export const Route = createFileRoute('/components/backgrounds/interactive/iridescence/')({
    component: IridescencePage,
});

function IridescencePage() {
    return (
        <MainLayout>
            <div className="w-full px-6 py-16">
                <PageTitle>Iridescence Background</PageTitle>
                <p className="max-w-xl text-white/60">
                    A WebGL-based iridescent shader effect that reacts to mouse movement.
                </p>

                <div className="mt-8 flex flex-col gap-10">
                    <PreviewTabs title="Default" codeText={defaultCode}>
                        <div className="relative h-full w-full overflow-hidden rounded-lg bg-black">
                            <Iridescence />
                        </div>
                    </PreviewTabs>

                    <PreviewTabs title="Blue color" codeText={blueCode}>
                        <div className="relative h-full w-full overflow-hidden rounded-lg bg-black">
                            <Iridescence color={[0.1, 0.3, 1.0]} />
                        </div>
                    </PreviewTabs>

                    <PreviewTabs title="No mouse interaction" codeText={noMouseCode}>
                        <div className="relative h-full w-full overflow-hidden rounded-lg bg-black">
                            <Iridescence mouseReact={false} />
                        </div>
                    </PreviewTabs>

                    <PreviewTabs title="Slower and less reactive" codeText={slowCode}>
                        <div className="relative h-full w-full overflow-hidden rounded-lg bg-black">
                            <Iridescence speed={0.5} amplitude={0.05} />
                        </div>
                    </PreviewTabs>
                </div>

                <UsageSection
                    description="This component uses a WebGL shader to create a dynamic, colorful, and interactive background."
                    code={defaultCode}
                />

                <DocsSection
                    description={
                        <p>
                            The effect is rendered on a `canvas` element and can be customized
                            through various props to change its color, speed, and interactivity.
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