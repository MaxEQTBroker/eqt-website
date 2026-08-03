/** Slow marquee of the real developer logos EQT transacts across. */
const logos = [
  { src: "/brand/developers/emaar-crop.png", name: "Emaar" },
  { src: "/brand/developers/nakheel-1.webp", name: "Nakheel" },
  { src: "/brand/developers/Meraas-logo.svg.webp", name: "Meraas" },
  { src: "/brand/developers/sobha-realty-logo.webp", name: "Sobha Realty" },
  { src: "/brand/developers/Damac_logo.svg.webp", name: "DAMAC" },
  { src: "/brand/developers/Ellington-properties-Logo-1024x408.webp", name: "Ellington" },
  { src: "/brand/developers/MAF-crop.png", name: "Majid Al Futtaim" },
  { src: "/brand/developers/omniyat-logo.webp", name: "Omniyat" },
];

export function Partners() {
  const row = [...logos, ...logos];
  return (
    <section className="border-y border-line py-12 md:py-16">
      <p className="container-lux mb-9 text-xs uppercase tracking-[0.24em] text-faint">
        Trusted across Dubai&apos;s finest developments
      </p>
      <div className="overflow-hidden" aria-hidden="true">
        <div className="marquee-track items-center gap-16">
          {row.map((l, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={l.src}
              alt={l.name}
              className="h-7 w-auto shrink-0 object-contain opacity-75 md:h-9"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
