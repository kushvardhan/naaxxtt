@echo off
echo Committing and pushing all TypeScript fixes...
git add .
git commit -m "Fix all TypeScript errors: theme provider, null checks, action types, and missing functions"
git push origin master
echo Done! Check Vercel deployment now.
echo.
echo Fixed issues:
echo - ThemeProvider props error in lib/Providers.tsx
echo - Null reference errors in all theme components
echo - Optional parameter handling in question.action.ts
echo - Missing null checks in ask-question page
echo - Duplicate function removal and type fixes
echo.
pause
