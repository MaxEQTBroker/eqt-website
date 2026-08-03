import Link from "next/link";
import Image from "next/image";

/**
 * Editorial community tile. A small black→transparent gradient sits at the
 * bottom so the white label is always legible; on hover the image blurs and
 * darkens (slow) and that gradient extends to the top, while a "View" box draws
 * itself in. Pure CSS — no JS.
 */
export function HoverTile({
  href,
  image,
  alt,
  title,
  subtitle,
  tone = "#cdc2a7",
  ratio = "aspect-[4/5]",
}: {
  href: string;
  image: string;
  alt: string;
  title: string;
  subtitle?: string;
  tone?: string;
  ratio?: string;
}) {
  return (
    <Link href={href} className="group relative block overflow-hidden">
      <div className={`relative w-full ${ratio}`} style={{ backgroundColor: tone }}>
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] group-hover:blur-[4px] group-hover:brightness-[0.55]"
        />

        {/* black→transparent gradient: sits at the bottom, extends to the top on hover */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-black/80 via-black/35 to-transparent transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:h-full group-hover:from-black/85 group-hover:via-black/55" />

        {/* draw-on-hover "View" rectangle (wide, thin, slow) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-700 group-hover:opacity-100">
          <span className="relative flex h-[3.4rem] w-[9.6rem] items-center justify-center">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 288 102" preserveAspectRatio="none" fill="none">
              <rect
                className="draw-rect"
                x="1.5"
                y="1.5"
                width="285"
                height="99"
                pathLength={100}
                stroke="#f6efdd"
                strokeWidth={1}
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <span className="text-[0.6rem] uppercase tracking-[0.3em] text-[#f6efdd]">View</span>
          </span>
        </div>

        {/* white label, always legible over the bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
          <h3 className="font-display text-3xl leading-tight text-white sm:text-4xl">{title}</h3>
          {subtitle && <p className="mt-1.5 text-sm text-white/85">{subtitle}</p>}
        </div>
      </div>
    </Link>
  );
}
