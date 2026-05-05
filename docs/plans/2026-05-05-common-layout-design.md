# 공통 레이아웃 설계

## 개요

AGENTS.md의 디자인 규칙을 따르는 공통 레이아웃 시스템을 구축하여 3개 앱(accommodation, ari, discount)에 적용했습니다.

## 디자인 규칙 (AGENTS.md 기반)

### 컬러
- Primary: `#fa8383`
- CSS 변수 시스템 사용 (하드코딩 금지)

### 타이포그래피
- 폰트: Pretendard (CDN)
- Font Weight: Light 300, Medium 500, Bold 700만 사용

### UI 요소
- Border Radius: 16px (기본), 8px (small), 24px (large)
- 아이콘: Lucide React
- 플랫한 미니멀 디자인 (그라디언트 사용 안 함)
- Subtle shadows만 사용

### 테마
- 다크모드 우선 개발
- 라이트모드도 지원
- next-themes로 테마 관리

### 레이아웃
- SB Admin 스타일 참고
- 고정 Header + Sidebar 레이아웃
- 헤더 왼쪽에 앱 전환 기능

## 아키텍처

### 기술 스택
- **lucide-react**: 아이콘 라이브러리
- **next-themes**: 다크모드 관리
- **Pretendard Variable**: 웹폰트 (CDN)

### 파일 구조

```
app/
├── layout.tsx              # 루트 레이아웃
├── page.tsx               # 대시보드
├── globals.css            # Tailwind import
├── styles.css             # CSS 변수 정의
├── providers.tsx          # ThemeProvider
components/
├── layout/
│   ├── Header.tsx         # 상단 헤더
│   ├── Sidebar.tsx        # 사이드바
│   ├── MainLayout.tsx     # 전체 레이아웃
│   └── AppSwitcher.tsx    # 앱 전환 모달
└── ui/
    └── ThemeToggle.tsx    # 다크모드 토글
lib/
└── constants.ts           # 앱 정보 상수
.env.local                 # 환경변수 (APP_ID)
```

## CSS 변수 시스템

### styles.css 구조

```css
:root {
  /* Primary Color */
  --primary: #fa8383;
  --primary-hover: #fb9999;
  --primary-active: #f96d6d;

  /* Radius */
  --radius: 16px;
  --radius-sm: 8px;
  --radius-lg: 24px;

  /* Light Mode */
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --bg-tertiary: #e9ecef;
  --text-primary: #212529;
  --text-secondary: #6c757d;
  --border-color: #dee2e6;
}

[data-theme='dark'] {
  /* Dark Mode */
  --bg-primary: #1a1d23;
  --bg-secondary: #222630;
  --bg-tertiary: #2c303a;
  --text-primary: #f8f9fa;
  --text-secondary: #adb5bd;
  --border-color: #3a3f4b;
}
```

모든 컴포넌트는 `var(--변수명)` 형식으로 CSS 변수 사용

## 레이아웃 구조

```
┌─────────────────────────────────────────┐
│ Header (h: 64px, 고정)                   │
│ [앱전환] Logo  ...  [테마] [User]        │
├──────┬──────────────────────────────────┤
│      │                                  │
│ Side │  Main Content                    │
│ bar  │  (padding: 24px)                 │
│      │                                  │
│(240px│  (bg: --bg-secondary)            │
│/64px)│                                  │
└──────┴──────────────────────────────────┘
```

### Header
- 높이: 64px
- 배경: `var(--bg-primary)`
- Border-bottom: `var(--border-color)`
- 왼쪽: AppSwitcher (Grid 아이콘 + 현재 앱 이름)
- 오른쪽: ThemeToggle + User 버튼

### Sidebar
- 너비: 240px (펼침) / 64px (접힘)
- 토글 가능
- 메뉴 아이템: 아이콘 + 텍스트
- 활성 메뉴: Primary 컬러 배경
- 각 앱별 메뉴 커스터마이징 가능

### MainLayout
- 왼쪽 마진: Sidebar 너비만큼
- 상단 패딩: Header 높이만큼
- 내부 패딩: 24px
- 배경: `var(--bg-secondary)`

## 앱 전환 기능

### 앱 정보 (lib/constants.ts)

