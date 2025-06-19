import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Shuffle, Repeat, Heart, MoreHorizontal } from 'lucide-react';

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  audioFile: string;
  coverImage: string;
  genre: string;
  releaseDate: string;
  lyrics: string[];
  producer: string;
  composer: string[];
  lyricist: string[];
}

interface MusicPlayerProps {
  currentTrack: Track | null;
  playlist: Track[];
  isPlaying: boolean;
  onPlayPause: () => void;
  onTrackChange: (track: Track) => void;
  onShowLyrics: () => void;
  onCurrentTimeUpdate?: (time: number) => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  currentTrack,
  playlist,
  isPlaying,
  onPlayPause,
  onTrackChange,
  onShowLyrics,
  onCurrentTimeUpdate
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off');

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      if (onCurrentTimeUpdate) {
        onCurrentTimeUpdate(audio.currentTime);
      }
    };
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (repeatMode === 'one') {
        audio.currentTime = 0;
        audio.play();
      } else {
        handleNext();
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [repeatMode, onCurrentTimeUpdate]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = (parseFloat(e.target.value) / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value) / 100;
    setVolume(newVolume);
    setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const getCurrentTrackIndex = () => {
    return playlist.findIndex(track => track.id === currentTrack?.id);
  };

  const handlePrevious = () => {
    const currentIndex = getCurrentTrackIndex();
    if (currentIndex > 0) {
      onTrackChange(playlist[currentIndex - 1]);
    } else if (repeatMode === 'all') {
      onTrackChange(playlist[playlist.length - 1]);
    }
  };

  const handleNext = () => {
    const currentIndex = getCurrentTrackIndex();
    if (isShuffled) {
      const randomIndex = Math.floor(Math.random() * playlist.length);
      onTrackChange(playlist[randomIndex]);
    } else if (currentIndex < playlist.length - 1) {
      onTrackChange(playlist[currentIndex + 1]);
    } else if (repeatMode === 'all') {
      onTrackChange(playlist[0]);
    }
  };

  const toggleShuffle = () => {
    setIsShuffled(!isShuffled);
  };

  const toggleRepeat = () => {
    const modes: ('off' | 'all' | 'one')[] = ['off', 'all', 'one'];
    const currentIndex = modes.indexOf(repeatMode);
    setRepeatMode(modes[(currentIndex + 1) % modes.length]);
  };

  if (!currentTrack) {
    return null;
  }

  return (
    <div className="bg-black/95 backdrop-blur-xl border-t border-white/10 shadow-2xl">
      <audio
        ref={audioRef}
        src={currentTrack.audioFile}
        preload="metadata"
      />
      
      <div className="max-w-screen-2xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          
          {/* 왼쪽: 트랙 정보 */}
          <div className="flex items-center gap-4 min-w-0 flex-1">
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-white/10 shadow-lg flex-shrink-0">
              <img
                src={currentTrack.coverImage}
                alt={currentTrack.album}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTYiIGhlaWdodD0iNTYiIHZpZXdCb3g9IjAgMCA1NiA1NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiBmaWxsPSIjMTExODI3Ii8+CjxjaXJjbGUgY3g9IjI4IiBjeT0iMjgiIHI9IjE0IiBmaWxsPSIjNEI3NDhDIi8+CjxwYXRoIGQ9Ik0yMyAyOEwzMyAyM1YzM0wyMyAyOFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
                }}
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-white font-semibold text-sm truncate">
                {currentTrack.title}
              </h3>
              <p className="text-gray-400 text-sm truncate">
                {currentTrack.artist}
              </p>
            </div>
            <button className="text-gray-400 hover:text-white transition-colors p-1">
              <Heart size={16} />
            </button>
          </div>

          {/* 중앙: 플레이어 컨트롤 */}
          <div className="flex flex-col items-center gap-2 flex-1 max-w-md">
            {/* 컨트롤 버튼 */}
            <div className="flex items-center gap-4">
              <button
                onClick={toggleShuffle}
                className={`p-1 transition-colors ${
                  isShuffled ? 'text-green-400' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Shuffle size={16} />
              </button>

              <button
                onClick={handlePrevious}
                className="text-gray-300 hover:text-white transition-colors p-1"
                disabled={getCurrentTrackIndex() === 0 && repeatMode !== 'all'}
              >
                <SkipBack size={20} />
              </button>

              <button
                onClick={onPlayPause}
                className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
              </button>

              <button
                onClick={handleNext}
                className="text-gray-300 hover:text-white transition-colors p-1"
                disabled={getCurrentTrackIndex() === playlist.length - 1 && repeatMode !== 'all'}
              >
                <SkipForward size={20} />
              </button>

              <button
                onClick={toggleRepeat}
                className={`p-1 transition-colors relative ${
                  repeatMode !== 'off' ? 'text-green-400' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Repeat size={16} />
                {repeatMode === 'one' && (
                  <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                )}
              </button>
            </div>

            {/* 진행바 */}
            <div className="flex items-center gap-3 w-full max-w-sm">
              <span className="text-xs text-gray-400 font-mono w-10 text-right">
                {formatTime(currentTime)}
              </span>
              
              <div className="flex-1 group">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={duration ? (currentTime / duration) * 100 : 0}
                  onChange={handleSeek}
                  className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer group-hover:h-1.5 transition-all"
                  style={{
                    background: `linear-gradient(to right, #ffffff 0%, #ffffff ${duration ? (currentTime / duration) * 100 : 0}%, #4b5563 ${duration ? (currentTime / duration) * 100 : 0}%, #4b5563 100%)`
                  }}
                />
              </div>
              
              <span className="text-xs text-gray-400 font-mono w-10">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* 오른쪽: 볼륨 및 기타 */}
          <div className="flex items-center gap-3 min-w-0 flex-1 justify-end">
            <button
              onClick={onShowLyrics}
              className="text-gray-400 hover:text-white transition-colors text-xs px-3 py-1.5 rounded-full border border-gray-600 hover:border-gray-500"
            >
              가사
            </button>
            
            <button
              onClick={toggleMute}
              className="text-gray-400 hover:text-white transition-colors p-1"
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            
            <div className="w-20 hidden lg:block group">
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume * 100}
                onChange={handleVolumeChange}
                className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer group-hover:h-1.5 transition-all"
                style={{
                  background: `linear-gradient(to right, #ffffff 0%, #ffffff ${isMuted ? 0 : volume * 100}%, #4b5563 ${isMuted ? 0 : volume * 100}%, #4b5563 100%)`
                }}
              />
            </div>

            <button className="text-gray-400 hover:text-white transition-colors p-1">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer; 