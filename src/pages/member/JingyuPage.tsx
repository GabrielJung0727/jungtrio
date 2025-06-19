import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Paintbrush, 
  Image, 
  Aperture,
  Sparkles,
  Star,
  Mail,
  ArrowLeft,
  Download,
  Award,
  TrendingUp,
  Eye,
  Zap,
  Instagram,
  Play
} from 'lucide-react';

const JingyuPage: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* 동적 배경 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/30 via-black to-red-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(249,115,22,0.15),transparent_50%)]"></div>
      </div>

      {/* 아티스틱 파티클 효과 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          >
            <div className={`w-1 h-1 rounded-full ${
              ['bg-orange-400/40', 'bg-red-400/40', 'bg-yellow-400/40', 'bg-pink-400/40'][Math.floor(Math.random() * 4)]
            }`}></div>
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={() => navigate('/whose')}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 border border-white/20"
          >
            <ArrowLeft size={20} />
            <span>팀으로 돌아가기</span>
          </button>

          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-xl transition-all duration-300">
              <Download size={18} />
              <span>작품집 다운로드</span>
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 border border-white/20">
              <Mail size={18} />
              <span>연락하기</span>
            </button>
          </div>
        </div>

        {/* 히어로 섹션 */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative inline-block mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl flex items-center justify-center shadow-2xl">
              <Paintbrush size={64} className="text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl font-black mb-4">
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              진규
            </span>
          </h1>
          <h2 className="text-3xl font-bold text-gray-300 mb-6">Visual Artist</h2>
          <p className="text-xl text-gray-400 leading-relaxed max-w-4xl mx-auto mb-8">
            "모든 순간은 예술이 될 수 있다"는 철학으로 일상 속에서 특별함을 발견하고, 
            그것을 시각적 언어로 표현하여 세상과 공유합니다.
          </p>

          {/* 소셜 링크 */}
                     <div className="flex justify-center gap-4 mb-12">
             <button className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 rounded-xl flex items-center justify-center transition-colors">
               <Instagram size={20} className="text-white" />
             </button>
             <button className="w-12 h-12 bg-red-600 hover:bg-red-700 rounded-xl flex items-center justify-center transition-colors">
               <Play size={20} className="text-white" />
             </button>
             <button className="w-12 h-12 bg-gray-600 hover:bg-gray-700 rounded-xl flex items-center justify-center transition-colors">
               <Mail size={20} className="text-white" />
             </button>
           </div>
        </div>

        {/* 아티스트 통계 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-2xl p-6 border border-orange-500/20 text-center">
            <Image className="text-orange-400 mb-3 mx-auto" size={32} />
            <div className="text-3xl font-bold text-white mb-1">500+</div>
            <div className="text-gray-400">작품</div>
          </div>
          <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-2xl p-6 border border-red-500/20 text-center">
            <Award className="text-red-400 mb-3 mx-auto" size={32} />
            <div className="text-3xl font-bold text-white mb-1">12</div>
            <div className="text-gray-400">수상</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 rounded-2xl p-6 border border-yellow-500/20 text-center">
            <Eye className="text-yellow-400 mb-3 mx-auto" size={32} />
            <div className="text-3xl font-bold text-white mb-1">2M+</div>
            <div className="text-gray-400">조회수</div>
          </div>
          <div className="bg-gradient-to-br from-pink-500/20 to-pink-600/10 rounded-2xl p-6 border border-pink-500/20 text-center">
            <Star className="text-pink-400 mb-3 mx-auto" size={32} />
            <div className="text-3xl font-bold text-white mb-1">4.9</div>
            <div className="text-gray-400">평점</div>
          </div>
        </div>

        {/* 전문 분야 */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">전문 분야</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 text-center">
              <Paintbrush className="text-orange-400 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-bold mb-3">디지털 아트</h3>
              <p className="text-gray-400">
                최신 디지털 도구를 활용한 일러스트레이션과 컨셉 아트를 전문으로 합니다.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 text-center">
              <Aperture className="text-red-400 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-bold mb-3">사진 & 영상</h3>
              <p className="text-gray-400">
                스토리텔링이 담긴 사진과 영상 컨텐츠로 감정을 전달합니다.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 text-center">
              <Image className="text-yellow-400 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-bold mb-3">비주얼 스토리텔링</h3>
              <p className="text-gray-400">
                복잡한 이야기를 직관적이고 아름다운 시각적 요소로 표현합니다.
              </p>
            </div>
          </div>
        </div>

        {/* 예술 철학 */}
        <div className="bg-gradient-to-r from-orange-500/10 via-red-500/10 to-yellow-500/10 rounded-3xl p-12 border border-white/10 mb-20">
          <h3 className="text-3xl font-bold text-center mb-8">예술 철학</h3>
          <div className="max-w-4xl mx-auto">
            <blockquote className="text-2xl font-light text-center italic text-gray-300 mb-8">
              "예술은 눈에 보이는 것을 재현하는 것이 아니라, 
              보이지 않는 것을 보이게 만드는 것입니다."
            </blockquote>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Sparkles className="text-orange-400" size={24} />
                  순간의 미학
                </h4>
                <p className="text-gray-400">
                  일상의 평범한 순간에서 특별한 아름다움을 발견하고, 
                  그것을 영원히 기록하여 다른 사람들과 공유합니다.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <TrendingUp className="text-red-400" size={24} />
                  혁신적 표현
                </h4>
                <p className="text-gray-400">
                  전통적인 예술 기법과 현대적인 디지털 기술을 결합하여 
                  새로운 형태의 시각적 표현을 탐구합니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA 섹션 */}
        <div className="text-center bg-gradient-to-r from-orange-500/20 via-red-500/20 to-yellow-500/20 rounded-3xl p-12 border border-white/10">
          <h3 className="text-3xl font-bold mb-4">함께 작품을 만들어보실래요?</h3>
          <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
            당신의 이야기를 예술로 표현하고 싶으시다면 언제든지 연락해주세요. 
            함께 특별한 작품을 창조해보겠습니다!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl font-semibold text-white hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              아트 프로젝트 문의
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl font-semibold text-white hover:bg-white/20 transition-all duration-300">
              작품집 보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JingyuPage;
