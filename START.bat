@echo off
echo Starting TrendyTreasure...
start cmd /k "cd /d d:\Trendytreasure\BackEnd && node server.js"
timeout /t 2 >nul
start cmd /k "cd /d d:\Trendytreasure\FrontEnd && npm run dev"
timeout /t 4 >nul
start http://localhost:5173
echo Done! Website opening...
