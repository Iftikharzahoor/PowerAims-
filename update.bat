@echo off
echo ==================================================
echo       Power-Aim Website Update Tool
echo ==================================================
echo.
echo Adding changes to Git...
git add .

echo.
echo Committing changes...
git commit -m "Website content update"

echo.
echo Pushing updates to GitHub...
git push origin main

echo.
echo ==================================================
echo Website updated successfully on GitHub and Vercel!
echo ==================================================
echo.
pause
