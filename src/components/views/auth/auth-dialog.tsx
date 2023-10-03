import { CustomDialog } from "#/components/reusables/custom-dialog";
import { useRouter } from "next/router";
import { LoginForm } from "./login-form";
import { SignupForm } from "./signup-form";
import { SignupStart } from "./signup-start";

export enum AuthViewEnums {
  SIGNUP_START = "auth",
  LOGIN_FORM = "login",
  SIGNUP_FORM = "signup",
}

const AuthViews = {
  [AuthViewEnums.SIGNUP_START]: {
    title: "Sign Up",
    element: <SignupStart />,
  },
  [AuthViewEnums.SIGNUP_FORM]: {
    title: "Sign Up",
    element: <SignupForm />,
  },
  [AuthViewEnums.LOGIN_FORM]: {
    title: "Login",
    element: <LoginForm />,
  },
};

export const AuthDialog = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const {
    query: { auth = AuthViewEnums.SIGNUP_START },
  } = useRouter();

  const view = AuthViews[auth as keyof typeof AuthViews] ?? AuthViews.auth;

  return (
    <CustomDialog
      dialogHeader={view.title}
      open={open}
      handleClose={handleClose}
      className="max-w-[350px]"
      bodyClassName="pt-0"
    >
      {view.element}
    </CustomDialog>
  );
};
