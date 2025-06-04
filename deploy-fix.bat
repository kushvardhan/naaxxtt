@echo off
echo Committing and pushing TypeScript fixes...
git add .
git commit -m "Fix TypeScript errors, theme provider issues, and Next.js config warnings"
git push origin master
echo Done! Check Vercel deployment now.
pause
