#!/usr/bin/env node
//# PRECOMMIT
//+ Runs the same checks in the same order documented in AGENTS-DEVELOPMENT.md's "Build and
//+ Verification" section, stopping at the first failure, and always prints the full checklist —
//+ steps already run get a tick, the one that broke gets a cross, the ones never reached stay
//+ plain — so a broken run still shows the whole picture instead of scrollback to interpret.
//+
//+ Run with: npm run precommit

"use strict";

const { execSync } = require("child_process");

const steps = [
    ["build", "npx webpack"],
    ["pgs-map", "node scripts/generate-pgs-map.js"],
    ["docs:generate", "npm run docs:generate"],
    ["sitebuild", "npm run sitebuild"],
    ["test", "npm test"],
    ["git diff --check", "git diff --check"],
];

let brokenAt = -1;

for (let i = 0; i < steps.length; i++) {
    const [, command] = steps[i];
    try {
        execSync(command, { stdio: "inherit" });
    } catch {
        brokenAt = i;
        break;
    }
}

console.log("");
console.log(brokenAt === -1 ? "precommit ok, ready to commit:" : "precommit failed:");

steps.forEach(([name], i) => {
    if (brokenAt === -1 || i < brokenAt) console.log(`  ✅ ${name}`);
    else if (i === brokenAt) console.log(`  ❌ ${name}`);
    else console.log(`     ${name}`);
});

if (brokenAt !== -1) {
    console.log("");
    console.log(`Fix "${steps[brokenAt][0]}" (see the output above) and run npm run precommit again.`);
    process.exit(1);
}
