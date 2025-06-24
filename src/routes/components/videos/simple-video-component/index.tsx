import PageTitle from '@/components/ui/page-title';
import { PreviewTabs } from '@/components/preview-tabs';
import { DocsSection } from '@/components/docs-section';
import type { PropsTableRow } from '@/components/props-table';
import { createFileRoute } from '@tanstack/react-router';
import { MainLayout } from '@/main-layout';
import { SimpleVideo } from '@/components/ui/simple-video';
import { UsageSection } from '@/components/usage-section';

export const Route = createFileRoute(
  '/components/videos/simple-video-component/',
)({
  component: SimpleVideoPageComponent,
});

function SimpleVideoPageComponent() {
    return (
        <MainLayout>
            <div className="px-6 py-16 w-full">
                <PageTitle>Simple Video Component</PageTitle>
                <p className="text-white/60 max-w-xl">
                    A simple, YouTube-like video player with essential controls and customizable panel colors.
                </p>

                <div className="mt-8 flex flex-col gap-10">
                    <PreviewTabs title="Default Player" codeText={videoPlayerCodeDefault}>
                        <SimpleVideo className='w-full h-full' src="https://archive.org/download/apple-september-2017-key-note-at-the-steve-jobs-theater-full-1080p-720p-30fps-h-264-128kbit-aac/Apple%20September%2C%202017%20Key%20Note%20at%20the%20Steve%20Jobs%20Theater%20Full%2C%201080p%20%28720p_30fps_H264-128kbit_AAC%29.mp4"  />
                    </PreviewTabs>

                    <PreviewTabs title="Player with Blue Controls" codeText={videoPlayerCodeBlue}>
                        <SimpleVideo 
                            className='w-full h-full' 
                            src="https://archive.org/download/apple-september-2017-key-note-at-the-steve-jobs-theater-full-1080p-720p-30fps-h-264-128kbit-aac/Apple%20September%2C%202017%20Key%20Note%20at%20the%20Steve%20Jobs%20Theater%20Full%2C%201080p%20%28720p_30fps_H264-128kbit_AAC%29.mp4" 
                        />
                    </PreviewTabs>

                     <PreviewTabs title="Player with Green Controls" codeText={videoPlayerCodeGreen}>
                        <SimpleVideo 
                            className='w-full h-full' 
                            src="https://archive.org/download/apple-september-2017-key-note-at-the-steve-jobs-theater-full-1080p-720p-30fps-h-264-128kbit-aac/Apple%20September%2C%202017%20Key%20Note%20at%20the%20Steve%20Jobs%20Theater%20Full%2C%201080p%20%28720p_30fps_H264-128kbit_AAC%29.mp4" 
                        />
                    </PreviewTabs>
                </div>

                <UsageSection
                    title="Component Code"
                    description="The source code for the SimpleVideo component."
                    code={simpleVideoComponentCode}
                />

                <DocsSection
                    description="The SimpleVideo component provides a clean and modern video playback experience with essential features and customizable controls."
                    rows={rows}
                />

            </div>
        </MainLayout>
    );
}

const rows: PropsTableRow[] = [
    {
        prop: 'src',
        type: 'string',
        required: true,
        description: 'The source URL of the video to be played.',
    },
    {
        prop: 'isPaused',
        type: 'boolean',
        required: false,
        description: 'Externally control the pause state of the video.',
    },
    {
        prop: 'className',
        type: 'string',
        required: false,
        description: 'Custom class for the video container.',
    },
];

const videoPlayerCodeDefault = `import { SimpleVideo } from '@/components/ui/simple-video';

export default function VideoExample() {
    return (
       <SimpleVideo className='w-full h-full' src="https://archive.org/download/apple-september-2017-key-note-at-the-steve-jobs-theater-full-1080p-720p-30fps-h-264-128kbit-aac/Apple%20September%2C%202017%20Key%20Note%20at%20the%20Steve%20Jobs%20Theater%20Full%2C%201080p%20%28720p_30fps_H264-128kbit_AAC%29.mp4" />
    );
}`;

const videoPlayerCodeBlue = `import { SimpleVideo } from '@/components/ui/simple-video';

export default function VideoExample() {
    return (
       <SimpleVideo 
            className='w-full h-full' 
            src="https://archive.org/download/apple-september-2017-key-note-at-the-steve-jobs-theater-full-1080p-720p-30fps-h-264-128kbit-aac/Apple%20September%2C%202017%20Key%20Note%20at%20the%20Steve%20Jobs%20Theater%20Full%2C%201080p%20%28720p_30fps_H264-128kbit_AAC%29.mp4"
       />
    );
}`;

