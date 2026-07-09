import type { Plugin } from "vite";

declare global {
  namespace React {
    interface HTMLAttributes<T> {
      /** Use pgsHtml in JSX/TSX. The Vite plugin converts it to pgs. */
      pgs?: never;
      pgsHtml?: string;
    }
  }
}

export default function pgsVite(): Plugin;
