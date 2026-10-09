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
    /** Where pgs.alert.* puts the card: a Document or Element root, and the container inside it. */
    root?: Document | Element;
    container?: string;
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
  interface PgsFormValidateOptions {
    typeNotice?: "alert" | "toast";
    showSuccessOnValidate?: boolean;
    alertContainer?: string;
    message?: Partial<Record<string, string>>;
  }

  interface PgsTemporaryFieldError {
    set(field: Element, options?: string | { title?: string; message?: string }): PgsTemporaryFieldError;
    remove(field: Element): PgsTemporaryFieldError;
    clear(): PgsTemporaryFieldError;
  }

  interface PgsFormValidateInstance {
    container: Element;
    typeNotice: "alert" | "toast";
    showSuccessOnValidate: boolean;
    alertContainer?: string;
    temporaryFieldError: PgsTemporaryFieldError;
    validate(): boolean;
    success(description?: string, title?: string): void;
    validator(callback: (event: Event) => void, eventName?: string): PgsFormValidateInstance;
    addNewRule(rule: (...args: any[]) => unknown): PgsFormValidateInstance;
    /** Removes the listeners the instance added to the form. */
    destroy(): void;
  }

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

  //== the rest
  interface PgsHoverModule {
    init(root?: Document | Element): Document | Element;
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

  interface PgsFunction {
    (root: Document): PgsDocumentApi;
    (root: Element): PgsElementApi;
    (root: Document | Element): PgsApi;
    registerImport(...modules: unknown[]): PgsFunction;
    registerModules(modules: Record<string, any>): PgsFunction;
    import(...names: string[]): Record<string, any>;
    init(root?: Document | Element): Document | Element;
    darkmode?: PgsInitOnlyModule;
    svg?: PgsSvgModule;
    hover?: PgsHoverModule;
    accordion?: PgsModule<PgsAccordionInstance>;
    alert?: PgsAlertModule;
    dropdown?: PgsModule<PgsDropdownInstance>;
    menu?: PgsModule<PgsMenuInstance>;
    modal?: PgsModule<PgsModalInstance>;
    pageNav?: PgsModule<PgsPageNavInstance>;
    header?: PgsInitOnlyModule;
    navSmart?: PgsInitOnlyModule;
    notification?: PgsNotificationModule;
    toast?: PgsToastModule;
    search?: PgsSearchModule;
    slides?: PgsModule<PgsSlidesInstance>;
    stepTabs?: PgsModule<PgsStepTabsInstance>;
    steps?: PgsModule<PgsStepsInstance>;
    summary?: PgsSummaryModule;
    tabs?: PgsModule<PgsTabsInstance>;
    formValidate?: PgsFormValidateConstructor;
    [moduleName: string]: any;
  }

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
