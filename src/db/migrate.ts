import { migrate } from "drizzle-orm/neon-http/migrator";
import { db } from ".";

async function main() {
  try {
    await migrate(db, {
      migrationsFolder: "src/db/migrations",
    });
    console.log("Migration completed 🫡");
  } catch (error) {
    console.error("Error during migration: ", error);
    process.exit(1);
  }
}

main();
