import { Marquee } from "@/components/motion/Marquee";

/** Slow marquee of the developers/addresses EQT transacts across. */
export function Partners() {
  return (
    <section className="border-y border-line py-12 md:py-16">
      <p className="container-lux mb-8 text-xs uppercase tracking-[0.24em] text-faint">
        Trusted across Dubai&apos;s finest developments
      </p>
      <Marquee
        items={[
          "Nakheel",
          "Emaar",
          "Meraas",
          "Sobha Realty",
          "DAMAC",
          "Ellington",
          "Majid Al Futtaim",
          "Omniyat",
        ]}
      />
    </section>
  );
}
