import { GoogleLogo } from "#/assets/svgs/google-logo";
import { CustomInput } from "#/components/reusables/custom-input";
import { Button } from "#/components/ui/button";
import { Typography } from "#/components/ui/typography";
import { useAuthContext } from "#/contexts/auth-context";
import { AuthViewEnums } from "./auth-dialog";
import { useForm } from "react-hook-form";
import { TSignup, useAuth } from "./hooks/useAuth";
import Link from "next/link";
import { API_URLS } from "#/http/api-urls";
import { ENV_KEYS } from "#/lib/env-keys";
import { getWindow } from "#/lib/utils";

export const LoginForm = () => {
  const { navigateToAuthRoute } = useAuthContext();

  const { loginMutation, handleLogin } = useAuth();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TSignup>();

  const onSubmit = (data: TSignup) => {
    handleLogin(data);
  };

  return (
    <section className="space-y-[24px]">
      <LoginWithSocial />
      <form className="space-y-[16px]" onSubmit={handleSubmit(onSubmit)}>
        <CustomInput
          label="Email"
          name="email"
          type="email"
          register={register}
          rules={{ required: { value: true, message: "Enter your email" } }}
          errorMessage={errors["email"]?.message}
        />
        <CustomInput
          label="Password"
          type="password"
          name="password"
          register={register}
          rules={{ required: { value: true, message: "Enter your password" } }}
          errorMessage={errors["password"]?.message}
          autoComplete="true"
        />
        <div className="!-mt-[1px] flex items-center justify-between">
          <section className="flex items-center gap-2">
            {/* <CheckBox id="rememberMe" />
            <Label
              htmlFor="rememberMe"
              className="text-[12px] text-pennywyz-ash-t2 font-normal"
            >
              Remember me
            </Label> */}
          </section>
          <button className="hover:underline text-pennywyz-yellow-t2 text-[12px]">
            <Typography text="Forgot Password?" size={12} />
          </button>
        </div>
        <div>
          <Button
            fullWidth
            className="mt-[10px]"
            isLoading={loginMutation.isLoading}
          >
            Login
          </Button>
        </div>
        <button className="w-full">
          <Typography
            size={10}
            text={
              <span className="text-pennywyz-ash-t2">
                Don't have an account?
                <span
                  className="text-pennywyz-yellow-t2"
                  onClick={() => navigateToAuthRoute(AuthViewEnums.SIGNUP_FORM)}
                >
                  {" "}
                  Signup
                </span>
              </span>
            }
            className="text-center"
          />
        </button>
      </form>
    </section>
  );
};

export const LoginWithSocial = ({ text = "Login with" }: { text?: string }) => {
  const openGoogleLogin = () => {
    const getLoginWithGoogle = `${ENV_KEYS.API_URL}/${API_URLS.GOOGLE_LOGIN}`;
    getWindow()?.open(getLoginWithGoogle, "_self");
  };

  return (
    <section className="space-y-[32px]">
      <div className="flex items-center justify-between">
        <Typography text={text} />
        <div className="flex items-center gap-[24px]">
          <button onClick={openGoogleLogin}>
            <SocialIcon icon={<GoogleLogo height={38} width={38} />} />
          </button>
          {/* <SocialIcon icon={<FacebookLogo height={38} width={38} />} /> */}
        </div>
      </div>
      <div className="relative flex items-center justify-center w-full h-full">
        <div className="w-full border-b border-pennywyz-ash-t2"></div>
        <Typography
          text="or continue with"
          size={12}
          className="absolute bg-white px-[10px] text-pennywyz-ash-t2"
        />
      </div>
    </section>
  );
};

const SocialIcon = ({ icon: Icon }: { icon: any }) => (
  <div className="w-[64px] h-[64px] rounded-full bg-pennywyz-yellow-t1 flex justify-center items-center">
    {Icon}
  </div>
);
