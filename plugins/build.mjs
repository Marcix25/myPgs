// mypgs/build for an ES module config (vite.config.js): the same as build.cjs
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { pgsModules, modules } = require("./build.cjs");

export { pgsModules, modules };
