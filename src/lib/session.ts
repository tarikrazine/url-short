import * as jose from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
const issuer = "urn:shortUrl:issuer";
const audience = "urn:shortUrl:audience";
const expiresAt = "2h";

export async function encodeUserSession(userId: number) {
  const jwt = await new jose.EncryptJWT({ user: userId })
    .setProtectedHeader({
      alg: "dir",
      enc: "A128CBC-HS256",
    })
    .setIssuedAt()
    .setIssuer(issuer)
    .setAudience(audience)
    .setExpirationTime(expiresAt)
    .encrypt(secret);

  return jwt;
}

export async function decodeUserSession(jwt: string) {
  try {
    const { payload, protectedHeader } = await jose.jwtDecrypt(jwt, secret, {
      issuer: issuer,
      audience: audience,
    });

    return payload;
  } catch (error) {
    console.log(error);

    return null;
  }
}
