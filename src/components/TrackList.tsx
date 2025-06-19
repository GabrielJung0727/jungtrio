import React from 'react';
import { Play, Music, Clock, User, Users } from 'lucide-react';

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

interface TrackListProps {
  tracks: Track[];
  currentTrack: Track | null;
  isPlaying: boolean;
  onTrackSelect: (track: Track) => void;
  onPlayPause: () => void;
}

const TrackList: React.FC<TrackListProps> = ({
  tracks,
  currentTrack,
  isPlaying,
  onTrackSelect,
  onPlayPause
}) => {
  const handleTrackClick = (track: Track) => {
    if (currentTrack?.id === track.id) {
      onPlayPause();
    } else {
      onTrackSelect(track);
    }
  };

  const getGenreColor = (genre: string) => {
    const colors: { [key: string]: string } = {
      'Pop': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      'Folk': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Ballad': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Rock': 'bg-red-500/20 text-red-400 border-red-500/30',
      'Electronic': 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    };
    return colors[genre] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden relative">
      <div className="p-6 border-b border-white/10 relative z-10">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <Music className="text-blue-400" size={28} />
          플레이리스트
        </h2>
        <p className="text-gray-400 mt-1">{tracks.length}개의 트랙</p>
      </div>

      <div className="divide-y divide-white/10 relative z-10">
        {tracks.map((track, index) => {
          const isCurrentTrack = currentTrack?.id === track.id;
          const isCurrentPlaying = isCurrentTrack && isPlaying;

          return (
            <div
              key={track.id}
              className={`p-4 hover:bg-white/10 transition-all duration-200 cursor-pointer group ${
                isCurrentTrack ? 'bg-white/5' : ''
              }`}
              onClick={() => handleTrackClick(track)}
            >
              <div className="flex items-center gap-4">
                {/* 트랙 번호 / 재생 버튼 */}
                <div className="w-8 h-8 flex items-center justify-center relative">
                  {isCurrentPlaying ? (
                    <div className="w-4 h-4 flex items-center justify-center">
                      <div className="flex space-x-1">
                        <div className="w-1 h-4 bg-green-500 animate-pulse"></div>
                        <div className="w-1 h-4 bg-green-500 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-1 h-4 bg-green-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      </div>
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
                <div className="w-12 h-12 bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={track.coverImage}
                    alt={track.album}
                    className="w-full h-full object-cover transition-all duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjMzc0MTUxIi8+CjxwYXRoIGQ9Ik0xNiAyNEMxNiAyMC42ODYzIDIwLjY4NjMgMTYgMjQgMTZDMjcuMzEzNyAxNiAzMiAyMC42ODYzIDMyIDI0QzMyIDI3LjMxMzcgMjcuMzEzNyAzMiAyNCAzMkMyMC42ODYzIDMyIDE2IDI3LjMxMzcgMTYgMjRaIiBmaWxsPSIjNkI3Mjg1Ii8+CjxwYXRoIGQ9Ik0yMiAyNEwyNyAyMVYyN0wyMiAyNFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
                    }}
                  />
                </div>

                {/* 트랙 정보 */}
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold truncate transition-all duration-300 ${isCurrentTrack ? 'text-green-400' : 'text-white'}`}>
                    {track.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>{track.artist}</span>
                    <span>•</span>
                    <span>{track.album}</span>
                  </div>
                </div>

                {/* 장르 */}
                <div className="hidden md:block">
                  <span className={`px-2 py-1 text-xs rounded-full border ${getGenreColor(track.genre)}`}>
                    {track.genre}
                  </span>
                </div>

                {/* 크레딧 정보 */}
                <div className="hidden lg:flex flex-col items-end text-xs text-gray-400 min-w-0 w-32">
                  <div className="flex items-center gap-1 truncate w-full justify-end">
                    <User size={12} />
                    <span className="truncate">{track.producer}</span>
                  </div>
                  <div className="flex items-center gap-1 truncate w-full justify-end">
                    <Users size={12} />
                    <span className="truncate">{track.composer.join(', ')}</span>
                  </div>
                </div>

                {/* 재생 시간 */}
                <div className="flex items-center gap-2 text-sm text-gray-400 min-w-0">
                  <Clock size={14} />
                  <span>{track.duration}</span>
                </div>
              </div>

              {/* 모바일에서 추가 정보 */}
              <div className="md:hidden mt-2 pt-2 border-t border-white/10">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center gap-4">
                    <span className={`px-2 py-1 rounded-full border ${getGenreColor(track.genre)}`}>
                      {track.genre}
                    </span>
                    <span>프로듀서: {track.producer}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {tracks.length === 0 && (
        <div className="p-12 text-center">
          <Music size={48} className="text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">아직 트랙이 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default TrackList; 