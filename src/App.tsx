import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';
import LanguageSettingsPage from './pages/LanguageSettingsPage';
import MusicProjectPage from './pages/MusicProjectPage';
import TravelPage from './pages/TravelPage';
import WhosePage from './pages/WhosePage';
import MinseokPage from './pages/member/MinseokPage';
import JaewonPage from './pages/member/JaewonPage';
import HanwoolPage from './pages/member/HanwoolPage';
import JingyuPage from './pages/member/JingyuPage';
import LanguageBackground from './components/LanguageBackground';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <LanguageBackground />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/member/minseok" element={<MinseokPage />} />
            <Route path="/member/jaewon" element={<JaewonPage />} />
            <Route path="/member/hanwool" element={<HanwoolPage />} />
            <Route path="/member/jingyu" element={<JingyuPage />} />
            <Route path="/*" element={
              <>
                <Header />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/music" element={<MusicProjectPage />} />
                  <Route path="/travel" element={<TravelPage />} />
                  <Route path="/whose" element={<WhosePage />} />
                  <Route path="/whose/:memberId" element={<WhosePage />} />
                  <Route path="/calendar" element={<div className="pt-24 text-white text-center">캘린더 페이지 (준비중)</div>} />
                  <Route path="/todo" element={<div className="pt-24 text-white text-center">할일 목록 페이지 (준비중)</div>} />
                  <Route path="/settings/theme" element={<LanguageSettingsPage />} />
                  <Route path="/settings/profile" element={<div className="pt-24 text-white text-center">개인정보 수정 페이지 (준비중)</div>} />
                  <Route path="/settings/others" element={<div className="pt-24 text-white text-center">기타 설정 페이지 (준비중)</div>} />
                  <Route path="/settings/*" element={<div className="pt-24 text-white text-center">설정 페이지 (준비중)</div>} />
                  <Route path="/search" element={<div className="pt-24 text-white text-center">검색 페이지 (준비중)</div>} />
                </Routes>
              </>
            } />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
