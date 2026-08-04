@echo off
echo ==================================================
echo       Power-Aim Website Update Tool
echo ==================================================
echo.
echo 1. Running Crawler to fetch latest localhost changes...
python "C:\Users\SunIT\Local Sites\poweraims\app\public\crawler.py"

echo.
echo 2. Adding changes to Git...
git add .

echo.
echo 3. Committing changes...
git commit -m "Website content update"

echo.
echo 4. Pushing updates to GitHub...
git push origin main

echo.
echo ==================================================
echo ✔ Website updated successfully on GitHub and Vercel!
echo ==================================================
echo.
pause
