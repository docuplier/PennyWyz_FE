import { useHydrationContext } from "#/contexts/hydration-provider";
import { useState, useEffect, ReactNode } from "react";

export const CSRWrapper = ({ children }: { children: ReactNode }) => {
  const { hydrated } = useHydrationContext();

  if (!hydrated) return null;

  return children;
};
