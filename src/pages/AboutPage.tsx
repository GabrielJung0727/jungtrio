import React from 'react';
import { useTheme } from '../context/ThemeContext';
import languages from '../i18n';
import MemberCard from '../components/MemberCard';
import membersData from '../data/members.json';
import { Music, MapPin, Users, Heart } from 'lucide-react';

const AboutPage: React.FC = () => {
  const { language } = useTheme();
  // const text = languages[language]; // 향후 다국어 지원 시 사용

  return (
    <div className="min-h-screen text-white pt-24 px-6 page-transition relative overflow-hidden">
      {/* 깔끔한 배경 그라데이션 */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* 심플한 헤더 */}
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            About 랑구
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            중랑구에서 시작된 네 명의 이야기
          </p>
        </div>
        
        <div className="space-y-20">
          {/* 소개 섹션 */}
          <section className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-8 text-white">
              우리는 누구인가요?
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <p className="text-lg leading-relaxed text-gray-200 mb-6">
                  랑구는 중랑구에서 만난 네 명의 친구들이 만든 특별한 공간입니다. 
                  우리는 함께 음악을 만들고, 여행을 떠나며, 일상의 소중한 순간들을 공유합니다.
                </p>
                <p className="text-lg leading-relaxed text-gray-200">
                  이 웹사이트는 우리의 추억과 경험을 기록하고, 
                  서로의 일상을 더 가깝게 나누기 위해 만들어졌습니다.
                </p>
              </div>
            </div>
          </section>
          
          {/* 멤버 소개 */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-white flex items-center justify-center gap-3">
                <Users className="text-blue-400" size={36} />
                멤버들
              </h2>
              <p className="text-gray-300 text-lg">클릭해서 더 자세한 정보를 확인해보세요</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
              {membersData.map((member, index) => (
                <div key={member.id} className="w-full max-w-xs">
                  <MemberCard member={member} index={index} />
                </div>
              ))}
            </div>
          </section>
          
          {/* 우리의 활동 */}
          <section className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-8 text-white">
              우리가 하는 일
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <p className="text-lg leading-relaxed text-gray-200">
                  랑구는 음악을 통해 감정을 표현하고, 여행을 통해 새로운 경험을 쌓으며, 
                  일상의 소소한 순간들을 소중히 여기는 친구들의 모임입니다. 
                  이 웹사이트에서 우리의 음악 프로젝트와 여행 기록, 
                  그리고 다양한 추억들을 만나보실 수 있습니다.
                </p>
              </div>
            </div>
          </section>
          
          {/* 카테고리 소개 */}
          <section className="text-center">
            <h2 className="text-4xl font-bold mb-12 text-white">
              둘러보기
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                <Music className="text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform" size={48} />
                <h3 className="font-bold mb-4 text-xl text-white">음악</h3>
                <p className="text-gray-300">
                  우리가 함께 만든 음악과 프로젝트들을 감상해보세요
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                <MapPin className="text-green-400 mx-auto mb-4 group-hover:scale-110 transition-transform" size={48} />
                <h3 className="font-bold mb-4 text-xl text-white">여행</h3>
                <p className="text-gray-300">
                  함께 떠난 여행의 추억과 사진들을 공유합니다
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                <Heart className="text-red-400 mx-auto mb-4 group-hover:scale-110 transition-transform" size={48} />
                <h3 className="font-bold mb-4 text-xl text-white">일상</h3>
                <p className="text-gray-300">
                  평범하지만 특별한 우리의 일상 이야기들
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 