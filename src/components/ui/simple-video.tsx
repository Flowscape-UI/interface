import { cn } from '@/lib/utils';
import { Maximize, Pause, Play, Rewind, FastForward, RotateCcw, Volume1, Volume2, VolumeX } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

interface SimpleVideoProps {
    src: string;
    isPaused?: boolean;
    className?: string;
}

export function SimpleVideo({ 
    src, 
    isPaused, 
    className
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

    const [isCenterIconVisible, setIsCenterIconVisible] = useState(false);
    const inactivityTimerRef = useRef<number | null>(null);
    const progressContainerRef = useRef<HTMLDivElement>(null);
    const [isScrubbing, setIsScrubbing] = useState(false);
    const [hoverTime, setHoverTime] = useState<number | null>(null);
    const [hoverPosition, setHoverPosition] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);

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
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
            }

            setIsCenterIconVisible(true);
            iconTimerRef.current = window.setTimeout(() => {
                setIsCenterIconVisible(false);
            }, 500);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current && !isScrubbing) {
            if (isVideoEnded && videoRef.current.currentTime < videoRef.current.duration) {
                setIsVideoEnded(false);
            }
            setProgress(videoRef.current.currentTime);
            setDuration(videoRef.current.duration);
        }
    };

    const handleScrubStart = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!videoRef.current || !progressContainerRef.current) return;
        
        const rect = progressContainerRef.current.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        const clampedPos = Math.max(0, Math.min(1, pos));
        const newTime = clampedPos * duration;

        videoRef.current.currentTime = newTime;
        setProgress(newTime);
        setIsScrubbing(true);
    };

    const handleProgress = () => {
        if (videoRef.current && videoRef.current.buffered.length > 0) {
            setBuffered(videoRef.current.buffered.end(videoRef.current.buffered.length - 1));
        }
    };

    const formatTime = (seconds: number) => {
        if (isNaN(seconds) || seconds < 0) return "0:00";

        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);

        const secsStr = secs < 10 ? `0${secs}` : `${secs}`;
        const minsStr = minutes < 10 ? `0${minutes}` : `${minutes}`;

        if (hours > 0) {
            return `${hours}:${minsStr}:${secsStr}`;
        }
        return `${minutes}:${secsStr}`;
    };

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    const handleProgressMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        const clampedPos = Math.max(0, Math.min(1, pos));
        setHoverPosition(clampedPos);
        setHoverTime(clampedPos * duration);
    };

    const handleProgressMouseLeave = () => {
        setHoverTime(null);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
        if (videoRef.current) {
            videoRef.current.volume = newVolume;
            videoRef.current.muted = newVolume === 0;
        }
    };

    const toggleMute = () => {
        const newMutedState = !isMuted;
        setIsMuted(newMutedState);
        if (videoRef.current) {
            videoRef.current.muted = newMutedState;
        }
        if (!newMutedState && volume === 0) {
            const defaultVolume = 0.5;
            setVolume(defaultVolume);
            if (videoRef.current) {
                videoRef.current.volume = defaultVolume;
            }
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

    useEffect(() => {
        const container = containerRef.current;

        const resetInactivityTimer = () => {
            if (inactivityTimerRef.current) {
                clearTimeout(inactivityTimerRef.current);
            }
            inactivityTimerRef.current = window.setTimeout(() => {
                setIsMouseOver(false);
            }, 3000);
        };

        const handleActivity = () => {
            setIsMouseOver(true);
            resetInactivityTimer();
        };

        const handleMouseLeave = () => {
            setIsMouseOver(false);
        };

        if (container) {
            container.addEventListener('mousemove', handleActivity);
            container.addEventListener('mouseleave', handleMouseLeave);
            handleActivity();
        }

        return () => {
            if (container) {
                container.removeEventListener('mousemove', handleActivity);
                container.removeEventListener('mouseleave', handleMouseLeave);
            }
            if (inactivityTimerRef.current) {
                clearTimeout(inactivityTimerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const handleScrubMove = (e: MouseEvent) => {
            if (!videoRef.current || !progressContainerRef.current) return;
            
            const rect = progressContainerRef.current.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            const clampedPos = Math.max(0, Math.min(1, pos));
            const newTime = clampedPos * duration;
            
            videoRef.current.currentTime = newTime;
            setProgress(newTime);
        };

        const handleScrubEnd = () => {
            setIsScrubbing(false);
        };

        if (isScrubbing) {
            window.addEventListener('mousemove', handleScrubMove);
            window.addEventListener('mouseup', handleScrubEnd);
        }

        return () => {
            window.removeEventListener('mousemove', handleScrubMove);
            window.removeEventListener('mouseup', handleScrubEnd);
        };
    }, [isScrubbing, duration]);

    return (
        <div
            ref={containerRef}
            className={cn(
                'relative w-full aspect-video bg-black group',
                !(isMouseOver || isBuffering || isVideoEnded) && 'cursor-none',
                className
            )}
        >
            <video
                ref={videoRef}
                src={src}
                className="w-full h-full object-cover"
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
                    ((isMouseOver || isCenterIconVisible) && !isBuffering) ? "opacity-100" : "opacity-0"
                )}>
                    {isPlaying ? 
                        <Pause className='text-white h-9 w-9 sm:h-12 sm:w-12' /> : 
                        <Play className='text-white h-9 w-9 sm:h-12 sm:w-12' />
                    }
                </div>
            </div>

            <div className="absolute inset-y-0 left-0 flex items-center justify-center w-1/3 pointer-events-none">
                <div className={cn(
                    "flex items-center gap-2 text-white bg-black/50 rounded-full p-1 sm:p-2 transition-opacity duration-300",
                    showRewind ? "opacity-100" : "opacity-0"
                )}>
                    <Rewind className="h-6 w-6 sm:h-8 sm:w-8" />
                    <span className="text-sm sm:text-lg font-semibold">-10s</span>
                </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center justify-center w-1/3 pointer-events-none">
                <div className={cn(
                    "flex items-center gap-2 text-white bg-black/50 rounded-full p-1 sm:p-2 transition-opacity duration-300",
                    showFastForward ? "opacity-100" : "opacity-0"
                )}>
                    <span className="text-sm sm:text-lg font-semibold">+10s</span>
                    <FastForward className="h-6 w-6 sm:h-8 sm:w-8" />
                </div>
            </div>

            <div
                className={cn(
                    'absolute bottom-0 left-0 right-0 p-2 sm:p-4 transition-opacity duration-300',
                    (isMouseOver || isBuffering || isVideoEnded) ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                )}
            >
                <div 
                    ref={progressContainerRef}
                    className="relative w-full h-1 group/progress cursor-pointer transition-all duration-200 hover:h-1.5"
                    onMouseDown={handleScrubStart}
                    onMouseMove={handleProgressMouseMove}
                    onMouseLeave={handleProgressMouseLeave}
                >
                    {hoverTime !== null && (
                        <div
                            className="absolute bottom-5 transform -translate-x-1/2 bg-black bg-opacity-80 text-white text-xs rounded py-1 px-2 pointer-events-none"
                            style={{ left: `${hoverPosition * 100}%` }}
                        >
                            {formatTime(hoverTime)}
                        </div>
                    )}
                    <div className="absolute top-0 left-0 w-full h-full bg-gray-500/50 rounded-full">
                        <div 
                            className="h-full bg-gray-200/50 rounded-full"
                            style={{ width: `${(buffered / duration) * 100}%` }}
                        ></div>
                    </div>
                    <div 
                        className="absolute top-0 left-0 h-full bg-red-600 rounded-full"
                        style={{ width: `${(progress / duration) * 100}%` }}
                    >
                    </div>
                    <div
                        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-red-600 rounded-full transform -translate-x-1/2 pointer-events-none"
                        style={{ left: `${(progress / duration) * 100}%` }}
                    ></div>
                </div>
                <div className="flex items-center justify-between text-white mt-2 text-xs sm:text-sm">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <button onClick={togglePlayPause} className="focus:outline-none cursor-pointer">
                            {isVideoEnded ? (
                                <RotateCcw className='h-5 w-5 sm:h-6 sm:w-6'/>
                            ) : isPlaying ? (
                                <Pause className='h-5 w-5 sm:h-6 sm:w-6'/>
                            ) : (
                                <Play className='h-5 w-5 sm:h-6 sm:w-6'/>
                            )}
                        </button>
                        <div className="flex items-center gap-1 sm:gap-2 group/volume">
                            <button onClick={toggleMute} className="focus:outline-none cursor-pointer">
                                {isMuted || volume === 0 ? (
                                    <VolumeX className="h-5 w-5 sm:h-6 sm:w-6" />
                                ) : volume < 0.5 ? (
                                    <Volume1 className="h-5 w-5 sm:h-6 sm:w-6" />
                                ) : (
                                    <Volume2 className="h-5 w-5 sm:h-6 sm:w-6" />
                                )}
                            </button>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.05"
                                value={isMuted ? 0 : volume}
                                onChange={handleVolumeChange}
                                className="w-0 opacity-0 h-1.5 bg-white/80 rounded-lg appearance-none cursor-pointer transition-all duration-300 group-hover/volume:w-12 group-hover/volume:sm:w-16 group-hover/volume:opacity-100 accent-red-600"
                            />
                        </div>
                        <span className="w-24 sm:w-auto">
                            {formatTime(progress)} / {formatTime(duration)}
                        </span>
                    </div>
                    <button onClick={toggleFullScreen} className="focus:outline-none cursor-pointer">
                        <Maximize className='h-5 w-5 sm:h-6 sm:w-6'/>
                    </button>
                </div>
            </div>
        </div>
    );
}
