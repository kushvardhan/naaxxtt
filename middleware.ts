import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/webhook",
    "/question/:id",
    "/tags",
    "/tags/:id",
    "/profile/:id",
    "/community",
    "/api/chatgpt"
  ],
  ignoredRoutes: [
    "/api/webhook",
    "/api/chatgpt"
  ],
  // Handle clock skew issues
  clockSkewInMs: 60000, // 1 minute tolerance
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
