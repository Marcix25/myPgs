declare global {
  interface PgsBag {
    add: (...values: string[]) => void;
    remove: (...values: string[]) => void;
    toggle: (value: string) => boolean;
    contains: (value: string) => boolean;
    value: string;
    querySelector: (value: string | string[]) => Element | null;
    querySelectorAll: (value: string | string[]) => NodeListOf<Element>;
  }

  interface Element {
    pgs: PgsBag;
  }

  interface Document {
    pgs: {
      querySelector: (value: string | string[]) => Element | null;
      querySelectorAll: (value: string | string[]) => NodeListOf<Element>;
    };
  }
}
export {};