const videoPlayerCodeGreen = `import { SimpleVideo } from '@/components/ui/simple-video';

export default function VideoExample() {
    return (
       <SimpleVideo 
            className='w-full h-full' 
            src="https://archive.org/download/apple-september-2017-key-note-at-the-steve-jobs-theater-full-1080p-720p-30fps-h-264-128kbit-aac/Apple%20September%2C%202017%20Key%20Note%20at%20the%20Steve%20Jobs%20Theater%20Full%2C%201080p%20%28720p_30fps_H264-128kbit_AAC%29.mp4"
       />
    );
}`;

const simpleVideoComponentCode = `import { cn } from '@/lib/utils';
import { Maximize, Pause, Play, Rewind, FastForward, RotateCcw } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

interface SimpleVideoProps {
    src: string;
    isPaused?: boolean;
    className?: string;
}

export function SimpleVideo({ 
    src, 
    isPaused, 
    className, 
}: SimpleVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isMouseOver, setIsMouseOver] = useState(false);
    const [isVideoEnded, setIsVideoEnded] = useState(false);
    const [showRewind, setShowRewind] = useState(false);
    const [showFastForward, setShowFastForward] = useState(false);

    useEffect(() => {
        if (isPaused) {
            videoRef.current?.pause();
            setIsPlaying(false);
        } else if (isPaused === false) {
            videoRef.current?.play();
            setIsPlaying(true);
        }
    }, [isPaused]);

    const handleVideoEnd = () => {
        setIsPlaying(false);
        setIsVideoEnded(true);
    };

    const togglePlayPause = () => {
        if (videoRef.current) {
            if (isVideoEnded) {
                videoRef.current.currentTime = 0;
                videoRef.current.play();
                setIsPlaying(true);
                setIsVideoEnded(false);
            } else if (videoRef.current.paused) {
                videoRef.current.play();
                setIsPlaying(true);
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            if (isVideoEnded && videoRef.current.currentTime < videoRef.current.duration) {
                setIsVideoEnded(false);
            }
            setProgress(videoRef.current.currentTime);
            setDuration(videoRef.current.duration);
        }
    };

    const handleSeek = (e: React.MouseEvent<HTMLProgressElement>) => {
        if (videoRef.current) {
            const rect = e.currentTarget.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            videoRef.current.currentTime = pos * videoRef.current.duration;
        }
    };

    const formatTime = (time: number) => {
        if (isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return \`\${minutes}:\${seconds < 10 ? '0' : ''}\${seconds}\`;
    };

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    const handleDoubleClick = (e: React.MouseEvent<HTMLVideoElement>) => {
        if (!videoRef.current) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;

        if (clickX < rect.width / 2) {
            videoRef.current.currentTime -= 10;
            setShowRewind(true);
            setTimeout(() => setShowRewind(false), 500);
        } else {
            videoRef.current.currentTime += 10;
            setShowFastForward(true);
            setTimeout(() => setShowFastForward(false), 500);
        }
    };

    return (
        <div
            ref={containerRef}
            className={cn('relative w-full aspect-video bg-black group', className)}
            onMouseEnter={() => setIsMouseOver(true)}
            onMouseLeave={() => setIsMouseOver(false)}
        >
            <video
                ref={videoRef}
                src={src}
                className="w-full h-full"
                onTimeUpdate={handleTimeUpdate}
                onLoadedData={() => setDuration(videoRef.current?.duration || 0)}
                onEnded={handleVideoEnd}
                onClick={togglePlayPause}
                onDoubleClick={handleDoubleClick}
            />

            <div className='absolute inset-0 flex items-center justify-between pointer-events-none'>
                <div className={cn('transition-opacity duration-300 opacity-0 ml-10', { 'opacity-100': showRewind })}>
                    <Rewind className='text-white' size={48} />
                </div>
                <div className={cn('transition-opacity duration-300 opacity-0 mr-10', { 'opacity-100': showFastForward })}>
                    <FastForward className='text-white' size={48} />
                </div>
            </div>

            <div
                className={cn(
                    'absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t to-transparent transition-opacity duration-300',
                    controlsColor,
                    isMouseOver || !isPlaying ? 'opacity-100' : 'opacity-0'
                )}
            >
                <progress
                    className="w-full h-1 [&::-webkit-progress-bar]:bg-gray-500 [&::-webkit-progress-value]:bg-red-600 [&::-moz-progress-bar]:bg-red-600 cursor-pointer"
                    value={progress}
                    max={duration}
                    onClick={handleSeek}
                />
                <div className="flex items-center justify-between text-white mt-2">
                    <div className="flex items-center gap-4">
                        <button onClick={togglePlayPause} className="focus:outline-none">
                            {isVideoEnded ? (
                                <RotateCcw size={24} />
                            ) : isPlaying ? (
                                <Pause size={24} />
                            ) : (
                                <Play size={24} />
                            )}
                        </button>
                        <span>
                            {formatTime(progress)} / {formatTime(duration)}
                        </span>
                    </div>
                    <button onClick={toggleFullScreen} className="focus:outline-none">
                        <Maximize size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
}`;