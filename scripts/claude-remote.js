#!/usr/bin/env node
//= CLAUDE REMOTE
// Starts Claude Code with Remote Control inside a detached tmux session, so it keeps running after
// the SSH/VS Code connection is closed (VS Code Remote-SSH kills its own children on disconnect).
// `timeout` ends the session after DURATION. Usage: claude-remote.js [start|stop|attach|status]

"use strict";

const path = require("path");
const { spawnSync } = require("child_process");

const SESSION = "claude-remote";
const DURATION = "7d";
const ROOT = path.resolve(__dirname, "..");
const SITES = path.resolve(ROOT, "..");
const ADD_DIRS = [
    path.join(SITES, "PGS_theme"),
    path.join(SITES, "PGS_plugin"),
    path.join(SITES, "pgsnew25/wordpress/wp-content/themes/PGS_theme-progettoilseme"),
    path.join(SITES, "social-economy/wordpress/wp-content/themes/PGS_theme-socialEconomy"),
    path.join(SITES, "ludosport/wordpress/wp-content/themes/PGS_theme-ludosport"),
];

function tmux(args, options = {}) {
    return spawnSync("tmux", args, { stdio: "inherit", ...options });
}

function isRunning() {
    return tmux(["has-session", "-t", SESSION], { stdio: "ignore" }).status === 0;
}

function start() {
    if (isRunning()) {
        console.log(`[claude:remote] already running (tmux session "${SESSION}"). Use claude:remote:attach to open it.`);
        return;
    }
    const claudeArgs = ["--remote-control", "--permission-mode", "auto"];
    for (const dir of ADD_DIRS) claudeArgs.push("--add-dir", dir);
    const quoted = claudeArgs.map((arg) => `'${arg.replace(/'/g, `'\\''`)}'`).join(" ");
    const result = tmux(["new-session", "-d", "-s", SESSION, "-c", ROOT, `timeout ${DURATION} claude ${quoted}`]);
    if (result.status !== 0) process.exit(result.status || 1);
    console.log(`[claude:remote] started for ${DURATION} (tmux session "${SESSION}").`);
    console.log("[claude:remote] npm run claude:remote:attach to open it, Ctrl+b then d to detach.");
}

function stop() {
    if (!isRunning()) return console.log("[claude:remote] not running.");
    tmux(["kill-session", "-t", SESSION]);
    console.log("[claude:remote] stopped.");
}

function attach() {
    if (!isRunning()) return console.log("[claude:remote] not running. Use npm run claude:remote first.");
    tmux(["attach", "-t", SESSION]);
}

function status() {
    console.log(isRunning() ? `[claude:remote] running (tmux session "${SESSION}").` : "[claude:remote] not running.");
}

const commands = { start, stop, attach, status };
const command = process.argv[2] || "start";
if (!commands[command]) {
    console.error(`[claude:remote] unknown command "${command}". Use: ${Object.keys(commands).join(", ")}.`);
    process.exit(1);
}
commands[command]();
