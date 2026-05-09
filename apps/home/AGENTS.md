<!-- BEGIN:nextjs-agent-rules -->
# RULE 01
컬러는 primary #fa8383 색상으로 한다.

# RULE 02
- 폰트는 프리텐다드를 사용한다.
- Bold 700, Medium 500, Light 300 만 사용한다.
- 폰트 크기는 rem 으로 사용하고 사이즈에 따라 정의하여 사용한다.
-

# RULE 03
Icon
- Lucide : https://lucide.dev/ 를 사용한다.

# RULE 04
- Radius 는 8px로 고정한다. 사이즈가 다른 radius 속성을 절대 두지 않는다.
- style.css 를 import 하고 var() 변수만 사용한다. (하드코딩 금지)
- inline style 방식의 css 적용은 금지한다.

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


This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
****