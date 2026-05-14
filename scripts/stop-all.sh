#!/bin/bash

# 색상 설정
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🛑 Stopping all Creami Front development servers...${NC}\n"

# 포트 리스트
PORTS=(3000 3001 3002 3003 3004 3005 3006)
APP_NAMES=("home" "accommodation" "ari" "discount" "booking" "invoice" "setting")

# 각 포트의 프로세스를 종료
for i in "${!PORTS[@]}"; do
    PORT=${PORTS[$i]}
    APP=${APP_NAMES[$i]}

    echo -e "${YELLOW}Checking ${APP} on port ${PORT}...${NC}"

    # macOS와 Linux 모두 지원
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        PIDS=$(lsof -ti:$PORT 2>/dev/null)
    else
        # Linux
        PIDS=$(lsof -ti:$PORT 2>/dev/null || netstat -tulpn 2>/dev/null | grep :$PORT | awk '{print $7}' | cut -d'/' -f1)
    fi

    if [ ! -z "$PIDS" ]; then
        echo -e "${RED}  → Killing processes on port ${PORT}: ${PIDS}${NC}"
        for PID in $PIDS; do
            kill -9 $PID 2>/dev/null && echo -e "${GREEN}    ✓ Killed PID ${PID}${NC}" || echo -e "${RED}    ✗ Failed to kill PID ${PID}${NC}"
        done
    else
        echo -e "${GREEN}  ✓ No process found on port ${PORT}${NC}"
    fi
done

echo ""

# Next.js 관련 프로세스 정리
echo -e "${YELLOW}Cleaning up Next.js processes...${NC}"

# node 프로세스 중 next 관련 프로세스 찾아서 종료
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    NEXT_PIDS=$(ps aux | grep -E "next|node.*creami-front" | grep -v grep | awk '{print $2}')
else
    # Linux
    NEXT_PIDS=$(ps aux | grep -E "next|node.*creami-front" | grep -v grep | awk '{print $2}')
fi

if [ ! -z "$NEXT_PIDS" ]; then
    echo -e "${RED}Found Next.js processes to clean:${NC}"
    for PID in $NEXT_PIDS; do
        kill -9 $PID 2>/dev/null && echo -e "${GREEN}  ✓ Killed Next.js process ${PID}${NC}" || echo -e "${RED}  ✗ Already terminated or no permission for PID ${PID}${NC}"
    done
else
    echo -e "${GREEN}✓ No orphaned Next.js processes found${NC}"
fi

echo ""

# pnpm 관련 프로세스 정리
echo -e "${YELLOW}Cleaning up pnpm processes...${NC}"
pkill -f "pnpm" 2>/dev/null && echo -e "${GREEN}✓ Cleaned up pnpm processes${NC}" || echo -e "${GREEN}✓ No pnpm processes to clean${NC}"

echo ""

# 포트 상태 최종 확인
echo -e "${YELLOW}Final port status check:${NC}"
ALL_CLEAR=true

for i in "${!PORTS[@]}"; do
    PORT=${PORTS[$i]}
    APP=${APP_NAMES[$i]}

    if [[ "$OSTYPE" == "darwin"* ]]; then
        PIDS=$(lsof -ti:$PORT 2>/dev/null)
    else
        PIDS=$(lsof -ti:$PORT 2>/dev/null)
    fi

    if [ ! -z "$PIDS" ]; then
        echo -e "${RED}  ✗ Port ${PORT} (${APP}) is still in use${NC}"
        ALL_CLEAR=false
    else
        echo -e "${GREEN}  ✓ Port ${PORT} (${APP}) is free${NC}"
    fi
done

echo ""

if [ "$ALL_CLEAR" = true ]; then
    echo -e "${GREEN}✅ All development servers successfully stopped!${NC}"
else
    echo -e "${YELLOW}⚠️  Some ports may still be in use. Run the script again or check manually.${NC}"
fi

echo -e "\n${GREEN}You can now safely run 'npm run dev:all' to restart the servers.${NC}"