import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/** Locale-aware Link/redirect/router that automatically prefixes uk/ru URLs. */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
