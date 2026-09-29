import type { RateLimitKv } from "./types.ts";

const WINDOW_SECONDS = 3600;
const MAX_POSTS = 5;

export function toHex(bytes: Uint8Array): string {
  let hex = "";
  for (const byte of bytes) hex += byte.toString(16).padStart(2, "0");
  return hex;
}

export async function addressKey(address: string): Promise<string> {
  const encoded = new TextEncoder().encode(address);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return `contact:${toHex(new Uint8Array(digest))}`;
}

export function clientAddress(request: Request): string {
  return request.headers.get("cf-connecting-ip") ?? "unknown";
}

export async function isRateLimited(kv: RateLimitKv | undefined, address: string): Promise<boolean> {
  if (!kv) return false;
  const key = await addressKey(address);
  const count = Number((await kv.get(key)) ?? "0");
  if (count >= MAX_POSTS) return true;
  await kv.put(key, String(count + 1), { expirationTtl: WINDOW_SECONDS });
  return false;
}
