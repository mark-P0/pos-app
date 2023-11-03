import type { Config } from "drizzle-kit";

export default {
  schema: "./schema.ts",
  driver: "better-sqlite",
  dbCredentials: {
    url: "./data.sqlite",
  },
} satisfies Config;
