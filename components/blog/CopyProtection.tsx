"use client";

import { useEffect } from "react";

/**
 * Light, SEO/GEO-safe copy deterrent for blog article prose.
 *
 * IMPORTANT (why this is safe for SEO + AI): it runs only in the browser via CSS
 * and JS event handlers. Googlebot, Bingbot and AI crawlers read the raw server
 * HTML and ignore CSS/JS entirely, so they still receive the full text — ranking
 * and AI citations are unaffected. This only inconveniences a human casually
 * drag-selecting or right-clicking; it is NOT real protection against a determined
 * scraper (nothing rendered in a browser can be, by definition). See three layers:
 *
 *   1. user-select:none  — blocks casual click-drag highlighting of the text.
 *   2. contextmenu block — disables the right-click "copy"/"save" menu on prose.
 *   3. copy watermark    — if any text is still copied, append a source line so
 *                          the theft carries attribution back to us.
 *
 * Scoped to elements marked [data-protect] (the article body + FAQ), so headers,
 * nav, phone numbers, share buttons and the lead form stay fully selectable.
 */
export function CopyProtection() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-protect]"));
    if (nodes.length === 0) return;

    // Layer 1: disable selection (with the WebKit/Safari prefix).
    for (const el of nodes) {
      el.style.userSelect = "none";
      el.style.webkitUserSelect = "none";
    }

    const inProtected = (target: EventTarget | null) =>
      target instanceof Node && nodes.some((n) => n.contains(target));

    // Layer 2: block the right-click context menu inside protected prose.
    const onContextMenu = (e: MouseEvent) => {
      if (inProtected(e.target)) e.preventDefault();
    };

    // Layer 3: if a copy still happens, append an attribution/source line.
    const onCopy = (e: ClipboardEvent) => {
      if (!inProtected(e.target)) return;
      const selected = window.getSelection?.()?.toString() ?? "";
      if (!selected) return;
      const attribution = `\n\nSource: EQT Real Estate — ${window.location.href}`;
      e.clipboardData?.setData("text/plain", selected + attribution);
      e.preventDefault();
    };

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("copy", onCopy);
    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("copy", onCopy);
    };
  }, []);

  return null;
}
