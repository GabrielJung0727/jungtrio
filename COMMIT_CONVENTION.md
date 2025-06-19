# 커밋 규칙 (Commit Convention)

본 프로젝트에서는 다음과 같은 커밋 컨벤션을 따릅니다.

## 커밋 메시지 형식

```
<type>: <description>

[optional body]

[optional footer]
```

## 커밋 유형 (Types)

| 커밋 유형 | 설명 |
|----------|------|
| **feat** | 새로운 기능 추가 |
| **fix** | 버그 수정 |
| **docs** | 문서 수정 |
| **style** | 코드 formatting, 세미콜론 누락, 코드 자체의 변경이 없는 경우 |
| **refactor** | 코드 리팩토링 |
| **test** | 테스트 코드, 리팩토링 테스트 코드 추가 |
| **chore** | 패키지 매니저 수정, 그 외 기타 수정 ex) .gitignore |
| **design** | CSS 등 사용자 UI 디자인 변경 |
| **comment** | 필요한 주석 추가 및 변경 |
| **rename** | 파일 또는 폴더 명을 수정하거나 옮기는 작업만인 경우 |
| **remove** | 파일을 삭제하는 작업만 수행한 경우 |
| **!BREAKING CHANGE** | 커다란 API 변경의 경우 |
| **!HOTFIX** | 급하게 치명적인 버그를 고쳐야 하는 경우 |

## 예시

### 기본 커밋

```bash
feat: 음악 플레이어 기능 추가
fix: 로그인 오류 수정
docs: README 업데이트
style: 코드 포맷팅 적용
refactor: 컴포넌트 구조 개선
test: 사용자 인증 테스트 추가
chore: 의존성 패키지 업데이트
design: 메인 페이지 UI 개선
comment: API 호출 함수 주석 추가
rename: 컴포넌트 파일명 변경
remove: 사용하지 않는 이미지 파일 삭제
```

### Breaking Changes

```bash
!BREAKING CHANGE: Next.js에서 React로 프레임워크 전환
```

### Hotfix

```bash
!HOTFIX: 프로덕션 환경 배포 오류 긴급 수정
```

## 커밋 메시지 작성 가이드라인

1. **첫 번째 줄**: 50자 이내로 간결하게 작성
2. **명령문 형태**: "추가한다", "수정한다" 대신 "추가", "수정" 형태 사용
3. **한국어 사용**: 프로젝트가 한국어 기반이므로 한국어로 작성
4. **구체적으로**: 무엇을 변경했는지 명확하게 명시

## 브랜치 전략

- **main**: 프로덕션 배포 브랜치
- **develop**: 개발 통합 브랜치  
- **feature/***: 새로운 기능 개발
- **hotfix/***: 긴급 버그 수정
- **release/***: 릴리즈 준비

---

이 규칙을 따라 일관성 있는 커밋 히스토리를 유지합시다! 🚀 