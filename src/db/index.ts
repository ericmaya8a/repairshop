import { DATABASE_URL } from "@/config";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

config({ path: ".env.local" });

const sql = neon(DATABASE_URL);
export const db = drizzle({ client: sql, casing: "snake_case", schema });
