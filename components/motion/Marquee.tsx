/**
 * Infinite horizontal marquee (server component — pure CSS). Items are rendered
 * twice and translated -50% for a seamless loop; pauses on hover and under
 * reduced-motion (see .marquee-track in globals.css).
 */
export function Marquee({ items, className = "" }: { items: string[]; className?: string }) {
  const row = [...items, ...items];
  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <div className="marquee-track items-center gap-16">
        {row.map((item, i) => (
          <span
            key={i}
            className="whitespace-nowrap font-display text-[clamp(1.5rem,3vw,2.5rem)] text-faint"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
