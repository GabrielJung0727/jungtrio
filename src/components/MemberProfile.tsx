import React, { useState } from 'react';
import { ArrowLeft, Star, Trophy, Zap, Target, Code, Palette, Music, Users, ExternalLink, Quote, Award, BarChart3, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MemberAvatar from './MemberAvatar';

interface Achievement {
  title: string;
  description: string;
  date: string;
  type: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface Project {
  name: string;
  type: string;
  status: 'completed' | 'in-progress' | 'planned' | 'ongoing';
  completion: number;
  description: string;
}

interface Skill {
  name: string;
  level: number;
  category: string;
}

interface MemberDetail {
  id: string;
  name: string;
  role: string;
  title: string;
  level: number;
  exp: number;
  maxExp: number;
  stats: Record<string, number>;
  achievements: Achievement[];
  projects: Project[];
  skills: Skill[];
  favorites: Record<string, string[]>;
  quotes: string[];
  socialLinks: Record<string, string>;
}

interface MemberProfileProps {
  member: MemberDetail;
}

const MemberProfile: React.FC<MemberProfileProps> = ({ member }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'skills' | 'achievements'>('overview');

  const getRarityColor = (rarity: string) => {
    const colors = {
      'common': 'border-gray-500 bg-gray-500/20 text-gray-300',
      'rare': 'border-blue-500 bg-blue-500/20 text-blue-300',
      'epic': 'border-purple-500 bg-purple-500/20 text-purple-300',
      'legendary': 'border-yellow-500 bg-yellow-500/20 text-yellow-300'
    };
    return colors[rarity as keyof typeof colors] || colors.common;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'completed': 'text-green-400 bg-green-500/20 border-green-500/50',
      'in-progress': 'text-blue-400 bg-blue-500/20 border-blue-500/50',
      'ongoing': 'text-purple-400 bg-purple-500/20 border-purple-500/50',
      'planned': 'text-orange-400 bg-orange-500/20 border-orange-500/50'
    };
    return colors[status as keyof typeof colors] || colors.planned;
  };

  const getStatIcon = (statName: string) => {
    const icons: Record<string, any> = {
      'creativity': Palette,
      'musicality': Music,
      'leadership': Users,
      'energy': Zap,
      'humor': Trophy,
      'strategy': Target,
      'communication': Users,
      'organization': BarChart3,
      'charisma': Star,
      'design': Palette,
      'innovation': Target,
      'aesthetics': Star,
      'imagination': Palette,
      'support': Users,
      'loyalty': Trophy,
      'reliability': Target,
      'adaptability': Zap,
      'patience': TrendingUp
    };
    const IconComponent = icons[statName] || BarChart3;
    return <IconComponent size={16} />;
  };

  const memberThemeColors = {
    minseok: 'from-purple-600 to-pink-600',
    jaewon: 'from-blue-600 to-cyan-600',
    hanwool: 'from-green-600 to-emerald-600',
    jingyu: 'from-orange-600 to-red-600'
  };

  const themeColor = memberThemeColors[member.id as keyof typeof memberThemeColors] || 'from-gray-600 to-gray-700';

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* 배경 효과 */}
      <div className="absolute inset-0">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r ${themeColor} opacity-20 rounded-full blur-3xl`}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r ${themeColor} opacity-15 rounded-full blur-3xl`}></div>
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* 헤더 */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/whose')}
            className="p-3 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors border border-gray-600"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-black uppercase tracking-wider">
            MEMBER PROFILE
          </h1>
        </div>

        {/* 메인 프로필 카드 */}
        <div className="bg-gradient-to-br from-gray-900/90 via-black/90 to-gray-900/90 backdrop-blur-sm rounded-3xl border-2 border-gray-700 p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 프로필 정보 */}
            <div className="lg:col-span-1">
              <div className="text-center">
                <div className="relative inline-block mb-6">
                  <MemberAvatar
                    name={member.name}
                    imageUrl=""
                    favoriteColor="#8b5cf6"
                    size="xl"
                    className="w-32 h-32 text-4xl mx-auto border-4 border-gray-600"
                  />
                  <div className={`absolute -bottom-2 -right-2 px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r ${themeColor} text-white border-2 border-gray-800`}>
                    LV.{member.level}
                  </div>
                </div>
                
                <h2 className="text-3xl font-black mb-2">{member.name}</h2>
                <p className="text-gray-400 mb-2">{member.role}</p>
                <div className={`inline-block px-4 py-2 rounded-lg bg-gradient-to-r ${themeColor} text-white font-black text-sm uppercase tracking-wider`}>
                  {member.title}
                </div>

                {/* EXP 바 */}
                <div className="mt-6">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>EXP</span>
                    <span>{member.exp} / {member.maxExp}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full bg-gradient-to-r ${themeColor} transition-all duration-1000`}
                      style={{ width: `${(member.exp / member.maxExp) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* 스탯 */}
            <div className="lg:col-span-2">
              <h3 className="text-xl font-black mb-6 uppercase tracking-wide flex items-center gap-2">
                <BarChart3 className="text-blue-400" size={24} />
                COMBAT STATS
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(member.stats).map(([statName, value]) => (
                  <div key={statName} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getStatIcon(statName)}
                        <span className="font-bold capitalize">{statName}</span>
                      </div>
                      <span className="text-2xl font-black">{value}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r ${themeColor} transition-all duration-1000`}
                        style={{ width: `${value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 탭 네비게이션 */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {[
            { id: 'overview', label: 'OVERVIEW', icon: Star },
            { id: 'projects', label: 'PROJECTS', icon: Target },
            { id: 'skills', label: 'SKILLS', icon: Code },
            { id: 'achievements', label: 'ACHIEVEMENTS', icon: Trophy }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-black uppercase tracking-wider text-sm transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.id
                    ? `bg-gradient-to-r ${themeColor} text-white border-2 border-transparent`
                    : 'bg-gray-800/50 text-gray-400 border-2 border-gray-600 hover:border-gray-500'
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 탭 콘텐츠 */}
        <div className="bg-gradient-to-br from-gray-900/90 via-black/90 to-gray-900/90 backdrop-blur-sm rounded-3xl border-2 border-gray-700 p-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* 인용구 */}
              <div>
                <h3 className="text-xl font-black mb-4 uppercase tracking-wide flex items-center gap-2">
                  <Quote className="text-purple-400" size={24} />
                  LEGENDARY QUOTES
                </h3>
                <div className="space-y-4">
                  {member.quotes.map((quote, idx) => (
                    <blockquote key={idx} className="italic text-lg text-gray-300 border-l-4 border-purple-500 pl-4">
                      "{quote}"
                    </blockquote>
                  ))}
                </div>
              </div>

              {/* 관심사 */}
              <div>
                <h3 className="text-xl font-black mb-4 uppercase tracking-wide">FAVORITES</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(member.favorites).map(([category, items]) => (
                    <div key={category} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                      <h4 className="font-bold uppercase text-sm text-gray-400 mb-3">{category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {items.map((item, idx) => (
                          <span key={idx} className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 소셜 링크 */}
              <div>
                <h3 className="text-xl font-black mb-4 uppercase tracking-wide flex items-center gap-2">
                  <ExternalLink className="text-green-400" size={24} />
                  SOCIAL NETWORKS
                </h3>
                <div className="flex gap-4">
                  {Object.entries(member.socialLinks).map(([platform, handle]) => (
                    <div key={platform} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors">
                      <div className="font-bold uppercase text-sm text-gray-400">{platform}</div>
                      <div className="text-blue-400">{handle}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div>
              <h3 className="text-xl font-black mb-6 uppercase tracking-wide flex items-center gap-2">
                <Target className="text-red-400" size={24} />
                ACTIVE MISSIONS
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {member.projects.map((project, idx) => (
                  <div key={idx} className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-black mb-1">{project.name}</h4>
                        <p className="text-gray-400 text-sm uppercase">{project.type}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    
                    <div className="mb-2">
                      <div className="flex justify-between text-sm text-gray-400 mb-1">
                        <span>PROGRESS</span>
                        <span>{project.completion}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full bg-gradient-to-r ${themeColor} transition-all duration-1000`}
                          style={{ width: `${project.completion}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div>
              <h3 className="text-xl font-black mb-6 uppercase tracking-wide flex items-center gap-2">
                <Code className="text-blue-400" size={24} />
                SKILL TREE
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {member.skills.map((skill, idx) => (
                  <div key={idx} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-bold">{skill.name}</h4>
                        <p className="text-xs text-gray-400 uppercase">{skill.category}</p>
                      </div>
                      <span className="text-xl font-black">{skill.level}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r ${themeColor} transition-all duration-1000`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div>
              <h3 className="text-xl font-black mb-6 uppercase tracking-wide flex items-center gap-2">
                <Award className="text-yellow-400" size={24} />
                HALL OF FAME
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {member.achievements.map((achievement, idx) => (
                  <div key={idx} className={`rounded-lg p-6 border-2 ${getRarityColor(achievement.rarity)}`}>
                    <div className="flex items-start gap-4">
                      <Trophy className="text-yellow-400 flex-shrink-0 mt-1" size={24} />
                      <div className="flex-1">
                        <h4 className="text-lg font-black mb-2">{achievement.title}</h4>
                        <p className="text-gray-300 mb-3">{achievement.description}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">{new Date(achievement.date).toLocaleDateString('ko-KR')}</span>
                          <span className={`px-2 py-1 rounded uppercase font-bold text-xs ${getRarityColor(achievement.rarity)}`}>
                            {achievement.rarity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberProfile; 