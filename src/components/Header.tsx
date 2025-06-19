import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import SlideMenu from './SlideMenu';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useTheme } from '../context/ThemeContext';
import languages from '../i18n';

dayjs.extend(utc);
dayjs.extend(timezone);

const Header: React.FC = () => {
  // 시계 상태
  const [times, setTimes] = useState({
    seoul: '', vancouver: '', lucerne: '',
    dates: { seoul: '', vancouver: '', lucerne: '' },
  });
  // UI 상태
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPersonalSettings, setShowPersonalSettings] = useState(false);
  const [user, setUser] = useState<any>(null);

  // 테마/언어
  const { language } = useTheme();
  const text = languages[language];

  // 사용자 로드
  useEffect(() => {
    const data = localStorage.getItem('user');
    if (data) setUser(JSON.parse(data));
  }, []);

  // 시계 업데이트
  useEffect(() => {
    const update = () => {
      const now = dayjs();
      setTimes({
        seoul: now.tz('Asia/Seoul').locale('ko').format('A hh:mm:ss'),
        vancouver: now.tz('America/Vancouver').locale('en').format('hh:mm:ss A'),
        lucerne: now.tz('Europe/Zurich').locale('de').format('HH:mm:ss'),
        dates: {
          seoul: now.tz('Asia/Seoul').locale('ko').format('YYYY년 MM월 DD일'),
          vancouver: now.tz('America/Vancouver').locale('en').format('MMMM DD, YYYY'),
          lucerne: now.tz('Europe/Zurich').locale('de').format('DD.MM.YYYY'),
        },
      });
    };
    update();
    const iv = setInterval(update, 1000);
    return () => clearInterval(iv);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <>
      <header className="fixed top-0 w-full flex justify-between items-center px-6 py-4 h-20 bg-black text-white z-30">
        <h1 className="text-xl font-bold">{text.homeTitle}</h1>

        <div className="flex flex-col items-center">
          <div className="flex gap-4 text-sm">
            <span>🇨🇦 {times.dates.vancouver} {times.vancouver}</span>
            <span>🇰🇷 {times.dates.seoul} {times.seoul}</span>
            <span>🇨🇭 {times.dates.lucerne} {times.lucerne}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 relative">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowPersonalSettings((p) => !p)}
                className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
              >
                {user.name}님, 반갑습니다!
              </button>
              {showPersonalSettings && (
                <div className="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded shadow-lg p-4">
                  <h2 className="text-sm font-semibold mb-2">개인 설정</h2>
                  <ul className="text-sm space-y-2">
                    <li>
                      <Link to="/settings/theme" className="text-blue-400 hover:underline">
                        언어/배경 테마 설정
                      </Link>
                    </li>
                    <li>
                      <Link to="/settings/profile" className="text-blue-400 hover:underline">
                        개인정보 수정
                      </Link>
                    </li>
                    <li>
                      <Link to="/settings/others" className="text-blue-400 hover:underline">
                        기타 설정
                      </Link>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="text-blue-400 hover:underline">
                        로그아웃
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">
              {text.login}
            </Link>
          )}

          <button
            onClick={() => setMenuOpen(true)}
            className="p-2 bg-gray-700 rounded hover:bg-gray-600"
          >
            <Menu size={24} className="text-white" />
          </button>
        </div>
      </header>

      <SlideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)}>
        <div className="space-y-4">
          <Link to="/about" className="block py-2 hover:text-blue-400">About 랑구</Link>
          <Link to="/music" className="block py-2 hover:text-blue-400">Music Project</Link>
          <Link to="/travel" className="block py-2 hover:text-blue-400">Our Travel</Link>
          <Link to="/whose" className="block py-2 hover:text-blue-400">Whose</Link>
          {user && ['jingyu', 'jaewon', 'hanul', 'minseok'].includes(user.username) && (
            <>
              <hr className="border-gray-600" />
              <Link to="/calendar" className="block py-2 hover:text-blue-400">Calendar</Link>
              <Link to="/todo" className="block py-2 hover:text-blue-400">Todo List</Link>
            </>
          )}
        </div>
      </SlideMenu>
    </>
  );
};

export default Header; 