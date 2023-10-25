import { useAuthContext } from "#/contexts/auth-context";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect } from "react";

export const ProtectedRoute = ({
  children,
  redirectTo = "/",
}: {
  children: ReactNode;
  redirectTo?: string;
}) => {
  const { isAuthenticated } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated]);

  if (isAuthenticated) return children;
};
export const NotAccessibleToAuthUsers = ({
  children,
  redirectTo = "/all-lists",
}: {
  children: ReactNode;
  redirectTo?: string;
}) => {
  const { isAuthenticated } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) return children;
};
