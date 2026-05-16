<!-- BEGIN:nextjs-agent-rules -->
# BACKEND RULE
- 백엔드 N+1 조회 최적화는 fetch join으로 해결한다. `@EntityGraph`/`EntityGraph`는 사용하지 않는다.

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
    - 테이블은 공통 `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`, `TableFilterRow`, `TableFilterCell`, `TableStateRow` 조합을 사용한다.
    - `thead`를 사용하면 모든 데이터 컬럼에 `TableHead`를 빠짐없이 제공하고, 컬럼 순서/개수/너비 토큰이 `tbody`의 `TableCell`과 일치해야 한다.
    - 필터 행을 사용하면 모든 데이터 컬럼에 실제 필터 컨트롤을 제공한다. 검색하지 않는 컬럼을 빈 `TableFilterCell`로 두는 것은 금지한다.
    - 백엔드 검색 미지원 컬럼은 빈 셀이 아니라 disabled `Input`/`Select` 같은 필터 컨트롤을 둔다. 필터 행 컬럼 수, 필터 컨트롤 수, `TableHead` 수, `colgroup` 수는 반드시 동일해야 한다.
    - 테이블의 `thead` 필터 사용을 디폴트로 하고, `filtersEnabled={false}`처럼 비활성화 옵션을 제공한다.
    - 필터 행은 공통 `TableHeader`/`TableFilterRow`/`TableFilterCell` 조합으로 구현한다.
    - `table-layout: fixed` 테이블은 `colgroup + min-width + width token` 조합을 필수로 사용한다.
    - 컬럼 사이즈는 var 변수로 다양한 사이즈를 제공할 수 있도록 한다.
    - ID의 케이스에서 숫자는 9자리라고 가정하고 그에 맞는 사이즈를 계산하여 var 토큰 변수로 제공한다.
    - 컬럼 사이즈보다 컨텐츠 내용이 넘치면 ... 으로 줄이고 hover 시 전체 텍스트를 알 수 있도록 한다.
    - 테이블 필터 입력은 loading/empty/error 상태에서도 계속 표시되어야 하며, 상태 표현 때문에 `thead`가 사라지거나 일부 컬럼만 남으면 안 된다.
    - 특정 컬럼의 백엔드 검색 파라미터가 없으면 해당 목록에서 필터 행을 사용하지 않는다. 현재 페이지 배열만 임의 필터링해 전 컬럼 필터처럼 보이게 만들지 않는다.
    - 테이블 loading/empty/error 상태는 `TableStateRow`로 표시하고, `colSpan`은 전체 데이터 컬럼 수와 일치시킨다. 화면별 텍스트만 있는 임의 `TableCell` 상태 행을 만들지 않는다.
    - 빈 결과 문구, 로딩 문구, 오류 문구는 i18n 메시지를 사용한다. 예: `No Nmbers found.` 같은 오탈자/하드코딩 문자열을 화면에 직접 두지 않는다.
    - 무한 스크롤은 사용하지 않으며 페이징으로 개발한다.
  - 페이지네이션
    - 목록 화면은 공통 `Pagination`을 사용한다.
    - 요금제관리에서 사용 중인 `Pagination variant="simple"` 가운데 정렬 번호형 페이지네이션을 테이블 목록 표준으로 삼는다.
    - 기존 요금제관리 페이지네이션 코드는 기준 구현이므로 임의로 바꾸지 않는다. 다른 목록 화면이 이 패턴을 따라간다.
    - 테이블 하단 페이지네이션 위치는 테이블 바로 아래 `mt-md` 간격을 기본으로 하고, 카드/그리드 목록도 동일한 `Pagination`을 사용한다.
    - 페이지 변경 시 화면 전체 깜박임 없이 이전 데이터 유지 또는 테이블 내부 로딩 상태로 표현한다.
    - page/pageSize는 URL 쿼리와 동기화해 새로고침/뒤로가기 동작을 보장한다.
    - 새 테이블 목록을 만들 때는 백엔드 API가 `page`, `size`, 검색 파라미터를 지원하는지 먼저 확인하고, 없으면 백엔드팀에 API 계약을 요청한다.
  - 카드/레이아웃
    - `Card`는 반복 아이템, 모달, 명확한 프레임이 필요한 도구에만 사용한다.
    - 페이지 섹션을 카드 안의 카드로 중첩하지 않는다.
    - `Header`, `Sidebar`, `MainLayout`, `AppSwitcher`는 앱 간 동일한 구조와 토큰을 유지한다.
  - 피드백 컴포넌트
    - `Alert`, `Notification`, empty/loading/error 상태는 공통 컴포넌트와 i18n 메시지를 사용한다.
    - 저장 버튼 후처리 notification은 `@creami/ui`의 `notifySaveSuccess`, `notifySaveError` preset을 사용한다. `placement`, `direction`을 화면마다 하드코딩하지 않는다.
    - 저장 액션은 성공 알림만 두고 끝내지 않는다. API/비동기 저장이면 성공/실패 notification을 한 쌍으로 구현하고, 성공 알림 이후 라우팅/모달 닫기 같은 후속 동작을 실행한다.
    - 오류/빈 상태는 사용자의 다음 행동을 막지 않도록 배치한다. 예: 테이블 검색 결과 없음은 테이블을 제거하지 않고 바디 행으로 표시한다.
    - 저장/등록/수정/삭제/재발급 같은 명령 버튼은 이벤트 후처리로 결과 Notification을 반드시 제공한다.
    - 비동기 저장은 API/mutation 성공 응답 이후에만 `notification.success`를 호출하고, 실패/예외 경로에서는 `notification.error`를 호출한다.
    - 저장 핸들러는 실패를 조용히 삼키거나 콘솔 로그만 남기지 않는다. 인라인 오류가 있더라도 저장 결과는 공통 Notification으로 함께 알린다.
    - 저장 버튼의 loading/disabled 상태는 중복 요청 방지에만 사용하고, 결과 안내를 대체하지 않는다.
  - 날짜/시간
    - `DatePicker`, `TimePicker`, `TimeRangePicker`는 토큰 기반 팝오버 너비/높이를 사용한다.
    - 날짜/시간 값은 화면 로컬 포맷과 API 포맷 변환 지점을 명확히 분리한다.
  - 배포 전 점검
    - 공통 컴포넌트 수정 후 `pnpm --filter @creami/ui build`와 영향을 받은 앱 `pnpm --filter <app> build`를 실행한다.
    - 실제 브라우저에서 주요 상호작용, loading/empty/error, mobile/desktop 레이아웃을 확인한다.
    - 실제 API 연동 화면은 완료 보고 전 의존 백엔드 포트 health/API curl, 프론트 메뉴 라우트 200 응답, 브라우저 콘솔/네트워크 오류 유무를 함께 확인한다.
    - API 미기동/네트워크 실패는 브라우저 원시 오류(`Failed to fetch`, `NetworkError`)를 그대로 노출하지 않고 공통 i18n loading/error 문구로 처리한다.
    - mock 제거 작업은 코드 import 제거만으로 완료하지 않는다. 실제 API 서버 기동 상태에서 목록/상세/등록/수정/삭제 또는 해당 화면의 주요 플로우를 최소 1회 HTTP와 화면 진입으로 검증한다.
    - 테이블 수정 후 브라우저 computed CSS에서 `thead button`, `filterControlCount`, `tableLayout`, `th backgroundColor`, `th width`를 확인한다. CEO 지적 전 CTO/프론트팀 내부 리뷰에서 반드시 수행한다.
  - CTO/프론트팀 반복 학습
    - 매 테이블 작업 시작 전 RULE 10 테이블 항목을 소리 내어 체크한다는 전제로 리뷰한다.
    - CTO는 완료 보고 전 `TableHeader`, `filterRow`, `colgroup`, `TableHead`, `TableCell`, `TableStateRow`, `Pagination` 사용 여부를 직접 점검한다.
    - 같은 정책 위반이 반복되면 해당 실수를 `docs/solutions/frontend`에 compounding하고, AGENTS.md 룰 또는 체크리스트를 즉시 보강한다.
    - CEO가 지적하기 전 팀 내부에서 발견하는 것을 완료 기준으로 삼는다.

