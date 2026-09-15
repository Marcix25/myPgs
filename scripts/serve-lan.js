#!/usr/bin/env node
//# SERVE LAN
//+ Wraps scripts/serve-lan.py (a no-cache static server) used to browse the demo from another
//+ device on the same network (a phone, say): prints the LAN URL for the pre-baked demo page before
//+ starting the server, so there's no need to remember/type the path by hand. Plain
//+ `python3 -m http.server` sends no Cache-Control header, so a phone browser keeps serving a stale
//+ CSS/JS/HTML from cache until a hard refresh — serve-lan.py disables caching instead.

"use strict";

const path = require("path");
const os = require("os");
const { spawn } = require("child_process");

function getLanIp() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name] || []) {
            if (iface.family === "IPv4" && !iface.internal) return iface.address;
        }
    }
    return null;
}

const PORT = 3025;
const DEMO_PATH = "/site/site.html";
const lanIp = getLanIp();

console.log(`[serve:lan] http://127.0.0.1:${PORT}${DEMO_PATH}`);
if (lanIp) console.log(`[serve:lan] http://${lanIp}:${PORT}${DEMO_PATH}`);

spawn("python3", [path.join(__dirname, "serve-lan.py"), String(PORT)], { stdio: "inherit" });
