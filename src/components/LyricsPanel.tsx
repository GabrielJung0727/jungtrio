import React, { useState, useEffect, useRef } from 'react';
import { X, FileText, User, Music2 } from 'lucide-react';

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

interface LyricsPanelProps {
  track: Track | null;
  isOpen: boolean;
  onClose: () => void;
  currentTime?: number;
  isPlaying?: boolean;
}

const LyricsPanel: React.FC<LyricsPanelProps> = ({ 
  track, 
  isOpen, 
  onClose,
  currentTime = 0,
  isPlaying = false
}) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const lyricsContainerRef = useRef<HTMLDivElement>(null);
  const activeLyricRef = useRef<HTMLDivElement>(null);

  // 가사 타이밍 데이터 (실제로는 .lrc 파일이나 API에서 가져와야 함)
  const getLyricTimings = () => {
    if (!track) return [];
    
    // 간단한 예시 - 각 라인마다 4초씩 할당
    const lineInterval = 4; // 4초마다 다음 가사
    return track.lyrics.map((line, index) => ({
      time: index * lineInterval,
      text: line
    }));
  };

  useEffect(() => {
    if (!isPlaying || !track) return;

    const lyricTimings = getLyricTimings();
    const currentLyric = lyricTimings.find((lyric, index) => {
      const nextLyric = lyricTimings[index + 1];
      return currentTime >= lyric.time && (!nextLyric || currentTime < nextLyric.time);
    });

    if (currentLyric) {
      const newIndex = lyricTimings.indexOf(currentLyric);
      setCurrentLineIndex(newIndex);
    }
  }, [currentTime, isPlaying, track]);

  // 자동 스크롤
  useEffect(() => {
    if (activeLyricRef.current && lyricsContainerRef.current) {
      const container = lyricsContainerRef.current;
      const activeLyric = activeLyricRef.current;
      
      const containerHeight = container.clientHeight;
      const lyricTop = activeLyric.offsetTop;
      const lyricHeight = activeLyric.clientHeight;
      
      const scrollTop = lyricTop - containerHeight / 2 + lyricHeight / 2;
      
      container.scrollTo({
        top: scrollTop,
        behavior: 'smooth'
      });
    }
  }, [currentLineIndex]);

  if (!isOpen || !track) return null;

  const lyricTimings = getLyricTimings();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 배경 오버레이 */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* 가사 패널 */}
      <div className="relative bg-gradient-to-br from-gray-900/95 to-black/95 rounded-3xl shadow-2xl border border-white/10 backdrop-blur-xl max-w-3xl w-full max-h-[85vh] overflow-hidden">
        {/* 헤더 */}
        <div className="p-6 border-b border-white/10 bg-gradient-to-r from-white/5 to-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white/10 shadow-lg">
                <img
                  src={track.coverImage}
                  alt={track.album}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjMTExODI3Ii8+CjxjaXJjbGUgY3g9IjMyIiBjeT0iMzIiIHI9IjE2IiBmaWxsPSIjNEI3NDhDIi8+CjxwYXRoIGQ9Ik0yNiAzMkwzOCAyNlYzOEwyNiAzMloiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
                  }}
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <FileText size={24} className="text-blue-400" />
                  가사
                </h2>
                <p className="text-gray-300 text-lg">{track.title}</p>
                <p className="text-gray-400">{track.artist}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* 가사 내용 */}
        <div 
          ref={lyricsContainerRef}
          className="p-8 overflow-y-auto max-h-[60vh] scroll-smooth"
          style={{ scrollbarWidth: 'thin' }}
        >
          <div className="space-y-6 pb-32">
            {/* 트랙 정보 */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-3">
                  <Music2 size={18} className="text-blue-400" />
                  <div>
                    <span className="text-gray-400 block">프로듀서</span>
                    <span className="text-white font-medium">{track.producer}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Music2 size={18} className="text-green-400" />
                  <div>
                    <span className="text-gray-400 block">작곡</span>
                    <span className="text-white font-medium">{track.composer.join(', ')}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <User size={18} className="text-purple-400" />
                  <div>
                    <span className="text-gray-400 block">작사</span>
                    <span className="text-white font-medium">{track.lyricist.join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 가사 텍스트 */}
            <div className="space-y-8">
              {track.lyrics.map((line, index) => {
                const isActive = index === currentLineIndex;
                const isPassed = index < currentLineIndex;
                const isComing = index > currentLineIndex;
                
                if (line.trim() === '') {
                  return <div key={index} className="h-8"></div>;
                }
                
                if (line.startsWith('[') && line.endsWith(']')) {
                  return (
                    <div key={index} className="text-center py-4">
                      <span className={`
                        inline-block px-6 py-3 rounded-full font-semibold text-lg border-2 transition-all duration-500
                        ${isActive 
                          ? 'text-white bg-blue-500 border-blue-400 shadow-lg shadow-blue-500/25 scale-110' 
                          : isPassed 
                          ? 'text-blue-300 bg-blue-500/20 border-blue-400/50'
                          : 'text-gray-400 bg-white/5 border-white/20'
                        }
                      `}>
                        {line}
                      </span>
                    </div>
                  );
                }
                
                return (
                  <div
                    key={index}
                    ref={isActive ? activeLyricRef : null}
                    className={`
                      text-center py-3 px-4 rounded-2xl transition-all duration-700 cursor-default
                      ${isActive 
                        ? 'text-white text-3xl font-semibold bg-gradient-to-r from-white/10 to-white/5 border border-white/20 shadow-xl scale-105 transform' 
                        : isPassed 
                        ? 'text-gray-300 text-xl opacity-60 hover:opacity-80'
                        : 'text-gray-500 text-xl opacity-40 hover:opacity-60'
                      }
                    `}
                    style={{
                      filter: isActive ? 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))' : 'none'
                    }}
                  >
                    {line}
                  </div>
                );
              })}
            </div>

            {/* 저작권 정보 */}
            <div className="mt-12 pt-6 border-t border-white/10">
              <div className="text-center text-sm text-gray-500 space-y-1">
                <p>© {new Date(track.releaseDate).getFullYear()} {track.artist}</p>
                <p>모든 권리 보유</p>
              </div>
            </div>
          </div>
        </div>

        {/* 재생 상태 표시 */}
        {isPlaying && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-white text-sm font-medium">재생 중</span>
            </div>
          </div>
        )}

        {/* 배경 효과 */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-blue-500/5 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-purple-500/5 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default LyricsPanel; 