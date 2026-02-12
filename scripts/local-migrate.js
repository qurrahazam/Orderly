const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const migrationsDir = path.join(__dirname, "../prisma/migrations");
const localDir = path.join(__dirname, "../prisma/local_migrations");

// Ensure local folder exists
if (!fs.existsSync(localDir)) {
  fs.mkdirSync(localDir, { recursive: true });
}

// Get existing migration folders before running
const before = fs.readdirSync(migrationsDir);

// Run Prisma migrate
execSync("npx prisma migrate dev", { stdio: "inherit" });

// Get migration folders after running
const after = fs.readdirSync(migrationsDir);

// Detect new folder
const newMigration = after.find(f => !before.includes(f));

if (newMigration) {
  const from = path.join(migrationsDir, newMigration);
  const to = path.join(localDir, newMigration);

  fs.renameSync(from, to);
  console.log(`Moved migration to local_migrations/${newMigration}`);
} else {
  console.log("No new migration detected.");
}
