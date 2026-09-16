//# "mypgs" FOR THE DEMO PAGE
//+ The reference examples import the library the way a real project does:
//+
//+     import { pgs } from "mypgs";
//+
//+ That is a bare specifier. A bundler resolves it — a webpack build marks "mypgs" as external and
//+ points it at the global the library publishes — but a browser has no resolution algorithm of its
//+ own and throws "Failed to resolve module specifier". The demo page has no bundler: it loads
//+ dist/javascript/index.js as a classic script, so the examples ran straight into that error and
//+ none of them worked.
//+
//+ site.structure.html maps "mypgs" to this file through an import map, so the examples stay exactly
//+ as they are documented and still run. Nothing is loaded twice: the library is already on the page
//+ and this only re-exports what it published on globalThis.
export const pgs = globalThis.pgs;
export default globalThis.mypgs;
