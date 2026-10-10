import { pgs } from "./_pgs.js";

import { PGS_darkmode } from "./base/_darkmode.js";
import { PGS_svg } from "./base/_svg.js";
import { PGS_accordion } from "./components/_accordion.js";
import { PGS_alert } from "./components/_alerts.js";
import { PGS_dropdown } from "./components/_dropdown.js";
import { PGS_menu } from "./components/_menu.js";
import { PGS_modal } from "./components/_modal.js";
import { PGS_pageNav } from "./components/_pageNav.js";
import { PGS_notification } from "./components/_notification.js";
import { PGS_toast } from "./components/_toast.js";
import { PGS_search } from "./components/_search.js";
import { PGS_slides } from "./components/_slides.js";
import { PGS_stepTabs } from "./components/_stepTabs.js";
import { PGS_steps } from "./components/_steps.js";
import { PGS_summary } from "./components/_summary.js";
import { PGS_tabs } from "./components/_tabs.js";
import { PGS_header } from "./layout/_header.js";
import { PGS_navSmart } from "./layout/_navSmart.js";
import { PGS_formValidate } from "./helper/_formValidate.js";
import { PGS_init } from "./helper/_init.js";

pgs.registerModules({
    darkmode: PGS_darkmode,
    svg: PGS_svg,
    accordion: PGS_accordion,
    alert: PGS_alert,
    dropdown: PGS_dropdown,
    menu: PGS_menu,
    modal: PGS_modal,
    pageNav: PGS_pageNav,
    header: PGS_header,
    navSmart: PGS_navSmart,
    notification: PGS_notification,
    toast: PGS_toast,
    search: PGS_search,
    slides: PGS_slides,
    stepTabs: PGS_stepTabs,
    steps: PGS_steps,
    summary: PGS_summary,
    tabs: PGS_tabs,
});

// the two helpers that need the module system: they walk or build on what is registered above
Object.assign(pgs.helper, { init: PGS_init, formValidate: PGS_formValidate });
