# Room Detail Screen Design

## Overview
객실 상세 화면은 객실의 모든 정보를 보여주는 단일 페이지 레이아웃입니다. 사용자는 객실 정보를 조회하고, 수정 또는 삭제할 수 있습니다.

## User Flow
1. 객실 목록에서 객실명 클릭
2. `/rooms/[id]` 상세 페이지로 이동
3. 상세 정보 조회
4. "수정" 버튼 클릭 시 `/rooms/[id]/edit` 페이지로 이동
5. "삭제" 버튼 클릭 시 확인 후 삭제 및 목록으로 복귀

## Page Structure

### 1. Header Section
- **Left**: 뒤로가기 버튼 (← 뒤로) - navigates to `/rooms`
- **Center**: 객실명 (h1) + 타입 뱃지
- **Right**: 수정 버튼 (primary color) + 삭제 버튼 (outline style)
- **Status Badge**: 현재 객실 상태 (이용가능/이용불가/점검중)

### 2. Image Gallery Section
- **Main Image**: 큰 이미지 뷰어 (height: 400-600px, rounded corners)
- **Thumbnails**: 하단 썸네일 스크롤 스트립 (4-5개 보이도록)
- **Features**:
  - 썸네일 클릭으로 메인 이미지 전환
  - 이미지 카운터 뱃지 (예: "1/5")
  - 이미지 없을 때 플레이스홀더
- **Layout**: 2-column grid on desktop (image gallery takes 2/3, info cards on the side)

### 3. Information Cards

#### Card 1: 기본 정보
- 숙소명
- 객실 타입
- 층수
- 객실 크기 (size + unit)

#### Card 2: 수용 인원 & 침대
- 기준 인원 / 최대 인원
- 침대 구성 (각 침대 타입별 아이콘 + 개수)
- 엑스트라 베드 가능 여부 및 개수

#### Card 3: 특징
- 뷰 타입 (오션뷰, 시티뷰 등)
- 흡연 가능 여부

#### Card 4: 객실 편의시설
- Grid layout으로 amenities 표시
- 각 항목에 체크 아이콘

#### Card 5: 장애인 편의시설
- List layout으로 accessibility features 표시
- 없을 경우 "해당 없음" 표시

### 4. Metadata Section
- 생성일
- 수정일
- 작은 글씨로 하단에 표시

## Edit Page (`/rooms/[id]/edit`)

기존 신규 등록 페이지와 동일한 wizard form을 재사용하되, 초기값을 현재 객실 데이터로 채웁니다.

- **Step 1**: 기본 정보 (name, type, accommodation)
- **Step 2**: 객실 상세 (size, floor, beds, occupancy)
- **Step 3**: 특징 및 편의시설 (view, smoking, amenities, accessibility)
- **Step 4**: 이미지 관리

## Delete Functionality

- 삭제 버튼 클릭 시 확인 모달 표시
- 확인 시 객실 삭제 (현재는 mock data이므로 실제 삭제는 미구현)
- 삭제 후 `/rooms` 목록 페이지로 리다이렉트

## Design System Compliance

- **Colors**: Primary #fa8383, CSS variables only
- **Font**: Pretendard (Bold 700, Medium 500, Light 300)
- **Icons**: Lucide icons
- **Radius**: 16px (var(--radius))
- **Layout**: Flat, minimal design
- **Theme**: Dark mode priority

## Implementation Notes

1. 이미지 갤러리는 클라이언트 컴포넌트로 구현 (useState for active image)
2. 삭제 확인 모달도 클라이언트 컴포넌트
3. 페이지 자체는 서버 컴포넌트로 시작하여 데이터 fetching (현재는 mock data)
4. 반응형: Mobile에서는 single column, Desktop에서는 2-column grid
5. Next.js Image 컴포넌트 사용으로 최적화