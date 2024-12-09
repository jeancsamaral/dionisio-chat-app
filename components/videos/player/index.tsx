import React, { useRef, useEffect, useState, useCallback } from 'react';

interface PandaPlayer {
    new(id: string, options: {
        onReady: () => void;
        onError: (event: any) => void;
    }): {
        play: () => void;
        pause: () => void;
        seek: (seconds: number) => void;
        getCurrentTime: () => number;
        getDuration: () => number;
        onEvent: (callback: (event: { message: string }) => void) => void;
        destroy: () => void;
    };
}

declare global {
    interface Window {
        PandaPlayer: PandaPlayer;
    }
}

interface VideoPlayerProps {
    videoUrl: string | undefined;
    width: number;
    height: number;
    onWatchEvent: (percentage: number) => void;
    onReadyEvent: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
    videoUrl,
    width,
    height,
    onWatchEvent,
    onReadyEvent,
}) => {
    const videoRef = useRef<HTMLIFrameElement | null>(null);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [status, setStatus] = useState<string>('paused');
    const watchThreshold = 95; // Percentage to trigger watch event
    const reportedPercentages = new Set<number>(); // Track reported percentages
    const playerRef = useRef<any>(null);
    const [isPlayerInitialized, setIsPlayerInitialized] = useState(false); // Track initialization

    const handleContainerClick = useCallback(() => {
        if (!playerRef.current) return;
        
        if (status === 'playing') {
            playerRef.current.pause();
        } else {
            playerRef.current.play();
        }
    }, [status]);
    
    useEffect(() => {
        const loadPlayerScript = () => {
            return new Promise<void>((resolve, reject) => {
                const script = document.createElement('script');
                script.src = 'https://player.pandavideo.com.br/api.v2.js'; // Ensure the correct script URL
                script.async = true;
                script.onload = () => {
                    // Check if PandaPlayer is available
                    if (window.PandaPlayer) {
                        resolve();
                    } else {
                        reject(new Error('PandaPlayer not available'));
                    }
                };
                script.onerror = () => reject(new Error('Failed to load PandaPlayer script'));
                document.body.appendChild(script);
            });
        };

        loadPlayerScript().then(() => {
            if (videoRef.current) {
                playerRef.current = new window.PandaPlayer(videoRef.current.id, {
                    onReady: () => {
                        console.log('Player is ready');
                        onReadyEvent();
                        setIsPlayerInitialized(true);
                    
                        playerRef.current.onEvent(({ message }: { message: string }) => {
                            if (message === 'panda_pause') {
                                setStatus('paused');
                            } else if (message === 'panda_play') {
                                setStatus('playing');
                            }
                        });
                    
                        const checkInterval = setInterval(() => {
                            if (playerRef.current) {
                                const currentTime = playerRef.current.getCurrentTime();
                                const duration = playerRef.current.getDuration();
                                
                                if (duration > 0) {
                                    const percentage = (currentTime / duration) * 100;
                                    
                                    // Verifica se já atingiu o threshold e não foi reportado ainda
                                    if (percentage >= watchThreshold && !reportedPercentages.has(percentage)) {
                                        console.log(`Reporting watch event at ${percentage}%`);
                                        reportedPercentages.add(percentage);
                                        onWatchEvent(percentage);
                                    }
                                }
                            }
                        }, 1000);
                    
                        return () => {
                            clearInterval(checkInterval);
                        };
                    },
                    onError: (event) => {
                        console.log('Player onError', event);
                    }
                });
            }
        }).catch((error) => {
            console.error(error);
        });

        // return () => {
        //     // Only attempt to destroy if player has been initialized
        //     // if (isPlayerInitialized) {
        //     //     playerRef.current?.destroy();
        //     // }
        // };
    }, [onWatchEvent, isPlayerInitialized]); // Add isPlayerInitialized to the dependency array

    const playVideo = () => {
        playerRef.current?.play();
    };

    const pauseVideo = () => {
        playerRef.current?.pause();
    };

    const forwardVideo = () => {
        const currentTime = playerRef.current?.getCurrentTime();
        if (currentTime) {
            playerRef.current?.seek(currentTime + 5);
        }
    };

    const seekVideo = (seconds: number) => {
        playerRef.current?.seek(seconds);
    };

    const getCurrentTime = () => {
        return playerRef.current?.getCurrentTime();
    };

    return (
        <div 
            className="w-full aspect-w-16 aspect-h-9 rounded-lg overflow-hidden min-w-fit flex justify-center cursor-pointer"
            onClick={handleContainerClick}
        >
            <iframe
                id="panda-XXXX"
                src={videoUrl}
                style={{ border: 'none' }}
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen={true}
                width={width}
                height={height}
                className="mx-auto cursor-pointer"
                ref={videoRef}
            ></iframe>
        </div>
    );
};

export default VideoPlayer;