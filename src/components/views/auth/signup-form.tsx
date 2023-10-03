import { CustomInput } from "#/components/reusables/custom-input";
import { Button } from "#/components/ui/button";
import { CheckBox } from "#/components/ui/checkbox";
import { Label } from "#/components/ui/label";
import { Typography } from "#/components/ui/typography";
import { useAuthContext } from "#/contexts/auth-context";
import { AuthViewEnums } from "./auth-dialog";

export const SignupForm = () => {
  const { navigateToAuthRoute } = useAuthContext();
  return (
    <div className="space-y-[16px]">
      <CustomInput label="Email" />
      <CustomInput label="Password" type="password" />
      <div className="flex items-center gap-2">
        <CheckBox id="rememberMe" />
        <Label
          htmlFor="rememberMe"
          className="text-[12px] text-pennywyz-ash-t2 font-normal"
        >
          Remember me
        </Label>
      </div>
      <div className="flex items-center gap-2">
        <CheckBox id="terms" />
        <Label htmlFor="terms" className="text-[12px] font-normal">
          By signing up you agree to our Terms of Use and Privacy Policy.
        </Label>
      </div>
      <div>
        <Button fullWidth className="mt-[10px]">
          Sign Up
        </Button>
      </div>
      <button className="w-full">
        <Typography
          size={10}
          text={
            <span className="text-pennywyz-ash-t2">
              Already have an account?
              <span
                className="text-pennywyz-yellow-t2"
                onClick={() => navigateToAuthRoute(AuthViewEnums.LOGIN_FORM)}
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
