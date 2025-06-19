import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import languages from '../i18n';

const LanguageSettingsPage: React.FC = () => {
  const { language, background, setLanguage, setBackground } = useTheme();
  const text = languages[language];
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [selectedBackground, setSelectedBackground] = useState(background);

  const handleSave = () => {
    setLanguage(selectedLanguage);
    setBackground(selectedBackground);
    alert(languages[selectedLanguage].settingsSaved);
  };

  const languageOptions = [
    { value: 'korean' as const, label: '한국어', flag: '🇰🇷' },
    { value: 'english' as const, label: 'English', flag: '🇺🇸' },
    { value: 'swiss' as const, label: 'Deutsch', flag: '🇨🇭' }
  ];

  const backgroundOptions = [
    { value: 'basic' as const, label: text.theme_BS, color: '#222222' },
    { value: 'dark' as const, label: text.theme_D, color: '#000000' },
    { value: 'white' as const, label: text.theme_W, color: '#ffffff' },
    { value: 'christmas' as const, label: text.theme_CM, color: '#b30000' },
    { value: 'NewYear' as const, label: text.theme_NY, color: '#0d47a1' }
  ];

  return (
    <div className="pt-24 px-6 max-w-4xl mx-auto">
      <div className="bg-gray-900 rounded-lg p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          {text.languageSettings}
        </h1>

        {/* 언어 설정 섹션 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">{text.selectLanguage}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {languageOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedLanguage(option.value)}
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                  selectedLanguage === option.value
                    ? 'border-blue-500 bg-blue-900/50 text-white'
                    : 'border-gray-600 bg-gray-800 text-gray-300 hover:border-blue-400'
                }`}
              >
                <div className="text-3xl mb-2">{option.flag}</div>
                <div className="text-lg font-medium">{option.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 배경 테마 설정 섹션 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">{text.selectTheme}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {backgroundOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedBackground(option.value)}
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                  selectedBackground === option.value
                    ? 'border-blue-500 bg-blue-900/50'
                    : 'border-gray-600 bg-gray-800 hover:border-blue-400'
                }`}
              >
                <div 
                  className="w-full h-16 rounded mb-3 border border-gray-500"
                  style={{ backgroundColor: option.color }}
                ></div>
                <div className="text-white font-medium">{option.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 미리보기 섹션 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">{text.preview}</h2>
          <div 
            className="p-6 rounded-lg border border-gray-600"
            style={{ 
              backgroundColor: backgroundOptions.find(b => b.value === selectedBackground)?.color,
              color: selectedBackground === 'white' ? '#000000' : '#ffffff'
            }}
          >
            <h3 className="text-lg font-bold mb-2">
              {languages[selectedLanguage].homeTitle}
            </h3>
            <p className="mb-2">{languages[selectedLanguage].welcomeMessage}</p>
            <p className="text-sm opacity-80">{languages[selectedLanguage].familyMessage}</p>
          </div>
        </div>

        {/* 저장 버튼 */}
        <div className="text-center">
          <button
            onClick={handleSave}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
          >
            {text.saveSettings}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSettingsPage; 