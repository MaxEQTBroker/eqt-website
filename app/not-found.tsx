import Link from "next/link";
import "./globals.css";

/**
 * Global fallback 404 for paths that never enter a locale segment. It has no
 * parent layout, so it renders its own html/body. Most 404s are caught by the
 * richer app/[locale]/not-found.tsx; this is the bare safety net.
 */
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "1.25rem",
            padding: "clamp(1.5rem, 6vw, 6rem)",
            fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          }}
        >
          <p style={{ letterSpacing: "0.18em", textTransform: "uppercase", fontSize: "0.75rem", opacity: 0.6 }}>
            Error 404
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", margin: 0, lineHeight: 1.05 }}>
            This page isn't here
          </h1>
          <p style={{ maxWidth: "40ch", fontSize: "1.05rem", opacity: 0.75, margin: 0 }}>
            The page you're looking for may have sold, moved, or never existed.
          </p>
          <Link
            href="/"
            style={{
              display: "inline-block",
              marginTop: "0.5rem",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.5rem",
              background: "#1f2a44",
              color: "#fff",
              textDecoration: "none",
              fontSize: "0.9rem",
            }}
          >
            EQT Real Estate, return home
          </Link>
        </main>
      </body>
    </html>
  );
}
