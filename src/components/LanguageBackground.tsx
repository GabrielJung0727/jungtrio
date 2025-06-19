import React from 'react';
import { useTheme } from '../context/ThemeContext';

const LanguageBackground: React.FC = () => {
  const { language, background } = useTheme();

  const renderKoreanElements = () => (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 한국 전통 구름 패턴 */}
      <div className="absolute top-10 left-10 opacity-10">
        <svg width="100" height="60" viewBox="0 0 100 60" fill="currentColor">
          <path d="M20 30c0-11 9-20 20-20s20 9 20 20c5-5 12-5 17 0c8-8 20-8 28 0c-3 15-15 25-30 25H20c-11 0-20-9-20-20c0-5 2-9 5-12c8-3 15 2 15 7z"/>
        </svg>
      </div>
      
      <div className="absolute top-40 right-20 opacity-10">
        <svg width="80" height="48" viewBox="0 0 80 48" fill="currentColor">
          <path d="M16 24c0-9 7-16 16-16s16 7 16 16c4-4 10-4 14 0c6-6 16-6 22 0c-2 12-12 20-24 20H16c-9 0-16-7-16-16c0-4 2-7 4-10c6-2 12 2 12 6z"/>
        </svg>
      </div>

      {/* 태극 패턴 */}
      <div className="absolute bottom-20 left-1/4 opacity-5">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="60" r="50" stroke="currentColor" strokeWidth="2"/>
          <path d="M60 10 C85 10, 110 35, 110 60 C110 85, 85 110, 60 110 C35 110, 10 85, 10 60 C10 35, 35 10, 60 10" fill="currentColor" fillOpacity="0.1"/>
        </svg>
      </div>
    </div>
  );

  const renderEnglishElements = () => (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 영국/미국 스타일 장식 요소 */}
      <div className="absolute top-16 right-16 opacity-10">
        <svg width="120" height="80" viewBox="0 0 120 80" fill="currentColor">
          <rect x="10" y="10" width="100" height="60" rx="5" stroke="currentColor" strokeWidth="2" fill="none"/>
          <rect x="20" y="20" width="80" height="40" rx="3" fill="currentColor" fillOpacity="0.1"/>
        </svg>
      </div>

      <div className="absolute bottom-16 left-16 opacity-10">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="currentColor">
          <polygon points="50,10 90,90 10,90" fill="currentColor" fillOpacity="0.1"/>
          <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      </div>

      {/* 체크 패턴 */}
      <div className="absolute top-1/3 left-1/3 opacity-5">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="currentColor">
          <defs>
            <pattern id="checkerboard" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="10" height="10" fill="currentColor" fillOpacity="0.1"/>
              <rect x="10" y="10" width="10" height="10" fill="currentColor" fillOpacity="0.1"/>
            </pattern>
          </defs>
          <rect width="80" height="80" fill="url(#checkerboard)"/>
        </svg>
      </div>
    </div>
  );

  const renderSwissElements = () => (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 스위스 알프스 스타일 기하학적 요소 */}
      <div className="absolute top-12 left-1/4 opacity-10">
        <svg width="150" height="100" viewBox="0 0 150 100" fill="currentColor">
          <polygon points="25,80 75,20 125,80" fill="currentColor" fillOpacity="0.1"/>
          <polygon points="10,90 50,40 90,90" fill="currentColor" fillOpacity="0.05"/>
          <polygon points="60,90 100,40 140,90" fill="currentColor" fillOpacity="0.05"/>
        </svg>
      </div>

      <div className="absolute bottom-12 right-1/4 opacity-10">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
          <rect x="10" y="10" width="80" height="80" stroke="currentColor" strokeWidth="2"/>
          <rect x="20" y="20" width="60" height="60" stroke="currentColor" strokeWidth="1"/>
          <rect x="30" y="30" width="40" height="40" stroke="currentColor" strokeWidth="1"/>
        </svg>
      </div>

      {/* 십자가 패턴 */}
      <div className="absolute top-1/2 right-20 opacity-5">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="currentColor">
          <rect x="25" y="10" width="10" height="40"/>
          <rect x="10" y="25" width="40" height="10"/>
        </svg>
      </div>
    </div>
  );

  const renderBackgroundParticles = () => {
    if (background === 'christmas') {
      return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {/* 눈송이 효과 */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                fontSize: `${Math.random() * 20 + 10}px`,
              }}
            >
              ❄️
            </div>
          ))}
        </div>
      );
    }

    if (background === 'NewYear') {
      return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {/* 별 효과 */}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                fontSize: `${Math.random() * 15 + 8}px`,
              }}
            >
              ⭐
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <>
      {language === 'korean' && renderKoreanElements()}
      {language === 'english' && renderEnglishElements()}
      {language === 'swiss' && renderSwissElements()}
      {renderBackgroundParticles()}
    </>
  );
};

export default LanguageBackground; 