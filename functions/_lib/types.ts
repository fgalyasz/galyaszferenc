export type ContactStatement = {
  bind(...values: string[]): { run(): Promise<{ success: boolean }> };
};

export type ContactDatabase = {
  prepare(query: string): ContactStatement;
};

export type RateLimitKv = {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
};

export type Env = {
  CONTACT_DB?: ContactDatabase;
  CONTACT_RATE_LIMIT?: RateLimitKv;
};

export type Context = {
  request: Request;
  env: Env;
};

export type Result = {
  status: number;
  body: { ok: boolean; error?: string };
};
