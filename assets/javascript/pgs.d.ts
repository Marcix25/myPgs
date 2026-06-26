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
    contains(key: string): boolean;
    getValueBrackets(key: string): string | undefined;
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
    modules: PgsOptionApi;
  }

  interface PgsDocumentApi extends PgsQueryableApi {
    (): PgsDocumentApi;
  }

  type PgsApi = PgsElementApi | PgsDocumentApi;

  interface PgsFunction {
    (root: Document): PgsDocumentApi;
    (root: Element): PgsElementApi;
    (root: Document | Element): PgsApi;
    registerImport(...modules: unknown[]): PgsFunction;
    import(...names: string[]): Record<string, any>;
  }

  interface PgsBag extends PgsElementApi {}

  var pgs: PgsFunction;
}

export function pgs(root: Document): PgsDocumentApi;
export function pgs(root: Element): PgsElementApi;
export function pgs(root: Document | Element): PgsApi;
