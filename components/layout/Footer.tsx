import Link from "next/link";
import Image from "next/image";
import { primaryNav, site, whatsappLink } from "@/lib/site";
import { getAreas } from "@/lib/data/repository";

/** Server-rendered footer with regulatory proof and full internal linking. */
export async function Footer() {
  const areas = await getAreas();

  return (
    <footer className="border-t border-line bg-base">
      <div className="container-lux py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/brand/logo-mark.png" alt="EQT logo" width={40} height={40} className="h-9 w-9" />
              <span className="font-display text-3xl tracking-[0.3em]">{site.name}</span>
            </div>
            <p className="mt-5 max-w-sm text-muted">{site.description}</p>
            <a
              href={whatsappLink(`Hello ${site.name}, I'd like to enquire.`)}
              className="btn btn-whatsapp mt-8"
              target="_blank"
              rel="noopener noreferrer"
            >
              Enquire on WhatsApp
            </a>
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow mb-5">Explore</p>
            <ul className="space-y-3">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-muted hover:text-accent-400">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Areas">
            <p className="eyebrow mb-5">Communities</p>
            <ul className="space-y-3">
              {areas.map((area) => (
                <li key={area.slug}>
                  <Link
                    href={`/areas/${area.slug}`}
                    className="text-muted hover:text-accent-400"
                  >
                    {area.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="hairline my-12" />

        <div className="flex flex-col gap-4 text-sm text-faint md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p className="max-w-xl">
            Regulated by the {site.regulatory.authority}. RERA ORN{" "}
            <span className="text-muted">{site.regulatory.reraOrn}</span> · DED
            License <span className="text-muted">{site.regulatory.dedLicense}</span>.
          </p>
          <div className="flex gap-6">
            <a href={site.social.instagram} className="hover:text-accent-400" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href={site.social.linkedin} className="hover:text-accent-400" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
