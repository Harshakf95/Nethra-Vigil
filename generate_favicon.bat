@echo off
echo Setting up Karthikeyan Vigil Favicon Generator
echo =====================================

REM Check if Python is installed
python --version >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo Error: Python is not installed or not in PATH
    echo Please install Python from https://www.python.org/downloads/
    pause
    exit /b 1
)

echo Installing required Python packages...
python -m pip install --upgrade pip
python -m pip install cairosvg Pillow

REM Check if ImageMagick is installed
magick --version >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo Warning: ImageMagick is not installed or not in PATH
    echo For best results, please install ImageMagick from https://imagemagick.org/script/download.php
    echo Basic favicon will still be generated, but some features may be limited.
    timeout /t 5
)

echo.
echo Generating favicon and related files...
python scripts/generate_favicon.py

if exist public\favicon.ico (
    echo.
    echo =====================================
    echo Success! Favicon and related files have been generated in the public/ directory
    echo - favicon.ico (standard favicon)
    echo - favicon.svg (vector version)
    echo - apple-touch-icon.png (iOS devices)
    echo - android-chrome-*.png (Android/Chrome)
    echo - mstile-*.png (Windows tiles)
    echo =====================================
) else (
    echo.
    echo Error: Failed to generate favicon files
    echo Please check the error messages above and ensure all dependencies are installed.
)

echo.
pause
