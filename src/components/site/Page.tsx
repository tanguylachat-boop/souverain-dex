import type { ReactNode } from "react";
import { Nav } from "@/components/home/Nav";
import { Footer } from "@/components/home/Footer";

/**
 * Page frame for the inner routes: the floating nav, the page's own content,
 * then the footer that the content slides over.
 *
 * `#main` is the skip link's destination, and moving focus there is what
 * lets a keyboard user jump past the navigation on every page. The frame
 * sits above the fixed footer (z-index 1 on an opaque background), which is
 * what makes the reveal work.
 */
export function Page({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      <main
        id="main"
        tabIndex={-1}
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100svh",
          background: "var(--bg)",
          color: "var(--foreground)",
          outline: "none",
        }}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
