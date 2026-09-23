import type { ReactNode } from "react";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";

/**
 * Page frame: fixed nav, the page's own content, then the global footer.
 *
 * `#main` is the skip link's destination, and moving focus there is what
 * lets a keyboard user jump past the navigation on every page.
 */
export function Page({ children }: { children: ReactNode }) {
  return (
    <div style={{ minHeight: "100svh", background: "var(--bg)", color: "var(--foreground)" }}>
      <SiteNav />
      <main id="main" tabIndex={-1} style={{ outline: "none" }}>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
