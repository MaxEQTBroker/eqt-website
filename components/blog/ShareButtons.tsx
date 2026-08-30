"use client";

import { useState } from "react";

/**
 * Social share row for blog posts.
 *
 * Facebook, LinkedIn, X and WhatsApp all expose a simple share URL, so those are
 * one-click. Instagram has NO web share URL (you cannot deep-link a pre-filled
 * post/story from the web), so the Instagram button uses the device's native
 * share sheet when available (navigator.share, which lists Instagram on mobile)
 * and otherwise copies the link so the user can paste it into a story or bio.
 */
export function ShareButtons({ url, title, copy }: { url: string; title: string; copy: ShareCopy }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  const open = (href: string) =>
    window.open(href, "_blank", "noopener,noreferrer,width=600,height=640");

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked; no-op */
    }
  };

  const instagram = async () => {
    // No web intent for Instagram: use the native share sheet if we can,
    // otherwise fall back to copying the link.
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        /* user cancelled or unsupported; fall through to copy */
      }
    }
    copyLink();
  };

  return (
    <div className="mt-6 flex flex-wrap items-center gap-2">
      <span className="mr-1 text-xs uppercase tracking-[0.18em] text-faint">{copy.share}</span>

      <Btn label={copy.facebook} onClick={() => open(`https://www.facebook.com/sharer/sharer.php?u=${u}`)}>
        <path d="M14 9h3l.4-3H14V4.5c0-.86.24-1.5 1.5-1.5H17V.3A21 21 0 0 0 14.9 0C12.5 0 11 1.4 11 4v2H8v3h3v9h3z" />
      </Btn>

      <Btn label={copy.linkedin} onClick={() => open(`https://www.linkedin.com/sharing/share-offsite/?url=${u}`)}>
        <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.25 8h4.5v12h-4.5zM8 8h4.3v1.64h.06c.6-1.05 2.06-2.16 4.24-2.16 4.54 0 5.4 2.86 5.4 6.58V20h-4.5v-5.02c0-1.2-.02-2.74-1.7-2.74-1.7 0-1.96 1.3-1.96 2.66V20H8z" />
      </Btn>

      <Btn label={copy.instagram} onClick={instagram}>
        <path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.17.42.37 1.06.42 2.23.06 1.25.07 1.65.07 4.85s0 3.6-.07 4.85c-.05 1.17-.25 1.8-.42 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.17-1.06.37-2.23.42-1.25.06-1.65.07-4.85.07s-3.6 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.42a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.17-.42-.37-1.06-.42-2.23C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.85c.05-1.17.25-1.8.42-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.17 1.06-.37 2.23-.42C8.4 2.2 8.8 2.2 12 2.2zm0 1.62c-3.15 0-3.52.01-4.76.07-1.15.05-1.77.24-2.19.4-.55.22-.94.47-1.35.88-.41.41-.66.8-.88 1.35-.16.42-.35 1.04-.4 2.19-.06 1.24-.07 1.61-.07 4.76s.01 3.52.07 4.76c.05 1.15.24 1.77.4 2.19.22.55.47.94.88 1.35.41.41.8.66 1.35.88.42.16 1.04.35 2.19.4 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c1.15-.05 1.77-.24 2.19-.4.55-.22.94-.47 1.35-.88.41-.41.66-.8.88-1.35.16-.42.35-1.04.4-2.19.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.05-1.15-.24-1.77-.4-2.19a3.6 3.6 0 0 0-.88-1.35 3.6 3.6 0 0 0-1.35-.88c-.42-.16-1.04-.35-2.19-.4-1.24-.06-1.61-.07-4.76-.07zM12 6.87a5.13 5.13 0 1 0 0 10.26 5.13 5.13 0 0 0 0-10.26zm0 8.46a3.33 3.33 0 1 1 0-6.66 3.33 3.33 0 0 1 0 6.66zm5.33-8.66a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z" />
      </Btn>

      <Btn label="X" onClick={() => open(`https://twitter.com/intent/tweet?url=${u}&text=${t}`)}>
        <path d="M13.9 10.2 21.3 2h-2.1l-6.2 6.9L8 2H2l7.8 11-7.8 8.7h2.1L13 15l4.5 6.7h6zm-2 2.2-.9-1.3L5.1 3.5h2.4l4.6 6.5.9 1.3 6.3 8.9h-2.4z" />
      </Btn>

      <Btn label={copy.whatsapp} onClick={() => open(`https://wa.me/?text=${t}%20${u}`)}>
        <path d="M12 0a11.9 11.9 0 0 0-10.2 18l-1.8 6 6.2-1.6A11.9 11.9 0 1 0 12 0zm0 21.8c-1.9 0-3.7-.5-5.3-1.5l-.4-.2-3.7 1 1-3.6-.2-.4A9.9 9.9 0 1 1 12 21.8zm5.5-7.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.6-2c-.2-.3 0-.4.1-.6l.4-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.1 4.6 2.5 1 3 .8 3.6.8.5 0 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.2-.6-.4z" />
      </Btn>

      <Btn label={copied ? copy.copied : copy.copyLink} onClick={copyLink}>
        <path d="M9.3 13.3a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1.5 1.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M14.7 10.7a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1.5-1.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </Btn>
      {copied && <span className="text-xs text-accent-600">{copy.copied}</span>}
    </div>
  );
}

function Btn({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-elevated text-muted transition-colors hover:border-accent-500 hover:text-accent-600"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        {children}
      </svg>
    </button>
  );
}

export type ShareCopy = {
  share: string;
  facebook: string;
  linkedin: string;
  instagram: string;
  whatsapp: string;
  copyLink: string;
  copied: string;
};
