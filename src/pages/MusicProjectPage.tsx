import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import languages from '../i18n';
import MusicPlayer from '../components/MusicPlayer';
import LyricsPanel from '../components/LyricsPanel';
import musicData from '../data/music.json';
import { Music, Play, Clock, User } from 'lucide-react';

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

const MusicProjectPage: React.FC = () => {
  const { language } = useTheme();
  const text = languages[language];
  
  const [tracks] = useState<Track[]>(musicData as Track[]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  // 페이지 로드 시 첫 번째 트랙을 기본으로 선택
  useEffect(() => {
    if (tracks.length > 0 && !currentTrack) {
      setCurrentTrack(tracks[0]);
    }
  }, [tracks, currentTrack]);

  const handleTrackSelect = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleShowLyrics = () => {
    setShowLyrics(true);
  };

  const handleCloseLyrics = () => {
    setShowLyrics(false);
  };

  const handleTrackChange = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const handleCurrentTimeUpdate = (time: number) => {
    setCurrentTime(time);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-32 relative">
      {/* 동적 배경 */}
      <div className="absolute inset-0">
        {currentTrack && (
          <div className="absolute inset-0 opacity-20">
            <img 
              src={currentTrack.coverImage} 
              alt="" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black"></div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* 헤더 섹션 */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Music size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Music
              </h1>
              <p className="text-gray-400 text-lg">랑구의 음악 컬렉션</p>
            </div>
          </div>
        </div>

        {/* 메인 컨텐츠 */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* 현재 재생 섹션 */}
          <div className="lg:col-span-2">
            {currentTrack ? (
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10">
                <div className="text-center">
                  <div className="relative mb-6 group">
                    <div className="w-64 h-64 mx-auto rounded-2xl overflow-hidden shadow-2xl">
                      <img
                        src={currentTrack.coverImage}
                        alt={currentTrack.album}
                        className={`w-full h-full object-cover transition-all duration-700 ${
                          isPlaying ? 'scale-105' : 'scale-100'
                        }`}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiBmaWxsPSIjMTExODI3Ii8+CjxjaXJjbGUgY3g9IjEyOCIgY3k9IjEyOCIgcj0iNDAiIGZpbGw9IiM0Qjc0OEMiLz4KPHBhdGggZD0iTTExNiAxMjhMMTM2IDExNlYxNDBMMTE2IDEyOFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
                        }}
                      />
                    </div>
                    {/* 재생 버튼 오버레이 */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={handlePlayPause}
                        className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
                      >
                        {isPlaying ? (
                          <div className="w-6 h-6 flex gap-1">
                            <div className="w-2 bg-black"></div>
                            <div className="w-2 bg-black"></div>
                          </div>
                        ) : (
                          <Play size={24} className="text-black ml-1" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-white">
                      {currentTrack.title}
                    </h2>
                    <p className="text-lg text-gray-300">
                      {currentTrack.artist}
                    </p>
                    <p className="text-gray-400">
                      {currentTrack.album} • {currentTrack.genre}
                    </p>
                  </div>

                  {/* 트랙 정보 */}
                  <div className="mt-6 space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">재생시간</span>
                      <span className="text-white">{currentTrack.duration}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">프로듀서</span>
                      <span className="text-white">{currentTrack.producer}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">발매일</span>
                      <span className="text-white">
                        {new Date(currentTrack.releaseDate).toLocaleDateString('ko-KR')}
                      </span>
                    </div>
                  </div>

                  {/* 액션 버튼 */}
                  <div className="mt-8 flex gap-3">
                    <button
                      onClick={handleShowLyrics}
                      className="flex-1 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors"
                    >
                      가사 보기
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 text-center">
                <Music size={64} className="text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-400 mb-2">음악을 선택해주세요</h3>
                <p className="text-gray-500">재생할 트랙을 선택하면 여기에 표시됩니다</p>
              </div>
            )}
          </div>

          {/* 트랙 리스트 */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  <Music size={24} />
                  전체 트랙
                </h3>
                <p className="text-gray-400 mt-1">{tracks.length}곡</p>
              </div>
              
              <div className="divide-y divide-white/5">
                {tracks.map((track, index) => {
                  const isCurrentTrack = currentTrack?.id === track.id;
                  const isCurrentPlaying = isCurrentTrack && isPlaying;

                  return (
                    <div
                      key={track.id}
                      className={`p-4 hover:bg-white/5 transition-all duration-200 cursor-pointer group ${
                        isCurrentTrack ? 'bg-white/10' : ''
                      }`}
                      onClick={() => handleTrackSelect(track)}
                    >
                      <div className="flex items-center gap-4">
                        {/* 순서 / 재생 표시 */}
                        <div className="w-8 h-8 flex items-center justify-center">
                          {isCurrentPlaying ? (
                            <div className="flex space-x-1">
                              <div className="w-1 h-4 bg-green-500 animate-pulse"></div>
                              <div className="w-1 h-4 bg-green-500 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-1 h-4 bg-green-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                          ) : (
                            <>
                              <span className={`text-sm ${isCurrentTrack ? 'text-green-400' : 'text-gray-400 group-hover:hidden'}`}>
                                {(index + 1).toString().padStart(2, '0')}
                              </span>
                              <Play 
                                size={16} 
                                className={`${isCurrentTrack ? 'text-green-400' : 'text-white hidden group-hover:block'}`}
                              />
                            </>
                          )}
                        </div>

                        {/* 앨범 커버 */}
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/10">
                          <img
                            src={track.coverImage}
                            alt={track.album}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjMTExODI3Ii8+CjxjaXJjbGUgY3g9IjI0IiBjeT0iMjQiIHI9IjgiIGZpbGw9IiM0Qjc0OEMiLz4KPHBhdGggZD0iTTIwIDI0TDI4IDIwVjI4TDIwIDI0WiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K';
                            }}
                          />
                        </div>

                        {/* 트랙 정보 */}
                        <div className="flex-1 min-w-0">
                          <h4 className={`font-medium truncate ${isCurrentTrack ? 'text-green-400' : 'text-white'}`}>
                            {track.title}
                          </h4>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span>{track.artist}</span>
                            <span>•</span>
                            <span>{track.album}</span>
                          </div>
                        </div>

                        {/* 장르 */}
                        <div className="hidden md:block">
                          <span className="px-2 py-1 text-xs rounded-full bg-white/10 text-gray-300">
                            {track.genre}
                          </span>
                        </div>

                        {/* 재생시간 */}
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Clock size={14} />
                          <span>{track.duration}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 음악 플레이어 (하단 고정) */}
      <div className="fixed bottom-0 left-0 right-0 z-40">
        <MusicPlayer
          currentTrack={currentTrack}
          playlist={tracks}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onTrackChange={handleTrackChange}
          onShowLyrics={handleShowLyrics}
          onCurrentTimeUpdate={handleCurrentTimeUpdate}
        />
      </div>

      {/* 가사 패널 */}
      <LyricsPanel
        track={currentTrack}
        isOpen={showLyrics}
        onClose={handleCloseLyrics}
        currentTime={currentTime}
        isPlaying={isPlaying}
      />
    </div>
  );
};

export default MusicProjectPage; 