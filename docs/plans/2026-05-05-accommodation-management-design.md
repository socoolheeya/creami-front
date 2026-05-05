# 숙소 관리 기능 설계

## 개요

숙소(Accommodation) 관리 기능을 Step-by-Step Wizard 방식으로 구현합니다.
사용자가 직관적으로 숙소를 등록하고 관리할 수 있도록 단계별 진행 UI를 제공합니다.

## 페이지 구조

### 라우팅
- `/accommodations` - 숙소 리스트 (카드 그리드)
- `/accommodations/new` - 신규 숙소 등록 (Wizard)
- `/accommodations/[id]` - 숙소 상세 보기
- `/accommodations/[id]/edit` - 숙소 수정 (Wizard)
- `/rooms` - 객실 관리
- `/pricing` - 요금제 관리

### 사이드바 메뉴 업데이트
```
- 대시보드
- 숙소 관리 (NEW)
- 객실 관리
- 요금제 관리 (NEW)
- 예약 관리
- 고객 관리
- 설정
```

## 데이터 구조

### Accommodation 타입
```typescript
interface Accommodation {
  id: string

  // Step 1: 기본정보
  name: string
  type: 'hotel' | 'motel' | 'pension' | 'guesthouse'
  address: string
  phone: string
  email: string
  checkIn: string  // "15:00"
  checkOut: string // "11:00"

  // Step 2: Description
  description: string
  amenities: string[]  // WiFi, 주차장, 조식 등

  // Step 3: Images
  images: {
    id: string
    url: string
    isPrimary: boolean
    order: number
  }[]

  // Step 4: Billing Policy
  billingPolicy: {
    cancellationPolicy: string
    depositPolicy: string
    paymentMethods: string[]  // 현금, 카드, 계좌이체 등
  }

  status: 'active' | 'inactive'
  createdAt: Date
  updatedAt: Date
}
```

## 숙소 리스트 페이지

### 레이아웃
```
┌─────────────────────────────────────────┐
│ Header: 숙소 관리                        │
│ [검색] [필터] [정렬]        [+ 신규등록] │
├─────────────────────────────────────────┤
│ ┌──────┐ ┌──────┐ ┌──────┐              │
│ │ 이미지│ │ 이미지│ │ 이미지│              │
│ │      │ │      │ │      │              │
│ │ 호텔명│ │ 호텔명│ │ 호텔명│              │
│ │ 주소  │ │ 주소  │ │ 주소  │              │
│ │[수정] │ │[수정] │ │[수정] │              │
│ └──────┘ └──────┘ └──────┘              │
└─────────────────────────────────────────┘
```

### 카드 컴포넌트
- **썸네일**: 대표 이미지 (16:9 비율, 높이 200px)
- **상태 뱃지**: 우측 상단 (활성/비활성)
- **숙소명**: Bold, 18px
- **숙소 타입**: 호텔/모텔/펜션/게스트하우스
- **주소**: 한 줄 요약
- **통계**: 객실 수, 예약 건수 (추후 확장)
- **액션 버튼**:
  - 수정 (Primary 버튼)
  - 더보기 메뉴 (복제, 삭제, 상태변경)

### 상단 기능
- **검색**: 숙소명, 주소로 실시간 검색
- **필터**: 타입별, 상태별 필터링
- **정렬**: 최신순, 이름순
- **신규 등록 버튼**: Primary 컬러, 우측 상단 고정

### Empty State
- 숙소가 없을 때 안내 메시지
- "첫 숙소를 등록해보세요" 액션 버튼

## Wizard UI (단계별 등록/수정)

### 전체 레이아웃
```
┌─────────────────────────────────────────┐
│ [1 기본정보] → [2 설명] → [3 이미지] → [4 정책] │
│    ●            ○          ○           ○     │
├─────────────────────────────────────────┤
│                                         │
│         현재 단계 폼 내용                 │
│                                         │
│                                         │
├─────────────────────────────────────────┤
│ [< 이전]                      [다음 >]  │
│                        (마지막: [완료]) │
└─────────────────────────────────────────┘
```

### Step 1: 기본정보
**필드:**
- 숙소명 (필수, 텍스트)
- 숙소 타입 (필수, 드롭다운: 호텔/모텔/펜션/게스트하우스)
- 주소 (필수, 텍스트 + 우편번호 검색)
- 전화번호 (필수, 형식 검증)
- 이메일 (선택, 형식 검증)
- 체크인 시간 (필수, 시간 선택기)
- 체크아웃 시간 (필수, 시간 선택기)

**유효성 검사:**
- 모든 필수 필드 입력 확인
- 전화번호, 이메일 형식 검증

### Step 2: 설명
**필드:**
- 숙소 설명 (선택, Textarea 또는 리치 에디터)
  - 최대 2000자
  - 줄바꿈 지원
- 편의시설 (선택, 체크박스 그리드)
  - 기본 옵션: WiFi, 주차장, 조식, 수영장, 피트니스, 레스토랑
  - 커스텀 추가 가능

### Step 3: 이미지
**기능:**
- 드래그앤드롭 업로드 영역
  - 점선 테두리
  - "이미지를 드래그하거나 클릭하여 업로드" 안내
- 클릭하여 파일 선택 (multiple)
- 업로드된 이미지 관리
  - 썸네일 그리드 (4열)
  - 드래그로 순서 변경
  - 별 아이콘으로 대표 이미지 설정
  - X 버튼으로 삭제
