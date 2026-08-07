@echo off
title Global Pulse - Backend Server
echo Starting Global Pulse Backend Server on http://127.0.0.1:8000...
cd /d "%~dp0Backend"
uvicorn app.main:app --reload --port 8000
pause
