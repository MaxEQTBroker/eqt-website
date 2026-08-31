"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

export type BlogCard = {
  slug: string;
  title: string;
  excerpt: string;
  section: string;
  catLabel: string;
  readingMinutes: number;
  img: { url: string; tone: string; alt: string };
  search: string; // pre-lowercased title + excerpt + keywords, for instant search
};

export type BrowserCopy = {
  searchPlaceholder: string;
  all: string;
  showing: string; // "Showing {n} of {total}"
  noResults: string;
  clear: string;
  prev: string;
  next: string;
  minRead: string;
  sections: { key: string; label: string }[];
};

const PAGE_SIZE = 12;

export function BlogBrowser({ posts, copy }: { posts: BlogCard[]; copy: BrowserCopy }) {
  const [q, setQ] = useState("");
  const [section, setSection] = useState("all");
  const [page, setPage] = useState(1);
  // On phones the wrapped chip toolbar takes up half the screen, so once the
  // reader scrolls into the list it collapses to a thin bar with a toggle.
  const [stuck, setStuck] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 260);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Section chips: only those with at least one post, with live counts.
  const sectionCounts = useMemo(() => {
    const m = new Map<string, number>();
    for (const p of posts) m.set(p.section, (m.get(p.section) ?? 0) + 1);
    return m;
  }, [posts]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return posts.filter((p) => {
      if (section !== "all" && p.section !== section) return false;
      if (needle && !p.search.includes(needle)) return false;
      return true;
    });
  }, [posts, q, section]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  function reset(next: () => void) {
    next();
    setPage(1);
  }

  const showing = copy.showing
    .replace("{n}", String(filtered.length))
    .replace("{total}", String(posts.length));

  const activeLabel =
    section === "all"
      ? copy.all
      : copy.sections.find((s) => s.key === section)?.label ?? copy.all;
  const collapsed = stuck && !filtersOpen; // phone-only collapsed state
  const pickSection = (key: string) => {
    reset(() => setSection(key));
    setFiltersOpen(false); // collapse back so results are visible
  };

  return (
    <div>
      {/* Toolbar: search + section chips (collapses on phones after scroll) */}
      <div className="sticky top-11 z-30 border-y border-line bg-base/95 backdrop-blur">
        <div className="container-lux py-2.5">
          {/* Collapsed toggle: phones only, once scrolled into the list */}
          <button
            type="button"
            onClick={() => setFiltersOpen((o) => !o)}
            aria-expanded={filtersOpen}
            className={`${stuck ? "flex" : "hidden"} w-full items-center justify-between gap-3 text-left sm:!hidden`}
          >
            <span className="flex min-w-0 items-center gap-2">
              <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-accent-600" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M3 6h18M6 12h12M10 18h4" />
              </svg>
              <span className="truncate text-sm font-medium text-ink">{activeLabel}</span>
              <span className="shrink-0 text-xs tabular-nums text-faint">{filtered.length}</span>
            </span>
            <svg viewBox="0 0 24 24" className={`h-4 w-4 shrink-0 text-faint transition-transform ${filtersOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          {/* Panel: search + chips. Hidden on phones once collapsed. */}
          <div className={`${collapsed ? "hidden sm:flex" : "flex"} flex-col gap-2 ${stuck ? "pt-2.5 sm:pt-0" : ""}`}>
            <div className="relative w-full sm:max-w-xs">
              <svg
                className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-faint"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
              </svg>
              <input
                type="search"
                value={q}
                onChange={(e) => reset(() => setQ(e.target.value))}
                placeholder={copy.searchPlaceholder}
                aria-label={copy.searchPlaceholder}
                className="w-full rounded-full border border-line bg-elevated py-1.5 pl-9 pr-3 text-[13px] text-ink outline-none transition-colors placeholder:text-faint focus:border-accent-500"
              />
            </div>
            <div className="flex flex-wrap gap-1.5" role="tablist" aria-label={copy.searchPlaceholder}>
              <Chip active={section === "all"} onClick={() => pickSection("all")} label={copy.all} count={posts.length} />
              {copy.sections.map((s) => {
                const count = sectionCounts.get(s.key) ?? 0;
                if (!count) return null;
                return (
                  <Chip key={s.key} active={section === s.key} onClick={() => pickSection(s.key)} label={s.label} count={count} />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="container-lux py-[var(--section-py)]">
        <p className="mb-8 text-sm text-faint">{showing}</p>

        {visible.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-lg text-muted">{copy.noResults}</p>
            <button
              onClick={() => reset(() => { setQ(""); setSection("all"); })}
              className="mt-4 text-sm text-accent-600 underline-offset-4 hover:underline"
            >
              {copy.clear}
            </button>
          </div>
        ) : (
          <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <div
                  className="relative mb-5 aspect-[3/2] overflow-hidden rounded-lg"
                  style={{ backgroundColor: post.img.tone }}
                >
                  <Image
                    src={post.img.url}
                    alt={post.img.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                </div>
                <p className="eyebrow mb-3">
                  {post.catLabel} · {post.readingMinutes} {copy.minRead}
                </p>
                <h3 className="font-display text-2xl leading-snug text-ink transition-opacity group-hover:opacity-70">
                  {post.title}
                </h3>
                <p className="mt-3 text-sm text-muted">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        )}

        {pageCount > 1 && (
          <Pagination page={current} pageCount={pageCount} onGo={setPage} prev={copy.prev} next={copy.next} />
        )}
      </div>
    </div>
  );
}

function Chip({ active, onClick, label, count }: { active: boolean; onClick: () => void; label: string; count: number }) {
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`whitespace-nowrap rounded-full border px-3 py-1 text-[13px] font-medium leading-5 transition-colors ${
        active
          ? "border-accent-500 bg-accent-500 text-on-accent"
          : "border-line bg-elevated text-ink hover:border-accent-500 hover:text-accent-600"
      }`}
    >
      {label} <span className={`ml-0.5 tabular-nums ${active ? "opacity-70" : "text-faint"}`}>{count}</span>
    </button>
  );
}

function Pagination({ page, pageCount, onGo, prev, next }: { page: number; pageCount: number; onGo: (p: number) => void; prev: string; next: string }) {
  // Compact window of page numbers with ellipses.
  const nums: (number | "…")[] = [];
  const push = (n: number | "…") => nums.push(n);
  const win = 1;
  for (let i = 1; i <= pageCount; i++) {
    if (i === 1 || i === pageCount || (i >= page - win && i <= page + win)) push(i);
    else if (nums[nums.length - 1] !== "…") push("…");
  }
  const scrollTop = () => { if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" }); };
  const go = (p: number) => { onGo(p); scrollTop(); };

  return (
    <nav className="mt-16 flex items-center justify-center gap-1.5" aria-label="Pagination">
      <button
        onClick={() => go(Math.max(1, page - 1))}
        disabled={page === 1}
        className="rounded-full border border-line px-4 py-2 text-sm text-muted transition-colors enabled:hover:border-accent-500 enabled:hover:text-ink disabled:opacity-40"
      >
        {prev}
      </button>
      {nums.map((n, i) =>
        n === "…" ? (
          <span key={`e${i}`} className="px-2 text-faint">…</span>
        ) : (
          <button
            key={n}
            onClick={() => go(n)}
            aria-current={n === page ? "page" : undefined}
            className={`h-10 min-w-10 rounded-full px-3 text-sm transition-colors ${
              n === page ? "bg-accent-500 text-on-accent" : "text-muted hover:bg-elevated hover:text-ink"
            }`}
          >
            {n}
          </button>
        ),
      )}
      <button
        onClick={() => go(Math.min(pageCount, page + 1))}
        disabled={page === pageCount}
        className="rounded-full border border-line px-4 py-2 text-sm text-muted transition-colors enabled:hover:border-accent-500 enabled:hover:text-ink disabled:opacity-40"
      >
        {next}
      </button>
    </nav>
  );
}
