import { parseSubmission, submissionFromRaw, type Submission } from "./validate.ts";

export async function readBody(request: Request): Promise<Submission> {
  const type = request.headers.get("content-type") ?? "";
  if (type.includes("application/json")) return submissionFromRaw(await request.text());
  const form = await request.formData();
  return parseSubmission(Object.fromEntries(form.entries()));
}

export function wantsHtml(request: Request): boolean {
  const type = request.headers.get("content-type") ?? "";
  return type.includes("form");
}

export function jsonResult(status: number, ok: boolean, error = ""): Response {
  const body = error ? { ok, error } : { ok };
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}

export function htmlResult(request: Request, status: number): Response {
  const url = new URL("/kapcsolat", request.url);
  url.searchParams.set("sent", status === 200 ? "1" : "0");
  return Response.redirect(url, 303);
}