- 최대 10장 제한
- 지원 형식: JPG, PNG, WebP
- 최대 파일 크기: 5MB

**미리보기:**
- 업로드 즉시 썸네일 표시
- 로딩 상태 표시 (스피너)
- 에러 처리 (크기 초과, 형식 불일치)

### Step 4: 결제/취소 정책
**필드:**
- 취소 정책 (선택, Textarea)
  - 예: "체크인 7일 전까지 무료 취소"
- 보증금 정책 (선택, Textarea)
  - 예: "체크인 시 10만원 보증금"
- 결제 수단 (선택, 체크박스)
  - 현금, 카드, 계좌이체, 간편결제

### 공통 기능
- **진행률 표시**: 상단에 1/4, 2/4, 3/4, 4/4
- **임시 저장**:
  - localStorage에 자동 저장
  - 페이지 재진입 시 복원 옵션
- **뒤로가기 경고**:
  - 미저장 데이터 있을 시 확인 다이얼로그
- **단계별 유효성 검사**:
  - 필수 필드 미입력 시 다음 단계로 이동 불가
  - 에러 메시지 표시

## 파일 구조

```
app/
├── accommodations/
│   ├── page.tsx                    # 리스트 페이지
│   ├── new/
│   │   └── page.tsx                # 신규 등록 Wizard
│   ├── [id]/
│   │   ├── page.tsx                # 상세 페이지
│   │   └── edit/
│   │       └── page.tsx            # 수정 Wizard
│   └── components/
│       ├── AccommodationCard.tsx   # 카드 컴포넌트
│       ├── AccommodationList.tsx   # 리스트 컨테이너
│       ├── EmptyState.tsx          # 빈 상태
│       ├── SearchBar.tsx           # 검색/필터
│       ├── wizard/
│       │   ├── WizardContainer.tsx # Wizard 레이아웃
│       │   ├── StepIndicator.tsx   # 진행률 표시
│       │   ├── Step1Basic.tsx      # 기본정보 폼
│       │   ├── Step2Description.tsx # 설명 폼
│       │   ├── Step3Images.tsx     # 이미지 업로드
│       │   ├── Step4Policy.tsx     # 정책 폼
│       │   └── WizardNavigation.tsx # 이전/다음 버튼
│       └── ImageUploader.tsx       # 드래그앤드롭
components/
└── ui/
    ├── FormInput.tsx               # 공통 입력 필드
    ├── FormSelect.tsx              # 드롭다운
    ├── FormTextarea.tsx            # 텍스트 영역
    ├── TimePicker.tsx              # 시간 선택
    └── Toast.tsx                   # 알림 메시지
lib/
├── types/
│   └── accommodation.ts            # 타입 정의
└── hooks/
    ├── useAccommodations.ts        # 데이터 fetching
    └── useWizard.ts                # Wizard 상태 관리
```

## 상태 관리

### Wizard 상태
```typescript
const [currentStep, setCurrentStep] = useState(1)
const [formData, setFormData] = useState<Partial<Accommodation>>({})

// 각 단계 완료 여부
const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
```

### 임시 저장
```typescript
// 자동 저장 (debounce 500ms)
useEffect(() => {
  const timer = setTimeout(() => {
    localStorage.setItem('accommodation-draft', JSON.stringify(formData))
  }, 500)
  return () => clearTimeout(timer)
}, [formData])

// 복원
useEffect(() => {
  const draft = localStorage.getItem('accommodation-draft')
  if (draft) {
    // 복원 여부 확인 다이얼로그
  }
}, [])
```

## 재사용 컴포넌트

### FormInput
- label, placeholder, required, error 지원
- CSS 변수 사용
- 포커스 스타일

### FormSelect
- 드롭다운 선택
- placeholder 지원
- 옵션 리스트

### ImageUploader
- 드래그앤드롭
- 파일 선택
- 미리보기 그리드
- 순서 변경 (react-beautiful-dnd 또는 dnd-kit)
- 대표 이미지 설정

### Toast
- 성공/에러/경고 메시지
- 자동 사라짐 (3초)
- 우측 상단 표시

## UX 개선사항

1. **로딩 상태**
   - 데이터 저장 중 버튼 비활성화
   - 스피너 표시
   - 로딩 오버레이

2. **에러 처리**
   - 각 필드별 인라인 에러 메시지
   - 필수 필드 표시 (*)
   - 전체 에러 요약 (상단)

3. **성공 피드백**
   - 저장 완료 후 토스트 메시지
   - 리스트로 자동 이동
   - localStorage 정리

4. **반응형 디자인**
   - 모바일: 카드 1열
   - 태블릿: 카드 2열
   - 데스크톱: 카드 3열
   - Wizard는 중앙 정렬, 최대 너비 800px

5. **키보드 네비게이션**
   - Tab으로 필드 이동
   - Enter로 다음 단계
   - Esc로 취소

6. **접근성**
   - ARIA 라벨
   - 포커스 표시
   - 스크린 리더 지원

## 향후 확장

1. **일괄 작업**
   - 여러 숙소 선택하여 상태 변경
   - 복제 기능

2. **고급 검색**
   - 다중 필터 조합
   - 저장된 검색 조건

3. **통계 대시보드**
   - 숙소별 예약률
   - 인기 숙소 순위

4. **이미지 최적화**
   - 자동 리사이징
   - WebP 변환
   - CDN 연동

5. **다국어 지원**
   - 숙소 정보 번역
   - i18n 적용
