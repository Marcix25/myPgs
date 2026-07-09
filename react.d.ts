import "react";

declare module "react" {
  interface HTMLAttributes<T> {
    /** Use pgsHtml in JSX/TSX. The Vite plugin converts it to pgs. */
    pgs?: never;
    pgsHtml?: string;
  }
}

export {};
