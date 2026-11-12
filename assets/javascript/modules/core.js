// always there, and published first: every page reads the theme and recolors its SVGs
import { pgs } from "../_pgs.js";
import { PGS_darkmode } from "../base/_darkmode.js";
import { PGS_svg } from "../base/_svg.js";

pgs.registerModules({ darkmode: PGS_darkmode, svg: PGS_svg });
