"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { CommandPaletteProvider } from "./command-palette";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <CommandPaletteProvider>{children}</CommandPaletteProvider>
    </MotionConfig>
  );
}
