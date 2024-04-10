import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  console.log("Middleware executed \n")
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const { pathname } = req.nextURL; // Corrected typo here

  // if user is trying to authenticate or is already logged in
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  // if user is not in /login or / and is not logged in
  if ((pathname !== '/login' && pathname !== '/') && !token) { // Corrected conditions here
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

  // if user is logged in
  return NextResponse.next();
}
