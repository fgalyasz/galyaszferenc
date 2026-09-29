import { htmlResult, jsonResult, readBody, wantsHtml } from "../_lib/http.ts";
import { clientAddress, isRateLimited } from "../_lib/limit.ts";
import { storeMessage } from "../_lib/store.ts";
import type { Context, Result } from "../_lib/types.ts";
import { submissionError, type Submission } from "../_lib/validate.ts";

async function rejectOrStore(context: Context, submission: Submission): Promise<Result> {
  const address = clientAddress(context.request);
  if (await isRateLimited(context.env.CONTACT_RATE_LIMIT, address)) {
    return { status: 429, body: { ok: false, error: "rate" } };
  }
  if (!(await storeMessage(context.env, submission))) {
    return { status: 503, body: { ok: false, error: "store" } };
  }
  return { status: 200, body: { ok: true } };
}

async function decide(context: Context): Promise<Result> {
  const submission = await readBody(context.request);
  const error = submissionError(submission);
  if (error === "honeypot") return { status: 200, body: { ok: true } };
  if (error) return { status: 400, body: { ok: false, error } };
  return rejectOrStore(context, submission);
}

export async function onRequestPost(context: Context): Promise<Response> {
  const result = await decide(context);
  if (wantsHtml(context.request)) return htmlResult(context.request, result.status);
  return jsonResult(result.status, result.body.ok, result.body.error ?? "");
}
