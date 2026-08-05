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
    value: string | null;
  }

  interface PgsOptionApi {
    add(...values: PgsStateValue[]): PgsOptionApi;
    remove(...values: PgsStateValue[]): PgsOptionApi;
    toggle(value: string, force?: boolean): boolean;
    contains(key: string): boolean;
    getValueBrackets(key: string): string | undefined;
    setValueBrackets(key: string, value?: string): PgsOptionApi;
    value: string | null;
  }

  interface PgsElementApi extends PgsQueryableApi {
    (): PgsElementApi;
    add(...values: string[]): PgsElementApi;
    remove(...values: string[]): PgsElementApi;
    toggle(value: string, force?: boolean): boolean;
    contains(value: string): boolean;
    value: string | null;
    state: PgsStateApi;
    option: PgsOptionApi;
  }

  interface PgsDocumentApi extends PgsQueryableApi {
    (): PgsDocumentApi;
  }

  type PgsApi = PgsElementApi | PgsDocumentApi;

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

  interface PgsSearchSelectDetail {
    item: PgsSearchSuggestion;
    index: number;
    value: string;
    input: HTMLInputElement;
    element: Element;
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

  interface PgsSearchInstance {
    element: Element;
    input: HTMLInputElement;
    list: Element;
    configure(options: Partial<PgsSearchOptions>): PgsSearchInstance;
    setSource(source: PgsSearchOptions["source"]): PgsSearchInstance;
    search(query?: string): Promise<PgsSearchSuggestion[]>;
    open(): void;
    close(): void;
    clear(): void;
    cancel(): void;
    select(index?: number, submit?: boolean): PgsSearchSuggestion | null;
    refresh(): Promise<PgsSearchSuggestion[]>;
    destroy(): void;
    items(): PgsSearchSuggestion[];
    isOpen(): boolean;
    isLoading(): boolean;
    setActiveIndex(index: number): void;
  }

  interface PgsSearchModule {
    init(root?: Document | Element): void;
    api(selector: Element): PgsSearchInstance | undefined;
  }

  interface PgsFunction {
    (root: Document): PgsDocumentApi;
    (root: Element): PgsElementApi;
    (root: Document | Element): PgsApi;
    registerImport(...modules: unknown[]): PgsFunction;
    registerModules(modules: Record<string, any>): PgsFunction;
    import(...names: string[]): Record<string, any>;
    init(root?: Document | Element): Document | Element;
    accordion?: any;
    dropdown?: any;
    menu?: any;
    modal?: any;
    notification?: any;
    search?: PgsSearchModule;
    slides?: any;
    stepTabs?: any;
    steps?: any;
    formValidate?: any;
    scrollHorizontal?: any;
    [moduleName: string]: any;
  }

  interface PgsBag extends PgsElementApi {}

  namespace React {
    interface HTMLAttributes<T> {
      /** Use pgsHtml in JSX/TSX. The Vite plugin converts it to pgs. */
      pgs?: never;
      pgsHtml?: string;
    }
  }

  var pgs: PgsFunction;
}

export function pgs(root: Document): PgsDocumentApi;
export function pgs(root: Element): PgsElementApi;
export function pgs(root: Document | Element): PgsApi;
