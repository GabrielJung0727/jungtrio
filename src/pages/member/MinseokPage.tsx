import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Music2, 
  Award,
  Star,
  Mail,
  Phone,
  Linkedin,
  ArrowLeft,
  Download,
  Play,
  Pause,
  Volume2,
  Users,
  TrendingUp,
  Calendar,
  MapPin,
  Crown,
  Headphones,
  Mic,
  Globe,
  Clock,
  Wine,
  Piano,
  FileMusic,
  ExternalLink
} from 'lucide-react';

// SoundCloud Widget API 타입 정의
declare global {
  interface Window {
    SC: any;
  }
}

const MinseokPage: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [activeTrack, setActiveTrack] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [soundCloudLoaded, setSoundCloudLoaded] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    // SoundCloud Widget API 로드
    const script = document.createElement('script');
    script.src = 'https://w.soundcloud.com/player/api.js';
    script.onload = () => setSoundCloudLoaded(true);
    document.body.appendChild(script);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.removeChild(script);
    };
  }, []);

  // 호텔 경영 준비 과정
  const hotelPreparation = [
    {
      period: "2024 - Present",
      title: "Swiss Hotel Management School 입학 준비",
      subtitle: "Hospitality Management 전공",
      description: "2025년 1월 스위스 유학을 목표로 호텔 경영학 전공 준비 중이며, 국제적인 호스피탈리티 전문가가 되기 위해 다양한 사전 학습과 경험을 쌓고 있습니다.",
      activities: ["호텔업계 인턴십 경험", "영어/독일어 어학 준비", "호스피탈리티 이론 학습", "업계 네트워킹"]
    },
    {
      period: "2023 - 2024",
      title: "호텔업계 탐구 및 실무 경험",
      subtitle: "Field Experience & Research",
      description: "국내 다양한 호텔에서 단기 인턴십과 현장 체험을 통해 실무를 익히고, 호텔 경영에 대한 깊은 이해를 쌓았습니다.",
      activities: ["5성급 호텔 인턴십", "고객 서비스 실습", "호텔 운영 시스템 학습", "업계 멘토링"]
    }
  ];

  // 실제 사운드클라우드 트랙들 (예시 - 실제 링크로 교체 필요)
  const soundCloudTracks = [
    {
      title: "Study Night",
      subtitle: "깊은 밤 공부할 때 듣는 음악",
      genre: "Lo-fi / Study Beat",
      duration: "4:23",
      year: "2024",
      description: "유학 준비로 늦은 밤까지 공부할 때 집중력을 높여주는 차분한 비트",
      mood: "study",
      // 실제 사운드클라우드 트랙 URL (예시)
      soundcloudUrl: "https://soundcloud.com/minseok-jung/study-night",
      embedId: "track1"
    },
    {
      title: "Swiss Dreams",
      subtitle: "스위스에 대한 꿈과 설렘",
      genre: "Ambient / Electronic",
      duration: "5:12",
      year: "2024",
      description: "스위스 유학에 대한 기대와 새로운 도전에 대한 설렘을 담은 곡",
      mood: "dreamy",
      soundcloudUrl: "https://soundcloud.com/minseok-jung/swiss-dreams",
      embedId: "track2"
    },
    {
      title: "Afternoon Coffee",
      subtitle: "여유로운 오후 시간",
      genre: "Acoustic / Chill",
      duration: "3:45",
      year: "2023",
      description: "친구들과 카페에서 보내는 평범하고 소중한 일상의 순간들",
      mood: "cozy",
      soundcloudUrl: "https://soundcloud.com/minseok-jung/afternoon-coffee",
      embedId: "track3"
    }
  ];

  const getMoodColor = (mood: string) => {
    switch(mood) {
      case 'study': return 'from-blue-400 to-indigo-600';
      case 'dreamy': return 'from-purple-400 to-pink-600';
      case 'cozy': return 'from-amber-400 to-orange-600';
      default: return 'from-gray-400 to-slate-600';
    }
  };

  // SoundCloud 트랙 재생/정지 핸들러
  const handleTrackPlay = (index: number, embedId: string) => {
    if (activeTrack === index) {
      setActiveTrack(null);
      // 정지 로직
    } else {
      setActiveTrack(index);
      // 재생 로직
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-black text-white relative">
      {/* 고급스러운 배경 패턴 */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M30 30c0-11.046 8.954-20 20-20s20 8.954 20 20-8.954 20-20 20-20-8.954-20-20zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* 동적 배경 요소들 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-amber-500/10 to-orange-500/5 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        ></div>
        <div 
          className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-violet-500/10 to-purple-500/5 rounded-full blur-3xl"
          style={{ transform: `translateY(${-scrollY * 0.3}px)` }}
        ></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-16">
          <button
            onClick={() => navigate('/whose')}
            className="group flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all duration-500 border border-white/10 backdrop-blur-md"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-medium">Back to Team</span>
          </button>

          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-2xl transition-all duration-300 font-medium shadow-lg">
              <Download size={18} />
              <span>Download Portfolio</span>
            </button>
          </div>
        </div>

        {/* 히어로 섹션 - 독특한 레이아웃 */}
        <div className={`mb-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            {/* 왼쪽 - 메인 정보 */}
            <div className="lg:col-span-3 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl">
                    <Crown size={32} className="text-white" />
                  </div>
                  <div>
                    <h1 className="text-6xl font-light tracking-tight">
                      <span className="text-white">Jung </span>
                      <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent font-medium">Minseok</span>
                    </h1>
                    <p className="text-2xl text-gray-400 font-light">Aspiring Hospitality Leader & Music Enthusiast</p>
                  </div>
                </div>
                
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                  2025년 1월 스위스 호텔경영 유학을 앞두고 있는 예비 호스피탈리티 전문가이며, 
                  취미로 음악 제작을 즐기며 <span className="text-amber-400 font-medium">창의적인 감성</span>을 키워가고 있습니다.
                </p>
              </div>

              {/* 연락처 카드 */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md">
                  <MapPin size={16} className="text-amber-400" />
                  <span className="text-gray-300">Seoul, Korea</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md">
                  <Mail size={16} className="text-violet-400" />
                  <span className="text-gray-300">minseok@jungtrio.com</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md">
                  <Music2 size={16} className="text-orange-400" />
                  <span className="text-gray-300">SoundCloud</span>
                </div>
              </div>
            </div>

            {/* 오른쪽 - 통계 카드들 */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/10 rounded-3xl p-6 border border-amber-500/20 backdrop-blur-md">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 size={24} className="text-amber-400" />
                  <span className="text-lg font-semibold">Study Preparation</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-amber-400">Jan 2025</div>
                    <div className="text-sm text-gray-400">Switzerland Departure</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-amber-400">Hotel Mgmt</div>
                    <div className="text-sm text-gray-400">Major Study</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-violet-500/20 to-purple-500/10 rounded-3xl p-6 border border-violet-500/20 backdrop-blur-md">
                <div className="flex items-center gap-3 mb-4">
                  <Music2 size={24} className="text-violet-400" />
                  <span className="text-lg font-semibold">Hobby Music</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-violet-400">8+</div>
                    <div className="text-sm text-gray-400">Personal Tracks</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-violet-400">3</div>
                    <div className="text-sm text-gray-400">Music Genres</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 호텔 경험 섹션 */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl border border-amber-500/30 mb-6">
              <Building2 size={24} className="text-amber-400" />
              <span className="text-xl font-semibold">Journey to Switzerland</span>
            </div>
            <h2 className="text-4xl font-light mb-4">호스피탈리티 전문가의 꿈</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              스위스에서 세계 최고 수준의 호텔 경영을 배우며, 글로벌 호스피탈리티 리더로 성장하는 여정입니다.
            </p>
          </div>

          <div className="space-y-8">
            {hotelPreparation.map((exp, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-r from-white/5 to-white/2 rounded-3xl p-8 border border-white/10 backdrop-blur-md hover:border-amber-500/30 transition-all duration-500">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                    <div className="lg:col-span-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
                          <Wine size={24} className="text-white" />
                        </div>
                        <div className="text-sm text-amber-400 font-medium">{exp.period}</div>
                      </div>
                    </div>
                    
                    <div className="lg:col-span-3">
                      <h3 className="text-2xl font-semibold mb-2">{exp.title}</h3>
                      <p className="text-lg text-amber-400 mb-4">{exp.subtitle}</p>
                      <p className="text-gray-300 leading-relaxed mb-6">{exp.description}</p>
                      
                      <div className="flex flex-wrap gap-3">
                        {exp.activities.map((activity, aIndex) => (
                          <div key={aIndex} className="px-4 py-2 bg-amber-500/10 text-amber-300 rounded-xl text-sm border border-amber-500/20">
                            {activity}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 음악 섹션 - SoundCloud 통합 */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-2xl border border-violet-500/30 mb-6">
              <Piano size={24} className="text-violet-400" />
              <span className="text-xl font-semibold">Musical Moments</span>
            </div>
            <h2 className="text-4xl font-light mb-4">일상 속 음악 이야기</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              취미로 시작한 음악 제작을 통해 감정을 표현하고, 창의적인 영감을 얻는 소중한 시간들입니다.
            </p>
          </div>

          <div className="space-y-8">
            {soundCloudTracks.map((track, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-white/5 to-white/2 rounded-3xl p-8 border border-white/10 backdrop-blur-md hover:border-violet-500/30 transition-all duration-500">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* 트랙 정보 */}
                    <div className="lg:col-span-1 space-y-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 bg-gradient-to-br ${getMoodColor(track.mood)} rounded-2xl flex items-center justify-center`}>
                          <FileMusic size={32} className="text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-semibold">{track.title}</h3>
                          <p className="text-violet-400 font-medium">{track.subtitle}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <Music2 size={16} />
                          <span>{track.genre}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={16} />
                          <span>{track.duration} • {track.year}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 text-sm leading-relaxed">{track.description}</p>
                      
                      <a 
                        href={track.soundcloudUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors text-sm font-medium"
                      >
                        <ExternalLink size={16} />
                        <span>Listen on SoundCloud</span>
                      </a>
                    </div>
                    
                    {/* SoundCloud Embed Player */}
                    <div className="lg:col-span-2">
                      <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-2xl p-6 border border-violet-500/20">
                        <div className="aspect-video bg-black/20 rounded-xl flex items-center justify-center">
                          {soundCloudLoaded ? (
                            <iframe
                              width="100%"
                              height="166"
                              scrolling="no"
                              frameBorder="no"
                              allow="autoplay"
                              src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(track.soundcloudUrl)}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`}
                              className="rounded-xl"
                            ></iframe>
                          ) : (
                            <div className="text-center">
                              <div className="animate-spin w-8 h-8 border-2 border-violet-400 border-t-transparent rounded-full mx-auto mb-4"></div>
                              <p className="text-gray-400">Loading SoundCloud Player...</p>
                            </div>
                          )}
                        </div>
                        
                        {/* 플레이어 컨트롤 (선택사항) */}
                        <div className="flex items-center justify-between mt-4">
                          <button
                            onClick={() => handleTrackPlay(index, track.embedId)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                              activeTrack === index 
                                ? 'bg-violet-500 text-white' 
                                : 'bg-white/10 hover:bg-white/20 text-gray-300'
                            }`}
                          >
                            {activeTrack === index ? <Pause size={16} /> : <Play size={16} />}
                            <span>{activeTrack === index ? 'Pause' : 'Play'}</span>
                          </button>
                          
                          <div className="flex items-center gap-2 text-gray-400">
                            <Volume2 size={16} />
                            <div className="w-20 h-2 bg-gray-700 rounded-full">
                              <div className="w-12 h-2 bg-violet-400 rounded-full"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* SoundCloud 프로필 링크 */}
          <div className="text-center mt-12">
            <a 
              href="https://soundcloud.com/minseok-jung" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-2xl font-medium transition-all duration-300 shadow-lg"
            >
              <Music2 size={20} />
              <span>Visit My SoundCloud</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </section>

        {/* 철학과 가치관 */}
        <section className="mb-24">
          <div className="bg-gradient-to-r from-slate-800/50 to-gray-800/30 rounded-3xl p-12 border border-white/10 backdrop-blur-md">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-light mb-6">Philosophy & Values</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-violet-400 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <blockquote className="text-2xl font-light italic text-gray-300 leading-relaxed">
                  "꿈을 향한 여정에서 가장 중요한 것은 준비하는 과정 자체이며,<br />
                  음악은 그 여정을 더욱 풍요롭게 만들어주는 동반자입니다."
                </blockquote>
                <div className="text-right text-amber-400 font-medium">— Jung Minseok</div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Star size={16} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Passionate Learning</h4>
                    <p className="text-gray-400 text-sm">새로운 것을 배우는 열정으로 스위스 유학을 준비하며 성장하고 있습니다.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-violet-400 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Music2 size={16} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Creative Expression</h4>
                    <p className="text-gray-400 text-sm">음악을 통해 일상의 감정과 경험을 자유롭게 표현하고 공유합니다.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <TrendingUp size={16} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Global Vision</h4>
                    <p className="text-gray-400 text-sm">세계적인 호스피탈리티 전문가가 되어 다양한 문화를 연결하는 다리 역할을 하고 싶습니다.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 연락 및 협업 */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-amber-500/10 via-violet-500/10 to-purple-500/10 rounded-3xl p-12 border border-white/10 backdrop-blur-md text-center">
            <h3 className="text-3xl font-light mb-6">Let's Connect Before My Journey</h3>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              스위스 유학 전까지 다양한 경험을 쌓고 싶습니다. 호텔업계 관련 조언이나 음악에 대한 이야기를 나누고 싶으시다면 언제든 연락해 주세요.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="mailto:minseok@jungtrio.com"
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-2xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Mail size={20} />
                <span>Start a Project</span>
              </a>
              <a 
                href="tel:+82-10-1234-5678"
                className="flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 rounded-2xl font-medium transition-all duration-300 backdrop-blur-md"
              >
                <Phone size={20} />
                <span>Quick Call</span>
              </a>
            </div>
            
            <div className="flex justify-center gap-6 mt-8">
              <a href="#" className="w-12 h-12 bg-white/5 hover:bg-blue-500/20 border border-white/10 rounded-xl flex items-center justify-center transition-all duration-300">
                <Linkedin size={20} className="text-blue-400" />
              </a>
              <a href="https://soundcloud.com/minseok-jung" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/5 hover:bg-orange-500/20 border border-white/10 rounded-xl flex items-center justify-center transition-all duration-300">
                <Music2 size={20} className="text-orange-400" />
              </a>
              <a href="#" className="w-12 h-12 bg-white/5 hover:bg-amber-500/20 border border-white/10 rounded-xl flex items-center justify-center transition-all duration-300">
                <Globe size={20} className="text-amber-400" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MinseokPage;