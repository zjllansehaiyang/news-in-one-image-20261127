// make.fun entry — "Sum up 27 November's world news in one image"
//
// The entry is a single poster image (entry.png, kept beside this file)
// that sums up the world news of Friday 27 November 2026: an EU budget
// summit ending without a deal, record rain and evacuations in Okinawa,
// Australia's dangerous bushfire-summer outlook, a Science study on the
// planet's shrinking rivers and lakes, and England's record early flu
// surge. The poster source (poster.html) and the reporting behind each
// story (SOURCES.md) live in this repository.
//
// The grader runs this program twice and expects identical output bytes
// both times, so the program does the simplest deterministic thing:
// copy the bundled entry.png to the output directory, byte for byte.
// No network, no clock, no randomness — Node standard library only.

import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Resolve the folder this file lives in, so entry.png is found no
// matter which working directory the program is started from.
const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");

// MAKEFUN_OUTPUT_DIR stands in for /output outside the grader sandbox.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const target = join(outDir, "entry.png");
copyFileSync(source, target);

// Report what was written, so a run leaves a trace of the exact payload.
const { size } = statSync(target);
console.log(`entry.png written to ${target} (${size} bytes)`);
