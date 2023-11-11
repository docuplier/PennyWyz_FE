import { useAuth } from "#/components/views/auth/hooks/useAuth";
import { NewList } from "#/components/views/lists/new-list";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Auth() {
  const router = useRouter();

  const { provider = "", code = "" } = router?.query ?? {};

  const { socialMediaLogin } = useAuth();

  const isValidSocialMediaLogin = !!provider && !!code;

  useEffect(() => {
    if (isValidSocialMediaLogin) {
      socialMediaLogin({ code: code as string, provider: provider as string });
    }
  }, [isValidSocialMediaLogin]);

  return <NewList />;
}
