import { pgs } from "../_pgs.js";

export function PGS_init(root = document) {
    if (!(root instanceof Document || root instanceof Element)) {
        throw new TypeError("pgs.init(): root must be a Document or an Element");
    }

    const initialized = new Set();

    Object.values(pgs).forEach(module => {
        const init = module?.init;
        if (typeof init !== "function" || initialized.has(init)) return;

        initialized.add(init);
        init(root);
    });

    return root;
}
