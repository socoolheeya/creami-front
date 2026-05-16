# Discount mock-to-API contract

## Context

할인관리와 할인-요금제 매핑 화면이 `apps/discount/lib/data/mock-*`를 직접 사용하고 있었다. 화면에서 mock import만 제거하면 끝나는 문제가 아니라, 할인 백엔드의 목록/매핑 REST 계약과 브라우저 CORS까지 함께 확인해야 했다.

## Reusable lesson

- mock 제거 전 프론트 화면이 실제로 필요한 데이터 계약을 먼저 적는다.
- 할인 목록은 `/discounts` 같은 목록 API가 검색 파라미터를 받아야 한다.
- 매핑 화면은 조회와 저장이 모두 필요하므로 `GET/PUT /discount-rate-plan-mappings` 같은 bulk 계약을 둔다.
- 검색 입력은 현재 로드된 배열만 필터링하지 말고 숙소/요금제/할인 API query param으로 재조회한다.
- 브라우저 앱 포트가 다르면 API 200만 확인하지 말고 `OPTIONS` preflight의 `Access-Control-Allow-Origin`도 확인한다.
- 새 API 클라이언트 파일을 만들면 untracked로 남기지 않는다.

## Verification

- `./gradlew :app:creami-app-discount:build`
- `pnpm --filter discount build`
- `curl -i 'http://127.0.0.1:9003/discounts?search=discount&activeOnly=true'`
- `curl -i 'http://127.0.0.1:9003/discount-rate-plan-mappings?ratePlanIds=1&ratePlanIds=2'`
- `curl -i -X PUT 'http://127.0.0.1:9003/discount-rate-plan-mappings' -H 'Content-Type: application/json' --data '{"mappings":[{"ratePlanId":1,"discountIds":[1]}]}'`
- `curl -i -X OPTIONS 'http://127.0.0.1:9003/discount-rate-plan-mappings' -H 'Origin: http://localhost:3003' -H 'Access-Control-Request-Method: PUT' -H 'Access-Control-Request-Headers: content-type'`
- `curl -I 'http://127.0.0.1:3003/discounts'`
- `curl -I 'http://127.0.0.1:3003/mappings'`