```typescript
export const APPS = [
  {
    id: 'accommodation',
    name: 'Creami Accommodation',
    url: 'http://localhost:3000',
    icon: 'Home',
    color: '#fa8383'
  },
  {
    id: 'ari',
    name: 'Creami ARI',
    url: 'http://localhost:3001',
    icon: 'BarChart3',
    color: '#fa8383'
  },
  {
    id: 'discount',
    name: 'Creami Discount',
    url: 'http://localhost:3002',
    icon: 'Tag',
    color: '#fa8383'
  }
]

export const CURRENT_APP_ID = process.env.NEXT_PUBLIC_APP_ID || 'accommodation'
```

### AppSwitcher 컴포넌트
- Grid 아이콘 버튼 클릭 시 모달 표시
- 3개 앱을 카드 형태로 나열
- 현재 앱은 Primary 컬러로 하이라이트
- 다른 앱 클릭 시 `window.location.href`로 이동

### 환경변수 (.env.local)
각 앱마다:
```
NEXT_PUBLIC_APP_ID=accommodation  # 또는 ari, discount
```

## 컴포넌트 상세

### ThemeToggle
- Sun/Moon 아이콘 토글
- next-themes의 useTheme 사용
- 배경: `var(--bg-tertiary)`

### Providers
- ThemeProvider 설정
- `defaultTheme="dark"` (다크모드 우선)
- `suppressHydrationWarning` 적용

### Sidebar 메뉴 예시 (Accommodation)
- 대시보드 (LayoutDashboard)
- 예약 관리 (Calendar)
- 객실 관리 (Home)
- 고객 관리 (Users)
- 설정 (Settings)

## 배포 전략

### 템플릿 베이스 접근
1. accommodation 앱에 먼저 구현
2. 테스트 및 검증
3. ari, discount 앱에 복사
4. 각 앱별 커스터마이징:
   - `CURRENT_APP_ID` 변경
   - `.env.local` 설정
   - Sidebar 메뉴 항목 수정
   - 메타데이터 (title, description)

### 유지보수
- 공통 변경사항은 3개 앱 모두 수동 반영
- 향후 shared package로 전환 고려 가능

## 개발 가이드

### 새 페이지 추가
1. `app/` 디렉토리에 폴더/파일 생성
2. CSS 변수만 사용 (하드코딩 금지)
3. Lucide 아이콘 사용
4. 플랫한 디자인 유지

### 스타일링 원칙
```tsx
// ✅ Good - CSS 변수 사용
<div style={{
  backgroundColor: 'var(--bg-primary)',
  borderRadius: 'var(--radius)',
  color: 'var(--text-primary)'
}}>

// ❌ Bad - 하드코딩
<div style={{
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  color: '#212529'
}}>
```

### Font Weight 사용
```tsx
// Light
<p style={{ fontWeight: 'var(--font-light)' }}>

// Medium (기본)
<p style={{ fontWeight: 'var(--font-medium)' }}>

// Bold
<h1 style={{ fontWeight: 'var(--font-bold)' }}>
```

## 테스트 결과

### accommodation 앱
- ✅ 다크모드 전환 정상 동작
- ✅ 앱 전환 모달 동작
- ✅ Sidebar 토글 동작
- ✅ Pretendard 폰트 로드
- ✅ CSS 변수 적용

### ari 앱
- ✅ 레이아웃 복사 완료
- ✅ APP_ID 설정 완료
- ✅ 대시보드 커스터마이징

### discount 앱
- ✅ 레이아웃 복사 완료
- ✅ APP_ID 설정 완료
- ✅ 대시보드 커스터마이징

## 향후 개선 사항

1. **공유 컴포넌트 라이브러리**
   - `packages/shared-ui` 생성
   - 공통 레이아웃 패키지화

2. **반응형 개선**
   - 모바일 사이드바 드로어
   - 태블릿 레이아웃 최적화

3. **접근성**
   - ARIA 라벨 추가
   - 키보드 네비게이션 개선

4. **성능 최적화**
   - 컴포넌트 코드 스플리팅
   - 폰트 최적화 (woff2만 사용)

5. **추가 기능**
   - 사용자 프로필 메뉴
   - 알림 시스템
   - 검색 기능