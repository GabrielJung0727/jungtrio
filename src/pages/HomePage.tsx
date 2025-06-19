import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import languages from '../i18n';
import SlideMenu from '../components/SlideMenu';
import WidgetManager from '../components/WidgetManager';
import LanguageQuickSelector from '../components/LanguageQuickSelector';

const HomePage: React.FC = () => {
  const bgImages = ['/images/albums/bg1.jpg', '/images/albums/bg2.jpg', '/images/albums/bg3.jpg', '/images/albums/bg4.jpg'];
  const [slideIndex, setSlideIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [search, setSearch] = useState('');

  const { language } = useTheme();
  const text = languages[language];
  const navigate = useNavigate();

  const ALLOWED_USERS = ['jingyu', 'jaewon', 'hanul', 'minseok'];
  const isAllowed = user && ALLOWED_USERS.includes(user.username);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?query=${encodeURIComponent(search.trim())}`);
    }
  };

  useEffect(() => {
    const data = localStorage.getItem('user');
    if (data) setUser(JSON.parse(data));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((i) => (i + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [bgImages.length]);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{ backgroundImage: `url(${bgImages[slideIndex]})` }}
      />
      <div className="absolute inset-0 bg-black opacity-60" />

      <div className="relative z-10 flex flex-col min-h-screen text-white">
        <SlideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)}>
          {/* 사이트 내 검색 */}
          <form onSubmit={handleSearch} className="mb-4 flex">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="사이트 내 검색..."
              className="flex-1 px-3 py-1 rounded-l bg-gray-800 text-white"
            />
            <button type="submit" className="px-3 bg-blue-600 rounded-r">
              검색
            </button>
          </form>

          {/* 위젯 설정 (권한 있는 사용자만) */}
          {isAllowed && (
            <div className="mb-4">
              <h3 className="font-semibold mb-2">위젯 설정</h3>
              <WidgetManager username={user.username} />
            </div>
          )}
        </SlideMenu>

        <section className="flex-1 flex flex-col items-center justify-center text-center mt-36 px-4">
          <h1 className="text-4xl font-bold mb-4">{text.welcomeMessage} 👋</h1>
          <p className="text-lg">{text.familyMessage}</p>
        </section>

        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {bgImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setSlideIndex(idx)}
              className={`w-3 h-3 rounded-full border-2 border-white transition-colors ${
                idx === slideIndex ? 'bg-white' : 'bg-transparent'
              }`}
            />
          ))}
        </div>

        {/* 언어 빠른 선택 위젯 */}
        <LanguageQuickSelector />
      </div>
    </main>
  );
};

export default HomePage; 