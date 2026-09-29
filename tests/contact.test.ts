import assert from "node:assert/strict";
import test from "node:test";
import { htmlResult, jsonResult, readBody, wantsHtml } from "../functions/_lib/http.ts";
import { addressKey, isRateLimited, toHex } from "../functions/_lib/limit.ts";
import { storeMessage } from "../functions/_lib/store.ts";
import { onRequestPost } from "../functions/api/contact.ts";
import {
  emptySubmission,
  parseSubmission,
  submissionError,
  submissionFromRaw,
} from "../functions/_lib/validate.ts";

const valid = {
  name: "Anna",
  email: "anna@example.com",
  topic: "foto",
  message: "Esküvői időpontot szeretnék.",
  company: "",
};

test("accepts a complete message", () => {
  assert.equal(submissionError(parseSubmission(valid)), "");
});

test("rejects each missing field", () => {
  assert.equal(submissionError(parseSubmission({ ...valid, name: "A" })), "name");
  assert.equal(submissionError(parseSubmission({ ...valid, email: "rossz" })), "email");
  assert.equal(submissionError(parseSubmission({ ...valid, topic: "mas" })), "topic");
  assert.equal(submissionError(parseSubmission({ ...valid, message: "rövid" })), "message");
});

test("drops a filled honeypot without calling it invalid input", () => {
  assert.equal(submissionError(parseSubmission({ ...valid, company: "bot" })), "honeypot");
});

test("ignores non-objects and broken json", () => {
  assert.deepEqual(parseSubmission(["nope"]), emptySubmission());
  assert.deepEqual(submissionFromRaw("{"), emptySubmission());
  assert.equal(submissionError(parseSubmission({ name: 12 })), "name");
});

test("hashes the address and limits the sixth post", async () => {
  assert.equal(toHex(new Uint8Array([15, 255])).length, 4);
  const key = await addressKey("203.0.113.8");
  assert.match(key, /^contact:[0-9a-f]{64}$/);
  const store = new Map<string, string>();
  const kv = {
    async get(name: string) { return store.get(name) ?? null; },
    async put(name: string, value: string) { store.set(name, value); },
  };
  for (let i = 0; i < 5; i += 1) assert.equal(await isRateLimited(kv, "203.0.113.8"), false);
  assert.equal(await isRateLimited(kv, "203.0.113.8"), true);
  assert.equal(await isRateLimited(undefined, "203.0.113.8"), false);
});

test("stores a row only when the database binding exists", async () => {
  const submission = parseSubmission(valid);
  assert.equal(await storeMessage({}, submission), false);
  let saved = "";
  const env = {
    CONTACT_DB: {
      prepare(query: string) {
        saved = query;
        return { bind() { return { async run() { return { success: true }; } }; } };
      },
    },
  };
  assert.equal(await storeMessage(env, submission), true);
  assert.match(saved, /^INSERT INTO messages/);
});

test("reads json and form bodies", async () => {
  const jsonRequest = new Request("https://galyaszferenc.pages.dev/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(valid),
  });
  assert.equal((await readBody(jsonRequest)).email, valid.email);
  assert.equal(wantsHtml(jsonRequest), false);
  const form = new FormData();
  form.set("name", valid.name);
  form.set("email", valid.email);
  form.set("topic", valid.topic);
  form.set("message", valid.message);
  const formRequest = new Request("https://galyaszferenc.pages.dev/api/contact", { method: "POST", body: form });
  assert.equal((await readBody(formRequest)).topic, "foto");
  assert.equal(wantsHtml(formRequest), true);
});

test("returns json for fetch and a redirect for a plain form", async () => {
  const env = {
    CONTACT_DB: {
      prepare() {
        return { bind() { return { async run() { return { success: true }; } }; } };
      },
    },
  };
  const request = new Request("https://galyaszferenc.pages.dev/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(valid),
  });
  const response = await onRequestPost({ request, env });
  assert.equal(response.status, 200);
  assert.equal((await response.json()).ok, true);
  const form = new FormData();
  form.set("name", "A");
  const html = await onRequestPost({
    request: new Request("https://galyaszferenc.pages.dev/api/contact", { method: "POST", body: form }),
    env,
  });
  assert.equal(html.status, 303);
  assert.equal(html.headers.get("location"), "https://galyaszferenc.pages.dev/kapcsolat?sent=0");
  const direct = jsonResult(400, false, "name");
  assert.equal(direct.headers.get("cache-control"), "no-store");
  const redirect = htmlResult(request, 200);
  assert.match(redirect.headers.get("location") ?? "", /sent=1$/);
});
