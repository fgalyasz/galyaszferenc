import type { Submission } from "./validate.ts";
import type { Env } from "./types.ts";

const INSERT = "INSERT INTO messages (created_at, name, email, topic, message) VALUES (?, ?, ?, ?, ?)";

export async function storeMessage(env: Env, submission: Submission): Promise<boolean> {
  if (!env.CONTACT_DB) return false;
  const createdAt = new Date().toISOString();
  const statement = env.CONTACT_DB.prepare(INSERT);
  const bound = statement.bind(createdAt, submission.name, submission.email, submission.topic, submission.message);
  const result = await bound.run();
  return result.success;
}
