import { SignJWT, jwtVerify } from "jose";

const SESSION_DURATION = "7d";

function getEncodedKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET não está configurada.");
  }
  return new TextEncoder().encode(secret);
}

export type SessionPayload = {
  userId: string;
  username: string;
  orgId: string;
};

export async function encrypt(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(SESSION_DURATION)
    .sign(getEncodedKey());
}

export async function decrypt(session?: string): Promise<SessionPayload | null> {
  if (!session) return null;
  try {
    const { payload } = await jwtVerify(session, getEncodedKey(), { algorithms: ["HS256"] });
    if (
      typeof payload.userId !== "string" ||
      typeof payload.username !== "string" ||
      typeof payload.orgId !== "string"
    ) {
      return null;
    }
    return { userId: payload.userId, username: payload.username, orgId: payload.orgId };
  } catch {
    return null;
  }
}
