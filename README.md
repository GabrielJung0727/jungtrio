# R.랑구 (Jung Trio) - React Version

중랑구 패밀리를 위한 개인화된 포털 사이트입니다.

## 🎯 프로젝트 소개

랑구팸은 네 명의 친구들(진규, 재원, 한울, 민석)이 모인 특별한 가족을 위한 웹사이트입니다. 음악, 여행, 추억을 공유하는 디지털 공간입니다.

## 🌟 주요 기능

- **다국어 지원**: 한국어, 영어, 독일어
- **실시간 세계시계**: 서울, 밴쿠버, 루체른 시간 표시
- **개인 위젯 시스템**: 사용자별 맞춤형 바로가기 (최대 6개)
- **배경 슬라이드쇼**: 자동 순환하는 배경 이미지
- **사용자 인증**: 로컬스토리지 기반 로그인 시스템
- **테마 시스템**: 크리스마스, 새해, 기본, 다크, 화이트 테마

## 🚀 시작하기

### 개발 서버 실행

```bash
npm start
```

브라우저에서 [http://localhost:3000](http://localhost:3000)를 열어 확인하세요.

### 프로덕션 빌드

```bash
npm run build
```

### GitHub Pages 배포

```bash
npm run deploy
```

## 👥 테스트 계정

- **사용자명**: jingyu, jaewon, hanul, minseok, guest
- **비밀번호**: 각 사용자별로 설정된 비밀번호 (데이터 파일 참조)

## 🏗️ 기술 스택

- **Frontend**: React 18, TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Date/Time**: dayjs
- **Icons**: Lucide React
- **Build Tool**: Create React App

## 📁 프로젝트 구조

```
src/
├── components/     # 재사용 컴포넌트
├── context/        # React Context (테마 관리)
├── data/          # JSON 데이터 파일
├── i18n/          # 다국어 리소스
├── pages/         # 페이지 컴포넌트
└── utils/         # 유틸리티 함수
```

## 🎨 테마 및 다국어

- **언어**: Context API를 통한 전역 언어 설정
- **테마**: HTML 클래스 기반 테마 전환
- **로컬스토리지**: 사용자 설정 자동 저장

## 📱 반응형 디자인

모든 페이지는 모바일, 태블릿, 데스크톱에서 최적화되어 작동합니다.

## 🔐 보안

- 클라이언트 사이드 인증 (개발용)
- 로컬스토리지 기반 세션 관리
- 권한 기반 기능 접근 제어

---

**Note**: 이 프로젝트는 Next.js에서 React로 포팅된 버전입니다.
