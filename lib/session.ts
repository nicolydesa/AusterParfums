import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

const COOKIE_NAME = "auster_session"
const MAX_AGE_SEC = 60 * 60 * 24 * 7

function getSecret(): Uint8Array {
  const s = process.env.AUTH_SECRET
  if (!s || s.length < 32) {
    throw new Error("AUTH_SECRET must be set and at least 32 characters")
  }
  return new TextEncoder().encode(s)
}

export async function createSessionToken(userId: string): Promise<string> {
  return new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret())
}

export async function setSessionCookie(token: string): Promise<void> {
  const store = await cookies()
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE_SEC,
    path: "/",
  })
}

export async function clearSessionCookie(): Promise<void> {
  const store = await cookies()
  store.delete(COOKIE_NAME)
}

export async function getSessionUserId(): Promise<string | null> {
  const store = await cookies()
  const token = store.get(COOKIE_NAME)?.value
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, getSecret())
    const sub = payload.sub
    return typeof sub === "string" ? sub : null
  } catch {
    return null
  }
}
