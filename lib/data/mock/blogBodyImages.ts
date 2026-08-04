import type { MediaImage } from "../types";

/**
 * A pool of Dubai editorial photos woven into blog posts between sections to
 * break up the text. Assigned deterministically per slug (stable per post).
 * Pexels; photographers credited on /credits.
 */
export const blogBodyPool: MediaImage[] = [
  { url: "https://images.pexels.com/photos/30554306/pexels-photo-30554306.jpeg?auto=compress&cs=tinysrgb&w=1600", alt: "Stunning night view of Dubai Marina with illuminated skyscrapers and reflections on the water.", tone: "#141821", credit: "AJ  Ahamad", creditUrl: "https://www.pexels.com/@aj-ahamad-767001191" },
  { url: "https://images.pexels.com/photos/28350360/pexels-photo-28350360.jpeg?auto=compress&cs=tinysrgb&w=1600", alt: "Explore the breathtaking skyline of Dubai Marina with iconic skyscrapers and luxury yachts.", tone: "#141821", credit: "Denys Gromov", creditUrl: "https://www.pexels.com/@jdgromov" },
  { url: "https://images.pexels.com/photos/19612315/pexels-photo-19612315.jpeg?auto=compress&cs=tinysrgb&w=1600", alt: "Dubai Marina with luxury yachts against a skyline of iconic skyscrapers in the morning light.", tone: "#141821", credit: "Rockwell branding agency", creditUrl: "https://www.pexels.com/@rockwell-branding-agency-85164430" },
  { url: "https://images.pexels.com/photos/28350363/pexels-photo-28350363.jpeg?auto=compress&cs=tinysrgb&w=1600", alt: "Explore the towering skyscrapers of Dubai Marina reflecting beautifully on the water.", tone: "#141821", credit: "Denys Gromov", creditUrl: "https://www.pexels.com/@jdgromov" },
  { url: "https://images.pexels.com/photos/29212703/pexels-photo-29212703.jpeg?auto=compress&cs=tinysrgb&w=1600", alt: "Aerial view of Palm Jumeirah in Dubai showcasing modern architecture and serene waters.", tone: "#141821", credit: "Nelemson G", creditUrl: "https://www.pexels.com/@nelemson" },
  { url: "https://images.pexels.com/photos/14915303/pexels-photo-14915303.jpeg?auto=compress&cs=tinysrgb&w=1600", alt: "Stunning view of the illuminated Atlantis The Royal Hotel in Dubai, showcasing its modern architectu", tone: "#141821", credit: "San Photography", creditUrl: "https://www.pexels.com/@beingsanshots" },
  { url: "https://images.pexels.com/photos/33838051/pexels-photo-33838051.jpeg?auto=compress&cs=tinysrgb&w=1600", alt: "Stunning view of Dubai skyline from Palm Jumeirah featuring clear skies and turquoise waters.", tone: "#141821", credit: "Ayrat", creditUrl: "https://www.pexels.com/@ayrat-244411276" },
  { url: "https://images.pexels.com/photos/29212684/pexels-photo-29212684.jpeg?auto=compress&cs=tinysrgb&w=1600", alt: "Beautiful beach view at Palm Jumeirah, Dubai with modern skyline and clear blue sea.", tone: "#141821", credit: "Nelemson G", creditUrl: "https://www.pexels.com/@nelemson" },
  { url: "https://images.pexels.com/photos/5577693/pexels-photo-5577693.jpeg?auto=compress&cs=tinysrgb&w=1600", alt: "Stunning nighttime view of Dubai's skyline with the iconic Burj Khalifa illuminated under a starry s", tone: "#141821", credit: "Maria Charizani", creditUrl: "https://www.pexels.com/@maria-charizani-3542905" },
  { url: "https://images.pexels.com/photos/29470840/pexels-photo-29470840.jpeg?auto=compress&cs=tinysrgb&w=1600", alt: "Stunning aerial view of Dubai's modern skyline featuring the iconic Burj Khalifa under a clear blue ", tone: "#141821", credit: "Nelemson G", creditUrl: "https://www.pexels.com/@nelemson" },
  { url: "https://images.pexels.com/photos/1645603/pexels-photo-1645603.jpeg?auto=compress&cs=tinysrgb&w=1600", alt: "Stunning view of Dubai's illuminated skyline at night featuring the Burj Khalifa.", tone: "#141821", credit: "Sam Rana", creditUrl: "https://www.pexels.com/@samrana3003" },
  { url: "https://images.pexels.com/photos/1381722/pexels-photo-1381722.jpeg?auto=compress&cs=tinysrgb&w=1600", alt: "Explore Dubai's breathtaking night skyline featuring iconic skyscrapers like the Burj Khalifa.", tone: "#141821", credit: "Marcus Herzberg", creditUrl: "https://www.pexels.com/@evonics" },
  { url: "https://images.pexels.com/photos/10647324/pexels-photo-10647324.jpeg?auto=compress&cs=tinysrgb&w=1600", alt: "Explore this luxurious modern villa in Dubai with a stunning swimming pool and palm trees.", tone: "#d8d4cc", credit: "Abid  Ali", creditUrl: "https://www.pexels.com/@abid-ali-150086727" },
  { url: "https://images.pexels.com/photos/10647349/pexels-photo-10647349.jpeg?auto=compress&cs=tinysrgb&w=1600", alt: "Explore a modern luxury villa featuring a sleek swimming pool and spacious terrace in Dubai.", tone: "#d8d4cc", credit: "Abid  Ali", creditUrl: "https://www.pexels.com/@abid-ali-150086727" },
  { url: "https://images.pexels.com/photos/1488515/pexels-photo-1488515.jpeg?auto=compress&cs=tinysrgb&w=1600", alt: "Stunning aerial shot of a luxurious Dubai beachfront resort with swimming pools.", tone: "#d8d4cc", credit: "The Lazy Artist Gallery", creditUrl: "https://www.pexels.com/@thelazyartist" },
  { url: "https://images.pexels.com/photos/8484851/pexels-photo-8484851.jpeg?auto=compress&cs=tinysrgb&w=1600", alt: "Luxurious resort pool surrounded by modern architecture and palm trees in Dubai.", tone: "#d8d4cc", credit: "Denys Gromov", creditUrl: "https://www.pexels.com/@jdgromov" },
  { url: "https://images.pexels.com/photos/6585598/pexels-photo-6585598.jpeg?auto=compress&cs=tinysrgb&w=1600", alt: "Interior of modern living room with comfortable big sofa and dining zone decorated with creative lam", tone: "#d8d4cc", credit: "Max Vakhtbovych", creditUrl: "https://www.pexels.com/@artbovich" },
  { url: "https://images.pexels.com/photos/8135492/pexels-photo-8135492.jpeg?auto=compress&cs=tinysrgb&w=1600", alt: "Spacious modern living room featuring elegant chandeliers, plush sofa, and contemporary decor.", tone: "#d8d4cc", credit: "Max Vakhtbovych", creditUrl: "https://www.pexels.com/@artbovich" },
  { url: "https://images.pexels.com/photos/6585757/pexels-photo-6585757.jpeg?auto=compress&cs=tinysrgb&w=1600", alt: "Interior of modern bright bedroom with bed and bedside tables under pendant lamps in evening", tone: "#d8d4cc", credit: "Max Vakhtbovych", creditUrl: "https://www.pexels.com/@artbovich" },
  { url: "https://images.pexels.com/photos/7546314/pexels-photo-7546314.jpeg?auto=compress&cs=tinysrgb&w=1600", alt: "Spacious modern interior with white minimalist decor and luxurious design.", tone: "#d8d4cc", credit: "Max Vakhtbovych", creditUrl: "https://www.pexels.com/@artbovich" },
  { url: "https://images.pexels.com/photos/823696/pexels-photo-823696.jpeg?auto=compress&cs=tinysrgb&w=1600", alt: "Iconic Burj Al Arab overlooking the pristine Dubai beach, perfect for travel and leisure.", tone: "#141821", credit: "Aleksandar Pasaric", creditUrl: "https://www.pexels.com/@apasaric" },
  { url: "https://images.pexels.com/photos/6246867/pexels-photo-6246867.jpeg?auto=compress&cs=tinysrgb&w=1600", alt: "Stunning sunset view of Jumeirah Beach showcasing the iconic Burj Al Arab and tranquil sea waters.", tone: "#141821", credit: "Mo Eid", creditUrl: "https://www.pexels.com/@mo-eid-1268975" },
  { url: "https://images.pexels.com/photos/4565493/pexels-photo-4565493.jpeg?auto=compress&cs=tinysrgb&w=1600", alt: "A captivating view of the Burj Al Arab during sunset at Dubai's coastline with people enjoying the b", tone: "#141821", credit: "LOUIE CAMUA", creditUrl: "https://www.pexels.com/@louie-camua-3011315" },
  { url: "https://images.pexels.com/photos/35139019/pexels-photo-35139019.jpeg?auto=compress&cs=tinysrgb&w=1600", alt: "A detailed aerial view showcasing the architectural diversity of Dubai's urban landscape.", tone: "#141821", credit: "Magda Ehlers", creditUrl: "https://www.pexels.com/@magda-ehlers-pexels" },
];

/** Deterministic pick of n images for a post slug (stable, varied). */
export function bodyImagesFor(slug: string, n = 2): MediaImage[] {
  if (blogBodyPool.length === 0) return [];
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  const picks: MediaImage[] = [];
  const used = new Set<number>();
  for (let i = 0; i < n; i++) {
    let idx = (h + i * 7) % blogBodyPool.length;
    while (used.has(idx)) idx = (idx + 1) % blogBodyPool.length;
    used.add(idx);
    picks.push(blogBodyPool[idx]);
  }
  return picks;
}
