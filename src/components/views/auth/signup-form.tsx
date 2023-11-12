import { CustomInput } from "#/components/reusables/custom-input";
import { Button } from "#/components/ui/button";
import { CheckBox } from "#/components/ui/checkbox";
import { Label } from "#/components/ui/label";
import { Typography } from "#/components/ui/typography";
import { useAuthContext } from "#/contexts/auth-context";
import { useState } from "react";
import { AuthViewEnums } from "./auth-dialog";
import { TSignup, useAuth } from "./hooks/useAuth";
import { useForm } from "react-hook-form";
import { showToast } from "#/lib/toast";

export const SignupForm = () => {
  const { navigateToAuthRoute } = useAuthContext();
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);

  const { signUpMutation, handleSignup } = useAuth();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TSignup>();

  const onSubmit = (data: TSignup) => {
    if (hasAcceptedTerms) {
      handleSignup(data);
    } else {
      showToast({ title: "Please accept terms and conditions", type: "error" });
    }
  };

  return (
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
      {/* <div className="flex items-center gap-2">
        <CheckBox id="rememberMe" />
        <Label
          htmlFor="rememberMe"
          className="text-[12px] text-pennywyz-ash-t2 font-normal"
        >
          Remember me
        </Label>
      </div> */}
      <div className="flex items-center gap-2">
        <CheckBox
          id="terms"
          checked={hasAcceptedTerms}
          onChange={() => setHasAcceptedTerms(!hasAcceptedTerms)}
        />
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
    </form>
  );
};
