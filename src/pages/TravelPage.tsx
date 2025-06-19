import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import TravelCard from '../components/TravelCard';
import travelsData from '../data/travels.json';
import { 
  Map, 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  Clock, 
  Plane, 
  Globe, 
  Filter,
  Search,
  Grid3X3,
  List,
  Eye,
  Heart,
  DollarSign
} from 'lucide-react';

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

const TravelPage: React.FC = () => {
  const { language } = useTheme();
  const [travels] = useState<Travel[]>(travelsData as Travel[]);
  const [selectedTravel, setSelectedTravel] = useState<Travel | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'planned'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // 필터링된 여행 목록
  const filteredTravels = travels.filter(travel => {
    const matchesStatus = filterStatus === 'all' || travel.status === filterStatus;
    const matchesSearch = travel.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         travel.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         travel.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  // 통계 계산
  const stats = {
    totalTrips: travels.filter(t => t.status === 'completed').length,
    plannedTrips: travels.filter(t => t.status === 'planned').length,
    countries: Array.from(new Set(travels.map(t => t.country))).length,
    totalBudget: travels.reduce((sum, t) => sum + t.budget, 0)
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-32">
      {/* 배경 그라데이션 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* 헤더 섹션 */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl mb-4">
              <Globe size={32} className="text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Our Travels
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              랑구와 함께하는 특별한 여행 이야기들
            </p>
          </div>

          {/* 통계 카드 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <Plane className="text-blue-400" size={24} />
                <span className="text-gray-400 text-sm">완료된 여행</span>
              </div>
              <div className="text-3xl font-bold text-white">{stats.totalTrips}</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="text-green-400" size={24} />
                <span className="text-gray-400 text-sm">계획된 여행</span>
              </div>
              <div className="text-3xl font-bold text-white">{stats.plannedTrips}</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <Globe className="text-purple-400" size={24} />
                <span className="text-gray-400 text-sm">방문 국가</span>
              </div>
              <div className="text-3xl font-bold text-white">{stats.countries}</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="text-yellow-400" size={24} />
                <span className="text-gray-400 text-sm">총 예산</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {(stats.totalBudget / 10000).toFixed(0)}만원
              </div>
            </div>
          </div>

          {/* 검색 및 필터 */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* 검색바 */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="여행지, 제목, 태그로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* 필터 버튼 */}
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500"
              >
                <option value="all">모든 여행</option>
                <option value="completed">완료된 여행</option>
                <option value="planned">계획된 여행</option>
              </select>

              {/* 뷰 모드 선택 */}
              <div className="flex bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 transition-colors ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  <Grid3X3 size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 transition-colors ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  <List size={20} />
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`p-3 transition-colors ${viewMode === 'map' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  <Map size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 메인 컨텐츠 */}
        {viewMode === 'map' ? (
          <TravelMap travels={filteredTravels} onTravelSelect={setSelectedTravel} />
        ) : (
          <TravelGrid travels={filteredTravels} viewMode={viewMode} />
        )}

        {/* 여행 상세 모달 */}
        {selectedTravel && (
          <TravelDetailModal travel={selectedTravel} onClose={() => setSelectedTravel(null)} />
        )}
      </div>
    </div>
  );
};

// 여행 그리드/리스트 컴포넌트
const TravelGrid: React.FC<{ travels: Travel[]; viewMode: 'grid' | 'list' }> = ({ travels, viewMode }) => {
  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {travels.map((travel) => (
          <TravelListItem key={travel.id} travel={travel} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {travels.map((travel, index) => (
        <TravelCard key={travel.id} travel={travel} index={index} />
      ))}
    </div>
  );
};

// 여행 리스트 아이템 컴포넌트
const TravelListItem: React.FC<{ travel: Travel }> = ({ travel }) => {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 group">
      <div className="flex items-center gap-6">
        {/* 이미지 */}
        <div className="w-24 h-24 rounded-xl overflow-hidden bg-white/10 flex-shrink-0">
          <img
            src={travel.images[0]}
            alt={travel.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2IiBmaWxsPSIjMTExODI3Ii8+CjxjaXJjbGUgY3g9IjQ4IiBjeT0iNDgiIHI9IjI0IiBmaWxsPSIjNEI3NDhDIi8+CjxwYXRoIGQ9Ik0zNiA0OEw2MCAzNlY2MEwzNiA0OFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
            }}
          />
        </div>

        {/* 정보 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-bold text-white truncate">{travel.title}</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              travel.status === 'completed' 
                ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
            }`}>
              {travel.status === 'completed' ? '완료' : '계획'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
            <div className="flex items-center gap-1">
              <MapPin size={16} />
              <span>{travel.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <span>{formatDate(travel.date)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>{travel.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users size={16} />
              <span>{travel.participants.length}명</span>
            </div>
          </div>

          <p className="text-gray-300 text-sm line-clamp-2 mb-3">{travel.description}</p>

          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              {travel.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-white/10 rounded-md text-xs text-gray-300">
                  {tag}
                </span>
              ))}
            </div>
            {travel.status === 'completed' && (
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < travel.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// 지도 컴포넌트 (현실적인 한국 지도)
const TravelMap: React.FC<{ travels: Travel[]; onTravelSelect: (travel: Travel) => void }> = ({ travels, onTravelSelect }) => {
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);

  // 정확한 한국 좌표 변환 함수
  const getMapPosition = (coordinates: { lat: number; lng: number }) => {
    // 한국 실제 좌표 범위
    const bounds = {
      north: 38.6,    // 최북단 (함경북도)
      south: 33.0,    // 최남단 (제주도 마라도)
      east: 131.87,   // 최동단 (독도)
      west: 124.6     // 최서단 (백령도)
    };
    
    const mapWidth = 800;
    const mapHeight = 600;
    
    const x = ((coordinates.lng - bounds.west) / (bounds.east - bounds.west)) * mapWidth;
    const y = mapHeight - ((coordinates.lat - bounds.south) / (bounds.north - bounds.south)) * mapHeight;
    
    return { x: Math.max(20, Math.min(mapWidth - 20, x)), y: Math.max(20, Math.min(mapHeight - 20, y)) };
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
      {/* 지도 헤더 */}
      <div className="p-6 border-b border-white/10">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <Map size={28} className="text-blue-400" />
          여행 지도
        </h2>
        <p className="text-gray-400 mt-1">방문한 곳과 계획된 여행지를 확인해보세요</p>
      </div>

      {/* 지도 영역 */}
      <div className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 overflow-hidden">
        <div className="p-6">
          {/* 실제 한국 지도 SVG */}
          <div className="relative w-full max-w-5xl mx-auto">
            <svg viewBox="0 0 800 600" className="w-full h-auto" style={{ maxHeight: '70vh' }}>
              {/* 배경 */}
              <rect width="800" height="600" fill="url(#seaGradient)" />
              
              {/* 그라데이션과 필터 정의 */}
              <defs>
                {/* 바다 그라데이션 */}
                <linearGradient id="seaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0f172a" />
                  <stop offset="50%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#334155" />
                </linearGradient>
                
                {/* 육지 그라데이션 */}
                <linearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#374151" />
                  <stop offset="50%" stopColor="#4b5563" />
                  <stop offset="100%" stopColor="#6b7280" />
                </linearGradient>
                
                {/* 마커 글로우 효과 */}
                <filter id="markerGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                
                {/* 그리드 패턴 */}
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(148, 163, 184, 0.1)" strokeWidth="0.5"/>
                </pattern>
              </defs>
              
              {/* 그리드 배경 */}
              <rect width="100%" height="100%" fill="url(#grid)" />
              
              {/* 한국 본토 (더 정확한 모양) */}
              <path
                d="M 280 150 
                   Q 270 140 260 145
                   Q 250 150 245 165
                   Q 240 180 235 200
                   Q 230 220 240 240
                   Q 250 260 270 275
                   Q 290 285 315 290
                   Q 340 295 365 290
                   Q 390 285 410 275
                   Q 430 265 445 250
                   Q 460 235 465 215
                   Q 470 195 465 175
                   Q 460 155 450 140
                   Q 440 125 425 115
                   Q 410 105 395 100
                   Q 380 95 365 95
                   Q 350 95 335 100
                   Q 320 105 305 115
                   Q 290 125 280 140
                   Z"
                fill="url(#landGradient)"
                stroke="#94a3b8"
                strokeWidth="1.5"
                opacity="0.8"
              />
              
              {/* 강원도 지역 */}
              <path
                d="M 380 120 Q 400 110 420 120 Q 440 130 450 150 Q 445 170 430 180 Q 415 185 400 180 Q 385 175 380 160 Q 375 145 380 130 Z"
                fill="url(#landGradient)"
                stroke="#94a3b8"
                strokeWidth="1"
                opacity="0.7"
              />
              
              {/* 제주도 */}
              <ellipse cx="290" cy="380" rx="35" ry="20" 
                fill="url(#landGradient)" 
                stroke="#94a3b8" 
                strokeWidth="1.5" 
                opacity="0.8" />
              
              {/* 울릉도 */}
              <circle cx="520" cy="180" r="8" 
                fill="url(#landGradient)" 
                stroke="#94a3b8" 
                strokeWidth="1" 
                opacity="0.7" />
              
              {/* 주요 산맥 표시 (가벼운 선으로) */}
              <path d="M 320 140 Q 340 160 360 180 Q 380 200 400 220" 
                stroke="rgba(148, 163, 184, 0.3)" 
                strokeWidth="2" 
                fill="none" 
                strokeDasharray="5,5" />
              
              {/* 주요 강 표시 */}
              <path d="M 340 200 Q 360 220 380 240 Q 400 260 420 280" 
                stroke="rgba(59, 130, 246, 0.4)" 
                strokeWidth="2" 
                fill="none" />
              
                             {/* 여행지 마커들 */}
               {travels.map((travel) => {
                 const position = getMapPosition(travel.coordinates);
                 const isSelected = selectedMarker === travel.id;
                 const isCompleted = travel.status === 'completed';
                 
                 return (
                   <g key={travel.id}>
                     {/* 마커 배경 원 */}
                     <circle
                       cx={position.x}
                       cy={position.y}
                       r={isSelected ? "25" : "16"}
                       fill={isCompleted ? "rgba(34, 197, 94, 0.15)" : "rgba(59, 130, 246, 0.15)"}
                       stroke={isCompleted ? "#22c55e" : "#3b82f6"}
                       strokeWidth={isSelected ? "3" : "2"}
                       className="transition-all duration-300 cursor-pointer"
                       filter={isSelected ? "url(#markerGlow)" : ""}
                       onClick={() => {
                         setSelectedMarker(travel.id);
                         onTravelSelect(travel);
                       }}
                     />
                     
                     {/* 내부 원 */}
                     <circle
                       cx={position.x}
                       cy={position.y}
                       r={isSelected ? "12" : "8"}
                       fill={isCompleted ? "#22c55e" : "#3b82f6"}
                       className="cursor-pointer transition-all duration-300"
                       onClick={() => {
                         setSelectedMarker(travel.id);
                         onTravelSelect(travel);
                       }}
                     />
                     
                     {/* 마커 아이콘 */}
                     <MapPin
                       x={position.x - 6}
                       y={position.y - 6}
                       width="12"
                       height="12"
                       className="fill-white cursor-pointer transition-all duration-300"
                       onClick={() => {
                         setSelectedMarker(travel.id);
                         onTravelSelect(travel);
                       }}
                     />
                     
                     {/* 펄스 효과 (선택된 마커) */}
                     {isSelected && (
                       <circle
                         cx={position.x}
                         cy={position.y}
                         r="20"
                         fill="none"
                         stroke={isCompleted ? "#22c55e" : "#3b82f6"}
                         strokeWidth="2"
                         opacity="0.6"
                         className="animate-ping"
                       />
                     )}
                     
                     {/* 라벨 배경 */}
                     <rect
                       x={position.x - travel.location.length * 4}
                       y={position.y + 20}
                       width={travel.location.length * 8}
                       height="20"
                       rx="10"
                       fill="rgba(0, 0, 0, 0.7)"
                       stroke="rgba(255, 255, 255, 0.2)"
                       strokeWidth="1"
                       className="cursor-pointer"
                       onClick={() => {
                         setSelectedMarker(travel.id);
                         onTravelSelect(travel);
                       }}
                     />
                     
                     {/* 마커 라벨 */}
                     <text
                       x={position.x}
                       y={position.y + 34}
                       textAnchor="middle"
                       className="text-xs font-medium fill-white cursor-pointer select-none"
                       onClick={() => {
                         setSelectedMarker(travel.id);
                         onTravelSelect(travel);
                       }}
                     >
                       {travel.location}
                     </text>
                   </g>
                 );
               })}
               
               {/* 나침반 */}
               <g transform="translate(720, 80)">
                 <circle cx="0" cy="0" r="30" fill="rgba(0, 0, 0, 0.5)" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1"/>
                 <path d="M 0 -20 L 5 0 L 0 20 L -5 0 Z" fill="#ef4444" />
                 <text x="0" y="-35" textAnchor="middle" className="text-xs fill-white font-bold">N</text>
                 <text x="35" y="5" textAnchor="middle" className="text-xs fill-gray-300">E</text>
                 <text x="0" y="50" textAnchor="middle" className="text-xs fill-gray-300">S</text>
                 <text x="-35" y="5" textAnchor="middle" className="text-xs fill-gray-300">W</text>
               </g>
               
               {/* 스케일 바 */}
               <g transform="translate(50, 550)">
                 <line x1="0" y1="0" x2="100" y2="0" stroke="white" strokeWidth="2"/>
                 <line x1="0" y1="-5" x2="0" y2="5" stroke="white" strokeWidth="2"/>
                 <line x1="100" y1="-5" x2="100" y2="5" stroke="white" strokeWidth="2"/>
                 <text x="50" y="-10" textAnchor="middle" className="text-xs fill-white">100km</text>
               </g>
            </svg>
          </div>
        </div>

        {/* 범례 */}
        <div className="absolute top-6 left-6 bg-black/70 backdrop-blur-md rounded-xl p-4 border border-white/20">
          <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
            <MapPin size={16} className="text-blue-400" />
            여행 현황
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-green-500 rounded-full shadow-lg"></div>
              <span className="text-gray-200">완료된 여행</span>
              <span className="text-green-400 font-semibold ml-auto">
                {travels.filter(t => t.status === 'completed').length}곳
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-blue-500 rounded-full shadow-lg"></div>
              <span className="text-gray-200">계획된 여행</span>
              <span className="text-blue-400 font-semibold ml-auto">
                {travels.filter(t => t.status === 'planned').length}곳
              </span>
            </div>
          </div>
        </div>

        {/* 여행지 세부 정보 패널 */}
        {selectedMarker && (
          <div className="absolute top-6 right-6 bg-black/70 backdrop-blur-md rounded-xl p-4 border border-white/20 max-w-sm">
            {(() => {
              const selectedTravel = travels.find(t => t.id === selectedMarker);
              if (!selectedTravel) return null;
              
              return (
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-white font-semibold text-lg">{selectedTravel.title}</h4>
                    <button 
                      onClick={() => setSelectedMarker(null)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-gray-400" />
                      <span className="text-gray-300">{selectedTravel.location}, {selectedTravel.country}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-gray-400" />
                      <span className="text-gray-300">
                        {new Date(selectedTravel.date).toLocaleDateString('ko-KR')}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-gray-400" />
                      <span className="text-gray-300">{selectedTravel.duration}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Users size={14} className="text-gray-400" />
                      <span className="text-gray-300">{selectedTravel.participants.length}명</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm mt-3 line-clamp-2">
                    {selectedTravel.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      selectedTravel.status === 'completed' 
                        ? 'bg-green-500/20 text-green-300' 
                        : 'bg-blue-500/20 text-blue-300'
                    }`}>
                      {selectedTravel.status === 'completed' ? '완료' : '계획'}
                    </span>
                    
                    {selectedTravel.status === 'completed' && (
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className={i < selectedTravel.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* 여행지 목록 (하단) */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-black/50 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <h4 className="text-white font-medium mb-3">여행지 바로가기</h4>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/20">
              {travels.map((travel) => (
                <button
                  key={travel.id}
                  onClick={() => {
                    setSelectedMarker(travel.id);
                    onTravelSelect(travel);
                  }}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    selectedMarker === travel.id
                      ? 'bg-blue-500 text-white shadow-lg'
                      : travel.status === 'completed'
                      ? 'bg-green-500/20 text-green-300 hover:bg-green-500/30 border border-green-500/30'
                      : 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border border-blue-500/30'
                  }`}
                >
                  <div className="font-medium">{travel.location}</div>
                  <div className="text-xs opacity-75">{travel.duration}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 여행 상세 모달
const TravelDetailModal: React.FC<{ travel: Travel; onClose: () => void }> = ({ travel, onClose }) => {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-gray-900/95 rounded-3xl border border-white/10 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-white"
          >
            ✕
          </button>

          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">{travel.title}</h1>
            <div className="flex items-center gap-4 text-gray-400">
              <span className="flex items-center gap-1">
                <MapPin size={16} />
                {travel.location}, {travel.country}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={16} />
                {formatDate(travel.date)} - {formatDate(travel.endDate)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">여행 하이라이트</h3>
              <ul className="space-y-2">
                {travel.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-300">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">참가자</h3>
              <div className="flex flex-wrap gap-2">
                {travel.participants.map((participant, index) => (
                  <span key={index} className="px-3 py-1 bg-white/10 rounded-full text-white text-sm">
                    {participant}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelPage; 