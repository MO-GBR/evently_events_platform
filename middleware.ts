export { auth as middleware } from "@/Lib/auth";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  unstable_allowDynamic: [
    "./Lib/Database/index.ts",
    "/node_modules/mongoose/dist/**",
  ],
};