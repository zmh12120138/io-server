@echo off
set num=0
:ok
set /a num+=1
cd C:\io-server
start node client.js
if "%num%"=="10" pause&&echo.����100���ͻ�������
goto ok