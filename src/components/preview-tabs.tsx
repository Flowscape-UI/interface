"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { HiDesktopComputer } from "react-icons/hi";
import { IoTerminal } from "react-icons/io5";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { CopyButton } from "./copy-button";

export function PreviewTabs({
    codeText = "",
    title,
    children
}: {
    title?: string,
    codeText?: string,
    children: React.ReactNode,
}) {
    return (
        <Tabs defaultValue="preview" className="mx-auto w-full max-w-[740px] mt-3">
            <h2 className="text-2xl font-bold" data-toc>{title}</h2>

            <TabsList className="grid h-full w-full grid-cols-2 border-2 bg-black">
                <TabsTrigger value="preview" className="flex items-center gap-2">
                    <HiDesktopComputer /> Preview
                </TabsTrigger>
                <TabsTrigger value="code" className="flex items-center gap-2">
                    <IoTerminal /> Code
                </TabsTrigger>
            </TabsList>

            {/* PREVIEW */}
            <TabsContent value="preview">
                <Card className="w-full aspect-square relative p-0">
                    <CardHeader className="absolute top-6 right-9 z-50">
                        <CopyButton copyText={codeText} />
                    </CardHeader>
                    <CardContent className="flex items-center justify-center h-full relative z-40 p-0 overflow-hidden rounded-xl">
                        {children}
                        <div
                            className="absolute inset-0 bg-black mask-[radial-gradient(600px_circle_at_center,transparent,black)] pointer-events-none"
                        />
                    </CardContent>
                </Card>
            </TabsContent>

            {/* CODE */}
            <TabsContent value="code">
                <Card className="w-full aspect-video max-h-[500px] overflow-hidden overflow-y-auto">
                    
                    <CardContent className="relative">
                        <div className="absolute right-8">
                            <CopyButton copyText={codeText} />
                        </div>
                        <SyntaxHighlighter
                            language={'tsx'}
                            style={atomDark}
                            customStyle={{
                                margin: 0,
                                padding: 0,
                                background: "transparent",
                                fontSize: "0.875rem",
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