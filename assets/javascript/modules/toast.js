// toast: left out by a project whose mypgs.config.json does not include it (see assets/modules.json),
// where the build resolves this file to an empty module: the component is neither imported nor started
import { pgs } from "../_pgs.js";
import { PGS_toast } from "../components/_toast.js";

pgs.registerModules({ toast: PGS_toast });
