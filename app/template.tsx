"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Route-transition wrapper. `template.tsx` re-mounts on every navigation, so
 * each page fades/slides in when you click through — site-wide, and honouring
 * prefers-reduced-motion. (Only page content is wrapped; the fixed header,
 * footer and rails live in layout.tsx and are unaffected.)
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
