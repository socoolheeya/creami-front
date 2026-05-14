<!-- BEGIN:nextjs-agent-rules -->
# RULE 01
컬러는 primary #fa8383 색상으로 한다.

# RULE 02
- 폰트는 프리텐다드를 사용한다.
- Bold 700, Medium 500, Light 300 만 사용한다.
- 폰트 크기는 rem 으로 사용하고 사이즈에 따라 정의하여 사용한다.
- 기본 텍스트는 14px 이고 이걸 기준으로 다양한 사이즈를 var 변수, 토큰으로 만들어 사용한다.

# RULE 03
Icon
- Lucide : https://lucide.dev/ 를 사용한다.

# RULE 04
- Radius 는 8px로 고정한다. 사이즈가 다른 radius 속성을 절대 두지 않는다.
- style.css 를 import 하고 var() 변수만 사용한다. (하드코딩 금지)

# RULE 05
- 그라디언트는 사용하지 않는다.
- 플랫한 미니멀 디자인으로 한다.

# RULE 06
- 다크모드, 라이트모드를 제공하고 다크모드 우선으로 개발한다.

# RULE 07
- 레이아웃은 아래 샘플을 참고한다.
- https://startbootstrap.com/previews/sb-admin
- 최상단 header bar 왼쪽에 creami accommodation, creami ari, creami discoumt 앱을 선택할 수 있는 아이콘을 둔다.
-
# RULE 08
- Tailwind 토큰 기반 재정의 한다.
- tailwind.config.js var 변수를 이용하여 재정의 할 것.
- px-3, px-4 같은 숫자 spcing은 금지한다.
- text-sm 금지한다.
- rounded-md 금지한다.


# RULE 09
- packages/ui/components 에 공통 컴포넌트가 우선순위가 최우선이다.

# RULE 10
- 공통 컴포넌트 정책
  - 기본 원칙
    - 모든 앱은 `packages/ui/components` 공통 컴포넌트를 우선 사용하고, 화면별 로컬 컴포넌트는 조합/도메인 로직만 담당한다.
    - 공통 컴포넌트는 controlled/uncontrolled 사용이 모두 필요한지 먼저 판단하고, 폼/필터/선택류는 controlled 사용을 기본으로 지원한다.
    - 공통 컴포넌트 API는 `variant`, `size`, `disabled`, `loading`, `fullWidth`, `className`, 표준 HTML 속성을 일관되게 제공한다.
    - 색상, 간격, 높이, 너비, radius, shadow, z-index는 `styles.css` CSS 변수와 `tailwind.config.js` 토큰으로만 제공한다.
    - 숫자 Tailwind 유틸리티, arbitrary width/height, inline style CSS를 새로 추가하지 않는다.
    - 긴 텍스트는 기본적으로 줄바꿈/말줄임 정책을 명확히 하고, 말줄임 시 hover `title` 또는 동등한 접근 방식으로 전체 값을 확인할 수 있어야 한다.
    - 공통 컴포넌트는 다크모드/라이트모드, keyboard focus, disabled 상태, empty/loading/error 상태를 포함해 설계한다.
    - 공통 컴포넌트 변경 시 최소 1개 실제 앱 화면에 적용해 빌드와 브라우저 동작을 확인한다.
  - 버튼/아이콘 버튼
    - 명령은 `Button`을 사용하고 아이콘은 Lucide를 사용한다.
    - 아이콘만 있는 버튼은 `aria-label` 또는 접근 가능한 이름을 필수로 제공한다.
    - 버튼 크기는 토큰 기반 `mini/small/medium/large` 계열로만 확장한다.
  - 입력/선택/스위치
    - `Input`, `Select`, `SearchableSelect`, `Switch`는 controlled value/onChange 사용을 기본으로 한다.
    - 필터 입력은 사용자가 입력하는 동안 입력창이 사라지거나 비활성화되지 않아야 한다.
    - 검색 필터는 현재 페이지 배열을 임의 필터링하지 않고, 백엔드 API 검색 파라미터와 페이징 계약에 맞춘다.
    - placeholder, emptyText, disabled, error/invalid 표현은 컴포넌트 API로 제공한다.
  - 테이블
    - 테이블의 `thead` 필터 사용을 디폴트로 하고, `filtersEnabled={false}`처럼 비활성화 옵션을 제공한다.
    - 필터 행은 공통 `TableHeader`/`TableFilterRow`/`TableFilterCell` 조합으로 구현한다.
    - 컬럼 사이즈는 var 변수로 다양한 사이즈를 제공할 수 있도록 한다.
    - ID의 케이스에서 숫자는 9자리라고 가정하고 그에 맞는 사이즈를 계산하여 var 토큰 변수로 제공한다.
    - 컬럼 사이즈보다 컨텐츠 내용이 넘치면 ... 으로 줄이고 hover 시 전체 텍스트를 알 수 있도록 한다.
    - 테이블 필터 입력은 로딩/빈 결과 상태에서도 계속 표시되어야 한다.
    - 무한 스크롤은 사용하지 않으며 페이징으로 개발한다.
  - 페이지네이션
    - 목록 화면은 공통 `Pagination`을 사용한다.
    - 페이지 변경 시 화면 전체 깜박임 없이 이전 데이터 유지 또는 테이블 내부 로딩 상태로 표현한다.
    - page/pageSize는 URL 쿼리와 동기화해 새로고침/뒤로가기 동작을 보장한다.
  - 카드/레이아웃
    - `Card`는 반복 아이템, 모달, 명확한 프레임이 필요한 도구에만 사용한다.
    - 페이지 섹션을 카드 안의 카드로 중첩하지 않는다.
    - `Header`, `Sidebar`, `MainLayout`, `AppSwitcher`는 앱 간 동일한 구조와 토큰을 유지한다.
  - 피드백 컴포넌트
    - `Alert`, `Notification`, empty/loading/error 상태는 공통 컴포넌트와 i18n 메시지를 사용한다.
    - 오류/빈 상태는 사용자의 다음 행동을 막지 않도록 배치한다. 예: 테이블 검색 결과 없음은 테이블을 제거하지 않고 바디 행으로 표시한다.
  - 날짜/시간
    - `DatePicker`, `TimePicker`, `TimeRangePicker`는 토큰 기반 팝오버 너비/높이를 사용한다.
    - 날짜/시간 값은 화면 로컬 포맷과 API 포맷 변환 지점을 명확히 분리한다.
  - 배포 전 점검
    - 공통 컴포넌트 수정 후 `pnpm --filter @creami/ui build`와 영향을 받은 앱 `pnpm --filter <app> build`를 실행한다.
    - 실제 브라우저에서 주요 상호작용, loading/empty/error, mobile/desktop 레이아웃을 확인한다.


This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