# RULE 11
- CEO 업무 수령 및 팀 개발 프로세스
  - CEO에게 업무를 부여받으면 먼저 어떻게 개발할지 실행 계획을 세운다.
  - CEO 지시에는 CTO 지목이 없어도 CTO가 자동 접수자로 동작한다. CTO는 즉시 기능 단위 티켓을 나누고 독립 가능한 작업을 프론트/백엔드/계약/검증 담당자에게 병렬 배분한다.
  - 계획은 기능 단위로 쪼개고, 티켓 하나에는 기능 하나만 담는다.
  - 티켓은 한국어로 작성하며 목적, 범위, API/화면 영향, 완료 기준, 검증 방법을 포함한다.
  - 티켓 생성 후 프론트/백엔드/계약 담당자에게 역할에 맞게 배분한다.
  - 각 팀 내부 인원은 독립 가능한 티켓을 동시 다발적으로 진행하되, REST API 계약과 공통 컴포넌트 정책은 공유 기준으로 맞춘다.
  - 개발 중 재질문을 기본으로 하지 않는다. 코드와 문서를 먼저 조사하고 합리적인 가정으로 완료까지 진행한다.
  - 완료 보고 전 팀 내부에서 다음 순서를 반드시 끝낸다.
    - 빌드: 영향받은 패키지와 앱 빌드 성공
    - 정책 스캔: AGENTS.md, CSS 토큰, 공통 컴포넌트, 포트 정책 위반 여부 확인
    - 코드 리뷰: 버그, 회귀, API 계약 불일치, UX 문제, 테스트 공백 확인
    - 컴파운딩: 반복 가능한 실수/교훈이 있으면 `docs/solutions`에 기록
  - CEO에게는 내부 검증이 끝난 뒤에만 완료 보고한다.
  - 보고에는 완료한 티켓, 변경 파일, 검증 명령, 남은 리스크를 간결히 포함한다.

