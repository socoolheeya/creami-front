# 요금제 관리 페이지 재설계

## 개요

숙소를 검색/선택하고 해당 숙소의 요금제를 필터링하여 관리하는 페이지를 재설계합니다.

## 요구사항

1. **숙소 선택**: 상단에 숙소 검색 및 선택 기능
2. **필터링**: 상태별 필터 + 텍스트 검색
3. **뷰 전환**: 테이블 뷰 ↔ 카드 그리드 뷰 토글
4. **디자인 규칙 준수**: AGENTS.md의 RULE 준수

## 컴포넌트 구조

### 1. 메인 페이지 (`/app/rateplans/page.tsx`)
- 전체 상태 관리
- AccommodationSelector (재사용)
- FilterBar (신규)
- RatePlanTableView (신규)
- RatePlanCardView (신규)

### 2. FilterBar 컴포넌트
**위치**: `/app/rateplans/components/FilterBar.tsx`

**기능**:
- 상태 필터 (All, Draft, Active, Inactive)
- 텍스트 검색 (요금제명, 혜택명)
- 뷰 모드 토글 (Table ↔ Card)

**UI 요소**:
- 상태 필터: 버튼 그룹 형태
- 검색: Search 아이콘 + input
- 뷰 토글: Table/LayoutGrid 아이콘 버튼

### 3. RatePlanTableView 컴포넌트
**위치**: `/app/rateplans/components/RatePlanTableView.tsx`

**표시 컬럼**:
1. 요금제명 (한글/영문)
2. 상태 (Badge)
3. 혜택명
4. 유형
5. 식사 포함
6. 최소/최대 숙박
7. 액션 (상세보기/수정 링크)

**특징**:
- 반응형: 모바일에서는 중요 컬럼만 표시
- Hover 효과
- 클릭 시 상세 페이지 이동

### 4. RatePlanCardView 컴포넌트
**위치**: `/app/rateplans/components/RatePlanCardView.tsx`

**기존 카드 레이아웃 재사용**:
- 요금제 정보
- 혜택명
- 설정 정보
- 판매 기간

## 상태 관리

```typescript
interface RatePlanPageState {
  selectedAccommodationId: string | null
  viewMode: 'table' | 'card'
  statusFilter: RatePlanStatus | 'all'
  searchQuery: string
}
```

## 데이터 흐름

1. `selectedAccommodationId` → 객실 필터링 → 요금제 필터링
2. `statusFilter` → 상태별 필터링
3. `searchQuery` → 이름/혜택명 검색
4. `viewMode` → TableView / CardView 렌더링

## 디자인 가이드

### 색상
- Primary: `#fa8383`
- CSS Variables 사용 (하드코딩 금지)

### 타이포그래피
- 프리텐다드 폰트
- Bold 700, Medium 500, Light 300

### 아이콘
- Lucide 아이콘 사용

### Radius
- 16px (var(--radius-lg))

### 스타일
- 플랫한 미니멀 디자인
- 그라디언트 사용 금지
- 다크모드 우선

## 구현 순서

1. FilterBar 컴포넌트 생성
2. RatePlanTableView 컴포넌트 생성
3. RatePlanCardView 컴포넌트 생성 (기존 코드 분리)
4. 메인 페이지 업데이트
5. 테스트 및 검증