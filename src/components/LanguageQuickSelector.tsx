import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import { Globe, Settings } from 'lucide-react';
import languages from '../i18n';

const LanguageQuickSelector: React.FC = () => {
  const { language, setLanguage } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const text = languages[language];

  const languageOptions = [
    { code: 'korean' as const, label: '한국어', flag: '🇰🇷' },
    { code: 'english' as const, label: 'English', flag: '🇺🇸' },
    { code: 'swiss' as const, label: 'Deutsch', flag: '🇨🇭' }
  ];

  const currentLanguage = languageOptions.find(lang => lang.code === language);

  return (
    <div className="fixed bottom-32 right-6 z-30">
      {/* 메인 버튼 */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 group"
        >
          <Globe size={24} className="text-white group-hover:rotate-12 transition-transform" />
        </button>

        {/* 현재 언어 표시 */}
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-lg">
          {currentLanguage?.flag}
        </div>

        {/* 언어 옵션 메뉴 */}
        {isOpen && (
          <div className="absolute bottom-16 right-0 bg-gray-900 rounded-lg shadow-xl p-3 min-w-48 border border-gray-700">
            <div className="space-y-2">
              {languageOptions.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                    language === lang.code
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <span className="text-xl">{lang.flag}</span>
                  <span className="font-medium">{lang.label}</span>
                  {language === lang.code && (
                    <span className="ml-auto text-sm">✓</span>
                  )}
                </button>
              ))}
            </div>

            <hr className="my-3 border-gray-700" />

            {/* 상세 설정 링크 */}
            <Link
              to="/settings/theme"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200"
            >
              <Settings size={18} />
              <span className="font-medium">{text.languageSettings}</span>
            </Link>
          </div>
        )}
      </div>

      {/* 배경 클릭 감지용 오버레이 */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default LanguageQuickSelector; 