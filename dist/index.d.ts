declare global {
  type PgsSelectorValue = string | string[];
  type PgsStateValue = string | string[];

  interface PgsQueryableApi {
    querySelector(value: PgsSelectorValue): Element | null;
    querySelectorAll(value: PgsSelectorValue): NodeListOf<Element>;
  }

  interface PgsStateApi {
    (...values: PgsStateValue[]): PgsStateApi;
    add(...values: PgsStateValue[]): PgsStateApi;
    remove(...values: PgsStateValue[]): PgsStateApi;
    toggle(value: string, force?: boolean): boolean;
    contains(value: string): boolean;
    querySelector(value: PgsSelectorValue): Element | null;
    querySelectorAll(value: PgsSelectorValue): NodeListOf<Element>;
    closest(value: PgsSelectorValue): Element | null;
    value: string | null;
  }

  interface PgsOptionApi {
    /** Boolean flags only: CSS flags and JavaScript-only flags, always inside the pgs attribute. Never touches pgs-data. */
    add(...values: PgsStateValue[]): PgsOptionApi;
    remove(...values: PgsStateValue[]): PgsOptionApi;
    toggle(value: string, force?: boolean): boolean;
    contains(key: string): boolean;
    querySelector(value: PgsSelectorValue): Element | null;
    querySelectorAll(value: PgsSelectorValue): Element[];
    closest(value: PgsSelectorValue): Element | null;
  }

  interface PgsDataApi {
    /** Reads the payload of a key[payload] entry in pgs-data, preserving nested brackets and JSON strings. */
    getValueBrackets(key: string): string | undefined;
    /** Sets or replaces a key[payload] entry in pgs-data. Never touches the pgs attribute. */
    setValueBrackets(key: string, value?: string): PgsDataApi;
    /** The raw pgs-data attribute; assigning null removes it. */
    value: string | null;
  }

  interface PgsElementApi extends PgsQueryableApi {
    (): PgsElementApi;
    closest(value: PgsSelectorValue): Element | null;
    add(...values: string[]): PgsElementApi;
    remove(...values: string[]): PgsElementApi;
    toggle(value: string, force?: boolean): boolean;
    contains(value: string): boolean;
    value: string | null;
    state: PgsStateApi;
    option: PgsOptionApi;
    data: PgsDataApi;
  }

  interface PgsDocumentApi extends PgsQueryableApi {
    (): PgsDocumentApi;
  }

  type PgsApi = PgsElementApi | PgsDocumentApi;

  //= MODULES
  /** What every component instance has: the element it belongs to, plus the two lifecycle calls. */
  interface PgsInstance<Self> {
    element: Element;
    /** Stops the behavior: removes its listeners and observers, drops the instance. Generated markup stays. */
    destroy(): void;
    /** destroy() then a fresh init of this element only; returns the new instance. */
    refresh(): Self | undefined;
  }

  interface PgsModule<Instance> {
    init(root?: Document | Element): void;
    api(selector: Element): Instance | undefined;
  }

  /** Every pgs:* event bubbles, and its detail carries the element it was dispatched on. */
  interface PgsEventDetail {
    element: Element;
  }

  //== accordion
  interface PgsAccordionInstance extends PgsInstance<PgsAccordionInstance> {
    button: Element;
    content: Element;
    open(): void;
    close(): void;
    toggle(): void;
    isOpen(): boolean;
  }

  //== alert, toast and notification
  interface PgsAlertButton {
    id?: string;
    title?: string;
    /** Relative, http(s):, mailto: or tel:; any other scheme is ignored with a warning. */
    link?: string | null;
    close?: boolean;
    optionButton?: string | string[] | null;
  }

  interface PgsAlertOptions {
    title?: string;
    description?: string;
    closeTitle?: string;
    dismissible?: boolean;
    timeout?: number;
    buttons?: PgsAlertButton[];
    /** Trusted markup for the icon slot, written into the card as given and not sanitized. Leave it out for the glyph of the type. */
    icon?: string;
    /** Trusted markup for the dismiss button, written into it as given and not sanitized; any icon set. Leave it out for a cross (icon-close). Only read when the card is dismissible. */
    dismissIcon?: string;
    /** The id the pgs:alert:* events report; generated when omitted. */
    id?: string;
    /** Where pgs.alert.* puts the card: a Document or Element root, and the container inside it. */
    root?: Document | Element;
    container?: string | Element;
    [option: string]: unknown;
  }

  type PgsAlertInput = string | PgsAlertOptions;

  interface PgsAlertModule {
    error(options?: PgsAlertInput): HTMLElement;
    success(options?: PgsAlertInput): HTMLElement;
    info(options?: PgsAlertInput): HTMLElement;
    warning(options?: PgsAlertInput): HTMLElement;
    neutral(options?: PgsAlertInput): HTMLElement;
  }

  interface PgsToastOptions extends PgsAlertOptions {
    position?: string | string[];
  }

  type PgsToastInput = string | PgsToastOptions;

  interface PgsToastModule {
    init(root?: Document | Element): void;
    trigger(root?: Document | Element): void;
    error(options?: PgsToastInput): void;
    success(options?: PgsToastInput): void;
    info(options?: PgsToastInput): void;
    warning(options?: PgsToastInput): void;
    neutral(options?: PgsToastInput): void;
    deleteAll(): void;
  }

  interface PgsNotificationModule {
    init(root?: Document | Element): void;
    trigger(root?: Document | Element): void;
    error(options?: PgsAlertInput): void;
    success(options?: PgsAlertInput): void;
    info(options?: PgsAlertInput): void;
    warning(options?: PgsAlertInput): void;
    neutral(options?: PgsAlertInput): void;
    deleteAll(): void;
  }

  interface PgsAlertCloseDetail extends PgsEventDetail {
    id: string;
    type: string;
    title?: string;
    description?: string;
  }

  interface PgsAlertButtonClickDetail extends PgsAlertCloseDetail {
    buttonId?: string;
    link?: string | null;
  }

  //== dropdown
  interface PgsDropdownInstance extends PgsInstance<PgsDropdownInstance> {
    trigger: Element;
    content: Element;
    open(): void;
    close(): void;
    toggle(): void;
    reposition(): void;
    isOpen(): boolean;
  }

  //== formValidate
  /** The messages a form shows; each one can also be set in the form's pgs-data. */
  interface PgsFormValidateMessages {
    formFieldErrorTitle?: string;
    formFieldError?: string;
    formFieldsError?: string;
    formSuccessTitle?: string;
    formSuccess?: string;
  }

  interface PgsFormValidateOptions {
    showSuccessOnValidate?: boolean;
    /** A selector, or an element, where the alerts go; it can sit outside the form. Without it and without a pgs="alertContainer" in the form, a toast is shown instead. */
    alertContainer?: string | Element;
    message?: PgsFormValidateMessages;
  }

  interface PgsTemporaryFieldError {
    set(field: Element, options?: string | { title?: string; message?: string }): PgsTemporaryFieldError;
    remove(field: Element): PgsTemporaryFieldError;
    clear(): PgsTemporaryFieldError;
  }

  interface PgsFormValidateInstance {
    container: Element;
    showSuccessOnValidate: boolean;
    alertContainer?: string | Element;
    temporaryFieldError: PgsTemporaryFieldError;
    validate(): boolean;
    success(description?: string, title?: string): void;
    validator(callback: (event: Event) => void, eventName?: string): PgsFormValidateInstance;
    addNewRule(rule: (...args: any[]) => unknown): PgsFormValidateInstance;
    /** Removes the listeners the instance added to the form. */
    destroy(): void;
  }

  /** A form has one validator: building a second on the same form destroys the first. */
  interface PgsFormValidateConstructor {
    new (form: Element, options?: PgsFormValidateOptions): PgsFormValidateInstance;
  }

  //== menu
  interface PgsMenuInstance extends PgsInstance<PgsMenuInstance> {
    type: "horizontal" | "vertical";
  }

  //== modal
  interface PgsModalInstance extends PgsInstance<PgsModalInstance> {
    button?: Element | null;
    dialog: HTMLDialogElement;
    closeButton?: Element | null;
    open(): void;
    close(): void;
    toggle(): void;
    isOpen(): boolean;
  }

  interface PgsModalEventDetail extends PgsEventDetail {
    modal: Element;
    dialog: HTMLDialogElement;
  }

  //== pageNav
  interface PgsPageNavInstance extends PgsInstance<PgsPageNavInstance> {
    panels: Element;
    /** Sets the hash and selects the panel; throws for an id no panel has. */
    select(id: string): void;
    /** Index of the current panel. */
    getCurrent(): number;
    getCurrentPanel(): Element;
  }

  interface PgsPageNavChangeDetail extends PgsEventDetail {
    panel: Element;
    items: Element[];
  }

  //== search
  type PgsSearchSuggestionInput = string | number | {
    label?: string;
    value?: string | number;
    disabled?: boolean;
    data?: unknown;
  };

  interface PgsSearchSuggestion {
    label: string;
    value: string;
    disabled: boolean;
    data: unknown;
  }

  interface PgsSearchSourceContext {
    query: string;
    signal: AbortSignal;
    limit: number;
    element: Element;
    input: HTMLInputElement;
  }

  interface PgsSearchSelectDetail extends PgsEventDetail {
    item: PgsSearchSuggestion;
    index: number;
    value: string;
    input: HTMLInputElement;
  }

  interface PgsSearchErrorDetail extends PgsEventDetail {
    /** What the source threw or rejected with. */
    error: unknown;
    query: string;
  }

  interface PgsSearchOptions {
    minLength: number;
    debounce: number;
    limit: number;
    submitOnSelect: boolean;
    searchOnFocus: boolean;
    source: PgsSearchSuggestionInput[] | ((context: PgsSearchSourceContext) => PgsSearchSuggestionInput[] | Promise<PgsSearchSuggestionInput[]>) | null;
    onSelect: ((detail: PgsSearchSelectDetail) => void) | null;
  }

  interface PgsSearchInstance extends PgsInstance<PgsSearchInstance> {
    input: HTMLInputElement;
    list: Element;
    configure(options: Partial<PgsSearchOptions>): PgsSearchInstance;
    setSource(source: PgsSearchOptions["source"]): PgsSearchInstance;
    /** Runs a query (the input's own value when none is given) and renders the suggestions. */
    search(query?: string): Promise<PgsSearchSuggestion[]>;
    open(): void;
    close(): void;
    clear(): void;
    cancel(): void;
    select(index?: number, submit?: boolean): PgsSearchSuggestion | null;
    items(): PgsSearchSuggestion[];
    isOpen(): boolean;
    isLoading(): boolean;
    setActiveIndex(index: number): void;
  }

  type PgsSearchModule = PgsModule<PgsSearchInstance>;

  //== slides
  interface PgsSlidesInstance extends PgsInstance<PgsSlidesInstance> {
    container: Element;
    prev(): void;
    next(): void;
    /** Throws for an index that is not an integer inside the slides. */
    goTo(index: number): void;
    getCurrentIndexes(): number[];
    getCurrentElements(): Element[];
    getTotal(): number;
    isAtStart(): boolean;
    isAtEnd(): boolean;
  }

  //== stepTabs
  interface PgsStepTabsInstance extends PgsInstance<PgsStepTabsInstance> {
    container: Element;
    restart(): void;
    /** Throws for an index that is not an integer inside the steps. */
    goTo(index: number, scroll?: boolean): void;
    next(): void;
    prev(): void;
    toggleLock(step: number, lock?: boolean): void;
    getCurrent(): number;
    getState(): { current: number; total: number };
  }

  interface PgsStepTabsChangeDetail extends PgsEventDetail {
    current: number;
    total: number;
  }

  //== range
  interface PgsRangeInstance extends PgsInstance<PgsRangeInstance> {
    /** Reads the value again, for a slider whose value a script wrote (no event is raised for that). */
    update(): void;
  }

  //== steps
  interface PgsStepsInstance extends PgsInstance<PgsStepsInstance> {
    steps(): Element[];
    getStep(index: number): Element | undefined;
    getTotal(): number;
  }

  //== summary
  interface PgsSummaryMessageOptions {
    showLess?: string;
    showMore?: string;
  }

  interface PgsSummaryOptions {
    message?: PgsSummaryMessageOptions;
  }

  interface PgsSummaryInstance extends PgsInstance<PgsSummaryInstance> {
    content: Element;
    button: Element;
    open(): void;
    close(): void;
    toggle(): void;
    isOpen(): boolean;
  }

  interface PgsSummaryModule {
    init(root?: Document | Element, options?: PgsSummaryOptions): void;
    api(selector: Element): PgsSummaryInstance | undefined;
  }

  //== tabs
  interface PgsTabsInstance extends PgsInstance<PgsTabsInstance> {
    list: Element;
    panels: Element;
    /** Throws for an index that is not an integer inside the tabs. */
    goTo(index: number): void;
    getCurrent(): number;
  }

  interface PgsTabsChangeDetail extends PgsEventDetail {
    current: number;
    tab: Element;
    panel: Element;
  }

  //== header and navSmart
  /** The instance of a header or a navSmart bar: only the lifecycle, the measuring is automatic. */
  interface PgsHeaderInstance extends PgsInstance<PgsHeaderInstance> {}

  interface PgsNavSmartInstance extends PgsInstance<PgsNavSmartInstance> {}

  //== the rest
  interface PgsSvgChangeColorDetail extends PgsEventDetail {
    isDarkMode: boolean;
  }

  interface PgsSvgModule {
    init(root?: Document | Element): void;
    eventChangeColor: string;
    applyColorsSVG(isDarkMode?: boolean): void;
    applyColorsLottie(isDarkMode?: boolean): void;
  }

  interface PgsInitOnlyModule {
    init(root?: Document | Element): void;
  }

  interface PgsHelper {
    /** Initializes every registered module inside root (the root itself included); returns root. */
    init(root?: Document | Element): Document | Element;
    formValidate: PgsFormValidateConstructor;
    /** The elements under root, plus root itself, that carry one of the tokens. */
    roots(root: Document | Element, token: string | string[]): Element[];
    directChildren(parent: Element, token: string | string[]): Element[];
    directChild(parent: Element, token: string | string[]): Element | null;
    /** "prefix-1", "prefix-2"... one counter per prefix. */
    uniqueId(prefix: string): string;
    /** Dispatches a bubbling event whose detail always carries `element`. */
    dispatch(target: Element | Document, name: string, detail?: Record<string, unknown>, options?: { cancelable?: boolean }): CustomEvent;
    rafThrottle<Args extends unknown[]>(callback: (...args: Args) => void): ((...args: Args) => void) & { cancel(): void };
    /** Calls back once per frame when nodes arrive later; null when there is no document. */
    watchDocument(callback: () => void, options?: MutationObserverInit): MutationObserver | null;
    onDocumentReady(callback: () => void): void;
    escapeHtml(value: unknown): string;
    formatText(value: unknown): string;
    warn(scope: string, message: string, ...details: unknown[]): void;
    invalid(scope: string, message: string): TypeError;
  }

  interface PgsFunction {
    (root: Document): PgsDocumentApi;
    (root: Element): PgsElementApi;
    (root: Document | Element): PgsApi;
    registerModules(modules: Record<string, any>): PgsFunction;
    helper?: PgsHelper;
    darkmode?: PgsInitOnlyModule;
    svg?: PgsSvgModule;
    accordion?: PgsModule<PgsAccordionInstance>;
    alert?: PgsAlertModule;
    dropdown?: PgsModule<PgsDropdownInstance>;
    menu?: PgsModule<PgsMenuInstance>;
    modal?: PgsModule<PgsModalInstance>;
    pageNav?: PgsModule<PgsPageNavInstance>;
    header?: PgsModule<PgsHeaderInstance>;
    navSmart?: PgsModule<PgsNavSmartInstance>;
    notification?: PgsNotificationModule;
    toast?: PgsToastModule;
    search?: PgsSearchModule;
    slides?: PgsModule<PgsSlidesInstance>;
    stepTabs?: PgsModule<PgsStepTabsInstance>;
    range?: PgsModule<PgsRangeInstance>;
    steps?: PgsModule<PgsStepsInstance>;
    summary?: PgsSummaryModule;
    tabs?: PgsModule<PgsTabsInstance>;
    [moduleName: string]: any;
  }

  //== events
  /** Every pgs:* event by name, so addEventListener("pgs:tabs:change", ...) types its event and detail. */
  interface PgsEventMap {
    "pgs:alert:close": CustomEvent<PgsAlertCloseDetail>;
    "pgs:alert:buttonClick": CustomEvent<PgsAlertButtonClickDetail>;
    "pgs:modal:open": CustomEvent<PgsModalEventDetail>;
    "pgs:modal:close": CustomEvent<PgsModalEventDetail>;
    "pgs:pageNav:change": CustomEvent<PgsPageNavChangeDetail>;
    "pgs:search:select": CustomEvent<PgsSearchSelectDetail>;
    "pgs:search:error": CustomEvent<PgsSearchErrorDetail>;
    "pgs:stepTabs:change": CustomEvent<PgsStepTabsChangeDetail>;
    "pgs:svg:changeColor": CustomEvent<PgsSvgChangeColorDetail>;
    "pgs:tabs:change": CustomEvent<PgsTabsChangeDetail>;
  }

  // the events bubble, so a listener on any element, the document or the window gets them typed
  interface ElementEventMap extends PgsEventMap {}
  interface DocumentEventMap extends PgsEventMap {}
  interface WindowEventMap extends PgsEventMap {}

  namespace React {
    interface HTMLAttributes<T> {
      /** Use pgsHtml in JSX/TSX. The Vite plugin converts it to pgs. */
      pgs?: never;
      pgsHtml?: string;
    }
  }

  var pgs: PgsFunction;
}

export const pgs: PgsFunction;
