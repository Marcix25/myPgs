import { pgs } from "./_pgs.js";

import { PGS_init } from "./helper/_init.js";

// each file imports one module, which starts itself on import, and publishes it on pgs. A project
// lists the ones it uses in mypgs.config.json: its build (mypgs/build) resolves the others to an empty
// module. The order is the order the modules are published in, which pgs.helper.init walks;
// core (darkmode, svg) cannot be left out
import "./modules/core.js";
import "./modules/accordion.js";
import "./modules/alerts.js";
import "./modules/dropdown.js";
import "./modules/menu.js";
import "./modules/modal.js";
import "./modules/pageNav.js";
import "./modules/header.js";
import "./modules/navSmart.js";
import "./modules/notification.js";
import "./modules/toast.js";
import "./modules/search.js";
import "./modules/formControls.js";
import "./modules/formAddon.js";
import "./modules/slides.js";
import "./modules/stepTabs.js";
import "./modules/steps.js";
import "./modules/summary.js";
import "./modules/tabs.js";
import "./modules/formValidate.js";

// init walks what is registered above
pgs.helper.init = PGS_init;
