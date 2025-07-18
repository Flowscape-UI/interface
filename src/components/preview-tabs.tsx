import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { HiDesktopComputer } from 'react-icons/hi';
import { IoTerminal } from 'react-icons/io5';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { CopyButton } from './copy-button';
import { SiCodesandbox, SiReact } from 'react-icons/si';
import { useTranslation } from '@/hooks/use-translation';

interface PreviewTabsProps {
    title?: string;
    description?: string;
    codeText?: string;
    children: React.ReactNode;
    codeSandboxUrl?: string;
    v0Url?: string;
    reactBitsUrl?: string;
}

export function PreviewTabs({
    codeText = '',
    title,
    description,
    children,
    codeSandboxUrl,
    v0Url,
    reactBitsUrl,
}: PreviewTabsProps) {
    const { t } = useTranslation();
    return (
        <Tabs defaultValue="preview" className="mx-auto mt-3 w-full max-w-[740px]">
            <div className="space-y-1">
                <h2 className="text-2xl font-bold" data-toc>
                    {title}
                </h2>
                {description && <p className="text-sm text-gray-400">{t(description)}</p>}
            </div>

            <TabsList className="grid h-full w-full grid-cols-2 border-2 bg-black">
                <TabsTrigger value="preview" className="flex items-center gap-2">
                    <HiDesktopComputer /> {t('Preview')}
                </TabsTrigger>
                <TabsTrigger value="code" className="flex items-center gap-2">
                    <IoTerminal /> {t('Code')}
                </TabsTrigger>
            </TabsList>

            {/* PREVIEW */}
            <TabsContent value="preview">
                <Card className="relative aspect-square w-full p-0">
                    <CardHeader className="absolute top-6 right-9 z-50">
                        <div className="flex flex-col items-center gap-4">
                            <CopyButton copyText={codeText} />
                            {codeSandboxUrl && (
                                <a
                                    href={codeSandboxUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-background/70 cursor-pointer rounded-md border-2 p-2 shadow-xl shadow-black backdrop-blur transition hover:bg-white/5"
                                >
                                    <SiCodesandbox className="h-4 w-4 text-white/50" />
                                </a>
                            )}
                            {v0Url && (
                                <a
                                    href={v0Url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-background/70 cursor-pointer rounded-md border-2 p-2 shadow-xl shadow-black backdrop-blur transition hover:bg-white/5"
                                >
                                    <svg
                                        className="h-4 w-4 text-white/50"
                                        fill="currentColor"
                                        viewBox="0 0 40 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                    >
                                        <path d="M23.3919 0H32.9188C36.7819 0 39.9136 3.13165 39.9136 6.99475V16.0805H36.0006V6.99475C36.0006 6.90167 35.9969 6.80925 35.9898 6.71766L26.4628 16.079C26.4949 16.08 26.5272 16.0805 26.5595 16.0805H36.0006V19.7762H26.5595C22.6964 19.7762 19.4788 16.6139 19.4788 12.7508V3.68923H23.3919V12.7508C23.3919 12.9253 23.4054 13.0977 23.4316 13.2668L33.1682 3.6995C33.0861 3.6927 33.003 3.68923 32.9188 3.68923H23.3919V0Z"></path>
                                        <path d="M13.7688 19.0956L0 3.68759H5.53933L13.6231 12.7337V3.68759H17.7535V17.5746C17.7535 19.6705 15.1654 20.6584 13.7688 19.0956Z"></path>
                                    </svg>
                                </a>
                            )}
                            {reactBitsUrl && (
                                <a
                                    href={reactBitsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-background/70 cursor-pointer rounded-md border-2 p-2 shadow-xl shadow-black backdrop-blur transition hover:bg-white/5"
                                >
                                    <SiReact className="h-4 w-4 text-white/50" />
                                </a>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="relative z-40 flex min-h-0 w-full min-w-0 grow flex-col items-center justify-center overflow-hidden rounded-xl p-0">
                        {children}
                    </CardContent>
                </Card>
            </TabsContent>

            {/* CODE */}
            <TabsContent value="code">
                <Card className="aspect-video max-h-[500px] w-full overflow-hidden overflow-y-auto">
                    <CardContent className="relative">
                        <div className="absolute right-6">
                            <CopyButton copyText={codeText} />
                        </div>
                        <SyntaxHighlighter
                            language={'tsx'}
                            style={atomDark}
                            customStyle={{
                                margin: 0,
                                padding: 0,
                                background: 'transparent',
                                fontSize: '0.875rem',
                            }}
                            wrapLines={true}
                            PreTag="div"
                        >
                            {String(codeText)}
                        </SyntaxHighlighter>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    );
}
