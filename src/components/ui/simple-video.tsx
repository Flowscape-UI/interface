import { cn } from '@/lib/utils';
import { Maximize, Pause, Play, Rewind, FastForward, RotateCcw } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

interface SimpleVideoProps {
    src: string;
    isPaused?: boolean;
    className?: string;
    controlsColor?: string;
}

export function SimpleVideo({ 
    src, 
    isPaused, 
    className, 
    controlsColor = 'from-black/70'
}: SimpleVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const clickTimeout = useRef<number | null>(null);
    const iconTimerRef = useRef<number | null>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isMouseOver, setIsMouseOver] = useState(false);
    const [isVideoEnded, setIsVideoEnded] = useState(false);
    const [showRewind, setShowRewind] = useState(false);
    const [showFastForward, setShowFastForward] = useState(false);
    const [buffered, setBuffered] = useState(0);
    const [isBuffering, setIsBuffering] = useState(false);
    const [centerIconType, setCenterIconType] = useState<'play' | 'pause'>('pause');
    const [isCenterIconVisible, setIsCenterIconVisible] = useState(false);

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
            if (iconTimerRef.current) clearTimeout(iconTimerRef.current);

            const isCurrentlyPaused = videoRef.current.paused || isVideoEnded;

            if (isCurrentlyPaused) {
                if(isVideoEnded) videoRef.current.currentTime = 0;
                videoRef.current.play();
                setIsPlaying(true);
                setIsVideoEnded(false);
                setCenterIconType('play');
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
                setCenterIconType('pause');
            }

            setIsCenterIconVisible(true);
            iconTimerRef.current = window.setTimeout(() => {
                setIsCenterIconVisible(false);
            }, 500);
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

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        if (videoRef.current) {
            const rect = e.currentTarget.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            videoRef.current.currentTime = pos * videoRef.current.duration;
        }
    };

    const handleProgress = () => {
        if (videoRef.current && videoRef.current.buffered.length > 0) {
            setBuffered(videoRef.current.buffered.end(videoRef.current.buffered.length - 1));
        }
    };

    const formatTime = (time: number) => {
        if (isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    const handleVideoClick = (e: React.MouseEvent<HTMLVideoElement>) => {
        if (clickTimeout.current) {
            clearTimeout(clickTimeout.current);
            clickTimeout.current = null;

            if (!videoRef.current) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const leftThird = rect.width / 3;
            const rightThird = (rect.width / 3) * 2;

            if (clickX < leftThird) {
                videoRef.current.currentTime -= 10;
                setShowRewind(true);
                setTimeout(() => setShowRewind(false), 500);
            } else if (clickX > rightThird) {
                videoRef.current.currentTime += 10;
                setShowFastForward(true);
                setTimeout(() => setShowFastForward(false), 500);
            }
        } else {
            clickTimeout.current = window.setTimeout(() => {
                togglePlayPause();
                clickTimeout.current = null;
            }, 250);
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
                className="w-full h-full hover:cursor-pointer"
                onTimeUpdate={handleTimeUpdate}
                onLoadedData={() => setDuration(videoRef.current?.duration || 0)}
                onEnded={handleVideoEnd}
                onClick={handleVideoClick}
                onWaiting={() => setIsBuffering(true)}
                onPlaying={() => setIsBuffering(false)}
                onProgress={handleProgress}
            />

            {isBuffering && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25 pointer-events-none">
                    <div className="w-12 h-12 border-4 border-white border-t-transparent border-solid rounded-full animate-spin"></div>
                </div>
            )}

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className={cn(
                    "bg-black bg-opacity-50 rounded-full p-4 transition-opacity duration-300",
                    isCenterIconVisible ? "opacity-100" : "opacity-0"
                )}>
                    {centerIconType === 'play' ? 
                        <Play className='text-white' size={48} /> : 
                        <Pause className='text-white' size={48} />
                    }
                </div>
            </div>

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
                    (isMouseOver || !isPlaying || isBuffering) ? 'opacity-100' : 'opacity-0'
                )}
            >
                 <div className="relative w-full h-1 cursor-pointer" onClick={handleSeek}>
                    <progress
                        className="absolute w-full h-1 [&::-webkit-progress-bar]:bg-gray-500 [&::-webkit-progress-value]:bg-gray-400 [&::-moz-progress-bar]:bg-gray-400"
                        value={buffered}
                        max={duration}
                    />
                    <progress
                        className="absolute w-full h-1 [&::-webkit-progress-bar]:bg-transparent [&::-webkit-progress-value]:bg-red-600 [&::-moz-progress-bar]:bg-red-600"
                        value={progress}
                        max={duration}
                    />
                </div>
                <div className="flex items-center justify-between text-white mt-2">
                    <div className="flex items-center gap-4">
                        <button onClick={togglePlayPause} className="focus:outline-none">
                            {isVideoEnded ? (
                                <RotateCcw size={24} className='hover:cursor-pointer'/>
                            ) : isPlaying ? (
                                <Pause size={24} className='hover:cursor-pointer'/>
                            ) : (
                                <Play size={24} className='hover:cursor-pointer'/>
                            )}
                        </button>
                        <span>
                            {formatTime(progress)} / {formatTime(duration)}
                        </span>
                    </div>
                    <button onClick={toggleFullScreen} className="focus:outline-none">
                        <Maximize size={24} className='hover:cursor-pointer'/>
                    </button>
                </div>
            </div>
        </div>
    );
}
