# React Query 사용 가이드

## 설치 완료 ✅

- `@tanstack/react-query` 설치됨
- `@tanstack/react-query-devtools` 설치됨 (개발 환경)

## 파일 구조

```
apps/accommodation/
├── providers/
│   └── QueryProvider.tsx          # React Query 프로바이더
├── lib/api/
│   └── client.ts                  # API 클라이언트 (fetch wrapper)
└── hooks/
    └── useProperties.ts           # 숙소 API 훅 (예시)
```

## 사용 예시

### 1. 목록 조회 (GET)

```tsx
'use client'

import { useProperties } from '@/hooks/useProperties'

export default function PropertiesPage() {
  const { data: properties, isLoading, error } = useProperties()

  if (isLoading) return <div>로딩 중...</div>
  if (error) return <div>에러: {error.message}</div>

  return (
    <div>
      {properties?.map((property) => (
        <div key={property.id}>{property.name}</div>
      ))}
    </div>
  )
}
```

### 2. 상세 조회 (GET)

```tsx
'use client'

import { useProperty } from '@/hooks/useProperties'

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const { data: property, isLoading } = useProperty(params.id)

  if (isLoading) return <div>로딩 중...</div>

  return <div>{property?.name}</div>
}
```

### 3. 생성 (POST)

```tsx
'use client'

import { useCreateProperty } from '@/hooks/useProperties'

export default function CreatePropertyForm() {
  const createProperty = useCreateProperty()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await createProperty.mutateAsync({
        name: '새 숙소',
        type: 'hotel',
        // ... 기타 데이터
      })
      alert('생성 완료!')
    } catch (error) {
      alert('생성 실패')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* 폼 필드 */}
      <button type="submit" disabled={createProperty.isPending}>
        {createProperty.isPending ? '생성 중...' : '생성'}
      </button>
    </form>
  )
}
```

### 4. 수정 (PUT)

```tsx
'use client'

import { useUpdateProperty } from '@/hooks/useProperties'

export default function EditPropertyForm({ id }: { id: string }) {
  const updateProperty = useUpdateProperty()

  const handleUpdate = async () => {
    await updateProperty.mutateAsync({
      id,
      data: {
        name: '수정된 이름',
        // ... 기타 수정할 데이터
      },
    })
  }

  return (
    <button onClick={handleUpdate} disabled={updateProperty.isPending}>
      저장
    </button>
  )
}
```

### 5. 삭제 (DELETE)

```tsx
'use client'

import { useDeleteProperty } from '@/hooks/useProperties'

export default function DeleteButton({ id }: { id: string }) {
  const deleteProperty = useDeleteProperty()

  const handleDelete = async () => {
    if (!confirm('정말 삭제하시겠습니까?')) return

    await deleteProperty.mutateAsync(id)
  }

  return (
    <button onClick={handleDelete}>
      삭제
    </button>
  )
}
```

## 추가 API 훅 만들기

객실(Room), 요금제(RatePlan) 등 다른 리소스도 동일한 패턴으로 생성:

```typescript
// hooks/useRooms.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api/client'
import { Room } from '@/lib/types/room'

export const roomKeys = {
  all: ['rooms'] as const,
  lists: () => [...roomKeys.all, 'list'] as const,
  detail: (id: string) => [...roomKeys.all, 'detail', id] as const,
}

export function useRooms() {
  return useQuery({
    queryKey: roomKeys.lists(),
    queryFn: () => api.get<Room[]>('/rooms'),
  })
}

export function useRoom(id: string) {
  return useQuery({
    queryKey: roomKeys.detail(id),
    queryFn: () => api.get<Room>(`/rooms/${id}`),
    enabled: !!id,
  })
}

// ... 나머지 CRUD 훅들
```

## 환경 변수 설정

`.env.local` 파일에 API URL 추가:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

## React Query DevTools

개발 환경에서 자동으로 표시됩니다.
- 화면 하단 왼쪽의 React Query 아이콘 클릭
- 모든 쿼리의 상태, 캐시 데이터 확인 가능

## 주요 기능

### 자동 캐싱
- 동일한 데이터를 여러 번 요청해도 캐시된 데이터 사용
- 5분간 fresh 상태 유지 (설정 변경 가능)

### 자동 재요청
- mutation 성공 시 관련 쿼리 자동 재조회
- `invalidateQueries`로 수동 갱신 가능

### 낙관적 업데이트 (선택)
```typescript
const updateProperty = useUpdateProperty()

// onMutate에서 캐시를 미리 업데이트
onMutate: async (newData) => {
  await queryClient.cancelQueries({ queryKey: propertyKeys.detail(id) })
  const previous = queryClient.getQueryData(propertyKeys.detail(id))
  queryClient.setQueryData(propertyKeys.detail(id), newData)
  return { previous }
}
```

## 참고 자료

- [TanStack Query 공식 문서](https://tanstack.com/query/latest/docs/framework/react/overview)
- [React Query 예제](https://tanstack.com/query/latest/docs/framework/react/examples)