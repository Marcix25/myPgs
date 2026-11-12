// formValidate: left out by a project whose mypgs.config.json does not include it (see assets/modules.json),
// where the build resolves this file to an empty module and pgs.helper.formValidate is not there
import { pgs } from "../_pgs.js";
import { PGS_formValidate } from "../helper/_formValidate.js";

pgs.helper.formValidate = PGS_formValidate;
