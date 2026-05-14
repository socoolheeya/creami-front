# Creami Front 개발 서버 관리 스크립트

## 📋 개요
`creami-front` 프로젝트의 모든 개발 서버를 쉽게 시작하고 종료할 수 있는 스크립트입니다.

## 🚀 시작하기

### 모든 서버 시작
```bash
npm run dev:all
```
다음 포트에서 서버들이 실행됩니다:
- **3000**: Home
- **3001**: Accommodation
- **3002**: ARI
- **3003**: Discount
- **3004**: Booking
- **3005**: Invoice
- **3006**: Setting

## 🛑 종료하기

### 방법 1: Shell 스크립트 (Mac/Linux 권장)
```bash
npm run stop:all
# 또는
npm run stop
# 또는
npm run kill:all
```

### 방법 2: Node.js 스크립트 (크로스 플랫폼)
```bash
npm run stop:node
# 또는
npm run kill
```

### 직접 실행
```bash
# Shell 스크립트
./scripts/stop-all.sh

# Node.js 스크립트
node scripts/stop-all.js
```

## 🔧 기능

### stop-all.sh (Shell 스크립트)
- ✅ 모든 포트(3000-3006)의 프로세스 종료
- ✅ Next.js 관련 프로세스 정리
- ✅ pnpm 프로세스 정리
- ✅ 색상으로 구분된 출력
- ✅ 최종 포트 상태 확인
- ✅ macOS/Linux 지원

### stop-all.js (Node.js 스크립트)
- ✅ 크로스 플랫폼 지원 (Windows/Mac/Linux)
- ✅ 모든 포트 프로세스 종료
- ✅ Next.js 프로세스 정리
- ✅ pnpm 프로세스 정리
- ✅ 실시간 상태 출력

## 📊 출력 예시

```
🛑 Stopping all Creami Front development servers...

Checking home on port 3000...
  → Killing processes on port 3000: 12345
    ✓ Killed PID 12345
Checking accommodation on port 3001...
  ✓ No process found on port 3001
...

Cleaning up Next.js processes...
✓ Cleaned up Next.js processes

Final port status check:
  ✓ Port 3000 (home) is free
  ✓ Port 3001 (accommodation) is free
  ...

✅ All development servers successfully stopped!

You can now safely run 'npm run dev:all' to restart the servers.
```

## 🐛 문제 해결

### 포트가 여전히 사용 중인 경우
```bash
# 특정 포트 수동 종료 (예: 3000)
lsof -ti:3000 | xargs kill -9

# Windows에서
netstat -ano | findstr :3000
taskkill /F /PID [PID번호]
```

### 권한 문제
```bash
# 실행 권한 부여
chmod +x scripts/stop-all.sh
chmod +x scripts/stop-all.js
```

## 🔄 워크플로우 예시

```bash
# 1. 모든 서버 시작
npm run dev:all

# 2. 개발 작업...

# 3. 모든 서버 종료
npm run stop:all

# 4. 깨끗한 재시작
npm run dev:all
```

## 📝 주의사항

- 스크립트는 강제 종료(`kill -9`)를 사용하므로 저장하지 않은 작업이 있다면 먼저 저장하세요.
- Windows 사용자는 `npm run stop:node` 또는 `npm run kill` 사용을 권장합니다.
- 일부 포트가 계속 사용 중이라면 스크립트를 다시 실행하거나 수동으로 종료하세요.