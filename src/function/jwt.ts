import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "123";

export function signToken(payload: object, expiresIn = "1h") {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    throw new Error("Token tidak valid atau expired");
  }
}
