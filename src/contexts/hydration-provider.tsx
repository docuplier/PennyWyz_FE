import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type HydrationContextType = { hydrated: boolean };

const HydrationContext = createContext<HydrationContextType>(
  {} as HydrationContextType
);

export function HydrationProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  return (
    <HydrationContext.Provider value={{ hydrated }}>
      {children}
    </HydrationContext.Provider>
  );
}

export const useHydrationContext = () => useContext(HydrationContext);
