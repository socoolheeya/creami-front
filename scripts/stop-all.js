#!/usr/bin/env node

const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

// 색상 코드
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

// 포트와 앱 이름 매핑
const portMap = [
  { port: 3000, app: 'home' },
  { port: 3001, app: 'accommodation' },
  { port: 3002, app: 'ari' },
  { port: 3003, app: 'discount' },
  { port: 3004, app: 'booking' },
  { port: 3005, app: 'invoice' },
  { port: 3006, app: 'setting' },
];

// 운영체제 확인
const isWindows = process.platform === 'win32';
const isMac = process.platform === 'darwin';
const isLinux = process.platform === 'linux';

console.log(`${colors.yellow}${colors.bright}🛑 Stopping all Creami Front development servers...${colors.reset}\n`);

// Windows용 포트 프로세스 찾기
async function findWindowsProcess(port) {
  try {
    const { stdout } = await execAsync(`netstat -ano | findstr :${port}`);
    const lines = stdout.trim().split('\n');
    const pids = new Set();

    lines.forEach(line => {
      const parts = line.trim().split(/\s+/);
      const pid = parts[parts.length - 1];
      if (pid && pid !== '0') {
        pids.add(pid);
      }
    });

    return Array.from(pids);
  } catch (error) {
    return [];
  }
}

// macOS/Linux용 포트 프로세스 찾기
async function findUnixProcess(port) {
  try {
    const { stdout } = await execAsync(`lsof -ti:${port}`);
    return stdout.trim().split('\n').filter(pid => pid);
  } catch (error) {
    return [];
  }
}

// 프로세스 종료
async function killProcess(pid) {
  try {
    if (isWindows) {
      await execAsync(`taskkill /F /PID ${pid}`);
    } else {
      await execAsync(`kill -9 ${pid}`);
    }
    return true;
  } catch (error) {
    return false;
  }
}

// Next.js 관련 프로세스 찾기
async function findNextProcesses() {
  try {
    let command;
    if (isWindows) {
      command = 'wmic process where "CommandLine like \'%next%\' or CommandLine like \'%creami-front%\'" get ProcessId';
    } else {
      command = 'ps aux | grep -E "next|node.*creami-front" | grep -v grep | awk \'{print $2}\'';
    }

    const { stdout } = await execAsync(command);
    const pids = stdout.trim().split('\n')
      .map(line => line.trim())
      .filter(pid => pid && !isNaN(pid));

    return pids;
  } catch (error) {
    return [];
  }
}

// pnpm 프로세스 종료
async function killPnpmProcesses() {
  try {
    if (isWindows) {
      await execAsync('taskkill /F /IM pnpm.exe 2>nul');
    } else {
      await execAsync('pkill -f pnpm 2>/dev/null');
    }
    return true;
  } catch (error) {
    return false;
  }
}

// 메인 실행 함수
async function stopAll() {
  // 각 포트의 프로세스 종료
  for (const { port, app } of portMap) {
    console.log(`${colors.yellow}Checking ${app} on port ${port}...${colors.reset}`);

    const pids = isWindows
      ? await findWindowsProcess(port)
      : await findUnixProcess(port);

    if (pids.length > 0) {
      console.log(`${colors.red}  → Found processes on port ${port}: ${pids.join(', ')}${colors.reset}`);

      for (const pid of pids) {
        const killed = await killProcess(pid);
        if (killed) {
          console.log(`${colors.green}    ✓ Killed PID ${pid}${colors.reset}`);
        } else {
          console.log(`${colors.red}    ✗ Failed to kill PID ${pid}${colors.reset}`);
        }
      }
    } else {
      console.log(`${colors.green}  ✓ No process found on port ${port}${colors.reset}`);
    }
  }

  console.log('');

  // Next.js 프로세스 정리
  console.log(`${colors.yellow}Cleaning up Next.js processes...${colors.reset}`);
  const nextPids = await findNextProcesses();

  if (nextPids.length > 0) {
    console.log(`${colors.red}Found Next.js processes to clean:${colors.reset}`);
    for (const pid of nextPids) {
      const killed = await killProcess(pid);
      if (killed) {
        console.log(`${colors.green}  ✓ Killed Next.js process ${pid}${colors.reset}`);
      }
    }
  } else {
    console.log(`${colors.green}✓ No orphaned Next.js processes found${colors.reset}`);
  }

  console.log('');

  // pnpm 프로세스 정리
  console.log(`${colors.yellow}Cleaning up pnpm processes...${colors.reset}`);
  const pnpmKilled = await killPnpmProcesses();
  if (pnpmKilled) {
    console.log(`${colors.green}✓ Cleaned up pnpm processes${colors.reset}`);
  } else {
    console.log(`${colors.green}✓ No pnpm processes to clean${colors.reset}`);
  }

  console.log('');

  // 최종 상태 확인
  console.log(`${colors.yellow}Final port status check:${colors.reset}`);
  let allClear = true;

  for (const { port, app } of portMap) {
    const pids = isWindows
      ? await findWindowsProcess(port)
      : await findUnixProcess(port);

    if (pids.length > 0) {
      console.log(`${colors.red}  ✗ Port ${port} (${app}) is still in use${colors.reset}`);
      allClear = false;
    } else {
      console.log(`${colors.green}  ✓ Port ${port} (${app}) is free${colors.reset}`);
    }
  }

  console.log('');

  if (allClear) {
    console.log(`${colors.green}✅ All development servers successfully stopped!${colors.reset}`);
  } else {
    console.log(`${colors.yellow}⚠️  Some ports may still be in use. Run the script again or check manually.${colors.reset}`);
  }

  console.log(`\n${colors.green}You can now safely run 'npm run dev:all' to restart the servers.${colors.reset}`);
}

// 에러 처리
process.on('unhandledRejection', (error) => {
  console.error(`${colors.red}Error: ${error.message}${colors.reset}`);
  process.exit(1);
});

// 실행
stopAll().catch(error => {
  console.error(`${colors.red}Fatal error: ${error.message}${colors.reset}`);
  process.exit(1);
});