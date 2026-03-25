@echo off
echo ==========================================
echo Sky Smash Courts - Setup & Run Script
echo ==========================================

echo.
echo [1/4] Installing Server Dependencies...
cd server
call npm install
if %errorlevel% neq 0 (
    echo Error installing server dependencies. Exiting.
    pause
    exit /b %errorlevel%
)

echo.
echo [2/4] Installing Client Dependencies...
cd ../client
call npm install
if %errorlevel% neq 0 (
    echo Error installing client dependencies. Please check your internet connection.
    pause
    exit /b %errorlevel%
)
call npm install react-calendar date-fns lucide-react
if %errorlevel% neq 0 (
    echo Error installing additional client dependencies.
    pause
    exit /b %errorlevel%
)

echo.
echo [3/4] Starting Backend Server...
start "Sky Smash Server" cmd /k "cd ../server && npm run start"

echo.
echo [4/4] Starting Frontend Application...
cd ../client
echo Starting Next.js...
npm run dev

pause
