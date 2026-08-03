import Link from "next/link";
import Image from "next/image";
import { primaryNav, site } from "@/lib/site";

/** Minimal footer: logo, a single nav row, and one quiet legal line. */
export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-lux py-14 md:py-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name} home`}>
            <Image src="/brand/logo-mark.png" alt="EQT logo" width={28} height={28} className="h-7 w-7" />
            <span className="font-display text-2xl leading-none tracking-[0.3em] text-ink">{site.name}</span>
          </Link>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-7 gap-y-2 text-[0.72rem] uppercase tracking-[0.18em] text-muted">
            {primaryNav.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-ink">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hairline my-10" />

        <div className="flex flex-col gap-3 text-[0.72rem] text-faint md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. RERA ORN {site.regulatory.reraOrn} · DED {site.regulatory.dedLicense}.
          </p>
          <div className="flex gap-6">
            <Link href="/credits" className="transition-colors hover:text-ink">Photography</Link>
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">Instagram</a>
            <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
