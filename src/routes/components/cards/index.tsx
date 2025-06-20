import { PreviewTabs } from '@/components/preview-tabs';
import PageTitle from '@/components/ui/page-title';
import { MainLayout } from '@/main-layout';
import { createFileRoute } from '@tanstack/react-router';
import LetterGlitch from '@/components/ui/letter-glitch';
import type { PropsTableRow } from '@/components/props-table';

export const Route = createFileRoute('/components/cards/')({
    component: CardsPage,
});

function CardsPage() {
    return (
        <MainLayout>
            <div className="px-6 py-16 w-full">
                <PageTitle>Cards</PageTitle>
                <p className="text-white/60 max-w-xl">
                    A card component with a canvas-based animated glitch effect background. It can wrap any content.
                </p>

                <div className="mt-8 flex flex-col gap-10 h-full">
                    <PreviewTabs title="Default Card" codeText={letterGlitchCode}>
                        <LetterGlitch className="h-full w-full rounded-lg p-4">
                            <h3 className="text-2xl font-bold text-white">Hello World</h3>
                            <p className="mt-2 text-white/70">This is a card with a glitch effect.</p>
                        </LetterGlitch>
                    </PreviewTabs>
                </div>
            </div>
        </MainLayout>
    );
}


const letterGlitchCode = `import LetterGlitch from '@/components/ui/letter-glitch';

<LetterGlitch className="h-48 w-full rounded-lg p-4">
  <h3 className="text-2xl font-bold text-white">Card Title</h3>
  <p className="text-white/70 mt-2">This is the content of the card.</p>
</LetterGlitch>
`;

const rows: PropsTableRow[] = [
    { prop: "className", type: "string", required: false, defaultValue: "undefined", description: "Custom classes for the main container." },
    { prop: "children", type: "React.ReactNode", required: false, defaultValue: "undefined", description: "Content to be displayed inside the card." },
    { prop: "glitchColors", type: "string[]", required: false, defaultValue: "['#2b4539', ...]", description: "Controls the colors of the letters rendered in the canvas." },
    { prop: "glitchSpeed", type: "number", required: false, defaultValue: "50", description: "Controls the speed at which letters scramble in the animation." },
    { prop: "centerVignette", type: "boolean", required: false, defaultValue: "false", description: "When true, renders a radial gradient in the center of the container." },
    { prop: "outerVignette", type: "boolean", required: false, defaultValue: "true", description: "When true, renders an inner radial gradient around the edges of the container." },
    { prop: "smooth", type: "boolean", required: false, defaultValue: "true", description: "When true, smoothens the animation of the letters for a more subtle feel." },
];
