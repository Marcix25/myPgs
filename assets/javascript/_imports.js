import { pgs } from "./_pgs.js";

import { PGS_svg } from "./base/_svg.js";
import { PGS_accordion } from "./components/_accordion.js";
import { PGS_alert } from "./components/_alerts.js";
import { PGS_dropdown } from "./components/_dropdown.js";
import { PGS_menu } from "./components/_menu.js";
import { PGS_modal } from "./components/_modals.js";
import { PGS_notification } from "./components/_notifications.js";
import { PGS_search } from "./components/_search.js";
import { PGS_slides } from "./components/_slides.js";
import { PGS_stepTabs } from "./components/_stepTabs.js";
import { PGS_steps } from "./components/_steps.js";
import { PGS_summary } from "./components/_summary.js";
import { PGS_formValidate } from "./helper/_formValidate.js";
import { PGS_scrollHorizontal } from "./helper/_scrollY.js";

pgs.registerModules({
    svg: PGS_svg,
    accordion: PGS_accordion,
    alert: PGS_alert,
    dropdown: PGS_dropdown,
    menu: PGS_menu,
    modal: PGS_modal,
    notification: PGS_notification,
    search: PGS_search,
    slides: PGS_slides,
    stepTabs: PGS_stepTabs,
    steps: PGS_steps,
    summary: PGS_summary,
    formValidate: PGS_formValidate,
    scrollHorizontal: PGS_scrollHorizontal,
});
