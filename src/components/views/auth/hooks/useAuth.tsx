import { useAuthContext } from "#/contexts/auth-context";
import { useAppMutation } from "#/http";
import { API_URLS } from "#/http/api-urls";
import { showToast } from "#/lib/toast";
import { getDecodedToken } from "#/lib/utils";
import { useRouter } from "next/router";

export const useAuth = () => {
  const loginMutation = useAppMutation({ url: API_URLS.LOGIN });
  const signUpMutation = useAppMutation({ url: API_URLS.SIGN_UP });
  const { handleAuthentication, openAuthDialog: closeAuthDialog } =
    useAuthContext();
  const router = useRouter();

  const finalizeLogin = (data: any) => {
    const result = data?.data?.data;

    if (!result.accessToken) return;

    const decodedToken = getDecodedToken(result?.accessToken);

    if (!decodedToken) return;

    const { exp } = decodedToken;
    const expiryDate = new Date(exp * 1000);

    handleAuthentication({
      token: { value: result?.accessToken as string, expiryDate },
      user: result,
    });

    showToast({ title: "Successfully logged in" });
    router.push("/all-lists");

    closeAuthDialog();
  };

  const handleLogin = ({ email, password }: TSignup) => {
    loginMutation.mutate({ email, password } as any, {
      onSuccess: (data) => {
        finalizeLogin(data);
      },
      onError: (data) => {
        showToast({
          title: "Error logging in user",
          type: "error",
        });
      },
    });
  };

  const handleSignup = ({ email, password }: TSignup) => {
    signUpMutation.mutate({ email, password } as any, {
      onSuccess: (data) => {
        finalizeLogin(data);
      },
      onError: (data) => {
        showToast({
          title: "Error signing up user",
          type: "error",
        });
      },
    });
  };

  return {
    loginMutation,
    handleLogin,
    handleSignup,
    signUpMutation,
  };
};

export type TSignup = {
  email: string;
  password: string;
};
