export type Submission = {
  name: string;
  email: string;
  topic: string;
  message: string;
  honeypot: string;
};

const TOPICS = new Set(["foto", "zene", "fejlesztes", "egyeb"]);

export function emptySubmission(): Submission {
  return { name: "", email: "", topic: "", message: "", honeypot: "" };
}

export function readText(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function parseSubmission(payload: unknown): Submission {
  if (!isRecord(payload)) return emptySubmission();
  return {
    name: readText(payload.name, 120),
    email: readText(payload.email, 200),
    topic: readText(payload.topic, 40),
    message: readText(payload.message, 4000),
    honeypot: readText(payload.company, 200),
  };
}

export function submissionFromRaw(raw: string): Submission {
  try {
    return parseSubmission(JSON.parse(raw));
  } catch {
    return emptySubmission();
  }
}

export function submissionError(submission: Submission): string {
  if (submission.honeypot) return "honeypot";
  if (submission.name.length < 2) return "name";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(submission.email)) return "email";
  if (!TOPICS.has(submission.topic)) return "topic";
  if (submission.message.length < 10) return "message";
  return "";
}
