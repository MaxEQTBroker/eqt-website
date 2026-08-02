import { getAreas } from "@/lib/data/repository";
import { AreaRotatorClient } from "./AreaRotatorClient";

/**
 * Server wrapper: fetches areas through the data seam and hands them to the
 * client rotator. The rotator server-renders a crawlable grid and only upgrades
 * to the 3D scroll-spin on capable desktop clients.
 */
export async function AreaShowcase() {
  const areas = await getAreas();
  return <AreaRotatorClient areas={areas} />;
}
