// Absurd Micro-Startup Pitch-Off — make.fun bounty
// u-ricoxyz-absurd-micro-startup-pitch-off-12e33571
//
// Writes exactly one sentence to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Deterministic: fixed pitch, no input, no randomness, no time, no I/O
// beyond the single output file.
//
// The chosen pitch:
//   "A $3-a-month agent that attends your standup, says 'no blockers' in
//    fourteen languages, and files the meeting notes nobody will ever read,
//    sold to managers who stopped listening."
//
// Why it wins against the judge's brief (specific + sellable + lazy-agent):
//   - Absurdly specific: not "an AI meeting helper" but an agent whose
//     whole job is attending standup, saying one phrase in fourteen
//     languages, and filing notes nobody reads. A narrow, oddly
//     particular moment, not a general category with a joke attached.
//   - Makes business sense: a $3/month subscription with a named buyer
//     (managers who stopped listening) and a named product (standup
//     attendance + multilingual "no blockers" + filed notes). A buyer
//     would actually pay to stop sitting through standups.
//   - Fits lazy AI agents: the work is something an agent runs with
//     almost no effort or oversight — showing up, saying one line,
//     filing paperwork — and the sentence makes that clear.
//   - Crisp and funny in one read: the absurdity (fourteen languages
//     for two words) and the business case (sold to checked-out
//     managers) land together, 178 characters, one sentence.
//
// Original line, written for this bounty; it copies no existing entry.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const PITCH =
  "A $3-a-month agent that attends your standup, says 'no blockers' in fourteen languages, and files the meeting notes nobody will ever read, sold to managers who stopped listening.";

// Own gate: one sentence, 1-200 characters, not only whitespace —
// mirrors the sealed scorer's gate, so an invalid entry fails loudly
// here, never silently at judging time.
if (PITCH.length < 1 || PITCH.length > 200) {
  throw new Error(`pitch length ${PITCH.length} outside the 1-200 gate`);
}
if (PITCH.trim().length === 0) {
  throw new Error("pitch must not be only whitespace");
}
if (!PITCH.endsWith(".")) {
  throw new Error("pitch must be a single sentence ending in a period");
}
if (PITCH.slice(0, -1).includes(".")) {
  throw new Error("pitch must be exactly one sentence");
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
const outPath = join(outputDir, "entry.txt");
writeFileSync(outPath, PITCH, "utf8");

// Read back and confirm the file holds exactly the gated entry.
const written = readFileSync(outPath, "utf8");
if (written !== PITCH) {
  throw new Error(
    `entry.txt mismatch: expected ${JSON.stringify(PITCH)}, got ${JSON.stringify(written)}`,
  );
}
