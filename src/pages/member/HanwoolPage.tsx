import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Palette, 
  Camera, 
  Brush,
  Layers,
  Star,
  Mail,
  ArrowLeft,
  Download,
  Briefcase,
  Heart,
  Eye,
  Zap,
  Instagram
} from 'lucide-react';

const HanwoolPage: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* 동적 배경 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-pink-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(168,85,247,0.15),transparent_50%)]"></div>
      </div>

      {/* 창의적 파티클 효과 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            <div className={`w-2 h-2 rounded-full ${
              ['bg-purple-400/30', 'bg-pink-400/30', 'bg-cyan-400/30', 'bg-orange-400/30'][Math.floor(Math.random() * 4)]
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
            <button className="flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-xl transition-all duration-300">
              <Download size={18} />
              <span>포트폴리오 다운로드</span>
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
            <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl">
              <Palette size={64} className="text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
              <Brush size={16} className="text-white" />
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl font-black mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              강한울
            </span>
          </h1>
          <h2 className="text-3xl font-bold text-gray-300 mb-6">Creative Director</h2>
          <p className="text-xl text-gray-400 leading-relaxed max-w-4xl mx-auto mb-8">
            "창의는 제한이 아닌 자유에서 나온다"는 믿음으로 시각적 스토리텔링을 통해 
            브랜드와 사용자 사이의 감정적 연결을 만들어갑니다.
          </p>

          {/* 소셜 링크 */}
                     <div className="flex justify-center gap-4 mb-12">
             <button className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl flex items-center justify-center transition-colors">
               <Instagram size={20} className="text-white" />
             </button>
             <button className="w-12 h-12 bg-red-600 hover:bg-red-700 rounded-xl flex items-center justify-center transition-colors">
               <Mail size={20} className="text-white" />
             </button>
           </div>
        </div>

        {/* 크리에이티브 통계 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-2xl p-6 border border-purple-500/20 text-center">
            <Camera className="text-purple-400 mb-3 mx-auto" size={32} />
            <div className="text-3xl font-bold text-white mb-1">100+</div>
            <div className="text-gray-400">프로젝트</div>
          </div>
          <div className="bg-gradient-to-br from-pink-500/20 to-pink-600/10 rounded-2xl p-6 border border-pink-500/20 text-center">
            <Heart className="text-pink-400 mb-3 mx-auto" size={32} />
            <div className="text-3xl font-bold text-white mb-1">50K+</div>
            <div className="text-gray-400">좋아요</div>
          </div>
          <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 rounded-2xl p-6 border border-cyan-500/20 text-center">
            <Eye className="text-cyan-400 mb-3 mx-auto" size={32} />
            <div className="text-3xl font-bold text-white mb-1">1M+</div>
            <div className="text-gray-400">조회수</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-2xl p-6 border border-orange-500/20 text-center">
            <Star className="text-orange-400 mb-3 mx-auto" size={32} />
            <div className="text-3xl font-bold text-white mb-1">4.8</div>
            <div className="text-gray-400">평점</div>
          </div>
        </div>

        {/* 전문 분야 */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">전문 분야</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 text-center">
              <Palette className="text-purple-400 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-bold mb-3">브랜드 디자인</h3>
              <p className="text-gray-400">
                브랜드 아이덴티티부터 시각적 언어까지, 일관성 있는 브랜드 경험을 설계합니다.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 text-center">
              <Camera className="text-pink-400 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-bold mb-3">시각 컨텐츠</h3>
              <p className="text-gray-400">
                사진, 영상, 그래픽 등 다양한 매체를 통한 창의적인 컨텐츠를 제작합니다.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 text-center">
              <Layers className="text-cyan-400 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-bold mb-3">UX/UI 디자인</h3>
              <p className="text-gray-400">
                사용자 중심의 인터페이스와 직관적인 사용자 경험을 디자인합니다.
              </p>
            </div>
          </div>
        </div>

        {/* 디자인 철학 */}
        <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 rounded-3xl p-12 border border-white/10 mb-20">
          <h3 className="text-3xl font-bold text-center mb-8">디자인 철학</h3>
          <div className="max-w-4xl mx-auto">
            <blockquote className="text-2xl font-light text-center italic text-gray-300 mb-8">
              "진정한 디자인은 보이는 것이 아니라 느끼는 것입니다. 
              사용자의 마음에 남는 경험을 만드는 것이 저의 목표입니다."
            </blockquote>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Heart className="text-purple-400" size={24} />
                  감성적 연결
                </h4>
                <p className="text-gray-400">
                  단순한 시각적 아름다움을 넘어서 사용자와 브랜드 사이의 
                  감정적 유대감을 형성하는 디자인을 추구합니다.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Zap className="text-pink-400" size={24} />
                  혁신적 접근
                </h4>
                <p className="text-gray-400">
                  기존의 틀을 벗어나 새로운 시각적 언어를 탐구하며, 
                  트렌드를 따르기보다는 새로운 트렌드를 만들어갑니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA 섹션 */}
        <div className="text-center bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 rounded-3xl p-12 border border-white/10">
          <h3 className="text-3xl font-bold mb-4">함께 창작해보실래요?</h3>
          <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
            브랜드의 이야기를 시각적으로 전달하고 싶으시다면 언제든지 연락해주세요. 
            함께 특별한 경험을 만들어보겠습니다!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold text-white hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              디자인 프로젝트 문의
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl font-semibold text-white hover:bg-white/20 transition-all duration-300">
              포트폴리오 보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HanwoolPage;
