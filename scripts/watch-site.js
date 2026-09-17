#!/usr/bin/env node
//# WATCH SITE
//+ Re-runs scripts/build-site-static.js whenever one of its inputs changes, so none of
//+ site/build/*.html is ever the previous version of itself while iterating. Those inputs are
//+ exactly five things:
//+ - reference/html/**/*.html — the panels and the nav come from here;
//+ - site/parts/demo.structure.html, site/parts/site.structure.html and
//+   scripts/demo-render.js — the two shells and the renderer the build calls;
//+ - site/page/*.html, except demo.html — every other page's own hand-authored content
//+   (home.html, test.html, and any future page dropped in there the same way). demo.html is
//+   excluded on purpose: the build writes it itself from demo.structure.html, so watching it too
//+   would have every build retrigger the next one;
//+ - dist/css/index.css — read to list each component's CSS variables, so a webpack rebuild has to
//+   reach the demo too.
//+ demo.js and demo.css are only linked by the generated page, never read into it: editing one
//+ needs a browser refresh, not a rebuild, so they are deliberately not watched.
//+
//+ Directories are watched, not files: an editor that saves by writing a temporary file and renaming
//+ it over the original — and webpack, which does the same to dist/css/index.css — leaves a watcher
//+ bound to a file pointing at an inode nothing writes to again. Watching the parent directory and
//+ filtering by name survives that. fs.watch is not recursive on Linux, so every directory under
//+ reference/html gets its own watcher, re-synced after each build to pick up new ones.
//+
//+ Run with: npm run sitebuild:watch (alongside npm run start:watch, which keeps dist/ fresh)

"use strict";

const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const PROJECT_ROOT = path.resolve(__dirname, "..");
const BUILD_SCRIPT = path.join(__dirname, "build-site-static.js");
const DEBOUNCE_MS = 200;

//+ what to watch: a root directory, whether to descend into it, and which filenames matter
const TARGETS = [
    {
        root: path.join(PROJECT_ROOT, "reference", "html"),
        recursive: true,
        accept: name => name.endsWith(".html")
    },
    {
        root: __dirname,
        recursive: false,
        accept: name => name === "demo-render.js"
    },
    {
        root: path.join(PROJECT_ROOT, "site", "parts"),
        recursive: false,
        accept: name => name === "demo.structure.html" || name === "site.structure.html"
    },
    {
        //== demo.html excluded: the build writes it itself (see the header comment above)
        root: path.join(PROJECT_ROOT, "site", "page"),
        recursive: false,
        accept: name => name.endsWith(".html") && name !== "demo.html"
    },
    {
        root: path.join(PROJECT_ROOT, "dist", "css"),
        recursive: false,
        accept: name => name === "index.css"
    }
];

const watchers = new Map();
let debounceId = null;
let pendingReason = "";
let running = false;
let queued = false;

//+
function isDirectory(target) {
    try {
        return fs.statSync(target).isDirectory();
    } catch {
        return false;
    }
}

//+ every directory under root, root included
function listDirectories(root) {
    if (!fs.existsSync(root)) return [];

    const found = [];
    const stack = [root];

    while (stack.length) {
        const current = stack.pop();
        found.push(current);

        for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
            if (entry.isDirectory()) stack.push(path.join(current, entry.name));
        }
    }

    return found;
}

//+ SYNC WATCHERS
//== called again after every build: a new reference/html subdirectory is watched from then on, and
//== one that disappeared drops its watcher instead of throwing later
function syncWatchers() {
    const wanted = new Set();

    TARGETS.forEach(target => {
        const directories = target.recursive ? listDirectories(target.root) : (fs.existsSync(target.root) ? [target.root] : []);

        directories.forEach(directory => {
            wanted.add(directory);
            if (watchers.has(directory)) return;

            try {
                const watcher = fs.watch(directory, (event, filename) => {
                    if (!filename) return;

                    const changed = path.join(directory, filename);

                    //== a subdirectory that appears has to start being watched at once: nothing
                    //== written inside it would be seen otherwise, and the event name alone does
                    //== not say whether it is a file or a directory
                    if (target.recursive && isDirectory(changed)) {
                        syncWatchers();
                        return;
                    }

                    if (!target.accept(path.basename(filename))) return;
                    scheduleBuild(path.relative(PROJECT_ROOT, changed));
                });

                watcher.on("error", () => {
                    watcher.close();
                    watchers.delete(directory);
                });

                watchers.set(directory, watcher);
            } catch (error) {
                console.warn(`[watch-site] impossibile osservare ${path.relative(PROJECT_ROOT, directory)}: ${error.message}`);
            }
        });
    });

    [...watchers.keys()].forEach(directory => {
        if (wanted.has(directory)) return;
        watchers.get(directory).close();
        watchers.delete(directory);
    });
}

//+ SCHEDULE BUILD
//== one save can fire several events, and saving a handful of files at once should still cost one
//== build: the timer restarts on every event and only the first file is worth naming
function scheduleBuild(reason) {
    if (!pendingReason) pendingReason = reason;
    if (debounceId) clearTimeout(debounceId);

    debounceId = setTimeout(() => {
        debounceId = null;
        const changed = pendingReason;
        pendingReason = "";
        runBuild(changed);
    }, DEBOUNCE_MS);
}

//+ RUN BUILD
//== a child process, not a require(): the build reads its inputs at module load, and a syntax error
//== in a source file it pulls in must not take the watcher down with it
function runBuild(reason) {
    if (running) {
        queued = true;
        return;
    }

    running = true;
    if (reason) console.log(`[watch-site] ${reason} cambiato, ricostruisco...`);

    const child = spawn(process.execPath, [BUILD_SCRIPT], { stdio: "inherit" });

    child.on("error", error => {
        console.error(`[watch-site] build non avviata: ${error.message}`);
    });

    child.on("exit", code => {
        running = false;
        if (code !== 0) console.error(`[watch-site] build fallita (codice ${code}), resto in ascolto.`);

        syncWatchers();

        if (queued) {
            queued = false;
            runBuild("");
        }
    });
}

//= START
syncWatchers();

if (!watchers.size) {
    console.error("[watch-site] nessuna directory da osservare: esegui dalla radice del progetto.");
    process.exit(1);
}

console.log("[watch-site] osservo:");
TARGETS.forEach(target => console.log(`  ${path.relative(PROJECT_ROOT, target.root)}${target.recursive ? "/**" : ""}`));
console.log("[watch-site] Ctrl+C per uscire.");

runBuild("");

["SIGINT", "SIGTERM"].forEach(signal => {
    process.on(signal, () => {
        watchers.forEach(watcher => watcher.close());
        console.log("\n[watch-site] fermato.");
        process.exit(0);
    });
});
