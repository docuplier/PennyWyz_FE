import { FacebookLogo } from "#/assets/svgs/facebook-logo";
import { GoogleLogo } from "#/assets/svgs/google-logo";
import { CustomInput } from "#/components/reusables/custom-input";
import { Button } from "#/components/ui/button";
import { CheckBox } from "#/components/ui/checkbox";
import { Label } from "#/components/ui/label";
import { Typography } from "#/components/ui/typography";
import { useAuthContext } from "#/contexts/auth-context";
import { ReactNode } from "react";
import { AuthViewEnums } from "./auth-dialog";

export const LoginForm = () => {
  const { navigateToAuthRoute } = useAuthContext();
  return (
    <section className="space-y-[24px]">
      <LoginWithSocial />
      <div className="space-y-[16px]">
        <CustomInput label="Email" />
        <CustomInput label="Password" type="password" />
        <div className="!-mt-[1px] flex items-center justify-between">
          <section className="flex items-center gap-2">
            <CheckBox id="rememberMe" />
            <Label
              htmlFor="rememberMe"
              className="text-[12px] text-pennywyz-ash-t2 font-normal"
            >
              Remember me
            </Label>
          </section>
          <button className="hover:underline text-pennywyz-yellow-t2 text-[12px]">
            <Typography text="Forgot Password?" size={12} />
          </button>
        </div>
        <div>
          <Button fullWidth className="mt-[10px]">
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
      </div>
    </section>
  );
};

export const LoginWithSocial = ({ text = "Login with" }: { text?: string }) => {
  return (
    <section className="space-y-[32px]">
      <div className="flex items-center justify-between">
        <Typography text={text} />
        <div className="flex items-center gap-[24px]">
          <SocialIcon icon={<GoogleLogo height={38} width={38} />} />
          <SocialIcon icon={<FacebookLogo height={38} width={38} />} />
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
