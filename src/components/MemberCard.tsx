import React, { useState } from 'react';
import { Heart, RotateCcw } from 'lucide-react';
import MemberAvatar from './MemberAvatar';

interface Member {
  id: string;
  name: string;
  role: string;
  description: string;
  profileImage: string;
  interests: string[];
  favoriteColor: string;
  motto: string;
}

interface MemberCardProps {
  member: Member;
  index: number;
}

const MemberCard: React.FC<MemberCardProps> = ({ member, index }) => {
  const [imageError, setImageError] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div 
      className="group perspective-1000 h-96 w-full max-w-sm mx-auto"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div 
        className={`relative w-full h-full duration-700 preserve-3d cursor-pointer ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* 앞면 */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl shadow-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-gray-600 transition-all duration-300">
          <div className="relative h-full">
            {/* 프로필 이미지 영역 */}
            <div className="relative h-48 overflow-hidden">
              {!imageError && member.profileImage ? (
                <img
                  src={member.profileImage}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={handleImageError}
                />
              ) : (
                <div 
                  className="w-full h-full flex items-center justify-center relative"
                  style={{ 
                    background: `linear-gradient(135deg, ${member.favoriteColor}40 0%, ${member.favoriteColor}20 100%)`
                  }}
                >
                  <MemberAvatar
                    name={member.name}
                    imageUrl=""
                    favoriteColor={member.favoriteColor}
                    size="xl"
                    className="transform scale-150"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
                </div>
              )}
              
              {/* 그라데이션 오버레이 */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
              
              {/* 이름과 역할 */}
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-2xl font-bold drop-shadow-lg">{member.name}</h3>
                <p className="text-sm opacity-90">{member.role}</p>
              </div>

              {/* 플립 힌트 아이콘 */}
              <div className="absolute top-4 right-4 text-white/70 group-hover:text-white transition-colors">
                <RotateCcw size={20} />
              </div>
            </div>

            {/* 하단 정보 */}
            <div className="p-5 h-40 flex flex-col justify-between">
              <div className="flex items-center space-x-2 text-gray-300">
                <Heart size={16} style={{ color: member.favoriteColor }} />
                <span className="text-sm">클릭해서 더 알아보기</span>
              </div>
              
              <div>
                <div className="text-xs text-gray-400 mb-2">관심사</div>
                <div className="flex flex-wrap gap-1.5">
                  {member.interests.slice(0, 4).map((interest, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs rounded-full bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600 transition-colors"
                    >
                      {interest}
                    </span>
                  ))}
                  {member.interests.length > 4 && (
                    <span className="px-2.5 py-1 text-xs rounded-full bg-gray-600 text-gray-400">
                      +{member.interests.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 뒷면 */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl shadow-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700">
          <div className="h-full p-6 flex flex-col text-white relative">
            {/* 배경 패턴 */}
            <div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `radial-gradient(circle at 20% 80%, ${member.favoriteColor} 2px, transparent 2px)`,
                backgroundSize: '20px 20px'
              }}
            />

            {/* 헤더 */}
            <div className="text-center relative z-10 mb-4">
              <MemberAvatar
                name={member.name}
                imageUrl={member.profileImage}
                favoriteColor={member.favoriteColor}
                size="lg"
                className="mx-auto mb-2"
              />
              <h3 className="text-lg font-bold">{member.name}</h3>
              <p className="text-xs text-gray-300">{member.role}</p>
            </div>

            {/* 소개 */}
            <div className="flex-1 relative z-10 mb-4">
              <p className="text-sm text-gray-300 leading-relaxed text-center mb-3">
                {member.description}
              </p>
              
              {/* 좌우명 */}
              <div className="text-center">
                <blockquote 
                  className="text-xs italic font-medium"
                  style={{ color: member.favoriteColor }}
                >
                  "{member.motto}"
                </blockquote>
              </div>
            </div>

            {/* 관심사 */}
            <div className="relative z-10">
              <h4 className="text-sm font-semibold mb-3 text-gray-300 text-center">관심사</h4>
              <div className="flex flex-wrap gap-2 justify-center max-h-20 overflow-y-auto">
                {member.interests.map((interest, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 text-xs rounded-full whitespace-nowrap"
                    style={{ 
                      backgroundColor: `${member.favoriteColor}20`,
                      color: member.favoriteColor,
                      border: `1px solid ${member.favoriteColor}40`
                    }}
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* 플립 백 힌트 */}
            <div className="absolute top-4 right-4 text-white/50">
              <RotateCcw size={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberCard; 