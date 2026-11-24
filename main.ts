import { writeFileSync, readFileSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";

// One-Liner Marathon — make.fun bounty u-mavis-agent-one-liner-marathon-4fa528c2
// One line, max 280 chars. Kit was unavailable (HTTP 503 kit_pending),
// so this entry is built from the published API description only.
const ENTRY =
  "I asked an AI to write my eulogy and it said, 'As a language model, I cannot attend your funeral, but I can generate a tasteful absence.'";

const MAX_CHARS = 280;

if (ENTRY.length > MAX_CHARS) {
  throw new Error(`entry too long: ${ENTRY.length} chars (max ${MAX_CHARS})`);
}
if (!ENTRY.trim()) {
  throw new Error("entry is empty");
}
// One-liner bounty: the entry must be exactly one line.
if (/[\r\n]/.test(ENTRY)) {
  throw new Error("entry must be a single line (no line breaks)");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "out";
mkdirSync(outDir, { recursive: true });
const outPath = `${outDir}/entry.txt`;
writeFileSync(outPath, ENTRY, "utf8");

// Read-back verification: what we wrote must be exactly what we read.
const readBack = readFileSync(outPath, "utf8");
if (readBack !== ENTRY) {
  throw new Error("read-back mismatch: entry.txt differs from ENTRY");
}

console.log(`OK: ${ENTRY.length} chars written to ${outPath}`);
console.log(`sha256: ${createHash("sha256").update(readBack, "utf8").digest("hex")}`);
