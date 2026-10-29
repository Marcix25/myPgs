// one voice for every message the library prints or throws: "pgs.<module>.<method>(): <what>".
// The scope is the call the author made ("tabs.init", "modal.open", "header.init"), so a line in
// the console says which module spoke without anybody having to search for the text

// invalid markup or a request that can be skipped: the page keeps working, the author is told
export function PGS_warn(scope, message, ...details) {
    console.warn(`pgs.${scope}(): ${message}`, ...details);
}

// invalid input to a public method: `throw PGS_invalid("summary.init", "message must be an object")`
export function PGS_invalid(scope, message) {
    return new TypeError(`pgs.${scope}(): ${message}`);
}
