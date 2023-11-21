import { isProduction } from "#/lib/utils";
import { useEffect } from "react";
import ReactGA from "react-ga4";
import { EVENT_TRACKING_LABEL, EVENT_TRACKING_CATEGORY } from "./constants";
import { useAuthContext } from "#/contexts/auth-context";

const useReactGA = () => {
  const { isAuthenticated, authUser } = useAuthContext();
  useEffect(() => {
    const trackingId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ?? "";
    ReactGA.initialize(trackingId, {
      testMode: !isProduction(),
    });
  }, []);

  const setUser = () => {
    ReactGA.set({
      userId: authUser.id,
      email: authUser.email,
    });
  };

  // Track Event
  const eventTrack = async ({
    category,
    action,
    label,
  }: {
    category: keyof typeof EVENT_TRACKING_CATEGORY;
    action: string;
    label: keyof typeof EVENT_TRACKING_LABEL;
  }) => {
    if (typeof window !== "undefined" && isProduction()) {
      if (isAuthenticated) {
        setUser();
      }
      ReactGA.event({
        category,
        action,
        label,
      });
    }
  };

  return {
    eventTrack,
  };
};

export default useReactGA;
