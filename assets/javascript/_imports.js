import { pgs } from "./_pgs.js";

import { PGS_accordion } from "./components/_accordion.js";
import { PGS_dropdown } from "./components/_dropdown.js";
import { PGS_menu } from "./components/_menu.js";
import { PGS_modal } from "./components/_modals.js";
import { PGS_notification } from "./components/_notifications.js";
import { PGS_slides } from "./components/_slides.js";
import { PGS_stepTabs } from "./components/_stepTabs.js";
import { PGS_steps } from "./components/_steps.js";
import { PGS_formValidate } from "./functions/_formValidate.js";
import { PGS_scrollHorizontal } from "./functions/_scrollY.js";

pgs.registerImport(
    PGS_accordion,
    PGS_dropdown,
    PGS_menu,
    PGS_modal,
    PGS_notification,
    PGS_slides,
    PGS_stepTabs,
    PGS_steps,
    PGS_formValidate,
    PGS_scrollHorizontal,
);
