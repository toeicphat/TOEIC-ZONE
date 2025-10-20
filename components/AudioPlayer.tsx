import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { PlayIcon, PauseIcon, VolumeUpIcon, VolumeOffIcon } from './icons';

interface AudioPlayerProps {
    audioScript?: string;
    audioSrc?: string;
}

const playbackRates = [0.5, 1.0, 1.25, 1.5, 2.0];

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioScript, audioSrc }) => {
    // Check if it's a Google Drive link first.
    const googleDriveInfo = useMemo(() => {
        if (!audioSrc) return null;
        const driveUrlRegex = /(?:drive\.google\.com\/(?:file\/d\/|uc\?id=))([\w-]+)/;
        const match = audioSrc.match(driveUrlRegex);
        let fileId = '';

        if (match && match[1]) {
            fileId = match[1];
        } else if (!audioSrc.includes('/') && !audioSrc.startsWith('http') && audioSrc.length > 20) {
            // Heuristic for a raw Google Drive ID
            fileId = audioSrc;
        }

        if (fileId) {
            return {
                isGoogleDrive: true,
                embedUrl: `https://drive.google.com/file/d/${fileId}/preview`
            };
        }
        return { isGoogleDrive: false, embedUrl: null };
    }, [audioSrc]);

    // If it's a Google Drive link, render an iframe and stop.
    if (googleDriveInfo?.isGoogleDrive) {
        return (
            <div className="w-full bg-slate-100 dark:bg-slate-900 rounded-lg p-4 shadow-inner">
                <iframe
                    src={googleDriveInfo.embedUrl}
                    width="100%"
                    height="120"
                    allow="autoplay"
                    className="border-0 rounded-md bg-white dark:bg-slate-800"
                    title="Google Drive Audio Player"
                ></iframe>
            </div>
        );
    }
    
    // --- The rest of the component logic is for native audio and TTS ---
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedVoiceURI, setSelectedVoiceURI] = useState<string | null>(null);
    const [playbackRate, setPlaybackRate] = useState(1.0);
    const [volume, setVolume] = useState(1.0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    
    const previousVolumeRef = useRef(1.0);
    const audioRef = useRef<HTMLAudioElement>(null);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
    const isPlayingRef = useRef(isPlaying);
    isPlayingRef.current = isPlaying;
    
    const finalAudioSrc = audioSrc; 

    // Effect for loading system voices and settings for TTS
    useEffect(() => {
        const loadVoicesAndSettings = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            if (availableVoices.length > 0) {
                setVoices(availableVoices);
                const savedVoiceURI = localStorage.getItem('tts-voice');
                const defaultVoice = availableVoices.find(v => v.default) || availableVoices[0];
                const initialVoice = availableVoices.find(v => v.voiceURI === savedVoiceURI) || defaultVoice;
                setSelectedVoiceURI(initialVoice?.voiceURI || null);
            }
            const savedRate = localStorage.getItem('tts-rate');
            if (savedRate) {
                setPlaybackRate(parseFloat(savedRate));
            }
        };

        window.speechSynthesis.addEventListener('voiceschanged', loadVoicesAndSettings);
        loadVoicesAndSettings();

        return () => {
            window.speechSynthesis.removeEventListener('voiceschanged', loadVoicesAndSettings);
        };
    }, []);

    // Effect for preparing the TTS utterance
    useEffect(() => {
        if (!audioScript) {
            window.speechSynthesis.cancel();
            utteranceRef.current = null;
            return;
        }

        const synth = window.speechSynthesis;
        const u = new SpeechSynthesisUtterance(audioScript);
        
        if (voices.length > 0) {
            const selectedVoice = voices.find(v => v.voiceURI === selectedVoiceURI);
            if (selectedVoice) u.voice = selectedVoice;
        }
        
        u.rate = playbackRate;
        u.onend = () => setIsPlaying(false);
        utteranceRef.current = u;

        if (isPlayingRef.current) {
            synth.cancel();
            synth.speak(u);
        }

        return () => {
            if (synth.speaking) synth.cancel();
        };
    }, [audioScript, selectedVoiceURI, voices, playbackRate]);
    
    // Effect to update audio element properties when state changes
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.playbackRate = playbackRate;
        audio.volume = volume;
    }, [playbackRate, volume]);

    // Effect for handling <audio> element events
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        setHasError(false);
        const onPlay = () => setIsPlaying(true);
        const onPause = () => setIsPlaying(false);
        const onEnded = () => setIsPlaying(false);
        const onError = () => {
            console.error("Error loading audio source:", audio.src, "Falling back to Text-to-Speech if available.");
            setIsPlaying(false);
            setHasError(true);
        };
        const onTimeUpdate = () => setCurrentTime(audio.currentTime);
        const onLoadedMetadata = () => setDuration(audio.duration);

        audio.addEventListener('play', onPlay);
        audio.addEventListener('pause', onPause);
        audio.addEventListener('ended', onEnded);
        audio.addEventListener('error', onError);
        audio.addEventListener('timeupdate', onTimeUpdate);
        audio.addEventListener('loadedmetadata', onLoadedMetadata);

        setIsPlaying(false);
        if (!audio.paused) audio.pause();
        audio.currentTime = 0;
        setCurrentTime(0);
        setDuration(0);

        return () => {
            audio.removeEventListener('play', onPlay);
            audio.removeEventListener('pause', onPause);
            audio.removeEventListener('ended', onEnded);
            audio.removeEventListener('error', onError);
            audio.removeEventListener('timeupdate', onTimeUpdate);
            audio.removeEventListener('loadedmetadata', onLoadedMetadata);
        };
    }, [finalAudioSrc]);
    
    // Global cleanup for unmount
    useEffect(() => {
        return () => {
            window.speechSynthesis.cancel();
            if (audioRef.current && !audioRef.current.paused) {
                audioRef.current.pause();
            }
        };
    }, []);

    const canUseAudioFile = finalAudioSrc && !hasError;

    const handlePlayPause = useCallback(() => {
        if (canUseAudioFile && audioRef.current) {
            if (isPlaying) audioRef.current.pause();
            else audioRef.current.play().catch(console.error);
        } else if (audioScript && utteranceRef.current) {
            const synth = window.speechSynthesis;
            if (isPlaying) {
                synth.cancel();
                setIsPlaying(false);
            } else {
                synth.cancel(); 
                synth.speak(utteranceRef.current);
                setIsPlaying(true);
            }
        }
    }, [isPlaying, canUseAudioFile, audioScript]);
    
    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            const newTime = Number(e.target.value);
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };
    
    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
    };

    const toggleMute = () => {
        if (volume > 0) {
            previousVolumeRef.current = volume;
            setVolume(0);
        } else {
            setVolume(previousVolumeRef.current);
        }
    };
    
    const handlePlaybackRateChange = (rate: number) => {
        setPlaybackRate(rate);
        localStorage.setItem('tts-rate', rate.toString());
    };

    const getHelperText = () => {
        if (hasError) return "Audio file failed. Using text-to-speech.";
        return "Listen to the text-to-speech audio.";
    };
  
    const formatTime = (timeInSeconds: number) => {
        if (isNaN(timeInSeconds) || timeInSeconds === Infinity) return '00:00';
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const handleVoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const uri = e.target.value;
        setSelectedVoiceURI(uri);
        localStorage.setItem('tts-voice', uri);
    };
    
    return (
        <div 
            className="w-full bg-[#1e1e1e] text-white rounded-xl shadow-lg p-4 font-sans border border-slate-700 space-y-3"
            aria-label="Audio Player"
        >
            {finalAudioSrc && <audio ref={audioRef} src={finalAudioSrc} hidden preload="metadata" />}
            
            <div className="flex items-center gap-4">
                <button 
                    onClick={handlePlayPause}
                    className="flex-shrink-0 bg-blue-600 text-white rounded-full h-12 w-12 flex items-center justify-center hover:bg-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
                    aria-label={isPlaying ? "Pause audio" : "Play audio"}
                >
                    {isPlaying ? <PauseIcon className="h-6 w-6" /> : <PlayIcon className="h-6 w-6" />}
                </button>
                
                <div className="flex-grow flex items-center gap-3">
                     {canUseAudioFile ? (
                        <>
                            <span className="text-sm font-mono text-slate-400 w-12 text-center" aria-hidden="true">{formatTime(currentTime)}</span>
                            <input
                                type="range"
                                min="0"
                                max={duration || 0}
                                value={currentTime}
                                onChange={handleSeek}
                                className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
                                aria-label="Audio progress bar"
                            />
                            <span className="text-sm font-mono text-slate-400 w-12 text-center" aria-hidden="true">{formatTime(duration)}</span>
                        </>
                    ) : (
                        <div className="text-slate-300">
                            <p className="font-semibold">{getHelperText()}</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-center justify-between gap-4">
                 <div className="flex items-center gap-2">
                    <button onClick={toggleMute} aria-label={volume > 0 ? "Mute" : "Unmute"} className="p-2 rounded-full hover:bg-slate-700 transition-colors">
                        {volume > 0 ? <VolumeUpIcon className="h-5 w-5 text-slate-300" /> : <VolumeOffIcon className="h-5 w-5 text-slate-400" />}
                    </button>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-24 h-1.5 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        aria-label="Volume control"
                    />
                 </div>
                 <div className="flex items-center gap-1 bg-slate-700 p-1 rounded-lg">
                    {playbackRates.map(rate => (
                        <button
                            key={rate}
                            onClick={() => handlePlaybackRateChange(rate)}
                            className={`px-2 py-1 text-xs font-semibold rounded-md transition-colors ${playbackRate === rate ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-600'}`}
                        >
                            {rate}x
                        </button>
                    ))}
                 </div>
            </div>

            {voices.length > 0 && (!finalAudioSrc || hasError) && (
                <div className="pt-3 border-t border-slate-700">
                    <label htmlFor="voice-select" className="block text-sm font-medium text-slate-400 mb-1">
                        Speech Voice
                    </label>
                    <select
                        id="voice-select"
                        value={selectedVoiceURI || ''}
                        onChange={handleVoiceChange}
                        className="w-full p-2 border border-slate-600 rounded-md bg-slate-700 text-sm text-white focus:ring-blue-500 focus:border-blue-500"
                    >
                        {voices.map((voice) => (
                            <option key={voice.voiceURI} value={voice.voiceURI}>
                                {voice.name} ({voice.lang})
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
};

export default AudioPlayer;
