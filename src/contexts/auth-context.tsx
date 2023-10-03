import { AuthDialog, AuthViewEnums } from "#/components/views/auth/auth-dialog";
import { useDialog } from "#/hooks/use-dialog";
import { getCookie } from "#/lib/appCookie";
import { AppStorage } from "#/lib/appStorage";
import { STORAGE_KEYS } from "#/lib/storageKeys";
import { delayInSeconds } from "#/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

export type TAuthUser = {
  authId: string;
  createdAt: string;
  email: string;
  enabled: boolean;
  expiresAt?: null;
  firstName: string;
  id: string;
  lastName: string;
  organization?: null;
  token?: string;
  username?: string;
};

export type TAuthenticateUser = {
  user: Record<string, any>;
  token: {
    value: string;
    expiryDate: Date;
  };
};

export type AuthContextType = {
  authUser: TAuthUser;
  getUser: () => any;
  handleAuthentication: ({ user, token }: TAuthenticateUser) => void;
  logout: () => void;
  isAuthenticated?: boolean;
  openAuthDialog: () => void;
  shouldPerformAuthAction: ({ action }: { action: VoidFunction }) => void;
  navigateToAuthRoute: (pathName: AuthViewEnums) => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const { getFromStore, clearStore, addToStore } = AppStorage();

export function AuthProvider({ children }: { children: ReactNode }) {
  const { open, toggleDialog } = useDialog();
  const router = useRouter();

  const urlSearchParams = useSearchParams()!;
  const pathname = usePathname();

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!getCookie(STORAGE_KEYS.AUTH_TOKEN)
  );
  const [authUser, setAuthUser] = useState<TAuthUser>(
    isAuthenticated ? getFromStore(STORAGE_KEYS.AUTH_USER) : ({} as TAuthUser)
  );

  const softReload = () => router.reload();

  const getUser = () => getFromStore(STORAGE_KEYS.AUTH_USER);
  const handleAuthentication = ({ user, token }: TAuthenticateUser) => {};

  const logout = async () => {};

  const shouldPerformAuthAction = async ({
    action,
  }: {
    action: VoidFunction;
  }) => {
    if (!isAuthenticated) {
      toggleDialog();
      resetDialog();
    } else {
      action();
    }
  };

  const handleCloseAuthDialog = () => {
    toggleDialog();
    resetDialog();
  };

  const resetDialog = async () => {
    // await delayInSeconds(0.8);
    if (open) {
      router.push(`${pathname}`);
    }
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(urlSearchParams);
      params.set(name, value);

      return params.toString();
    },
    [urlSearchParams]
  );

  const navigateToAuthRoute = (queryString: AuthViewEnums) => {
    // router.replace({
    //   pathname: `${pathname}?${createQueryString("auth", queryString)}`,
    // });
    router.push(`${pathname}?${createQueryString("auth", queryString)}`);
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        logout,
        getUser,
        isAuthenticated,
        handleAuthentication,
        openAuthDialog: handleCloseAuthDialog,
        shouldPerformAuthAction,
        navigateToAuthRoute,
      }}
    >
      {children}
      <AuthDialog open={open} handleClose={handleCloseAuthDialog} />
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
