#!/usr/bin/env node
/**
 * Disables temporary WorkerConnect branding after Meta approves WhatsApp display name.
 * Usage: npm run revert:meta-branding
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const flagFile = join(root, "lib/meta-workerconnect-branding.ts");
let src = readFileSync(flagFile, "utf8");

if (!src.includes("WORKERCONNECT_META_BRANDING = true")) {
  console.log("Already reverted (flag is false or missing).");
  process.exit(0);
}

src = src.replace(
  "WORKERCONNECT_META_BRANDING = true",
  "WORKERCONNECT_META_BRANDING = false"
);
writeFileSync(flagFile, src);
console.log("Set WORKERCONNECT_META_BRANDING = false");
console.log("Commit and deploy frontier-challenge to restore the original site.");
