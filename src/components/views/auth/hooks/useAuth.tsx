import { Typography } from "#/components/ui/typography";
import { useAlertDialog } from "#/contexts/alert-dialog-context";
import { useAuthContext } from "#/contexts/auth-context";
import { useAppMutation } from "#/http";
import { API_URLS } from "#/http/api-urls";
import { showToast } from "#/lib/toast";
import { getDecodedToken } from "#/lib/utils";
import { useRouter } from "next/router";

export const useAuth = () => {
  const loginMutation = useAppMutation({ url: API_URLS.LOGIN });
  const signUpMutation = useAppMutation({ url: API_URLS.SIGN_UP });
  const { handleAuthentication, closeAuthDialog } = useAuthContext();
  const router = useRouter();

  const alertDialog = useAlertDialog();

  const renderAlertDialog = ({ email }: { email: string }) =>
    alertDialog.render({
      title: "Sign Up Successful!",
      iconType: "success",
      content: (
        <>
          <Typography text={`We sent an email to ${email}.`} size={12} />
          <ul className="list-disc pl-[18px] space-y-1 mt-[10px]">
            <li>
              <Typography
                text={
                  <>
                    Open your email app and look for this email titled -
                    <span className="font-semibold">Welcome to PennyWyz</span>
                  </>
                }
                size={12}
              />
            </li>
            <li>
              <Typography
                text={
                  <>
                    Click on the{" "}
                    <span className="font-semibold"> Verify Email</span> button
                    in the mail to verify your email.
                  </>
                }
                size={12}
              />
            </li>
          </ul>
        </>
      ),
    });

  const finalizeLogin = ({
    data,
    isSignup = false,
  }: {
    data: any;
    isSignup?: boolean;
  }) => {
    const result = data?.data?.data;

    if (!result.accessToken) return;

    const decodedToken = getDecodedToken(result?.accessToken);

    const user = result?.user;

    if (!decodedToken) return;

    const { exp } = decodedToken;
    const expiryDate = new Date(exp * 1000);

    handleAuthentication({
      token: { value: result?.accessToken as string, expiryDate },
      user,
    });

    showToast({ title: "Successfully logged in" });
    router.push("/all-lists");

    closeAuthDialog();

    if (isSignup) {
      renderAlertDialog({ email: user.email });
    }
  };

  const handleLogin = ({ email, password }: TSignup) => {
    loginMutation.mutate({ email, password } as any, {
      onSuccess: (data) => {
        finalizeLogin({ data: { ...data, email }, isSignup: false });
      },
      onError: (data) => {
        showToast({
          title: "Invalid Credentials",
          type: "error",
        });
      },
    });
  };
  const socialMediaLogin = ({ code, provider }: TSocialSignup) => {
    loginMutation.mutate({ code, provider } as any, {
      onSuccess: (data) => {
        finalizeLogin({ data: { ...data }, isSignup: false });
      },
      onError: (data) => {
        showToast({
          title: "Invalid Credentials",
          type: "error",
        });
      },
    });
  };

  const handleSignup = ({ email, password }: TSignup) => {
    signUpMutation.mutate({ email, password } as any, {
      onSuccess: (data) => {
        finalizeLogin({ data: { ...data, email }, isSignup: true });
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
    socialMediaLogin,
  };
};

export type TSignup = {
  email: string;
  password: string;
};
export type TSocialSignup = {
  provider: string;
  code: string;
};
