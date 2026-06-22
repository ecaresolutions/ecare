import { NextRequest } from "next/server";

export function isAuthenticated(request: NextRequest): boolean {
  const session = request.cookies.get("admin_session")?.value;
  return session === "session_token_value_ok";
}
