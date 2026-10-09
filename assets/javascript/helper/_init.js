import { pgs } from "../_pgs.js";

export function PGS_init(root = document) {
    if (!(root instanceof Document || root instanceof Element)) {
        throw pgs.helper.invalid("helper.init", "root must be a Document or an Element");
    }

    const initialized = new Set();

    // pgs.helper holds helper functions, and its own init is this function: it is not a module to walk
    Object.entries(pgs).forEach(([name, module]) => {
        if (name === "helper") return;

        const init = module?.init;
        if (typeof init !== "function" || initialized.has(init)) return;

        initialized.add(init);
        init(root);
    });

    return root;
}
