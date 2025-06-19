import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'korean' | 'english' | 'swiss';
type Background = 'christmas' | 'NewYear' | 'basic' | 'dark' | 'white';

interface ThemeContextType {
  language: Language;
  background: Background;
  setLanguage: (lang: Language) => void;
  setBackground: (bg: Background) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('korean');
  const [background, setBackground] = useState<Background>('basic');

  // 로컬스토리지에서 설정 불러오기
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    const savedBackground = localStorage.getItem('background') as Background;
    
    if (savedLanguage) setLanguage(savedLanguage);
    if (savedBackground) setBackground(savedBackground);
  }, []);

  // 언어 변경 시 로컬스토리지 저장 및 HTML 클래스 업데이트
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    document.documentElement.className = document.documentElement.className
      .replace(/lang-\w+/g, '') + ` lang-${lang}`;
  };

  // 배경 변경 시 로컬스토리지 저장 및 HTML 클래스 업데이트
  const handleBackgroundChange = (bg: Background) => {
    setBackground(bg);
    localStorage.setItem('background', bg);
    document.documentElement.className = document.documentElement.className
      .replace(/bg-\w+/g, '') + ` bg-${bg}`;
  };

  // 초기 클래스 설정
  useEffect(() => {
    document.documentElement.className = `lang-${language} bg-${background}`;
  }, [language, background]);

  return (
    <ThemeContext.Provider
      value={{
        language,
        background,
        setLanguage: handleLanguageChange,
        setBackground: handleBackgroundChange,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 