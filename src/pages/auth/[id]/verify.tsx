import { AppLayout } from "#/components/layouts/app-layout";
import { Loader } from "#/components/reusables/loader";
import { Button } from "#/components/ui/button";
import { useVerifyUser } from "#/components/views/auth/hooks/useVerifyUser";
import Home from "#/pages";
import { LoaderIcon } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const Verify = () => {
  const params = useParams();

  const { handleVerifyUser } = useVerifyUser();

  const userId = params?.id as string;

  useEffect(() => {
    if (userId) {
      handleVerifyUser({ id: userId });
    }
  }, [userId]);

  return (
    <AppLayout>
      <Loader className="h-[300px]" loaderText={"Verifying..."} />
    </AppLayout>
  );
};

export default Verify;
