# @creami/ui

Creami 프로젝트의 공통 UI 컴포넌트 라이브러리입니다.

## 설치

이 패키지는 monorepo 내부 패키지이므로 별도 설치가 필요 없습니다.
각 앱의 `package.json`에 다음과 같이 추가하면 자동으로 링크됩니다:

```json
{
  "dependencies": {
    "@creami/ui": "workspace:*"
  }
}
```

## 사용법

```typescript
import { Button, Input, Select, Card, ViewToggle } from '@creami/ui'

function MyComponent() {
  return (
    <div>
      <Input
        type="text"
        placeholder="검색..."
        showSearchIcon
      />

      <Button variant="primary" size="md">
        저장
      </Button>

      <Card>
        <h3>카드 내용</h3>
      </Card>

      <ViewToggle
        view={viewMode}
        onViewChange={setViewMode}
      />
    </div>
  )
}
```

## 컴포넌트

### Table 컴포넌트 그룹
테이블 관련 컴포넌트들

**컴포넌트:**
- `Table`: 테이블 컨테이너
- `TableHeader`: 테이블 헤더 (thead)
- `TableBody`: 테이블 바디 (tbody)
- `TableRow`: 테이블 행 (tr)
- `TableHead`: 헤더 셀 (th)
- `TableCell`: 데이터 셀 (td)

**예시:**
```tsx
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@creami/ui'

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>이름</TableHead>
      <TableHead align="center">상태</TableHead>
      <TableHead align="right">금액</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {data.map((item) => (
      <TableRow
        key={item.id}
        onClick={() => handleClick(item)}
        isSelected={selectedId === item.id}
      >
        <TableCell>{item.name}</TableCell>
        <TableCell align="center">{item.status}</TableCell>
        <TableCell align="right">{item.price}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

**TableRow Props:**
- `onClick`: () => void - 클릭 핸들러
- `isSelected`: boolean - 선택 상태 (왼쪽 보더와 배경색 변경)

**TableCell/TableHead Props:**
- `align`: 'left' | 'center' | 'right' - 텍스트 정렬

### Pagination
요금제관리 화면에서 사용하는 `variant="simple"` 가운데 정렬 번호형 페이지네이션이 테이블 목록 표준입니다.
목록/테이블 화면은 별도 사유가 없으면 같은 `variant="simple"` 패턴을 사용합니다.

```tsx
import { Pagination } from '@creami/ui'

<Pagination
  variant="simple"
  currentPage={pagination.currentPage}
  totalPages={pagination.totalPages}
  totalElements={pagination.totalElements}
  pageSize={pagination.pageSize}
  onPageChange={handlePageChange}
  onPageSizeChange={handlePageSizeChange}
  className="mt-md"
/>
```

### Sidebar 컴포넌트 그룹
사이드바 메뉴 컴포넌트들

**컴포넌트:**
- `Sidebar`: 사이드바 컨테이너
- `SidebarMenu`: 메뉴 리스트 컨테이너
- `SidebarMenuItem`: 개별 메뉴 아이템

**예시:**
```tsx
import { Sidebar, SidebarMenu, SidebarMenuItem } from '@creami/ui'
import { Building2, DoorOpen, Receipt } from 'lucide-react'

<Sidebar isCollapsed={isCollapsed}>
  <SidebarMenu>
    <SidebarMenuItem
      icon={Building2}
      label="숙소 관리"
      href="/properties"
      isActive={pathname === '/properties'}
      isCollapsed={isCollapsed}
    />
    <SidebarMenuItem
      icon={DoorOpen}
      label="객실 관리"
      href="/rooms"
      isActive={pathname === '/rooms'}
      isCollapsed={isCollapsed}
    />
    <SidebarMenuItem
      icon={Receipt}
      label="요금제 관리"
      onClick={handleClick}
      isActive={isActive}
      isCollapsed={isCollapsed}
    />
  </SidebarMenu>
</Sidebar>
```

**Sidebar Props:**
- `isCollapsed`: boolean - 축소 상태

**SidebarMenuItem Props:**
- `icon`: LucideIcon - Lucide 아이콘 컴포넌트
- `label`: string - 메뉴 레이블
- `href`: string - 링크 (선택)
- `onClick`: () => void - 클릭 핸들러 (선택)
- `isActive`: boolean - 활성 상태
- `isCollapsed`: boolean - 축소 상태

### Button
공통 버튼 컴포넌트

**Props:**
- `variant`: 'primary' | 'secondary' | 'tertiary' (기본값: 'primary')
- `size`: 'sm' | 'md' | 'lg' (기본값: 'md')
- `disabled`: boolean
- 표준 HTML button 속성 모두 지원

**예시:**
```tsx
<Button variant="primary" size="sm">
  <Plus className="w-4 h-4" />
  신규 등록
</Button>
```

### Input
공통 입력 필드 컴포넌트

**Props:**
- `showSearchIcon`: boolean - 검색 아이콘 표시 여부
- 표준 HTML input 속성 모두 지원

**예시:**
```tsx
<Input
  type="text"
  placeholder="숙소명으로 검색..."
  showSearchIcon
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>
```

### Select
공통 선택 박스 컴포넌트

**Props:**
- `children`: React.ReactNode
- 표준 HTML select 속성 모두 지원

**예시:**
```tsx
<Select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
  <option value="">선택하세요</option>
  <option value="1">옵션 1</option>
  <option value="2">옵션 2</option>
</Select>
```

### Card
공통 카드 컴포넌트

**Props:**
- `children`: React.ReactNode
- `className`: string
- `style`: React.CSSProperties
- `onClick`: () => void
- `hover`: boolean (기본값: true) - 호버 효과 활성화

**예시:**
```tsx
<Card onClick={handleClick}>
  <h3>제목</h3>
  <p>내용</p>
</Card>
```

### ViewToggle
그리드/테이블 뷰 토글 컴포넌트

**Props:**
- `view`: 'grid' | 'table'
- `onViewChange`: (view: 'grid' | 'table') => void

**예시:**
```tsx
<ViewToggle
  view={viewMode}
  onViewChange={setViewMode}
/>
```

## 디자인 토큰

모든 컴포넌트는 CSS 변수를 사용하여 테마를 적용합니다:

- `--primary`: 주요 색상
- `--bg-primary`, `--bg-secondary`, `--bg-tertiary`: 배경색
- `--text-primary`, `--text-secondary`, `--text-tertiary`: 텍스트 색상
- `--border-color`: 테두리 색상
- `--radius`: 모서리 둥글기
- `--shadow`: 그림자

각 앱의 `globals.css` 또는 `styles.css`에 이러한 변수들이 정의되어 있어야 합니다.

## 개발

새로운 컴포넌트를 추가하려면:

1. `packages/ui/components/` 에 새 파일 생성
2. `packages/ui/components/index.ts` 에 export 추가
3. 각 앱에서 `pnpm install` 실행 (자동 링크)

## 빌드 및 배포

이 패키지는 빌드 시 각 앱에 번들링됩니다. 별도의 빌드나 배포 과정이 필요 없습니다.
