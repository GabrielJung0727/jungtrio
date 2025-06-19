import React, { useState } from 'react';
import { MapPin, Calendar, Users, DollarSign, Star, Clock, Eye, Heart } from 'lucide-react';

interface Travel {
  id: string;
  title: string;
  location: string;
  country: string;
  date: string;
  endDate: string;
  duration: string;
  status: 'completed' | 'planned';
  description: string;
  highlights: string[];
  images: string[];
  participants: string[];
  budget: number;
  rating: number;
  tags: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface TravelCardProps {
  travel: Travel;
  index: number;
}

const TravelCard: React.FC<TravelCardProps> = ({ travel, index }) => {
  const [imageError, setImageError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric'
    });
  };

  const formatBudget = (budget: number) => {
    return (budget / 10000).toFixed(0) + '만원';
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-500'}
      />
    ));
  };

  return (
    <div 
      className="group relative"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-white/20">
        
        {/* 이미지 영역 */}
        <div className="relative h-56 overflow-hidden">
          {!imageError && travel.images[0] ? (
            <img
              src={travel.images[0]}
              alt={travel.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
              <MapPin size={48} className="text-gray-600" />
            </div>
          )}
          
          {/* 그라데이션 오버레이 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          {/* 상태 배지 */}
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              travel.status === 'completed' 
                ? 'bg-green-500 text-white' 
                : 'bg-blue-500 text-white'
            }`}>
              {travel.status === 'completed' ? '완료' : '계획'}
            </span>
          </div>

          {/* 하트 버튼 */}
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="absolute top-4 left-4 p-2 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-colors"
          >
            <Heart 
              size={16} 
              className={isLiked ? 'fill-red-500 text-red-500' : 'text-white'} 
            />
          </button>
          
          {/* 제목과 위치 */}
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-bold text-white mb-1 drop-shadow-lg">{travel.title}</h3>
            <div className="flex items-center gap-2 text-white/90">
              <MapPin size={14} />
              <span className="text-sm">{travel.location}, {travel.country}</span>
            </div>
          </div>
        </div>

        {/* 콘텐츠 영역 */}
        <div className="p-5">
          {/* 날짜와 기간 */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar size={16} />
              <span className="text-sm">{formatDate(travel.date)}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Clock size={16} />
              <span className="text-sm">{travel.duration}</span>
            </div>
          </div>

          {/* 설명 */}
          <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-2">
            {travel.description}
          </p>

          {/* 참가자와 예산 */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-gray-400">
              <Users size={16} />
              <span className="text-sm">{travel.participants.length}명</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <DollarSign size={16} />
              <span className="text-sm">{formatBudget(travel.budget)}</span>
            </div>
          </div>

          {/* 평점 (완료된 여행만) */}
          {travel.status === 'completed' && (
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1">
                {renderStars(travel.rating)}
              </div>
              <span className="text-sm text-gray-400">{travel.rating}/5</span>
            </div>
          )}

          {/* 태그 */}
          <div className="flex flex-wrap gap-2 mb-4">
            {travel.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs rounded-md bg-white/10 text-gray-300 border border-white/20"
              >
                {tag}
              </span>
            ))}
            {travel.tags.length > 3 && (
              <span className="px-2 py-1 text-xs rounded-md bg-white/5 text-gray-400">
                +{travel.tags.length - 3}
              </span>
            )}
          </div>

          {/* 액션 버튼 */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full py-3 px-4 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Eye size={16} />
            {isExpanded ? '접기' : '자세히 보기'}
          </button>

          {/* 확장된 콘텐츠 */}
          {isExpanded && (
            <div className="mt-6 pt-4 border-t border-white/10 space-y-4">
              {/* 하이라이트 */}
              <div>
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Star className="text-yellow-400" size={16} />
                  여행 하이라이트
                </h4>
                <div className="space-y-2">
                  {travel.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 참가자 목록 */}
              <div>
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Users className="text-green-400" size={16} />
                  참가자
                </h4>
                <div className="flex flex-wrap gap-2">
                  {travel.participants.map((participant, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-sm rounded-full bg-white/10 text-white border border-white/20"
                    >
                      {participant}
                    </span>
                  ))}
                </div>
              </div>

              {/* 모든 태그 */}
              <div>
                <h4 className="text-white font-semibold mb-3">태그</h4>
                <div className="flex flex-wrap gap-2">
                  {travel.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs rounded-md bg-white/10 text-gray-300 border border-white/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 여행 상세 정보 */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">시작일</span>
                  <div className="text-white font-medium">{formatDate(travel.date)}</div>
                </div>
                <div>
                  <span className="text-gray-400">종료일</span>
                  <div className="text-white font-medium">{formatDate(travel.endDate)}</div>
                </div>
                <div>
                  <span className="text-gray-400">총 예산</span>
                  <div className="text-white font-medium">{formatBudget(travel.budget)}</div>
                </div>
                <div>
                  <span className="text-gray-400">기간</span>
                  <div className="text-white font-medium">{travel.duration}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TravelCard; 