# RULE 12
- CTO 일정 운영
  - Creami 시스템 MVP 마감일은 `creami/docs/CTO-DELIVERY-SCHEDULE.md`를 기준으로 한다.
  - CTO 마일스톤에 맞춰 프론트엔드 팀은 기능 단위 티켓을 자동 수행한다.
  - CTO는 팀원별 담당 티켓, 진행 상태, 블로커, 리뷰 대기 상태를 관리해 특정 개발자에게만 일이 몰리지 않도록 한다.
  - 독립 가능한 기능/수정/검증 티켓은 여러 개발자가 병렬로 진행하도록 배분하고, 공통 컴포넌트/API 계약/디자인 토큰처럼 충돌 가능성이 있는 기준은 작업 시작 전에 공유한다.
  - 한 명이 장시간 단독으로 붙잡고 있는 작업은 더 작게 쪼개거나 리뷰/검증/문서화 작업을 분리해 다른 팀원이 즉시 협업할 수 있게 한다.
  - 병렬 작업 중에는 변경 파일 소유 범위와 의존 순서를 명확히 하며, 다른 팀원의 변경을 되돌리지 않고 현재 변경에 맞춰 조정한다.
  - 완료 보고에는 기능 결과뿐 아니라 병렬 배분 내역, 협업 지점, 남은 병목 또는 특정 인원 의존 리스크를 함께 포함한다.
  - 기능 하나가 완료될 때마다 빌드, 정책 스캔, 코드 리뷰, 컴파운딩 후 CEO에게 보고하고 피드백을 받는다.
  - Paperclip이 동작하지 않으면 로컬 문서 티켓과 `docs/solutions` 기록으로 대체한다.


This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
