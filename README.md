# Creami Front

호텔 관리 시스템 통합 프론트엔드 프로젝트

## 프로젝트 구조

이 프로젝트는 Monorepo 구조로 5개의 독립적인 Next.js 애플리케이션으로 구성되어 있습니다.

```
creami-front/
├── apps/
│   ├── home/           # 메인 대시보드 (포트 3000)
│   ├── accommodation/  # 숙소 관리 (포트 3001)
│   ├── ari/            # ARI 관리 (포트 3002)
│   ├── discount/       # 할인 관리 (포트 3003)
│   └── booking/        # 예약 관리 (포트 3004)
└── package.json
```

## 기술 스택

- **Framework**: Next.js 16.2.4 (App Router)
- **Runtime**: React 19.2.4
- **Language**: TypeScript 5
- **Package Manager**: pnpm
- **Build Tool**: Turbopack
- **Styling**: CSS Variables + Tailwind CSS
- **Icons**: Lucide React
- **Font**: Pretendard Variable (300, 500, 700)

## 개발 서버 실행

### 모든 앱 동시 실행

터미널에서 각각 별도로 실행:

```bash
# 터미널 1
npm run dev:home

# 터미널 2
npm run dev:accommodation

# 터미널 3
npm run dev:booking

# 터미널 4
npm run dev:ari

# 터미널 5
npm run dev:discount
```

### 개별 앱 실행

```bash
# Home 앱 (포트 3000)
npm run dev:home

# Accommodation 앱 (포트 3001)
npm run dev:accommodation

# Booking 앱 (포트 3002)
npm run dev:booking

# ARI 앱 (포트 3003)
npm run dev:ari

# Discount 앱 (포트 3004)
npm run dev:discount
```

## 접속 URL

모든 앱 실행 후 다음 URL로 접속 가능:

- **Home**: http://localhost:3000
- **Accommodation**: http://localhost:3001
- **Booking**: http://localhost:3002
- **ARI**: http://localhost:3003
- **Discount**: http://localhost:3004

## 개발 서버 종료

### 실행 중인 모든 개발 서버 종료

```bash
# 포트 3000-3004를 사용하는 모든 프로세스 종료
lsof -ti:3000,3001,3002,3003,3004 | xargs kill -9
```

### 개별 프로세스 종료

각 터미널에서 `Ctrl + C`를 눌러 종료

또는 특정 포트만 종료:

```bash
# Home 앱 종료 (포트 3000)
lsof -ti:3000 | xargs kill -9

# ARI 앱 종료 (포트 3003)
lsof -ti:3003 | xargs kill -9
```

## 빌드

### 모든 앱 빌드

```bash
npm run build:all
```

### 개별 앱 빌드

```bash
# Home 앱
npm run build:home

# Accommodation 앱
npm run build:accommodation

# Booking 앱
npm run build:booking

# ARI 앱
npm run build:ari

# Discount 앱
npm run build:discount
```

## 주요 기능

### 공통 기능
- Atlassian 스타일 사이드바 (접기/펼치기)
- 앱 전환 기능 (App Switcher)
- 다크모드/라이트모드 지원
- 반응형 디자인

### ARI 앱 (Availability, Rates, Inventory)
- **요금 관리**: 캘린더 그리드 뷰, 드래그 선택, 일괄 수정/등록
- **재고 관리**: Week/Month/All 뷰 모드, 일괄 등록
- 패키지 기준/객실 기준 검색 조건

### Accommodation 앱
- 숙소 목록 관리
- 객실 타입 관리
- 요금제 관리

## 디자인 시스템

### 컬러
- **Primary**: #fa8383
- CSS Variables 기반 테마 시스템

### 타이포그래피
- **Font Family**: Pretendard Variable
- **Font Weights**:
  - Light: 300
  - Medium: 500
  - Bold: 700

### Border Radius
- 기본: 16px (`var(--radius)`)
- 작은 요소: 8px (`var(--radius-sm)`)

### 아이콘
- **Library**: Lucide React
- **참고**: https://lucide.dev/

## 트러블슈팅

### 포트가 이미 사용 중일 때

```bash
# 사용 중인 포트 확인
lsof -i:3000
lsof -i:3001
lsof -i:3002
lsof -i:3003
lsof -i:3004

# 해당 포트 프로세스 종료
lsof -ti:3000 | xargs kill -9
```

### 빌드 에러 발생 시

```bash
# node_modules 삭제 후 재설치
rm -rf node_modules
rm -rf apps/*/node_modules
pnpm install

# Next.js 캐시 클리어
rm -rf apps/*/.next
```

## 프로젝트 규칙

1. **컬러는 primary #fa8383만 사용**
2. **폰트는 Pretendard (Bold 700, Medium 500, Light 300)**
3. **아이콘은 Lucide React 사용**
4. **Radius는 16px 고정**
5. **style.css의 var() 변수만 사용 (하드코딩 금지)**
6. **그라디언트 사용 금지, 플랫한 미니멀 디자인**
7. **다크모드 우선 개발**
8. **반드시 빌드 성공 확인**

## 라이센스

Private
