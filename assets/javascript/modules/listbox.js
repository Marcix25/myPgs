// listbox: left out by a project whose mypgs.config.json does not include it (see assets/modules.json),
// where the build resolves this file to an empty module. search and formAddon require it: they import the
// controller themselves, this file only publishes it as pgs.listbox
import { pgs } from "../_pgs.js";
import { PGS_listbox } from "../components/_listbox.js";

pgs.registerModules({ listbox: PGS_listbox });
