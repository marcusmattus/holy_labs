# Holy - Auth Decision

Auth Choice: **Clerk**

**Why we chose Clerk over NextAuth:**
1. Next.js App Router Support: Clerk has first-class integration with App Router and Edge Middleware, out of the box. NextAuth is still catching up with Next.js 15 compatibility issues and middleware complexities.
2. Drop-in UI: Clerk provides built-in, highly customizable `<SignIn />` and `<UserProfile />` components, saving us from building these flows manually.
3. Holy operates on a "Launch fast, monetize faster" principle, and Clerk handles the boilerplate of auth so we can focus on core AI and distribution logic. NextAuth requires bringing our own DB adapter and building our own auth pages.
