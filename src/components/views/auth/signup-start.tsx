import { CustomInput } from "#/components/reusables/custom-input";
import { Button } from "#/components/ui/button";
import { CheckBox } from "#/components/ui/checkbox";
import { Label } from "#/components/ui/label";
import { Typography } from "#/components/ui/typography";
import { useAuthContext } from "#/contexts/auth-context";
import { AuthViewEnums } from "./auth-dialog";
import { LoginWithSocial } from "./login-form";

export const SignupStart = () => {
  const { navigateToAuthRoute } = useAuthContext();
  return (
    <div className="space-y-[16px]">
      <div className="bg-pennywyz-yellow-t1 p-[12px]">
        <Typography text="Sign up to :" />
        <ul className="list-disc pl-[18px] -space-y-1">
          <li>
            <Typography text="Save your list and access it later." size={12} />
          </li>
          <li>
            <Typography text="Share the list with your friends." size={12} />
          </li>
          <li>
            <Typography
              text="Get emails on price updates for items on your list"
              size={12}
            />
          </li>
        </ul>
      </div>
      <div className="!mb-[20px]">
        <LoginWithSocial text="Sign up with " />
      </div>
      <Button
        onClick={() => navigateToAuthRoute(AuthViewEnums.SIGNUP_FORM)}
        fullWidth
      >
        Email
      </Button>
      <button className="w-full">
        <Typography
          size={10}
          text={
            <span className="text-pennywyz-ash-t2">
              Already have an account?
              <span
                onClick={() => navigateToAuthRoute(AuthViewEnums.LOGIN_FORM)}
                className="text-pennywyz-yellow-t2"
              >
                {" "}
                Login
              </span>
            </span>
          }
          className="text-center"
        />
      </button>
    </div>
  );
};
