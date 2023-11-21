@echo off
setlocal

set scriptpath=%~dp0
set "SOURCE_FOLDER=%scriptpath%..\tools\openapi-generator\.build"
set "DEST_FOLDER=%scriptpath%..\packages\client\src\api\generated"

REM Remove existing destination folder
rmdir /s /q "%DEST_FOLDER%"

REM Create the destination folder
mkdir "%DEST_FOLDER%"

REM Copy TypeScript files from source to destination
copy "%SOURCE_FOLDER%\*.ts" "%DEST_FOLDER%"

echo Script executed successfully