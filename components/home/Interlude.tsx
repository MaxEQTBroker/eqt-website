import { BackgroundVideo } from "@/components/motion/BackgroundVideo";

/** Full-bleed cinematic video moment between sections. */
export function Interlude() {
  return (
    <section className="relative flex min-h-[72svh] items-end overflow-hidden">
      <BackgroundVideo
        src="/videos/featured.mp4"
        poster="/videos/featured-poster.jpg"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(20,16,10,0.42)" }} />
      <div className="container-lux relative z-10 pb-[10vh]">
        <h2
          className="max-w-[18ch] font-display text-[clamp(2rem,4.6vw,4.25rem)] font-medium leading-[1.05] text-white"
          style={{ textShadow: "0 2px 30px rgba(0,0,0,0.45)" }}
        >
          Homes you will not find anywhere else.
        </h2>
      </div>
    </section>
  );
}
