import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Users, 
  Heart, 
  Star, 
  Code, 
  Music, 
  Camera, 
  Coffee,
  Trophy,
  Target,
  Lightbulb,
  Rocket,
  Github,
  Instagram,
  Mail,
  ChevronRight,
  Award,
  Globe,
  Sparkles,
  Zap
} from 'lucide-react';
import MemberProfile from '../components/MemberProfile';
import membersData from '../data/members.json';
import memberDetailsData from '../data/memberDetails.json';

const WhosePage: React.FC = () => {
  const { memberId } = useParams<{ memberId?: string }>();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('team');

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // 멤버별 스킬 데이터
  const memberSkills = {
    '정민석': { 
      skills: ['리더십', '기획', '소통', '문제해결'], 
      color: 'from-blue-500 to-cyan-500',
      icon: Target,
      specialty: 'Team Leader & Strategist',
      motto: "함께 가면 더 멀리 갈 수 있다"
    },
    '정재원': { 
      skills: ['개발', '혁신', '분석', '창의성'], 
      color: 'from-green-500 to-emerald-500',
      icon: Code,
      specialty: 'Tech Innovator',
      motto: "코드로 세상을 바꾸자"
    },
    '강한울': { 
      skills: ['음악', '감성', '표현', '예술'], 
      color: 'from-purple-500 to-pink-500',
      icon: Music,
      specialty: 'Creative Director',
      motto: "음악으로 마음을 전하다"
    },
    '진규': { 
      skills: ['디자인', '미학', '감각', '표현'], 
      color: 'from-orange-500 to-red-500',
      icon: Camera,
      specialty: 'Visual Artist',
      motto: "모든 순간을 아름답게"
    }
  };

  // 팀 성과 데이터
  const achievements = [
    { icon: Trophy, title: '프로젝트 완성', count: '15+', color: 'text-yellow-400' },
    { icon: Star, title: '사용자 만족도', count: '98%', color: 'text-blue-400' },
    { icon: Heart, title: '팀워크 지수', count: '100%', color: 'text-red-400' },
    { icon: Rocket, title: '혁신 아이디어', count: '50+', color: 'text-green-400' }
  ];

  // 팀 추천사
  const testimonials = [
    {
      text: "가장 창의적이고 열정적인 팀이에요. 함께 일하면서 많이 배웠습니다.",
      author: "협업 파트너 A",
      role: "프로젝트 매니저"
    },
    {
      text: "기술적 역량과 창의성을 모두 갖춘 놀라운 팀입니다.",
      author: "클라이언트 B",
      role: "스타트업 CEO"
    },
    {
      text: "디테일한 완성도와 사용자 경험에 대한 깊은 이해가 인상적이었습니다.",
      author: "사용자 C",
      role: "UX 디자이너"
    }
  ];

  // 자동 추천사 회전
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // 개별 멤버 프로필 보기
  if (memberId) {
    const memberDetail = memberDetailsData[memberId as keyof typeof memberDetailsData];
    if (memberDetail) {
      return <MemberProfile member={memberDetail as any} />;
    }
    navigate('/whose');
    return null;
  }

  // 멤버 선택 핸들러
  const handleMemberClick = (memberName: string) => {
    const memberIdMap: Record<string, string> = {
      '정민석': 'member/minseok',
      '정재원': 'member/jaewon',
      '강한울': 'member/hanwool',
      '진규': 'member/jingyu'
    };
    
    const path = memberIdMap[memberName];
    if (path) {
      navigate(`/${path}`);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* 동적 배경 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-black to-purple-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.1),transparent_50%)]"></div>
      </div>

      {/* 플로팅 파티클 효과 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/20 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 pt-24">
        {/* 히어로 섹션 */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl mb-8 shadow-2xl">
            <Users size={48} className="text-white" />
          </div>
          
          <h1 className="text-7xl md:text-8xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Meet Our
            </span>
            <br />
            <span className="bg-gradient-to-r from-pink-400 via-red-400 to-orange-400 bg-clip-text text-transparent">
              Dream Team
            </span>
          </h1>
          
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
            창의성과 기술, 열정이 만나는 곳 🚀
            <br />
            <span className="text-xl text-gray-400">
              각자의 특별한 재능으로 하나의 꿈을 만들어가는 랑구팸
            </span>
          </p>

          {/* 네비게이션 탭 */}
          <div className="flex justify-center mb-12">
            <div className="flex bg-white/5 backdrop-blur-md rounded-2xl p-2 border border-white/10">
              {[
                { id: 'team', label: '팀 소개', icon: Users },
                { id: 'achievements', label: '성과', icon: Trophy },
                { id: 'testimonials', label: '추천사', icon: Star }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeSection === tab.id
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <tab.icon size={20} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 동적 컨텐츠 섹션 */}
        <div className="mb-20">
          {activeSection === 'team' && (
            <div className="space-y-20">
              {/* 팀 멤버 그리드 */}
              <div>
                <h2 className="text-4xl font-bold text-center mb-4 flex items-center justify-center gap-3">
                  <Sparkles className="text-yellow-400" size={36} />
                  Our Amazing Team
                </h2>
                <p className="text-gray-400 text-center mb-12 text-lg">각 멤버를 클릭하여 상세 프로필을 확인하세요</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                  {membersData.map((member, index) => {
                    const memberData = memberSkills[member.name as keyof typeof memberSkills];
                    const IconComponent = memberData?.icon || Users;
                    
                    return (
                      <div
                        key={member.id}
                        className="group cursor-pointer"
                        onClick={() => handleMemberClick(member.name)}

                      >
                        <div className="relative transform transition-all duration-500 hover:scale-105">
                          {/* 멤버 카드 컨테이너 */}
                          <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 overflow-hidden">
                            {/* 그라데이션 배경 */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${memberData?.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
                            
                            {/* 멤버 아바타 */}
                            <div className="relative z-10 text-center mb-4">
                              <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center relative overflow-hidden group-hover:shadow-2xl transition-all duration-300">
                                <div className={`absolute inset-0 bg-gradient-to-br ${memberData?.color} opacity-80`}></div>
                                <IconComponent size={40} className="text-white relative z-10" />
                              </div>
                              
                              <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                              <p className="text-sm text-gray-400 mb-2">{memberData?.specialty}</p>
                              <p className="text-xs text-gray-500 italic">"{memberData?.motto}"</p>
                            </div>

                            {/* 스킬 태그 */}
                            <div className="relative z-10 flex flex-wrap gap-2 justify-center mb-4">
                              {memberData?.skills.map((skill, skillIndex) => (
                                <span
                                  key={skillIndex}
                                  className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-gray-300 border border-white/20"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>

                            {/* 프로필 보기 버튼 */}
                            <div className="relative z-10 text-center">
                              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 border border-white/20">
                                <span className="text-sm font-medium text-white">프로필 보기</span>
                                <ChevronRight size={16} className="text-white group-hover:translate-x-1 transition-transform duration-300" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 팀 문화 */}
              <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl border border-white/10 p-12">
                <h3 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-3">
                  <Heart className="text-red-400" size={32} />
                  Our Culture
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                      <Lightbulb size={32} className="text-white" />
                    </div>
                    <h4 className="text-xl font-bold mb-2">혁신적 사고</h4>
                    <p className="text-gray-400">새로운 아이디어로 세상을 바꿔나가는 창의적 사고</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                      <Target size={32} className="text-white" />
                    </div>
                    <h4 className="text-xl font-bold mb-2">목표 지향</h4>
                    <p className="text-gray-400">명확한 목표를 세우고 함께 달성해나가는 실행력</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                      <Coffee size={32} className="text-white" />
                    </div>
                    <h4 className="text-xl font-bold mb-2">소통과 배려</h4>
                    <p className="text-gray-400">서로를 존중하고 배려하는 따뜻한 팀워크</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'achievements' && (
            <div className="space-y-12">
              <h2 className="text-4xl font-bold text-center mb-12 flex items-center justify-center gap-3">
                <Trophy className="text-yellow-400" size={36} />
                Our Achievements
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {achievements.map((achievement, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center group hover:bg-white/10 transition-all duration-300">
                    <achievement.icon size={48} className={`${achievement.color} mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`} />
                    <div className="text-4xl font-black mb-2 text-white">{achievement.count}</div>
                    <div className="text-gray-400 font-medium">{achievement.title}</div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-3xl border border-white/10 p-12">
                <h3 className="text-2xl font-bold text-center mb-8">주요 성과 하이라이트</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Award className="text-yellow-400" size={24} />
                      <span className="text-lg">혁신적인 웹 플랫폼 개발</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="text-blue-400" size={24} />
                      <span className="text-lg">사용자 경험 최적화</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Rocket className="text-green-400" size={24} />
                      <span className="text-lg">팀워크 기반 프로젝트 완성</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Zap className="text-purple-400" size={24} />
                      <span className="text-lg">창의적 문제해결</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Star className="text-orange-400" size={24} />
                      <span className="text-lg">높은 만족도 달성</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Heart className="text-red-400" size={24} />
                      <span className="text-lg">지속적인 성장과 발전</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'testimonials' && (
            <div className="space-y-12">
              <h2 className="text-4xl font-bold text-center mb-12 flex items-center justify-center gap-3">
                <Star className="text-yellow-400" size={36} />
                What People Say
              </h2>
              
              {/* 메인 추천사 */}
              <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl border border-white/10 p-12 text-center">
                <div className="max-w-4xl mx-auto">
                  <div className="text-4xl text-blue-400 mb-6">"</div>
                  <p className="text-2xl font-light text-gray-100 mb-8 leading-relaxed">
                    {testimonials[currentTestimonial].text}
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {testimonials[currentTestimonial].author.charAt(0)}
                      </span>
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-white">{testimonials[currentTestimonial].author}</div>
                      <div className="text-gray-400 text-sm">{testimonials[currentTestimonial].role}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 추천사 네비게이션 */}
              <div className="flex justify-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial ? 'bg-blue-500' : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>

              {/* 연락처 정보 */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-center mb-6">함께 일하고 싶으시다면?</h3>
                <div className="flex flex-wrap justify-center gap-4">
                  <button className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors">
                    <Mail size={20} className="text-blue-400" />
                    <span>이메일 문의</span>
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors">
                    <Github size={20} className="text-purple-400" />
                    <span>깃허브</span>
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors">
                    <Instagram size={20} className="text-pink-400" />
                    <span>인스타그램</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CTA 섹션 */}
        <div className="text-center bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl border border-white/10 p-12">
          <h3 className="text-3xl font-bold mb-4">Ready to Work Together?</h3>
          <p className="text-gray-300 mb-8 text-lg">
            창의적이고 열정적인 프로젝트를 함께 만들어보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold text-white hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              프로젝트 문의하기
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

export default WhosePage; 